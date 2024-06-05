interface StartScreenProps {
    setStarted: (started: boolean) => void
    setTimer: (timer: number) => void
}

const StartScreen: React.FC<StartScreenProps> = ({ setStarted, setTimer }) => {

    const handleStart = () => {
      setTimer(300)
      setStarted(true)
    }
    
    return (
        <div className="start-end-container">
            <div>You have five minutes to complete the quiz.</div>
            <div>Good luck!</div>
            <button 
                className="start-reset-button"
                onClick={handleStart}>
                Start quiz
            </button>
        </div>
    );
};

export default StartScreen;
