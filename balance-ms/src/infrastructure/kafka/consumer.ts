import { Consumer, EachMessagePayload } from "kafkajs";
import { SimpleConsumer } from "./consumer.interface";
import { EventHandler } from "../../internal/events/handler/balance.handler";

type KafkaConsumerProps = {
    consumer: Consumer,
    topics: string[],
    handler: EventHandler,
}

export class KafkaConsumer implements SimpleConsumer {
    private readonly _consumer: Consumer;
    private readonly _topics: string[];
    private readonly _handler: EventHandler

    constructor({consumer, topics, handler}: KafkaConsumerProps) {
        this._consumer = consumer;
        this._topics = topics;
        this._handler = handler;
    }

    async connect(): Promise<void> {
        await this._consumer.connect();

        await this._consumer.subscribe({topics: this._topics})

        await this._consumer.run({eachMessage: payload => this.handle(payload)})
    }

    async handle({message}: EachMessagePayload): Promise<void> {
        console.log("message received with payload", message.value.toString());
        const data = JSON.parse(message.value.toString());
        await this._handler.handle(data);
    }

    async disconnect(): Promise<void> {
        await this._consumer.disconnect();
    }

}

