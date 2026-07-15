import { Routes, Route } from "react-router-dom";
import {
  CategoriesPage,
  DashboardPage,
  OrdersPage,
  ProductsPage,
  SuppliersPage,
  Layout,
  EditProductPage,
  CreateOrder,
  ViewSupplierPage,
} from "./pages";
import ViewOrderPage from "./pages/ViewOrderPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index="/" element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/edit-product/:id" element={<EditProductPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/create-order" element={<CreateOrder />} />
          <Route path="/orders/view-order/:id" element={<ViewOrderPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/suppliers" element={<SuppliersPage />} />
          <Route path="/suppliers/:id" element={<ViewSupplierPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
