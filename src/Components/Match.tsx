import { useParams } from "react-router-dom";
import Client from "../PunsOfAnarchy/Client";

const Match : React.FC = () => {
    const params = useParams();
    const matchId = params.matchId || '';

    const playerID = localStorage.getItem(matchId);
    const playerCredentials = localStorage.getItem(`${matchId}-${playerID}`);

    if (!playerID || !playerCredentials) return null;

    return <Client matchID={matchId} playerID={playerID} credentials={playerCredentials} />;
}

export default Match;