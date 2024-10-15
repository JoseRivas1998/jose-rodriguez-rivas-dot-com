import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Helmet } from 'react-helmet';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { PortfolioEntry } from '../../types.ts';
import EntryCard from '../../components/EntryCard/EntryCard';
import { useQuery } from '@tanstack/react-query';
import { API_ROOT } from '../../library/config.ts';

const Portfolio = () => {
  const { data: entries, isPending: loading } = useQuery({
    queryKey: ['home'],
    queryFn: async () => {
      const response = await fetch(`${API_ROOT}/portfolio`);
      return (await response.json()) as PortfolioEntry[];
    },
  });

  if (loading || !entries) {
    return (
      <Col className={'text-center'}>
        <h2>
          <FontAwesomeIcon
            icon={faSpinner}
            spin
          />{' '}
          Loading...
        </h2>
      </Col>
    );
  }

  return (
    <Col>
      <Helmet>
        <title>Jose Rodriguez Rivas</title>
      </Helmet>
      <Row>
        <Col className={'text-center'}>
          <h2>Portfolio</h2>
        </Col>
      </Row>
      <Row
        xs={1}
        lg={2}
        className={'g-5'}
      >
        {entries.map((entry) => (
          <Col key={entry.id}>
            <EntryCard entry={entry} />
          </Col>
        ))}
      </Row>
    </Col>
  );
};

export default Portfolio;
