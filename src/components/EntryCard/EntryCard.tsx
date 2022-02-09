import React from "react";
import {Card} from "react-bootstrap";

import {PortfolioEntry} from "../../types";
import classes from "./EntryCard.module.scss";
import TechnologyBadge from "../TechnologyBadge/TechnologyBadge";

const EntryCard = (props: { entry: PortfolioEntry }) => {
    return (
        <Card className={classes.EntryCard}>
            <Card.Img variant={'top'} src={props.entry.imageUrl}/>
            <Card.Body>
                <Card.Title className={classes.EntryCardTitle}>
                    {props.entry.name}&nbsp;
                    <span className={classes.EntryCardYear}>
                        {props.entry.year}{props.entry.onGoing ? ' - Present': ''}
                    </span>
                </Card.Title>
                <Card.Text className={classes.EntryCardText}
                           dangerouslySetInnerHTML={{__html: props.entry.description}}/>
                {props.entry.technologies.map(value => <TechnologyBadge tech={value} key={value.id}/>)}
            </Card.Body>
        </Card>
    );
};

export default EntryCard;
