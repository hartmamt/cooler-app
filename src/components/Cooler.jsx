import React from 'react';
import { connect } from 'react-redux';
import { Layer, Stage } from 'react-konva';

import { selectWall, addDoor, moveDoor, moveWall, flipDoor, addWall } from '../state/actions';
import Walls from './Walls';
import MeasureLines from './MeasureLines';

const Cooler = state => {
  return (
    <div>
      <button onClick={() => state.addDoor(36)}>Add Door 36</button>
      <button onClick={() => state.addDoor(48)}>Add Door 48</button>
      <button onClick={() => state.addDoor(54)}>Add Door 56</button>
      <button onClick={() => state.addWall()}>Add Wall</button>
      <Stage width={1000} height={1000}>
        <Layer>
          <Walls
            walls={state.cooler.walls}
            handleSelectWall={state.selectWall}
            handleDoorMove={state.moveDoor}
            handleWallMove={state.moveWall}
          />
          <MeasureLines walls={state.cooler.walls} />
        </Layer>
      </Stage>
    </div>
  );
};

var mapStateToProps = function(state) {
  return { cooler: state.cooler };
};

var mapDispatchToProps = function(dispatch) {
  return {
    selectWall: (x, y, wallIndex) => dispatch(selectWall(x, y, wallIndex)),
    addDoor: width => dispatch(addDoor(width)),
    moveDoor: (coords, index, wallIndex) => dispatch(moveDoor(coords, index, wallIndex)),
    moveWall: (coords, index) => dispatch(moveWall(coords, index)),
    flipDoor: (index, wallIndex) => dispatch(flipDoor(index, wallIndex)),
    addWall: () => dispatch(addWall()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cooler);
