import React, { useState, useEffect } from "react";
import { APIClient, Openlaw } from "openlaw";
import {
  Container,
  Loader,
  Button,
  Message,
  Progress
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "openlaw-elements/dist/openlaw-elements.min.css";
import AgreementPreview from "./AgreementPreview";
import OpenLawForm from "openlaw-elements";

export default function Dispute() {
  const [apiClient, setapiClient] = useState();
  const [state, setState] = useState({
    // Variables for OpenLaw API
    openLawConfig: null,
    templateName: null,

    // State variables for OpenLaw
    title: "",
    template: "",
    compiledTemplate: null,
    parameters: {},
    executionResult: null,
    variables: null,
    loading: false,
    success: false,
    previewHTML: null
  });

  const openLawConfig = {
    server: process.env.REACT_APP_URL,
    templateName: process.env.REACT_APP_TEMPLATE_NAME,
    userName: process.env.REACT_APP_OPENLAW_USER,
    password: process.env.REACT_APP_OPENLAW_PASSWORD
  };

  const instantiateOLClient = async () => {
    const newapiClient = new APIClient("https://lib.openlaw.io/api/v1/default");
    newapiClient.login(openLawConfig.userName, openLawConfig.password);

    //Retrieve your OpenLaw template by name, use async/await
    const template = await newapiClient.getTemplate(openLawConfig.templateName);

    //pull properties off of JSON and make into variables
    const title = template.title;

    //Retreive the OpenLaw Template, including MarkDown
    const content = template.content;

    const compiledTemplate = await Openlaw.compileTemplate(content);
    if (compiledTemplate.isError) {
      throw "template error" + compiledTemplate.errorMessage;
    }

    const parameters = {};
    const { executionResult, errorMessage } = await Openlaw.execute(
      compiledTemplate.compiledTemplate,
      {},
      parameters
    );

    const variables = await Openlaw.getExecutedVariables(executionResult, {});

    setapiClient(newapiClient);
    setState({
      ...state,
      openLawConfig,
      title,
      template,
      compiledTemplate,
      parameters,
      executionResult,
      variables
    });
  };

  useEffect(() => {}, [state.loading]);

  useEffect(() => {
    instantiateOLClient();
  }, []);

  const buildOpenLawParamsObj = async (template, creatorId) => {


    const object = {
      templateId: template.id,
      title: template.title,
      text: template.content,
      creator: "Ross Campbell",
      parameters: state.parameters,
      overriddenParagraphs: {},
      agreements: {},
      readonlyEmails: [],
      editEmails: [],
      draftId: ""
    };
    return object;
  };

  const onSubmit = async () => {
    try {
      //login to api
      setState({ ...state, loading: true });
      apiClient.login(openLawConfig.userName, openLawConfig.password);
      console.log("apiClient logged in");

      //add Open Law params to be uploaded
      const uploadParams = await buildOpenLawParamsObj(
        state.template,
        state.creatorId
      );
      console.log("parmeters from user..", uploadParams.parameters);
      console.log("all parameters uploading...", uploadParams);

      //uploadDraft, sends a draft contract to "Draft Management", which can be edited.
      const draftId = await apiClient.uploadDraft(uploadParams);
      console.log("draft id..", draftId);

      const contractParams = {
        ...uploadParams,
        draftId
      };
      console.log(contractParams);

      const contractId = await apiClient.uploadContract(contractParams);
      console.log(contractId);

      await apiClient.sendContract([], [], contractId);

      await setState({ ...state, loading: false, success: true, draftId });
      document.getElementById("success").scrollIntoView({
        behavior: "smooth"
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setTemplatePreview = async () => {
    const executionResult = await Openlaw.execute(
      state.compiledTemplate.compiledTemplate,
      {},
      state.parameters
    );
    const agreements = await Openlaw.getAgreements(
      executionResult.executionResult
    );
    const previewHTML = await Openlaw.renderForReview(
      agreements[0].agreement,
      {}
    );
    await setState({ ...state, previewHTML });
    document.getElementById("preview").scrollIntoView({
      behavior: "smooth"
    });
  };

  const onChange = (key, value) => {
    const parameters = key
      ? {
          ...state.parameters,
          [key]: [key].includes("Email")
            ? JSON.stringify({ email: value })
            : value
        }
      : state.parameters;

    const { executionResult, errorMessage } = Openlaw.execute(
      state.compiledTemplate.compiledTemplate,
      {},
      parameters
    );
    const variables = Openlaw.getExecutedVariables(executionResult, {});
    setState({ ...state, parameters, variables, executionResult });
  };

  if (!state.executionResult) return <Loader active />;
  return (
    <div className="App">
      <Container>
        <OpenLawForm
          apiClient={apiClient}
          executionResult={state.executionResult}
          parameters={state.parameters}
          onChangeFunction={onChange}
          openLaw={Openlaw}
          variables={state.variables}
        />
        <div className="button-group">
          <Button onClick={setTemplatePreview}>Preview</Button>
          <Button primary loading={state.loading} onClick={onSubmit}>
            Submit
          </Button>
        </div>

        <Message
          style={state.success ? { display: "block" } : { display: "none" }}
          className="success-message"
          positive
          id="success"
        >
          <Message.Header>Submission Successful</Message.Header>
          <p>
            Check your <b>e-mail</b> to sign contract
          </p>
        </Message>
        <AgreementPreview id="preview" previewHTML={state.previewHTML} />
      </Container>
    </div>
  );
}
