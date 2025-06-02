import { BatchGetItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
    region: import.meta.env.VITE_AWS_REGION,
    credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESSKEYID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRETACCESSKEY
    }
});

const formatItem = (item) => {
    return {
        memeName: item.PK.S,
        animalColor: item.animalColor.SS,
        animalType: item.animalType.S,
        memeYear: item.memeYear.N
    };
}

export const getItemsFromDynamoDB = async ( items ) => {
    //map array of items to the format required by DynamoDB
    const keys = items.map(item => ({
        PK: { S: item }
    }));
    const input = {
        RequestItems: {
            [import.meta.env.VITE_AWS_TABLE_NAME]: {
                Keys: keys
            }
        }
    };
    const command = new BatchGetItemCommand(input);
    const response = await client.send(command);
    const formattedResponse = response.Responses[import.meta.env.VITE_AWS_TABLE_NAME].map(formatItem);
    return formattedResponse;
};
