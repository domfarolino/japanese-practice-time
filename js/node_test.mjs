import fs from 'node:fs';
import {generateTimePrompt, generateDatePrompt, generateDurationPrompt} from './prompt.mjs';

const kOutputFilename = 'all-test-output.txt';

function generateAllTimes() {
  const prompts = [];

  const periods = ['AM', 'PM'];
  for (let periodIdx = 0; periodIdx < periods.length; ++periodIdx) {
    const period = periods[periodIdx];

    for (let hour = 1; hour <= 12; ++hour) {
      for (let minute = 0; minute <= 59; ++minute) {
        const prompt = generateTimePrompt({hour, minute, period});
        prompts.push(prompt.toString(), prompt.correctAnswers().join(', '));
      }
    }
  }

  return prompts.join('\n');
}

function generateAllDates() {
  const prompts = [];

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
  };

  for (const month of Object.keys(kDaysPerMonth)) {
    for (let day = 1; day <= kDaysPerMonth[month]; ++day) {
      const prompt = generateDatePrompt(month, day);
      prompts.push(prompt.toString(), prompt.correctAnswers().join(', '));
    }
  }
  return prompts.join('\n');
}

function generateAllDurations() {
  const prompts = [];
  // Minutes

  // Hours

  // Days

  // Weeks

  // Months
  for (let month = 1; month < 12; ++month) {
    const prompt = generateDurationPrompt(/*boundedDurationOfType=*/month, 'months');
    prompts.push(prompt.toString(), prompt.correctAnswers().join(', '));
  }

  // Years

  return prompts.join('\n');
}

// Actually exhaustively generate all of the possible prompts and their answers,
// and write them to the output file.

fs.writeFileSync(kOutputFilename, '<TIMES>\n');
fs.appendFileSync(kOutputFilename, generateAllTimes());

fs.appendFileSync(kOutputFilename, '\n\n<DATES>\n');
fs.appendFileSync(kOutputFilename, generateAllDates());

fs.appendFileSync(kOutputFilename, '\n\n<DURATIONS>\n');
fs.appendFileSync(kOutputFilename, generateAllDurations());

console.log('DONE');
