import React from 'react';
import { Line, Layer } from 'react-konva';
import MeasureLine from './MeasureLine';
import Door from './Door';
import OuterWalls from './OuterWalls';
import Wall from './Wall';

export const Cooler = ({ state, effects }) => {
  // can't have more than X vertical walls
  console.log('state', state);
  const config = {
    cooler: {
      offset: {
        x: state.offsetX,
        y: state.offsetY,
      },
      length: {
        feet: state.lengthFeet,
        inches: state.lengthInches,
        pixels: state.lengthInPixels,
      },
      width: {
        feet: state.widthFeet,
        inches: state.widthInches,
        pixels: state.widthInPixels,
      },
      textHorizontal: state.textHorizontal,
      textVertical: state.textVertical,
    },
  };

  var count = 0; //document.getElementById('vwallcount').value;
  var pos = config.cooler.length.feet * 550 / config.cooler.length.feet / (count * 1 + 2);
  var len = config.cooler.width.feet * 550 / config.cooler.length.feet;
  //document.getElementById("vwallcount").value = 1;

  const walls = state.config['three'].walls.map((wall, counter) =>
    <Wall
      key={'wall-' + counter}
      x={wall.x0 + pos}
      y={wall.y0}
      x1={pos + wall.x1}
      y1={wall.y1 + len}
      orientation={wall.orientation}
    />
  );

  const doors = state.config['three'].doors.map((door, counter) => {
    let _door = null;
    console.log('ll', config.cooler.width.pixels / door.wpDivisor + door.y0);
    if (door.orientation === 'Horizontal') {
      _door = (
        <Door
          key={'hdoor-' + door.counter}
          doorConfig={{
            x0: config.cooler.length.pixels / door.lpDivisor + door.x0,
            y0: door.y0,
            doorWidth: door.w,
            coolerWidth: config.cooler.length.feet,
            doorOrientation: door.orientation,
            doorSwing: door.sw,
            doorOpening: door.op,
          }}
        />
      );
    } else if (door.orientation === 'Vertical') {
      _door = (
        <Door
          key={'vdoor-' + door.counter}
          doorConfig={{
            x0: pos + door.x0,
            y0: config.cooler.width.pixels / door.wpDivisor + door.y0,
            doorWidth: door.w,
            coolerWidth: config.cooler.length.feet,
            doorOrientation: door.orientation,
            doorSwing: door.sw,
            doorOpening: door.op,
          }}
        />
      );
    }
    return _door;
  });

  console.log('===>', doors);
  return (
    <Layer>
      <OuterWalls config={config} />
      {walls}
      {doors}
    </Layer>
  );
};

export default Cooler;
