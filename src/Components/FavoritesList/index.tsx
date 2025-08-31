import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { ReleaseCard, ReleaseInfo, ReleaseCover, HeartButton, DetailsLink, ReleaseActions } from "../Pages/style/SearchPageStyle";
import { addSong, removeSong } from "../../actions";

interface Release {
    id: string;
    score: number;
    "status-id"?: string;
    "packaging-id"?: string;
    "artist-credit-id"?: string;
    count?: number;
    title: string;
    status?: string;
    packaging?: string;
    "text-representation"?: {
        language?: string;
        script?: string;
    };
    "artist-credit": {
        name: string;
        artist: {
            id: string;
            name: string;
            "sort-name": string;
            disambiguation?: string;
        };
    }[];
    "release-group"?: {
        id: string;
        "type-id"?: string;
        "primary-type-id"?: string;
        title: string;
        "primary-type"?: string;
        "secondary-types"?: string[];
        "secondary-type-ids"?: string[];
    };
    date?: string;
    country?: string;
    "release-events"?: {
        date?: string;
        area?: {
            id: string;
            name: string;
            "sort-name": string;
            "iso-3166-1-codes": string[];
        };
    }[];
    barcode?: string;
    "label-info"?: {
        label: {
            id: string;
            name: string;
        };
    }[];
    "track-count"?: number;
    media?: {
        id: string;
        format?: string;
        "disc-count"?: number;
        "track-count"?: number;
    }[];
}

function FavoritesList() {
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) =>
        state.songs.songs.map((s) => s.song)
    );
    if (favorites.length === 0) {
        return <p>No tienes favoritos todavía ❤️</p>;
    }

    const handle_addSong = (song: Release, id: string) => {
        dispatch(addSong(song, id));
    };

    const handle_removeSong = (id: string) => {
        dispatch(removeSong(id));
    };

    return (
        <div>
            <h2>Mis Favoritos</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 200px)", gap: "1rem" }}>
                {favorites.map((fav) => (
                    <ReleaseCard key={fav.id}>
                        <ReleaseCover
                            alt={fav.title}
                            onError={(e) => (e.currentTarget.src = "/placeholder.webp")}
                            src={`https://coverartarchive.org/release/${fav.id}/front-250`}
                        />
                        <ReleaseInfo>
                            <h3>{fav.title}</h3>
                            <p>🎤 {fav["artist-credit"][0]?.name}</p>
                            <ReleaseActions>
                                <DetailsLink to={`/song/${fav.id}`}>
                                    Ver detalles
                                </DetailsLink>
                                <HeartButton
                                    active={favorites.some((f) => f.id === fav.id)}
                                    onClick={() => {
                                        if (favorites.some((f) => f.id === fav.id)) {
                                            handle_removeSong(fav.id);
                                        } else {
                                            handle_addSong(fav, fav.id);
                                        }
                                    }}
                                />
                            </ReleaseActions>
                        </ReleaseInfo>
                    </ReleaseCard>
                ))}
            </div>
        </div>
    );
}

export default FavoritesList;
