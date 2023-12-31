import React, { useCallback } from 'react';
import { useGameContext } from '../GameContext';
import { Row, Col, Card } from 'antd';
import { Pun } from '../types';

const JudgePuns : React.FC = () => {
  const { G, ctx, playerID, moves, players } = useGameContext();
  const submissions = G.submissions[ctx.currentPlayer];

  const playerActive = playerID === ctx.currentPlayer;

  let currentPlayerName = players.find((player) => player.id.toString() === ctx.currentPlayer)?.name;
  currentPlayerName ||= `Player ${ctx.currentPlayer}`;

  const pickPun = useCallback((pun: Pun) => {
    if (!playerActive) return;

    moves.pick(pun);
  }, [playerActive, moves])

  return (
    <div>
      <h1>{currentPlayerName}, pick your favorite pun!</h1>
      <Row gutter={16}>
        {submissions.map((pun) => {
          return (
            <Col key={pun.originalText}>
              <Card style={{ cursor: playerActive ? 'pointer' : 'default' }} onClick={() => pickPun(pun)}>
                <Card.Meta title={pun.punText} description={pun.originalText} />
              </Card>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default JudgePuns;