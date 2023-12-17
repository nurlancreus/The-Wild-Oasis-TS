import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "@/services/apiBookings";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationKey: ["bookings"],
    mutationFn: (bookingId: number) =>
      updateBooking({ status: "checked-out" }, bookingId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ type: "active" });
      toast.success(`Booking #${data.id} successfully checked out`);
    },
    onError: () => toast.error("There was an error while checking out"),
  });

  return { checkout, isCheckingOut };
}
