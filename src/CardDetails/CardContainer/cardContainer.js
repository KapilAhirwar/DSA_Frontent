import Card from "../Card/card";
import './cardContainer.css';
import { Oval } from "react-loader-spinner";
import { useAppContext } from "../../UseContext/context";

function CardContainer() {

    const { totalQuestion, topic, loader} = useAppContext();
    // console.log("new total -> ",totalQuestion)
    // console.log("topic -> ",topic);

    return(
        <div className="container">
            {   
                loader ? (
                    <div className="load"> <Oval/></div>
                ):(
                    totalQuestion && totalQuestion.length > 0 ? (
                        totalQuestion.map((item, index) => (
                            <Card key={index} data={item} />
                        ))
                    ) : (
                        <p>No questions available.</p>
                    )
                )
            }
        </div>
    );
}

export default CardContainer;