import React, { useState, useEffect } from "react";
import {
  Button,
  Divider,
  Header,
  Container,
  Form,
  Segment
} from "semantic-ui-react";
import TextareaAutosize from "react-textarea-autosize";
import TLDRContract from "./contracts/TLDR.json";
import getWeb3 from "./utils/getWeb3";
import "./App.css";

export default function App() {
  const [web3, setWeb3] = useState(0);
  const [accounts, setAccounts] = useState();
  const [contract, setContract] = useState();

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
      setWeb3(web3)
      setAccounts(accounts);
      setContract(instance);
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData()
  });

  const submitLS = async () => {
    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
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
        <Header as="h3">The lexDAO Registry</Header>

        <Segment>
          <Form>
            <Form.Field>
              <label>Lex Address (who do the payments go to?)</label>
              <input placeholder="0x0000000000000000000000000000000000000000" />
            </Form.Field>
            <Form.Field>
              <label>Lex Rate (1 = 0.01%)</label>
              <input placeholder="0" />
            </Form.Field>
            <Form.Field
              control={TextareaAutosize}
              label="Template Terms"
              placeholder="Your Template Here..."
              useCacheForDOMMeasurements
            />
            <Button type="submit">Submit</Button>
          </Form>
        </Segment>
      </Container>
    </div>
  );
}
