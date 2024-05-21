import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as fs from 'fs/promises';

dotenv.config();

// Type definition for question
type Difficulty = "easy" | "medium" | "hard";

type Question = {
    id: number;
    category: string;
    difficulty: Difficulty;
    question: string;
    options: Array<string>;
    answer: string;
    favourited: boolean; // This should be boolean instead of true
    timestamp: Date;
};

type Questions = Array<Question>;
type OuterQuestion = { questions: Questions }; // Adjusted to match the JSON structure

const app: Express = express();
const port = process.env.PORT || 3001;

async function loadData(): Promise<OuterQuestion> {
    const fileContent: string = await fs.readFile('data.json', 'utf8');
    return JSON.parse(fileContent);
}

let data: OuterQuestion;

loadData().then((loadedData) => {
    data = loadedData;

    const questionsArray: Questions = data.questions; // Corrected to data.questions
    console.log(questionsArray[0]);

    app.get('/', (req: Request, res: Response) => {
        res.json(data); // Use res.json to send data as a JSON object
    });

    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}).catch((err) => {
    console.error('Error loading data:', err);
});
