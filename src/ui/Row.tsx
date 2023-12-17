import { css, styled } from "styled-components";

type RowProps = {$type?: "horizontal" | "vertical"}

const Row = styled.div.attrs({className: "row"})<RowProps>`
  display: flex;
  ${(props) =>
    props.$type === "horizontal" &&
    css`
      align-items: center;
      justify-content: space-between;
    `}
  ${(props) =>
    props.$type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  $type: "vertical",
};

export default Row;
