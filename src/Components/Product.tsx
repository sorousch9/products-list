import { useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";
import { useAppDispatch } from "./Hooks/hooks";
import {
  addProduct,
  getCartCount,
  getSubTotal,
  getTotalAmount,
  ProductType,
} from "../Redux/cartRedux";
import CustomButton from "../UI/CustomButton";

interface ItemType {
  product: ProductType;
}

const Product: React.FC<ItemType> = ({ product }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {}, [dispatch]);
  if (!product) {
    return null;
  }
  const addToCart = (product: ProductType) => {
    dispatch(addProduct({ ...product }));
    dispatch(getCartCount());
    dispatch(getSubTotal());
    dispatch(getTotalAmount());
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={product.name}
        height="140"
        image={product.img}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <Link
            className="Links"
            to={`http://localhost:3000/product/${product.id}`}
          >
            {product.name}
          </Link>
        </Typography>
        <Typography>
          Price: <strong>${product.price}</strong>
        </Typography>
      </CardContent>
      <CardActions>
        <CustomButton
          variant="secondary"
          style={{ padding: ".3rem" }}
          onClick={() => {
            addToCart(product);
          }}
        >
          Add to Cart{" "}
          <AddShoppingCartIcon
            fontSize="small"
            style={{ paddingLeft: ".5rem" }}
          />
        </CustomButton>
      </CardActions>
    </Card>
  );
};

export default Product;
