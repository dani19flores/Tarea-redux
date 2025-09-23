import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import SearchBar from "../SearchBar";
import { SearchPageContainer, Message, ReleasesGirdContainer, ReleaseCard, ReleaseCover, ReleaseInfo, DetailsLink, HeartButton, ReleaseActions } from "./style/SearchPageStyle";
import { RootState } from "../App/store";
import { useDispatch, useSelector } from 'react-redux';
import { addSong, removeSong } from "../../state/songs.slice";
import { Release } from "../types";


interface SearchAlbumResponse {
    releases: Release[];
}

function SearchPage() {

    const dispatch = useDispatch();
    const [artist, setArtist] = useState<string>("");
    const favorites = useSelector((state: RootState) => state.songs.songs);
    const url =
        artist !== ""
            ? `https://musicbrainz.org/ws/2/release/?query=artist:${artist}&fmt=json`
            : null;

    const { data, loading, error } = useFetch<SearchAlbumResponse>(url);

    const handle_addSong = (song: Release) => {
        dispatch(addSong(song));
    };

    const handle_removeSong = (id: string) => {
        dispatch(removeSong(id));
    };

    return (
        <SearchPageContainer  >
            <h1>Biblioteca Musical</h1>
            <SearchBar onSearch={setArtist} />

            {loading && <Message type="loading">Cargando datos...</Message>}
            {error && <Message type="error">Error: {error}</Message>}

            <ReleasesGirdContainer>
            {data?.releases?.map((r) => {
                const isFavorite = favorites.some(f => f.id === r.id);
                return (
                    <ReleaseCard key={r.id}>
                        <ReleaseCover
                            alt={r.title}
                            onError={(e) => (e.currentTarget.src = "/placeholder.webp")}
                            src={`https://coverartarchive.org/release/${r.id}/front-250`}
                        />
                        <ReleaseInfo>
                            <h3>{r.title}</h3>
                            <p>🎤 {r["artist-credit"][0]?.name}</p>
                            <ReleaseActions>
                                <DetailsLink to={`/song/${r.id}`}>
                                    Ver detalles
                                </DetailsLink>
                                <HeartButton
                                    $active={isFavorite}
                                    onClick={() => {
                                        if (isFavorite) {
                                            handle_removeSong(r.id);
                                        } else {
                                            handle_addSong(r);
                                        }
                                    }}
                                />
                            </ReleaseActions>
                        </ReleaseInfo>
                    </ReleaseCard>
                );
            })}
        </ReleasesGirdContainer>
        </SearchPageContainer >
    );
}

export default SearchPage;
