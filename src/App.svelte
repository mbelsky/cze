<script>
  import { generateExerciseQueue, checkAnswer } from './lib/exercise.js'

  const groupColorClass = {
    '-á': 'group-a',
    '-í': 'group-i',
    '-uj': 'group-uj',
    '-e': 'group-e',
  }

  let exerciseQueue = $state(generateExerciseQueue())
  let currentIndex = $state(0)
  let exercise = $state(exerciseQueue[currentIndex])
  let userAnswer = $state('')
  let feedback = $state(null) // null | 'correct' | 'incorrect'
  let showCorrect = $state('')

  function handleSubmit(e) {
    e.preventDefault()
    if (checkAnswer(exercise.correctAnswer, userAnswer)) {
      feedback = 'correct'
      showCorrect = ''
    } else {
      feedback = 'incorrect'
      showCorrect = exercise.correctAnswer
    }
  }

  function handleNext() {
    currentIndex++
    
    // If we've exhausted the queue, generate a new one
    if (currentIndex >= exerciseQueue.length) {
      exerciseQueue = generateExerciseQueue()
      currentIndex = 0
    }
    
    exercise = exerciseQueue[currentIndex]
    userAnswer = ''
    feedback = null
    showCorrect = ''
  }
</script>

<main>
  <h1>Czech Verb Practice</h1>
  <p class="subtitle">Practice conjugating Czech verbs</p>

  <div class="card">
    <form onsubmit={handleSubmit}>
      <label class="exercise-label" for="answer">
        <span class="pronoun">({exercise.pronoun})</span>
        <span class="infinitive {groupColorClass[exercise.verb.group]}">{exercise.verb.infinitive}</span>
      </label>

      <div class="input-row">
        <input
          id="answer"
          type="text"
          bind:value={userAnswer}
          placeholder="Type the correct form…"
          autocomplete="off"
          disabled={feedback !== null}
        />
        {#if feedback === null}
          <button type="submit" disabled={userAnswer.trim() === ''}>Check</button>
        {/if}
      </div>
    </form>

    {#if feedback === 'correct'}
      <div class="feedback correct">✅ Correct!</div>
    {/if}
    {#if feedback === 'incorrect'}
      <div class="feedback incorrect">
        ❌ Incorrect — the correct answer is <strong>{showCorrect}</strong>
      </div>
    {/if}

    {#if feedback !== null}
      <button class="next-btn" onclick={handleNext}>Next exercise →</button>
    {/if}
  </div>
</main>

<style>
  .subtitle {
    color: #888;
    margin-top: -0.5em;
    margin-bottom: 1.5em;
  }

  .card {
    background: #1e1e2e;
    border-radius: 12px;
    padding: var(--spacing-md);
    max-width: 480px;
    margin: 0 auto;
  }

  @media (min-width: 768px) {
    .card {
      padding: var(--spacing-lg);
    }
  }

  .exercise-label {
    display: block;
    font-size: var(--font-size-label-mobile);
    margin-bottom: 0.8em;
  }

  @media (min-width: 768px) {
    .exercise-label {
      font-size: var(--font-size-label-desktop);
    }
  }

  .pronoun {
    color: #89b4fa;
    font-weight: 600;
  }

  .infinitive {
    font-style: italic;
    margin-left: 0.3em;
  }

  /* Verb group colour coding — dark theme (default) */
  /* -á group: red  (#f38ba8 on #1e1e2e ≈ 6.4:1) */
  .group-a  { color: #f38ba8; }
  /* -í group: green  (#a6e3a1 on #1e1e2e ≈ 9.8:1) */
  .group-i  { color: #a6e3a1; }
  /* -uj group: blue  (#89b4fa on #1e1e2e ≈ 7.0:1) */
  .group-uj { color: #89b4fa; }
  /* -e group: yellow  (#f9e2af on #1e1e2e ≈ 11.4:1) */
  .group-e  { color: #f9e2af; }

  .input-row {
    display: flex;
    gap: 0.5em;
    flex-wrap: wrap;
  }

  @media (min-width: 480px) {
    .input-row {
      flex-wrap: nowrap;
    }
  }

  input {
    flex: 1;
    padding: 0.6em 0.8em;
    font-size: var(--font-size-input-mobile);
    border-radius: 8px;
    border: 2px solid #444;
    background: #181825;
    color: #cdd6f4;
    font-family: inherit;
    outline: none;
    transition: border-color 0.2s;
    min-width: 0;
    width: 100%;
  }

  @media (min-width: 480px) {
    input {
      width: auto;
    }
  }

  @media (min-width: 768px) {
    input {
      font-size: var(--font-size-input-desktop);
    }
  }

  input:focus {
    border-color: #89b4fa;
  }

  input:disabled {
    opacity: 0.6;
  }

  .feedback {
    margin-top: 1em;
    padding: 0.7em 1em;
    border-radius: 8px;
    font-size: 1.05em;
  }

  .feedback.correct {
    background: #1e3a2f;
    color: #a6e3a1;
  }

  .feedback.incorrect {
    background: #3a1e1e;
    color: #f38ba8;
  }

  .next-btn {
    margin-top: 1em;
    width: 100%;
    padding: 0.7em;
    font-size: 1em;
    background: #89b4fa;
    color: #1e1e2e;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
  }

  .next-btn:hover {
    background: #74c7ec;
  }

  @media (prefers-color-scheme: light) {
    .card {
      background: #eff1f5;
    }

    input {
      background: #ffffff;
      border-color: #ccd0da;
      color: #4c4f69;
    }

    input:focus {
      border-color: #1e66f5;
    }

    .pronoun {
      color: #1e66f5;
    }

    /* Verb group colour coding — light theme */
    /* -á group: red  (#d20f39 on #eff1f5 ≈ 4.7:1) */
    .group-a  { color: #d20f39; }
    /* -í group: green  (#166534 on #eff1f5 ≈ 6.3:1) */
    .group-i  { color: #166534; }
    /* -uj group: blue  (#1d4ed8 on #eff1f5 ≈ 6.0:1) */
    .group-uj { color: #1d4ed8; }
    /* -e group: amber  (#92400e on #eff1f5 ≈ 5.8:1) */
    .group-e  { color: #92400e; }

    .feedback.correct {
      background: #e6f4ea;
      color: #40a02b;
    }

    .feedback.incorrect {
      background: #fce4e4;
      color: #d20f39;
    }

    .next-btn {
      background: #1e66f5;
      color: #ffffff;
    }

    .next-btn:hover {
      background: #2a7bff;
    }
  }
</style>
