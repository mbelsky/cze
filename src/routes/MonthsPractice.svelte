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
  .prompt {
    font-weight: 600;
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

  @media (prefers-color-scheme: light) {
    .option-item {
      background: #ffffff;
      border-color: #ccd0da;
      color: #4c4f69;
    }
  }
</style>