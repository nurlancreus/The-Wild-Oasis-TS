import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";

import { FormRowVertical, Input, Button, SpinnerMini, Form } from "@/ui";
import { useLogin } from "./useLogin";
import { useUser } from "./useUser";

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function LoginForm() {
  const [email, setEmail] = useState("nurlan@example.com");
  const [password, setPassword] = useState("12345678");
  const { login, isPending: isLoginPending } = useLogin();
  const { isLoading: isUserLoading, isAuthenticated } = useUser();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const isLoading = isLoginPending || isUserLoading;

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  const errMessage = searchParams.get("message") || null;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="on"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button $size="large" disabled={isLoading}>
          {!isLoading ? "Login" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
      {errMessage && <Error>{errMessage}</Error>}
    </Form>
  );
}

export default LoginForm;
