import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../SearchBar";

describe("SearchBar component", () => {
    test("renderiza el input de búsqueda", () => {
        render(<SearchBar onSearch={jest.fn()} />);

        const inputElement = screen.getByPlaceholderText("Busca un artista...");
        expect(inputElement).toBeInTheDocument();
    });

    test("permite escribir en el input", () => {
        render(<SearchBar onSearch={jest.fn()} />);
        
        const inputElement = screen.getByPlaceholderText("Busca un artista...");

        fireEvent.change(inputElement, { target: { value: "Queen" } });

        expect(inputElement).toHaveValue("Queen");
    });

    test("ejecuta onSearch al hacer submit con el botón", () => {
        const mockSearch = jest.fn();
        render(<SearchBar onSearch={mockSearch} />);

        const inputElement = screen.getByPlaceholderText("Busca un artista...");
        const buttonElement = screen.getByRole("button", { name: /buscar/i });

        fireEvent.change(inputElement, { target: { value: "Metallica" } });
        fireEvent.click(buttonElement);

        expect(mockSearch).toHaveBeenCalledTimes(1);
        expect(mockSearch).toHaveBeenCalledWith("Metallica");
    });

    test("ejecuta onSearch al presionar Enter", () => {
        const mockSearch = jest.fn();
        render(<SearchBar onSearch={mockSearch} />);

        const inputElement = screen.getByPlaceholderText("Busca un artista...");

        fireEvent.change(inputElement, { target: { value: "Adele" } });

        fireEvent.submit(inputElement.closest("form"));

        expect(mockSearch).toHaveBeenCalledTimes(1);
        expect(mockSearch).toHaveBeenCalledWith("Adele");
    });

    test("NO ejecuta onSearch si el input está vacío", () => {
        const mockSearch = jest.fn();
        render(<SearchBar onSearch={mockSearch} />);

        const buttonElement = screen.getByRole("button", { name: /buscar/i });

        fireEvent.click(buttonElement);

        expect(mockSearch).not.toHaveBeenCalled();
    });
});
