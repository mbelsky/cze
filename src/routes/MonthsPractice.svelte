<script>
  import { months } from '../lib/months.js';
  import { generateMonthsExerciseQueue, checkMonthsAnswer } from '../lib/months-exercise.js';

  let queue = $state([])
  let index = $state(0)
  let exercise = $state(null)
  let userAnswer = $state('')
  let feedback = $state(null)
  let showCorrect = $state('')

  function resetRoundState() {
    userAnswer = ''
    feedback = null
    showCorrect = ''
  }

  function startSession() {
    queue = generateMonthsExerciseQueue(months)
    index = 0
    exercise = queue[0]
    resetRoundState()
  }

  startSession()

  function handleSubmit(e) {
    e.preventDefault()
    if (!exercise) {
      return
    }

    const isCorrect = checkMonthsAnswer(exercise, userAnswer)

    if (isCorrect) {
      feedback = 'correct'
      showCorrect = ''
    } else {
      feedback = 'incorrect'
      showCorrect = exercise.correctAnswer
    }
  }

  function handleNext() {
    const nextIndex = index + 1
    if (nextIndex >= queue.length) {
      startSession()
      return
    }

    index = nextIndex
    exercise = queue[index]
    resetRoundState()
  }
</script>

<section>
  <h1>Czech Months Practice</h1>
  <p class="subtitle">Practice Czech month forms in context</p>

  {#if exercise}
  <div class="card">
    <form onsubmit={handleSubmit}>
      <label class="exercise-label" for="answer">
        <span class="prompt">{exercise.prompt}</span>
      </label>

      <div class="input-row">
        {#if exercise.inputType === 'mcq'}
          <fieldset class="options" disabled={feedback !== null}>
            {#each exercise.options as option}
              <label class="option-item">
                <input
                  type="radio"
                  name="mcq-answer"
                  value={option}
                  bind:group={userAnswer}
                  disabled={feedback !== null}
                />
                <span>{option}</span>
              </label>
            {/each}
          </fieldset>
        {:else}
        <input
          id="answer"
          type="text"
          bind:value={userAnswer}
          placeholder="Type the correct form…"
          autocomplete="off"
          disabled={feedback !== null}
        />
        {/if}
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
      <button class="next-btn" onclick={handleNext}>Continue →</button>
    {/if}
  </div>
  {/if}
</section>

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

  .prompt {
    font-weight: 600;
  }

  .input-row {
    display: flex;
    gap: 0.5em;
    flex-wrap: wrap;
    align-items: flex-start;
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

  .options {
    border: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 0.5em;
    width: 100%;
    text-align: left;
  }

  .option-item {
    display: flex;
    align-items: center;
    gap: 0.5em;
    padding: 0.6em 0.8em;
    border-radius: 8px;
    border: 2px solid #444;
    background: #181825;
    color: #cdd6f4;
  }

  .option-item input {
    width: auto;
    flex: 0 0 auto;
    margin: 0;
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

    .feedback.correct {
      background: #e6f4ea;
      color: #40a02b;
    }

    .feedback.incorrect {
      background: #fce4e4;
      color: #d20f39;
    }

    .option-item {
      background: #ffffff;
      border-color: #ccd0da;
      color: #4c4f69;
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