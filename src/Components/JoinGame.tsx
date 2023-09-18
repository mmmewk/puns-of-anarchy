import { useNavigate } from "react-router-dom";
import { lobbyClient } from "../lobbyClient";
import { Button, Col, Form, Input, Row } from "antd";
import { useCallback } from "react";
import PunsOfAnarchyGame from "../PunsOfAnarchy/Game";

type FormData = {
    name: string;
    matchID: string;
};

const JoinGameForm = Form<FormData>;

const JoinGame : React.FC = () => {
    const navigate = useNavigate();

    const joinGame = useCallback(async (values: FormData) => {
        const { playerCredentials, playerID } = await lobbyClient.joinMatch(
            PunsOfAnarchyGame.name as string,
            values.matchID,
            {
              playerName: values.name,
              data: {
                isHost: false,
              },
            }
        );

        // Store player information in localstorage
        localStorage.setItem(values.matchID, playerID);
        localStorage.setItem(`${values.matchID}-${playerID}`, playerCredentials);

        navigate(`/matches/${values.matchID}/lobby`);
    }, [navigate]);

    return (
        <Col>
            <p>Enter your name and the code for the game to join</p>
            <JoinGameForm onFinish={joinGame}>
                <Row gutter={12}>
                    <Col>
                        <JoinGameForm.Item name='name'>
                            <Input placeholder="Name" />
                        </JoinGameForm.Item>
                    </Col>
                    <Col>
                        <JoinGameForm.Item name='matchID'>
                            <Input placeholder="Code" />
                        </JoinGameForm.Item>
                    </Col>
                    <Col>
                        <JoinGameForm.Item>
                            <Button type="primary" htmlType="submit">
                                Join Game
                            </Button>
                        </JoinGameForm.Item>
                    </Col>
                </Row>
            </JoinGameForm>
        </Col>
    )
}

export default JoinGame;