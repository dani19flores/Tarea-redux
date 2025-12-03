import React from "react";
import { Headers, Logo, NavLinks } from "./style/HeaderStyle";

interface HeaderProps {
    appName: string;
}

const Header = ({ appName }: HeaderProps) => {
    return (
        <Headers>
            <Logo aria-label={appName}>{appName}</Logo>
            <NavLinks>
                <a href="/" aria-label="Inicio">Inicio</a>
                <a href="/favorites" aria-label="Favoritos">Favoritos</a> 
            </NavLinks>
        </Headers>
    )
}

export default Header;