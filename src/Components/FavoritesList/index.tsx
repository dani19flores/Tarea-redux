import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReleaseCard, ReleaseInfo, ReleaseCover, HeartButton, DetailsLink, ReleaseActions } from "../Pages/style/SearchPageStyle";
import { RootState } from "../App/store";

import { Release } from "../types";
import { addSong, removeSong } from "../../state/songs.slice";

function FavoritesList() {
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.songs.songs);
    if (favorites.length === 0) {
        return <p>No tienes favoritos todavía ❤️</p>;
    }

    const handle_addSong = (song: Release) => {
        dispatch(addSong(song));
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
                            <p>🎤 {fav["artist-credit"]?.[0]?.name}</p>
                            <ReleaseActions>
                                <DetailsLink to={`/song/${fav.id}`}>
                                    Ver detalles
                                </DetailsLink>
                                <HeartButton
                                    $active={favorites.some((f) => f.id === fav.id)}
                                    onClick={() => {
                                        if (favorites.some((f) => f.id === fav.id)) {
                                            handle_removeSong(fav.id);
                                        } else {
                                            handle_addSong(fav);
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
