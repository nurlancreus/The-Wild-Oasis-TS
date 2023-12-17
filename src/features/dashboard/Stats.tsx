import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineChartBar,
} from "react-icons/hi2";

import Stat from "./Stat";
import { formatCurrency } from "@/utils/helpers";

type StatsProps<PropT> = {
  bookings: Array<{
    created_at: string;
    totalPrice: number;
    extrasPrice: number | null;
  }>;
  confirmedStays: Array<PropT>;
  numDays: number;
  cabinCount: number;
};

function Stats<T extends { numNights:  number }>({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}: StatsProps<T>) {
  // 1. Number of Bookings
  const numBookings = bookings.length;

  // 2. Total sales
  const totalSales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);

  // 3. Chech Ins
  const checkIns = confirmedStays.length;

  // 4. ( num checked in nights / all available nights) (num days * num cabins)
  const occupation =
    confirmedStays.reduce((acc, curr) => acc + (curr.numNights ?? 0), 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalSales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendar />}
        value={checkIns}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occupation * 100)}%`}
      />
    </>
  );
}

export default Stats;
