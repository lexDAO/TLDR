import React, { useState, useEffect } from "react";
import {
  Button,
  Header,
  Form,
  Dropdown,
  Input,
  Message,
  Grid
} from "semantic-ui-react";

const options = [
  { value: 1, text: "(1) General Retainer" },
  { value: 2, text: "(2) Retainer for Goods" },
  { value: 3, text: "(3) Retainer for Services" },
  { value: 4, text: "(4) Grant Agreement" },
  { value: 5, text: "(5) Loan Agreement" },
  { value: 6, text: "(6) SAFE" },
  { value: 7, text: "(7) HASHWRAP" }
];

export default function Register({ web3, accounts, contract }) {
  // Read LexScript Template
  const [lexScriptID, setlexID] = useState(1);
  const [lexScript, setLexScript] = useState();

  // Register DD
  const [client, setClient] = useState();
  const [DRToken, setDRToken] = useState(
    "0x6B175474E89094C44Da98b954EedeAC495271d0F"
  );
  const [deliverable, setDeliverable] = useState();
  const [retainerDuration, setRetinerDuration] = useState();
  const [deliverableRate, setDeliverableRate] = useState();
  const [payCap, setPayCap] = useState();

  const getLex = async () => {
    if (contract) {
      const lexScript = await contract.methods.lexScript(lexScriptID).call();
      setLexScript(lexScript.templateTerms);
    }
  };

  useEffect(() => {
    getLex();
  });

  const registerDR = async () => {
    const res = await contract.methods
      .registerDR(
        client,
        DRToken,
        deliverable,
        retainerDuration * 86400,
        web3.utils.toWei(deliverableRate),
        web3.utils.toWei(payCap),
        lexScriptID
      )
      .send({ from: accounts[0], gas: 300000 });

    console.log(res);
  };

  return (
    <>
      <Grid>
        <Grid.Column width={6}>
          <Header as="h3">Select/Read a LexScript</Header>
          <Form>
            <Dropdown
              selection
              options={options}
              defaultValue={lexScriptID}
              onChange={(event, data) => {
                setlexID(data.value)
                getLex()
              }}
            />
          </Form>
          <Message
            color={"teal"}
            style={{
              maxHeight: "33.5vh",
              overflowWrap: "break-word",
              overflowY: "auto"
            }}
          >
            {lexScript ? lexScript : "Please select a valid LexScript ID first"}
          </Message>
        </Grid.Column>
        <Grid.Column width={10}>
          <Header as="h3">Register a Digital Retainer</Header>
          <Form>
            <Form.Field
              control={Input}
              placeholder="0x0000000000000000000000000000000000000000"
              label="Client Address"
              value={client}
              onChange={e => setClient(e.target.value)}
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
              placeholder="1"
              label="Pay Cap (in DAI)"
              value={payCap}
              onChange={e => setPayCap(e.target.value)}
            />
            <Button type="submit" onClick={registerDR}>
              Submit
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
}
