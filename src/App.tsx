import { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import CurrentQuestion from './components/CurrentQuestion';
import EndScreen from './components/EndScreen';
import questions from './questions';

interface Answer {
  questionId: number;
  answer: string | string[];
}

export default function App() {
  const [started, setStarted] = useState<boolean>(() => JSON.parse(localStorage.getItem('started') || 'false'));
  const [answered, setAnswered] = useState<number>(() => JSON.parse(localStorage.getItem('answered') || '0'));
  const [answers, setAnswers] = useState<Answer[]>(() => JSON.parse(localStorage.getItem('answers') || '[]'));
  const [timer, setTimer] = useState<number>(() => JSON.parse(localStorage.getItem('timer') || '300'));

  useEffect(() => {
    localStorage.setItem('started', JSON.stringify(started));
    localStorage.setItem('answered', JSON.stringify(answered));
    localStorage.setItem('answers', JSON.stringify(answers));
    localStorage.setItem('timer', JSON.stringify(timer));
  }, [started, answered, answers, timer]);

  if (!started && answered === 0) {
    return <StartScreen 
      setStarted={setStarted}
      setTimer={setTimer}
      />;
  }

  if (answered === questions.length || timer === 0) {
    return (
      <EndScreen
        setAnswers={setAnswers}
        setAnswered={setAnswered}
        setStarted={setStarted}
      />
    );
  }

  if (started && answered < questions.length) {
    return (
      <CurrentQuestion
        answers={answers}
        setAnswers={setAnswers}
        answered={answered}
        setAnswered={setAnswered}
        timer={timer}
        setTimer={setTimer}
      />
    );
  }

  return null;
}