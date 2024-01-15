import { Router} from "express";
import {promises as fs} from "fs";
import {writeFile} from "../writeFile";
import {readFile} from "../readFile";
import {Message} from "../types";

const messagesRouter = Router();

messagesRouter.get('/', async (_, res) => {
    try {
        const files = await readFile();
        const messagesData: Message[] = [];
        if (files) {
            for (const fileName of files) {
                const fileContents = await fs.readFile(`./messages/${fileName}`);
                const date = new Date(fileName.slice(0, -4));

                const message: Message = {
                    message: fileContents.toString().slice(1, -1),
                    date: `Time: ${date.getHours().toString()}-${date.getMinutes().toString()}`,
                };
                messagesData.push(message);
            }

            res.send(messagesData);
        }
    } catch (e) {
        console.log(e);
    }
});
messagesRouter.post('/', (req, res) => {
    const date = new Date();
    const sendMessageDate  = date.toISOString();

    const message: Message = {
        message: req.body.message,
        date: sendMessageDate,
    }

    void writeFile(message);
    res.send('Post message = ' + message.message);
});


export default messagesRouter;