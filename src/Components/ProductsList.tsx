import Product from "./Product";

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
  ];

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Product product={product} key={product.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
