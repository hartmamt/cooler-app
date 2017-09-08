import React from 'react';
import { connect } from 'react-redux';
import { Layer, Stage, Text, Label } from 'react-konva';

import {
  selectWall,
  addDoor,
  moveDoor,
  moveWall,
  flipDoor,
  addWall,
  reverseDoor,
  endWallMove,
  endDoorMove,
  deleteWall,
  selectDoor,
  deleteDoor,
  selectConfig,
  addLabel,
  moveLabel,
  selectLabel,
  deleteLabel,
  clearDiagram,
} from '../state/actions';
import Walls from './Walls';
import MeasureLines from './MeasureLines';

/*
<div className="container">


				<div className="design-designer">
<div className="dim">
<h3>Customizing Your Walk-In</h3>
<div className="dim-buttons">
<a href="#restart" onclick="javascript:restart();"><img src="http://polarkingdev.com/wp-content/uploads/2016/09/clear-diagram-min.png" alt="dt-restart-min" style="padding-right: 10px; height: 50px;"></a> <a href="http://polarkingdev.com/?page_id=13"><img src="http://polarkingdev.com/wp-content/uploads/2016/09/choose-new-diagram-min.png" alt="dt-back-min" style="padding-right: 15px; height: 50px; align: right;"></a> <a href="#"><img src="http://polarkingdev.com/wp-content/uploads/2016/09/download-min.png" alt="dt-finish-min" style="padding-right: 15px; height: 50px;"></a>
</div>
<p><span style="padding-right: 20px;"><b>Length</b></span><input id="lft" size="4" type="text" value="22" onchange="javascript:drawFromEntry();" style="background-image: url('http://polarkingdev.com/wp-content/uploads/2016/08/CustomCooler-FT-3.png'); marginRight: 20px;">&nbsp;&nbsp;<input id="lin" size="4" type="text" value="0" onchange="javascript:drawFromEntry();" style="background-image: url('http://polarkingdev.com/wp-content/uploads/2016/08/CustomCooler-IN.png');"><span style="padding-right: 20px; padding-left: 40px;"><b>Width</b></span><input id="wft" size="4" type="text" value="16" onchange="javascript:drawFromEntry();" style="background-image: url('http://polarkingdev.com/wp-content/uploads/2016/08/CustomCooler-FT-3.png'); marginRight: 20px;">&nbsp;&nbsp;<input id="win" size="4" type="text" value="0" onchange="javascript:drawFromEntry();" style="background-image: url('http://polarkingdev.com/wp-content/uploads/2016/08/CustomCooler-IN.png');">
</p></div>
<p><br className="clearfix"></p>
<div className="design-mid">
<canvas id="myCanvas" style="border: 1px solid #c3c3c3; background-color: rgba(245,245,245,1);" width="750" height="625"><br>
Your browser does not support the HTML5 canvas tag.<br>
</canvas><p></p>
<p><input id="length" type="hidden" value="22"><br>
<input id="width" type="hidden" value="16"><br>
<input id="hwallcount" type="hidden" value="0"><br>
<input id="vwallcount" type="hidden" value="1"><br>
<input id="labelcount" type="hidden" value="0"><br>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
</p></div>
<div className="design-right">
<h2>Toolbox</h2>
<h3>Doors</h3>
<div className="center-door-icons">
<div style="width: 50px; float: left; lineHeight: '11px'px; textAlign: center; marginRight: 10px;"><a href="#adddoor" onclick="javascript:addDoor(36);" style="fontSize:10px; lineHeight: '11px'px;"><img src="http://polarkingdev.com/wp-content/uploads/2016/07/DT-blue-door-min.png" alt="dt-blue-door-min" style="height:50px;paddingBottom: 10px;">36″ DOOR</a></div>
<div style="width: 50px; float: left; lineHeight: '11px'px; textAlign: center; marginRight: 10px;"><a href="#adddoor" onclick="javascript:addDoor(48);" style="fontSize:10px; lineHeight: '11px'px;"><img src="http://polarkingdev.com/wp-content/uploads/2016/07/DT-blue-door-min.png" alt="dt-blue-door-min" style="height:50px;paddingBottom: 10px;">48″ DOOR</a></div>
<div style="width: 50px; float: left; lineHeight: '11px'px; textAlign: center;"><a href="#adddoor" onclick="javascript:addDoor(54);" style="fontSize:10px; lineHeight: '11px'px;"><img src="http://polarkingdev.com/wp-content/uploads/2016/07/DT-blue-door-min.png" alt="dt-blue-door-min" style="height:50px;paddingBottom: 10px;">54″ DOOR</a></div>
</div>
<div className="center-wall-icons">
<div style="width: 50px; float: left; lineHeight: '11px'px; textAlign: center; margin-top: 20px;"><a href="#adddoor" onclick="javascript:flipSwing();" style="fontSize:10px; lineHeight: '11px'px;"><img src="http://polarkingdev.com/wp-content/uploads/2016/10/FlipSwing1.png" alt="dt-blue-door-min" style="height:50px;paddingBottom: 10px;">FLIP SWING</a></div>
<div style="width: 50px; float: right; lineHeight: '11px'px; textAlign: center; margin-top: 20px;"><a href="#adddoor" onclick="javascript:flipDoor();" style="fontSize:10px; lineHeight: '11px'px;"><img src="http://polarkingdev.com/wp-content/uploads/2017/05/DoorFlip.png" alt="dt-blue-door-min" style="height:50px;paddingBottom: 10px;">FLIP DOOR</a></div>
</div>
<p><br className="clearfix"></p>
<h3>Walls</h3>
<div className="center-wall-icons">
<div style="width: 50px; float: left; lineHeight: '11px'px; textAlign: center;"><a href="#addwall" onclick="javascript:addVerticalWall();" style="fontSize:10px; lineHeight: '11px'px;"><img src="http://polarkingdev.com/wp-content/uploads/2016/08/VerticalWall.png" alt="dt-blue-wall-min" style="height:50px;paddingBottom: 10px;">VERTICAL WALL</a></div>
<div style="width: 50px; float: right; lineHeight: '11px'px; textAlign: center;"><a href="#addwall" onclick="javascript:addHorizontalWall();" style="fontSize:10px; lineHeight: '11px'px;"><img src="http://polarkingdev.com/wp-content/uploads/2016/08/HorizontalWall.png" alt="dt-blue-wall-min" style="height:50px;paddingBottom: 10px;">HORIZONTAL WALL</a></div>
</div>
<p><br className="clearfix"></p>
<h2 className="border-top">Labels</h2>
<div style="textAlign:center;">
<a href="#addLabel" onclick="javascript:addLabel('35 Degree Cooler');"><img src="http://polarkingdev.com/wp-content/uploads/2016/07/DT-label-35-degree-min.png" alt="dt-label-35-degree-min" style="height:50px; margin-top: 10px; margin-bottom:10px; marginRight: 10px;"></a> <a href="#addLabel" onclick="javascript:addLabel('-10 Degree Cooler');"><img src="http://polarkingdev.com/wp-content/uploads/2016/07/DT-label-10-below-min.png" alt="dt-label-10-below-min" style="height:50px;"></a><p></p>
<p><a href="#addLabel" onclick="javascript:addLabel('0 Degree Freezer');"><img src="http://polarkingdev.com/wp-content/uploads/2016/07/DT-label-zero-degree-min.png" alt="dt-label-zero-degree-min" style="height:50px; margin-bottom:10px; marginRight: 10px;"></a> <a href="#addLabel" onclick="javascript:addLabel('Dry Storage');"><img src="http://polarkingdev.com/wp-content/uploads/2016/07/DT-label-dry-storage-min.png" alt="dt-label-dry-storage-min" style="height:50px;"></a>
</p></div>
<h3>Highlight element.<br>Click to remove.</h3>
<div style="textAlign:center;"><a href="#removewall" onclick="javascript:removeItem();"><img src="http://polarkingdev.com/wp-content/uploads/2016/08/RemoveIcon-2.png" alt="dt-blue-wall-remove-min" style="height:50px; padding-right: 10px;"></a></div>
</div>
<div className="add-options">
<h3>Additional Options:</h3>
<table width="100%">
<tbody><tr>
<td><input type="checkbox" style="marginRight: 5px;">3-Phase Electrical</td>
<td><input type="checkbox" style="marginRight: 5px;">Interior Door Ramp</td>
<td><input type="checkbox" style="marginRight: 5px;">Exterior Lighting</td>
</tr>
<tr>
<td><input type="checkbox" style="marginRight: 5px;">Digital Thermometer w/ Temp. Alarm</td>
<td><input type="checkbox" style="marginRight: 5px;">Shelving Package</td>
<td><input type="checkbox" style="marginRight: 5px;">Glass Display Doors</td>
</tr>
<tr>
<td><input type="checkbox" style="marginRight: 5px;">Exterior Door Ramp</td>
<td><input type="checkbox" style="marginRight: 5px;">Custom Exterior Finish</td>
<td><input type="checkbox" style="marginRight: 5px;">Pallet-jack Floor</td>
</tr>
<tr>
<td><input type="checkbox" style="marginRight: 5px;">Floor Drain (Coolers Only)</td>
<td><input type="checkbox" style="marginRight: 5px;">Door View Window</td>
<td><input type="checkbox" style="marginRight: 5px;">Temp. Recorder</td>
</tr>
</tbody></table>
</div>
<p><br className="clearfix">
</p></div>



			</div>
      */
const Cooler = state => {
  const labels = state.cooler.config[state.cooler.selectedConfig].labels.map((label, counter) =>
    <Label
      key={'label-' + counter}
      x={label.x}
      y={label.y}
      fontSize={'30px'}
      fontWeight="bold"
      fontFamily={'Arial'}
      align={'center'}
      zIndex={1000}
      draggable
      onDragEnd={e => {
        console.log('e', e);
        state.moveLabel({ x: e.target.attrs.x, y: e.target.attrs.y }, counter);
      }}
      onClick={() => state.selectLabel(counter)}
    >
      <Text
        text={label.text}
        fontFamily="Calibri"
        fontSize={18}
        padding={5}
        fill={label.selected ? 'red' : 'black'}
      />
    </Label>
  );
  return (
    // <div className="page-head page-head-left clearfix">
    //   <div className="entry-content">
    //     <div className="container">
    <div className="design-designer">
      <div className="dim">
        <h3>Customizing Your Walk-In</h3>
        <div className="dim-buttons">
          <a href="#restart" onClick={() => state.clearDiagram()}>
            <img
              src="http://polarkingdev.com/wp-content/uploads/2016/09/clear-diagram-min.png"
              alt="dt-restart-min"
              style={{ paddingRight: 10, height: 50 }}
            />
          </a>
          <a href="http://polarkingdev.com/?page_id=13">
            <img
              src="http://polarkingdev.com/wp-content/uploads/2016/09/choose-new-diagram-min.png"
              alt="dt-back-min"
              style={{ paddingRight: 15, height: 50, align: 'right' }}
            />
          </a>
          <a href="#">
            <img
              src="http://polarkingdev.com/wp-content/uploads/2016/09/download-min.png"
              alt="dt-finish-min"
              style={{ paddingRight: 15, height: 50 }}
            />
          </a>
        </div>
        <p>
          <span style={{ paddingRight: 20 }}>
            <b>Length</b>
          </span>
          <input id="lft" size="4" type="text" value="22" style={{ marginRight: 20 }} />&nbsp;&nbsp;
          <input id="lin" size="4" type="text" value="0" />
          <span style={{ paddingRight: 20, paddingLeft: 40 }}>
            <b>Width</b>
          </span>
          <input id="wft" size="4" type="text" value="16" style={{ marginRight: 20 }} />&nbsp;&nbsp;
          <input id="win" size="4" type="text" value="0" />
        </p>
      </div>
      <p>
        <br className="clearfix" />
      </p>
      <div className="design-mid">
        <div>
          <Stage
            width={750}
            height={625}
            style={{ border: '1px solid #c3c3c3', backgroundColor: 'rgba(245,245,245,1)' }}
          >
            <Layer>
              {labels}
              <Walls
                walls={state.cooler.config[state.cooler.selectedConfig].walls}
                handleSelectWall={state.selectWall}
                handleDoorMove={state.moveDoor}
                handleWallMove={state.moveWall}
                handleDoorFlip={state.flipDoor}
                handleDoorReverse={state.reverseDoor}
                handleEndWallMove={state.endWallMove}
                handleEndDoorMove={state.endDoorMove}
                handleSelectDoor={state.selectDoor}
              />
              <MeasureLines walls={state.cooler.config[state.cooler.selectedConfig].walls} />
            </Layer>
          </Stage>
        </div>
        <p />
        <p />
      </div>
      <div className="design-right">
        <h2>Toolbox</h2>
        <h3>Doors</h3>
        <div className="center-door-icons">
          <div
            style={{
              width: 50,
              float: 'left',
              lineHeight: '11px',
              textAlign: 'center',
              marginRight: 10,
            }}
          >
            <a
              href="#adddoor"
              style={{ fontSize: 10, lineHeight: '11px' }}
              onClick={() => state.addDoor(36)}
            >
              <img
                src="http://polarkingdev.com/wp-content/uploads/2016/07/DT-blue-door-min.png"
                alt="dt-blue-door-min"
                style={{ height: 50, paddingBottom: 10 }}
              />36″ DOOR
            </a>
          </div>
          <div
            style={{
              width: 50,
              float: 'left',
              lineHeight: '11px',
              textAlign: 'center',
              marginRight: 10,
            }}
          >
            <a
              href="#adddoor"
              style={{ fontSize: 10, lineHeight: '11px' }}
              onClick={() => state.addDoor(48)}
            >
              <img
                src="http://polarkingdev.com/wp-content/uploads/2016/07/DT-blue-door-min.png"
                alt="dt-blue-door-min"
                style={{ height: 50, paddingBottom: 10 }}
              />48″ DOOR
            </a>
          </div>
          <div style={{ width: 50, float: 'left', lineHeight: '11px', textAlign: 'center' }}>
            <a
              href="#adddoor"
              style={{ fontSize: 10, lineHeight: '11px' }}
              onClick={() => state.addDoor(54)}
            >
              <img
                src="http://polarkingdev.com/wp-content/uploads/2016/07/DT-blue-door-min.png"
                alt="dt-blue-door-min"
                style={{ height: 50, paddingBottom: 10 }}
              />54″ DOOR
            </a>
          </div>
        </div>
        <div className="center-wall-icons">
          <div
            style={{
              width: 50,
              float: 'left',
              lineHeight: '11px',
              textAlign: 'center',
              marginTop: 20,
            }}
          >
            <a
              href="#adddoor"
              style={{ fontSize: 10, lineHeight: '11px' }}
              onClick={() => state.flipDoor()}
            >
              <img
                src="http://polarkingdev.com/wp-content/uploads/2016/10/FlipSwing1.png"
                alt="dt-blue-door-min"
                style={{ height: 50, paddingBottom: 10 }}
              />
              FLIP SWING
            </a>
          </div>
          <div
            style={{
              width: 50,
              float: 'right',
              lineHeight: '11px',
              textAlign: 'center',
              marginTop: 20,
            }}
          >
            <a
              href="#adddoor"
              style={{ fontSize: 10, lineHeight: '11px' }}
              onClick={() => state.reverseDoor()}
            >
              <img
                src="http://polarkingdev.com/wp-content/uploads/2017/05/DoorFlip.png"
                alt="dt-blue-door-min"
                style={{ height: 50, paddingBottom: 10 }}
              />
              FLIP DOOR
            </a>
          </div>
        </div>
        <p>
          <br className="clearfix" />
        </p>
        <h3>Walls</h3>
        <div className="center-wall-icons">
          <div style={{ width: 50, float: 'left', lineHeight: '11px', textAlign: 'center' }}>
            <a
              href="#addwall"
              style={{ fontSize: 10, lineHeight: '11px' }}
              onClick={() => state.addWall()}
            >
              <img
                src="http://polarkingdev.com/wp-content/uploads/2016/08/VerticalWall.png"
                alt="dt-blue-wall-min"
                style={{ height: 50, paddingBottom: 10 }}
              />VERTICAL WALL
            </a>
          </div>
          <div style={{ width: 50, float: 'right', lineHeight: '11px', textAlign: 'center' }}>
            <a
              href="#addwall"
              style={{ fontSize: 10, lineHeight: '11px' }}
              onClick={() => state.addWall()}
            >
              <img
                src="http://polarkingdev.com/wp-content/uploads/2016/08/HorizontalWall.png"
                alt="dt-blue-wall-min"
                style={{ height: 50, paddingBottom: 10 }}
              />HORIZONTAL WALL
            </a>
          </div>
        </div>
        <p>
          <br className="clearfix" />
        </p>
        <h2 className="border-top">Labels</h2>
        <div style={{ textAlign: 'center' }}>
          <a href="#addLabel" onClick={() => state.addLabel({}, '35° F Cooler')}>
            <img
              src="http://polarkingdev.com/wp-content/uploads/2016/07/DT-label-35-degree-min.png"
              alt="dt-label-35-degree-min"
              style={{ height: 50, marginTop: 10, marginBottom: 10, marginRight: 10 }}
            />
          </a>{' '}
          <a href="#addLabel" onClick={() => state.addLabel({}, '-10° F Cooler')}>
            <img
              src="http://polarkingdev.com/wp-content/uploads/2016/07/DT-label-10-below-min.png"
              alt="dt-label-10-below-min"
              style={{ height: 50 }}
            />
          </a>
          <p />
          <p>
            <a href="#addLabel" onClick={() => state.addLabel({}, '0° F Freezer')}>
              <img
                src="http://polarkingdev.com/wp-content/uploads/2016/07/DT-label-zero-degree-min.png"
                alt="dt-label-zero-degree-min"
                style={{ height: 50, marginBottom: 10, marginRight: 10 }}
              />
            </a>
            <a href="#addLabel" onClick={() => state.addLabel({}, 'Dry Storage')}>
              <img
                src="http://polarkingdev.com/wp-content/uploads/2016/07/DT-label-dry-storage-min.png"
                alt="dt-label-dry-storage-min"
                style={{ height: 50 }}
              />
            </a>
          </p>
        </div>
        <h3>
          Highlight element.<br />Click to remove.
        </h3>
        <div style={{ textAlign: 'center' }}>
          <a
            href="#removewall"
            onClick={() => {
              state.deleteWall();
              state.deleteDoor();
              state.deleteLabel();
            }}
          >
            <img
              src="http://polarkingdev.com/wp-content/uploads/2016/08/RemoveIcon-2.png"
              alt="dt-blue-wall-remove-min"
              style={{ height: 50, paddingRight: 10 }}
            />
          </a>
        </div>
      </div>
      <div className="add-options" style={{ marginTop: '0px' }}>
        <h3>Additional Options:</h3>
        <table width="100%">
          <tbody>
            <tr>
              <td>
                <input type="checkbox" style={{ marginRight: 5 }} />3-Phase Electrical
              </td>
              <td>
                <input type="checkbox" style={{ marginRight: 5 }} />Interior Door Ramp
              </td>
              <td>
                <input type="checkbox" style={{ marginRight: 5 }} />Exterior Lighting
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" style={{ marginRight: 5 }} />Digital Thermometer w/ Temp.
                Alarm
              </td>
              <td>
                <input type="checkbox" style={{ marginRight: 5 }} />Shelving Package
              </td>
              <td>
                <input type="checkbox" style={{ marginRight: 5 }} />Glass Display Doors
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" style={{ marginRight: 5 }} />Exterior Door Ramp
              </td>
              <td>
                <input type="checkbox" style={{ marginRight: 5 }} />Custom Exterior Finish
              </td>
              <td>
                <input type="checkbox" style={{ marginRight: 5 }} />Pallet-jack Floor
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" style={{ marginRight: 5 }} />Floor Drain (Coolers Only)
              </td>
              <td>
                <input type="checkbox" style={{ marginRight: 5 }} />Door View Window
              </td>
              <td>
                <input type="checkbox" style={{ marginRight: 5 }} />Temp. Recorder
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    //     </div>
    //   </div>
    // </div>
  );
};

var mapStateToProps = function(state) {
  return { cooler: state.cooler };
};

var mapDispatchToProps = function(dispatch) {
  return {
    selectWall: (x, y, wallIndex) => dispatch(selectWall(x, y, wallIndex)),
    addDoor: width => dispatch(addDoor(width)),
    moveDoor: (coords, index, wallIndex) => dispatch(moveDoor(coords, index, wallIndex)),
    endDoorMove: (coords, index, wallIndex) => dispatch(endDoorMove(coords, index, wallIndex)),
    moveWall: (coords, index) => dispatch(moveWall(coords, index)),
    flipDoor: () => dispatch(flipDoor()),
    reverseDoor: () => dispatch(reverseDoor()),
    addWall: () => dispatch(addWall()),
    endWallMove: (coords, index) => dispatch(endWallMove(coords, index)),
    deleteWall: () => dispatch(deleteWall()),
    deleteDoor: () => dispatch(deleteDoor()),
    selectDoor: (wallIndex, doorIndex) => dispatch(selectDoor(wallIndex, doorIndex)),
    selectConfig: config => dispatch(selectConfig(config)),
    addLabel: (coords, text) => dispatch(addLabel(coords, text)),
    moveLabel: (coords, index) => dispatch(moveLabel(coords, index)),
    selectLabel: index => dispatch(selectLabel(index)),
    deleteLabel: () => dispatch(deleteLabel()),
    clearDiagram: () => dispatch(clearDiagram()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cooler);
