import { Product } from "../types/index";

export default ({ product }: { product: Product }) => {
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
          <p>{shortDescription}</p>
          <div className="card-actions">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    )
  );
};
