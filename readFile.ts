import {promises as fs} from "fs";

const path = './messages';

export const readFile = async () => {
    try {
        const files = await fs.readdir(path);
        return files.slice(-5);
    } catch (e) {
        console.log(e);
    }
}