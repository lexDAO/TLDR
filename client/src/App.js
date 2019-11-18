import React, { useState, useEffect } from "react";
import {
  Button,
  Divider,
  Header,
  Container,
  Form,
  Segment,
  Input,
  Message
} from "semantic-ui-react";
import TextareaAutosize from "react-textarea-autosize";
import TLDRContract from "./contracts/TLDR.json";
import getWeb3 from "./utils/getWeb3";
import "./App.css";

export default function App() {
  const [web3, setWeb3] = useState(0);
  const [accounts, setAccounts] = useState();
  const [contract, setContract] = useState();

  // Submit a LexScript Template
  const [template, setTemplate] = useState();
  const [rate, setRate] = useState();
  const [lexAddress, setLexAddress] = useState();

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

  const fetchData = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TLDRContract.networks[networkId];
      const instance = new web3.eth.Contract(
        TLDRContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      setWeb3(web3);
      setAccounts(accounts);
      setContract(instance);
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  });

  const submitLS = async () => {
    await contract.methods
      .writeLexScript(template, rate, lexAddress)
      .send({ from: accounts[0], gas: 3000000 });
  };

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

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <div className="App">
      <Container>
        <Divider hidden />
        <Header size="huge" as="h1">
          🖋️ TLDR
        </Header>
        <Header as="h2">The lexDAO Registry</Header>

        <Segment>
          <Header as="h3">Submit a LexScript</Header>
          <Form>
            <Form.Field
              control={Input}
              placeholder="0x0000000000000000000000000000000000000000"
              label="Lex Address (who do the payments go to?)"
              value={lexAddress}
              onChange={e => setLexAddress(e.target.value)}
            />
            <Form.Field
              control={Input}
              placeholder="0"
              label="Lex Rate (1 = 0.01%)"
              value={rate}
              onChange={e => setRate(e.target.value)}
            />
            <Form.Field
              control={TextareaAutosize}
              label="Template Terms"
              value={template}
              onChange={e => setTemplate(e.target.value)}
              placeholder="Your Template Here..."
              useCacheForDOMMeasurements
            />
            <Button type="submit" onClick={submitLS}>
              Submit
            </Button>
          </Form>
        </Segment>
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
      </Container>
    </div>
  );
}
