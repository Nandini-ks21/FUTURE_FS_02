"use client";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";
import productsData from "@/data/products";

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("relevance");
  const categories = useMemo(() => ["all", ...new Set(productsData.map(p => p.category))], []);

  const filtered = useMemo(() => {
    let list = productsData.filter(p => 
      p.title.toLowerCase().includes(query.toLowerCase().trim()) || 
      p.description.toLowerCase().includes(query.toLowerCase().trim())
    );
    if (category !== "all") list = list.filter(p => p.category === category);
    if (minPrice) list = list.filter(p => p.price >= Number(minPrice));
    if (maxPrice) list = list.filter(p => p.price <= Number(maxPrice));
    if (sort === "price-asc") list = [...list].sort((a,b)=>a.price-b.price);
    if (sort === "price-desc") list = [...list].sort((a,b)=>b.price-a.price);
    if (sort === "name-asc") list = [...list].sort((a,b)=>a.title.localeCompare(b.title));
    return list;
  }, [query, category, minPrice, maxPrice, sort]);

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[220px]">
          <label className="block text-xs font-medium text-gray-500">Search</label>
          <input value={query} onChange={e=>setQuery(e.target.value)}
            placeholder="Search products..." className="w-full border rounded-xl px-3 py-2" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500">Category</label>
          <select value={category} onChange={e=>setCategory(e.target.value)} className="border rounded-xl px-3 py-2">
            {categories.map(c=>(<option key={c} value={c}>{c}</option>))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500">Min Price</label>
          <input value={minPrice} onChange={e=>setMinPrice(e.target.value)} type="number" className="w-28 border rounded-xl px-3 py-2"/>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500">Max Price</label>
          <input value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} type="number" className="w-28 border rounded-xl px-3 py-2"/>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500">Sort</label>
          <select value={sort} onChange={e=>setSort(e.target.value)} className="border rounded-xl px-3 py-2">
            <option value="relevance">Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name A→Z</option>
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        {filtered.length === 0 && <p className="text-gray-500">No products found. Try adjusting filters.</p>}
      </div>
    </div>
  );
}
