import React from 'react';
import { Badge } from 'react-bootstrap';

import { PortfolioTechnology } from '../../types.ts';
import styles from './TechnologyBadge.module.scss';

type Props = {
  tech: PortfolioTechnology;
};

const TechnologyBadge = ({ tech }: Props) => {
  return (
    <Badge
      bg={'info'}
      className={styles.TechnologyBadge}
    >
      {tech.name}
    </Badge>
  );
};

export default TechnologyBadge;
