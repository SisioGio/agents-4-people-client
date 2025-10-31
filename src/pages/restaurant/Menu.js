import React, { useEffect, useState } from "react";
import apiClient from "../../utils/apiClient";

const units = ["pc", "cup", "slice", "bottle", "glass", "piece"]; // example units

const MenuManager = () => {
  const [menu, setMenu] = useState({});
  const [loading, setLoading] = useState(true);
  const [editingItemId, setEditingItemId] = useState(null);
  const [formData, setFormData] = useState({});
  const [expandedCategories, setExpandedCategories] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await apiClient.get("/restaurant/menu");
      setMenu(res.data.menu || {});
      // Expand all categories by default
      setExpandedCategories(
        Object.keys(res.data.menu || {}).reduce((acc, cat) => {
          acc[cat] = true;
          return acc;
        }, {})
      );
    } catch (error) {
      console.error("Error fetching menu:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await apiClient.delete(`/restaurant/menu?item_id=${itemId}`);
      fetchMenu();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleEditClick = (item) => {
    setEditingItemId(item.item_id);
    setFormData({ ...item });
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    setFormData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // Validate
      if (!formData.name || Number(formData.price) <= 0 || Number(formData.quantity) <= 0) {
        alert("Please enter valid name, price (>0) and quantity (>0).");
        return;
      }
      await apiClient.put(`/restaurant/menu?item_id=${editingItemId}`, formData);
      setEditingItemId(null);
      setFormData({});
      fetchMenu();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const toggleCategory = (cat) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  const filteredMenu = Object.entries(menu).reduce((acc, [category, items]) => {
    const filteredItems = items.filter((item) => {
      const term = searchTerm.toLowerCase();
      return (
        item.name.toLowerCase().includes(term) ||
        (item.ingredients && item.ingredients.toLowerCase().includes(term))
      );
    });
    if (filteredItems.length > 0) {
      acc[category] = filteredItems;
    }
    return acc;
  }, {});

  if (loading)
    return <div className="p-6 text-gray-500 text-lg">Loading menu...</div>;

  return (
    <div className="p-6 mx-auto">
 

      <div className="mb-6 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search by name or ingredient..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        {/* Add New Item button placeholder */}
        <button
          onClick={() => {
            setEditingItemId("new");
            setFormData({
              name: "",
              price: "",
              quantity: 1,
              unit: units[0],
              category: "",
              description: "",
              ingredients: "",
            });
          }}
          className="px-5 py-2 rounded-md bg-gradient-to-r from-indigo-800 via-purple-800 to-fuchsia-700 text-white hover:opacity-90 transition"
        >
          + Add New Item
        </button>
      </div>

      {Object.keys(filteredMenu).length === 0 && (
        <p className="text-gray-500">No menu items found.</p>
      )}

      {Object.entries(filteredMenu).map(([category, items]) => {
        const isExpanded = expandedCategories[category];
        return (
          <div key={category} className="mb-10">
            <button
              onClick={() => toggleCategory(category)}
              className="flex justify-between items-center w-full border-b border-gray-300 pb-2 mb-4 text-2xl font-semibold text-indigo-900 capitalize hover:text-indigo-700 focus:outline-none"
            >
              <span>{category}</span>
              <span className="text-2xl select-none">
                {isExpanded ? "−" : "+"}
              </span>
            </button>

            {isExpanded && (
              <div className="space-y-5">
                {items.map((item) => {
                  const isEditing = editingItemId === item.item_id;

                  return (
                    <div
                      key={item.item_id}
                      className="flex items-center justify-between bg-white rounded-lg border border-gray-200 shadow-sm px-6 py-4 hover:shadow-md transition"
                    >
                      {!isEditing ? (
                        <>
                          <div className="flex-1 min-w-0">
                            <h3
                              className={`text-xl font-semibold truncate ${
                                !item.name ? "text-red-600" : "text-gray-800"
                              }`}
                            >
                              {item.name || "Unnamed item"}
                            </h3>
                            <p className="text-gray-600 truncate">{item.description || "-"}</p>
                            <p
                              className="text-sm text-gray-500 italic mt-1 truncate"
                              title={item.ingredients}
                            >
                              Ingredients: {item.ingredients || "-"}
                            </p>
                            <p
                              className={`mt-1 text-sm font-medium ${
                                Number(item.price) <= 0
                                  ? "text-red-600 font-bold"
                                  : "text-gray-700"
                              }`}
                            >
                              {item.quantity} {item.unit} —{" "}
                              <span className="text-green-600 font-bold">
                                ${item.price}
                              </span>
                            </p>
                          </div>

                          <div className="flex space-x-4 ml-6 flex-shrink-0">
                            <button
                              onClick={() => handleEditClick(item)}
                              className="px-4 py-1 rounded-md bg-gradient-to-r from-indigo-800 via-purple-800 to-fuchsia-700 text-white hover:opacity-90 transition text-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(item.item_id)}
                              className="px-4 py-1 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex-1 grid grid-cols-12 gap-4 items-center">
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="col-span-3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                              placeholder="Name"
                              required
                            />
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              name="price"
                              value={formData.price}
                              onChange={handleChange}
                              className="col-span-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                              placeholder="Price"
                              required
                            />
                            <input
                              type="number"
                              min="1"
                              name="quantity"
                              value={formData.quantity}
                              onChange={handleChange}
                              className="col-span-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                              placeholder="Qty"
                              required
                            />
                            <select
                              name="unit"
                              value={formData.unit}
                              onChange={handleChange}
                              className="col-span-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            >
                              {units.map((u) => (
                                <option key={u} value={u}>
                                  {u}
                                </option>
                              ))}
                            </select>
                            <input
                              type="text"
                              name="category"
                              value={formData.category}
                              onChange={handleChange}
                              className="col-span-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                              placeholder="Category"
                            />
                            <input
                              type="text"
                              name="description"
                              value={formData.description}
                              onChange={handleChange}
                              className="col-span-3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                              placeholder="Description"
                            />
                            <input
                              type="text"
                              name="ingredients"
                              value={formData.ingredients}
                              onChange={handleChange}
                              className="col-span-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                              placeholder="Ingredients"
                            />
                          </div>

                          <div className="flex space-x-2 ml-6 flex-shrink-0">
                            <button
                              onClick={handleSave}
                              className="px-4 py-1 rounded-md bg-gradient-to-r from-indigo-800 via-purple-800 to-fuchsia-700 text-white hover:opacity-90 transition text-sm"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="px-4 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}

                {/* Add new item inline form */}
                {editingItemId === "new" && (
                  <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 shadow-sm px-6 py-4">
                    <div className="flex-1 grid grid-cols-12 gap-4 items-center">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="col-span-3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                        placeholder="Name"
                        required
                      />
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="col-span-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                       
placeholder="Price"
required
/>
<input type="number" min="1" name="quantity" value={formData.quantity} onChange={handleChange} className="col-span-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="Qty" required />
<select name="unit" value={formData.unit} onChange={handleChange} className="col-span-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" >
{units.map((u) => (
<option key={u} value={u}>
{u}
</option>
))}
</select>
<input type="text" name="category" value={formData.category} onChange={handleChange} className="col-span-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="Category" />
<input type="text" name="description" value={formData.description} onChange={handleChange} className="col-span-3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="Description" />
<input type="text" name="ingredients" value={formData.ingredients} onChange={handleChange} className="col-span-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="Ingredients" />
</div>                <div className="flex space-x-2 ml-6 flex-shrink-0">
                  <button
                    onClick={async () => {
                      try {
                        if (
                          !formData.name ||
                          Number(formData.price) <= 0 ||
                          Number(formData.quantity) <= 0
                        ) {
                          alert(
                            "Please enter valid name, price (>0) and quantity (>0)."
                          );
                          return;
                        }
                        await apiClient.post("/restaurant/menu", formData);
                        setEditingItemId(null);
                        setFormData({});
                        fetchMenu();
                      } catch (error) {
                        console.error("Add new item failed:", error);
                      }
                    }}
                    className="px-4 py-1 rounded-md bg-gradient-to-r from-indigo-800 via-purple-800 to-fuchsia-700 text-white hover:opacity-90 transition text-sm"
                  >
                    Add
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  })}
</div>
);
};

export default MenuManager;