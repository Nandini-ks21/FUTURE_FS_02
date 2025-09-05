"use client";
import { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { useRouter } from "next/navigation";

export default function LoginPage(){
  const { login } = useStore();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const submit = (e)=>{
    e.preventDefault();
    if(!email.includes("@")) return alert("Enter a valid email");
    login({email, name: name || email.split("@")[0]});
    router.push("/");
  }

  return (
    <div className="max-w-md mx-auto grid gap-4 border rounded-2xl p-6">
      <h1 className="text-2xl font-bold">Login (Optional)</h1>
      <p className="text-sm text-gray-600">This demo uses localStorage only. No real authentication.</p>
      <form onSubmit={submit} className="grid gap-3">
        <label className="grid gap-1">
          <span className="text-xs text-gray-500">Email</span>
          <input value={email} onChange={e=>setEmail(e.target.value)} className="border rounded-xl px-3 py-2" type="email"/>
        </label>
        <label className="grid gap-1">
          <span className="text-xs text-gray-500">Name (optional)</span>
          <input value={name} onChange={e=>setName(e.target.value)} className="border rounded-xl px-3 py-2"/>
        </label>
        <button className="bg-blue-600 text-white rounded-xl px-4 py-2">Login</button>
      </form>
    </div>
  );
}
