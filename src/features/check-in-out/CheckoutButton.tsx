import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

type CheckoutButtonProps = { bookingId: number };

function CheckoutButton({ bookingId }: CheckoutButtonProps) {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <Button
      $size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
