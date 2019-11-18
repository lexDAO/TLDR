import React, { useState, useEffect } from "react";
import { Button, Header, Form, Segment, Input, Message } from "semantic-ui-react";

export default function Register({ web3, accounts, contract }) {
  // Read LexScript Template
  const [lexScriptID, setlexID] = useState();
  const [lexScript, setLexScript] = useState();

  // Register DDR
  const [provider, setProvider] = useState();
  const [DDRToken, setDDRToken] = useState();
  const [deliverable, setDeliverable] = useState();
  const [retainerDuration, setRetinerDuration] = useState();
  const [deliverableRate, setDeliverableRate] = useState();
  const [payCap, setPayCap] = useState();

  const getLex = async () => {
    const lexScript = await contract.methods.lexScript(lexScriptID).call();
    setLexScript(lexScript.templateTerms);
  };


  const registerDDR = async () => {
    const res = await contract.methods
      .registerDDR(
        accounts[0],
        provider,
        DDRToken,
        deliverable,
        retainerDuration,
        deliverableRate,
        payCap,
        lexScriptID
      )
      .send({ from: accounts[0], gas: 300000 });

    console.log(res);
  };

  return (
    <>
      <Segment>
        <Header as="h3">Select/Read a LexScript</Header>
        <Form>
          <Form.Field
            control={Input}
            placeholder="1"
            label="LexScript ID"
            value={lexScriptID}
            onChange={e => setlexID(e.target.value)}
          />
          <Button type="submit" onClick={getLex}>
            Submit
          </Button>
        </Form>
        {lexScript && <Message>{lexScript}</Message>}
      </Segment>
      <Segment>
        <Header as="h3">Register a DDR</Header>
        <Form>
          <Form.Field
            control={Input}
            placeholder="0x0000000000000000000000000000000000000000"
            label="Provider Address"
            value={provider}
            onChange={e => setProvider(e.target.value)}
          />
          <Form.Field
            control={Input}
            placeholder="0x0000000000000000000000000000000000000000"
            label="DDR Token Address"
            value={DDRToken}
            onChange={e => setDDRToken(e.target.value)}
          />
          <Form.Field
            control={Input}
            label="Deliverable Description"
            placeholder="Description..."
            value={deliverable}
            onChange={e => setDeliverable(e.target.value)}
          />
          <Form.Field
            control={Input}
            placeholder="1"
            label="Retainer Duration (days)"
            value={retainerDuration}
            onChange={e => setRetinerDuration(e.target.value)}
          />
          <Form.Field
            control={Input}
            placeholder="1"
            label="Deliverable Rate"
            value={deliverableRate}
            onChange={e => setDeliverableRate(e.target.value)}
          />
          <Form.Field
            control={Input}
            placeholder="1 ETH"
            label="Pay Cap (in ETH)"
            value={payCap}
            onChange={e => setPayCap(e.target.value)}
          />
          <Button type="submit" onClick={registerDDR}>
            Submit
          </Button>
        </Form>
      </Segment>
    </>
  );
}
