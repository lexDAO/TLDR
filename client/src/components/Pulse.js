import React, { useState, useEffect } from "react";
import { Table, Header, Container, Segment, Input } from "semantic-ui-react";
import TextareaAutosize from "react-textarea-autosize";

export default function Pulse({ ownerBalances, web3, accounts, contract }) {
  // Submit a LexScript Template
  const [template, setTemplate] = useState();
  const [rate, setRate] = useState();
  const [lexAddress, setLexAddress] = useState();
  const [lexNum, setLexNum] = useState();
  const [retainerNum, setRetainerNum] = useState();
  const [convenantNum, setConvenantNum] = useState();

  const fetchData = async () => {
    const lexNum = await contract.methods
      .LSW()
      .call({ from: accounts[0], gas: 300000 });

    const retainerNum = await contract.methods.RDR().call({
      from: accounts[0],
      gas: 300000
    });

    const convenantNum = await contract.methods.RDC().call({
      from: accounts[0],
      gas: 300000
    });

    setLexNum(lexNum);
    setRetainerNum(retainerNum);
    setConvenantNum(convenantNum);
  };

  const renderScribes = () => {
    return !ownerBalances
      ? null
      : ownerBalances.map((owner, i) => (
          <Table.Row key={i}>
            <Table.Cell>{Object.keys(owner)[0]}</Table.Cell>
            <Table.Cell>{owner[Object.keys(owner)[0]]}</Table.Cell>
          </Table.Row>
        ));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container textAlign="center">
      <Header as="h3" floated='left'>
        lexScribes 
      </Header>
      <Table style={{width: '-webkit-fill-available', marginLeft: '15em'}} celled striped collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Tokens Held</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{renderScribes()}</Table.Body>
      </Table>

      <Header as="h3" floated='left'>
        Transactions
      </Header>
      <Table style={{width: '-webkit-fill-available', marginLeft: '15em'}} celled striped collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>lexScript</Table.HeaderCell>
            <Table.HeaderCell>Retainers</Table.HeaderCell>
            <Table.HeaderCell>Covenants</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        <Table.Row>
            <Table.Cell>{lexNum}</Table.Cell>
            <Table.Cell>{retainerNum}</Table.Cell>
            <Table.Cell>{convenantNum}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  );
}
