import { useNavigate } from "react-router-dom";
import { lobbyClient } from "../lobbyClient";
import { Button, Col, Form, Input, InputNumber, Row } from "antd";
import { useCallback } from "react";
import PunsOfAnarchyGame from "../PunsOfAnarchy/Game";

type FormData = {
    name: string;
    numberOfPlayers: number;
};

const NewGameForm = Form<FormData>;

const NewGame : React.FC = () => {
    const navigate = useNavigate();

    const createGame = useCallback(async (values: FormData) => {
        const { matchID } = await lobbyClient.createMatch(PunsOfAnarchyGame.name as string, {
            numPlayers: values.numberOfPlayers,
        });

        const { playerCredentials, playerID } = await lobbyClient.joinMatch(
            PunsOfAnarchyGame.name as string,
            matchID,
            {
                playerName: values.name,
                data: {
                    isHost: true,
                },
            }
        );

        // Store player information in localstorage
        localStorage.setItem(matchID, playerID);
        localStorage.setItem(`${matchID}-${playerID}`, playerCredentials);

        navigate(`/matches/${matchID}/lobby`);
    }, [navigate]);

    return (
        <Col>
            <p>Enter your name and the number of players to create a game</p>
            <NewGameForm onFinish={createGame}>
                <Row gutter={12}>
                    <Col>
                        <NewGameForm.Item name='name'>
                            <Input placeholder="Name" />
                        </NewGameForm.Item>
                    </Col>
                    <Col>
                        <NewGameForm.Item name='numberOfPlayers'>
                            <InputNumber placeholder="Number of Players" />
                        </NewGameForm.Item>
                    </Col>
                    <Col>
                        <NewGameForm.Item>
                            <Button type="primary" htmlType="submit">
                                Create Game
                            </Button>
                        </NewGameForm.Item>
                    </Col>
                </Row>
            </NewGameForm>
        </Col>
    )
}

export default NewGame;