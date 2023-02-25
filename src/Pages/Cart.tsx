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
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "../Components/Navbar";
import ImageIcon from "@mui/icons-material/Image";
const Cart: React.FC = () => {
  return (
    <div>
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
          <Grid sm={12} md={3}>
            <TableContainer component={Paper} elevation={6}>
              <TableRow>
                <TableCell>
                  <strong>TOTAL</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Subtotal</TableCell>
                <TableCell align="right">$32</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Delivery</TableCell>
                <TableCell align="right">$32</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontSize: "1rem" }}>
                  <strong>Total (VAT included)</strong>{" "}
                </TableCell>
                <TableCell
                  sx={{ fontSize: "1.3rem", paddingLeft: "2.5rem" }}
                  align="justify"
                >
                  <strong>$32</strong>
                </TableCell>
              </TableRow>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Cart;
