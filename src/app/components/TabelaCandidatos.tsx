import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';

export default function TabelaCandidatos() {
  return (
    <Container>
      <div className="col-md-12 search-table-col">
        <div className="table-responsive">
          <Table bordered hover>
            <thead className="bill-header cs">
              <tr>
                <th id="trs-hd-1" className="col-lg-1">Imagem</th>
                <th id="trs-hd-2" className="col-lg-2">Nome</th>
                <th id="trs-hd-3" className="col-lg-3">Idade</th>
                <th id="trs-hd-4" className="col-lg-2">Partido</th>
                <th id="trs-hd-5" className="col-lg-2">Número</th>
                <th id="trs-hd-6" className="col-lg-2">Ação</th>
              </tr>
            </thead>
            <tbody>
              <tr className="warning no-result">
                <td colSpan="6"><i className="fa fa-warning"></i> No Result !!!</td>
              </tr>
              <tr>
                <td><img src="caminho-da-imagem" alt="Imagem do candidato" /></td>
                <td>India</td>
                <td>Souvik Kundu</td>
                <td>Bootstrap Stuido</td>
                <td>2014</td>
                <td>
                  <Button variant="success" style={{ marginLeft: '5px' }} type="submit"><i className="fa fa-check" style={{ fontSize: '15px' }}></i></Button>
                  <Button variant="danger" style={{ marginLeft: '5px' }} type="submit"><i className="fa fa-trash" style={{ fontSize: '15px' }}></i></Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
}
