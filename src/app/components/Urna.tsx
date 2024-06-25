'use client';

import React from 'react';
import { Container, Card, Form, Row, Col, Button } from 'react-bootstrap';

export default function Urna() {
  const buttonValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <Container className="shadow-lg" style={{ padding: '77px' }}>
      <Card className="shadow-lg" style={{ padding: '40px', background: 'rgb(190,187,185)', borderRadius: '15px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
        <Card.Body>
          <Row>
            <Col className="d-xxl-flex align-items-xxl-center">
              <div style={{ margin: '0px', height: 'auto', width: '100%', background: 'var(--bs-gray-100)', padding: '13px', borderRadius: '10px', boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.1)' }}>
                <h4>Digite o número do seu candidato:</h4>
                <Form>
                  <Row>
                    <Col className="col-xxl-2">
                      <Form.Control type="text" style={{ height: '82px', borderRadius: '10px', boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.1)' }} />
                    </Col>
                    <Col className="col-xxl-2">
                      <Form.Control type="text" style={{ height: '82px', borderRadius: '10px', boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.1)' }} />
                    </Col>
                  </Row>
                </Form>
                <h3>Você votou em : (nome candidato)</h3>
                <img style={{ width: '40%', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }} alt="candidato" />
              </div>
            </Col>
            <Col className="col-xxl-5" style={{ background: '#4c5156', borderRadius: '15px', padding: '20px', boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.3)' }}>
              {buttonValues.map((value, index) => (
                index % 3 === 0 && (
                  <Row key={index} style={{ paddingBottom: '20px' }}>
                    {buttonValues.slice(index, index + 3).map((val) => (
                      <Col key={val}>
                        <Button className="btn-primary" style={{ width: '100%', background: 'var(--bs-gray-800)', padding: '12px', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', border: 'none' }}>
                          {val}
                        </Button>
                      </Col>
                    ))}
                  </Row>
                )
              ))}
              <Row style={{ paddingBottom: '20px' }}>
                <Col className="col-4">
                  <Button className="btn-primary" style={{ width: '100%', background: 'var(--bs-gray-800)', padding: '12px', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', border: 'none' }}>
                    0
                  </Button>
                </Col>
              </Row>
              <Row style={{ paddingBottom: '20px' }}>
                <Col>
                  <Button className="btn-primary" style={{ width: '100%', background: 'var(--bs-gray-100)', padding: '12px', color: 'var(--bs-gray-900)', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', border: 'none' }}>
                    Branco
                  </Button>
                </Col>
                <Col>
                  <Button className="btn-primary" style={{ width: '100%', background: 'var(--bs-red)', padding: '12px', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', border: 'none' }}>
                    Corrigir
                  </Button>
                </Col>
                <Col>
                  <Button className="btn-primary" style={{ width: '100%', background: 'var(--bs-green)', padding: '12px', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', border: 'none' }}>
                    Confirmar
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
