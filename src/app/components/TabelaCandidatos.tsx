import React from 'react';
import { Container, Table, Pagination } from 'react-bootstrap';
import { useTabelaCandidatos } from '../hooks/useTabelaCandidatos';
import styles from '../styles/TabelaCandidatos.module.css';

const TabelaCandidatos: React.FC = () => {
  const { currentPage, currentCandidates, totalPages, handlePageChange } = useTabelaCandidatos();

  return (
    <Container className={`shadow ${styles.tableContainer}`}>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Imagem</th>
              <th className={styles.tableHeader}>Nome</th>
              <th className={styles.tableHeader}>Idade</th>
              <th className={styles.tableHeader}>Número</th>
              <th className={styles.tableHeader}>Partido</th>
            </tr>
          </thead>
          <tbody>
            {currentCandidates.map((candidate) => (
              <tr key={candidate.numero} className={styles.tableRow}>
                <td>
                  <img src={candidate.image} alt="candidate" className={styles.candidateImage} />
                </td>
                <td>{candidate.name}</td>
                <td>{candidate.idade}</td>
                <td>{candidate.numero}</td>
                <td>{candidate.partido}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Pagination>
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        {Array.from({ length: totalPages }).map((_, index) => (
          <Pagination.Item 
            key={`page-${index + 1}`} 
            active={index + 1 === currentPage} 
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} />
      </Pagination>
    </Container>
  );
};

export default TabelaCandidatos;
