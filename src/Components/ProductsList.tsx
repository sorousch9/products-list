import Product from "./Product";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import {
  ListItemText,
  SelectChangeEvent,
  Paper,
  styled,
  Box,
  FormControl,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
  Checkbox,
  TextField,
  Pagination,
  PaginationItem,
} from "@mui/material";
import axios from "axios";

interface ApiResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  img: string;
  inStock: boolean;
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
  "perple",
];
const productsBrand = ["Nike", "Puma", "Reebok", "Adidas", "Armani", "BOSS"];

interface Filters {
  size: string[];
  price_gte: number;
  price_lte: number;
  inStock: boolean;
  color: string[];
  brand: string[];
}
const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ApiResponse[]>([]);
  const [countPrdoducts, setCountPrdoducts] = useState(12);
  const [filters, setFilters] = useState<Filters>({
    size: [],
    price_gte: 0,
    price_lte: 100,
    inStock: true,
    color: [],
    brand: [],
  });

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const pageNumber = parseInt(query.get("page") || "1", 10);

  let pageLimit: number = 10;

  const handleFiltersChange = (event: SelectChangeEvent<string[]>) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };
  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFilters({ ...filters, price_gte: Number(value) });
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFilters({ ...filters, price_lte: Number(value) });
  };

  const handleInStockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, inStock: Boolean(event.target.checked) });
  };

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

      const response = await axios.get<ApiResponse[]>(
        `http://localhost:3004/products?_page=${pageNumber}&_limit=${pageLimit}&${params.toString()}`
      );
      setProducts(response.data);
      setCountPrdoducts(response.headers["x-total-count"]);
    };

    fetchProducts();
  }, [filters, pageNumber, pageLimit]);

  
  const totalPage = +(
    countPrdoducts < 10 ? 1 : countPrdoducts / pageLimit
  ).toFixed();

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
                  input={<OutlinedInput label="Size" />}
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
                control={
                  <Switch
                    checked={filters.inStock}
                    name="inStock"
                    onChange={handleInStockChange}
                    color="primary"
                  />
                }
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
                  input={<OutlinedInput label="Brand" />}
                  onChange={handleFiltersChange}
                >
                  <MenuItem value="">
                    <em>all</em>
                  </MenuItem>
                  {productsBrand.map((brand) => (
                    <MenuItem value={brand} key={brand}>
                      {brand}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Item>
          </Stack>
        </Grid>
        <Grid container xs={12} md={7} lg={8} spacing={4}>
          {products.map((product) => (
            <Grid xs={6} lg={4} xl={3} key={product.id}>
              <Box component="ul" aria-labelledby="category-a" sx={{ pl: 0 }}>
                <Product product={product} key={product.id} />
              </Box>
            </Grid>
          ))}
          <Grid
            container
            xs={12}
            md={12}
            lg={12}
            spacing={4}
            justifyContent="center"
          >
            <Pagination
              sx={{ justifyContent: "center" }}
              page={pageNumber}
              count={totalPage}
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  to={`/${item.page === 1 ? "" : `?page=${item.page}`}`}
                  {...item}
                />
              )}
            />
          </Grid>
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductList;
