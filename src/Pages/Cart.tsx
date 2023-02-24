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
} from "@mui/material";
import Navbar from "../Components/Navbar";

const Cart = () => {
  return (
    <div>
      <Navbar />
      <Container maxWidth="lg" sx={{ backgroundColor: "gray" }}>
        <Grid container sx={{ backgroundColor: "red" }}>
          <Grid item xs={12} sm={9} sx={{ backgroundColor: "yellow" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="cart table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      name
                    </TableCell>
                    <TableCell align="right">$23</TableCell>
                    <TableCell align="right">3</TableCell>
                    <TableCell align="right">$32</TableCell>
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
          <Grid item xs={12} sm={3}>
            Col 2
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Cart;
