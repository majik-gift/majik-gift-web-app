"use client";
import ApiManager from "@/helper/api-manager";
import { useState, useEffect } from "react";

const useFilterApiData = (url) => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let { data } = await ApiManager({
          method: "get",
          path: url,
        });
        if (data.status === 200) {
          setApiData(data?.response?.details);
          setError(null);
        }
      } catch (err) {
        setError(err.message || "Something went wrong!");
        setApiData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); // Re-run effect when URL changes

  return { apiData, loading, error };
};

export default useFilterApiData;
