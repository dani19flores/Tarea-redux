import styled from "styled-components";
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";

export const SearchPageContainer = styled.div`
  padding: 20px 40px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  background: #f5f5f5;
  min-height: 100vh;

  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #222;
  }
`;

export const Message = styled.div<{ type?: "error" | "loading" }>`
    color: ${({ type }) => (type === "error" ? "red" : "black")};
    text-align: center;
    margin: 20px 0;
    font-weight: 500;

`;

export const ReleasesGirdContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
`;

export const ReleaseCard = styled.div`
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    }
`;

export const ReleaseCover = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    background: #ddd;
`;

export const ReleaseInfo = styled.div`
    padding: 10px 15px;

    h3{
        font-size: 16px;
        margin-bottom: 5px;
        color: #333;
    }

    p{
        font-size: 14px;
        color: #555;
        margin-bottom: 10px;
    }
`;

export const DetailsLink = styled(Link)`
  text-decoration: none;
  font-weight: 500;
  color: #4b6cb7;
  transition: color 0.2s;

  &:hover {
    color: #182848;
  }
`;

export const HeartButton = styled(FaHeart)<{ $active?: boolean }>`
  cursor: pointer;
  font-size: 28px;
  color:  ${({ $active }) => ($active ? "#990000" : "#aaa")};
  transition: all 0.3s ease;
  margin-top: 8px;

  &:hover {
    transform: scale(1.2);
    color: ${({ $active }) => ($active ? "#720000" : "#ff6b6b")};
  }
`;

export const ReleaseActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
