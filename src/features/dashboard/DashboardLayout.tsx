import styled from "styled-components";

import { Spinner } from "@/ui";
import { useCabins } from "../cabins/useCabins";
import TodayActivity from "../check-in-out/TodayActivity";
import DurationChart from "./DurationChart";
import SalesChart from "./SalesChart";
import Stats from "./Stats";

import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";


const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const {
    bookings,
    isLoading: isBookingsLoading,
    numDays,
  } = useRecentBookings();
  const { confirmedStays, isLoading: isStaysLoading } = useRecentStays();
  const { cabins, isLoading: isCabinsLoading } = useCabins();

  const isWorking = isBookingsLoading || isStaysLoading || isCabinsLoading;

  if (isWorking) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats<(typeof confirmedStays)[number]>
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
