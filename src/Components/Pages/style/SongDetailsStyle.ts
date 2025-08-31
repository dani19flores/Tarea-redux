import styled from "styled-components";

export const AlbumDetail = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  padding: 20px;
  margin: 20px auto;
  border-radius: 12px;
  max-width: 900px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  gap: 20px;
`;

export const AlbumCover = styled.div`
  img {
    width: 250px;
    height: 250px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

export const AlbumInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    font-size: 28px;
    margin-bottom: 15px;
    color: #222;
  }

  p {
    font-size: 16px;
    margin-bottom: 8px;
    color: #555;
  }
`;

export const Message = styled.p<{ type?: "loading" | "error" }>`
  text-align: center;
  margin-top: 40px;
  font-weight: 500;
  color: ${(props) =>
        props.type === "error" ? "#d9534f" : "#555"};
`;
