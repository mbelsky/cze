import { months, ordinalGenitive } from "./months.js";

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const DAYS_IN_MONTH = {
  January: 31,
  February: 28,
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31,
};

function randomDay(month) {
  const maxDay = DAYS_IN_MONTH[month.english] ?? 31;
  return Math.floor(Math.random() * maxDay) + 1;
}

function buildNominativeOptions(currentMonth, allMonths) {
  const otherMonths = allMonths.filter(
    (m) => m.english !== currentMonth.english,
  );
  const distractors = shuffle(otherMonths)
    .slice(0, 2)
    .map((m) => m.nominative);
  return shuffle([currentMonth.nominative, ...distractors]);
}

function endingVariationCandidates(word) {
  if (word.length < 2) {
    return [`${word}e`, `${word}i`, `${word}u`];
  }

  const stem = word.slice(0, -1);
  const ending = word.slice(-1);

  if (ending === "u") {
    return [`${stem}e`, `${stem}i`, `${stem}a`];
  }
  if (ending === "i") {
    return [`${stem}u`, `${stem}e`, `${stem}a`];
  }
  if (ending === "í") {
    return [`${stem}u`, `${stem}e`, `${stem}i`];
  }

  return [`${stem}e`, `${stem}i`, `${stem}u`];
}

function buildLocativeOptions(currentMonth) {
  const correctAnswer = `v ${currentMonth.locative}`;
  const wrongVariants = endingVariationCandidates(currentMonth.locative)
    .map((form) => `v ${form}`)
    .filter((option) => option !== correctAnswer);

  const uniqueWrong = [...new Set(wrongVariants)];

  while (uniqueWrong.length < 2) {
    uniqueWrong.push(
      `v ${currentMonth.nominative}${uniqueWrong.length === 0 ? "e" : "i"}`,
    );
  }

  const options = shuffle([correctAnswer, uniqueWrong[0], uniqueWrong[1]]);
  return { correctAnswer, options };
}

function createMonthTasks(month, allMonths) {
  const nominativeOptions = buildNominativeOptions(month, allMonths);
  const { correctAnswer: locativeCorrect, options: locativeOptions } =
    buildLocativeOptions(month);
  const day = randomDay(month);

  return [
    {
      type: "nominative-mcq",
      inputType: "mcq",
      month,
      prompt: month.english,
      options: nominativeOptions,
      correctAnswer: month.nominative,
    },
    {
      type: "locative-mcq",
      inputType: "mcq",
      month,
      prompt: `In ${month.english}`,
      options: locativeOptions,
      correctAnswer: locativeCorrect,
    },
    {
      type: "typed-date",
      inputType: "typed",
      month,
      day,
      prompt: `${capitalize(month.nominative)} ${day}`,
      correctAnswer: `${ordinalGenitive[day]} ${month.genitive}`,
    },
  ];
}

export function generateMonthsExerciseQueue(sourceMonths = months) {
  const monthBlocks = sourceMonths.map((month) =>
    createMonthTasks(month, sourceMonths),
  );
  const shuffledBlocks = shuffle(monthBlocks);
  return shuffledBlocks.flat();
}

export function checkMonthsAnswer(exercise, userAnswer) {
  if (exercise.inputType === "mcq") {
    return userAnswer === exercise.correctAnswer;
  }

  if (exercise.inputType === "typed") {
    return (
      exercise.correctAnswer.toLowerCase().trim() ===
      userAnswer.toLowerCase().trim()
    );
  }

  return false;
}
