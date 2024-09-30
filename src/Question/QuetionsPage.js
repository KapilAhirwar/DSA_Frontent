import TopicName from "./TopicName";
import QuestionsContainer from "./QuestionContainer";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function Questions() {
    const [topicQues,setTopicQues] = useState();
    const [solvetopicQues,setSolveTopicQues] = useState();

    const location = useLocation();
    const {item} = location.state || {};

    // console.log("item",item);

    return (
        <div className="mt-[4rem]">
            <TopicName items={item} totalQ={topicQues} solveQ={solvetopicQues} />
            <QuestionsContainer items={item} totalQ={setTopicQues} solveQ={setSolveTopicQues}/>
        </div>
    );
}

export default Questions;