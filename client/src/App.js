import React, { Component } from "react";
import {
  Button,
  Divider,
  Header,
  Container,
  Form,
  Segment
} from "semantic-ui-react";
import TextareaAutosize from "react-textarea-autosize";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <Container>
          <Divider hidden />
          <Header as="h1">🖋️ TLDR</Header>
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
}

export default App;
