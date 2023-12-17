import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Spinner } from ".";
import { useUser } from "@/features/authentication/useUser";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: grid;
  place-content: center;
`;

type ProtectedRouteProps = {
  children: ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  // 1. Load the authenticated user.
  const { isLoading, isAuthenticated } = useUser();

  // 2. If there is NO authenticated user, redirect to the "/login".
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      if (pathname !== "/") {
        navigate(
          `/login?redirectTo=${pathname}&message=Please, first log in, then try again`
        );
      } else navigate("/login");
    }
  }, [isAuthenticated, isLoading, pathname, navigate]);

  // 3. While loading, show s spinner.
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there IS a authenticated user, rented the app.

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
