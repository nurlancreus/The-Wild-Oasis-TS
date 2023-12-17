/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from "./supabase";
import { PAGE_SIZE } from "@/utils/constants";
import { getToday } from "@/utils/helpers";

type TGetBookings = {
  filterObj: null | {
    field: string;
    value: string | number;
    method: string;
  };
  sortByObj: { field: string; direction: string };
  page: number;
};

export async function getBookings({
  filterObj,
  sortByObj,
  page,
}: TGetBookings) {
  interface PostgrestFilterBuilder {
    [index: string]: any;
  }

  let query: PostgrestFilterBuilder = supabase.from("bookings").select(
    "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, status, cabins(name), guests(fullName, email)",
    // cabins and guests are the table names we are referencing through cabinId and guestId columns
    { count: "exact" } // get length of data
  );

  // SERVER-SIDE FILTERING
  if (filterObj)
    query = query[filterObj.method || "eq"](filterObj.field, filterObj.value);

  // SERVER-SIDE SORTING
  if (sortByObj)
    query = query.order(sortByObj.field, {
      ascending: sortByObj.direction === "asc",
    });

  // SERVER-SIDE PAGINATION
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  if (page) query = query.range(from, to);

  /* ----------------------------------------- */
  const { data, error, count } = await query;

  if (error) {
    console.log(error);
    throw new Error("Bookings could not loaded");
  }

  return { data, count };
}

export async function getBooking(id: number) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(name), guests(*)")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// date: ISOString
export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

type UpdateBookingObj = {
  status: "unconfirmed" | "checked-in" | "checked-out";
  isPaid?: boolean;
  hasBreakfast?: boolean;
  extrasPrice?: number;
  totalPrice?: number;
};

export async function updateBooking(obj: UpdateBookingObj, id: number) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id: number) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
