import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import NavigationItem from "./NavigationItem/NavigationItem";

const Navigation = () => {

    type NavItemType = {
        to: string;
        title: string;
        external?: undefined | boolean;
    };
    const nav_items: NavItemType[] = [
        {
            title: "Portfolio",
            to: "/"
        },
        {
            title: "About",
            to: "/about"
        },
        {
            title: "Resume",
            to: "https://joserodriguezrivas.com/files/Jose_de_Jesus_Rodriguez_Rivas_Resume.pdf",
            external: true
        },
        {
            title: "Github",
            to: "https://www.github.com/joserivas1998",
            external: true
        }
    ];

    const render_nav_item = (nav_item: NavItemType, index: number) => {
        return <NavigationItem to={nav_item.to} title={nav_item.title} external={nav_item.external} key={index}/>;
    };

    return (
        <Navbar expand="lg">
            <Container fluid>
                <LinkContainer to='/'>
                    <Navbar.Brand>Jos&eacute; Rodriguez Rivas</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {nav_items.map(render_nav_item)}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
