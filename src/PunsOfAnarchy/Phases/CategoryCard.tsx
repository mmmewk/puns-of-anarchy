import React from 'react';
import { Card } from 'antd';
import { useDrop } from 'react-dnd';
import { PlayerID } from 'boardgame.io';
import { useGameContext } from '../GameContext';

interface Props {
    category: string;
    owner: PlayerID;
}

export type CategoryDropResult = {
    category: string;
    owner: PlayerID;
}

const CategoryCard : React.FC<Props> = ({ category, owner }) => {
    const { playerID, G } = useGameContext();
    const submissions = G.submissions[owner];

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'PunCard',
        drop: () => ({ category, owner }),
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
    }));

    let style = { opacity: 1, cursor: 'move' };
    if (canDrop && (!isOver || owner === playerID)) {
        style.opacity = 0.3;
    }

    const header = owner === playerID ? 'Your Category' : `Player ${owner}'s Category`;

    return (
        <Card
            ref={drop}
            style={style}
            title={header}
        >
            <Card.Meta title={category} description={`${submissions.length} puns submitted`} />
        </Card>
    )
}

export default CategoryCard;