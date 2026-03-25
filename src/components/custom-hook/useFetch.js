import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        console.log("FULL DATA:", res.data);

        
        setProducts(res.data.products);

        setIsLoading(false);
      })
      .catch((err) => {
        setError("Error fetching data");
        setIsLoading(false);
      });
  }, [url]);

  return { products, error, isLoading };
};

export default useFetch;