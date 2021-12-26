import React from "react";
import {Nav} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

type NavigationItemProps = {
    to: string;
    title: string;
    icon: IconDefinition;
    external?: undefined | boolean;
};

const NavigationItem = (props: NavigationItemProps) => {
    if (props.external) {
        return (
            <Nav.Link href={props.to}><FontAwesomeIcon icon={props.icon} fixedWidth/>&nbsp;{props.title}</Nav.Link>
        );
    }
    return (
        <LinkContainer to={props.to}>
            <Nav.Link><FontAwesomeIcon icon={props.icon} fixedWidth/>&nbsp;{props.title}</Nav.Link>
        </LinkContainer>
    );
};

export default NavigationItem;
