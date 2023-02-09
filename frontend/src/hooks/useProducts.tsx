import { useEffect, useState } from "react";

type Image = {
  id: number;
  url: string;
  ProductId: number;
};

type Product = {
  attributes: any;
  id: number;
  name: string;
  price: number;
  description: string;
  images: Image[];
};

type Category = string | undefined;

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "http://localhost:1337/api/products?populate=*"
      );
      const products = await response.json();
      setProducts(products.data);
    };
    fetchProducts();
  }, []);

  return products;
};

export const useProductsCategory = (category: Category) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        category !== "all"
          ? `http://localhost:1337/api/products?populate=*&filters[category][name][$eqi]=${category}`
          : "http://localhost:1337/api/products?populate=*"
      );
      const products = await response.json();
      setProducts(products.data);
    };
    fetchProducts();
  }, [category]);

  return products;
};

export const useProductsBest = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "http://localhost:1337/api/products?populate=*&sort=added_to_basket:desc&pagination[limit]=4"
      );
      const products = await response.json();
      setProducts(products.data);
    };
    fetchProducts();
  }, []);

  return products;
};

export const useProductsSearch = (search, category = "all") => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        category !== "all"
          ? `http://localhost:1337/api/products?populate=*&filters[category][name][$eqi]=${category}&filters[name][$containsi]=${search}`
          : `http://localhost:1337/api/products?populate=*&filters[name][$containsi]=${search}`
      );
      const products = await response.json();
      setProducts(products.data);
    };
    fetchProducts();
  }, [search]);

  return products;
};

export const useProduct = (id: number) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `http://localhost:1337/api/products/${id}?populate=*`
      );
      const product = await response.json();
      setProduct(product.data);
    };
    fetchProducts();
  }, []);

  return product;
};
