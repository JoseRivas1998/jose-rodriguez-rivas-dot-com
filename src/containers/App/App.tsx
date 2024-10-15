import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Route, Routes } from 'react-router';

import Navigation from '@/components/Navigation/Navigation';
const Portfolio = React.lazy(() => import('@/containers/Portfolio/Portfolio'));
const About = React.lazy(() => import('@/containers/About/About'));

function App() {
  return (
    <>
      <Navigation />
      <Container>
        <Row>
          <Routes>
            <Route
              path={'/'}
              element={
                <React.Suspense>
                  <Portfolio />
                </React.Suspense>
              }
            />
            <Route
              path={'/about'}
              element={
                <React.Suspense>
                  <About />
                </React.Suspense>
              }
            />
          </Routes>
        </Row>
      </Container>
    </>
  );
}

export default App;
