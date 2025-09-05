"use client";
import { useStore } from "@/context/StoreContext";
import { useState, useEffect } from "react";
import { validateCheckout } from "@/utils/validation";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, currentUser, addOrder } = useStore();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "", email: "", address: "", city: "", zip: "", card: ""
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(()=>{
    if (cart.items.length === 0) {
      // No items in cart; redirect back
    }
  }, [cart.items.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validateCheckout(form);
    setErrors(errs);
    setSubmitted(true);
    if (Object.keys(errs).length === 0) {
      const order = {
        id: "ord_" + Math.random().toString(36).slice(2,8),
        date: new Date().toISOString(),
        items: cart.items,
        total: cartTotal,
        email: currentUser?.email || form.email,
        shipping: { name: form.name, address: form.address, city: form.city, zip: form.zip },
        status: "Paid (Simulated)"
      };
      addOrder(order);
      clearCart();
      router.push("/orders?success=1");
    }
  };

  const set = (k) => (e) => setForm({...form, [k]: e.target.value});

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <form onSubmit={handleSubmit} className="lg:col-span-2 border rounded-2xl p-4 grid gap-4">
          <Field label="Full Name" error={errors.name}>
            <input className="w-full border rounded-xl px-3 py-2" value={form.name} onChange={set('name')} />
          </Field>
          <Field label="Email" error={errors.email}>
            <input className="w-full border rounded-xl px-3 py-2" value={form.email} onChange={set('email')} type="email"/>
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Address" error={errors.address}>
              <input className="w-full border rounded-xl px-3 py-2" value={form.address} onChange={set('address')} />
            </Field>
            <Field label="City" error={errors.city}>
              <input className="w-full border rounded-xl px-3 py-2" value={form.city} onChange={set('city')} />
            </Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="ZIP / PIN" error={errors.zip}>
              <input className="w-full border rounded-xl px-3 py-2" value={form.zip} onChange={set('zip')} />
            </Field>
            <Field label="Card Number" error={errors.card}>
              <input className="w-full border rounded-xl px-3 py-2" value={form.card} onChange={set('card')} placeholder="1111 2222 3333 4444"/>
            </Field>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">Pay ₹{cartTotal.toFixed(2)}</button>
          {submitted && Object.keys(errors).length > 0 && <p className="text-red-600 text-sm">Please fix the errors above.</p>}
        </form>
        <aside className="border rounded-2xl p-4 h-fit">
          <h2 className="font-semibold mb-2">Order Summary</h2>
          <ul className="text-sm divide-y">
            {cart.items.map(i => (
              <li key={i.id} className="py-2 flex justify-between">
                <span>{i.title} × {i.qty}</span>
                <span>₹{(i.price*i.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between py-2 font-bold border-t mt-2">
            <span>Total</span><span>₹{cartTotal.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({label, error, children}){
  return (
    <label className="grid gap-1">
      <span className="text-xs text-gray-500">{label}</span>
      {children}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}
