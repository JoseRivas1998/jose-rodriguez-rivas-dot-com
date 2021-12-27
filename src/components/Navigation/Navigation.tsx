import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faBriefcase, faFileAlt, faInfo} from "@fortawesome/free-solid-svg-icons";
import {faGithub} from "@fortawesome/free-brands-svg-icons";

import NavigationItem from "./NavigationItem/NavigationItem";

const Navigation = () => {

    type NavItemType = {
        to: string;
        title: string;
        icon: IconDefinition;
        external?: undefined | boolean;
    };
    const nav_items: NavItemType[] = [
        {
            title: "Portfolio",
            to: "/",
            icon: faBriefcase
        },
        {
            title: "About",
            to: "/about",
            icon: faInfo
        },
        {
            title: "Resume",
            to: "https://tiny-country-games-public-files.s3.us-west-2.amazonaws.com/documents/JoseDeJesus.RodriguezRivas-Resume.pdf",
            icon: faFileAlt,
            external: true
        },
        {
            title: "Github",
            to: "https://www.github.com/joserivas1998",
            icon: faGithub,
            external: true
        }
    ];

    const render_nav_item = (nav_item: NavItemType, index: number) => {
        return <NavigationItem to={nav_item.to}
                               title={nav_item.title}
                               external={nav_item.external}
                               icon={nav_item.icon}
                               key={index}/>;
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
