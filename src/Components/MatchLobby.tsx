import { Button, Col, Input, Row, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { lobbyClient } from "../lobbyClient";
import PunsOfAnarchyGame from "../PunsOfAnarchy/Game";
import { useQuery } from "react-query";
import pluralize from 'pluralize';
import { useEffect, useMemo, useState } from "react";
import { serverClient } from "../PunsOfAnarchy/Client";

const MatchLobby : React.FC = () => {
    const navigate = useNavigate();
    const params = useParams();
    const matchId = params.matchId || '';
    const [subscribed, setSubscribed] = useState(false);

    const { data: match, refetch } = useQuery({
        queryKey: ['match', matchId],
        queryFn: async () => {
            return await lobbyClient.getMatch(PunsOfAnarchyGame.name as string, matchId);
        },
    });

    const playerID = useMemo(() => localStorage.getItem(matchId), [matchId]);
    const playerCredentials = useMemo(() => localStorage.getItem(`${matchId}-${playerID}`), [matchId, playerID]);
    const player = useMemo(() => match?.players.find((player) => player.id === Number(playerID)), [playerID, match]);

    useEffect(() => {
        let unsubscribe : Function;
        if (matchId && playerID && playerCredentials) {
            serverClient.updatePlayerID(playerID);
            serverClient.updateMatchID(matchId);
            serverClient.updateCredentials(playerCredentials);

            serverClient.start();
            unsubscribe = serverClient.subscribe((_state) => {
                refetch();
                if (serverClient.chatMessages.some((message) => message.payload.start)) navigate(`/matches/${matchId}/play`);
            });

            setSubscribed(true);
        }

        return () => {
            serverClient.stop();
            if (unsubscribe) unsubscribe();
            setSubscribed(false);
        };
    }, [matchId, playerID, playerCredentials]);

    useEffect(() => {
        if (subscribed) serverClient.sendChatMessage({ joined: true });
    }, [subscribed]);

    const start = async () => {
        await serverClient.sendChatMessage({ start: true });
        navigate(`/matches/${matchId}/play`);
    };

    const copyCode = () => {
        navigator.clipboard.writeText(matchId || '')
        message.success('Code copied');
    }

    const numberOfRemaingingPlayers = match?.players?.filter((player) => !player.name).length;

    if (!playerCredentials || !player) return <p>Unauthorized</p>

    if (match?.gameover) return <p>Game Over</p>;

    if (numberOfRemaingingPlayers === 0) {
        return (
            <Col>
                <p>Ready... Set... Pun!</p>
                {player.data.isHost ? (
                    <Button type='primary' onClick={start}>Start Game</Button>
                ) : (
                    <Button disabled>Waiting for host to start the game</Button>
                )}
                <p>{JSON.stringify(serverClient.chatMessages)}</p>
            </Col>
        )
    }

    return (
        <Col>
            <p>Game Loading... Puns Initializing...</p>
            <p>Waiting for {numberOfRemaingingPlayers} more {pluralize('player', numberOfRemaingingPlayers)} to join the game</p>
            <p>Send this code to your fiends to allow them to join the game</p>
            <Row gutter={12}>
                <Col>
                    <Input value={matchId} disabled />
                </Col>
                <Col>
                    <Button onClick={copyCode}>Copy</Button>
                </Col>
            </Row>
        </Col>
    );
}

export default MatchLobby;