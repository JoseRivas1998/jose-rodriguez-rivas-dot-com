import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

import { Certification } from '@/types.ts';
import CertificationCard from '@/components/CertificationCard/CertificationCard';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';

const About = () => {
  const { data: content } = useQuery({
    queryKey: ['about'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_ROOT}/portfolio/about-me`);
      const data = (await response.json()) as { content: string };
      return data.content;
    },
  });

  const { data: certifications } = useQuery({
    queryKey: ['certifications'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_ROOT}/portfolio/certifications`);
      return (await response.json()) as Certification[];
    },
  });

  if (!content || !certifications) {
    return <Col />;
  }

  return (
    <Col>
      <Helmet>
        <title>About Me | Jose Rodriguez Rivas</title>
      </Helmet>
      <Row>
        <Col
          className={'text-right'}
          xs={4}
          sm={2}
        >
          <Image
            src={'https://cdn.tinycountrygames.com/blog/home_portrait.jpg'}
            fluid
            alt={'A Picture of Jose Rodriguez Rivas'}
            className={'rounded-circle'}
          />
        </Col>
        <Col
          className={'text-center'}
          xs={7}
          sm={8}
        >
          <h1>About Me</h1>
        </Col>
      </Row>
      <Row className={'mt-4'}>
        <Col
          xs={{ span: 12 }}
          sm={{ span: 8, offset: 2 }}
        >
          <ReactMarkdown children={content} />
        </Col>
      </Row>
      <Row className={'mt-4 mb-3'}>
        <Col>
          <h2 className={'text-center'}>Certifications</h2>
          {certifications.map((cert) => (
            <Col
              xs={12}
              sm={4}
              key={cert.id}
            >
              <CertificationCard certification={cert} />
            </Col>
          ))}
        </Col>
      </Row>
    </Col>
  );
};

export default About;
