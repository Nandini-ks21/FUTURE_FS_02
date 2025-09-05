# FUTURE_FS_02

# miniShop — Mini E‑Commerce (Next.js + Tailwind)

A minimal, polished storefront with product listing, search/filter, cart with quantity, simulated checkout (with validation), optional login, and order history. No backend required — data is stored in `localStorage`.

## 🚀 Quick Start

```bash
npm install
npm run dev
# visit http://localhost:3000
```

## 🧰 Stack

- Next.js (App Router) + React 18
- Tailwind CSS
- State: useContext (custom StoreProvider)
- Optional login + order history stored in localStorage

## ✨ Features

- Product list with search, category filter, price range, and sort
- Shopping cart with add/remove/quantity
- Checkout simulation with form validation
- Optional login and per-user order history

## 🗂 Structure

```
app/            # routes (/, /cart, /checkout, /orders, /login)
components/     # UI components
context/        # global store (cart, orders, user)
data/           # demo product data
utils/          # validation helpers
```

## 🔧 Notes

- Images are loaded from Unsplash URLs (no API keys).
- All prices are demo INR values.
- Authentication is simulated (email only).
