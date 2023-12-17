import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { updateBooking } from "@/services/apiBookings";

type TCheckin = {
  bookingId: number;
  breakfast?: {
    hasBreakfast: boolean;
    extrasPrice: number;
    totalPrice: number;
  };
};

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationKey: ["bookings"],
    mutationFn: ({
      bookingId,
      breakfast = {} as TCheckin["breakfast"],
    }: TCheckin) =>
      updateBooking(
        { status: "checked-in", isPaid: true, ...breakfast },
        bookingId
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ type: "active" });
      // { type: "active" } (invalidate all the active queries) - another way to invalidate queries rather than passing specific queryKey
      toast.success(`Booking #${data.id} successfully checked in`);
      navigate("/");
    },
    onError: () => toast.error("There was an error while checking in"),
  });

  return { checkin, isCheckingIn };
}
