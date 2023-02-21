import Grid from "@mui/material/Unstable_Grid2";
import {
  Select,
  SelectChangeEvent,
  Button,
  Paper,
  Card,
  Box,
  styled,
  CardMedia,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Rating,
  Typography,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import axios from "axios";
import { useParams } from "react-router-dom";
interface ProductT {
  id: string;
  name: string;
  description: string;
  price: number;
  img: string;
  inStock: boolean;
  brand: string;
  color: string;
  size: string;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductT | null>(null);
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");

  useEffect(() => {
    axios
      .get<ProductT>(`http://localhost:3004/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }
  console.log(product)

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };
  const handleChange2 = (event: SelectChangeEvent) => {
    setValue2(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid xs={12} md={7}>
          <Item>
            <Card>
              <CardMedia
                sx={{ height: 650 }}
                image="https://images.pexels.com/photos/14758630/pexels-photo-14758630.jpeg?cs=srgb&dl=pexels-hatice-no%C4%9Fman-14758630.jpg&fm=jpg&w=640&h=960"
                title="green iguana"
              />
            </Card>
          </Item>
        </Grid>
        <Grid xs md>
          <Stack direction="column" justifyContent="space-around" spacing={2}>
            <Item>
              <Typography variant="h4">name</Typography>
              <Typography gutterBottom>Brand Name</Typography>
            </Item>
            <Item>
              <Typography sx={{ textAlign: "left" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
                et, veritatis ipsum reiciendis asperiores fuga aperiam
                voluptates. Natus fugiat, doloremque, voluptatibus voluptate at
                ullam, deserunt sed sunt et sint soluta.
              </Typography>
            </Item>

            <Item>
              <FormControl sx={{ m: 2, minWidth: 180 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Value
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value}
                  label="Value"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Value </MenuItem>
                  <MenuItem value={2}>Value one</MenuItem>
                  <MenuItem value={3}>Value one and a half</MenuItem>
                </Select>
                <FormHelperText sx={{ m: 1, minWidth: 180 }}>
                  Required *
                </FormHelperText>
              </FormControl>
              <FormControl sx={{ m: 2, minWidth: 180 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Value2
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value2}
                  label="Value"
                  onChange={handleChange2}
                >
                  <MenuItem value={1}>Value </MenuItem>
                  <MenuItem value={2}>Value one</MenuItem>
                  <MenuItem value={3}>Value one and a half</MenuItem>
                </Select>

                <FormHelperText sx={{ m: 1, minWidth: 120 }}>
                  Required *
                </FormHelperText>
              </FormControl>
            </Item>
            <Item sx={{ textAlign: "left" }}>
              <Typography variant="h5" color={blueGrey[900]}>
                Price : $ 199
              </Typography>
              <Typography variant="caption">
                <strong>inkl. MwSt. zzgl.</strong> Versandkosten
              </Typography>
            </Item>
            <Item sx={{ textAlign: "left" }}>
              <Typography variant="body1">Seller: Olano GmbH</Typography>
              <Typography variant="caption">
                AGB Datenschutz Impressum
              </Typography>
            </Item>
            <Button variant="contained" endIcon={<AddShoppingCartIcon />}>
              Add to Cart
            </Button>
            <Button variant="outlined" endIcon={<FavoriteBorderIcon />}>
              Remember Article
            </Button>
            <Button variant="outlined" endIcon={<ShareIcon />}>
              Share
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Item sx={{ textAlign: "left" }}>
        <Typography>Customer reviews</Typography>
        <Rating
          name="half-rating-read"
          defaultValue={4.5}
          precision={0.5}
          readOnly
        />
      </Item>
    </Box>
  );
};

export default Product;
