import React from 'react';
import { Line, Group, Rect, Text } from 'react-konva';

export const MeasureLine = ({ x, y, x1, y1, orientation, text }) => {
  // if (line.t.substring(line.t.length - 5) == ' 0 in') {
  //   ctx.fillRect((line.x1 - line.x0) / 2 + line.x0, line.y0 - 5, 40, 10);
  //   ctx.fillStyle = color;
  //   ctx.fillText(line.t.substr(0, 5), (line.x1 - line.x0) / 2 + line.x0 + 10, line.y0 + 5);
  // } else {
  //   ctx.fillRect((line.x1 - line.x0) / 2 + line.x0, line.y0 - 5, 60, 10);
  //   ctx.fillStyle = color;
  //   ctx.fillText(line.t, (line.x1 - line.x0) / 2 + line.x0 + 10, line.y0 + 5);
  // }
  //        ctx.fillRect(line.x0 - 5,((line.y1 - line.y0) / 2) + line.y0, 20, 15)
  // ctx.fillStyle = color;
  // if (line.t.substring(line.t.length - 5) == ' 0 in') {
  //     ctx.fillText(line.t.substr(0,5), line.x0 - 10, ((line.y1 - line.y0) / 2) + line.y0 + 10);
  // } else {
  //     ctx.fillText(line.t, line.x0 - 10, ((line.y1 - line.y0) / 2) + line.y0 + 10);
  // }
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
