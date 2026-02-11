import { describe, it, expect } from 'vitest';
import { verbs, pronouns } from './verbs.js';
import { generateExercise, checkAnswer } from './exercise.js';

describe('verbs data', () => {
  it('should have at least one verb per group', () => {
    const groups = [...new Set(verbs.map((v) => v.group))];
    expect(groups).toContain('-á');
    expect(groups).toContain('-í');
    expect(groups).toContain('-uje');
    expect(groups).toContain('-e');
  });

  it('each verb should have forms for all pronouns', () => {
    for (const verb of verbs) {
      for (const pronoun of pronouns) {
        expect(verb.forms[pronoun]).toBeDefined();
        expect(verb.forms[pronoun].length).toBeGreaterThan(0);
      }
    }
  });

  it('each verb should have an infinitive, group, and forms', () => {
    for (const verb of verbs) {
      expect(verb.infinitive).toBeTruthy();
      expect(verb.group).toBeTruthy();
      expect(Object.keys(verb.forms).length).toBe(pronouns.length);
    }
  });
});

describe('generateExercise', () => {
  it('should return an object with verb, pronoun, and correctAnswer', () => {
    const exercise = generateExercise();
    expect(exercise.verb).toBeDefined();
    expect(exercise.pronoun).toBeDefined();
    expect(exercise.correctAnswer).toBeDefined();
    expect(pronouns).toContain(exercise.pronoun);
    expect(verbs).toContain(exercise.verb);
    expect(exercise.correctAnswer).toBe(exercise.verb.forms[exercise.pronoun]);
  });

  it('should produce varying exercises (not always the same)', () => {
    const results = new Set();
    for (let i = 0; i < 50; i++) {
      const ex = generateExercise();
      results.add(`${ex.verb.infinitive}-${ex.pronoun}`);
    }
    expect(results.size).toBeGreaterThan(1);
  });
});

describe('checkAnswer', () => {
  it('should return true for exact match', () => {
    expect(checkAnswer('dělám', 'dělám')).toBe(true);
  });

  it('should be case-insensitive', () => {
    expect(checkAnswer('dělám', 'Dělám')).toBe(true);
    expect(checkAnswer('Dělám', 'dělám')).toBe(true);
  });

  it('should trim whitespace', () => {
    expect(checkAnswer('dělám', '  dělám  ')).toBe(true);
    expect(checkAnswer('  dělám', 'dělám  ')).toBe(true);
  });

  it('should return false for incorrect answers', () => {
    expect(checkAnswer('dělám', 'děláš')).toBe(false);
    expect(checkAnswer('dělám', '')).toBe(false);
    expect(checkAnswer('dělám', 'wrong')).toBe(false);
  });
});
