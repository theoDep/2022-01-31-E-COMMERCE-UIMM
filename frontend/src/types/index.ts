export type Product = {
  id: number;
  attributes: {
    name: string;
    short_description: string;
    description: string;
    price: number;
    added_to_basket: number;
    images: Images;
  };
};

export type Category = {
  id: number;
  attributes: {
    name: string;
  };
};

export type Image = {
  id: number;
  attributes: {
    name: string;
    url: string;
  };
};

export type Products = {
  data: Product[];
};

export type Images = {
  data: Image[];
};

export type DetailsCardProps = { product: Product };
