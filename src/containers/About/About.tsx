import React, {useEffect, useState} from "react";
import {Col, Image, Row} from "react-bootstrap";
import axios from "axios";
import ReactMarkdown from "react-markdown";

import profile_img from './jose-profile.png';
import styles from './About.module.scss';

const About = () => {

    const [content, set_content] = useState<string | null>(null);

    const get_page = async () => {
        const get_result = await axios.get('/portfolio/about-me');
        return get_result.data.content;
    };

    useEffect(() => {
        get_page().then(set_content);
        // eslint-disable-next-line
    }, [])

    if (!content) {
        return (
            <Col></Col>
        );
    }

    return (
        <Col>
            <Row>
                <Col className={'text-right'} xs={4} sm={2}>
                    <Image
                        src={profile_img}
                        fluid
                        alt={'A Picture of Jose Rodriguez Rivas'}
                        className={styles.ProfileImg} />
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
        </Col>
    );
};

export default About;
