import generateNewPrompt from './prompt.mjs';

// ⚠️  Note that this file is in seriously dire shape. ⚠️
//
// It is mostly ugly code that is not well-organized into classes or anything
// yet, because I wanted to ship an initial version of this ASAP. Cleaning it up
// will be great, but until then, beware!

// Example code from https://confetti.js.org/more.html.
function fireConfetti() {
  function fire(particleRatio, opts) {
    const defaults = {
      origin: { y: 1.0 },
      decay: 0.93,
    };
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(200* particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

function toggleDebugPanel() {
  debugPanel.style.display = debugPanel.style.display === 'none' ? '' : 'none';
}

// Debug mode handler.
answerPanel.ondblclick = e => toggleDebugPanel();
sosEmoji.onclick = e => {
  window.debugPanelOpenDueToSOSEmoji = true;
  debugPanel.style.display = '';
};

const kPromptTypes = [
  'Time of day',
  'Date',
  'Duration',
  // 'Frequency',
];

const kPromptColors = [
  '#00AAFF',
  '#7A374F',
  '#D56E01',
  // '#00AF57',
  // '#A8B900',
];

function formatAsMinute(minute) {
  if (minute < 10) {
    return '0'.concat(minute);
  }
  return String(minute);
}

// '0' will be formated as '00', by `formatAsMinute()` before display.
const kMinutes = ['0', '10', '15', '30', '45'];

const kHourTranslation = {
  1: 'いちじ',
  2: 'にじ',
  3: 'さんじ',
  // Remember, in "hour" form "4" is pronounced "よ", not "よん".
  4: 'よじ',
  5: 'ごじ',
  6: 'ろくじ',
  7: 'しちじ',
  8: 'はちじ',
  9: 'くじ',
  10: 'じゅうじ',
  11: 'じゅういちじ',
  12: 'じゅうにじ',
};

// This and the associated conversion logic is following the rules specified
// by these resources:
//  - https://www.busuu.com/en/japanese/time
//  - https://www.japanesepod101.com/blog/2020/07/31/telling-time-in-japanese/
//  - https://thejapanesepage.com/tell_time_in_japanese/
const kMinuteTranslations = {
  0: '',
  1: 'いっぷん',
  2: 'にふん',
  3: 'さんぷん',
  4: 'よんふん',
  5: 'ごふん',
  6: 'ろっぷん',
  7: 'ななふん',
  8: 'はっぷん',
  9: 'きゅうふん',
  10: 'じゅっぷん',
};

const kNumberTranslations = {
  // As of now we just need as many of these as we have hours in a 12 hour
  // clock. That might change as this app expands though.
  1: 'いち',
  2: 'に',
  3: 'さん',
  4: 'よん',
  5: 'ご',
  6: 'ろく',
  7: 'しち',
  8: 'はち',
  9: 'く',
  10: 'じゅう',
  11: 'じゅういち',
  12: 'じゅうに',
};

const kMonthTranslations = {
  1: 'いちがつ',
  2: 'にがつ',
  3: 'さんがつ',
  4: 'しがつ',
  5: 'ごがつ',
  6: 'ろくがつ',
  7: 'しちがつ',
  8: 'はちがつ',
  9: 'くがつ',
  10: 'じゅうがつ',
  11: 'じゅういちがつ',
  12: 'じゅうにがつ',
};

// See
// https://www.tofugu.com/japanese/japanese-counter-tsuki-gatsu-getsu/#how-to-use-the-japanese-counter---1.
const kMonthDurationTranslationPrefixes = {
  1: 'いっ',
  2: 'に',
  3: 'さん',
  4: 'よん',
  5: 'ご',
  6: 'ろっ',
  7: 'なな',
  8: 'はち',
  9: 'きゅう',
  10: 'じゅっ',
  11: 'じゅういっ',
  12: 'じゅうに',
};

const kDaysPerMonth = {
  1: 31,
  2: 29,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
}

// Populated from https://www.sljfaq.org/afaq/month-days.html.
const kDayTranslations = {
  1: 'ついたち',
  2: 'ふつか',
  3: 'みっか',
  4: 'よっか',
  5: 'いつか',
  6: 'むいか',
  7: 'なのか',
  8: 'ようか',
  9: 'ここのか',
  10: 'とおか',
  11: 'じゅういちにち',
  12: 'じゅうににち',
  13: 'じゅうさんにち',
  14: 'じゅうよっか',
  15: 'じゅうごにち',
  16: 'じゅうろくにち',
  17: 'じゅうしちにち',
  18: 'じゅうはちにち',
  19: 'じゅうくにち',
  20: 'はつか',
  21: 'にじゅういちにち',
  22: 'にじゅうににち',
  23: 'にじゅうさんにち',
  24: 'にじゅうよっか',
  25: 'にじゅうごにち',
  26: 'にじゅうろくにち',
  27: 'にじゅうしちにち',
  28: 'にじゅうはちにち',
  29: 'にじゅうくにち',
  30: 'さんじゅうにち',
  31: 'さんじゅういちにち',
};

function randomIndex(length) {
  return Math.floor((Math.random() * length));
}

// Start the app with a new prompt for the user.
generateNewPrompt();

window.onload = e => {
  wanakana.bind(ime);
};

ime.addEventListener('keyup', e => {
  // On 'enter'.
  if (e.keyCode !== 13) {
    return;
  }

  e.preventDefault();

  // Check answer.
  const answer = ime.value;

  // Some answers are wrong but do not reset the current streak, because they
  // are an immaterial mistake. For an answer to reset the streak, it must be:
  //   1. Non-empty.
  const wrongAnswerCountsAsReset = (answer !== '') &&
  //   2. Valid kana.
      wanakana.isKana(answer);
  // When wrong (always), any answer that fails these conditions is handled in a
  // more relaxed way.

  if (!window.prompt.correctAnswers().includes(answer)) {
    console.warn('Incorrect');

    // https://stackoverflow.com/a/58353279.
    ime.classList.remove('wrong');
    void ime.offsetWidth;
    ime.classList.add('wrong');

    if (wrongAnswerCountsAsReset) {
      currentStreakContainer.classList.remove('wrong');
      void currentStreakContainer.offsetWidth;
      currentStreakContainer.classList.add('wrong');

      currentStreak.innerText = 0;
    }

    sosEmoji.style.display = '';
    return;
  }

  // Hide the SOS emoji, but also close the debug panel IFF it was open as a
  // result of clicking the SOS emoji. (If it was open as a result of double
  // clicking the answer panel, then leave it open).
  sosEmoji.style.display = 'none';
  if (window.debugPanelOpenDueToSOSEmoji) {
    window.debugPanelOpenDueToSOSEmoji = false;
    debugPanel.style.display = 'none';
  }

  // The placeholder text is kind of annoying. Once the user gets rolling, get
  // rid of it.
  ime.placeholder = '';

  if (Number(currentStreak.innerText) < Number(maxStreak.innerText)) {
    window.fireConfettiOnNextMaxStreak = true;
  }

  currentStreak.innerText++;
  if (Number(currentStreak.innerText) > Number(maxStreak.innerText)) {
    maxStreak.innerText++;
    // Only fire confetti if you surpassed a non-zero `maxStreak`.
    if (window.fireConfettiOnNextMaxStreak) {
      fireConfetti();
      window.fireConfettiOnNextMaxStreak = false;
    }
  }

  console.log('Correct!');
  ime.value = '';
  generateNewPrompt();
});

fastForwardTarget.onclick = generateNewPrompt;
fireConfettiTarget.onclick = fireConfetti;
