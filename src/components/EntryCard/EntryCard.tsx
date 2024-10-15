import React from 'react';
import { Card } from 'react-bootstrap';

import { PortfolioEntry } from '../../types.ts';
import TechnologyBadge from '../TechnologyBadge/TechnologyBadge';

const EntryCard = (props: { entry: PortfolioEntry }) => {
  return (
    <Card className={'border-0'}>
      <Card.Img
        variant={'top'}
        src={props.entry.imageUrl}
      />
      <Card.Body>
        <Card.Title>{props.entry.name}</Card.Title>
        <Card.Subtitle>
          {props.entry.year}
          {props.entry.isOnGoing ? ' - Present' : ''}
        </Card.Subtitle>
        <Card.Text dangerouslySetInnerHTML={{ __html: props.entry.description }} />
        {props.entry.technologies.map((value) => (
          <TechnologyBadge
            tech={value}
            key={value.id}
          />
        ))}
      </Card.Body>
    </Card>
  );
};

export default EntryCard;
