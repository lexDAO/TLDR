import React, { useState, useEffect } from "react";
import { Button, Header, Form, Table, Grid, Input } from "semantic-ui-react";

export default function Submit({ web3, accounts, contract }) {
  const [clientDDRs, setClientDDRs] = useState();
  const [providerDDRs, setProviderDDRs] = useState();
  const [activeKey, setActiveKey] = useState();
  const [clientSelected, setClientSelected] = useState(true);
  const [mappedArray, setMappedArray] = useState(clientDDRs);

  const getDDR = async () => {
    const numDDR = await contract.methods.RDDR().call();
    const DDRPromise = [...Array(parseInt(numDDR)).keys()].map(index =>
      contract.methods.rddr(index).call({ from: accounts[0], gas: 300000 })
    );

    const DDRs = await Promise.all(DDRPromise);
    const myClientDDRs = DDRs.filter(ddr => accounts[0] === ddr.client);
    const myProviderDDRs = DDRs.filter(ddr => accounts[0] === ddr.provider);

    setClientDDRs(myClientDDRs);
    setProviderDDRs(myProviderDDRs);
  };

  const setActiveDDR = (ddr, i) => {
    setActiveKey(i);
  };

  useEffect(() => {
    getDDR();
  }, []);

  return (
    <>
      <Grid>
        <Grid.Column width={8}>
          <Header as="h3">Your DDRs</Header>
          <Button.Group>
            <Button onClick={() => setClientSelected(true)} active={clientSelected}>Client</Button>
            <Button onClick={() => setClientSelected(false)} active={!clientSelected}>Provider</Button>
          </Button.Group>
          <Table basic="very" celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={4}>DDR #</Table.HeaderCell>
                <Table.HeaderCell width={12}>Deliverable</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {clientSelected &&
                clientDDRs &&
                clientDDRs.map((ddr, i) => (
                  <Table.Row
                    style={activeKey === i ? { fontWeight: "bold" } : null}
                    key={i}
                  >
                    <Table.Cell>
                      <span
                        className="fake-link"
                        onClick={() => setActiveDDR(ddr, i)}
                      >
                        {ddr.ddrNumber}
                      </span>
                    </Table.Cell>
                    <Table.Cell>{ddr.deliverable}</Table.Cell>
                  </Table.Row>
                ))}

              {!clientSelected &&
                providerDDRs &&
                providerDDRs.map((ddr, i) => (
                  <Table.Row
                    style={activeKey === i ? { fontWeight: "bold" } : null}
                    key={i}
                  >
                    <Table.Cell>
                      <span
                        className="fake-link"
                        onClick={() => setActiveDDR(ddr, i)}
                      >
                        {ddr.ddrNumber}
                      </span>
                    </Table.Cell>
                    <Table.Cell>{ddr.deliverable}</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column width={6}>
          <Header as="h3">Register a DDR</Header>
          <Form></Form>
        </Grid.Column>
      </Grid>
    </>
  );
}