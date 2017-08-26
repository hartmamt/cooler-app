import { provideState, update } from 'freactal';

export default provideState({
  initialState: () => ({
    offsetX: 100,
    offsetY: 100,
    widthFeet: 16,
    widthInches: 0,
    lengthFeet: 22,
    lengthInches: 0,
    vWallCount: 0,
    hWallCount: 0,
    config: {
      four: {
        walls: [
          {
            //index: 0,
            x: 0,
            y: 0,
            origX: 100,
            origY: 100,
            x0: 100,
            y0: 100,
            x1: 100,
            y1: 500,
            orientation: 'Vertical',
            external: true,
            doors: [
              // {
              //   x: 100,
              //   y: 200,
              //   direction: 'left',
              //   width: 50,
              //   index: 0,
              // },
              // { x: 100, y: 400, direction: 'left', width: 50, index: 1 },
            ],
            selected: false,
          },
          {
            //index: 1,
            x: 0,
            y: 0,
            origX: 375,
            origY: 100,
            x0: 375,
            y0: 100,
            x1: 375,
            y1: 500,
            orientation: 'Vertical',
            external: false,
            doors: [
              // {
              //   x: 400,
              //   y: 200,
              //   direction: 'right',
              //   width: 50,
              //   index: 0,
              // },
            ],
            selected: false,
          },
          {
            //  index: 2,
            x: 0,
            y: 0,
            origX: 100,
            origY: 550,
            x0: 100,
            y0: 500,
            x1: 650,
            y1: 500,
            orientation: 'Horizontal',
            external: true,
            doors: [
              //  { x: 300, y: 550, direction: 'left', width: 50, index: 0 }
            ],
            selected: false,
          },
          {
            //  index: 3,
            x: 0,
            y: 0,
            origX: 100,
            origY: 100,
            x0: 100,
            y0: 100,
            x1: 650,
            y1: 100,
            orientation: 'Horizontal',
            external: true,
            doors: [
              // {
              //   x: 300,
              //   y: 100,
              //   direction: 'right',
              //   width: 75,
              //   index: 0,
              // },
              // { x: 500, y: 100, direction: 'left', width: 50, index: 1 },
            ],
            selected: false,
          },
          {
            //  index: 4,
            x: 0,
            y: 0,
            origX: 650,
            origY: 100,
            x0: 650,
            y0: 100,
            x1: 650,
            y1: 500,
            orientation: 'Vertical',
            external: true,
            doors: [
              //  { x: 100, y: 200, direction: 'left', width: 50, index: 0 }
            ],
            selected: false,
          },
        ],
      },
    },
    walls: [
      {
        //index: 0,
        x: 0,
        y: 0,
        origX: 100,
        origY: 100,
        x0: 100,
        y0: 100,
        x1: 100,
        y1: 500,
        orientation: 'Vertical',
        external: true,
        doors: [
          // {
          //   x: 100,
          //   y: 200,
          //   direction: 'left',
          //   width: 50,
          //   index: 0,
          // },
          // { x: 100, y: 400, direction: 'left', width: 50, index: 1 },
        ],
        selected: false,
      },
      {
        //index: 1,
        x: 0,
        y: 0,
        origX: 375,
        origY: 100,
        x0: 375,
        y0: 100,
        x1: 375,
        y1: 500,
        orientation: 'Vertical',
        external: false,
        doors: [
          // {
          //   x: 400,
          //   y: 200,
          //   direction: 'right',
          //   width: 50,
          //   index: 0,
          // },
        ],
        selected: false,
      },
      {
        //  index: 2,
        x: 0,
        y: 0,
        origX: 100,
        origY: 550,
        x0: 100,
        y0: 500,
        x1: 650,
        y1: 500,
        orientation: 'Horizontal',
        external: true,
        doors: [
          //  { x: 300, y: 550, direction: 'left', width: 50, index: 0 }
        ],
        selected: false,
      },
      {
        //  index: 3,
        x: 0,
        y: 0,
        origX: 100,
        origY: 100,
        x0: 100,
        y0: 100,
        x1: 650,
        y1: 100,
        orientation: 'Horizontal',
        external: true,
        doors: [
          // {
          //   x: 300,
          //   y: 100,
          //   direction: 'right',
          //   width: 75,
          //   index: 0,
          // },
          // { x: 500, y: 100, direction: 'left', width: 50, index: 1 },
        ],
        selected: false,
      },
      {
        //  index: 4,
        x: 0,
        y: 0,
        origX: 650,
        origY: 100,
        x0: 650,
        y0: 100,
        x1: 650,
        y1: 500,
        orientation: 'Vertical',
        external: true,
        doors: [
          //  { x: 100, y: 200, direction: 'left', width: 50, index: 0 }
        ],
        selected: false,
      },
    ],
  }),
  computed: {
    // lengthInPixels: ({ lengthFeet, lengthInches }) =>
    //   550 * (lengthFeet * 1 + lengthInches / 12) / (lengthFeet * 1 + lengthInches / 12),
    // widthInPixels: ({ lengthFeet, lengthInches, widthFeet, widthInches }) =>
    //   550 * (widthFeet * 1 + widthInches / 12) / (lengthFeet * 1 + lengthInches / 12),
    // textHorizontal: ({ lengthFeet, lengthInches, widthFeet, widthInches }) =>
    //   lengthInches > 0 ? `${lengthFeet} ft ${lengthInches} in` : `${lengthFeet} ft`,
    // textVertical: ({ lengthFeet, lengthInches, widthFeet, widthInches }) =>
    //   lengthInches > 0 ? `${widthFeet} ft ${widthInches} in` : `${widthFeet} ft`,
  },
  effects: {
    selectWall: (effects, x, y, wallIndex) => state => {
      const walls = state.walls.map((wall, index) => {
        if (index !== wallIndex) {
          wall.selected = false;
        }
        return wall;
      });
      walls[wallIndex].selected = !walls[wallIndex].selected;
      walls[wallIndex].selectedY = y - 20;
      walls[wallIndex].selectedX = x;
      Object.assign({}, state, { walls });
    },
    addDoor: (effects, width) => state => {
      var wdth = 0;
      var htth = 0;
      var doorswing = (width * 2 + 3) * ((wdth - 3) / (wdth - 3));
      var dooropening = width;
      wdth = 22;
      //wdth = `document.getElementById("length")`;
      //htth = document.getElementById("width"); d

      const walls = state.config['four'].walls;
      walls.map(wall => {
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
      update(state => {
        config: {
          four: {
            walls;
          }
        }
      });
    },
    moveDoor: (effects, coords, index, wallIndex) => state => {
      const walls = state.config['four'].walls;
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
      update(state => {
        config: {
          four: {
            walls;
          }
        }
      });
    },
    moveWall: (effects, coords, index) => state => {
      const walls = state.config['four'].walls;
      walls[index].x0 = walls[index].origX + coords.x;
      walls[index].x1 = walls[index].origX + coords.x;
      update(state => {
        config: {
          four: {
            walls;
          }
        }
      });
    },
    flipDoor: (effects, index, wallIndex) => state => {
      const walls = state.config['four'].walls;
      walls[wallIndex].doors[index].direction =
        walls[wallIndex].doors[index].direction === 'left' ? 'right' : 'left';
      update(state => {
        config: {
          four: {
            walls;
          }
        }
      });
    },
    checkBounds: (effects, n, o, width, index, wallIndex, wallOrientation) => state => {
      const walls = state.config['four'].walls;
      let isDraggable = true;
      const doorWidth = walls[wallIndex].doors[index].width;

      const c =
        wallOrientation === 'Vertical'
          ? walls[wallIndex].doors
              .filter((r, key) => key !== index)
              .map(r => ({ n: r.y, width: r.width }))
          : walls[wallIndex].doors
              .filter((r, key) => key !== index)
              .map(r => ({ n: r.x, width: r.width }));
      const v = wallOrientation === 'Vertical' ? n : o;
      for (let i = 0; i < c.length; i++) {
        isDraggable = v + doorWidth < c[i].n || v > c[i].n + c[i].width;
        if (isDraggable === false) {
          break;
        }
      }
      return isDraggable;
    },
    /*


    handleRectFlip = (index, wallIndex) => {
      const walls = this.props.state.config.four.walls;
      walls[wallIndex].doors[index].direction =
        walls[wallIndex].doors[index].direction === 'left' ? 'right' : 'left';
      this.setState({
        walls,
      });
    };

    handleSelectWall = (e, wallIndex) => {
      console.log('wallIndex', wallIndex);
      this.props.effects.selectWall(e.evt.clientX, e.evt.clientY, wallIndex);
    };

    handleAddDoor = width => {
      this.props.effects.addDoor(width);
    };

    handleCheckBounds = (n, o, width, index, wallIndex, wallOrientation) => {
      let isDraggable = true;
      const doorWidth = this.props.state.config.four.walls[wallIndex].doors[index].width;

      const c =
        wallOrientation === 'Vertical'
          ? this.props.state.walls[wallIndex].doors
              .filter((r, key) => key !== index)
              .map(r => ({ n: r.y, width: r.width }))
          : this.props.state.walls[wallIndex].doors
              .filter((r, key) => key !== index)
              .map(r => ({ n: r.x, width: r.width }));
      const v = wallOrientation === 'Vertical' ? n : o;
      for (let i = 0; i < c.length; i++) {
        isDraggable = v + doorWidth < c[i].n || v > c[i].n + c[i].width;
        if (isDraggable === false) {
          break;
        }
      }
      return isDraggable;
    };
    */
  },
});
