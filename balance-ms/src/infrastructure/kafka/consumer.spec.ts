import { Consumer } from "kafkajs";
import { KafkaConsumer } from "./consumer";

const mockHandler = () => {
    return {
        handle: jest.fn()
    }
};

const mockConsumer: Partial<Consumer> = {
    connect: jest.fn(),
    subscribe: jest.fn(),
    run: jest.fn(),
    disconnect: jest.fn(),
}

const getTopics = () => (["topic"])

describe("Kakfa consumer unit test", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should consume message from topic", async () => {
        const handler = mockHandler();
        const topics = getTopics();

        const handleSpy = jest.spyOn(handler, "handle");
        const connectSpy = jest.spyOn(mockConsumer, 'connect');
        const subscribeSpy = jest.spyOn(mockConsumer, 'subscribe');
        const runSpy = jest.spyOn(mockConsumer, 'run').mockImplementation(async (config) => {
            const eachMessageHandler = config.eachMessage as (payload: any) => Promise<void>;
            await eachMessageHandler({ message: 'Test message' });
          })

        const kafkaConsumer = new KafkaConsumer({
            consumer: mockConsumer as Consumer,
            topics,
            handler
        });

        await kafkaConsumer.connect();

        expect(handleSpy).toHaveBeenCalled();
        expect(connectSpy).toHaveBeenCalled();
        expect(subscribeSpy).toHaveBeenCalled();
        expect(runSpy).toHaveBeenCalled();
    });

    it("should disconnect", async () => {
        const handler = mockHandler();
        const topics = getTopics();

        const disconnectSpy = jest.spyOn(mockConsumer, "disconnect");

        const kafkaConsumer = new KafkaConsumer({
            consumer: mockConsumer as Consumer,
            topics,
            handler
        });

        await kafkaConsumer.disconnect();

        expect(disconnectSpy).toHaveBeenCalled();
    })
});