import Button from '@mui/material/Button';
interface ProductT {
  product?: {
    id: string;
    name: string;
    description: string;
    price: number;
    img: string;
  };
}

const Product: React.FC<ProductT> = ({ product }) => {
  return (
    <div className="product-container">
      <img src={product?.img} alt={product?.name} />
      <h2>{product?.name}</h2>
      <p>{product?.description}</p>
      <p>
        Price: <strong>${product?.price}</strong>
      </p>
      <Button variant="outlined"  >Add to Cart</Button>
    </div>
  );
};

export default Product;
