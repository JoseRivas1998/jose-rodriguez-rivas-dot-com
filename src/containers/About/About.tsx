import React, {useEffect, useState} from "react";
import {Col, Image, Row} from "react-bootstrap";
import axios from "axios";
import ReactMarkdown from "react-markdown";

import profile_img from './jose-profile.png';
import styles from './About.module.scss';
import {Certification} from "../../types";
import CertificationCard from "../../components/CertificationCard/CertificationCard";
import {Helmet} from "react-helmet";

const About = () => {

    const [content, set_content] = useState<string | null>(null);
    const [certifications, set_certifications] = useState<Certification[]>([]);

    const get_page = async () => {
        const get_result = await axios.get('/portfolio/about-me');
        return get_result.data.content as string;
    };

    const get_certifications = async () => {
        const get_result = await axios.get('/portfolio/certifications');
        return get_result.data as Certification[];
    };

    useEffect(() => {
        Promise.all([get_page(), get_certifications()])
            .then(results => {
                set_content(results[0]);
                set_certifications(results[1]);
            });
        // eslint-disable-next-line
    }, [])

    if (!content) {
        return (
            <Col/>
        );
    }

    const render_certification = (cert: Certification, index: number) => (
        <Col xs={12} sm={4}  key={index}>
            <CertificationCard certification={cert}/>
        </Col>
    );

    return (
        <Col>
            <Helmet>
                <title>About Me | Jose Rodriguez Rivas</title>
            </Helmet>
            <Row>
                <Col className={'text-right'} xs={4} sm={2}>
                    <Image
                        src={profile_img}
                        fluid
                        alt={'A Picture of Jose Rodriguez Rivas'}
                        className={styles.ProfileImg}/>
                </Col>
                <Col className={'text-center'} xs={7} sm={8}>
                    <h1>About Me</h1>
                </Col>
            </Row>
            <Row className={'mt-4'}>
                <Col xs={{span: 12}} sm={{span: 8, offset: 2}}>
                    <ReactMarkdown children={content}/>
                </Col>
            </Row>
            <Row className={'mt-4 mb-3'}>
                <Col>
                    <h2 className={'text-center'}>Certifications</h2>
                    {certifications.map(render_certification)}
                </Col>
            </Row>
        </Col>
    );
};

export default About;
