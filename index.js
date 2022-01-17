const dialogflow = require('@google-cloud/dialogflow');
const fs = require('fs');
const uuid = require('uuid');
const intentClient = new dialogflow.IntentsClient();

const createTrainingArray = (phrases) => {
    let phrasesArray;
    try {
        phrasesArray = fs.readFileSync(phrases, 'utf-8', data => data)
                            .toString()
                            .split(", ")
                            .map(e=>e.replace(/"/g, ''))
                            .map(data => {
                                return {
                                    "name" : uuid.v4(),
                                    "type" : 'EXAMPLE',
                                    "parts" : [{"text" : data}]
                                }
                            }   
                        );
    } catch(e) {
        return undefined;
    }
    return phrasesArray;
}

const createIntent = async ({id, client, displayName, trainingPhrases}) => {
    const agentPath = client.projectAgentPath(id);
    const phrases = createTrainingArray(trainingPhrases);

    const intent = {
        displayName: displayName,
        trainingPhrases: phrases
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


