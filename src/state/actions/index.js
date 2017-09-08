/*
This module contains action creators. They are functions which will return an object describing the actions.
These actions are imported by Redux-aware components who need them.
*/

var constants = require('../../constants');

export function selectWall(x, y, wallIndex) {
  return { type: constants.SELECT_WALL, x, y, wallIndex };
}
export function selectDoor(wallIndex, doorIndex) {
  return { type: constants.SELECT_DOOR, wallIndex, doorIndex };
}
export function addDoor(width) {
  return { type: constants.ADD_DOOR, width };
}
export function moveDoor(coords, index, wallIndex) {
  return { type: constants.MOVE_DOOR, coords, index, wallIndex };
}
export function endDoorMove(coords, index, wallIndex) {
  return { type: constants.END_DOOR_MOVE, coords, index, wallIndex };
}
export function moveWall(coords, index) {
  return { type: constants.MOVE_WALL, coords, index };
}
export function endWallMove(coords, index) {
  return { type: constants.END_WALL_MOVE, coords, index };
}
export function flipDoor() {
  return { type: constants.FLIP_DOOR };
}
export function reverseDoor() {
  return { type: constants.REVERSE_DOOR };
}
export function addWall() {
  return { type: constants.ADD_WALL };
}
export function deleteWall() {
  return { type: constants.DELETE_WALL };
}
export function deleteDoor() {
  return { type: constants.DELETE_DOOR };
}
export function selectConfig(config) {
  return { type: constants.SELECT_CONFIG, selectedConfig: config };
}
export function addLabel(coords, text) {
  return { type: constants.ADD_LABEL, text };
}
export function moveLabel(coords, index) {
  return { type: constants.MOVE_LABEL, coords, index };
}
export function selectLabel(index) {
  return { type: constants.SELECT_LABEL, index };
}
export function deleteLabel() {
  return { type: constants.DELETE_LABEL };
}
export function clearDiagram() {
  return { type: constants.CLEAR_DIAGRAM };
}
