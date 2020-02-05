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
import ERC20 from "../contracts/ERC20.json";

export default function Pay({ web3, accounts, contract }) {
  const [clientDRs, setClientDRs] = useState();
  const [providerDRs, setProviderDRs] = useState();
  const [activeKey, setActiveKey] = useState();
  const [clientSelected, setClientSelected] = useState(true);
  const [mappedArray, setMappedArray] = useState(clientDRs);

  const [activeDR, setactiveDR] = useState();
  const [drSelected, setDRSelected] = useState(false);
  const [drTokenContract, setDRTokenContract] = useState();
  const [timeLeft, setTimeLeft] = useState();
  const [loading, setLoading] = useState(false);
  const [disputeLoading, setDisputeLoading] = useState(false)

  const getDR = async () => {
    const numDR = await contract.methods.RDR().call();
    const DRPromise = [...Array(parseInt(numDR)).keys()].map(index =>
      contract.methods.rdr(index + 1).call({ from: accounts[0], gas: 300000 })
    );

    const DRs = await Promise.all(DRPromise);
    // const DRWithTokenPromise = DRs.map(dr => {
    //   const tokenInstance = getTokenContract();
    //   const tokenName = tokenInstance.symbol();
    //   return { ...dr, tokenName };
    // });

    // const DRWithToken = await Promise.all(DRWithTokenPromise);
    const myClientDRs = DRs.filter(dr => accounts[0] === dr.client);
    const myProviderDRs = DRs.filter(dr => accounts[0] === dr.provider);

    setClientDRs(myClientDRs);
    setProviderDRs(myProviderDRs);
  };

  const getTokenContract = async () => {
    const erc20Instance = await new web3.eth.Contract(
      ERC20.abi,
      activeDR.drToken
    );

    return erc20Instance;
  };

  const setActive = (dr, i) => {
    setactiveDR(dr);
    console.log(dr);
    const timeLeft =
      (dr.retainerTermination - Date.now() / 1000) / (86400).toFixed(2);
    setTimeLeft(timeLeft);
    setDRSelected(true);
    setActiveKey(i);
  };

  const makePayment = async () => {
    console.log("calling make payment");
    const res = await contract.methods
      .payDR(activeDR.drNumber)
      .send({ from: accounts[0], gas: 300000 });
    console.log(res);
  };

  const withdraw = async () => {
    setLoading(true);
    const res = await contract.methods
      .withdrawRemainder(activeDR.drNumber)
      .send({ from: accounts[0], gas: 300000 });

    setLoading(false);
    console.log(res);
  };

  const dispute = async () => {
    setDisputeLoading(true);
    const res = await contract.methods
      .disputeDR(activeDR.drNumber)
      .send({ from: accounts[0], gas: 300000 });

    setDisputeLoading(false);
    console.log(res);
  };

  const confirmDR = async () => {
    setLoading(true);
    const tokenInstance = await getTokenContract();
    await tokenInstance.methods
      .approve(contract._address, activeDR.payCap)
      .send({ from: accounts[0], gas: 300000 });

    const res = await contract.methods
      .confirmDR(activeDR.drNumber)
      .send({ from: accounts[0], gas: 300000 });

    setLoading(false);
    console.log(res);
  };

  const renderClient = () => {
    if (clientSelected && drSelected && activeDR.confirmed && timeLeft > 0) {
      return (
        <Form>
          <Form.Field>
            <label>Payment being made to</label>
            <input value={activeDR.provider} disabled={true} />
          </Form.Field>
          <Form.Field>
            <label>Deliverable Payment (in DAI)</label>
            <input
              value={web3.utils.fromWei(activeDR.deliverableRate)}
              disabled={true}
            />
          </Form.Field>
          <Button type="submit" onClick={() => makePayment()}>
            Submit
          </Button>
          <Button
            color = "red"
            loading={disputeLoading}
            disabled={activeDR.disputed}
            type="submit"
            onClick={() => dispute()}
          >
            {activeDR.disputed ? "Disputed" : "Dispute"}
          </Button>
        </Form>
      );
    }

    if (clientSelected && drSelected && activeDR.confirmed && timeLeft <= 0) {
      return (
        <Form>
          <Message>
            The retainer has ended, withdraw your remaining{" "}
            <b>
              {web3.utils.fromWei((activeDR.payCap - activeDR.paid).toString())}
            </b>{" "}
            DAI
          </Message>
          <Button loading={loading} type="submit" onClick={() => withdraw()}>
            Confirm
          </Button>
        </Form>
      );
    }

    if (clientSelected && drSelected && !activeDR.confirmed) {
      return (
        <Form>
          <Message>
            You are about to transfer{" "}
            <b>{web3.utils.fromWei(activeDR.payCap)}</b> DAI into escrow at the
            smart contract address{" "}
            <b>0x8CEDe32BbbCe5854992e151Fe215f2887E522553</b> for entering into
            a Digital Retainer with <b>{activeDR.provider}</b>. Do you wish to
            confirm?
          </Message>
          <Button loading={loading} type="submit" onClick={() => confirmDR()}>
            Confirm
          </Button>
        </Form>
      );
    }
  };

  useEffect(() => {
    getDR();
  }, []);

  return (
    <>
      <Grid>
        <Grid.Column width={8}>
          <Header as="h3">Your Digital Retainers</Header>
          <Button.Group>
            <Button
              onClick={() => {
                setClientSelected(true);
                setDRSelected(false);
              }}
              active={clientSelected}
            >
              Client
            </Button>
            <Button
              onClick={() => {
                setClientSelected(false);
                setDRSelected(false);
              }}
              active={!clientSelected}
            >
              Provider
            </Button>
          </Button.Group>
          <Table basic="very" celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={4}>DR #</Table.HeaderCell>
                <Table.HeaderCell width={12}>Deliverable</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {clientSelected &&
                clientDRs &&
                clientDRs.map((dr, i) => (
                  <Table.Row
                    style={activeKey === i ? { fontWeight: "bold" } : null}
                    key={i}
                  >
                    <Table.Cell>
                      <span
                        className="fake-link"
                        onClick={() => setActive(dr, i)}
                      >
                        {dr.drNumber}
                      </span>
                    </Table.Cell>
                    <Table.Cell>{dr.deliverable}</Table.Cell>
                  </Table.Row>
                ))}

              {!clientSelected &&
                providerDRs &&
                providerDRs.map((dr, i) => (
                  <Table.Row
                    style={activeKey === i ? { fontWeight: "bold" } : null}
                    key={i}
                  >
                    <Table.Cell>
                      <span
                        className="fake-link"
                        onClick={() => setActive(dr, i)}
                      >
                        {dr.drNumber}
                      </span>
                    </Table.Cell>
                    <Table.Cell>{dr.deliverable}</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column width={6}>
          <Header as="h3">Manage Digital Retainer</Header>

          {renderClient()}

          {!clientSelected && drSelected && (
            <Form>
              <Message>
                <b>{activeDR.client}</b> has so far paid{" "}
                <b>{web3.utils.fromWei(activeDR.paid)}</b> DAI of the total{" "}
                <b>{web3.utils.fromWei(activeDR.payCap)}</b> DAI cap. There are{" "}
                <b>{timeLeft.toFixed(2)}</b> days left in the retainer
              </Message>

              <Button
            color = "red"
            loading={disputeLoading}
            disabled={activeDR.disputed}
            type="submit"
            onClick={() => dispute()}
          >
            {activeDR.disputed ? "Disputed" : "Dispute"}
          </Button>
            </Form>
          )}
        </Grid.Column>
      </Grid>
    </>
  );
}
