import React from 'react';
import { Rect, Group, Arc, Line } from 'react-konva';

export class Door extends React.Component {
  componentDidMount() {
    function boundX(pos) {
      var newY = pos.y;
      if (pos.y < this.attrs.wallCoords.y0) {
        newY = this.attrs.wallCoords.y0;
      } else if (pos.y >= this.attrs.wallCoords.y1 - this.attrs.width) {
        newY = this.attrs.wallCoords.y1 - this.attrs.width;
      }
      return {
        x: this.getAbsolutePosition().x,
        y: newY,
      };
    }
    function boundY(pos) {
      var newX = pos.x;
      if (pos.x < this.attrs.wallCoords.x0) {
        newX = this.attrs.wallCoords.x0;
      } else if (pos.x >= this.attrs.wallCoords.x1 - this.attrs.width) {
        newX = this.attrs.wallCoords.x1 - this.attrs.width;
      }
      return {
        x: newX,
        y: this.getAbsolutePosition().y,
      };
    }
    this.refs.rect.setDragBoundFunc(this.props.wallOrientation === 'Vertical' ? boundX : boundY);
  }

  handleClick = e => {
    this.props.handleDoorFlip(this.props.index, this.props.wallIndex);
  };

  handleDoubleClick = e => {
    this.props.handleDoorReverse(this.props.index, this.props.wallIndex);
  };

  handleDragMove = (e, index, x, y) => {
    if (
      this.props.handleCheckBounds(
        e.target.attrs.y,
        e.target.attrs.x,
        this.props.width,
        index,
        this.props.wallIndex,
        this.props.wallOrientation
      )
    ) {
      this.props.handleDoorMove(
        {
          x: e.target.attrs.x,
          y: e.target.attrs.y,
        },
        index,
        this.props.wallIndex
      );
    } else {
      this.props.handleDoorMove(
        {
          x: x,
          y: y,
        },
        index,
        this.props.wallIndex,
        this.props.width
      );
    }

    e.cancelBubble = true;
  };

  handleDragEnd = (e, index, x, y) => {
    this.props.handleEndDoorMove(
      {
        x: e.target.attrs.x,
        y: e.target.attrs.y,
      },
      index,
      this.props.wallIndex
    );

    e.cancelBubble = true;
  };

  render() {
    let x = this.props.coords.x;
    let y = this.props.coords.y;

    if (this.props.wallOrientation === 'Vertical') {
      x =
        this.props.direction === 'left'
          ? this.props.coords.x - this.props.width - 4
          : this.props.coords.x + 4;
    } else {
      y =
        this.props.direction === 'left'
          ? this.props.coords.y - this.props.width - 4
          : this.props.coords.y + 4;
    }

    const props = this.props;
    const doorSwing = (props.width - 22 / 25 * 12 * 2 + 3) * (22 / 16);
    const doorWidth = doorSwing + 5;

    let door = {
      x0: 0,
      y0: 0,
      angle: 0,
    };

    let rect = {
      x0: 0,
      y0: 0,
      angle: 0,
    };

    let line = {
      x0: 0,
      y0: 0,
      x1: 0,
      y1: 0,
    };

    let line2 = {
      x0: 0,
      y0: 0,
      x1: 0,
      y1: 0,
    };
    if (this.props.wallOrientation === 'Vertical') {
      if (props.doorSwing === 'right') {
        if (props.doorOpening === 'out') {
          rect.x0 = props.coords.x;
          rect.y0 = props.coords.y - props.width;
          door.x0 = props.coords.x;
          door.y0 = props.coords.y;
          door.angle = 360 - 270;
          door.rotation = 270;
          line.x0 = props.coords.x;
          line.y0 = props.coords.y;
          line.x1 = props.coords.x + props.width;
          line.y1 = props.coords.y;
          line2.x0 = props.coords.x;
          line2.y0 = props.coords.y;
          line2.x1 = props.coords.x;
          line2.y1 = props.coords.y - props.width;
        } else {
          rect.x0 = props.coords.x - props.width;
          rect.y0 = props.coords.y - props.width;
          door.x0 = props.coords.x;
          door.y0 = props.coords.y;
          door.angle = 360 - 270;
          door.rotation = 180;
          line.x0 = props.coords.x;
          line.y0 = props.coords.y;
          line.x1 = props.coords.x - props.width;
          line.y1 = props.coords.y;
          line2.x0 = props.coords.x;
          line2.y0 = props.coords.y;
          line2.x1 = props.coords.x;
          line2.y1 = props.coords.y - props.width;
        }
      } else {
        if (props.doorOpening === 'out') {
          door.x0 = props.coords.x;
          door.y0 = props.coords.y - props.width;
          rect.x0 = props.coords.x;
          rect.y0 = props.coords.y - props.width;
          door.angle = 360 - 270;
          door.rotation = 0;
          line.x0 = props.coords.x + props.width;
          line.y0 = props.coords.y - props.width;
          line.x1 = props.coords.x;
          line.y1 = props.coords.y - props.width;
          line2.x0 = props.coords.x;
          line2.y0 = props.coords.y;
          line2.x1 = props.coords.x;
          line2.y1 = props.coords.y - props.width;
        } else {
          door.x0 = props.coords.x;
          door.y0 = props.coords.y - props.width;
          rect.x0 = props.coords.x - props.width;
          rect.y0 = props.coords.y - props.width;
          door.angle = 360 - 270;
          door.rotation = 90;
          line.x0 = props.coords.x - props.width;
          line.y0 = props.coords.y - props.width;
          line.x1 = props.coords.x;
          line.y1 = props.coords.y - props.width;
          line2.x0 = props.coords.x;
          line2.y0 = props.coords.y;
          line2.x1 = props.coords.x;
          line2.y1 = props.coords.y - props.width;
        }
      }
    }

    if (this.props.wallOrientation === 'Horizontal') {
      if (props.doorSwing === 'right') {
        if (props.doorOpening === 'out') {
          door.x0 = props.coords.x;
          door.y0 = props.coords.y;
          rect.x0 = props.coords.x;
          rect.y0 = props.coords.y - props.width;
          door.angle = 360 - 270;
          door.rotation = 270;
          line.x0 = props.coords.x;
          line.y0 = props.coords.y;
          line.x1 = props.coords.x;
          line.y1 = props.coords.y - props.width;
          line2.x0 = props.coords.x;
          line2.y0 = props.coords.y;
          line2.x1 = props.coords.x + props.width;
          line2.y1 = props.coords.y;
        } else {
          door.x0 = props.coords.x;
          door.y0 = props.coords.y;
          rect.x0 = props.coords.x;
          rect.y0 = props.coords.y;
          door.angle = 360 - 270;
          door.rotation = 0;
          line.x0 = props.coords.x;
          line.y0 = props.coords.y;
          line.x1 = props.coords.x;
          line.y1 = props.coords.y + props.width;
          line2.x0 = props.coords.x;
          line2.y0 = props.coords.y;
          line2.x1 = props.coords.x + props.width;
          line2.y1 = props.coords.y;
        }
      } else {
        if (props.doorOpening === 'out') {
          rect.x0 = props.coords.x;
          rect.y0 = props.coords.y - props.width;
          door.x0 = props.coords.x + props.width;
          door.y0 = props.coords.y;
          door.angle = 360 - 270;
          door.rotation = 180;
          line.x0 = props.coords.x + props.width;
          line.y0 = props.coords.y;
          line.x1 = props.coords.x + props.width;
          line.y1 = props.coords.y - props.width;
          line2.x0 = props.coords.x;
          line2.y0 = props.coords.y;
          line2.x1 = props.coords.x + props.width;
          line2.y1 = props.coords.y;
        } else {
          rect.x0 = props.coords.x;
          rect.y0 = props.coords.y;
          door.x0 = props.coords.x + props.width;
          door.y0 = props.coords.y;
          door.angle = 360 - 270;
          door.rotation = 90;
          line.x0 = props.coords.x + props.width;
          line.y0 = props.coords.y;
          line.x1 = props.coords.x + props.width;
          line.y1 = props.coords.y + props.width;
          line2.x0 = props.coords.x;
          line2.y0 = props.coords.y;
          line2.x1 = props.coords.x + props.width;
          line2.y1 = props.coords.y;
        }
      }
    }

    return (
      <Group>
        <Rect
          x={rect.x0}
          y={rect.y0}
          width={this.props.width}
          height={this.props.width}
          onDragMove={e => this.handleDragMove(e, this.props.index, x, y)}
          onDragEnd={e => this.handleDragEnd(e, this.props.index, x, y)}
          draggable
          ref="rect"
          wallCoords={this.props.wallCoords}
          onClick={() => this.props.handleSelectDoor(this.props.wallIndex, this.props.index)}
        />
        <Arc
          x={door.x0}
          y={door.y0}
          innerRadius={this.props.width * 2 / 2}
          outerRadius={this.props.width * 2 / 2 - 2}
          angle={door.angle}
          rotation={door.rotation}
          fill={this.props.selected ? 'red' : 'black'}
          dash={[9, 15]}
          dashEnabled
        />
        <Line
          points={[line.x0, line.y0, line.x1, line.y1]}
          stroke={2}
          stroke={this.props.selected ? 'red' : 'black'}
          strokeWidth={5}
        />
        <Line points={[line2.x0, line2.y0, line2.x1, line2.y1]} stroke={'white'} strokeWidth={8} />
      </Group>
    );
  }
}
export default Door;
