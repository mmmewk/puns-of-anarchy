import { BoardProps } from 'boardgame.io/react';
import React from 'react';
import { GameState } from './types';
import SubmitPuns from './Phases/SubmitPuns';
import JudgePuns from './Phases/JudgePuns';
import { Card, Col, Layout, Row } from 'antd';
import { GameContext } from './GameContext';

export interface Props extends BoardProps<GameState> {}

const PunsOfAnarchyBoard : React.FC<Props> = (props) => {
  const { G, playerID, ctx, matchData } = props;

  console.log(matchData)

  const hand = playerID ? G.playerHands[playerID] : [];
  const winningPuns = playerID ? G.winningPuns[playerID] : [];

  if (!playerID) return null;

  const renderContent = () => {
    switch(ctx.phase) {
      case 'submitPuns':
        return <SubmitPuns />;
      case 'judgePuns':
        return <JudgePuns />;
      default:
        return <p>Unknown Phase</p>;
    }
  }

  return (
    <GameContext.Provider value={{ ...props, hand, players: matchData || [] }}>
      <Layout>
        <Layout.Content style={{ padding: 50 }}>
          {renderContent()}
        </Layout.Content>
        <Layout.Footer>
          <h2>Your winning puns</h2>
          <Row gutter={16}>
            {winningPuns.map((pun) => {
              return (
                <Col key={pun.originalText}>
                  <Card>
                    <p>Category: {pun.category}</p>
                    <Card.Meta title={pun.punText} description={pun.originalText} />
                  </Card>
                </Col>
              )
            })}
          </Row>
        </Layout.Footer>
      </Layout>
    </GameContext.Provider>
  )
}

export default PunsOfAnarchyBoard;