import styled from "styled-components";

export const SearchBarContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  max-width: 500px;
  gap: 10px;
  position: relative;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 12px 20px;
  border-radius: 50px;
  border: 1px solid #ccc;
  font-size: 16px;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #4b6cb7;
    box-shadow: 0 0 8px rgba(75, 108, 183, 0.3);
  }
`;

export const SearchButton = styled.button`
  padding: 12px 25px;
  border: none;
  border-radius: 50px;
  background: linear-gradient(135deg, #4b6cb7, #182848);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: linear-gradient(135deg, #182848, #4b6cb7);
    transform: translateY(-2px);
  }
`;

export const VisuallyHidden = styled.label`
  border: 0 !important;
  clip: rect(1px, 1px, 1px, 1px);
  -webkit-clip-path: inset(50%);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
`;
