import React from 'react';
import {Container, Row} from 'react-bootstrap';
import { Route, Routes } from "react-router";

import Navigation from "../../components/Navigation/Navigation";
import Portfolio from "../Portfolio/Portfolio";

function App() {
    return (
        <>
            <Navigation/>
            <Container>
                <Row>
                    <Routes>
                        <Route path={'/'} element={<Portfolio/>} />
                    </Routes>
                </Row>
            </Container>
        </>
    );
}

export default App;
