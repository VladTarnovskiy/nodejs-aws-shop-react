import Typography from "@mui/material/Typography";
import { Product } from "~/models/Product";
import CartIcon from "@mui/icons-material/ShoppingCart";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { useCart, useInvalidateCart, useUpsertCart } from "~/queries/cart";
import { isAuthenticated } from "~/utils/authStorage";

type AddProductToCartProps = {
  product: Product;
};

export default function AddProductToCart({ product }: AddProductToCartProps) {
  const navigate = useNavigate();
  const { data = [], isFetching } = useCart();
  const { mutate: upsertCart } = useUpsertCart();
  const invalidateCart = useInvalidateCart();
  const cartItem = data.find((i) => i.product.id === product.id);

  const requireAuth = () => {
    if (!isAuthenticated()) {
      navigate("/login");
      return false;
    }
    return true;
  };

  const addProduct = () => {
    if (!requireAuth()) return;
    upsertCart(
      { product, count: cartItem ? cartItem.count + 1 : 1 },
      { onSuccess: invalidateCart }
    );
  };

  const removeProduct = () => {
    if (!requireAuth() || !cartItem) return;
    upsertCart(
      { ...cartItem, count: cartItem.count - 1 },
      { onSuccess: invalidateCart }
    );
  };

  return cartItem ? (
    <>
      <IconButton disabled={isFetching} onClick={removeProduct} size="large">
        <Remove color={"secondary"} />
      </IconButton>
      <Typography align="center">{cartItem.count}</Typography>
      <IconButton disabled={isFetching} onClick={addProduct} size="large">
        <Add color={"secondary"} />
      </IconButton>
    </>
  ) : (
    <IconButton disabled={isFetching} onClick={addProduct} size="large">
      <CartIcon color={"secondary"} />
    </IconButton>
  );
}
