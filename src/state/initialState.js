/*
This is the initial state of the Redux Store.

It returns a function instead of an object to make sure no one can change the initial state.
*/

var C = require('../constants');

module.exports = function() {
  return {
    cooler: {
      // "persistent" data on heroes
      offsetX: 100,
      offsetY: 100,
      widthFeet: 16,
      widthInches: 0,
      lengthFeet: 22,
      lengthInches: 0,
      vWallCount: 0,
      hWallCount: 0,
      counter: 0,
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
          origY: 500,
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
  };
};
