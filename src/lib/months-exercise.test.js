import { describe, it, expect } from "vitest";
import { months } from "./months.js";
import {
  generateMonthsExerciseQueue,
  checkMonthsAnswer,
  DAYS_IN_MONTH,
} from "./months-exercise.js";

describe("generateMonthsExerciseQueue", () => {
  it("generates exactly 36 tasks", () => {
    const queue = generateMonthsExerciseQueue();
    expect(queue).toHaveLength(36);
  });

  it("includes all 12 months", () => {
    const queue = generateMonthsExerciseQueue();
    const monthNames = new Set(queue.map((task) => task.month.english));
    expect(monthNames.size).toBe(12);
    months.forEach((month) => {
      expect(monthNames.has(month.english)).toBe(true);
    });
  });

  it("has one task of each type per month", () => {
    const queue = generateMonthsExerciseQueue();

    const taskTypesByMonth = new Map();
    queue.forEach((task) => {
      const monthName = task.month.english;
      if (!taskTypesByMonth.has(monthName)) {
        taskTypesByMonth.set(monthName, []);
      }
      taskTypesByMonth.get(monthName).push(task.type);
    });

    months.forEach((month) => {
      const types = taskTypesByMonth.get(month.english);
      expect(types).toHaveLength(3);
      expect(types).toContain("nominative-mcq");
      expect(types).toContain("locative-mcq");
      expect(types).toContain("typed-date");
    });
  });

  it("keeps month tasks in fixed 1->2->3 order inside each block", () => {
    const queue = generateMonthsExerciseQueue();

    for (let i = 0; i < queue.length; i += 3) {
      expect(queue[i].type).toBe("nominative-mcq");
      expect(queue[i + 1].type).toBe("locative-mcq");
      expect(queue[i + 2].type).toBe("typed-date");
      expect(queue[i].month.english).toBe(queue[i + 1].month.english);
      expect(queue[i + 1].month.english).toBe(queue[i + 2].month.english);
    }
  });

  it("nominative and locative MCQ tasks each have 3 options with one correct option", () => {
    const queue = generateMonthsExerciseQueue();

    queue
      .filter(
        (task) =>
          task.type === "nominative-mcq" || task.type === "locative-mcq",
      )
      .forEach((task) => {
        expect(task.options).toHaveLength(3);
        const optionSet = new Set(task.options);
        expect(optionSet.size).toBe(3);
        const correctCount = task.options.filter(
          (option) => option === task.correctAnswer,
        ).length;
        expect(correctCount).toBe(1);
      });
  });

  it("locative MCQ uses 2 incorrect ending-variation distractors", () => {
    const queue = generateMonthsExerciseQueue();

    queue
      .filter((task) => task.type === "locative-mcq")
      .forEach((task) => {
        const wrongOptions = task.options.filter(
          (option) => option !== task.correctAnswer,
        );
        expect(wrongOptions).toHaveLength(2);

        const correctWord = task.correctAnswer.slice(2);
        const stem = correctWord.slice(0, -1);

        wrongOptions.forEach((option) => {
          expect(option.startsWith("v ")).toBe(true);
          const optionWord = option.slice(2);
          expect(optionWord).not.toBe(correctWord);
          expect(optionWord.startsWith(stem)).toBe(true);
        });
      });
  });

  it("typed-date tasks use a day within the valid range for each month", () => {
    const queue = generateMonthsExerciseQueue();

    queue
      .filter((task) => task.type === "typed-date")
      .forEach((task) => {
        const maxDay = DAYS_IN_MONTH[task.month.english];
        expect(task.day).toBeGreaterThanOrEqual(1);
        expect(task.day).toBeLessThanOrEqual(maxDay);
      });
  });
});

describe("checkMonthsAnswer", () => {
  it("validates MCQ by exact selected option match", () => {
    const exercise = {
      inputType: "mcq",
      correctAnswer: "v listopadu",
    };

    expect(checkMonthsAnswer(exercise, "v listopadu")).toBe(true);
    expect(checkMonthsAnswer(exercise, "v Listopadu")).toBe(false);
    expect(checkMonthsAnswer(exercise, "v listopadě")).toBe(false);
  });

  it("typed answer passes exact answer with proper diacritics", () => {
    const exercise = {
      inputType: "typed",
      correctAnswer: "sedmého ledna",
    };

    expect(checkMonthsAnswer(exercise, "sedmého ledna")).toBe(true);
  });

  it("typed answer fails missing diacritics equivalent", () => {
    const exercise = {
      inputType: "typed",
      correctAnswer: "sedmého ledna",
    };

    expect(checkMonthsAnswer(exercise, "sedmeho ledna")).toBe(false);
  });

  it("typed answer passes with surrounding whitespace and case differences", () => {
    const exercise = {
      inputType: "typed",
      correctAnswer: "sedmého ledna",
    };

    expect(checkMonthsAnswer(exercise, "  Sedmého Ledna  ")).toBe(true);
  });
});
