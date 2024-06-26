import React, { useState } from 'react';
import { Container, Table, Pagination } from 'react-bootstrap';

interface Candidate {
  name: string;
  image: string;
  idade: number;
  partido: string;
  numero: number;
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

const itemsPerPage = 3; // Número de itens por página

const TabelaCandidatos: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Cálculo de índices para paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCandidates = Object.values(candidates).slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(Object.keys(candidates).length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="shadow" style={{ padding: '16px' }}>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr style={{ fontSize: '20px' }}>
              <th style={{ background: 'var(--bs-gray-700)', color: 'var(--bs-gray-100)' }}>Imagem</th>
              <th style={{ background: 'var(--bs-gray-700)', color: 'var(--bs-gray-100)' }}>Nome</th>
              <th style={{ background: 'var(--bs-gray-700)', color: 'var(--bs-gray-100)' }}>Idade</th>
              <th style={{ background: 'var(--bs-gray-700)', color: 'var(--bs-gray-100)' }}>Número</th>
              <th style={{ background: 'var(--bs-gray-700)', color: 'var(--bs-gray-100)' }}>Partido</th>
            </tr>
          </thead>
          <tbody>
            {currentCandidates.map((candidate, index) => (
              <tr key={index} style={{ fontSize: '20px' }}>
                <td>
                  <img src={candidate.image} alt="candidate" style={{ width: '50px', height: 'auto' }} />
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
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
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
