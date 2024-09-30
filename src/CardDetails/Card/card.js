import { useNavigate } from 'react-router-dom';
import './card.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Card({ data }) {
    // console.log("data -> ",data);
    
    let solvedQues = 0;
    data.questions.forEach(element => {
       if (element.status === 'Complete') {
        solvedQues++;
       }
    });

    const total = data.questions.length;
    const percentage = total > 0 ? (solvedQues / total) * 100 : 0;

    const navigate = useNavigate();
    const handler = () => {
        navigate('/Questions', { state: { item: data } });
    }

    return (
        <div className="card" onClick={handler}>
            <div className="card1">
                <div className="name">{data.topic}</div>
            </div>
            <div className="card2">
                <div className="progress">
                <div className="circularProgress">
                        <div className="tooltip">
                            {Math.round(percentage)}%
                        </div>
                        <CircularProgressbar 
                            value={percentage} 
                            styles={buildStyles({
                                textColor: "#000",
                                pathColor: "#3e68c7",
                                trailColor: "#d1r6d9",
                            })}
                        />
                        <div className="questionNumbers">
                            {solvedQues}/{total}
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Card;
