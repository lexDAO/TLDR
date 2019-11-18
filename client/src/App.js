import React, { useState, useEffect } from "react";
import {
  Button,
  Divider,
  Header,
  Container,
  Form,
  Segment,
  Input,
  Message,
  Tab
} from "semantic-ui-react";
import TLDRContract from "./contracts/TLDR.json";
import getWeb3 from "./utils/getWeb3";
import "./App.css";
import Submit from "./components/Submit"
import Register from "./components/Register"

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

        <Submit web3={web3} accounts={accounts} contract={contract}/>
        <Register web3={web3} accounts={accounts} contract={contract}/>
      </Container>
    </div>
  );
}
