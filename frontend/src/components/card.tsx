import { Product } from "../types/index";
import useCart from "../hooks/useCart";

export default ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const {
    id: productId,
    attributes: {
      name,
      short_description: shortDescription,
      images: { data: images },
    },
  } = product;

  const [image] = images;

  const {
    attributes: { url },
  } = image;

  const handleClick = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    product && (
      <div className="card w-80 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src={`http://localhost:1337${url}`}
            alt="Shoes"
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{name}</h2>
          <h3 className="card-subtitle">
            Price: {product.attributes.price} 💎
          </h3>
          <p>{shortDescription}</p>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={handleClick}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    )
  );
};
