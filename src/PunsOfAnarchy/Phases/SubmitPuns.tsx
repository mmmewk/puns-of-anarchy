import React from 'react';
import { Col, Row } from 'antd';
import { useGameContext } from '../GameContext';
import PunCard from './PunCard';
import CategoryCard from './CategoryCard';

const SubmitPuns : React.FC = () => {
  const { players, G, hand } = useGameContext();

  return (
    <div>
      <h1>Submit Puns</h1>
      <Row gutter={16}>
          {players.map((player) => {
            const category = G.playerCategories[player.id.toString()];
            if (!category) return null;

            return (
                <Col span={6} key={player.id}>
                  <CategoryCard category={category} owner={player.id.toString()} ownerName={player.name} />
                </Col>
            );
          })}
      </Row>
      <br/>
      <h2>Your Cards</h2>
      <Row gutter={16}>
        {hand.map((phrase) => {
          return (
            <Col span={6} key={phrase}>
              <PunCard phrase={phrase} />
            </Col>
          );
        })}
      </Row>
    </div>
  )
}

export default SubmitPuns;