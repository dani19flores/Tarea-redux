import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { AlbumDetail, AlbumCover, AlbumInfo, Message } from "./style/SongDetailsStyle";

interface ReleaseDetails {
    id: string;
    title: string;
    status?: string;
    date?: string;
    country?: string;
    barcode?: string;
    "track-count"?: number;
    "artist-credit": {
        name: string;
        artist: {
            id: string;
            name: string;
            "sort-name": string;
            disambiguation?: string;
        };
    }[];
    "label-info"?: {
        label: {
            id: string;
            name: string;
        };
    }[];
    media?: {
        id: string;
        format: string;
        "track-count": number;
        "disc-count": number;
    }[];
}

interface AlbumDetailResponse {
    album: ReleaseDetails[] | null;
}

function SongDetail() {
    const { id } = useParams<{ id: string }>();

    const url = id
        ? `https://musicbrainz.org/ws/2/release/${id}?fmt=json&inc=recordings+artists+labels`
        : null;

    const { data, loading, error } = useFetch<ReleaseDetails>(url);

    if (loading) return <Message type="loading">Cargando detalles...</Message>;
    if (error) return <Message type="error">Error: {error}</Message>;
    if (!data) return <Message type="loading">No se encontraron detalles</Message>;

    return (
        <AlbumDetail>
            <AlbumCover>
                <img
                    src={`https://coverartarchive.org/release/${data.id}/front-250`}
                    alt={data.title}
                    onError={(e) => (e.currentTarget.src = "/placeholder.webp")}
                />
            </AlbumCover>
            <AlbumInfo>
                <h2>{data.title}</h2>
                <p>👤 Artista: {data["artist-credit"][0]?.name}</p>
                <p>📅 Lanzamiento: {data.date}</p>
                <p>🌍 País: {data.country}</p>
                <p>💽 Formato: {data.media?.map((m) => m.format).join(", ")}</p>
                <p>🎶 Canciones: {data["track-count"]}</p>
                <p>🏷️ Sello: {data["label-info"]?.map((l) => l.label.name).join(", ")}</p>
            </AlbumInfo>
        </AlbumDetail>
    );
}

export default SongDetail;
