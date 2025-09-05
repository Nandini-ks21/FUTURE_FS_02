"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const StoreCtx = createContext(null);

export function StoreProvider({ children }){
  const [cart, setCart] = useState({ items: [] });
  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Hydrate from localStorage
  useEffect(()=>{
    if (typeof window === "undefined") return;
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart") || '{"items":[]}');
      const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      const savedUser = JSON.parse(localStorage.getItem("user") || "null");
      setCart(savedCart);
      setOrders(savedOrders);
      setCurrentUser(savedUser);
    } catch {}
  }, []);

  // Persist
  useEffect(()=>{
    if (typeof window !== "undefined") localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(()=>{
    if (typeof window !== "undefined") localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);
  useEffect(()=>{
    if (typeof window !== "undefined") localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const addToCart = (product) => {
    setCart(prev=>{
      const exists = prev.items.find(i=>i.id===product.id);
      if (exists){
        return { items: prev.items.map(i=> i.id===product.id ? {...i, qty: i.qty+1} : i) };
      }
      return { items: [...prev.items, {...product, qty: 1}] };
    });
  };
  const updateQty = (id, qty) => {
    setCart(prev=>{
      const q = Math.max(1, qty || 1);
      return { items: prev.items.map(i=> i.id===id ? {...i, qty: q} : i) };
    });
  };
  const removeFromCart = (id) => setCart(prev=>({ items: prev.items.filter(i=>i.id!==id) }));
  const clearCart = () => setCart({ items: [] });

  const cartTotal = useMemo(()=> cart.items.reduce((sum,i)=>sum+i.price*i.qty,0), [cart.items]);

  const addOrder = (order) => setOrders(prev=>[order, ...prev]);

  const login = (user) => setCurrentUser(user);
  const logout = () => setCurrentUser(null);

  const value = {
    cart, cartTotal, addToCart, updateQty, removeFromCart, clearCart,
    orders, addOrder, currentUser, login, logout
  };

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export const useStore = () => useContext(StoreCtx);
