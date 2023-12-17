import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDarkModeContext } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkModeOn } = useDarkModeContext();

  const src = isDarkModeOn ? "/logo-dark.png" : "/logo-light.png";
  
  return (
    <StyledLogo>
      <Link to="/">
        <Img src={src} alt="Logo" />
      </Link>
    </StyledLogo>
  );
}

export default Logo;
