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

const Cart: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Container maxWidth="lg" sx={{ backgroundColor: "#cdcdcd" }}>
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
          <Grid  sm={12} md={3}>
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
