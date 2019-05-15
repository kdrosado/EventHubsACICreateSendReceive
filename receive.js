const { EventHubClient, delay } = require("@azure/event-hubs");

// Define connection string and related Event Hubs entity name here
const connectionString = "";
const eventHubsName = "";

async function main() {
  const client = EventHubClient.createFromConnectionString(connectionString, eventHubsName);
  const allPartitionIds = await client.getPartitionIds();
  const firstPartitionId = allPartitionIds[0];

  const receiveHandler = client.receive(firstPartitionId, eventData => {
    console.log(`Received message: ${eventData.body} from partition ${firstPartitionId}`);
  }, error => {
    console.log('Error when receiving message: ', error)
  });

  // Sleep for a while before stopping the receive operation.
  await delay(15000);
  await receiveHandler.stop();

  await client.close();
}

// display error message
main().catch(err => {
  console.log("Error occurred: ", err);
});
