import Product from "./Product";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import { FormControlLabel, Switch } from "@mui/material";
import TextField from '@mui/material/TextField';
import axios from "axios";

interface ApiResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  img: string;
  inStock: boolean
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

const productsColorFilter = [
  "Black",
  "white",
  "red",
  "yellow",
  "green",
  "perple"
];
const productsBrand = [
  "Nike",
  "Puma",
  "Reebok",
  "Adidas",
  "Armani",
  "BOSS"
];


interface Filters {
  size: string[];
  price_gte: number;
  price_lte: number;
  inStock: boolean ;
  color: string[];
  brand: string[]
}
const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ApiResponse[]>([]);
  const [filters, setFilters] = useState<Filters>({
    size: [],
    price_gte: 0,
    price_lte: 100,
    inStock: true,
    color: [],
    brand: []
  });
console.log(filters)

  const handleFiltersChange = (event: SelectChangeEvent<string[]>) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };
  const handleMinPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setFilters({ ...filters, price_gte: Number(value) });
  };

  const handleMaxPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setFilters({ ...filters, price_lte: Number(value) });
  };

  const handleInStockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({...filters,inStock:Boolean(event.target.checked)})}

  useEffect(() => {
    const fetchProducts = async () => {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.append(key, value);
        }
      });

      const response = await axios.get<ApiResponse[]>(`http://localhost:3004/products?${params.toString()}`);
      setProducts(response.data);
    };

    fetchProducts();
  }, [filters]);


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={12} md={5} lg={4}>
          <Grid container spacing={0}>
            <Item>Filtering section</Item>
          </Grid>
          <Stack spacing={2}>
            <Item sx={{ paddingRight: "7rem", paddingLeft: "7rem" }}>
              <Typography gutterBottom>Price</Typography>
              <TextField
                label="Minimum Price"
                name="minPrice"
                type="number"
                value={filters.price_gte}
                onChange={handleMinPriceChange}
              />
              <TextField
                label="Maximum Price"
                name="maxPrice"
                type="number"
                value={filters.price_lte}
                onChange={handleMaxPriceChange}
              />
            </Item>
            <Item>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Size</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  name="size"
                  value={filters.size}
                  onChange={handleFiltersChange}
                  MenuProps={MenuProps}
                >
                  {productsSizeFilter.map((product) => (
                    <MenuItem key={product} value={product}>
                      <Checkbox checked={filters.size.indexOf(product) > -1} />
                      <ListItemText primary={product} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Item>
            <Item>
              {" "}
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Color</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  name="color"
                  value={filters.color}
                  onChange={handleFiltersChange}
                  input={<OutlinedInput label="Color" />}
                  MenuProps={MenuProps}
                >
                  {productsColorFilter.map((product) => (
                    <MenuItem key={product} value={product}>
                      <Checkbox checked={filters.color.indexOf(product) > -1} />
                      <ListItemText primary={product} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Item>
            <Item>
              <FormControlLabel
                value={filters.inStock}
                name="inStock"
                control={<Switch name="inStock" checked={filters.inStock} onChange={handleInStockChange} color="primary" />}
                label="in Stock"
                labelPlacement="start"
              />
            </Item>
            <Item>
              <FormControl sx={{ width: 300 }}>
                <InputLabel id="brand">Brands</InputLabel>
                <Select
                  labelId="brand"
                  value={filters.brand}
                  name="brand"
                  multiple
                  onChange={handleFiltersChange}>
                  <MenuItem value="">
                    <em>all</em>
                  </MenuItem>
                  {productsBrand.map((brand) => (
                    <MenuItem value={brand} key={brand}>{brand}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Item>

          </Stack>
        </Grid>
        <Grid container xs={12} md={7} lg={8} spacing={4}>
          {products.filter(product => filters.inStock === null || !filters.inStock || product.inStock).map((product) => (
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

export default ProductList