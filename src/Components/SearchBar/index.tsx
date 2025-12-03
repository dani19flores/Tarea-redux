import React, { useState } from "react";
import { SearchBarContainer, SearchInput, SearchButton } from "./style/SearchBar";

interface Props {
    onSearch: (artist: string) => void;
}

function SearchBar({ onSearch }: Props) {
    const [artist, setArtist] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (artist.trim() !== "") {
            onSearch(artist);
        }
    };

    return (
        <SearchBarContainer onSubmit={handleSubmit}>
            <SearchInput
                type="text"
                aria-label="Buscar artista"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Busca un artista..."
            />
            <SearchButton type="submit">Buscar</SearchButton>
        </SearchBarContainer>
    );
}

export default SearchBar;
