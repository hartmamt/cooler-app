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
      {/* <Line points={[pos, 100, pos, len + 100]} stroke={4} strokeWidth={4} />
      <MeasureLine
        x={100}
        y={config.cooler.widthInPixels + 110}
        x1={pos}
        y1={config.cooler.widthInPixels + 110}
        orientation="Horizontal"
        text={'nope'}
      /> */}
      {/* <Door
        doorConfig={{
          x0: 133.3333334,
          y0: 100,
          doorWidth: 36,
          coolerWidth: 22.833333333333332,
          doorOrientation: 'Horizontal',
          doorSwing: 'Right',
          doorOpening: 'Out',
        }}
      /> */}
      {/*}
      <Line points={[pos + 200, 100, pos + 200, len + 100]} stroke={4} strokeWidth={4} />
      <MeasureLine
        x={100}
        y={wp + 120}
        x1={pos + 200}
        y1={wp + 120}
        orientation="Horizontal"
        text={textHorizontal}
      />

      <MeasureLine
        x={100}
        y={90}
        x1={lp / 3 - 50}
        y1={90}
        orientation="Horizontal"
        text={'door1'}
      />
      <Door
        doorConfig={{
          x0: 333.3333334,
          y0: 100,
          doorWidth: 36,
          coolerWidth: 22.833333333333332,
          doorOrientation: 'Horizontal',
          doorSwing: 'Right',
          doorOpening: 'Out',
        }}
      />
      <MeasureLine
        x={100}
        y={80}
        x1={lp / 3 + 150}
        y1={80}
        orientation="Horizontal"
        text={textHorizontal}
      />
      <Door
        doorConfig={{
          x0: 533.3333334,
          y0: 100,
          doorWidth: 36,
          coolerWidth: 22.833333333333332,
          doorOrientation: 'Horizontal',
          doorSwing: 'Right',
          doorOpening: 'Out',
        }}
      />
      <MeasureLine
        x={100}
        y={70}
        x1={lp / 3 + 350}
        y1={70}
        orientation="Horizontal"
        text={textHorizontal}
      />*/}
    </Layer>
  );
};

export default Cooler;
