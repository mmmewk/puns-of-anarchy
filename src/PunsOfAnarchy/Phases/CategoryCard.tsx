import React from 'react';
import { Card } from 'antd';
import { useDrop } from 'react-dnd';
import { PlayerID } from 'boardgame.io';
import { useGameContext } from '../GameContext';

interface Props {
    category: string;
    owner: PlayerID;
    ownerName?: string;
}

export type CategoryDropResult = {
    category: string;
    owner: PlayerID;
}

const CategoryCard : React.FC<Props> = ({ category, owner, ownerName }) => {
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
    
    const name = ownerName || `Player ${playerID}`;
    const header = owner === playerID ? 'Your Category' : `${name}'s Category`;

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