import React from 'react';
import { Container, Card, Form, Row, Col, Button } from 'react-bootstrap';
import { 
  useVotingSystem,
  BUTTON_VALUES
} from '../utils/votingUtils';
import styles from '../styles/UrnaStyles.module.css';

const Urna: React.FC = () => {
  // Usar o hook personalizado para gerenciar todo o estado e lógica
  const { 
    num1, 
    num2, 
    votedCandidate, 
    votingState,
    handleNumericButtonClick,
    handleWhiteVote,
    handleCorrectVote,
    handleConfirmVote
  } = useVotingSystem();

  return (
    <Container className={`shadow-lg ${styles.urnaContainer}`}>     
      <Card className={`shadow-lg ${styles.urnaCard}`}>
        <Card.Body>
          <Row>
            <Col xs={12} lg={7}>
              <div className={styles.displayArea}>
                <h4>Digite o número do seu candidato:</h4>
                <Form>
                  <Row>
                    <Col xs={6} md={6}>
                      <Form.Control type="text" value={num1} readOnly className={styles.numberInput} />
                    </Col>
                    <Col xs={6} md={6}>
                      <Form.Control type="text" value={num2} readOnly className={styles.numberInput} />
                    </Col>
                  </Row>
                </Form>
                {votedCandidate && votedCandidate.image && votingState === 'ongoing' && (
                  <Row style={{ marginTop: '20px' }}>
                    <Col xs={6} lg={6} className="d-flex align-items-center justify-content-center">
                      <img
                        src={votedCandidate.image}
                        className={styles.candidateImage}
                        alt="candidato"
                      />
                    </Col>
                    <Col xs={6} lg={6}>
                      <div className={styles.candidateInfo}>
                        <h2>Você votou em:</h2>
                        <p style={{ fontSize: '20px' }}><strong>Nome:</strong> {votedCandidate.name}</p>
                        {votedCandidate.idade && <p style={{ fontSize: '20px' }}><strong>Idade:</strong> {votedCandidate.idade}</p>}
                        {votedCandidate.partido && <p style={{ fontSize: '20px' }}><strong>Partido:</strong> {votedCandidate.partido}</p>}
                        {votedCandidate.numero && <p style={{ fontSize: '20px' }}><strong>Número:</strong> {votedCandidate.numero}</p>}
                      </div>
                    </Col>
                  </Row>
                )}
                {votingState === 'blank' && (
                  <Row style={{ marginTop: '20px' }}>
                    <Col xs={12}>
                      <h1 style={{ textAlign: 'center' }}>Você votou em BRANCO</h1>
                    </Col>
                  </Row>
                )}
                {votingState === 'finished' && (
                  <Row style={{ marginTop: '20px' }}>
                    <Col xs={12}>
                      <h1 style={{ textAlign: 'center' }}>FIM</h1>
                    </Col>
                  </Row>
                )}
              </div>
            </Col>
            <Col xs={12} lg={5} className={styles.keypadArea}>
              {BUTTON_VALUES.map((value, index) => (
                index % 3 === 0 && (
                  <Row key={index} style={{ paddingBottom: '10px' }}>
                    {BUTTON_VALUES.slice(index, index + 3).map((val) => (
                      <Col key={val} xs={4} md={4} style={{ marginBottom: '10px' }}>
                        <Button
                          className={`btn-primary ${styles.keyButton}`}
                          onClick={() => handleNumericButtonClick(val)}
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
                    className={`btn-primary ${styles.whiteButton}`}
                    onClick={handleWhiteVote}
                  >
                    Branco
                  </Button>
                </Col>
                <Col xs={4} md={4} style={{ marginBottom: '10px' }}>
                  <Button
                    className={`btn-primary ${styles.redButton}`}
                    onClick={handleCorrectVote}
                  >
                    Corrigir
                  </Button>
                </Col>
                <Col xs={4} md={4} style={{ marginBottom: '10px' }}>
                  <Button
                    className={`btn-primary ${styles.greenButton}`}
                    onClick={handleConfirmVote}
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
