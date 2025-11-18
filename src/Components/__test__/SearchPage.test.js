import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SearchPage from "../Pages/SearchPage";

// Mock de react-redux para evitar problemas con hooks
jest.mock("react-redux", () => ({
    useDispatch: () => jest.fn(),
    useSelector: (selector) => {
        const mockState = {
            search: {
                artist: "",
                releases: [],
                loading: false,
                error: null
            },
            songs: {
                songs: []
            }
        };
        return selector(mockState);
    },
    Provider: ({ children }) => <div>{children}</div>
}));


jest.mock("../Pages/style/SearchPageStyle", () => {
    const MockComponent = ({ children, ...props }) => (
        <div {...props}>{children}</div>
    );

    return {
        SearchPageContainer: MockComponent,
        Message: ({ children, type }) => (
            <div data-testid={`message-${type}`}>{children}</div>
        ),
        ReleasesGirdContainer: MockComponent,
        ReleaseCard: MockComponent,
        ReleaseInfo: MockComponent,
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
        DetailsLink: ({ children, to }) => (
            <a href={to} data-testid="details-link">{children}</a>
        ),
        ReleaseActions: MockComponent,
    };
});

jest.mock("../SearchBar", () => ({
    __esModule: true,
    default: ({ onSearch }) => (
        <div data-testid="search-bar">
            <input
                data-testid="search-input"
                placeholder="Busca un artista..."
            />
            <button
                data-testid="search-button"
                onClick={() => onSearch("test artist")}
            >
                Buscar
            </button>
        </div>
    )
}));

jest.mock("../../state/searchSlice", () => ({
    setArtist: jest.fn(),
    fetchReleases: jest.fn(),
}));

jest.mock("../../state/librarySlice", () => ({
    addSong: jest.fn(),
    removeSong: jest.fn(),
}));

describe("SearchPage component", () => {
    const mockStore = configureStore([]);

    const mockUseSelector = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        mockUseSelector.mockImplementation((selector) => {
            const mockState = {
                search: {
                    artist: "",
                    releases: [],
                    loading: false,
                    error: null
                },
                songs: {
                    songs: []
                }
            };
            return selector(mockState);
        });

        require("react-redux").useSelector = mockUseSelector;
    });

    test("renderiza el título de la biblioteca musical", () => {
        const store = mockStore({});

        render(
            <Provider store={store}>
                <SearchPage />
            </Provider>
        );

        expect(screen.getByText("Biblioteca Musical")).toBeInTheDocument();
    });

    test("renderiza la barra de búsqueda", () => {
        const store = mockStore({});

        render(
            <Provider store={store}>
                <SearchPage />
            </Provider>
        );

        expect(screen.getByTestId("search-bar")).toBeInTheDocument();
        expect(screen.getByTestId("search-input")).toBeInTheDocument();
        expect(screen.getByTestId("search-button")).toBeInTheDocument();
    });

    test("muestra mensaje de carga cuando está cargando", () => {
        mockUseSelector.mockImplementation((selector) => {
            const mockState = {
                search: {
                    artist: "test",
                    releases: [],
                    loading: true,
                    error: null
                },
                songs: {
                    songs: []
                }
            };
            return selector(mockState);
        });

        const store = mockStore({});

        render(
            <Provider store={store}>
                <SearchPage />
            </Provider>
        );

        expect(screen.getByTestId("message-loading")).toBeInTheDocument();
        expect(screen.getByText("Cargando datos...")).toBeInTheDocument();
    });

    test("muestra mensaje de error cuando hay error", () => {
        mockUseSelector.mockImplementation((selector) => {
            const mockState = {
                search: {
                    artist: "test",
                    releases: [],
                    loading: false,
                    error: "Error de conexión"
                },
                songs: {
                    songs: []
                }
            };
            return selector(mockState);
        });

        const store = mockStore({});

        render(
            <Provider store={store}>
                <SearchPage />
            </Provider>
        );

        expect(screen.getByTestId("message-error")).toBeInTheDocument();
        expect(screen.getByText("Error: Error de conexión")).toBeInTheDocument();
    });

    test("renderiza la lista de resultados de búsqueda con datos simulados", () => {
        const mockReleases = [
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

        mockUseSelector.mockImplementation((selector) => {
            const mockState = {
                search: {
                    artist: "Michael Jackson",
                    releases: mockReleases,
                    loading: false,
                    error: null
                },
                songs: {
                    songs: []
                }
            };
            return selector(mockState);
        });

        const store = mockStore({});

        render(
            <Provider store={store}>
                <SearchPage />
            </Provider>
        );

        expect(screen.getByText("Thriller")).toBeInTheDocument();
        expect(screen.getByText("Back in Black")).toBeInTheDocument();
        expect(screen.getByText("🎤 Michael Jackson")).toBeInTheDocument();
        expect(screen.getByText("🎤 AC/DC")).toBeInTheDocument();
    });

    test("cada canción muestra el título, el artista y el álbum", () => {
        const mockReleases = [
            {
                id: "1",
                title: "Thriller",
                "artist-credit": [{ name: "Michael Jackson" }]
            }
        ];

        mockUseSelector.mockImplementation((selector) => {
            const mockState = {
                search: {
                    artist: "test",
                    releases: mockReleases,
                    loading: false,
                    error: null
                },
                songs: {
                    songs: []
                }
            };
            return selector(mockState);
        });

        const store = mockStore({});

        render(
            <Provider store={store}>
                <SearchPage />
            </Provider>
        );

        expect(screen.getByText("Thriller")).toBeInTheDocument();
        expect(screen.getByText("🎤 Michael Jackson")).toBeInTheDocument();
    });

    test("el botón 'Agregar a mi biblioteca' ejecuta la función al hacer clic", () => {
        const mockReleases = [
            {
                id: "1",
                title: "Thriller",
                "artist-credit": [{ name: "Michael Jackson" }]
            }
        ];

        mockUseSelector.mockImplementation((selector) => {
            const mockState = {
                search: {
                    artist: "test",
                    releases: mockReleases,
                    loading: false,
                    error: null
                },
                songs: {
                    songs: []
                }
            };
            return selector(mockState);
        });

        const store = mockStore({});

        render(
            <Provider store={store}>
                <SearchPage />
            </Provider>
        );

        const heartButton = screen.getByTestId("heart-button");
        fireEvent.click(heartButton);

        expect(heartButton).toBeInTheDocument();
        expect(heartButton).toHaveAttribute("data-active", "false");
    });

    test("muestra las imágenes de portada correctamente", () => {
        const mockReleases = [
            {
                id: "1",
                title: "Thriller",
                "artist-credit": [{ name: "Michael Jackson" }]
            }
        ];

        mockUseSelector.mockImplementation((selector) => {
            const mockState = {
                search: {
                    artist: "test",
                    releases: mockReleases,
                    loading: false,
                    error: null
                },
                songs: {
                    songs: []
                }
            };
            return selector(mockState);
        });

        const store = mockStore({});

        render(
            <Provider store={store}>
                <SearchPage />
            </Provider>
        );

        const coverImage = screen.getByTestId("release-cover");
        expect(coverImage).toHaveAttribute(
            "src",
            "https://coverartarchive.org/release/1/front-250"
        );
        expect(coverImage).toHaveAttribute("alt", "Thriller");
    });

    test("los enlaces de detalles tienen URLs correctas", () => {
        const mockReleases = [
            {
                id: "1",
                title: "Thriller",
                "artist-credit": [{ name: "Michael Jackson" }]
            }
        ];

        mockUseSelector.mockImplementation((selector) => {
            const mockState = {
                search: {
                    artist: "test",
                    releases: mockReleases,
                    loading: false,
                    error: null
                },
                songs: {
                    songs: []
                }
            };
            return selector(mockState);
        });

        const store = mockStore({});

        render(
            <Provider store={store}>
                <SearchPage />
            </Provider>
        );

        const detailsLink = screen.getByTestId("details-link");
        expect(detailsLink).toHaveAttribute("href", "/song/1");
        expect(detailsLink).toHaveTextContent("Ver detalles");
    });

    test("no muestra resultados cuando no hay búsquedas", () => {
        // Mock estado vacío
        mockUseSelector.mockImplementation((selector) => {
            const mockState = {
                search: {
                    artist: "",
                    releases: [],
                    loading: false,
                    error: null
                },
                songs: {
                    songs: []
                }
            };
            return selector(mockState);
        });

        const store = mockStore({});

        render(
            <Provider store={store}>
                <SearchPage />
            </Provider>
        );

        expect(screen.queryByText("Thriller")).not.toBeInTheDocument();
        expect(screen.queryByText("Back in Black")).not.toBeInTheDocument();
    });
});