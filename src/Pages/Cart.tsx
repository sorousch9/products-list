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
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "../Components/Navbar";

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
                    <TableCell>Product Name</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Name
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
