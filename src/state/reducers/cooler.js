var constants = require('../../constants'),
  initialState = require('../initialState');

/*
A reducer is a function that takes the current state and an action, and then returns a
new state. This reducer is responsible for appState.heroes data.
See `initialstate.js` for a clear view of what it looks like!
*/

module.exports = function(state, action) {
  let newstate = Object.assign({}, state); // sloppily copying the old state here, so we never mutate it
  let walls = newstate.walls;
  const { index, coords, wallIndex } = { ...action };

  switch (action.type) {
    case constants.SELECT_WALL:
      console.log('SELECT_WALL', { action, walls, wallIndex });
      console.log('www', wallIndex);
      //if (wallIndex) {
      walls = newstate.walls.map((wall, index) => {
        if (index !== wallIndex) {
          wall.selected = false;
        }
        return wall;
      });
      walls[wallIndex].selected = !walls[wallIndex].selected;
      walls[wallIndex].selectedY = action.y - 20;
      walls[wallIndex].selectedX = action.x;
      newstate.walls = walls;
      //}

      return newstate;

    case constants.ADD_WALL:
      let newWall;
      walls = newstate.walls.map(wall => {
        let isVertical = wall.orientation === 'Vertical';
        if (wall.selected) {
          let x0;
          if (isVertical) {
            const xWalls = walls
              .filter(w => w.orientation === 'Vertical')
              .map(w => w.x0)
              .sort((a, b) => a - b);
            if (xWalls.findIndex(w => w === wall.x0) === 0) {
              x0 = xWalls[1];
            } else if (xWalls.findIndex(w => w === wall.x0) === xWalls.length - 1) {
              x0 = xWalls[xWalls.findIndex(w => w === wall.x0) - 1];
            } else {
              x0 = xWalls[xWalls.findIndex(w => w === wall.x0) + 1];
            }
          }

          newWall = {
            x: 0,
            y: 0,
            origX: isVertical ? 100 : wall.selectedX,
            origY: isVertical ? wall.selectedY : wall.y0,
            x0: isVertical ? x0 : wall.selectedX, //100 : wall.selectedX
            y0: isVertical ? wall.selectedY : 100,
            x1: isVertical ? wall.x1 : wall.selectedX, //wall.x1 : wall.selectedX,
            y1: isVertical ? wall.selectedY : wall.y1,
            orientation: isVertical ? 'Horizontal' : 'Vertical',
            external: false,
            doors: [],
            selected: false,
          };
          wall.selected = false;
        }
        return wall;
      });

      if (newWall) newstate.walls.push(newWall);
      return newstate;

    case constants.ADD_DOOR:
      const width = action.width;
      var wdth = 0;
      var htth = 0;
      var doorswing = (width * 2 + 3) * ((wdth - 3) / (wdth - 3));
      var dooropening = action.width;
      wdth = 22;
      //wdth = `document.getElementById("length")`;
      //htth = document.getElementById("width"); d

      walls = newstate.walls.map(wall => {
        if (wall.selected) {
          wall.doors.push({
            x: wall.selectedX,
            y: wall.selectedY,
            direction: 'left',
            width: doorswing,
            index: 1,
          });
          wall.selected = false;
        }
        return wall;
      });
      newstate.walls = walls;
      return newstate;

    case constants.MOVE_DOOR:
      const door = walls[wallIndex].doors[index];
      if (walls[wallIndex].orientation === 'Horizontal') {
        walls[wallIndex].doors[index].y =
          door.direction === 'left' ? coords.y + door.width + 4 : coords.y - 4;
        walls[wallIndex].doors[index].x = door.direction === 'left' ? coords.x + 0 : coords.x;
      } else {
        walls[wallIndex].doors[index].y = door.direction === 'left' ? coords.y : coords.y;
        walls[wallIndex].doors[index].x =
          door.direction === 'left' ? coords.x + door.width + 4 : coords.x - 4;
      }
      newstate.walls = walls;
      return newstate;

    case constants.FLIP_DOOR:
      walls[wallIndex].doors[index].direction =
        walls[wallIndex].doors[index].direction === 'left' ? 'right' : 'left';
      newstate.walls = walls;
      return newstate;

    case constants.MOVE_WALL:
      console.log(walls[index].orientation);
      if (walls[index].orientation === 'Vertical') {
        walls[index].x0 = walls[index].origX + coords.x;
        walls[index].x1 = walls[index].origX + coords.x;
      } else {
        console.log(coords.y);
        walls[index].y0 = walls[index].origY + coords.y;
        walls[index].y1 = walls[index].origY + coords.y;
      }
      newstate.walls = walls;
      return newstate;

    default:
      return state || initialState;
  }
};
