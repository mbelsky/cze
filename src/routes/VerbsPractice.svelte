<script>
  import { loadVerbs } from '../lib/verbs.js';
  import { generateExerciseQueue, checkAnswer } from '../lib/exercise.js';

  const groupColorClass = {
    '-á': 'group-a',
    '-í': 'group-i',
    '-uj': 'group-uj',
    '-e': 'group-e',
  }

  let verbs = $state(null)
  let pronouns = $state(null)
  let queue = $state([])
  let index = $state(0)
  let exercise = $state(null)
  let userAnswer = $state('')
  let feedback = $state(null)
  let showCorrect = $state('')
  let loadError = $state(null)

  function resetRoundState() {
    userAnswer = ''
    feedback = null
    showCorrect = ''
  }

  function startSession() {
    if (!verbs || !pronouns) {
      exercise = null
      return
    }

    queue = generateExerciseQueue(verbs, pronouns)
    index = 0
    exercise = queue[0]
    resetRoundState()
  }

  loadVerbs().then(data => {
    verbs = data.verbs
    pronouns = data.pronouns
    startSession()
  }).catch(() => {
    loadError = 'Could not load the verb dictionary. Please check your network connection and try again.'
  })

  function handleSubmit(e) {
    e.preventDefault()
    if (!exercise) {
      return
    }

    const isCorrect = checkAnswer(exercise.correctAnswer, userAnswer)

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
  <h1>Czech Verb Practice</h1>
  <p class="subtitle">Practice conjugating Czech verbs</p>

  {#if exercise}
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
      <button class="next-btn" onclick={handleNext}>Continue →</button>
    {/if}
  </div>
  {:else if loadError}
  <p class="error">{loadError}</p>
  {:else}
  <p class="loading">Loading verbs…</p>
  {/if}
</section>

<style>
  .loading {
    color: #888;
    text-align: center;
  }

  .error {
    color: #f38ba8;
    text-align: center;
  }

  .pronoun {
    color: #89b4fa;
    font-weight: 600;
  }

  .infinitive {
    font-style: italic;
    margin-left: 0.3em;
  }

  .group-a  { color: #f38ba8; }
  .group-i  { color: #a6e3a1; }
  .group-uj { color: #89b4fa; }
  .group-e  { color: #f9e2af; }

  @media (prefers-color-scheme: light) {
    .pronoun {
      color: #1e66f5;
    }

    .group-a  { color: #d20f39; }
    .group-i  { color: #166534; }
    .group-uj { color: #1d4ed8; }
    .group-e  { color: #92400e; }
  }
</style>