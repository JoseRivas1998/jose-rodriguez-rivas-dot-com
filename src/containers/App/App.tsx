import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Route, Routes } from 'react-router';

import Navigation from '../../components/Navigation/Navigation';
import Portfolio from '../Portfolio/Portfolio';
import About from '../About/About';

function App() {
  return (
    <>
      <Navigation />
      <Container>
        <Row>
          <Routes>
            <Route
              path={'/'}
              element={<Portfolio />}
            />
            <Route
              path={'/about'}
              element={<About />}
            />
          </Routes>
        </Row>
      </Container>
    </>
  );
}

export default App;
