import React, { useState, useEffect } from "react";
import {
  Button,
  Label,
  Header,
  Form,
  Table,
  Grid,
  Input,
  Message
} from "semantic-ui-react";

export default function Submit({ web3, accounts, contract }) {
  const [clientDDRs, setClientDDRs] = useState();
  const [providerDDRs, setProviderDDRs] = useState();
  const [activeKey, setActiveKey] = useState();
  const [clientSelected, setClientSelected] = useState(true);
  const [mappedArray, setMappedArray] = useState(clientDDRs);

  const [activeDDR, setActiveDDR] = useState();
  const [ddrSelected, setDDRSelected] = useState(false)

  const getDDR = async () => {
    const numDDR = await contract.methods.RDDR().call();
    const DDRPromise = [...Array(parseInt(numDDR)).keys()].map(index =>
      contract.methods.rddr(index+1).call({ from: accounts[0], gas: 300000 })
    );

    const DDRs = await Promise.all(DDRPromise);
    console.log(DDRs)
    const myClientDDRs = DDRs.filter(ddr => accounts[0] === ddr.client);
    const myProviderDDRs = DDRs.filter(ddr => accounts[0] === ddr.provider);

    setClientDDRs(myClientDDRs);
    setProviderDDRs(myProviderDDRs);
  };

  const setActive = (ddr, i) => {
    setActiveDDR(ddr);
    setDDRSelected(true);
    setActiveKey(i);
  };

  const makePayment = async () => {
    console.log("calling make payment");
    const res = await contract.methods
      .payDDR(activeDDR.ddrNumber)
      .send({ from: accounts[0], gas: 300000 });
    console.log(res);
  };

  const confirmDDR = async () => {
    const res = await contract.methods
    .confirmDDR(activeDDR.ddrNumber)
    .send({ from: accounts[0], gas: 300000 });
    console.log(res);
  }

  useEffect(() => {
    getDDR();
  }, []);

  return (
    <>
      <Grid>
        <Grid.Column width={8}>
          <Header as="h3">Your DDRs</Header>
          <Button.Group>
            <Button
              onClick={() => setClientSelected(true)}
              active={clientSelected}
            >
              Client
            </Button>
            <Button
              onClick={() => setClientSelected(false)}
              active={!clientSelected}
            >
              Provider
            </Button>
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
                        onClick={() => setActive(ddr, i)}
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
                        onClick={() => setActive(ddr, i)}
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
          <Header as="h3">Manage DDR</Header>

          {clientSelected && ddrSelected && (activeDDR.confirmed ? (
            <Form>
              <Form.Field>
                <label>Payment being made to</label>
                <input value={activeDDR.provider} disabled={true} />
              </Form.Field>
              <Form.Field>
                <label>Deliverable Payment (in ETH)</label>
                <input value={activeDDR.deliverableRate} disabled={true} />
              </Form.Field>
              <Button type="submit" onClick={() => makePayment()}>
                Submit
              </Button>
            </Form>
          ) : (
            <Form>
              <Message>You are about to transfer <b>{activeDDR.payCap}</b> into escrow at the smart contract address <b>{activeDDR.ddrToken}</b> for entering into a Digital Dollar Retainer with <b>{activeDDR.provider}</b>. Do you wish to confirm?</Message>
              <Button type="submit" onClick={() => confirmDDR()}>Confirm</Button>
            </Form>
            
          ))}
        </Grid.Column>
      </Grid>
    </>
  );
}
