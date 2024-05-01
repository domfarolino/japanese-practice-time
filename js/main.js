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
const kMonthDurationTranslations = {
  1: 'いっ',
  2: 'に',
  3: 'さん',
  4: 'よん',
  5: 'ご',
  6: 'ろっか',
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

function generateNewPrompt() {
  const promptIndex = randomIndex(kPromptTypes.length);
  const chosenPrompt = kPromptTypes[promptIndex];
  console.log('Chosen prompt:', chosenPrompt);
  promptTitle.innerText = chosenPrompt;
  answerPanel.style.backgroundColor = kPromptColors[promptIndex];

  switch (chosenPrompt) {
    case 'Time of day': {
      // Every so often, we'll generate a completely random "atypical" minute.
      const shouldGenerateAtypicalMinute = randomIndex(8) === 2;
      window.prompt = {
        hour: randomIndex(12) + 1,
        minute: shouldGenerateAtypicalMinute ?
            randomIndex(10) :
            kMinutes[randomIndex(kMinutes.length)],
        period: randomIndex(2) ? 'AM' : 'PM',
        toString() {
          return `${this.hour}:${formatAsMinute(this.minute)} ${this.period}`;
        },
        correctAnswers() {
          const returnAnswers = [];
          const hourTranslation = kHourTranslation[this.hour];

          // Minute translations are kinda tricky...
          let minuteTranslation = null;
          if (this.minute < 10) {
            // For minutes '00'-'09', we just pluck their direct translation
            // out.
            minuteTranslation = kMinuteTranslations[this.minute];
          } else if (this.minute % 10 === 0) {
            // For any minute that's a multiple of 10, we combine the direct
            // translations of:
            //   1. The first digit (not in minutes), IF > 1.
            //   2. 10 minutes.

            // Remember, if (1) above (i.e., the leading digit of minutes) is
            // "1", don't explicitly translate it; instead just skip straight
            // to (2) above.
            //
            // Example: we don't want to translate things like "13" to
            // "いちじゅう[...]". It should just be "じゅう[...]".
            let theFirstDigit = Math.floor(this.minute / 10);
            let theFirstDigitTranslation =
                theFirstDigit === 1 ?
                    '' :
                    kNumberTranslations[Math.floor(this.minute / 10)];

            minuteTranslation =
                theFirstDigitTranslation +
                kMinuteTranslations[10];
          } else {
            // For all other more complicated minutes, we combine the direct
            // translations of:
            //   1. The first digit (not in minutes), IF > 1.
            //   2. The literal number 10.
            //   3. The last digit (in minutes).

            // This block is identical to the code in the previous condition.
            // See documentation up there.
            let theFirstDigit = Math.floor(this.minute / 10);
            let theFirstDigitTranslation =
                theFirstDigit === 1 ?
                    '' :
                    kNumberTranslations[Math.floor(this.minute / 10)];

            minuteTranslation =
                theFirstDigitTranslation +
                kNumberTranslations[10] +
                kMinuteTranslations[this.minute % 10];
          }
          const periodTranslation = this.period === 'AM' ? 'ごぜん' : 'ごご';

          returnAnswers.push(`${periodTranslation}${hourTranslation}${minuteTranslation}`);
          if (this.minute === '30') {
            returnAnswers.push(`${periodTranslation}${hourTranslation}はん`);
          }

          return returnAnswers;
        }
      };
      break;
    }
    case 'Date': {
      const month = randomIndex(12) + 1;
      const day = randomIndex(kDaysPerMonth[month]) + 1;
      window.prompt = {
        toString() {
          // https://stackoverflow.com/a/13627586.
          function ordinalSuffix(i) {
            let j = i % 10, k = i % 100;
            if (j === 1 && k !== 11) return i + "st";
            if (j === 2 && k !== 12) return i + "nd";
            if (j === 3 && k !== 13) return i + "rd";
            return i + "th";
          }
          // The `Date()` constructor takes a month *index* (not the number of
          // the month), so we have to subtract from our *actual* month here).
          const date = new Date(/*placeholder=*/2024, month - 1, day);
          const monthString = date.toLocaleString('default', {month: 'long'});
          return `${monthString} ${ordinalSuffix(day)}`;
        },
        correctAnswers() {
          return [`${kMonthTranslations[month]}${kDayTranslations[day]}`];
        }
      };
      break;
    }
    case 'Duration' : {
      // We have a few options for generation a random duration:
      //   1. Number of minutes
      //   2. Number of hours
      //   3. Number of days
      //   4. Number of weeks
      //   5. Number of months
      //   6. Number of years

      // Note that for every quantity of time that has a standard range R (i.e.,
      // 60 for minutes, 12 for months), we set the effective range size to be
      // R-1.
      //
      // That way `randomIndex()` will generate values in the range [0-(R-2)].
      // Then we exclude all 0 values, by unconditionally adding 1, which gives
      // us values in the final range [1-(R-1)], which is what we want. That is,
      // we don't want 0, and we don't want the max quantity, because i.e., 60
      // for minutes isn't useful, it's just 1 hour. 59 is the last useful
      // minute number by this app's definition.
      const kDurationOptions = [
        // ['minutes', 59],
        // ['hours', 23],
        // Days don't have a standard valid quantity; I'm choosing 14
        // arbitrarily.
        // ['days', 14],
        // ['weeks', 51],
        ['months', 11],
        // ['years', 30] // Same with years.
      ];

      const durationIndex = randomIndex(kDurationOptions.length);
      const durationType = kDurationOptions[durationIndex][0];
      const durationRange = kDurationOptions[durationIndex][1];
      console.assert(durationRange > 0);

      // This will be [1-12] for months, [1-60] for minutes, [1-24] for hours, etc.
      // To ensure that we never produce `0`, always add `1`.
      const boundedDurationOfType = randomIndex(durationRange) + 1;

      window.prompt = {
        toString() {
          return `${boundedDurationOfType} ${durationType}`;
        },
        correctAnswers() {
          let correctAnswer = null;
          switch (durationType) {
            case 'minutes':
            case 'hours':
            case 'days':
            case 'weeks':
              correctAnswer = 'Not implemented';
              break;
            case 'months': {
              correctAnswer = `${kMonthDurationTranslations[boundedDurationOfType]}かげつ`;
              break;
            }
            case 'years':
              correctAnswer = 'Not implemented';
          }

          return [correctAnswer];
        }
      };
      break;
    }
    default:
      window.prompt = {};
      console.info('Not implemented yet');
  }

  promptValue.innerText = window.prompt;
  debugAnswers.innerText = window.prompt.correctAnswers();
}

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
  if (!window.prompt.correctAnswers().includes(answer)) {
    console.warn('Incorrect');

    // https://stackoverflow.com/a/58353279.
    ime.classList.remove('wrong');
    void ime.offsetWidth;
    ime.classList.add('wrong');

    currentStreakContainer.classList.remove('wrong');
    void currentStreakContainer.offsetWidth;
    currentStreakContainer.classList.add('wrong');

    currentStreak.innerText = 0;

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
