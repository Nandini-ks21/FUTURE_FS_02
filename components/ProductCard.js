"use client";
import { useStore } from "@/context/StoreContext";

export default function ProductCard({ product }){
  const { addToCart } = useStore();
  return (
    <div className="border rounded-2xl p-4 grid gap-3 hover:shadow-sm transition-shadow">
      <img src={product.image} alt="" className="w-full h-44 object-cover rounded-xl border"/>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold">{product.title}</h3>
          <p className="text-xs text-gray-500">{product.category}</p>
        </div>
        <div className="font-bold">₹{product.price.toFixed(2)}</div>
      </div>
      <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
      <button onClick={()=>addToCart(product)} className="bg-gray-900 text-white rounded-xl px-4 py-2">Add to Cart</button>
    </div>
  );
}
