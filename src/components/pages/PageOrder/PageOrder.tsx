import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import PaperLayout from "~/components/PaperLayout/PaperLayout";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { CartItem } from "~/models/CartItem";
import { OrderItem } from "~/models/Order";
import ReviewOrder from "~/components/pages/PageCart/components/ReviewOrder";
import { useOrders } from "~/queries/orders";
import { useAvailableProducts } from "~/queries/products";

export default function PageOrder() {
  const { id } = useParams<{ id: string }>();
  const { data: orders, isLoading: isOrdersLoading } = useOrders();
  const { data: products, isLoading: isProductsLoading } =
    useAvailableProducts();

  const order = orders?.find((o) => o.id === id);

  const cartItems: CartItem[] = React.useMemo(() => {
    if (!order || !products) {
      return [];
    }
    return order.items.flatMap((item: OrderItem) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        return [];
      }
      return [{ product, count: item.count }];
    });
  }, [order, products]);

  if (isOrdersLoading || isProductsLoading) {
    return <p>loading...</p>;
  }

  if (!order) {
    return (
      <PaperLayout>
        <Typography variant="h6" gutterBottom>
          Order not found
        </Typography>
        <Button component={RouterLink} to="/admin/orders">
          Back to orders
        </Button>
      </PaperLayout>
    );
  }

  const lastStatus =
    order.statusHistory[order.statusHistory.length - 1]?.status;

  return (
    <PaperLayout>
      <Typography component="h1" variant="h4" align="center">
        Order details
      </Typography>
      <Alert severity="info" sx={{ my: 2 }}>
        Order status updates are not supported by cart API (read-only view).
      </Alert>
      <ReviewOrder address={order.address} items={cartItems} />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Status: {lastStatus?.toUpperCase()}
      </Typography>
      <Button component={RouterLink} to="/admin/orders" sx={{ mt: 2 }}>
        Back to orders
      </Button>
    </PaperLayout>
  );
}
