import questions from "../questions";

interface ProgressBarProps {
    answered: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ answered }) => {
    function generateBars() {
        return questions.map((_question: string, index: number) => {
            if (index < answered) {
                return <div className="bar filled" key={index}></div>;
            }
            if (index === answered) {
                return <div className="bar current" key={index}></div>;
            }
            return <div className="bar" key={index}></div>;
        });
    }

    return (
        <div className="progress-bar">
            {generateBars()}
        </div>
    );
};

export default ProgressBar;