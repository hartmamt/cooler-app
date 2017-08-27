import React from 'react';
import { Rect } from 'react-konva';

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
    //const coords = this.props.wallCoords;
    this.refs.rect.setDragBoundFunc(this.props.wallOrientation === 'Vertical' ? boundX : boundY);
  }

  handleClick = e => {
    this.props.handleDoorFlip(this.props.index, this.props.wallIndex);
  };

  handleDragEnd = (e, index, x, y) => {
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
    return (
      <Rect
        x={x}
        y={y}
        width={this.props.width}
        height={this.props.width}
        fill={'black'}
        onDragMove={e => this.handleDragEnd(e, this.props.index, x, y)}
        draggable
        ref="rect"
        wallCoords={this.props.wallCoords}
        onClick={e => this.handleClick(e)}
      />
    );
  }
}
/*
export class Door extends Component {
  componentDidMount() {
    function boundY(pos) {
      return {
        x: pos.x,
        y: this.getAbsolutePosition().y,
      };
    }
    function boundX(pos) {
      return {
        x: this.getAbsolutePosition().x,
        y: pos.y,
      };
    }

    if (this.props.doorConfig.orientation === 'Horizontal') {
      this.refs.group.setDragBoundFunc(boundY);
    } else {
      this.refs.group.setDragBoundFunc(boundX);
    }
  }
  render() {
    const config = this.props.doorConfig;
    const doorSwing = (config.doorWidth * 2 + 3) * ((22 - 3) / (config.coolerWidth - 3));
    const doorWidth = doorSwing + 5;

    let door = {
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

    if (config.doorOrientation === 'Vertical') {
      if (config.doorSwing === 'Right') {
        if (config.doorOpening === 'Out') {
          door.x0 = config.x0;
          door.y0 = config.y0;
          door.angle = 360 - 270;
          door.rotation = 270;
          line.x0 = config.x0;
          line.y0 = config.y0;
          line.x1 = config.x0 + doorWidth;
          line.y1 = config.y0;
          line2.x0 = config.x0;
          line2.y0 = config.y0;
          line2.x1 = config.x0 + doorWidth;
          line2.y1 = config.y0;
        } else {
          door.x0 = config.x0;
          door.y0 = config.y0;
          door.angle = 360 - 90;
          door.rotation = 90;
          line.x0 = config.x0;
          line.y0 = config.y0;
          line.x1 = config.x0;
          line.y1 = config.y0 + doorWidth;
          line2.x0 = config.x0;
          line2.y0 = config.y0;
          line2.x1 = config.x0 + doorWidth;
          line2.y1 = config.y0;
        }
      } else {
        if (config.doorOpening === 'Out') {
          door.x0 = config.x0 + doorWidth;
          door.y0 = config.y0;
          door.angle = 360 - 180;
          door.rotation = 270;
          line.x0 = config.x0 + doorWidth;
          line.y0 = config.y0;
          line.x1 = config.x0 + doorWidth;
          line.y1 = config.y0 - doorWidth;
          line2.x0 = config.x0;
          line2.y0 = config.y0;
          line2.x1 = config.x0 + doorWidth;
          line2.y1 = config.y0;
        } else {
          door.x0 = config.x0 + doorWidth;
          door.y0 = config.y0;
          door.angle = 360 - 90;
          door.rotation = 180;
          line.x0 = config.x0 + doorWidth;
          line.y0 = config.y0;
          line.x1 = config.x0 + doorWidth;
          line.y1 = config.y0 + doorWidth;
          line2.x0 = config.x0;
          line2.y0 = config.y0;
          line2.x1 = config.x0 + doorWidth;
          line2.y1 = config.y0;
        }
      }
    }

    if (config.doorOrientation === 'Horizontal') {
      if (config.doorSwing === 'Right') {
        if (config.doorOpening === 'Out') {
          door.x0 = config.x0;
          door.y0 = config.y0;
          door.angle = 360 - 270;
          door.rotation = 270;
          line.x0 = config.x0;
          line.y0 = config.y0;
          line.x1 = config.x0;
          line.y1 = config.y0 - doorWidth;
          line2.x0 = config.x0;
          line2.y0 = config.y0;
          line2.x1 = config.x0 + doorWidth;
          line2.y1 = config.y0;
        } else {
          door.x0 = config.x0;
          door.y0 = config.y0;
          door.angle = 360 - 90;
          door.rotation = 90;
          line.x0 = config.x0;
          line.y0 = config.y0;
          line.x1 = config.x0;
          line.y1 = config.y0 + doorWidth;
          line2.x0 = config.x0;
          line2.y0 = config.y0;
          line2.x1 = config.x0 + doorWidth;
          line2.y1 = config.y0;
        }
      } else {
        if (config.doorOpening === 'Out') {
          door.x0 = config.x0 + doorWidth;
          door.y0 = config.y0;
          door.angle = 360 - 180;
          door.rotation = 270;
          line.x0 = config.x0 + doorWidth;
          line.y0 = config.y0;
          line.x1 = config.x0 + doorWidth;
          line.y1 = config.y0 - doorWidth;
          line2.x0 = config.x0;
          line2.y0 = config.y0;
          line2.x1 = config.x0 + doorWidth;
          line2.y1 = config.y0;
        } else {
          door.x0 = config.x0 + doorWidth;
          door.y0 = config.y0;
          door.angle = 360 - 90;
          door.rotation = 180;
          line.x0 = config.x0 + doorWidth;
          line.y0 = config.y0;
          line.x1 = config.x0 + doorWidth;
          line.y1 = config.y0 + doorWidth;
          line2.x0 = config.x0;
          line2.y0 = config.y0;
          line2.x1 = config.x0 + doorWidth;
          line2.y1 = config.y0;
        }
      }
    }
    return (
      <Group ref="group" draggable={true} onDragStart={() => console.log('clicked')}>
        <Rect x={door.x0} y={door.y0 - 50} width={50} height={50} />
        <Arc
          x={door.x0}
          y={door.y0}
          innerRadius={doorSwing}
          outerRadius={doorSwing - 1}
          angle={door.angle}
          rotation={door.rotation}
          anticlockwise={true}
          fill="#94618E"
          dash={[5, 15]}
          dashEnabled
          onClick={() => console.log('click')}
        />
        <Line points={[line.x0, line.y0, line.x1, line.y1]} stroke={4} strokeWidth={1} />
        <Line points={[line2.x0, line2.y0, line2.x1, line2.y1]} stroke={'green'} strokeWidth={1} />
      </Group>
    );
  }
}
*/
export default Door;
