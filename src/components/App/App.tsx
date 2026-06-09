import { Routes, Route } from "react-router-dom";
import MainLayout from "~/components/MainLayout/MainLayout";
import PrivateRoute from "~/components/PrivateRoute/PrivateRoute";
import PageProductForm from "~/components/pages/PageProductForm/PageProductForm";
import PageOrders from "~/components/pages/PageOrders/PageOrders";
import PageOrder from "~/components/pages/PageOrder/PageOrder";
import PageProductImport from "~/components/pages/admin/PageProductImport/PageProductImport";
import PageCart from "~/components/pages/PageCart/PageCart";
import PageProducts from "~/components/pages/PageProducts/PageProducts";
import PageLogin from "~/components/pages/PageLogin/PageLogin";
import PageRegister from "~/components/pages/PageRegister/PageRegister";
import { Typography } from "@mui/material";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<PageProducts />} />
        <Route path="login" element={<PageLogin />} />
        <Route path="register" element={<PageRegister />} />
        <Route
          path="cart"
          element={
            <PrivateRoute>
              <PageCart />
            </PrivateRoute>
          }
        />
        <Route path="admin/orders">
          <Route
            index
            element={
              <PrivateRoute>
                <PageOrders />
              </PrivateRoute>
            }
          />
          <Route
            path=":id"
            element={
              <PrivateRoute>
                <PageOrder />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="admin/products" element={<PageProductImport />} />
        <Route path="admin/product-form">
          <Route index element={<PageProductForm />} />
          <Route path=":id" element={<PageProductForm />} />
        </Route>
        <Route
          path="*"
          element={<Typography variant="h1">Not found</Typography>}
        />
      </Routes>
    </MainLayout>
  );
}

export default App;
