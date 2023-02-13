import Product from "./Product";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MultipleSelectCheckmarks from "../UI/Filter";
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

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductT[]>([]);
  useEffect(() => {
    axios.get("http://localhost:3000/products").then((response) => {
      setProducts(response.data);
    });
  }, []);
  console.log(products);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={12} md={5} lg={4}>
          <Grid container spacing={2}>
            <Item>Filtering section</Item>
          </Grid>
          <Item>
            Price = <MultipleSelectCheckmarks/>
          </Item>
          <Item>
            sss
          </Item>
          <Item>
            sss
          </Item>
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
