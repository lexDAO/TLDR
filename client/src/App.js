import React, { useState, useEffect } from "react";
import {
  Divider,
  Header,
  Container,
  Tab,
  Button,
  Item,
  Label
} from "semantic-ui-react";
import TLDRContract from "./contracts/TLDR.json";
import getWeb3 from "@drizzle-utils/get-web3";
import "./App.css";
import Submit from "./components/Submit";
import Register from "./components/Register";
import Pay from "./components/Pay";
import Dispute from "./components/Dispute";

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
    document.body.style.backgroundImage =
      "linear-gradient(180deg, hsla(0, 0%, 100%, 0) 60%, #fff),linear-gradient(70deg, #dbedff 32%, #ebfff0)";
    fetchData();
  }, []);

  const panes = [
    {
      menuItem: "Register DR",
      render: () => (
        <Tab.Pane
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(150, 249, 222, 0.1), rgba(219, 237, 255, 0.3))"
          }}
        >
          <Register web3={web3} accounts={accounts} contract={contract} />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Manage DR",
      render: () => (
        <Tab.Pane
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(150, 249, 222, 0.1), rgba(219, 237, 255, 0.3))"
          }}
        >
          <Pay web3={web3} accounts={accounts} contract={contract} />
        </Tab.Pane>
      )
    }
    // {
    //   menuItem: "Dispute DR",
    //   render: () => (
    //     <Tab.Pane
    //     style={{
    //       backgroundImage:
    //         "linear-gradient(to right, rgba(150, 249, 222, 0.1), rgba(219, 237, 255, 0.3))"
    //     }}
    //     >
    //       <Dispute web3={web3} accounts={accounts} contract={contract} />
    //     </Tab.Pane>
    //   )
    // }
  ];

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <div className="App">
      <Container>
        <Divider hidden />
        <Header as="h1" color="grey" size="huge">
          🖋️ TLDR
        </Header>
        <Header as="h2" color="grey">
          The lexDAO Registry
        </Header>
        <Tab
          menu={{ tabular: true }}
          panes={panes}
          style={{ paddingTop: "25px" }}
        />
        <Label style={{ background: "none", paddingTop: "15px" }} as="a" href="http://13.59.183.200:3000/home" target="_blank">
          <Button color="google plus" size="large" circular icon="rocketchat" />
          <span style={{ fontSize: "1.5em" }}>Join the conversation</span>
        </Label>
      </Container>
    </div>
  );
}
