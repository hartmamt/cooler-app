//import selectWall from './walls/selectWall';
const handleEndWallMove = (walls, index) => {
  if (walls[index].orientation === 'Vertical') {
    walls[index].origX = walls[index].x0;
  } else {
    walls[index].origY = walls[index].y1;
  }

  const myY0 = walls[index].y0;
  const myX0 = walls[index].x0;
  walls.map(w => {
    if (w.orientation === 'Horizontal') {
      if (myY0 - w.y0 > -75 && myY0 - w.y0 < 0 && w.y0 !== myY0) {
        let adj = 75 - Math.abs(myY0 - w.y0);
        if (myY0 - w.y0 < 0) {
          adj = adj * -1;
        }
        if (myY0 === walls[index].y0) {
          walls[index].origY = walls[index].origY + adj;
          walls[index].y0 = walls[index].y0 + adj;
          walls[index].y1 = walls[index].y1 + adj;
        }
      } else if (myY0 - w.y0 < 75 && myY0 - w.y0 > 0 && w.y0 !== myY0) {
        let adj = 75 - Math.abs(myY0 - w.y0);
        if (myY0 === walls[index].y0) {
          walls[index].origY = walls[index].origY + adj;
          walls[index].y0 = walls[index].y0 + adj;
          walls[index].y1 = walls[index].y1 + adj;
        }
      }
    }
    if (w.orientation === 'Vertical') {
      if (myX0 - w.x0 > -75 && myX0 - w.x0 < 0 && w.x0 !== myX0) {
        let adj = 75 - Math.abs(myX0 - w.x0);
        if (myX0 - w.x0 < 0) {
          adj = adj * -1;
        }
        if (myX0 === walls[index].x0) {
          walls[index].origX = walls[index].origX + adj;
          walls[index].x0 = walls[index].x0 + adj;
          walls[index].x1 = walls[index].x1 + adj;
        }
      } else if (myX0 - w.x0 < 75 && myX0 - w.x0 > 0 && w.x0 !== myX0) {
        let adj = 75 - Math.abs(myX0 - w.x0);
        if (myX0 === walls[index].x0) {
          walls[index].origX = walls[index].origX + adj;
          walls[index].x0 = walls[index].x0 + adj;
          walls[index].x1 = walls[index].x1 + adj;
        }
      }
    }
  });

  return walls;
};
var constants = require('../../constants'),
  initialState = require('../initialState');
/*
A reducer is a function that takes the current state and an action, and then returns a
new state. This reducer is responsible for appState.heroes data.
See `initialstate.js` for a clear view of what it looks like!
*/

module.exports = function(state, action) {
  let newstate = Object.assign({}, state); // sloppily copying the old state here, so we never mutate it
  const config = newstate.selectedConfig ? newstate.selectedConfig : null;
  let walls = [];
  let newConfig = [];
  if (newstate.config) {
    newConfig = newstate.config[newstate.selectedConfig];
    walls = newstate.config[newstate.selectedConfig].walls;
  }
  const { index, coords, wallIndex } = { ...action };

  switch (action.type) {
    case constants.ADD_LABEL:
      newConfig.labels.push({ x: 200, y: 200, text: action.text });
      return newstate;

    case constants.MOVE_LABEL:
      newstate.config[newstate.selectedConfig].labels[index].x = action.coords.x;
      newstate.config[newstate.selectedConfig].labels[index].y = action.coords.y;

      return newstate;

    case constants.DELETE_LABEL:
      let labels = newstate.config[newstate.selectedConfig].labels.filter(label => !label.selected);
      newstate.config[newstate.selectedConfig].labels = labels;
      return newstate;

    case constants.SELECT_LABEL:
      console.log(action);
      walls = newConfig.walls.map((wall, index) => {
        wall.selected = false;
        wall.doors.map(door => {
          door.selected = false;
          return door;
        });
        return wall;
      });

      newstate.config[newstate.selectedConfig].labels.map((label, counter) => {
        if (counter === index) {
          label.selected = !label.selected;
        } else {
          label.selected = false;
        }
      });
      newConfig.walls = walls;
      return newstate;

    case constants.SELECT_WALL:
      console.log(action);
      walls = newConfig.walls.map((wall, index) => {
        if (index !== wallIndex) {
          wall.selected = false;
        }
        return wall;
      });
      walls[wallIndex].selected = !walls[wallIndex].selected;
      walls[wallIndex].selectedY = action.y - 20;
      walls[wallIndex].selectedX = action.x;
      newConfig.labels.map(label => (label.selected = false));
      newConfig.walls = walls;
      //}

      return newstate;

    case constants.SELECT_CONFIG:
      newstate.selectedConfig = action.selectedConfig;
      return newstate;

    case constants.SELECT_DOOR:
      walls = newConfig.walls.map((wall, index) => {
        if (index === action.wallIndex) {
          wall.doors.map((d, index) => {
            if (index === action.doorIndex) {
              d.selected = !d.selected;
            } else {
              d.selected = false;
            }
            return d;
          });
        }
        return wall;
      });
      newConfig.walls = walls;
      //}

      return newstate;

    case constants.DELETE_WALL:
      const keepWalls = newConfig.walls.filter(w => w.selected === false || w.external).map(w => {
        w.selected = false;
        return w;
      });
      newConfig.walls = keepWalls;
      return newstate;

    case constants.DELETE_DOOR:
      walls = newConfig.walls.map(w => {
        let keepDoors = w.doors.filter(d => d.selected === false);
        w.doors = keepDoors;
        return w;
      });
      newConfig.walls = walls;
      return newstate;

    case constants.ADD_WALL:
      let newWall;
      walls = newConfig.walls.map(wall => {
        let isVertical = wall.orientation === 'Vertical';
        if (wall.selected) {
          let x0;
          let y0;
          if (isVertical) {
            const xWalls = walls
              .filter(w => w.orientation === 'Vertical')
              .map(w => ({ x0: w.x0, y0: w.y0, x1: w.x1, y1: w.y1 }))
              .sort((a, b) => a.x1 - b.x1);

            const xIndex = xWalls.findIndex(w => w.x0 === wall.x0);
            let theindex = xIndex;
            // found at end - go backwards
            if (xIndex === xWalls.length - 1) {
              for (let i = xIndex; i >= 0; i--) {
                if (
                  wall.selectedY >= xWalls[i].y0 &&
                  wall.selectedY <= xWalls[i].y1 &&
                  wall.x0 !== xWalls[i].x0
                ) {
                  theindex = i;
                  break;
                }
              }
            } else if (xIndex <= xWalls.length - 1) {
              // found at least one from end - go forward
              for (let i = xIndex; i <= xWalls.length - 1; i++) {
                if (
                  wall.selectedY >= xWalls[i].y0 &&
                  wall.selectedY <= xWalls[i].y1 &&
                  wall.x0 !== xWalls[i].x0
                ) {
                  theindex = i;
                  break;
                }
              }
            } else {
              //start from 0
              for (let i = 0; i <= xWalls.length - 1; i++) {
                if (
                  wall.selectedY >= xWalls[i].y0 &&
                  wall.selectedY <= xWalls[i].y1 &&
                  wall.x0 !== xWalls[i].x0
                ) {
                  theindex = i;
                  break;
                }
              }
            }
            x0 = xWalls[theindex].x0;
          }
          if (!isVertical) {
            const yWalls = walls
              .filter(w => w.orientation === 'Horizontal')
              .map(w => ({ x0: w.x0, y0: w.y0, x1: w.x1, y1: w.y1 }))
              .sort((a, b) => a.y0 - b.y0);

            const yIndex = yWalls.findIndex(w => w.y0 === wall.y0);
            let theindex = yIndex;

            // found at end - go backwards
            if (yIndex === yWalls.length - 1) {
              for (let i = yIndex; i >= 0; i--) {
                if (
                  wall.selectedX >= yWalls[i].x0 &&
                  wall.selectedX <= yWalls[i].x1 &&
                  wall.y0 !== yWalls[i].y0
                ) {
                  theindex = i;
                  break;
                }
              }
            } else if (yIndex <= yWalls.length - 1) {
              // found at least one from end - go forward
              for (let i = yIndex; i <= yWalls.length - 1; i++) {
                if (
                  wall.selectedX >= yWalls[i].x0 &&
                  wall.selectedX <= yWalls[i].x1 &&
                  wall.y0 !== yWalls[i].y0
                ) {
                  theindex = i;
                  break;
                }
              }
            } else {
              //start from 0
              for (let i = 0; i <= yWalls.length - 1; i++) {
                if (
                  wall.selectedX >= yWalls[i].x0 &&
                  wall.selectedX <= yWalls[i].x1 &&
                  wall.y0 !== yWalls[i].y0
                ) {
                  theindex = i;
                  break;
                }
              }
            }
            y0 = yWalls[theindex].y0;
            x0 = yWalls[theindex].x0;
          }

          newWall = {
            x: 0,
            y: 0,
            origX: isVertical ? 100 : wall.selectedX,
            origY: isVertical ? wall.selectedY : wall.y0,
            x0: isVertical ? (wall.x1 > x0 ? x0 : wall.x1) : wall.selectedX,
            y0: isVertical ? wall.selectedY : wall.y1 > y0 ? y0 : wall.y1,
            x1: isVertical ? (wall.x1 > x0 ? wall.x1 : x0) : wall.selectedX,
            y1: isVertical ? wall.selectedY : wall.y1 > y0 ? wall.y1 : y0,
            orientation: isVertical ? 'Horizontal' : 'Vertical',
            external: false,
            doors: [],
            selected: false,
          };
          wall.selected = false;
        }
        return wall;
      });

      if (newWall) {
        newConfig.walls.push(newWall);
        const returnWalls = handleEndWallMove(newConfig.walls, newConfig.walls.length - 1);
        newConfig.walls = returnWalls;
      }
      return newstate;

    case constants.ADD_DOOR:
      const width = action.width; // / (12 * 25);
      var wdth = 0;
      //var htth = 0;
      var doorswing = (width * 2 + 3) * ((wdth - 3) / (wdth - 3));
      wdth = 22;
      //wdth = `document.getElementById("length")`;
      //htth = document.getElementById("width"); d

      walls = newConfig.walls.map(wall => {
        if (wall.selected) {
          wall.doors.push({
            x: wall.orientation === 'Horizontal' ? wall.selectedX : wall.x0,
            y: wall.orientation === 'Vertical' ? wall.selectedY : wall.y0,
            direction: 'right',
            width: doorswing,
            doorSwing: 'right',
            doorOpening: 'out',
            selected: false,
          });
          wall.selected = false;
        }
        let doors = wall.doors.map(d => {
          let door = d;
          door.selected = false;
          return door;
        });
        wall.doors.concat(doors);
        return wall;
      });
      newConfig.walls = walls;
      return newstate;

    case constants.MOVE_DOOR:
      const door = walls[wallIndex].doors[index];
      let stop = false;

      for (let i = 0; i < walls.length; i++) {
        if (walls[wallIndex].orientation === 'Horizontal') {
          if (walls[i].orientation === 'Vertical' && walls[i].y0 === walls[wallIndex].x0) {
            if (walls[i].x0 >= coords.x - 37.5 && walls[i].x0 <= coords.x + door.width + 37.5) {
              stop = true;
              break;
            }
          }
        }
        if (walls[wallIndex].orientation === 'Vertical') {
          if (
            walls[i].orientation === 'Horizontal' &&
            (walls[i].x0 === walls[wallIndex].x0 ||
              walls[i].x1 === walls[wallIndex].x1 ||
              (walls[i].y0 === walls[wallIndex].y0 || walls[i].y0 === walls[wallIndex].y1))
          ) {
            if (walls[i].y0 >= coords.y - 37.5 && walls[i].y0 <= coords.y + door.width + 37.5) {
              stop = true;
              break;
            }
          }
        }
      }
      if (!stop && walls[wallIndex].orientation === 'Horizontal') {
        walls[wallIndex].doors[index].x = door.direction === 'left' ? coords.x : coords.x;
      } else if (!stop) {
        walls[wallIndex].doors[index].y =
          door.direction === 'left' ? coords.y + door.width : coords.y + door.width;
      }
      newstate.walls = walls;
      return newstate;

    case constants.FLIP_DOOR:
      walls = newConfig.walls.map(w => {
        let keepDoors = w.doors.map(d => {
          let door = d;
          if (door.selected) {
            door.doorOpening = door.doorOpening === 'in' ? 'out' : 'in';
          }
          return door;
        });
        w.doors = keepDoors;
        return w;
      });
      newConfig.walls = walls;
      return newstate;

    case constants.END_DOOR_MOVE:
      console.log('we can adjust doors so they are not by walls');
      console.log('wallIndex', wallIndex);
      //find wall ends
      //
      // walls.map(wall => {
      //   if (wall.doors.length > 0) {
      //     const xArray = walls.filter(w => w.y0 === wall.x0).map(w => {
      //       return { x0: w.x0, type: 'wall' };
      //     });
      //     const dArray = wall.doors.map(d => {
      //       return { x0: d.x, type: 'door', width: d.width };
      //     });
      //     console.log('xarray', xArray);
      //     console.log('darray', dArray);
      //     if (wall.orientation === 'Horizontal') {
      //       //go through xArray
      //       // for (let i = 0; i < xArray.length; i++) {
      //       //   //array[i]
      //       //   // see if x array within range of a doors
      //       //   for (var j = 0; i < dArray.length; i++) {
      //       //     console.log('dArray', dArray[j].x);
      //       //     console.log('xArray', xArray[i]);
      //       //     if (dArray[j].x >= xArray[i] && dArray[j].x + dArray[j].width >= xArray[i]) {
      //       //       console.log('stop');
      //       //     }
      //       //   }
      //       // }
      //       // xArray.map(x => {
      //       //   wall.doors.map(d => {
      //       //     console.log(d.x);
      //       //     console.log(d.x + d.width);
      //       //     console.log(d.x <= x && d.x + d.width <= x);
      //       //   });
      //       // });
      //     }
      //   }
      // });

      newConfig.walls = walls;
      return newstate;

    case constants.REVERSE_DOOR:
      walls = newConfig.walls.map(w => {
        let keepDoors = w.doors.map(d => {
          let door = d;
          if (door.selected) {
            door.direction = door.direction === 'right' ? 'left' : 'right';
            door.doorSwing = door.doorSwing === 'right' ? 'left' : 'right';
          }
          return door;
        });
        w.doors = keepDoors;
        return w;
      });
      newConfig.walls = walls;
      return newstate;

    case constants.MOVE_WALL:
      let movedWalls = walls;

      if (walls[index].orientation === 'Vertical') {
        const xWalls = walls
          .filter(
            w => w.orientation === 'Vertical' && w.x0 !== walls[index].x0 // && w.y0 === walls[index].y0
          )
          .map(w => {
            const pos = w.x0 - walls[index].x0;
            if (Math.abs(pos) <= 75 && pos < 0) {
              return 'stopLeft';
            } else if (Math.abs(pos) <= 75 && pos > 0) {
              return 'stopRight';
            } else {
              return '';
            }
          });

        let xDoorArray = [];
        let stop = false;
        const xDoors = walls.filter(w => w.orientation === 'Horizontal');

        for (let i = 0; i < xDoors.length; i++) {
          for (let j = 0; j < xDoors[i].doors.length; j++) {
            const d = xDoors[i].doors[j];
            if (d.y >= walls[index].y0 && d.y <= walls[index].y1) {
              if (
                Math.abs(
                  Math.abs(d.x + d.width - walls[index].x0) - Math.abs(d.x - walls[index].x0 - 36)
                ) !==
                d.width + 36
              ) {
                stop = true;
                break;
              } else {
                stop = false;
              }
            }
          }
        }
        if (coords.x === -1 || coords.x === 1) {
          // let wall start dragging
          stop = false;
        }
        const stopLeft = xWalls.findIndex(w => w === 'stopLeft') > -1 && coords.x <= 0;
        const stopRight = xWalls.findIndex(w => w === 'stopRight') > -1 && coords.x >= 0;

        if (!(stop || stopLeft || stopRight)) {
          movedWalls = walls.map(w => {
            if (w.orientation === 'Horizontal' && !w.external) {
              if (w.x0 === walls[index].x0) {
                w.x0 = walls[index].origX + coords.x;
              } else if (w.x1 === walls[index].x1) {
                w.x1 = walls[index].origX + coords.x;
              }
            }
            return w;
          });
          movedWalls[index].x0 = movedWalls[index].origX + coords.x;
          movedWalls[index].x1 = movedWalls[index].origX + coords.x;
        }
      } else {
        const xWalls = walls
          .filter(
            w => w.orientation === 'Horizontal' && w.y0 !== walls[index].y0 //&& w.x0 === walls[index].x0
          )
          .map(w => {
            const pos = w.y0 - walls[index].y0;
            if (Math.abs(pos) <= 75 && pos < 0) {
              return 'stopLeft';
            } else if (Math.abs(pos) <= 75 && pos > 0) {
              return 'stopRight';
            } else {
              return '';
            }
          });

        let yDoorArray = [];
        let stop = false;
        const yDoors = walls.filter(w => w.orientation === 'Vertical');

        for (let i = 0; i < yDoors.length; i++) {
          for (let j = 0; j < yDoors[i].doors.length; j++) {
            const d = yDoors[i].doors[j];
            if (d.x >= walls[index].x0 && d.x <= walls[index].x1) {
              if (
                Math.abs(
                  Math.abs(d.y + d.width - walls[index].y0) - Math.abs(d.y - walls[index].y0)
                ) !== d.width
              ) {
                stop = true;
                break;
              } else {
                stop = false;
              }
            }
          }
        }
        if (coords.x === -1 || coords.x === 1) {
          // let wall start dragging
          stop = false;
        }

        const stopLeft = xWalls.findIndex(w => w === 'stopLeft') > -1 && coords.y <= 0;
        const stopRight = xWalls.findIndex(w => w === 'stopRight') > -1 && coords.y >= 0;

        if (!(stop || stopLeft || stopRight)) {
          movedWalls = walls.map(w => {
            if (w.orientation === 'Vertical' && !w.external) {
              if (w.y0 === walls[index].y0) {
                w.y0 = walls[index].origY + coords.y;
              } else if (w.y1 === walls[index].y1) {
                w.y1 = walls[index].origY + coords.y;
              }
            }
            return w;
          });
          movedWalls[index].y0 = movedWalls[index].origY + coords.y;
          movedWalls[index].y1 = movedWalls[index].origY + coords.y;
        }
      }
      newConfig.walls = movedWalls;
      return newstate;

    case constants.END_WALL_MOVE:
      newConfig.walls = handleEndWallMove(walls, index);
      return newstate;
    default:
      return state || initialState;
  }
};
