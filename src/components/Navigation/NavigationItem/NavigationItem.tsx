import React from "react";
import {Nav} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

type NavigationItemProps = {
    to: string;
    title: string;
    external?: undefined | boolean;
};

const NavigationItem = (props: NavigationItemProps) => {
    if (props.external) {
        return (
            <Nav.Link href={props.to}>{props.title}</Nav.Link>
        );
    }
    return (
        <LinkContainer to={props.to}>
            <Nav.Link>{props.title}</Nav.Link>
        </LinkContainer>
    );
};

export default NavigationItem;
