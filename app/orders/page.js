"use client";
import { useStore } from "@/context/StoreContext";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function OrdersPage() {
  const { orders, currentUser } = useStore();
  const params = useSearchParams();
  const success = params.get("success");

  const visibleOrders = currentUser ? orders.filter(o=>o.email===currentUser.email) : orders;

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Orders</h1>
        {!currentUser && <Link href="/login" className="text-blue-600">Login</Link>}
      </div>
      {success && <div className="bg-green-50 border border-green-200 text-green-800 p-3 rounded-xl">Payment successful (simulated). Your order has been placed.</div>}
      {visibleOrders.length === 0 ? (
        <div className="text-gray-600">
          No orders yet. <Link className="text-blue-600" href="/">Start shopping</Link>
        </div>
      ) : (
        <ul className="grid gap-4">
          {visibleOrders.map(o=>(
            <li key={o.id} className="border rounded-2xl p-4 grid sm:grid-cols-3 gap-2">
              <div>
                <div className="font-semibold">Order #{o.id}</div>
                <div className="text-xs text-gray-500">{new Date(o.date).toLocaleString()}</div>
                <div className="text-xs text-gray-500">{o.status}</div>
              </div>
              <ul className="text-sm sm:col-span-2">
                {o.items.map(i=>(<li key={i.id}>{i.title} × {i.qty} — ₹{(i.price*i.qty).toFixed(2)}</li>))}
                <div className="font-semibold mt-2">Total: ₹{o.total.toFixed(2)}</div>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
