import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

interface ProductT {
  product?: {
    id: string;
    name: string;
    description: string;
    price: number;
    img: string;
  };
}

const Product: React.FC<ProductT> = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={product?.name}
        height="140"
        image={product?.img}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        <Link to={`http://localhost:3000/product/${product?.id}`}>{product?.name}</Link>
        </Typography>
        <Typography>
          Price: <strong>${product?.price}</strong>
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" size="small" endIcon={<AddIcon />}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
