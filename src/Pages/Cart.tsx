import { Fragment, useEffect } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  styled,
  Box,
} from "@mui/material";
import pay from "../../src/Assets/cartPayment.png";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "../Components/Navbar";
import { useAppDispatch, useAppSelector } from "../Components/Hooks/hooks";
import {
  getTotalAmount,
  incrementQuantity,
  decrementQuantity,
  removeProduct,
  getCartProducts,
  getCartCount,
  getSubTotal,
} from "../Redux/cartRedux";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import { Stack } from "@mui/system";
import CustomButton from "../UI/CustomButton";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  minHeight: "5rem",
  color: theme.palette.text.secondary,
}));

var today = new Date();
var threeDaysLater = new Date();
threeDaysLater.setDate(today.getDate() + 3);
var dayDate = threeDaysLater.toLocaleDateString();
const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, subAmount, totalAmount, shipPrice } = useAppSelector(
    (state) => state.cart
  );
  useEffect(() => {
    dispatch(getCartProducts());
    dispatch(getSubTotal());
    dispatch(getCartCount());
    dispatch(getTotalAmount());
  }, [dispatch]);

  return (
    <Fragment>
      <Navbar />
      <Container maxWidth="lg" sx={{ backgroundColor: "#f3f3f3" }}>
        <Grid
          container
          sx={{
            justifyContent: "space-evenly",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            alignItems: "start",
          }}
        >
          <Grid sm={12} md={8}>
            <TableContainer
              component={Paper}
              elevation={3}
              sx={{ minHeight: "30vh" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Product Name</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                {products.length > 0 ? (
                  products.map((product) => (
                    <TableBody key={product.id}>
                      <TableRow>
                        <TableCell>
                          <ListItem sx={{ paddingLeft: "2px" }}>
                            <ListItemAvatar>
                              <Avatar
                                alt="product 1"
                                src={product.img}
                                sx={{
                                  width: 62,
                                  height: 62,
                                  marginRight: "1rem",
                                }}
                              />
                            </ListItemAvatar>
                            <Link
                              to={`/product/${product.id}`}
                              className="Links"
                            >
                              <ListItemText
                                primary={product.name}
                                secondary={`Color: ${product.color} Size: ${product.size}`}
                              />
                            </Link>
                          </ListItem>
                        </TableCell>
                        <TableCell align="right">$ {product.price}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            aria-label="remove item"
                            size="small"
                            onClick={() => {
                              dispatch(decrementQuantity(product.id));
                              dispatch(getSubTotal());
                              dispatch(getCartCount());
                              dispatch(getTotalAmount());
                            }}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          {product.quantity}
                          <IconButton
                            aria-label="add item"
                            size="small"
                            onClick={() => {
                              dispatch(
                                incrementQuantity({
                                  id: product.id,
                                  maxQuantity: product.inventory,
                                })
                              );
                              dispatch(getSubTotal());
                              dispatch(getCartCount());
                              dispatch(getTotalAmount());
                            }}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                        <TableCell align="right">
                          ${(product.price * product.quantity).toFixed(2)}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            aria-label="remove item"
                            size="small"
                            onClick={() => {
                              dispatch(removeProduct(product.id));
                              dispatch(getSubTotal());
                              dispatch(getCartCount());
                              dispatch(getTotalAmount());
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3} align="right">
                          Subtotal
                        </TableCell>
                        <TableCell align="right">
                          ${(product.price * product.quantity).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ))
                ) : (
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontSize: "1rem" }}>
                        There is no item in your shopping cart
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Grid>
          <Grid sm={12} md={3}>
            <TableContainer
              component={Paper}
              elevation={3}
              sx={{ minHeight: "30vh" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={2}>
                      TOTAL
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="left">Subtotal</TableCell>
                    <TableCell align="right">${subAmount.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Delivery</TableCell>
                    <TableCell align="right">
                      ${subAmount > 1 ? shipPrice : "0"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <strong>Total (including tax)</strong>
                    </TableCell>
                    <TableCell align="right">
                      ${totalAmount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Stack spacing={2} m={2}>
                <CustomButton
                  onClick={() => {
                    alert("checkout");
                  }}
                >
                  Go to checkout
                </CustomButton>
              </Stack>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
      {shipPrice > 0 ? (
        <Typography sx={{ m: 3 }} color="text.secondary">
          If your bag is over 49,99 € you will qualify for free shipping
        </Typography>
      ) : (
        ""
      )}
      <Container maxWidth="lg" sx={{ backgroundColor: "#f3f3f3" }}>
        <Box>
          <Grid container spacing={2} columns={16}>
            <Grid xs={8}>
              <Item>
                <Typography variant="h5" component="div">
                  Estimated delivery
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {dayDate}
                </Typography>
              </Item>
            </Grid>
            <Grid xs={8}>
              <Item>
                <Typography variant="h5" component="div">
                  We accept
                </Typography>
                <img src={pay} alt="payimage" style={{ width: "100%" }} />
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Fragment>
  );
};

export default Cart;
