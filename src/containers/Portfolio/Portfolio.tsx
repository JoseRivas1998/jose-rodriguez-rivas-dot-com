import React, {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Helmet} from "react-helmet";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

import {PortfolioEntry} from "../../types";
import EntryCard from "../../components/EntryCard/EntryCard";

const Portfolio = () => {

    const [loading, set_loading] = useState<boolean>(true);
    const [entries, set_entries] = useState<PortfolioEntry[][]>([]);

    const load_page = async () => {
        const get_result = await axios.get('/portfolio');
        const all_entries = [...(get_result.data as PortfolioEntry[])];
        const entry_rows: PortfolioEntry[][] = [];

        while (all_entries.length > 0) {
            entry_rows.push(all_entries.splice(0, 2));
        }

        set_entries(entry_rows);
    };

    useEffect(() => {
        load_page().then(() => set_loading(false));
        // eslint-disable-next-line
    }, [])

    if (loading) {
        return (
            <Col className={'text-center'}>
                <h2><FontAwesomeIcon icon={faSpinner} spin/> Loading...</h2>
            </Col>
        )
    }

    const render_entry_row = (entry_row: PortfolioEntry[], row_index: number) => {
        const render_entry = (entry: PortfolioEntry, index: number) => {
            return (
                <Col xs={12} md={6} key={index}>
                    <EntryCard entry={entry}/>
                </Col>
            );
        };
        return (
            <Row key={row_index}>
                {entry_row.map(render_entry)}
            </Row>
        )
    }

    return (
        <Col>
            <Helmet>
                <title>Jose Rodriguez Rivas</title>
            </Helmet>
            <Row>
                <Col className={'text-center'}>
                    <h2>Portfolio</h2>
                    {entries.map(render_entry_row)}
                </Col>
            </Row>
        </Col>
    );
};

export default Portfolio;
