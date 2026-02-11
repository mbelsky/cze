import { verbs, pronouns } from './verbs.js';

/**
 * Generate a random exercise by picking a random verb and pronoun.
 * @returns {{ verb: object, pronoun: string, correctAnswer: string }}
 */
export function generateExercise() {
  const verb = verbs[Math.floor(Math.random() * verbs.length)];
  const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
  const correctAnswer = verb.forms[pronoun];

  return { verb, pronoun, correctAnswer };
}

/**
 * Check the user's answer against the correct form.
 * Comparison is case-insensitive and trims whitespace.
 * @param {string} correctAnswer
 * @param {string} userAnswer
 * @returns {boolean}
 */
export function checkAnswer(correctAnswer, userAnswer) {
  return correctAnswer.toLowerCase().trim() === userAnswer.toLowerCase().trim();
}
