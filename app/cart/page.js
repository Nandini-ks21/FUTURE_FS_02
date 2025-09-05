"use client";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";

export default function CartPage() {
  const { cart, updateQty, removeFromCart, cartTotal } = useStore();
  const items = cart.items;

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-gray-600">
          Cart is empty. <Link href="/" className="text-blue-600">Shop products</Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <ul className="lg:col-span-2 grid gap-4">
            {items.map(item => (
              <li key={item.id} className="border rounded-2xl p-4 flex gap-4">
                <img src={item.image} alt="" className="w-24 h-24 object-cover rounded-xl border"/>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.category}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={()=>updateQty(item.id, item.qty-1)} className="px-2 border rounded">-</button>
                    <input value={item.qty} onChange={e=>updateQty(item.id, Number(e.target.value)||1)} className="w-14 border rounded px-2 py-1 text-center"/>
                    <button onClick={()=>updateQty(item.id, item.qty+1)} className="px-2 border rounded">+</button>
                    <button onClick={()=>removeFromCart(item.id)} className="ml-auto text-red-600 hover:underline">Remove</button>
                  </div>
                </div>
                <div className="font-semibold">₹{(item.price*item.qty).toFixed(2)}</div>
              </li>
            ))}
          </ul>
          <aside className="border rounded-2xl p-4 h-fit">
            <h2 className="font-semibold mb-2">Summary</h2>
            <div className="flex justify-between py-2 border-b">
              <span>Subtotal</span><span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Shipping</span><span>₹0.00</span>
            </div>
            <div className="flex justify-between py-2 font-bold">
              <span>Total</span><span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <Link href="/checkout" className="mt-4 block text-center bg-blue-600 text-white px-4 py-2 rounded-xl">Proceed to Checkout</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
