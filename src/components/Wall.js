import React, { Component } from 'react';
import { Line, Group, Rect, Text } from 'react-konva';

export class Wall extends Component {
  componentDidMount() {
    function boundX(pos) {
      return {
        x: this.getAbsolutePosition().x,
        y: pos.y,
      };
    }
    function boundY(pos) {
      return {
        x: pos.x,
        y: this.getAbsolutePosition().y,
      };
    }
    this.refs.group.setDragBoundFunc(this.props.orientation === 'Horizontal' ? boundX : boundY);
  }

  render() {
    const props = this.props;
    return (
      <Group draggable ref="group">
        <Line points={[props.x, props.y, props.x1, props.y1]} stroke={'black'} strokeWidth={4} />
      </Group>
    );
  }
}

export default Wall;
