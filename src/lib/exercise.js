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
 * Shuffle an array using Fisher-Yates algorithm
 * @param {Array} array
 * @returns {Array} shuffled copy of the array
 */
function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generate a queue of 20 exercises with the following guarantees:
 * 1. No verb appears more than once in the batch
 * 2. All 6 pronouns are evenly distributed (each appears at least 3 times)
 * 3. No two consecutive exercises use verbs from the same conjugation group
 *
 * @returns {Array<{verb: object, pronoun: string, correctAnswer: string}>}
 */
export function generateExerciseQueue() {
  const QUEUE_SIZE = 20;
  const queue = [];

  // Create pronoun distribution: each pronoun appears at least 3 times
  // 6 pronouns * 3 = 18, plus 2 random ones = 20
  const pronounQueue = [];
  for (let i = 0; i < 3; i++) {
    pronounQueue.push(...pronouns);
  }
  // Add 2 more random pronouns to reach 20
  pronounQueue.push(pronouns[Math.floor(Math.random() * pronouns.length)]);
  pronounQueue.push(pronouns[Math.floor(Math.random() * pronouns.length)]);

  // Shuffle pronouns to randomize order
  const shuffledPronouns = shuffle(pronounQueue);

  // Group verbs by conjugation group, shuffle within each group,
  // then shuffle the group order itself for variety
  const verbsByGroup = new Map();
  verbs.forEach(v => {
    if (!verbsByGroup.has(v.group)) {
      verbsByGroup.set(v.group, []);
    }
    verbsByGroup.get(v.group).push(v);
  });
  const shuffledGroups = shuffle([...verbsByGroup.values()].map(group => shuffle(group)));

  // Interleave groups in round-robin so no two consecutive verbs share a group
  const interleavedVerbs = [];
  const maxGroupSize = Math.max(...shuffledGroups.map(g => g.length));
  for (let i = 0; i < maxGroupSize; i++) {
    for (const group of shuffledGroups) {
      if (i < group.length) {
        interleavedVerbs.push(group[i]);
      }
    }
  }

  // Generate exercises (limit to available verbs if fewer than QUEUE_SIZE)
  const exerciseCount = Math.min(QUEUE_SIZE, interleavedVerbs.length);
  for (let i = 0; i < exerciseCount; i++) {
    const verb = interleavedVerbs[i];
    const pronoun = shuffledPronouns[i];
    const correctAnswer = verb.forms[pronoun];
    queue.push({ verb, pronoun, correctAnswer });
  }

  return queue;
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
