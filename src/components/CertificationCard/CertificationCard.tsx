import React from "react";
import {Button, Card, Col, Row} from "react-bootstrap";

import {Certification} from "../../types";

type Props = {
    certification: Certification;
}

const CertificationCard = ({certification}: Props) => {
    const {imageUrl, title, issueDate, link, expirationDate} = certification;
    const render_date = (prefix: string, date_str: string) => {
        const date = new Date(date_str);
        return (
            <Col>
                <p>{prefix}:<br/>{date.getUTCMonth() + 1}/{date.getUTCDate()}/{date.getUTCFullYear()}</p>
            </Col>
        );
    };
    return (
        <Card>
            <Card.Img variant={'top'} src={imageUrl}/>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Row>
                    {render_date('Issue Date', issueDate)}
                    {expirationDate ? render_date('Expiration Date', expirationDate) : null}
                </Row>
                <Button variant={'primary'} href={link}>View Certification</Button>
            </Card.Body>
        </Card>
    )
};

export default CertificationCard;
