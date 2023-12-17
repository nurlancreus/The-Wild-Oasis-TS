import styled from "styled-components";
import Spinner from "./Spinner";

const StyledSpinnerPage = styled.div`
  background-color: var(--color-grey-50);
  height: 100vh;
  display: grid;
  place-content: center;
`;

function SpinnerFullPage() {
  return (
    <StyledSpinnerPage>
      <Spinner />
    </StyledSpinnerPage>
  );
}

export default SpinnerFullPage;
