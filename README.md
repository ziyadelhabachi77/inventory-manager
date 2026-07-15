# 📦 Inventory Manager

A full-stack inventory management application built to help businesses track and manage their products, orders, suppliers, and categories from a clean, modern dashboard.

## ✨ Features

- **Dashboard** — Get an overview of your inventory with key stats and insights at a glance.
- **Products** — Add, edit, and manage your product catalog.
- **Orders** — Track and manage customer/supplier orders.
- **Suppliers** — Keep a record of your suppliers and their details.
- **Categories** — Organize your products into categories for easier management.
- **Light & Dark Mode** — Fully supported theme switching for a comfortable viewing experience.

## 🖼️ Screenshots

### Dashboard
| Light Mode | Dark Mode |
|:---:|:---:|
| ![Light Dashboard](https://i.imgur.com/NAG8egi.png) | ![Dark Dashboard](https://i.imgur.com/8ByfnaQ.png) |

### Products
![Products](https://i.imgur.com/5mEHPxm.png)

### Categories
![Categories](https://i.imgur.com/qL483tD.png)

### Orders
| Order View 1 | Order View 2 |
|:---:|:---:|
| ![Orders](https://i.imgur.com/JglJjoG.png) | ![Orders Alternate View](https://i.imgur.com/AzshwJo.png) |

## 🛠️ Tech Stack

**Frontend**
- React
- (Vite / React Router / Axios, depending on setup)

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB

## 📁 Project Structure

```
inventory-manager/
├── bakend/          # Backend (Node.js + Express + MongoDB)
└── frontend/     # Frontend (React)
```

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB instance (local or cloud, e.g. MongoDB Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/inventory-manager.git
cd inventory-manager
```

### 2. Setup the Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `bachend` folder with your environment variables, for example:
```
PORT=5050
MONGODB_URI=your_mongodb_connection_string
```

Run the backend:
```bash
npm run dev
```

### 3. Setup the Frontend
```bash
cd ../frontend
npm install
npm run dev
```

The frontend will typically run on `http://localhost:5173` and the backend backend on `http://localhost:5000` (adjust based on your actual configuration).

## 📌 Notes

This README is a starting template — feel free to update the tech stack details, environment variables, and ports to match your exact project setup.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
