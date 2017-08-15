import { provideState, softUpdate } from 'freactal';

const config = {
  three: {
    walls: [{ x0: 100, y0: 100, x1: 100, y1: 100, orientation: 'Vertical' }],
    doors: [
      {
        lpDivisor: 2,
        wpDivisor: 1,
        x0: 200,
        y0: 100,
        orientation: 'Horizontal',
        sw: 'Right',
        li: 1000,
        op: 'Out',
        w: 36,
      },
      {
        lpDivisor: 1,
        wpDivisor: 1,
        x0: 100,
        y0: -80,
        orientation: 'Vertical',
        sw: 'Right',
        li: 1000,
        op: 'Out',
        w: 36,
      },
    ],
  },
  four: {
    walls: [
      { x0: 0, y0: 100, x1: 0, y1: 100, orientation: 'Vertical' },
      { x0: 200, y0: 100, x1: 200, y1: 100, orientation: 'Vertial' },
    ],
  },
  twelve: {
    walls: [
      { x0: 0, y0: 100, x1: 0, y1: 100, orientation: 'Vertical' },
      { x0: 200, y0: 100, x1: 200, y1: 100, orientation: 'Vertial' },
    ],
  },
};

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
    config,
  }),
  computed: {
    lengthInPixels: ({ lengthFeet, lengthInches }) =>
      550 * (lengthFeet * 1 + lengthInches / 12) / (lengthFeet * 1 + lengthInches / 12),
    widthInPixels: ({ lengthFeet, lengthInches, widthFeet, widthInches }) =>
      550 * (widthFeet * 1 + widthInches / 12) / (lengthFeet * 1 + lengthInches / 12),
    textHorizontal: ({ lengthFeet, lengthInches, widthFeet, widthInches }) =>
      lengthInches > 0 ? `${lengthFeet} ft ${lengthInches} in` : `${lengthFeet} ft`,
    textVertical: ({ lengthFeet, lengthInches, widthFeet, widthInches }) =>
      lengthInches > 0 ? `${widthFeet} ft ${widthInches} in` : `${widthFeet} ft`,
  },
});
