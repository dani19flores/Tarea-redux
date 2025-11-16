import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../App/store";
import { setArtist, fetchReleases } from "../../state/searchSlice";
import { addSong, removeSong } from "../../state/songs.slice";
import SearchBar from "../SearchBar";
import { 
    SearchPageContainer, Message, ReleasesGirdContainer, ReleaseCard, 
    ReleaseCover, ReleaseInfo, DetailsLink, HeartButton, ReleaseActions 
} from "./style/SearchPageStyle";
import { Release } from "../types";

function SearchPage() {

    const dispatch = useDispatch();

    const { artist, releases, loading, error } = useSelector(
        (state: RootState) => state.search
    );

    const favorites = useSelector((state: RootState) => state.songs.songs);

    useEffect(() => {
        if (artist.trim() !== "") {
            dispatch(fetchReleases(artist) as any);
        }
    }, [artist]);

    const handleSearch = (value: string) => {
        dispatch(setArtist(value));
    };

    return (
        <SearchPageContainer  >
            <h1>Biblioteca Musical</h1>
            <SearchBar onSearch={handleSearch} />

            {loading && <Message type="loading">Cargando datos...</Message>}
            {error && <Message type="error">Error: {error}</Message>}

            <ReleasesGirdContainer>
            {releases?.map((r) => {
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
                                    onClick={() =>
                                            isFavorite
                                                ? dispatch(removeSong(r.id))
                                                : dispatch(addSong(r))
                                        }
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
