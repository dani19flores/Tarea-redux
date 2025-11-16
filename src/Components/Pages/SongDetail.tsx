import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetails } from "../../state/detailsSlice";
import { RootState } from "../App/store";
import { AlbumDetail, AlbumCover, AlbumInfo, Message } from "./style/SongDetailsStyle";

function SongDetail() {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();

    const { details, loading, error } = useSelector(
        (state: RootState) => state.details
    );

    useEffect(() => {
        if (id) {
            dispatch(fetchDetails(id) as any);
        }
    }, [id]);

    if (loading) return <Message type="loading">Cargando detalles...</Message>;
    if (error) return <Message type="error">Error: {error}</Message>;
    if (!details) return <Message type="loading">No se encontraron detalles</Message>;

    return (
        <AlbumDetail>
            <AlbumCover>
                <img
                    src={`https://coverartarchive.org/release/${details.id}/front-250`}
                    alt={details.title}
                    onError={(e) => (e.currentTarget.src = "/placeholder.webp")}
                />
            </AlbumCover>

            <AlbumInfo>
                <h2>{details.title}</h2>
                <p>👤 Artista: {details["artist-credit"][0]?.name}</p>
                <p>📅 Lanzamiento: {details.date}</p>
                <p>🌍 País: {details.country}</p>
                <p>💽 Formato: {details.media?.map((m) => m.format).join(", ")}</p>
                <p>🎶 Canciones: {details["track-count"]}</p>
                <p>🏷️ Sello: {details["label-info"]?.map((l) => l.label.name).join(", ")}</p>
            </AlbumInfo>
        </AlbumDetail>
    );
}

export default SongDetail;
