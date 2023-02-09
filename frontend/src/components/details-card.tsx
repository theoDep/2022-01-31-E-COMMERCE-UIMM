import { DetailsCardProps } from "../types";

export default ({ product }: DetailsCardProps) => {
  const {
    id: productId,
    attributes: {
      name,
      description,
      images: { data: images },
      price,
    },
  } = product;

  const [image] = images;

  const {
    attributes: { url },
  } = image;

  return (
    <div className="container flex flex-col items-center">
      <figure className="">
        <img
          src={`http://localhost:1337${url}`}
          alt="pic"
          className="rounded-xl"
        />
      </figure>
      <div className="flex w-full">
        <div className="grid h-20 flex-grow card rounded-box place-items-center">
          {price} 💎
        </div>
        <div className="grid h-20 flex-grow card place-items-center">
          <button className="btn gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Add to pouch
          </button>
        </div>
      </div>
      <h4 className="text-2xl">{name}</h4>
      <p>{description}</p>
    </div>
  );
};
