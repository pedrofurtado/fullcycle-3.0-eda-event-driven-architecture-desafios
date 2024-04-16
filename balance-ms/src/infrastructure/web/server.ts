import { app } from "./express";

const port: number = Number(process.env.PORT) || 3003;

export function listen() {
    app.listen(port, () => {
        console.log(`server is listening on port ${port}`);
    });
}