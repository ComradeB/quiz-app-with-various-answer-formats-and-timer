interface EndScreenProps {
  setAnswers: (answers: string[]) => void,
  setAnswered: (answered: number) => void,
  setStarted: (started: boolean) => void,
}

const EndScreen: React.FC<EndScreenProps> = ({ setAnswers, setAnswered, setStarted }) => {
    
  function handleReset() {
      setAnswers([])
      setAnswered(0)
      setStarted(false)
  }
  
  return(
      <div className="start-end-container">
          <div>You've reached the end of the quiz.</div>
          <div>You'll be notified of your result within two weeks by email.</div>
          <button 
              className="start-reset-button" 
              onClick={handleReset}>
              Reset quiz
          </button>
      </div>
  )
}

export default EndScreen