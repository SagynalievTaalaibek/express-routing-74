import {Message} from "./types";
import {promises as fs} from "fs";

export const writeFile = (messageData: Message) => {
    const message = messageData.message;
    const fileName = `./messages/${messageData.date}.txt`;

    return fs.writeFile(fileName, JSON.stringify(message));
};