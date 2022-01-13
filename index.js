const dialogflow = require('@google-cloud/dialogflow');
const fs = require('fs');
const intentClient = new dialogflow.IntentsClient();

const createIntent = async ({id, client, displayName, trainingPhrases}) => {
    const agentPath = client.projectAgentPath(id);

    if(trainingPhrases){
        const phrases = fs.readFile(trainingPhrases, 'utf-8',(err, data)=>{
            if(err) throw err;
            console.log(data);
        });
    }
    
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

    const file = process.argv[4] ? process.argv[4].toString() : undefined ;
    
    if(command==="create-intent"){
        const intentConfig = {
            id: projectID,
            client: intentClient,
            displayName: displayName,
            trainingPhrases: file  
        }
        createIntent(intentConfig);
    } else {
        console.log(`Error ${command} is not a valid command`);
    }
}

runApp();


