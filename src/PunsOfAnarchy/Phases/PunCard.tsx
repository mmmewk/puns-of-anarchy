import React, { useState } from 'react';
import { Card, Input } from 'antd';
import { useDrag } from 'react-dnd';
import { CategoryDropResult } from './CategoryCard';
import { useGameContext } from '../GameContext';

interface Props {
    phrase: string;
}

const PunCard : React.FC<Props> = ({ phrase }) => {
    const { playerID, moves } = useGameContext();

    const [punText, setPunText] = useState<string>(phrase);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'PunCard',
        item: { originalText: phrase, punText },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult<CategoryDropResult>();
            console.log(punText);
            if (item && dropResult) {
                moves.submitPun({
                    category: dropResult.category,
                    originalText: item.originalText,
                    punText: item.punText,
                    submittedBy: playerID,
                })
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [punText]);

    return (
        <Card 
            ref={drag}
            style={{ opacity: isDragging ? 0.7 : 1, cursor: 'grab' }}
        >
            <Card.Meta title={
                <Input value={punText} onChange={(event) => setPunText(event.target.value)} draggable={false} />
            } description={phrase} />
        </Card>
    )
}

export default PunCard;