import React, { useState, useEffect } from "react";
import { Button, Header, Form, Segment, Input } from "semantic-ui-react";
import TextareaAutosize from "react-textarea-autosize";

export default function Submit({ web3, accounts, contract }) {
  // Submit a LexScript Template
  const [template, setTemplate] = useState();
  const [rate, setRate] = useState();
  const [lexAddress, setLexAddress] = useState();

  const submitLS = async () => {
    await contract.methods
      .writeLexScript(template, rate, lexAddress)
      .send({ from: accounts[0], gas: 3000000 });
  };

  return (
    <>
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
          label="Lex Rate (100 = 1%)"
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
    </>
  );
}
