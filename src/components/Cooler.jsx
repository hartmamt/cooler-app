import React from 'react';
import { injectState } from 'freactal';
import { Layer, Stage } from 'react-konva';

import Walls from './Walls';
import MeasureLines from './MeasureLines';

const Cooler = ({ effects }) => {
  return (
    <div>
      <button onClick={() => effects.addDoor(36)}>Add Door 36</button>
      <button onClick={() => effects.addDoor(48)}>Add Door 48</button>
      <button onClick={() => effects.addDoor(54)}>Add Door 56</button>
      <Stage width={1000} height={1000}>
        <Layer>
          <Walls />
          <MeasureLines />
        </Layer>
      </Stage>
    </div>
  );
};

export default injectState(Cooler);

/*
// handleRectMove = (coords, index, wallIndex) => {
//   const walls = this.props.state.walls;
//   const door = walls[wallIndex].doors[index];
//   if (walls[wallIndex].orientation === 'Horizontal') {
//     walls[wallIndex].doors[index].y =
//       door.direction === 'left' ? coords.y + door.width + 4 : coords.y - 4;
//     walls[wallIndex].doors[index].x = door.direction === 'left' ? coords.x + 0 : coords.x;
//   } else {
//     walls[wallIndex].doors[index].y = door.direction === 'left' ? coords.y : coords.y;
//     walls[wallIndex].doors[index].x =
//       door.direction === 'left' ? coords.x + door.width + 4 : coords.x - 4;
//   }
//   this.setState({
//     walls,
//   });
// };

// handleWallMove = (coords, index) => {
//   const walls = this.props.state.config.four.walls;
//   walls[index].x0 = walls[index].origX + coords.x;
//   walls[index].x1 = walls[index].origX + coords.x;
//   this.setState({
//     walls,
//   });
// };

// handleRectFlip = (index, wallIndex) => {
//   const walls = this.props.state.config.four.walls;
//   walls[wallIndex].doors[index].direction =
//     walls[wallIndex].doors[index].direction === 'left' ? 'right' : 'left';
//   this.setState({
//     walls,
//   });
// };

// handleSelectWall = (e, wallIndex) => {
//   console.log('wallIndex', wallIndex);
//   this.props.effects.selectWall(e.evt.clientX, e.evt.clientY, wallIndex);
// };
//
// handleAddDoor = width => {
//   this.props.effects.addDoor(width);
// };

handleCheckBounds = (n, o, width, index, wallIndex, wallOrientation) => {
  let isDraggable = true;
  const doorWidth = this.props.state.config.four.walls[wallIndex].doors[index].width;

  const c =
    wallOrientation === 'Vertical'
      ? this.props.state.walls[wallIndex].doors
          .filter((r, key) => key !== index)
          .map(r => ({ n: r.y, width: r.width }))
      : this.props.state.walls[wallIndex].doors
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
*/
