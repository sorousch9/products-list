import Product from "./Product";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ProductList: React.FC = () => {
  const products = [
    {
      id: "1",
      name: "Product 1",
      description: "This is the first product",
      price: 10,
      img: "https://images.pexels.com/photos/13867156/pexels-photo-13867156.jpeg?cs=srgb&dl=pexels-studio-naae-13867156.jpg&fm=jpg&w=140&h=153",
    },
    {
      id: "2",
      name: "Product 2",
      description: "This is the second product",
      price: 20,
      img: "https://images.pexels.com/photos/13867156/pexels-photo-13867156.jpeg?cs=srgb&dl=pexels-studio-naae-13867156.jpg&fm=jpg&w=140&h=153",
    },
    {
      id: "3",
      name: "Product 3",
      description: "This is the third product",
      price: 30,
      img: "https://images.pexels.com/photos/13867156/pexels-photo-13867156.jpeg?cs=srgb&dl=pexels-studio-naae-13867156.jpg&fm=jpg&w=140&h=153",
    },
    {
      id: "4",
      name: "Product 4",
      description: "This is the third product",
      price: 40,
      img: "https://images.pexels.com/photos/13867156/pexels-photo-13867156.jpeg?cs=srgb&dl=pexels-studio-naae-13867156.jpg&fm=jpg&w=140&h=153",
    },
  ];

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={12} md={5} lg={4}>
            <Item>Filtering section</Item>
          </Grid>
          <Grid container xs={12} md={7} lg={8} spacing={4}>
            {products.map((product) => (
              <Grid xs={6} lg={3} key={product.id}>
                <Item>
                  <Box
                    id="category-a"
                    sx={{ fontSize: "12px", textTransform: "uppercase" }}
                  >
                    {product.name}
                  </Box>
                  <Box
                    component="ul"
                    aria-labelledby="category-a"
                    sx={{ pl: 2 }}
                  >
                    <Product product={product} key={product.id} />
                  </Box>
                </Item>
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
                <Item>Link A</Item>
              </Grid>
              <Grid>
                <Item>Link B</Item>
              </Grid>
              <Grid>
                <Item>Link C</Item>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ProductList;
<div>
  <ul></ul>
</div>;
