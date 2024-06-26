import React, { useState } from 'react';
import { Container, Card, Form, Row, Col, Button } from 'react-bootstrap';

interface Candidate {
  name: string;
  image: string;
  idade?: number; // idade é opcional para evitar erro de tipo
  partido?: string;
  numero?: number;
}

const candidates: { [key: number]: Candidate } = {
  22: {
    name: 'Jair Bolsonaro',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Jair_Bolsonaro_2021_%28cropped%29.jpg/451px-Jair_Bolsonaro_2021_%28cropped%29.jpg',
    idade: 66,
    partido: 'PL',
    numero: 22
  },
  14: {
    name: 'Padre Kelmon',
    image: 'https://horacampinas.com.br/wp-content/uploads/2022/09/Padre_Kelmon_presidente.jpeg',
    idade: 45,
    partido: 'PTB',
    numero: 14
  },
  30: {
    name: 'Felipe D\'Avila',
    image: 'https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQvT6xqf5XBleRGNOCxmSCdIB7F3_hB-qMShPy9-j4JsO4tlpvX2F4QDOXf4GOlIKto',
    idade: 50,
    partido: 'RFDS',
    numero: 30
  },
  13: {
    name: 'Lula da Silva',
    image: 'https://f.i.uol.com.br/fotografia/2022/08/10/166014378462f3c8a8c16e9_1660143784_3x2_md.jpg',
    idade: 75,
    partido: 'PT',
    numero: 13
  },
  17: {
    name: 'Ciro Gomes',
    image: 'https://divulgacandcontas.tse.jus.br/candidaturas/oficial/2022/BR/BR/544/candidatos/882713/foto.jpg',
    idade: 63,
    partido: 'PDT',
    numero: 17
  },
  12: {
    name: 'Simone Tebet',
    image: 'https://divulgacandcontas.tse.jus.br/candidaturas/oficial/2022/BR/BR/544/candidatos/899992/foto.jpg',
    idade: 51,
    partido: 'MDB',
    numero: 12
  },
  80: {
    name: 'Léo Péricles',
    image: 'https://horacampinas.com.br/wp-content/uploads/2022/09/Leo_Pericles_presidente.jpg',
    idade: 40,
    partido: 'MDB',
    numero: 80
  },
  44: {
    name: 'Soraya Thronicke',
    image: 'https://horacampinas.com.br/wp-content/uploads/2022/09/Soraya_presidente.jpg',
    idade: 40,
    partido: 'MDB',
    numero: 44
  }
};

const Urna: React.FC = () => {
  const buttonValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [votedCandidate, setVotedCandidate] = useState<Candidate | null>(null);

  const handleButtonClick = (value: number) => {
    if (num1 === '') {
      setNum1(value.toString());
    } else if (num2 === '') {
      setNum2(value.toString());
    }
  };

  const handleBranco = () => {
    setNum1('');
    setNum2('');
    setVotedCandidate({ name: 'Branco', image: '' });
  };

  const handleCorrigir = () => {
    setNum1('');
    setNum2('');
    setVotedCandidate(null);
  };

  const handleConfirmar = () => {
    const candidateNumber = parseInt(`${num1}${num2}`);
    const candidate = candidates[candidateNumber];
    if (candidate) {
      setVotedCandidate(candidate);
    } else {
      setVotedCandidate({ name: 'Voto Nulo', image: '' });
    }
  };

  return (
    <Container className="shadow-lg" style={{ padding: '20px', maxWidth: '1200px' }}>
      <Card className="shadow-lg" style={{ padding: '20px', background: 'rgb(190,187,185)', borderRadius: '15px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
        <Card.Body>
          <Row>
            <Col xs={12} lg={7}>
              <div style={{ margin: '0px', height: '450px', background: 'var(--bs-gray-100)', padding: '13px', borderRadius: '10px', boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.1)' }}>
                <h4>Digite o número do seu candidato:</h4>
                <Form>
                  <Row>
                    <Col xs={6} md={6}>
                      <Form.Control type="text" value={num1} readOnly style={{ height: '82px', borderRadius: '10px', boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.1)' }} />
                    </Col>
                    <Col xs={6} md={6}>
                      <Form.Control type="text" value={num2} readOnly style={{ height: '82px', borderRadius: '10px', boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.1)' }} />
                    </Col>
                  </Row>
                </Form>
                {votedCandidate && votedCandidate.image && (
                  <Row style={{ marginTop: '20px' }}>
  <Col xs={6} lg={6} className="d-flex align-items-center justify-content-center">
    <img
      src={votedCandidate.image}
      style={{ width: '70%', height: '80%', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}
      alt="candidato"
    />
  </Col>
  <Col xs={6} lg={6}>
    <div style={{ paddingLeft: '10px' }}>
      <h2>Você votou em:</h2>
      <p style={{ fontSize: '20px' }}><strong>Nome:</strong> {votedCandidate.name}</p>
      {votedCandidate.idade && <p style={{ fontSize: '20px' }}><strong>Idade:</strong> {votedCandidate.idade}</p>}
      {votedCandidate.partido && <p style={{ fontSize: '20px' }}><strong>Partido:</strong> {votedCandidate.partido}</p>}
      {votedCandidate.numero && <p style={{ fontSize: '20px' }}><strong>Número:</strong> {votedCandidate.numero}</p>}
    </div>
  </Col>
</Row>

)}

              </div>
            </Col>
            <Col xs={12} lg={5} style={{ background: '#4c5156', borderRadius: '15px', padding: '20px', boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.3)' }}>
              {buttonValues.map((value, index) => (
                index % 3 === 0 && (
                  <Row key={index} style={{ paddingBottom: '10px' }}>
                    {buttonValues.slice(index, index + 3).map((val) => (
                      <Col key={val} xs={4} md={4} style={{ marginBottom: '10px' }}>
                        <Button
                          className="btn-primary"
                          style={{ width: '100%', background: 'var(--bs-gray-800)', padding: '12px', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', border: 'none' }}
                          onClick={() => handleButtonClick(val)}
                        >
                          {val}
                        </Button>
                      </Col>
                    ))}
                  </Row>
                )
              ))}
              <Row style={{ marginTop: '10px' }}>
                <Col xs={4} md={4} style={{ marginBottom: '10px' }}>
                  <Button
                    className="btn-primary"
                    style={{ width: '100%', background: 'var(--bs-gray-100)', padding: '12px', color: 'var(--bs-gray-900)', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', border: 'none' }}
                    onClick={handleBranco}
                  >
                    Branco
                  </Button>
                </Col>
                <Col xs={4} md={4} style={{ marginBottom: '10px' }}>
                  <Button
                    className="btn-primary"
                    style={{ width: '100%', background: 'var(--bs-red)', padding: '12px', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', border: 'none' }}
                    onClick={handleCorrigir}
                  >
                    Corrigir
                  </Button>
                </Col>
                <Col xs={4} md={4} style={{ marginBottom: '10px' }}>
                  <Button
                    className="btn-primary"
                    style={{ width: '100%', background: 'var(--bs-green)', padding: '12px', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', border: 'none' }}
                    onClick={handleConfirmar}
                  >
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
};

export default Urna;
