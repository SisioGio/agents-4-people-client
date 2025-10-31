import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../utils/apiClient";
import { NotificationProvider, useNotification } from "../../components/Notification";
import { AiFillCloseCircle, AiOutlineClose } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
const TableInterface = () => {
  const { restaurant_name, table_id } = useParams();
  const {showNotification} = useNotification()
  const [menu, setMenu] = useState({});
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [cart, setCart] = useState([]);
  const [fullName, setFullName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [submitting, setSubmitting] = useState(false);
const [isCartOpen, setIsCartOpen] = useState(false);
  useEffect(() => {

    
    fetchMenu();
  }, []);
  

  const fetchMenu = async () => {
    try {
        const restaurant_id = restaurant_name
        const table_no = table_id
        const res = await apiClient.get(`/public/restaurant?restaurant_id=${restaurant_id}`)
        console.log(res.data)


     
      const menuData = res.data.menu || {};
      setMenu(menuData);
      setExpandedCategories(Object.keys(menuData).reduce((acc, cat) => {
        acc[cat] = true;
        return acc;
      }, {}));
    } catch (error) {
        showNotification({text:"🚫 We're having some issues now, please contact the restaurant",error:true})
      console.error("Error fetching menu:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (cat) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  const handleAddToCart = (item) => {
    const exists = cart.find((i) => i.item_id === item.item_id);
    if (exists) {
      setCart(cart.map((i) =>
        i.item_id === item.item_id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1,name: item.name }]);
    }
  };

  const handleUpdateQuantity = (item_id, quantity) => {
    setCart(cart.map((item) =>
      item.item_id === item_id ? { ...item, quantity: Math.max(1, quantity) } : item
    ));
  };

  const handleRemoveFromCart = (item_id) => {
    setCart(cart.filter((item) => item.item_id !== item_id));
  };

  const handleSubmitOrder = async () => {
    if (!fullName.trim()) return showNotification({text:"🚫 Please enter your full name",error:true})
    if (cart.length === 0) return showNotification({text:"🚫 The cart is empty",error:true})

    setSubmitting(true);
    try {
      await apiClient.post(`/public/order`, {
        restaurant_id:restaurant_name,
        table_number:table_id,
        full_name: fullName,
        items: cart.map(({ item_id, quantity,name }) => ({ item_id, quantity,name })),
      });
   
      showNotification({text:"✅ Your order has been placed.",error:false})
      setCart([]);
      setFullName("");
    } catch (error) {
        showNotification({text:"🚫 Something went wrong...",error:true})
      console.error("Order failed:", error);
   
    } finally {
      setSubmitting(false);
    }
  };

  const filteredMenu = Object.entries(menu).reduce((acc, [category, items]) => {
    const filteredItems = items.filter((item) => {
      const term = searchTerm.toLowerCase();
      return item.name.toLowerCase().includes(term) ||
        (item.ingredients && item.ingredients.toLowerCase().includes(term));
    });
    if (filteredItems.length > 0) acc[category] = filteredItems;
    return acc;
  }, {});

  return (
    <div className="absolute top-0 left-0 w-full min-h-screen bg-white text-black p-6 z-50">

        {/* Cart Preview Toggle */}
<div
  className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-500 shadow-lg border border-gray-200 rounded-full px-6 py-3 flex items-center justify-between gap-6 cursor-pointer z-50"
  onClick={() => setIsCartOpen(!isCartOpen)}
>
  <p className="font-medium text-white">
    🛒 {cart.length} {cart.length === 1 ? "item" : "items"}
  </p>
  <p className="text-sm text-white">
    Total: ${cart.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)}
  </p>
  <p className="text-sm text-black underline">{isCartOpen ? "Close" : "View"}</p>
</div>


      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 border-b pb-2">{restaurant_name} — Table {table_id}</h1>

        <input
          type="text"
          placeholder="Search menu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
        />

        {loading ? (
          <p className="text-gray-500">Loading menu...</p>
        ) : Object.keys(filteredMenu).length === 0 ? (
          <p className="text-gray-500">No menu items found.</p>
        ) : (
          Object.entries(filteredMenu).map(([category, items]) => (
            <div key={category} className="mb-8">
              <h2 className="text-xl font-semibold mb-3">{category}</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.item_id}
                    className="flex justify-between items-center py-2 px-4 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition"
                  >
                    <div>
                      <h3 className="font-medium text-lg">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.ingredients}</p>
                    </div>
                    <div className="text-right flex ">
                      <p className="font-semibold text-gray-800 mb-1 mx-2">EUR {item.price?.toFixed(2)}</p>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="px-4 py-1 border border-black text-black rounded-full hover:bg-black hover:text-white transition"
                      >
                        <FaPlus/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
        {isCartOpen && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white shadow-2xl rounded-xl p-6 z-50 border border-gray-200">
<button
  onClick={() => setIsCartOpen(false)}
  className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
  aria-label="Close Cart"
>
  <AiFillCloseCircle size={24} />
</button>
          <h2 className="text-2xl font-semibold mb-4">Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.item_id}
                  className="flex justify-between items-center border border-gray-200 p-4 rounded-lg bg-white shadow-sm"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleUpdateQuantity(item.item_id, parseInt(e.target.value))
                      }
                      className="w-16 px-2 py-1 border border-gray-300 rounded"
                    />
                    <button
                      onClick={() => handleRemoveFromCart(item.item_id)}
                      className="text-red-500 text-xl"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
            />
            <button
              onClick={handleSubmitOrder}
              disabled={submitting}
              className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Place Order"}
            </button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default TableInterface;
