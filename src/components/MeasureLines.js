import React from 'react';
import { Group } from 'react-konva';
import MeasureLine from './MeasureLine';

const MeasureLines = cooler => {
  const walls = cooler.walls.length > 0 ? cooler.walls : [];

  const leftWallIndex =
    walls.length > 0 &&
    walls
      .filter(wall => wall.orientation === 'Vertical' && wall.external === true)
      .reduce((prev, curr) => (prev.x1 < curr.x1 ? prev : curr));

  const rightWallIndex =
    walls.length > 0 &&
    walls
      .filter(wall => wall.orientation === 'Vertical' && wall.external === true)
      .reduce((prev, curr) => (prev.x1 > curr.x1 ? prev : curr));

  const topWallIndex =
    walls.length > 0 &&
    walls
      .filter(wall => wall.orientation === 'Horizontal' && wall.external === true)
      .reduce((prev, curr, index) => {
        return prev.y1 < curr.y1 ? prev : curr;
      });

  const bottomWallIndex =
    walls.length > 0 &&
    walls
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
  const topWallArray = [];
  const leftWallArray = [];

  const horizontalIntersectWalls = walls.filter(w => {
    //Horizontal only
    return w.orientation === 'Vertical' && w.external === false;
  });

  const verticalIntersectWalls = walls.filter(w => {
    //Horizontal only
    return w.orientation === 'Horizontal' && w.external === false;
  });

  const xDoorArray = bottomWallIndex.doors ? bottomWallIndex.doors : [];
  const yDoorArray = rightWallIndex.doors ? rightWallIndex.doors : [];

  if (xDoorArray.length > 0) {
    xDoorArray.map(door => {
      xArray.push(door.x);
      xArray.push(door.x + door.width);
      return null;
    });
  }

  topWallIndex.doors
    .map(d => {
      topWallArray.push(d.x);
      topWallArray.push(d.x + d.width);
    })
    .sort();

  leftWallIndex.doors
    .map(d => {
      leftWallArray.push(d.y);
      leftWallArray.push(d.y - d.width);
    })
    .sort();

  if (yDoorArray.length > 0) {
    yDoorArray.map(door => {
      yArray.push(door.y);
      yArray.push(door.y - door.width);
      return null;
    });
  }

  if (horizontalIntersectWalls.length > 0) {
    horizontalIntersectWalls.map(w => xArray.push(w.x0));
  }

  if (verticalIntersectWalls.length > 0) {
    verticalIntersectWalls.map(w => {
      yArray.push(w.y0);
    });
  }

  //push end walls
  xArray.push(bottomWallIndex.x1);
  yArray.push(rightWallIndex.y1);
  topWallArray.push(topWallIndex.x1);
  leftWallArray.push(leftWallIndex.y0);

  const sortedXArray = xArray.sort();
  const sortedYArray = yArray.sort();
  const sortedTopArray = topWallArray.sort();
  const sortedLeftArray = leftWallArray; //.sort();
  const iLines = [];

  //push measure lines for bottom wall
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
  //push first measure line for bottom wall
  iLines.push(
    <MeasureLine
      key={'iLine-start'}
      orientation={'Horizontal'}
      external={false}
      color="orange"
      label=""
      x0={bottomWallIndex.x0}
      x1={sortedXArray[0] /* 0 here because first */}
      y0={bottomWallIndex.y0}
      y1={bottomWallIndex.y1}
    />
  );

  //push measure lines for top wall
  for (let i = 0; i < sortedTopArray.length - 1; i++) {
    iLines.push(
      <MeasureLine
        key={'top-iLine-' + i}
        orientation={'Horizontal'}
        external={false}
        color="orange"
        label=""
        x0={sortedTopArray[i]}
        x1={sortedTopArray[i + 1]}
        y0={topWallIndex.y0 - 50}
        y1={topWallIndex.y1 - 50}
      />
    );
  }

  //push first measure line for top wall
  iLines.push(
    <MeasureLine
      key={'iLine-start-top'}
      orientation={'Horizontal'}
      external={false}
      color="orange"
      label=""
      x0={topWallIndex.x0}
      x1={sortedTopArray[0] /* 0 here because first */}
      y0={topWallIndex.y0 - 50}
      y1={topWallIndex.y1 - 50}
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

  for (let i = 0; i < sortedLeftArray.length - 1; i++) {
    iLines.push(
      <MeasureLine
        key={'iLine-v-left-' + i}
        orientation={'Vertical'}
        external={false}
        color="orange"
        label=""
        x0={leftWallIndex.x0 - 50}
        x1={leftWallIndex.x1 - 50}
        y0={sortedLeftArray[i]}
        y1={sortedLeftArray[i + 1]}
      />
    );
  }

  if (sortedLeftArray.length > 1) {
    iLines.push(
      <MeasureLine
        key={'iLine-v-l-start'}
        orientation={'Vertical'}
        external={false}
        color="orange"
        label=""
        x0={leftWallIndex.x0 - 50}
        x1={leftWallIndex.x1 - 50}
        y0={leftWallIndex.y1}
        y1={sortedLeftArray[0]}
      />
    );
  }
  return (
    <Group>
      {measureLine}
      {iLines}
    </Group>
  );
};
export default MeasureLines;
