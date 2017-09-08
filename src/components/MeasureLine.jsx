import React from 'react';
import { Line, Group, Rect, Text, Arrow } from 'react-konva';

class MeasureLine extends React.Component {
  getInches = val => Math.round(val * 12);
  render() {
    const wall = this.props;
    const offSet = wall.external ? 40 : 20;
    let line1 =
      wall.orientation === 'Vertical'
        ? [wall.x1, wall.y0, wall.x1 + 50, wall.y0]
        : [wall.x1, wall.y1, wall.x1, wall.y1 + 50];
    let line2 =
      wall.orientation === 'Vertical'
        ? [wall.x1, wall.y1, wall.x1 + 50, wall.y1]
        : [wall.x0, wall.y1, wall.x0, wall.y0 + 50];
    let arrow1 =
      wall.orientation === 'Vertical'
        ? [wall.x0 + offSet, wall.y0, wall.x1 + offSet, wall.y1]
        : [wall.x0, wall.y0 + offSet, wall.x1, wall.y1 + offSet];
    let arrow2 =
      wall.orientation === 'Vertical'
        ? [wall.x1 + offSet, wall.y1, wall.x0 + offSet, wall.y0]
        : [wall.x1, wall.y1 + offSet, wall.x0, wall.y0 + offSet];

    const coords =
      wall.orientation === 'Horizontal'
        ? {
            rect: { x: (wall.x1 - wall.x0) / 2 + wall.x0, y: wall.y0 + offSet },
            text: { x: (wall.x1 - wall.x0) / 2 + wall.x0, y: wall.y0 + offSet },
          }
        : {
            rect: { x: wall.x0 - 5 + offSet, y: (wall.y1 - wall.y0) / 2 + wall.y0 + 2 },
            text: { x: wall.x0 - 9 + offSet, y: (wall.y1 - wall.y0) / 2 + wall.y0 + 2 },
          };
    const l = 22 * 1 + 0 / 12;
    const w = 16 * 1 + 0 / 12;
    const lp = 550 * l / l;
    const wp = 550 * w / l;
    let vInches = (wall.y1 - wall.y0) / wp * w % 1;
    let hInches = (wall.x1 - wall.x0) / lp * l % 1;
    let hFeet = Math.floor((wall.x1 - wall.x0) / lp * l);
    let vFeet = Math.floor((wall.y1 - wall.y0) / wp * w);
    hFeet = this.getInches(hInches.toFixed(2)) >= 12 ? hFeet + 1 : hFeet;
    hInches = this.getInches(hInches.toFixed(2)) >= 12 ? 0 : hInches;
    vFeet = this.getInches(vInches.toFixed(2)) >= 12 ? vFeet + 1 : vFeet;
    vInches = this.getInches(vInches.toFixed(2)) >= 12 ? 0 : vInches;
    return (
      <Group>
        <Line points={line1} stroke={wall.color} strokeWidth={1} />
        <Line points={line2} stroke={wall.color} strokeWidth={1} />
        <Arrow
          points={arrow1}
          stroke={wall.color}
          strokeWidth={1}
          fill={wall.color}
          pointerWidth={10}
          pointerLength={10}
        />
        <Arrow
          points={arrow2}
          stroke={wall.color}
          strokeWidth={1}
          fill={wall.color}
          pointerWidth={10}
          pointerLength={10}
        />
        <Rect
          x={coords.rect.x}
          y={coords.rect.y - 5}
          width={20}
          height={15}
          fill={'white'}
          zIndex={100}
        />
        <Text
          x={coords.text.x}
          y={coords.text.y}
          fontSize={'10px'}
          fontWeight="bold"
          text={
            wall.orientation === 'Horizontal'
              ? `${Math.abs(hFeet)} ft${hInches > 0 && this.getInches(hInches.toFixed(2)) !== 0
                  ? ' ' + this.getInches(Math.abs(hInches.toFixed(2))) + ' in'
                  : ''}`
              : `${Math.abs(vFeet)} ft${vInches > 0 && this.getInches(hInches.toFixed(2)) !== 0
                  ? ' ' + this.getInches(Math.abs(vInches.toFixed(2))) + ' in'
                  : ''}`
          }
          fill={'black'}
          fontFamily={'Arial'}
          align={'center'}
          zIndex={1000}
        />
      </Group>
    );
  }
}

export default MeasureLine;
