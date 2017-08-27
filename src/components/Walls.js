import React from 'react';
import { injectState } from 'freactal';
import { Group } from 'react-konva';
import MeasureLine from './MeasureLine';
import Wall from './Wall';
import Door from './Door';

const Walls = injectState(({ state, effects }) => {
  const handleCheckBounds = (n, o, width, index, wallIndex, wallOrientation) => {
    const walls = state.walls;
    let isDraggable = true;
    const doorWidth = walls[wallIndex].doors[index].width;
    const c =
      wallOrientation === 'Vertical'
        ? walls[wallIndex].doors
            .filter((r, key) => key !== index)
            .map(r => ({ n: r.y, width: r.width }))
        : walls[wallIndex].doors
            .filter((r, key) => key !== index)
            .map(r => ({ n: r.x, width: r.width }));
    const v = wallOrientation === 'Vertical' ? n : o;
    for (let i = 0; i < c.length; i++) {
      isDraggable = v + doorWidth < c[i].n || v > c[i].n + c[i].width;
      if (isDraggable === false) {
        break;
      }
    }
    return isDraggable;
  };

  const walls = state.walls.map((wall, counter) => {
    const doors = wall.doors.map((door, doorCounter) =>
      <Group key={'group-doors-' + doorCounter}>
        <Door
          handleDoorMove={effects.moveDoor}
          handleDoorFlip={effects.flipDoor}
          coords={{
            x: wall.orientation === 'Vertical' ? wall.x0 : door.x,
            y: wall.orientation === 'Horizontal' ? wall.y0 : door.y,
          }}
          index={doorCounter}
          direction={door.direction}
          width={door.width}
          handleCheckBounds={handleCheckBounds}
          wallIndex={counter}
          wallCoords={{ x0: wall.x0, y0: wall.y0, x1: wall.x1, y1: wall.y1 }}
          wallOrientation={wall.orientation}
        />
        {!wall.external
          ? <MeasureLine
              orientation={wall.orientation}
              external={false}
              color="orange"
              label="12 ft"
              x0={wall.orientation === 'Horizontal' ? wall.x0 : wall.x0}
              x1={wall.orientation === 'Horizontal' ? door.x : wall.x0}
              y0={wall.orientation === 'Horizontal' ? wall.y0 : door.y}
              y1={wall.orientation === 'Horizontal' ? wall.y0 : wall.y0}
            />
          : null}
      </Group>
    );
    return (
      <Group key={'group-wall-' + counter}>
        <Wall
          points={[wall.x0, wall.y0, wall.x1, wall.y1]}
          stroke={wall.selected ? 'red' : 'black'}
          strokeWidth={8}
          index={counter}
          selected={wall.selected}
          selectedX={wall.selectedX}
          selectedY={wall.selectedY}
          handleSelectWall={effects.selectWall}
          handleWallMove={effects.moveWall}
          wallOrientation={wall.wallOrientation}
          origX={wall.origX}
          origY={wall.origY}
        />
        {doors}
      </Group>
    );
  });
  return (
    <Group>
      {walls}
    </Group>
  );
});
export default Walls;
