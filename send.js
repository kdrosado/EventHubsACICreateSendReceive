const { EventHubClient } = require("@azure/event-hubs");

// Define connection string and the name of the Event Hub
const connectionString = "";
const eventHubsName = "";

async function main() {
  const client = EventHubClient.createFromConnectionString(connectionString, eventHubsName);
  
  // loop thru events being sent
  for (let i = 0; i < 100; i++) {
    const eventData = {body: `Event ${i}`};
    console.log(`Sending message: ${eventData.body}`);
    await client.send(eventData);
  }

  await client.close();
}

// display error message
main().catch(err => {
  console.log("Error occurred: ", err);
});
