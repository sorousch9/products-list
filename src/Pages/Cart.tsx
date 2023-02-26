import {
  Container,
  Grid,
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
  TableFooter,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "../Components/Navbar";
import { Fragment } from "react";
const Cart: React.FC = () => {
  return (
    <Fragment>
      <Navbar />
      <Container maxWidth="lg" sx={{ backgroundColor: "#f3f3f3" }}>
        <Grid
          item
          container
          sx={{
            justifyContent: "space-evenly",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            alignItems: "start",
          }}
        >
          <Grid item sm={12} md={8}>
            <TableContainer component={Paper} elevation={6}>
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
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <ListItem sx={{ paddingLeft: "2px" }}>
                        <ListItemAvatar>
                          <Avatar
                            alt="product 1"
                            src="https://images.pexels.com/photos/13802279/pexels-photo-13802279.jpeg?auto=compress&cs=tinysrgb&w=1600"
                            sx={{
                              width: 62,
                              height: 62,
                              marginRight: "1rem",
                            }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary="Product name 1"
                          secondary="Color: black Size:32"
                        />
                      </ListItem>
                    </TableCell>
                    <TableCell align="right">$44</TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="remove item" size="small">
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      4
                      <IconButton aria-label="add item" size="small">
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">$44</TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="remove item" size="small">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3} align="right">
                      Subtotal
                    </TableCell>
                    <TableCell align="right">$ 36</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item sm={12} md={3}>
            <TableContainer component={Paper} elevation={6}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={2}>TOTAL</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="left">Subtotal</TableCell>
                    <TableCell align="right">$32</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Delivery</TableCell>
                    <TableCell align="right">$3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <strong>Total (VAT included)</strong>
                    </TableCell>
                    <TableCell align="right">$32</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Cart;
