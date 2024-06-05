import questions from '../questions';
import ProgressBar from './ProgressBar';
import { useState, useEffect } from 'react';

interface CurrentQuestionProps {
  answers: Answer[];
  setAnswers: (answers: Answer[]) => void;
  answered: number;
  setAnswered: (answered: number) => void;
  timer: number;
  setTimer: (timer: number) => void;
}

interface Answer {
  questionId: number;
  answer: string | string[];
}

const CurrentQuestion: React.FC<CurrentQuestionProps> = ({
  answers,
  setAnswers,
  answered,
  setAnswered,
  timer,
  setTimer,
}) => {
  const [currentAnswer, setCurrentAnswer] = useState<string | string[]>('');

  useEffect(() => {
    const savedCurrentAnswer = localStorage.getItem(`currentAnswer_${answered}`);
    if (savedCurrentAnswer !== null) {
      setCurrentAnswer(JSON.parse(savedCurrentAnswer));
    }
  }, [answered]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [setTimer]);

  useEffect(() => {
    localStorage.setItem(`currentAnswer_${answered}`, JSON.stringify(currentAnswer));
  }, [currentAnswer, answered]);

  const minutes = Math.floor(timer / 60);
  const seconds = (timer % 60).toString().padStart(2, '0');

  function handleAnswered(e: React.FormEvent) {
    e.preventDefault();
    setAnswered(answered + 1);
    setAnswers([...answers, { questionId: answered, answer: currentAnswer }]);
    setCurrentAnswer('');
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { value, checked } = e.target as HTMLInputElement;
    if (questions[answered].questionType === 'multi') {
      if (checked) {
        setCurrentAnswer(prevAnswer => [...prevAnswer, value])
      } else {
        setCurrentAnswer(prevAnswer => prevAnswer.filter((choice: string) => choice !== value))
      }
    } else {
      setCurrentAnswer(value);
    }
  }

  function displayAnswerFormat() {
    if (questions[answered].questionType === 'single') {
      return questions[answered].choices.map((choice: string, index: number) => (
        <label key={index} className={currentAnswer === choice ? 'checked' : ''}>
          <input
            type="radio"
            name="question"
            value={choice}
            onChange={handleChange}
            checked={currentAnswer === choice}
          />
          {choice}
        </label>
      ));
    }
    if (questions[answered].questionType === 'multi') {
      return questions[answered].choices.map((choice: string, index: number) => (
        <label key={index} className={currentAnswer.includes(choice) ? 'checked' : ''}>
          <input
            type="checkbox"
            name="question"
            value={choice}
            onChange={handleChange}
            checked={(currentAnswer as string[]).includes(choice)}
          />
          {choice}
        </label>
      ));
    }
    if (questions[answered].questionType === 'short') {
      return (
        <>
          <textarea
            name="question"
            className="short-answer"
            value={currentAnswer as string}
            maxLength={50}
            onChange={handleChange}
          />
          <div className="char-count">
            {currentAnswer.length} / 50 characters
          </div>
          {currentAnswer.length === 50 && (
            <div className="warning">Character limit reached!</div>
          )}
        </>
      );
    }
    if (questions[answered].questionType === 'long') {
      return (
        <>
          <textarea
            name="question"
            className="long-answer"
            value={currentAnswer as string}
            maxLength={200}
            onChange={handleChange}
          />
          <div className="char-count">
            {currentAnswer.length} / 200 characters
          </div>
          {currentAnswer.length === 200 && (
            <div className="warning">Character limit reached!</div>
          )}
        </>
      );
    }
  }

  return (
    <>
      <h2>
        Question {answered + 1} of {questions.length}{' '}
        <span className="timer">
          {minutes}:{seconds}
        </span>
      </h2>
      <ProgressBar answered={answered} />
      <h3>{questions[answered].question}</h3>
      <form className="choices" onSubmit={handleAnswered}>
        {displayAnswerFormat()}
        <button className="submit-button" type="submit">Submit</button>
      </form>
    </>
  );
}

export default CurrentQuestion;
