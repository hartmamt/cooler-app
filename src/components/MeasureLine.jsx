import React from 'react';
import { Line, Group, Rect, Text } from 'react-konva';

export const MeasureLine = ({ x, y, x1, y1, orientation, text }) => {
  const coordinates =
    orientation === 'Horizontal'
      ? {
          rect: { x: (x1 - x) / 2 + x, y: y - 5 },
          text: { x: (x1 - x) / 2 + x - 10, y: y - 5 },
        }
      : {
          rect: { x: x - 5, y: (y1 - y) / 2 + y },
          text: { x: x - 17, y: (y1 - y) / 2 + y + 2 },
        };
  return (
    <Group>
      <Line points={[x, y, x1, y1]} stroke={'orange'} strokeWidth={0.5} fill={'white'} />
      <Rect x={coordinates.rect.x} y={coordinates.rect.y} width={20} height={15} fill={'white'} />
      <Text
        x={coordinates.text.x + 10}
        y={coordinates.text.y + 5}
        fontSize={'10px'}
        fontWeight="bold"
        text={text}
        fill={'orange'}
        fontFamily={'Arial'}
        align={'center'}
      />
    </Group>
  );
};

export default MeasureLine;
