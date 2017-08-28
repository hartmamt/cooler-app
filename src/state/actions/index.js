/*
This module contains action creators. They are functions which will return an object describing the actions.
These actions are imported by Redux-aware components who need them.
*/

var constants = require('../../constants');

export function selectWall(x, y, wallIndex) {
  return { type: constants.SELECT_WALL, x, y, wallIndex };
}
export function addDoor(width) {
  return { type: constants.ADD_DOOR, width };
}
export function moveDoor(coords, index, wallIndex) {
  return { type: constants.MOVE_DOOR, coords, index, wallIndex };
}
export function moveWall(coords, index) {
  return { type: constants.MOVE_WALL, coords, index };
}
export function flipDoor(index, wallIndex) {
  return { type: constants.FLIP_DOOR, index, wallIndex };
}
export function addWall() {
  return { type: constants.ADD_WALL };
}
