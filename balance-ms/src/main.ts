import { bootstrap } from "./bootstrap";
import { kafka, kafkaGroupId } from "./infrastructure/kafka/config";
import { KafkaConsumer } from "./infrastructure/kafka/consumer";
import BalanceRepository from "./infrastructure/repository/sequelize/balance.repository";
import { setupDb } from "./infrastructure/repository/sequelize/setup";
import { listen } from "./infrastructure/web/server";
import { BalanceEventHandler } from "./internal/events/handler/balance.handler";
import UpdateBalanceUseCase from "./internal/usecase/update/update_balance";


(async () => {
    console.log("loading .env")
    bootstrap();
    
    console.log("setting up database")
    await setupDb();

    console.log("setting up kafka consumer")
    await setupKafkaConsumer();

    console.log("starting webserver")
    listen();
})();

async function setupKafkaConsumer() {
    const consumer = kafka.consumer({
        groupId: kafkaGroupId
    });

    const updateBalanceUseCase = new UpdateBalanceUseCase(new BalanceRepository());
    const updateBalanceHandler = new BalanceEventHandler(updateBalanceUseCase);

    const kafkaConsumer = new KafkaConsumer({
        consumer,
        topics: ['balances'],
        handler: updateBalanceHandler
    });

    try {
        console.log("connecting to kafka")
        await kafkaConsumer.connect();
    } catch (error) {
        console.error;
        await kafkaConsumer.disconnect();
    }
}
