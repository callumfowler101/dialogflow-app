const dialogflow = require('@google-cloud/dialogflow');
const intentClient = new dialogflow.IntentsClient();

const createIntent = async ({id, client, displayName}) => {
    const agentPath = client.projectAgentPath(id);
    const intent = {
        displayName: displayName
    };
    
    const createIntentReq = {
        parent: agentPath,
        intent: intent
    };

    const [response] = await client.createIntent(createIntentReq);
    console.log(`Successfully created ${intent.displayName} intent.`);
}

const runApp = () => {
    const projectID = 'apitestagent-bmmn';
    const command = process.argv[2];
    const displayName = process.argv[3];
    
    if(command==="create-intent"){
        const intentConfig = {
            id: projectID,
            client: intentClient,
            displayName: displayName  
        }
        createIntent(intentConfig);
    } else {
        console.log(`Error ${command} is not a valid command`);
    }
}

runApp();


