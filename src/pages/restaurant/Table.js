import React, { useEffect, useState } from "react";
import apiClient from "../../utils/apiClient";
import { useNotification } from "../../components/Notification";
const TableManager = () => {
  const {showNotification} = useNotification()
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTable, setEditTable] = useState(null);
  const [openForm,setOpenForm] = useState(false)
  const [form, setForm] = useState({
    table_id: "",
    capacity: "",
    indoor: false,
  });

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const res = await apiClient.get("/restaurant/table");
      setTables(res.data || []);
    } catch (error) {
      showNotification({text:"🚫 Something went wrong...",error:true})
      console.error("Error fetching tables:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAdd = () => {
    setEditTable(null);
    setOpenForm(true)
    setForm({ table_id: "", capacity: "", indoor: false });
  };

  const handleEdit = (table) => {
    setEditTable(table.table_id);
    setOpenForm(true)
    setForm({
      table_id: table.table_id,
      capacity: table.capacity,
      indoor: table.indoor,
    });
  };

  const handleCancel = () => {
    setOpenForm(false)
    setEditTable(null);
    setForm({ table_id: "", capacity: "", indoor: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.table_id.trim()) {
      showNotification({text:"🚫 Table number is required.",error:true})

      return;
    }
    if (!form.capacity || Number(form.capacity) < 1) {
     
      showNotification({text:"🚫 Capacity must be at least 1.",error:true})
      return;
    }

    try {
      if (editTable) {
        await apiClient.put(`/restaurant/table?table_id=${editTable}`, form);
        showNotification({text:"✅ Table updated.",error:false})
      } else {
        await apiClient.post("/restaurant/table", form);
        showNotification({text:"✅ Table created.",error:false})
      }
      fetchTables();
      handleCancel();
    } catch (error) {
      console.error("Error saving table:", error);
      showNotification({text:"🚫 Something went wrong...",error:true})
    
    }
  };

  const handleDelete = async (table_id) => {
    if (!window.confirm("Are you sure you want to delete this table?")) return;
    try {
      await apiClient.delete(`/restaurant/table?table_id=${table_id}`);
      showNotification({text:"✅ Table deleted.",error:false})
      fetchTables();
    } catch (error) {
      console.error("Delete failed:", error);
      showNotification({text:"🚫 Failed to delete table. Please try again.",error:true})
      
    } finally{
      setOpenForm(false)

    }
  };

  if (loading)
    return (
      <p className="p-6 text-center text-lg font-semibold text-indigo-700 animate-pulse">
        Loading tables...
      </p>
    );

  return (
    <div className="p-6  mx-auto">
    

      <button
        onClick={handleAdd}
        className="mb-8 px-6 py-3 bg-gradient-to-r from-indigo-700 via-purple-700 to-fuchsia-700 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition duration-300 focus:outline-none focus:ring-4 focus:ring-fuchsia-400"
      >
        + Add New Table
      </button>

      {openForm  && (
        <form
          onSubmit={handleSubmit}
          className="mb-10 bg-white p-6 rounded-lg shadow-lg border border-indigo-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label
                htmlFor="table_id"
                className="block mb-2 font-semibold text-indigo-700"
              >
                Table Number
              </label>
              <input
                type="text"
                id="table_id"
                name="table_id"
                value={form.table_id}
                onChange={handleInputChange}
                disabled={!!editTable}
                required
                className="w-full px-4 py-2 rounded border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="e.g., 12"
              />
            </div>

            <div>
              <label
                htmlFor="capacity"
                className="block mb-2 font-semibold text-indigo-700"
              >
                Capacity
              </label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={form.capacity}
                onChange={handleInputChange}
                min={1}
                required
                className="w-full px-4 py-2 rounded border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="e.g., 4"
              />
            </div>

            <div className="flex items-center mt-6 md:mt-0">
              <input
                type="checkbox"
                id="indoor"
                name="indoor"
                checked={form.indoor}
                onChange={handleInputChange}
                className="h-5 w-5 text-fuchsia-600 focus:ring-fuchsia-400 rounded"
              />
              <label
                htmlFor="indoor"
                className="ml-3 font-semibold text-indigo-700 select-none"
              >
                Indoor Seating
              </label>
            </div>
          </div>

          <div className="mt-6 flex space-x-4 justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-purple-700 via-indigo-700 to-fuchsia-700 text-white rounded-lg font-semibold hover:brightness-110 transition"
            >
              {editTable ? "Update Table" : "Add Table"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-indigo-300 rounded-lg text-indigo-700 font-semibold hover:bg-indigo-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {tables.length === 0 ? (
        <p className="text-center text-indigo-600 font-semibold">
          No tables found.
        </p>
      ) : (
        <div className="space-y-4">
          {tables.map((table) => (
            <div
              key={table.table_id}
              className="flex justify-between items-center bg-white rounded-lg shadow-md border border-indigo-200 px-6 py-4 hover:shadow-lg transition cursor-pointer"
            >
              <div>
                <p className="font-semibold text-xl text-indigo-800">
                  Table #{table.table_id}
                </p>
                <p className="text-indigo-600">Capacity: {table.capacity}</p>
                <p className="italic text-indigo-500">
                  {table.indoor ? "Indoor Seating" : "Outdoor Seating"}
                </p>
              </div>
              <div className="space-x-6">
                <button
                  onClick={() => handleEdit(table)}
                  className="text-purple-700 hover:text-fuchsia-700 font-semibold transition"
                  aria-label={`Edit table ${table.table_id}`}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(table.table_id)}
                  className="text-red-600 hover:text-red-800 font-semibold transition"
                  aria-label={`Delete table ${table.table_id}`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TableManager;
