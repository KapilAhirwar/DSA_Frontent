import { useNavigate } from 'react-router-dom';
import './topicName.css';

function TopicName({items,totalQ,solveQ}) {
   
    const navigate = useNavigate();
    
    const percentage = totalQ > 0 ? (solveQ / totalQ) * 100 : 0;

    return (
        <div className="topicName">    
            <span className='topicNam'>{`${items.topic} Questions`}</span>
            <div className="ques">
                <div className="topicQuestion">Total : 
                    <p>{solveQ}</p>
                    <p>/</p>
                    <p>{totalQ}</p>
                </div>
                <div className="progressContainer">
                    <div className="Totalprogress" style={{ width: `${percentage}%` }}></div>
                </div>
            </div>
        </div>
    );
}

export default TopicName;