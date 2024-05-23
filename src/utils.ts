import { stringify } from "querystring";
import { Questions, Question } from "./index";
import * as fs from "fs/promises";

type FilterTypes =
  | "difficulty"
  | "category"
  | "favourited"
  | "question"
  | "options"
  | "answer";
type Favourited = true | false;

function filterByDifficulty(questionsArr: Questions, difficulty: string) {
  return questionsArr.filter((question) => question.difficulty === difficulty);
}

function filterByCategory(questionsArr: Questions, category: string) {
  return questionsArr.filter((question) => question.category === category);
}

function filterByFavourited(questionsArr: Questions, Favourited: boolean) {
  return questionsArr.filter((question) => question.favourited === Favourited);
}

export function createUniqueRandomSet(n: number, indexn: number): Set<number> {
  const valueSet = new Set<number>();
  while (valueSet.size < n) {
    valueSet.add(Math.floor(Math.random() * indexn));
  }
  return valueSet;
}

export function determineFilter(
  questionsArr: Questions,
  filter: FilterTypes,
  whatToFilterBy: string | Favourited
) {
  if (filter === "difficulty") {
    if (typeof whatToFilterBy === "string") {
      return filterByDifficulty(questionsArr, whatToFilterBy);
    } else {
      throw new Error("Expected a string for difficulty filter");
    }
  } else if (filter === "category") {
    if (typeof whatToFilterBy === "string") {
      return filterByCategory(questionsArr, whatToFilterBy);
    } else {
      throw new Error("Expected a string for category filter");
    }
  } else if (filter === "favourited") {
    if (typeof whatToFilterBy === "boolean") {
      return filterByFavourited(questionsArr, whatToFilterBy);
    } else {
      throw new Error("Expected a boolean for favourited filter");
    }
  }
}

export function editQuestion(questionsArr: Questions, question: Question) {
  const questionId = parseInt(question.id as unknown as string, 10);

  let questionToEditIndex = questionsArr.findIndex(
    (ques) => ques.id === questionId
  );
  questionsArr[questionToEditIndex] = question;

  const jsonFormatQuestions = { questions: questionsArr };
  const jsonFormatted = JSON.stringify(jsonFormatQuestions, null, " ");
  fs.writeFile("data.json", jsonFormatted);
}

export function deleteQuestion(questionsArr: Questions, id: number) {
  let removedQuestionArr = questionsArr.filter(
    (question) => question.id !== id
  );
  let jsonFormatQuestions = { questions: removedQuestionArr };
  let jsonFormatted = JSON.stringify(jsonFormatQuestions, null, " ");
  fs.writeFile("data.json", jsonFormatted);
}
