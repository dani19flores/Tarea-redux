import React from "react";
import {render, screen} from '@testing-library/react';
import Header from "../Header";

describe("Header component", () => {
    test("Muestra el título", () => {
        render(<Header appName='Music' />);
        const logoElement = screen.getByText("Music");
        expect(logoElement).toBeInTheDocument();
    });

    test("muestra los links de navegación", () => {
        render(<Header appName="Music" />);

        expect(screen.getByText("Inicio")).toBeInTheDocument();
        expect(screen.getByText("Favoritos")).toBeInTheDocument();

        expect(screen.getByText("Inicio").closest("a")).toHaveAttribute("href", "/");
        expect(screen.getByText("Favoritos").closest("a")).toHaveAttribute("href", "/favorites");
    });
});
