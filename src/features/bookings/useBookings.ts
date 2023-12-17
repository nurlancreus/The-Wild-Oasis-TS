import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getBookings } from "@/services/apiBookings";
import { PAGE_SIZE } from "@/utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status") || "all";
  const filterObj =
    filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };
  // { field: "totalPrice", value: 7000, method: "gte" }

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");

  const sortByObj = { field, direction };

  // PAGINATION
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  // QUERY
  const {
    data: { data: bookings = [], count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filterObj, sortByObj, page],
    queryFn: () => getBookings({ filterObj, sortByObj, page }),
    placeholderData: { data: [], count: 0 },
  });

  // RE-PAGINATION
  // delete page items, automatically opens prev page
  useEffect(
    function () {
      if (count && Math.ceil(count / PAGE_SIZE) < page && page > 1) {
        searchParams.set("page", String(page - 1));
        setSearchParams(searchParams);
      }
    },
    [count, page, searchParams, setSearchParams]
  );

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterObj, sortByObj, page + 1],
      queryFn: () => getBookings({ filterObj, sortByObj, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterObj, sortByObj, page - 1],
      queryFn: () => getBookings({ filterObj, sortByObj, page: page - 1 }),
    });
  }

  return { bookings, count, isLoading, error };
}


