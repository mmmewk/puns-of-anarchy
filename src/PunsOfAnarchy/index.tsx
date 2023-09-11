import { useParams } from "react-router-dom";
import Client from "./Client";

const PunsOfAnarchy : React.FC = () => {
    const { playerId } = useParams();

    return <Client playerID={playerId} debug={false} />
}

export default PunsOfAnarchy;