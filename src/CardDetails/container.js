import CardContainer from "./CardContainer/cardContainer";
import Head from '../Head/head';
import Banner from "../DashBoard/Banner";

function MainContain() {
    return(
        <div className="mt-[5rem]">
            <Head/>
            {/* <Banner/> */}
            <CardContainer/>
        </div>
    );
}

export default MainContain;