import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import FavoritesList from "../FavoritesList";

jest.mock("../Pages/style/SearchPageStyle", () => ({
    ReleaseCard: ({ children }) => <div data-testid="release-card">{children}</div>,
    ReleaseInfo: ({ children }) => <div data-testid="release-info">{children}</div>,
    ReleaseCover: ({ src, alt, onError }) => (
        <img
            src={src}
            alt={alt}
            onError={onError}
            data-testid="release-cover"
        />
    ),
    HeartButton: ({ onClick, $active }) => (
        <button
            onClick={onClick}
            data-testid="heart-button"
            data-active={$active}
        >
            {$active ? "❤️" : "🤍"}
        </button>
    ),
    DetailsLink: ({ children, to }) => <a href={to} data-testid="details-link">{children}</a>,
    ReleaseActions: ({ children }) => <div data-testid="release-actions">{children}</div>,
}));

describe("FavoritesList component", () => {
    const mockStore = configureStore([]);

    const mockFavorites = [
        {
            id: "1",
            title: "Thriller",
            "artist-credit": [{ name: "Michael Jackson" }]
        },
        {
            id: "2",
            title: "Back in Black",
            "artist-credit": [{ name: "AC/DC" }]
        }
    ];

    test("muestra mensaje cuando no hay favoritos", () => {
        const store = mockStore({
            songs: { songs: [] },
        });

        render(
            <Provider store={store}>
                <FavoritesList />
            </Provider>
        );

        const emptyMessage = screen.getByText("No tienes favoritos todavía ❤️");
        expect(emptyMessage).toBeInTheDocument();
    });

    test("renderiza la lista de canciones favoritas correctamente", () => {
        const store = mockStore({
            songs: { songs: mockFavorites },
        });

        render(
            <Provider store={store}>
                <FavoritesList />
            </Provider>
        );

        expect(screen.getByText("Mis Favoritos")).toBeInTheDocument();
        expect(screen.getByText("Thriller")).toBeInTheDocument();
        expect(screen.getByText("Back in Black")).toBeInTheDocument();
        expect(screen.getByText("🎤 Michael Jackson")).toBeInTheDocument();
        expect(screen.getByText("🎤 AC/DC")).toBeInTheDocument();
    });

    test("cada canción tiene botón de eliminar que ejecuta la función al hacer clic", () => {
        const store = mockStore({
            songs: { songs: mockFavorites },
        });

        render(
            <Provider store={store}>
                <FavoritesList />
            </Provider>
        );

        const heartButtons = screen.getAllByTestId("heart-button");
        expect(heartButtons).toHaveLength(2);

        // Hacer clic en el primer botón de corazón
        fireEvent.click(heartButtons[0]);

        // Verificar que se dispatch la acción removeSong
        const actions = store.getActions();
        expect(actions[0].type).toBe("song/removeSong");
        expect(actions[0].payload).toBe("1");
    });

    test("muestra los enlaces de detalles con URLs correctas", () => {
        const store = mockStore({
            songs: { songs: mockFavorites },
        });

        render(
            <Provider store={store}>
                <FavoritesList />
            </Provider>
        );

        const detailsLinks = screen.getAllByTestId("details-link");
        expect(detailsLinks).toHaveLength(2);
        expect(detailsLinks[0]).toHaveAttribute("href", "/song/1");
        expect(detailsLinks[1]).toHaveAttribute("href", "/song/2");
    });

    test("muestra las imágenes de portada correctamente", () => {
        const store = mockStore({
            songs: { songs: mockFavorites },
        });

        render(
            <Provider store={store}>
                <FavoritesList />
            </Provider>
        );

        const coverImages = screen.getAllByTestId("release-cover");
        expect(coverImages).toHaveLength(2);
        expect(coverImages[0]).toHaveAttribute(
            "src",
            "https://coverartarchive.org/release/1/front-250"
        );
        expect(coverImages[1]).toHaveAttribute(
            "src",
            "https://coverartarchive.org/release/2/front-250"
        );
    });
});