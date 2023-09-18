import { Button, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";

const Home : React.FC = () => {
    const navigate = useNavigate();

    return (
        <Col>
            <h1>Welcome to Piles of Puns</h1>
            <Row gutter={12}>
                <Col>
                    <Button type='primary' onClick={() => navigate('/new')}>Create a Game</Button>
                </Col>
                <Col>
                    <Button onClick={() => navigate('/join')}>Join a Game</Button>
                </Col>
            </Row>
        </Col>
    )
}

export default Home;