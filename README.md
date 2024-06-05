# A simple quiz app as a React + TypeScript demo

## Answer formats
1. Multple choice (single answer)
2. Multiple choice (multiple answers)
3. Short text input
4. Long text input

The quiz can be expanded dynamically by simply adding new questions to questions.ts.

Unfinished quizzes are saved to LocalStorage and open to the current question upon refreshing the page. 

A score is not provided at the end as the answers are meant to be evaluated by a human upon completion.ric

## Improvement ideas for future iterations
- Force the user to select the number of answers the questions asks for before proceeding (e.g. "Select two planets" --> cannot submit answer unless exactly two choices have been selected).
