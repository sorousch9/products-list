import Product from "./Product";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

interface ProductT {
  id: string;
  name: string;
  description: string;
  price: number;
  img: string;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const productsSizeFilter = ["38", "48", "33", "42", "35", "44"];
const productsPriceFilter = [10, 12, 13, 29, 49, 58];

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductT[]>([]);
  const [productPrice, setProductPrice] = useState<number[]>([]);
  const [productSize, setProductSize] = useState<string[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/products").then((response) => {
      setProducts(response.data);
    });
  }, []);
  // console.log(products);
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    if (event.target.name === "price") {
      setProductPrice(typeof value === "string" ? value.split(",") : value);
    }
    if (event.target.name === "size") {
      setProductSize(value);
    }

    console.log(event.target);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={12} md={5} lg={4}>
          <Grid container spacing={0}>
            <Item>Filtering section</Item>
          </Grid>
          <Item>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-checkbox-label">Price</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                name="price"
                value={productPrice}
                onChange={handleChange}
                input={<OutlinedInput label="Price" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {productsPriceFilter.map((product) => (
                  <MenuItem key={product} value={product}>
                    <Checkbox checked={productPrice.indexOf(product) > -1} />
                    <ListItemText primary={product} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Item>
          <Item>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-checkbox-label">Size</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                name="price"
                value={productSize}
                onChange={handleChange}
                input={<OutlinedInput label="Size" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {productsSizeFilter.map((product) => (
                  <MenuItem key={product} value={product}>
                    <Checkbox checked={productSize.indexOf(product) > -1} />
                    <ListItemText primary={product} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Item>
          <Item>Color</Item>
          <Item>Action</Item>
          <Item>Categories</Item>
          <Item>for whom?</Item>
        </Grid>
        <Grid container xs={12} md={7} lg={8} spacing={4}>
          {products.map((product) => (
            <Grid xs={6} lg={3} key={product.id}>
              <Box component="ul" aria-labelledby="category-a" sx={{ pl: 2 }}>
                <Product product={product} key={product.id} />
              </Box>
            </Grid>
          ))}
        </Grid>
        <Grid
          xs={12}
          container
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ xs: "column", sm: "row" }}
          sx={{ fontSize: "12px" }}
        >
          <Grid sx={{ order: { xs: 2, sm: 1 } }}>
            <Item>© Copyright</Item>
          </Grid>
          <Grid container columnSpacing={1} sx={{ order: { xs: 1, sm: 2 } }}>
            <Grid>
              <Link to={"/"}>Link A</Link>
            </Grid>
            <Grid>
              <Link to={"/"}>Link B</Link>
            </Grid>
            <Grid>
              <Link to={"/"}>Link C</Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductList;
<div>
  <ul></ul>
</div>;
