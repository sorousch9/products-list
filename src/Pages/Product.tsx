import Grid from "@mui/material/Unstable_Grid2";
import {
  Select,
  SelectChangeEvent,
  Button,
  Paper,
  Card,
  Box,
  styled,
  CardMedia,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Rating,
  Typography,
  CircularProgress,
  Breadcrumbs,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Fragment, useEffect, useState } from "react";
import { Stack } from "@mui/system";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import {
  addProduct,
  getCartCount,
  getSubTotal,
  getTotalAmount,
  ProductType,
} from "../Redux/cartRedux";
import { useAppDispatch } from "../Components/Hooks/hooks";

const ItemMUI = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const dispatch = useAppDispatch();
  const addToCart = (product: ProductType) => {
    dispatch(addProduct({ ...product }));
    dispatch(getCartCount());
    dispatch(getSubTotal());
    dispatch(getTotalAmount());
  };
  useEffect(() => {}, [dispatch]);

  useEffect(() => {
    axios
      .get<ProductType>(`http://localhost:3004/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      });
  }, [id]);

  if (!product) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleChange = (event: SelectChangeEvent) => {
    setSize(event.target.value);
  };
  const handleChange2 = (event: SelectChangeEvent) => {
    setColor(event.target.value);
  };

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
  }

  return (
    <Fragment>
      <Navbar />
      <Box sx={{ flexGrow: 1 }}>
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" to="/" className="Links">
              Home
            </Link>
            <Link className="Links" color="inherit" to="/products">
              Products
            </Link>
            <Typography color="text.primary">{product.name}</Typography>
          </Breadcrumbs>
        </div>
        <Grid container spacing={3}>
          <Grid xs={12} md={7}>
            <ItemMUI>
              <Card>
                <CardMedia
                  sx={{ height: 650 }}
                  image={product.img}
                  title={product.name}
                />
              </Card>
            </ItemMUI>
          </Grid>
          <Grid xs md>
            <Stack direction="column" justifyContent="space-around" spacing={2}>
              <ItemMUI>
                <Typography variant="h4">{product.name}</Typography>
                <Typography gutterBottom>Brand : {product.brand}</Typography>
              </ItemMUI>
              <ItemMUI>
                <Typography sx={{ textAlign: "left" }}>
                  {product.description}
                </Typography>
              </ItemMUI>

              <ItemMUI>
                <FormControl sx={{ m: 2, minWidth: 180 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Size
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={size}
                    label="Value"
                    onChange={handleChange}
                  >
                    {typeof product?.size === "object" ? (
                      product?.size.map((item) => (
                        <MenuItem value={item} key={item}>
                          {item}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value={product?.size}>{product?.size}</MenuItem>
                    )}
                  </Select>
                  <FormHelperText sx={{ m: 1, minWidth: 180 }}>
                    Required *
                  </FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 2, minWidth: 180 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Color
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={color}
                    label="Value"
                    onChange={handleChange2}
                  >
                    {typeof product?.color === "object" ? (
                      product?.color.map((item) => (
                        <MenuItem value={item} key={item}>
                          {item}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value={product?.color}>
                        {product?.color}
                      </MenuItem>
                    )}
                  </Select>

                  <FormHelperText sx={{ m: 1, minWidth: 120 }}>
                    Required *
                  </FormHelperText>
                </FormControl>
              </ItemMUI>
              <ItemMUI sx={{ textAlign: "left" }}>
                <Typography variant="h5" color={blueGrey[900]}>
                  Price : $ {product.price}
                </Typography>
                <Typography variant="caption">
                  <strong>inkl. MwSt. zzgl.</strong> Versandkosten
                </Typography>
              </ItemMUI>
              <ItemMUI sx={{ textAlign: "left" }}>
                <Typography variant="body1">Seller: Olano GmbH</Typography>
                <Typography variant="caption">
                  AGB Datenschutz Impressum
                </Typography>
              </ItemMUI>
              <Button
                variant="contained"
                endIcon={<AddShoppingCartIcon />}
                onClick={() => {
                  addToCart(product);
                }}
              >
                Add to Cart
              </Button>
              <Button variant="outlined" endIcon={<FavoriteBorderIcon />}>
                Remember Article
              </Button>
              <Button variant="outlined" endIcon={<ShareIcon />}>
                Share
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <ItemMUI sx={{ textAlign: "left" }}>
          <Typography>Customer reviews</Typography>
          <Rating
            name="half-rating-read"
            defaultValue={4.5}
            precision={0.5}
            readOnly
          />
        </ItemMUI>
      </Box>
    </Fragment>
  );
};

export default Product;
