import './head.css';
import { useAppContext } from '../UseContext/context';

function Head() {
    const { totalQuestions, solvedTotalQuestions } = useAppContext();
    const percentage = totalQuestions > 0 ? (solvedTotalQuestions / totalQuestions) * 100 : 0;


    return (
        <div className="head">
            {/* <h1 className="dsa"> DSA Tracker </h1> */}
            <div>
                <div className="cot">" Let's Do it "</div>
                <div className="cot">" Improve And polish Your Skills "</div>
            </div>
            <div className="total">
                <div className="totalQuestions">
                    <p>Total : </p>
                    <p>{solvedTotalQuestions}</p>
                    <p>/</p>
                    <p>{totalQuestions}</p>
                </div>
                <div className="progressContainer">
                    <div className="Totalprogress" style={{ width: `${percentage}%` }}></div>
                </div>
            </div>
        </div>
    );
}

export default Head;
