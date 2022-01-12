const dialogflow = require('@google-cloud/dialogflow');
const intentClient = new dialogflow.IntentsClient();

const projectID = 'apitestagent-bmmn';
const intentConfig = {
    id: projectID,
    client: intentClient,
    displayName: "thankYou_intent"
}

const createIntent = async ({id, client, displayName}) => {
    const agentPath = client.projectAgentPath(id);
    const intent = {
        displayName: displayName
    }
    const createIntentReq = {
        parent: agentPath,
        intent: intent
    }

    const [response] = await client.createIntent(createIntentReq);
}


createIntent(intentConfig);