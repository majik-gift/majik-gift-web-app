"use client";

import {
  Box,
  Grid2,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import SearchField from "./SearchField";
import ApiManager from "@/helper/api-manager";
import Pagination from "@mui/material/Pagination";
import Service from "./Service";
import EventCard from "./EventCard";
import LightWorkerProductCard from "./LightWorkerProductCard";
import useFilterApiData from "@/hook/useFilterApiData";
import { useDispatch, useSelector } from "react-redux";
import { NoDataFoundIcon } from "@/assets";
import Image from "next/image";
import { resetFilters } from "@/store/filterSlice";

// Debouncing function
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const handler = useRef(null);

  useEffect(() => {
    clearTimeout(handler.current); // Clear any previously set timeout
    handler.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler.current); // Cleanup timeout on unmount or value change
  }, [value, delay]);

  return debouncedValue;
};

export default function ServiceSection({ type, href, apiData }) {
  const [cards, setCards] = useState(null);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [pagination, setPagination] = useState({
    perPage: 9,
    currentPage: 1,
    totalPage: 0,
  });

  const filters = useSelector((state) => state.filters);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  // fetching Data
  const fetchData = async (setCards) => {
    setLoading(true);
    try {
      // Build base path with common query params
      let path = `${type}/app?search=${search}&perPage=${pagination.perPage}&page=${pagination.currentPage}&registration_status=approved&status=active`;

      // Add category filter if available
      if (filters.categoryId) {
        path += `&categories[]=${filters.categoryId}`;
      }

      // Add sort option if available
      if (filters.sortOption) {
        path += `&sort_by=${filters.sortOption}`;
      }

      // Special path for light workers
      if (type === "users") {
        path = `${type}?search=${search}&perPage=${pagination.perPage}&page=${pagination.currentPage}&role=light_worker&registration_status=approved&status=active`;

        // Add filters for light workers as well
        if (filters.categoryId) {
          path += `&categories[]=${filters.categoryId}`;
        }
        if (filters.sortOption) {
          path += `&sort_by=${filters.sortOption}`;
        }
      }

      let { data } = await ApiManager({
        method: "get",
        path,
      });
      const {
        response: { details, currentPage, totalPages },
      } = data;
      setCards(details);
      setPagination((prev) => ({
        ...prev,
        currentPage: currentPage,
        totalPage: totalPages,
      }));
    } catch (error) {
      console.log(error, "error while fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(setCards);
  }, [
    debouncedSearch,
    pagination.currentPage,
    pagination.perPage,
    filters.categoryId,
    filters.sortOption,
  ]);

  // extracting value from the input field
  const handleInput = (e) => {
    const { value } = e.target;
    setSearch(value.toLowerCase());
  };

  const handlePagination = (_, page) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  return (
    <Stack gap={5} py={6}>
      <SearchField
        handleInput={handleInput}
        title={type}
        categoryOption={apiData}
      />
      <Grid2 container spacing={{ xs: 2, sm: 5 }} justifyContent={"center"}>
        {!loading ? (
          cards?.map((card) => {
            return (
              <Grid2
                size={{ md: 4, sm: 6, xs: 6 }}
                justifyItems={"center"}
                key={card?.id}
              >
                <ProductCard sale item={card} type={type} />
              </Grid2>
            );
          })
        ) : (
          <LoaderSkeleton />
        )}
      </Grid2>
      {cards?.length === 0 && (
        <Stack justifyContent={"center"} alignItems={"center"}>
          <Image
            src={NoDataFoundIcon?.src}
            alt="empty"
            width={500}
            height={500}
          />
        </Stack>
      )}
      <a href={`#${href.slice(1)}`}>
        <Pagination
          size="large"
          sx={{ width: "fit-content", marginInline: "auto" }}
          count={pagination.totalPage}
          page={pagination.currentPage}
          variant="outlined"
          onChange={handlePagination}
        />
      </a>
    </Stack>
  );
}

function LoaderSkeleton() {
  return Array.from({ length: 9 }).map((ele, index) => (
    <Grid2 size={{ md: 4, sm: 6, xs: 12 }} key={index} justifyItems={"center"}>
      <Box sx={{ pt: 0.5 }} maxWidth={"350px"} width={"100%"}>
        <Skeleton variant="rectangular" width={"100%"} height={300} />
        <Stack
          pt={0.5}
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
        >
          <Skeleton width="90%" />
          <Skeleton variant="circular" width="22px" height="22px" />
        </Stack>
        <Skeleton width="90%" />
        <Skeleton width="90%" />
      </Box>
    </Grid2>
  ));
}
