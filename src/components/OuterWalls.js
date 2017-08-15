import React, { Component } from 'react';
import { Group } from 'react-konva';
import Wall from './Wall';
import MeasureLine from './MeasureLine';

export class OuterWalls extends Component {
  render() {
    const cooler = this.props.config.cooler;
    const { x, y } = { ...cooler.offset };
    const { textHorizontal, textVertical } = { ...cooler };

    return (
      <Group key={this.props.key}>
        <Wall x={x} y={y} x1={x + cooler.length.pixels} y1={y} orientation="Horizontal" />
        <Wall
          x={x + cooler.length.pixels}
          y={y}
          x1={x + cooler.length.pixels}
          y1={y + cooler.width.pixels}
          orientation="Vertical"
        />
        <Wall
          x={x}
          y={y + cooler.width.pixels}
          x1={x + cooler.length.pixels}
          y1={y + cooler.width.pixels}
          orientation="Horizontal"
        />
        <Wall x={x} y={y} x1={x} y1={y + cooler.width.pixels} orientation="Vertical" />
        <MeasureLine
          x={100}
          y={cooler.width.pixels + 120}
          x1={cooler.length.pixels + 100}
          y1={cooler.width.pixels + 120}
          orientation="Horizontal"
          text={textHorizontal}
        />
        <MeasureLine
          x={80}
          y={100}
          x1={80}
          y1={cooler.width.pixels + 100}
          orientation="Vertical"
          text={textVertical}
        />
      </Group>
    );
  }
}

export default OuterWalls;
