import React from "react";
import { Headers, Logo, NavLinks } from "./style/HeaderStyle";

interface HeaderProps {
    appName: string;
}

const Header = ({ appName }: HeaderProps) => {
    return (
        <Headers>
            <Logo>{appName}</Logo>
            <NavLinks>
                <a href="/">Inicio</a>
                <a href="/favorites">Favoritos</a> 
            </NavLinks>
        </Headers>
    )
}

export default Header;