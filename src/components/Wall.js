import React from 'react';
import { Line, Group, Circle } from 'react-konva';

class Wall extends React.Component {
  componentDidMount() {
    function boundX(pos) {
      var newY = pos.y;
      return {
        x: this.getAbsolutePosition().x,
        y: newY,
      };
    }
    function boundY(pos) {
      var newX = pos.x;
      return {
        x: newX,
        y: this.getAbsolutePosition().y,
      };
    }
    this.refs.wall.setDragBoundFunc(this.props.wallOrientation === 'Vertical' ? boundX : boundY);
  }

  handleDragEnd = (e, index, x, y) => {
    let xPos = e.target.attrs.x;
    let yPos = e.target.attrs.y;
    e.cancelBubble = true;
    this.props.handleWallMove(
      {
        x: xPos,
        y: yPos,
      },
      index
    );
  };

  render() {
    const wall = this.props;
    return (
      <Group>
        <Line
          key={'wall-' + wall.index}
          x={0}
          y={0}
          points={wall.points}
          stroke={wall.selected ? 'red' : 'black'}
          strokeWidth={8}
          index={wall.index}
          onClick={event => wall.handleSelectWall(event.evt.clientX, event.evt.clientY, wall.index)}
          ref="wall"
          draggable
          onDragStart={e => (e.cancelBubble = true)}
          onDragMove={e => this.handleDragEnd(e, wall.index, 0, 0)}
        />
        {wall.selected
          ? <Circle
              x={wall.orientation === 'Vertical' ? wall.points[0] : wall.selectedX}
              y={wall.orientation === 'Horizontal' ? wall.points[1] : wall.selectedY}
              radius={5}
              fill="black"
            />
          : null}
      </Group>
    );
  }
}

export default Wall;
