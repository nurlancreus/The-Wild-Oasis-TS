import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { ButtonIcon, SpinnerMini } from "@/ui";
import { useLogout } from "./useLogout";

function Logout() {
  const { logout, isPending } = useLogout();

  return (
    <ButtonIcon onClick={() => logout()}>
      {!isPending ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
