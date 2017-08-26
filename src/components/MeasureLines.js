import React from 'react';
import { injectState } from 'freactal';
import { Group } from 'react-konva';
import MeasureLine from './MeasureLine';

const MeasureLines = injectState(({ state, effects }) => {
  var rightWallIndex = state.walls
    .filter(wall => wall.orientation === 'Vertical' && wall.external === true)
    .reduce((prev, curr) => (prev.x1 > curr.x1 ? prev : curr));

  var bottomWallIndex = state.walls
    .filter(wall => wall.orientation === 'Horizontal' && wall.external === true)
    .reduce((prev, curr, index) => {
      return prev.y1 > curr.y1 ? prev : curr;
    });

  let measureLine = (
    <Group>
      <MeasureLine
        orientation={bottomWallIndex.orientation}
        external={bottomWallIndex.external}
        x0={bottomWallIndex.x0}
        x1={bottomWallIndex.x1}
        y0={bottomWallIndex.y0}
        y1={bottomWallIndex.y1}
        color="orange"
      />
      <MeasureLine
        orientation={rightWallIndex.orientation}
        external={rightWallIndex.external}
        x0={rightWallIndex.x0}
        x1={rightWallIndex.x1}
        y0={rightWallIndex.y0}
        y1={rightWallIndex.y1}
        color="orange"
      />
    </Group>
  );

  // wall sub measurements
  const xArray = [];
  const yArray = [];

  const horizontalIntersectWalls = state.walls.filter(w => {
    //Horizontal only
    return w.orientation === 'Vertical' && w.external === false;
  });

  const verticalIntersectWalls = state.walls.filter(w => {
    //Horizontal only
    return w.orientation === 'Horizontal' && w.external === false;
  });

  const xDoorArray = bottomWallIndex.doors;
  const yDoorArray = rightWallIndex.doors;

  if (xDoorArray.length > 0) {
    xDoorArray.map(door => {
      xArray.push(door.x);
      xArray.push(door.x + door.width);
      return null;
    });
  }

  if (yDoorArray.length > 0) {
    yDoorArray.map(door => {
      yArray.push(door.y);
      yArray.push(door.y + door.width);
      return null;
    });
  }

  if (horizontalIntersectWalls.length > 0) {
    horizontalIntersectWalls.map(w => xArray.push(w.x0));
  }

  if (verticalIntersectWalls.length > 0) {
    verticalIntersectWalls.map(w => yArray.push(w.y0));
  }

  //push end walls
  xArray.push(bottomWallIndex.x1);
  yArray.push(rightWallIndex.y1);

  const sortedXArray = xArray.sort();
  const sortedYArray = yArray.sort();
  const iLines = [];

  for (let i = 0; i < sortedXArray.length - 1; i++) {
    iLines.push(
      <MeasureLine
        key={'iLine-' + i}
        orientation={'Horizontal'}
        external={false}
        color="orange"
        label=""
        x0={sortedXArray[i]}
        x1={sortedXArray[i + 1]}
        y0={bottomWallIndex.y0}
        y1={bottomWallIndex.y1}
      />
    );
  }

  iLines.push(
    <MeasureLine
      key={'iLine-start'}
      orientation={'Horizontal'}
      external={false}
      color="orange"
      label=""
      x0={bottomWallIndex.x0}
      x1={sortedXArray[0]}
      y0={bottomWallIndex.y0}
      y1={bottomWallIndex.y1}
    />
  );

  for (let i = 0; i < sortedYArray.length - 1; i++) {
    iLines.push(
      <MeasureLine
        key={'iLine-v-' + i}
        orientation={'Vertical'}
        external={false}
        color="orange"
        label=""
        x0={rightWallIndex.x0}
        x1={rightWallIndex.x1}
        y0={sortedYArray[i]}
        y1={sortedYArray[i + 1]}
      />
    );
  }

  if (sortedYArray.length > 1) {
    iLines.push(
      <MeasureLine
        key={'iLine-v-start'}
        orientation={'Vertical'}
        external={false}
        color="orange"
        label=""
        x0={rightWallIndex.x0}
        x1={rightWallIndex.x1}
        y0={rightWallIndex.y0}
        y1={sortedYArray[0]}
      />
    );
  }
  return (
    <Group>
      {measureLine}
      {iLines}
    </Group>
  );
});
export default MeasureLines;
