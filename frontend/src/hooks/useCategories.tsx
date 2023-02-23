import { useState, useEffect } from "react";

export default () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:1337/api/categories");
      const categories = await response.json();
      setCategories(categories.data);
    };
    fetchCategories();
  }, []);

  return categories;
};
