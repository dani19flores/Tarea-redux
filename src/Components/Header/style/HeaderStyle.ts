import styled from "styled-components";

export const Headers = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: linear-gradient(90deg, #4b6cb7 0%, #182848 100%);
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 100;
  border-radius: 0 0 10px 10px;
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
`;

export const NavLinks = styled.nav`
  display: flex;
  align-items: center;

  a {
    margin-left: 30px;
    text-decoration: none;
    color: white;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: #ffcc00;
    }
  }
`;
