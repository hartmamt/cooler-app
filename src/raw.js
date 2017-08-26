var c = document.getElementById('myCanvas');
var ctx = c.getContext('2d');

var glft = 0;
var glin = 0;
var gwft = 0;
var gwin = 0;

var cw = c.width;
var ch = c.height;
var selectedLine = -1;
var selectedDoor = -1;
var selectedLabel = -1;
function reOffset() {
  var BB = c.getBoundingClientRect();
  offsetX = BB.left;
  offsetY = BB.top;
}
var offsetX, offsetY;
reOffset();
window.onscroll = function(e) {
  reOffset();
};
window.onresize = function(e) {
  reOffset();
};

// dragging vars
var isDown = false;
var startX, startY;
// line vars
var nearest = null;
var nearestDoor = null;
var nearestLabel = null;
var lines = [];
var doors = [];
var labels = [];
var measurelines = [];

var doorwdth = 0;

// listen for mouse events
$('#myCanvas').mousedown(function(e) {
  handleMouseDown(e);
});
$('#myCanvas').mousemove(function(e) {
  handleMouseMove(e);
});
$('#myCanvas').mouseup(function(e) {
  handleMouseUpOut(e);
});
$('#myCanvas').mouseout(function(e) {
  handleMouseUpOut(e);
});

$('#myCanvas').bind('mousedown touchstart', function(e) {
  handleMouseDown(e);
});

$('#myCanvas').bind('mousemove touchmove', function(e) {
  handleMouseMove(e);
});

$('#myCanvas').bind('mouseup touchend', function(e) {
  handleMouseUpOut(e);
});

drawCooler();

function restart() {
  document.getElementById('vwallcount').value = 0;
  document.getElementById('hwallcount').value = 0;
  document.getElementById('labelcount').value = 0;
  lines = [];
  doors = [];
  labels = [];
  measurelines = [];

  nearest = null;
  nearestDoor = null;
  nearestLabel = null;

  drawCooler();
}

function drawRect(x, y, l, w) {
  drawLine(lines[0], 'black');
  drawLine(lines[1], 'black');
  drawLine(lines[2], 'black');
  drawLine(lines[3], 'black');
}

function addLabel(text) {
  var count = document.getElementById('labelcount').value;
  var pos = document.getElementById('length').value * 550 / 22 / (count * 1 + 2);
  var len = document.getElementById('width').value * 400 / 16;
  document.getElementById('labelcount').value = count * 1 + 1;

  labels.push({ x0: pos - 75, y0: len, x1: 150, y1: 40, s: text });

  ctx.rect(pos - 75, len, 150, 40);
  ctx.strokeStyle = 'blue';
  ctx.stroke();

  ctx.fillStyle = 'blue';
  ctx.font = 'bold 16px Arial';
  ctx.fillText(text, pos - 65, len + 25);

  nearestLabel = null;
  selectedLabel = -1;

  draw();
}

function addVerticalWall() {
  var hCount = document.getElementById('hwallcount').value;

  if (hCount > 0) {
    return;
  }
  var count = document.getElementById('vwallcount').value;
  if (count < 3) {
    var pos = document.getElementById('length').value * 550 / 22 / (count * 1 + 2);
    var len = document.getElementById('width').value * 400 / 16;
    document.getElementById('vwallcount').value = count * 1 + 1;

    var li = lines.push({ x0: pos + 100, y0: 100, x1: pos + 100, y1: len + 100, s: 'Vertical' });

    count = parseInt(count) + 1;
    measurelines.push({
      x0: 100,
      y0: len + 120 + count * 10,
      x1: pos + 100,
      y1: len + 120 + count * 10,
      s: 'Horizontal',
      t: 'testing',
      li: li - 1,
      d: 1000,
    });

    nearest = null;
    selectedLine = -1;

    nearestLabel = null;
    selectedLabel = -1;
    draw();
  }
}

function addHorizontalWall() {
  var vCount = document.getElementById('vwallcount').value;

  if (vCount > 0) {
    return;
  }
  var count = document.getElementById('hwallcount').value;
  if (count < 3) {
    var len = document.getElementById('length').value * 550 / 22;
    var pos = document.getElementById('width').value * 400 / 16 / (count * 1 + 2);
    document.getElementById('hwallcount').value = count * 1 + 1;

    lines.push({ x0: 100, y0: pos + 100, x1: len + 100, y1: pos + 100, s: 'Horizontal' });

    nearest = null;
    selectedLine = -1;

    nearestLabel = null;
    selectedLabel = -1;
    draw();
  }
}

function removeItem() {
  if (nearestLabel) {
    removeLabel();
  }
  if (nearestDoor) {
    removeDoor();
  }
  if (nearest) {
    removeWall();
  }
}

function removeWall() {
  if (selectedLine >= 0) {
    var line = lines[selectedLine];

    if (line.s == 'Horizontal') {
      var count = document.getElementById('hwallcount').value;
      document.getElementById('hwallcount').value = count * 1 - 1;
    } else {
      var count = document.getElementById('vwallcount').value;
      document.getElementById('vwallcount').value = count * 1 - 1;
    }

    lines.splice(selectedLine, 1);

    //loop through doors array
    for (var j = 0; j < doors.length; j++) {
      //remove associated doors
      if (doors[j].li == selectedLine) {
        doors.splice(j, 1);
      }

      //decrement the index count for doors associated with lines with a larger index than the one deleted
      if (doors[j].li > selectedLine) {
        doors[j].li = doors[j].li - 1;
      }
    }

    //loop through measurelines array
    for (var j = 0; j < measurelines.length; j++) {
      //remove associated doors
      if (measurelines[j].li == selectedLine) {
        measurelines.splice(j, 1);
      }

      //decrement the index count for measureilnes associated with lines with a larger index than the one deleted
      if (measurelines[j].li > selectedLine) {
        measurelines[j].li = measurelines[j].li - 1;
      }
    }

    nearest = null;
    selectedLine = -1;
    draw();
  }

  var hcount = document.getElementById('hwallcount').value;
  var vcount = document.getElementById('vwallcount').value;
}

function removeDoor() {
  if (selectedDoor >= 0) {
    var door = doors[selectedDoor];

    doors.splice(selectedDoor, 1);

    //loop through measurelines array
    for (var j = 0; j < measurelines.length; j++) {
      //remove associated doors
      if (measurelines[j].d == selectedDoor) {
        measurelines.splice(j, 1);
      }

      //decrement the index count for measureilnes associated with lines with a larger index than the one deleted
      if (measurelines[j].d > selectedDoor) {
        measurelines[j].d = measurelines[j].d - 1;
      }
    }

    nearestDoor = null;
    selectedDoor = -1;

    draw();
  }
}

function removeLabel() {
  if (selectedLabel >= 0) {
    var label = labels[selectedLabel];

    if (labels.length > 1) {
      labels.splice(selectedLabel, 1);
    } else {
      labels = [];
    }

    nearestLabel = null;
    selectedLabel = -1;

    draw();
  }
}

function addDoor(w) {
  if (selectedLine >= 0) {
    var line = lines[selectedLine];
    if (line.s == 'Vertical') {
      var ypos = nearest.pt.y;

      if (ypos < 230) {
        ypos = 230;
      }
      var di = doors.push({
        x0: nearest.pt.x,
        y0: ypos,
        s: 'Vertical',
        sw: 'Right',
        li: selectedLine,
        op: 'Out',
        w: w,
      });

      measurelines.push({
        x0: nearest.pt.x + 20,
        y0: ypos,
        x1: nearest.pt.x + 20,
        y1: ypos + 200,
        s: 'Vertical',
        t: 'testing',
        li: selectedLine,
        d: di - 1,
      });
    } else {
      var xpos = nearest.pt.x;

      if (xpos > 500) {
        xpos = 500;
      }
      var di = doors.push({
        x0: xpos,
        y0: nearest.pt.y,
        s: 'Horizontal',
        sw: 'Right',
        li: selectedLine,
        op: 'Out',
        w: w,
      });

      measurelines.push({
        x0: 100,
        y0: nearest.pt.y - 10,
        x1: xpos,
        y1: nearest.pt.y - 10,
        s: 'Horizontal',
        t: 'testing',
        li: selectedLine,
        d: di - 1,
      });
    }

    nearest = null;
    selectedLine = -1;
    draw();
  }
}

function drawBaseCooler() {
  //ctx.lineWidth = 4;
  //ctx.clearRect(0,0,cw,ch);
  //ctx.beginPath();

  var lft = document.getElementById('lft');
  var lin = document.getElementById('lin');
  var wft = document.getElementById('wft');
  var win = document.getElementById('win');

  if (lft.value < 8) {
    alert('Minimum cooler lengh is 8 feet.');
    lft.value = 8;
    lin.value = 0;
    glft = 0;
  }

  if (lft.value > 65) {
    alert('Maximum cooler lengh is 65 feet.');
    lft.value = 65;
    lin.value = 0;
    glft = 0;
  }

  if (wft.value < 6) {
    alert('Minimum cooler width is 6 feet.');
    wft.value = 6;
    win.value = 0;
    gwft = 0;
  }

  if (wft.value > 16) {
    alert('Maximum cooler width is 16 feet.');
    wft.value = 16;
    win.value = 0;
    gwft = 0;
  }

  var l = lft.value * 1 + lin.value / 12;
  var w = wft.value * 1 + win.value / 12;

  var origw = document.getElementById('width').value;
  var origl = document.getElementById('length').value;

  document.getElementById('length').value = l;
  document.getElementById('width').value = w;

  var lp = 550 * l / l;
  var wp = 550 * w / l;
  var origwp = 550 * origw / origl;

  drawScaleDots(cw, ch, wp / w);

  //drawRect(100,100,lp,wp);
  //ctx.rect(100,100,lp,wp);
  //ctx.strokeStyle='black';
  //ctx.stroke();

  //var len = ((l * 550) / 22) + 100;
  //var wid = ((w * 400) / 16) + 100;

  //lines.push({x0:100, y0:100, x1:len, y1:100, s:'Horizontal'});
  //lines.push({x0:100, y0:wid, x1:len, y1:wid, s:'Horizontal'});
  //lines.push({x0:100, y0:100, x1:100, y1:wid, s:'Vertical'});
  //lines.push({x0:len, y0:100, x1:len, y1:wid, s:'Vertical'});

  //nearest=null;
  //selectedLine = -1;

  var s;
  var cb;
  var ca;
  var d = 0;

  // draw all lines at their current positions
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].s == 'Horizontal') {
      cb = lines[i].x1;
      lines[i].x1 = lp + 100;
      if (i == 0) {
        lines[i].y0 = 100;
        lines[i].y1 = 100;
      }

      if (i == 2 && glft >= 0 && gwft == 0) {
        lines[i].y0 = wp + 100;
        lines[i].y1 = wp + 100;

        if (!isDown) {
          glft = 0;
        }
      }

      ca = lines[i].x1;
      s = 'Horizontal';
      d = cb - ca;
    }

    if (lines[i].s == 'Vertical') {
      cb = lines[i].y1;
      lines[i].y1 = wp + 100;
      if (i == 3) {
        lines[i].x0 = 100;
        lines[i].x1 = 100;
      }
      ca = lines[i].y1;
      s = 'Vertical';
      d = cb - ca;
    }
    drawLine(lines[i], 'black');
  }

  // draw all doors at their current positions
  for (var j = 0; j < doors.length; j++) {
    //if door is off the cooler (because of scaling), put it back
    if (doors[j].s == 'Vertical') {
      if (doors[j].y0 > wp + 100) {
        var dist = (origwp - doors[j].y0) / origwp * wp;

        doors[j].y0 = wp + dist;
      }
    }

    // if door is attached to moving line, move doors also
    if (doors[j].li == selectedLine) {
      if (doors[j].s == 'Vertical') {
        doors[j].x0 = lines[selectedLine].x0;
      } else {
        doors[j].y0 = lines[selectedLine].y0;
      }
    }

    drawDoor(doors[j], 'black');
  }

  //draw all measure lines at their curent positions
  for (var i = 0; i < measurelines.length; i++) {
    //if measure line is attached to moving line, move measure line accordingly
    if (measurelines[i].li == selectedLine) {
      if (lines[selectedLine].s == 'Vertical') {
        if (measurelines[i].s == 'Horizontal') {
          measurelines[i].x1 = lines[selectedLine].x0;
        }

        if (measurelines[i].s == 'Vertical') {
          //var offset = measurelines[i].x0 - lines[selectedLine].x0;
          var offset = 20;
          measurelines[i].x0 = lines[selectedLine].x0 + offset;
          measurelines[i].x1 = lines[selectedLine].x0 + offset;
        }
      }

      if (lines[selectedLine].s == 'Horizontal') {
        if (measurelines[i].s == 'Vertical') {
          measurelines[i].y1 = lines[selectedLine].y0;
        }

        if (measurelines[i].s == 'Horizontal') {
          //var offset = measurelines[i].x0 - lines[selectedLine].x0;
          var offset = 20;
          measurelines[i].y0 = lines[selectedLine].y0 + offset;
          measurelines[i].y1 = lines[selectedLine].y0 + offset;
        }
      }
    }

    //if measure line is attached to moving door, move measure line accordingly
    if (measurelines[i].d == selectedDoor) {
      if (doors[selectedDoor].s == 'Vertical') {
        measurelines[i].y0 = doors[selectedDoor].y0;
      }

      if (doors[selectedDoor].s == 'Horizontal') {
        measurelines[i].x1 = doors[selectedDoor].x0;
      }
    }

    if (measurelines[i].s == 'Horizontal') {
      cb = measurelines[i].x1;
      //measurelines[i].x1 = lp + 100;
      ca = measurelines[i].x1;
      s = 'Horizontal';
      d = cb - ca;

      var ft = Math.floor((measurelines[i].x1 - measurelines[i].x0) / lp * l);
      var inch = (measurelines[i].x1 - measurelines[i].x0) / lp * l % 1;
      measurelines[i].t = ft + ' ft ' + getInches(inch.toFixed(2)) + ' in';

      if (i == 0 && !isDown && selectedLine == 1) {
        glft = ft;
        glin = getInches(inch.toFixed(2));
        gwft = 0;
      }

      //cb = measurelines[i].y1;
      //ca = wp + 120;
      d = origwp - wp;

      if (measurelines[i].y0 > 99) {
        measurelines[i].y0 = measurelines[i].y0 - d;
        measurelines[i].y1 = measurelines[i].y1 - d;
      }
    }

    if (measurelines[i].s == 'Vertical') {
      cb = measurelines[i].y1;
      if (i != 1) {
        measurelines[i].y1 = wp + 100;
      }

      if (i == 1 && glft > 0) {
        measurelines[i].y1 = wp + 100;
      }
      ca = measurelines[i].y1;
      s = 'Vertical';
      d = cb - ca;

      //measurelines[i].t = (measurelines[i].y1 - measurelines[i].y0)/(25 * (wp / 400)) + 'ft 0 in'
      //measurelines[i].t = (measurelines[i].y1 - measurelines[i].y0) / wp * w + 'ft 0 in'
      var ft = Math.floor((measurelines[i].y1 - measurelines[i].y0) / wp * w);
      var inch = (measurelines[i].y1 - measurelines[i].y0) / wp * w % 1;
      measurelines[i].t = ft + ' ft ' + getInches(inch.toFixed(2)) + ' in';

      if (i == 1 && !isDown && selectedLine == 2) {
        gwft = ft;
        gwin = getInches(inch.toFixed(2));
      }

      // for(var m=0;m<doors.length;m++) {
      //     if (measurelines[i].d = m && measurelines[i].y0 != doors[m].y0 && measurelines[i] == 'Vertical') {
      //            measurelines[i].y1 = doors[m].y0
      //      }
      //}
    }
    drawMeasureLine(measurelines[i], 'orange');
  }

  // draw all labels at their current positions
  for (var k = 0; k < labels.length; k++) {
    drawLabel(labels[k], 'blue');
  }

  if (nearestLabel) {
    // point on label nearest to mouse
    //ctx.beginPath();
    //ctx.arc(nearestLabel.pt.x,nearestLabel.pt.y,5,0,Math.PI*2);
    ctx.rect(nearestLabel.x0, nearestLabel.y0, nearestLabel.x1, nearestLabel.y1);
    ctx.strokeStyle = 'red';
    ctx.stroke();
    // marker for original label before dragging
    if (isDown) {
      drawLabel(nearestLabel.originalLabel, 'red');
    }
    // hightlight the label as its dragged
    //drawLabel(nearestLabel.label,'blue');
  }

  // draw markers if a line is being dragged
  if (nearest) {
    // point on line nearest to mouse
    ctx.beginPath();
    ctx.arc(nearest.pt.x, nearest.pt.y, 5, 0, Math.PI * 2);
    ctx.strokeStyle = 'red';
    ctx.stroke();
    // marker for original line before dragging
    if (isDown) {
      drawLine(nearest.originalLine, 'red');
    }
    // hightlight the line as its dragged
    drawLine(nearest.line, 'red');
  }

  // draw markers if a door is being dragged
  if (nearestDoor) {
    // point on line nearest to mouse
    //ctx.beginPath();
    ctx.rect(nearestDoor.x0, nearestDoor.y0, nearestDoor.x0 + 100, nearestDoor.y0 + 100);
    ctx.strokeStyle = 'red';
    //ctx.arc(nearestDoor.pt.x,nearestDoor.pt.y,5,0,Math.PI*2);
    //ctx.strokeStyle='red';
    ctx.stroke();
    // marker for original line before dragging
    if (isDown) {
      drawDoor(nearestDoor.originalDoor, 'red');
    }
    // hightlight the line as its dragged
    drawDoor(nearestDoor.door, 'red');
  }
}

function drawScaleDots(l, w, s) {
  for (var j = 0; j < l; j += s) {
    for (var k = 0; k < w; k += s) {
      ctx.strokeStyle = 'blue';
      ctx.fillRect(j, k, 1, 1);
    }
  }
}

function drawCooler() {
  ctx.lineWidth = 4;
  ctx.clearRect(0, 0, cw, ch);
  ctx.beginPath();

  var lft = document.getElementById('lft');
  var lin = document.getElementById('lin');
  var wft = document.getElementById('wft');
  var win = document.getElementById('win');

  var l = lft.value * 1 + lin.value / 12;
  var w = wft.value * 1 + win.value / 12;

  document.getElementById('length').value = l;
  document.getElementById('width').value = w;

  //var lp = (550 * l) / 22;
  //var wp = (550 * w) / 16;
  var lp = 550 * l / l;
  var wp = 550 * w / l;

  var x = 100;
  var y = 100;

  lines.push({ x0: x, y0: y, x1: x + lp, y1: y, s: 'Horizontal' });
  lines.push({ x0: x + lp, y0: y, x1: x + lp, y1: y + wp, s: 'Vertical' });
  lines.push({ x0: x, y0: y + wp, x1: x + lp, y1: y + wp, s: 'Horizontal' });
  lines.push({ x0: x, y0: y, x1: x, y1: y + wp, s: 'Vertical' });

  //drawRect(100,100,lp,wp);
  //ctx.rect(100,100,lp,wp);
  //ctx.strokeStyle='black';
  //ctx.stroke();

  measurelines.push({
    x0: 100,
    y0: wp + 120,
    x1: lp + 100,
    y1: wp + 120,
    s: 'Horizontal',
    t: lft.value + ' ft ' + lin.value + ' in',
    li: 1,
    d: 1000,
  });
  //drawMeasureLine(measurelines[0], 'Blue');

  measurelines.push({
    x0: 80,
    y0: 100,
    x1: 80,
    y1: wp + 100,
    s: 'Vertical',
    t: wft.value + ' ft ' + win.value + ' in',
    li: 2,
    d: 1000,
  });
  //drawMeasureLine(measurelines[1], 'Blue');

  var config = getParameterByName('Config');

  if (config == '1') {
    var di = doors.push({
      x0: lp + 100,
      y0: wp - 80,
      s: 'Vertical',
      sw: 'Right',
      li: 1000,
      op: 'Out',
      w: 36,
    });
    measurelines.push({
      x0: lp + 120,
      y0: wp - 80,
      x1: lp + 120,
      y1: wp,
      s: 'Vertical',
      t: 'testing',
      li: 1000,
      d: di - 1,
    });
  }

  if (config == '2') {
    var count = document.getElementById('vwallcount').value;
    var pos = document.getElementById('length').value * 550 / l / (count * 1 + 2);
    var len = document.getElementById('width').value * 550 / l;
    document.getElementById('vwallcount').value = 1;

    doors.push({
      x0: lp / 2 - 100,
      y0: 100,
      s: 'Horizontal',
      sw: 'Right',
      li: 1000,
      op: 'Out',
      w: 36,
    });
    measurelines.push({
      x0: 100,
      y0: 90,
      x1: lp / 2 - 100,
      y1: 90,
      s: 'Horizontal',
      t: 'testing',
      li: 1000,
      d: 0,
    });

    doors.push({
      x0: lp / 2 + 200,
      y0: 100,
      s: 'Horizontal',
      sw: 'Left',
      li: 1000,
      op: 'Out',
      w: 36,
    });
    measurelines.push({
      x0: 100,
      y0: 80,
      x1: lp / 2 + 200,
      y1: 80,
      s: 'Horizontal',
      t: 'testing',
      li: 1000,
      d: 1,
    });

    lines.push({ x0: pos + 100, y0: 100, x1: pos + 100, y1: len + 100, s: 'Vertical' });
    measurelines.push({
      x0: 100,
      y0: wp + 110,
      x1: pos + 100,
      y1: wp + 110,
      s: 'Horizontal',
      t: 'testing',
      li: 4,
      d: 1000,
    });
  }

  if (config == '3') {
    var count = document.getElementById('vwallcount').value;
    var pos = document.getElementById('length').value * 550 / l / (count * 1 + 2);
    var len = document.getElementById('width').value * 550 / l;
    document.getElementById('vwallcount').value = 1;

    doors.push({
      x0: lp / 2 + 200,
      y0: 100,
      s: 'Horizontal',
      sw: 'Right',
      li: 1000,
      op: 'Out',
      w: 36,
    });
    measurelines.push({
      x0: 100,
      y0: 90,
      x1: lp / 2 + 200,
      y1: 90,
      s: 'Horizontal',
      t: 'testing',
      li: 1000,
      d: 0,
    });

    lines.push({ x0: pos + 100, y0: 100, x1: pos + 100, y1: len + 100, s: 'Vertical' });
    measurelines.push({
      x0: 100,
      y0: wp + 110,
      x1: pos + 100,
      y1: wp + 110,
      s: 'Horizontal',
      t: 'testing',
      li: 4,
      d: 1000,
    });

    doors.push({ x0: pos + 100, y0: wp - 80, s: 'Vertical', sw: 'Right', li: 4, op: 'Out', w: 36 });
    measurelines.push({
      x0: pos + 120,
      y0: wp - 80,
      x1: pos + 120,
      y1: 200,
      s: 'Vertical',
      t: 'testing',
      li: 4,
      d: 1,
    });
  }

  if (config == '4') {
    var count = document.getElementById('vwallcount').value;
    var pos = document.getElementById('length').value * 550 / l / (count * 1 + 2);
    var len = document.getElementById('width').value * 550 / l;
    document.getElementById('vwallcount').value = 1;

    doors.push({
      x0: lp / 3 - 50,
      y0: 100,
      s: 'Horizontal',
      sw: 'Right',
      li: 1000,
      op: 'Out',
      w: 36,
    });
    measurelines.push({
      x0: 100,
      y0: 90,
      x1: lp / 3 - 50,
      y1: 90,
      s: 'Horizontal',
      t: 'testing',
      li: 1000,
      d: 0,
    });

    doors.push({
      x0: lp / 3 + 150,
      y0: 100,
      s: 'Horizontal',
      sw: 'Right',
      li: 1000,
      op: 'Out',
      w: 36,
    });
    measurelines.push({
      x0: 100,
      y0: 80,
      x1: lp / 3 + 150,
      y1: 80,
      s: 'Horizontal',
      t: 'testing',
      li: 1000,
      d: 1,
    });

    doors.push({
      x0: lp / 3 + 350,
      y0: 100,
      s: 'Horizontal',
      sw: 'Right',
      li: 1000,
      op: 'Out',
      w: 36,
    });
    measurelines.push({
      x0: 100,
      y0: 70,
      x1: lp / 3 + 350,
      y1: 70,
      s: 'Horizontal',
      t: 'testing',
      li: 1000,
      d: 2,
    });

    lines.push({ x0: pos, y0: 100, x1: pos, y1: len + 100, s: 'Vertical' });
    measurelines.push({
      x0: 100,
      y0: wp + 110,
      x1: pos,
      y1: wp + 110,
      s: 'Horizontal',
      t: 'testing',
      li: 0,
      d: 1000,
    });

    lines.push({ x0: pos + 200, y0: 100, x1: pos + 200, y1: len + 100, s: 'Vertical' });
    measurelines.push({
      x0: 100,
      y0: wp + 120,
      x1: pos + 200,
      y1: wp + 120,
      s: 'Horizontal',
      t: 'testing',
      li: 5,
      d: 1000,
    });
  }

  if (config == '9') {
    ctx.rect(100, 0, lp, 100);
    ctx.strokeStyle = 'black';
    ctx.stroke();

    doors.push({
      x0: lp + 100,
      y0: wp - 80,
      s: 'Vertical',
      sw: 'Left',
      li: 1000,
      op: 'Out',
      w: 36,
    });
    measurelines.push({
      x0: lp + 120,
      y0: wp - 80,
      x1: lp + 120,
      y1: wp,
      s: 'Vertical',
      t: 'testing',
      li: 1000,
      d: 0,
    });

    doors.push({
      x0: lp / 2 + 100,
      y0: 100,
      s: 'Horizontal',
      sw: 'Right',
      li: 1000,
      op: 'Out',
      w: 36,
    });
    measurelines.push({
      x0: 100,
      y0: 90,
      x1: lp / 2 + 100,
      y1: 90,
      s: 'Horizontal',
      t: 'testing',
      li: 1000,
      d: 1,
    });
  }

  if (config == '10') {
    ctx.rect(100, 0, lp, 100);
    ctx.strokeStyle = 'black';
    ctx.stroke();

    var count = document.getElementById('vwallcount').value;
    var pos = document.getElementById('length').value * 550 / l / (count * 1 + 2);
    var len = document.getElementById('width').value * 550 / l;
    document.getElementById('vwallcount').value = 1;

    doors.push({
      x0: lp / 2 - 100,
      y0: 100,
      s: 'Horizontal',
      sw: 'Right',
      li: 1000,
      op: 'Out',
      w: 36,
    });
    measurelines.push({
      x0: 100,
      y0: 90,
      x1: lp / 2 - 100,
      y1: 90,
      s: 'Horizontal',
      t: 'testing',
      li: 1000,
      d: 0,
    });

    doors.push({
      x0: lp / 2 + 200,
      y0: 100,
      s: 'Horizontal',
      sw: 'Left',
      li: 1000,
      op: 'Out',
      w: 36,
    });
    measurelines.push({
      x0: 100,
      y0: 80,
      x1: lp / 2 + 200,
      y1: 80,
      s: 'Horizontal',
      t: 'testing',
      li: 1000,
      d: 1,
    });

    lines.push({ x0: pos + 100, y0: 100, x1: pos + 100, y1: len + 100, s: 'Vertical' });
    measurelines.push({
      x0: 100,
      y0: wp + 110,
      x1: pos + 100,
      y1: wp + 110,
      s: 'Horizontal',
      t: 'testing',
      li: 4,
      d: 1000,
    });
  }

  if (config == '11') {
    ctx.rect(100, 0, lp, 100);
    ctx.strokeStyle = 'black';
    ctx.stroke();

    var count = document.getElementById('vwallcount').value;
    var pos = document.getElementById('length').value * 550 / l / (count * 1 + 2);
    var len = document.getElementById('width').value * 550 / l;
    document.getElementById('vwallcount').value = 1;

    doors.push({
      x0: lp / 2 + 200,
      y0: 100,
      s: 'Horizontal',
      sw: 'Left',
      li: 1000,
      op: 'Out',
      w: 36,
    });
    measurelines.push({
      x0: 100,
      y0: 90,
      x1: lp / 2 + 200,
      y1: 90,
      s: 'Horizontal',
      t: 'testing',
      li: 1000,
      d: 0,
    });

    lines.push({ x0: pos + 100, y0: 100, x1: pos + 100, y1: len + 100, s: 'Vertical' });
    measurelines.push({
      x0: 100,
      y0: wp + 110,
      x1: pos + 100,
      y1: wp + 110,
      s: 'Horizontal',
      t: 'testing',
      li: 4,
      d: 1000,
    });

    doors.push({ x0: pos + 100, y0: wp - 80, s: 'Vertical', sw: 'Right', li: 4, op: 'Out', w: 36 });
    measurelines.push({
      x0: pos + 120,
      y0: wp - 80,
      x1: pos + 120,
      y1: 200,
      s: 'Vertical',
      t: 'testing',
      li: 4,
      d: 1,
    });
  }

  if (config == '12') {
    ctx.rect(100, 0, lp, 100);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    var count = document.getElementById('vwallcount').value;
    var pos = document.getElementById('length').value * 550 / l / (count * 1 + 2);
    var len = document.getElementById('width').value * 550 / l;
    document.getElementById('vwallcount').value = 2;

    doors.push({
      x0: lp / 3 + 350,
      y0: 100,
      s: 'Horizontal',
      sw: 'Left',
      li: 1000,
      op: 'Out',
      w: 36,
    });
    measurelines.push({
      x0: 100,
      y0: 90,
      x1: lp / 3 + 350,
      y1: 90,
      s: 'Horizontal',
      t: 'testing',
      li: 1000,
      d: 0,
    });

    lines.push({ x0: pos, y0: 100, x1: pos, y1: len + 100, s: 'Vertical' });
    measurelines.push({
      x0: 100,
      y0: wp + 110,
      x1: pos,
      y1: wp + 110,
      s: 'Horizontal',
      t: 'testing',
      li: 4,
      d: 1000,
    });

    lines.push({ x0: pos + 200, y0: 100, x1: pos + 200, y1: len + 100, s: 'Vertical' });
    measurelines.push({
      x0: 100,
      y0: wp + 120,
      x1: pos + 200,
      y1: wp + 120,
      s: 'Horizontal',
      t: 'testing',
      li: 5,
      d: 1000,
    });

    doors.push({ x0: pos, y0: wp / 2 + 100, s: 'Vertical', sw: 'Right', li: 4, op: 'Out', w: 36 });
    measurelines.push({
      x0: pos + 20,
      y0: wp / 2 + 100,
      x1: pos + 20,
      y1: 200,
      s: 'Vertical',
      t: 'testing',
      li: 4,
      d: 1,
    });

    doors.push({
      x0: pos + 200,
      y0: wp / 2 + 100,
      s: 'Vertical',
      sw: 'Right',
      li: 5,
      op: 'Out',
      w: 36,
    });
    measurelines.push({
      x0: pos + 220,
      y0: wp / 2 + 100,
      x1: pos + 220,
      y1: 200,
      s: 'Vertical',
      t: 'testing',
      li: 4,
      d: 1,
    });
  }

  if (config == '14') {
    ctx.rect(100, 0, lp, 100);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    var count = document.getElementById('vwallcount').value;
    var pos = document.getElementById('length').value * 550 / l / (count * 1 + 2);
    var len = document.getElementById('width').value * 550 / l;
    document.getElementById('vwallcount').value = 1;

    doors.push({
      x0: lp / 3 - 50,
      y0: 100,
      s: 'Horizontal',
      sw: 'Right',
      li: 1000,
      op: 'Out',
      w: 36,
    });
    measurelines.push({
      x0: 100,
      y0: 90,
      x1: lp / 3 - 50,
      y1: 90,
      s: 'Horizontal',
      t: 'testing',
      li: 1000,
      d: 0,
    });

    doors.push({
      x0: lp / 3 + 150,
      y0: 100,
      s: 'Horizontal',
      sw: 'Right',
      li: 1000,
      op: 'Out',
      w: 36,
    });
    measurelines.push({
      x0: 100,
      y0: 80,
      x1: lp / 3 + 150,
      y1: 80,
      s: 'Horizontal',
      t: 'testing',
      li: 1000,
      d: 1,
    });

    doors.push({
      x0: lp / 3 + 350,
      y0: 100,
      s: 'Horizontal',
      sw: 'Right',
      li: 1000,
      op: 'Out',
      w: 36,
    });
    measurelines.push({
      x0: 100,
      y0: 70,
      x1: lp / 3 + 350,
      y1: 70,
      s: 'Horizontal',
      t: 'testing',
      li: 1000,
      d: 2,
    });

    lines.push({ x0: pos, y0: 100, x1: pos, y1: len + 100, s: 'Vertical' });
    measurelines.push({
      x0: 100,
      y0: wp + 110,
      x1: pos,
      y1: wp + 110,
      s: 'Horizontal',
      t: 'testing',
      li: 4,
      d: 1000,
    });

    lines.push({ x0: pos + 200, y0: 100, x1: pos + 200, y1: len + 100, s: 'Vertical' });
    measurelines.push({
      x0: 100,
      y0: wp + 120,
      x1: pos + 200,
      y1: wp + 120,
      s: 'Horizontal',
      t: 'testing',
      li: 5,
      d: 1000,
    });
  }

  if (config == '15') {
    ctx.rect(100, 0, lp, 100);
    ctx.strokeStyle = 'black';
    ctx.stroke();
  }

  draw();
}

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

// draw the scene
function draw() {
  ctx.clearRect(0, 0, cw, ch);
  // draw cooler
  drawBaseCooler();
}

// draw the scene from manual dimension entry
function drawFromEntry() {
  ctx.clearRect(0, 0, cw, ch);
  // draw cooler
  glft = 0;
  gwft = 0;
  drawBaseCooler();
}

function drawLine(line, color) {
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.moveTo(line.x0, line.y0);
  ctx.lineTo(line.x1, line.y1);
  ctx.strokeStyle = color;
  ctx.stroke();
}

function drawMeasureLine(line, color) {
  ctx.beginPath();
  ctx.lineWidth = 0.5;
  ctx.moveTo(line.x0, line.y0);
  ctx.lineTo(line.x1, line.y1);
  ctx.strokeStyle = color;
  ctx.stroke();

  ctx.font = 'bold 10px Arial';
  if (line.s == 'Horizontal') {
    ctx.fillStyle = '#f5f5f5';

    if (line.t.substring(line.t.length - 5) == ' 0 in') {
      ctx.fillRect((line.x1 - line.x0) / 2 + line.x0, line.y0 - 5, 40, 10);
      ctx.fillStyle = color;
      ctx.fillText(line.t.substr(0, 5), (line.x1 - line.x0) / 2 + line.x0 + 10, line.y0 + 5);
    } else {
      ctx.fillRect((line.x1 - line.x0) / 2 + line.x0, line.y0 - 5, 60, 10);
      ctx.fillStyle = color;
      ctx.fillText(line.t, (line.x1 - line.x0) / 2 + line.x0 + 10, line.y0 + 5);
    }
  } else {
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(line.x0 - 5, (line.y1 - line.y0) / 2 + line.y0, 20, 15);
    ctx.fillStyle = color;
    if (line.t.substring(line.t.length - 5) == ' 0 in') {
      ctx.fillText(line.t.substr(0, 5), line.x0 - 10, (line.y1 - line.y0) / 2 + line.y0 + 10);
    } else {
      ctx.fillText(line.t, line.x0 - 10, (line.y1 - line.y0) / 2 + line.y0 + 10);
    }
  }
}

function drawLabel(label, color) {
  ctx.lineWidth = 1;
  ctx.rect(label.x0, label.y0, label.x1, label.y1);
  ctx.strokeStyle = color;
  ctx.stroke();

  ctx.fillStyle = 'blue';
  ctx.font = 'bold 16px Arial';
  ctx.fillText(label.s, label.x0 + 10, label.y0 + 25);
}

function drawDoor(door, color) {
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = color;

  var wdth = 0;
  var htth = 0;
  var doorswing = 0;
  var dooropening = door.w;
  wdth = document.getElementById('length');
  //htth = document.getElementById("width");

  doorswing = (dooropening * 2 + 3) * ((22 - 3) / (wdth.value - 3));

  doorwdth = doorswing + 5;

  if (door.s == 'Vertical') {
    if (door.sw == 'Right') {
      if (door.op == 'Out') {
        //ctx.save();
        //ctx.translate(50, 700);
        //ctx.rotate(-Math.PI / 2);

        //ctx.fillStyle = 'black';
        //ctx.fillText(dooropening.toString() + ' inch Door', door.x0 + 10, door.y0 - 10);
        //ctx.restore();

        ctx.setLineDash([5, 15]);
        ctx.arc(door.x0, door.y0, doorswing, 0, degreesToRadians(270), true);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.moveTo(door.x0, door.y0);
        ctx.lineTo(door.x0 + doorwdth, door.y0);
        ctx.stroke();

        ctx.LineWidth = 100;
        ctx.moveTo(door.x0, door.y0);
        ctx.lineTo(door.x0, door.y0 - doorwdth);
        ctx.strokeStyle = 'white';
        ctx.stroke();
      } else {
        //ctx.save();
        //ctx.translate(50, 700);
        //ctx.rotate(-Math.PI / 2);

        //ctx.fillStyle = 'black';
        //ctx.fillText(dooropening.toString() + ' inch Door', door.x0 + 10, door.y0 - 10);
        //ctx.restore();

        ctx.setLineDash([5, 15]);
        ctx.arc(door.x0, door.y0, doorswing, degreesToRadians(180), degreesToRadians(270), false);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.moveTo(door.x0, door.y0);
        ctx.lineTo(door.x0 - doorwdth, door.y0);
        ctx.stroke();

        ctx.LineWidth = 100;
        ctx.moveTo(door.x0, door.y0);
        ctx.lineTo(door.x0, door.y0 - doorwdth);
        ctx.strokeStyle = 'white';
        ctx.stroke();
      }
    } else {
      if (door.op == 'Out') {
        //ctx.save();
        //ctx.translate(50, 700);
        //ctx.rotate(-Math.PI / 2);

        //ctx.fillStyle = 'black';
        //ctx.fillText(dooropening.toString() + ' inch Door', door.x0 + 10, door.y0 - 10);
        //ctx.restore();

        ctx.setLineDash([5, 15]);
        ctx.arc(door.x0, door.y0 - doorwdth, doorswing, 0, degreesToRadians(90), false);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.moveTo(door.x0, door.y0 - doorwdth);
        ctx.lineTo(door.x0 + doorwdth, door.y0 - doorwdth);
        ctx.stroke();

        ctx.LineWidth = 100;
        ctx.moveTo(door.x0, door.y0);
        ctx.lineTo(door.x0, door.y0 - doorwdth);
        ctx.strokeStyle = 'white';
        ctx.stroke();
      } else {
        //ctx.save();
        //ctx.translate(50, 700);
        //ctx.rotate(-Math.PI / 2);

        //ctx.fillStyle = 'black';
        //ctx.fillText(dooropening.toString() + ' inch Door', door.x0 + 10, door.y0 - 10);
        //ctx.restore();

        ctx.setLineDash([5, 15]);
        ctx.arc(
          door.x0,
          door.y0 - doorwdth,
          doorswing,
          degreesToRadians(90),
          degreesToRadians(180),
          false
        );
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.moveTo(door.x0, door.y0 - doorwdth);
        ctx.lineTo(door.x0 - doorwdth, door.y0 - doorwdth);
        ctx.stroke();

        ctx.LineWidth = 100;
        ctx.moveTo(door.x0, door.y0);
        ctx.lineTo(door.x0, door.y0 - doorwdth);
        ctx.strokeStyle = 'white';
        ctx.stroke();
      }
    }
  } else {
    if (door.sw == 'Right') {
      if (door.op == 'Out') {
        //ctx.fillStyle = 'black';
        //ctx.fillText(dooropening.toString() + ' inch Door', door.x0 + 10, door.y0 - 10);

        ctx.setLineDash([5, 15]);
        ctx.arc(door.x0, door.y0, doorswing, 0, degreesToRadians(270), true);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.moveTo(door.x0, door.y0);
        ctx.lineTo(door.x0, door.y0 - doorwdth);
        ctx.stroke();

        ctx.LineWidth = 100;
        ctx.moveTo(door.x0, door.y0);
        ctx.lineTo(door.x0 + doorwdth, door.y0);
        ctx.strokeStyle = 'white';
        ctx.stroke();
      } else {
        //ctx.fillStyle = 'black';
        //ctx.fillText(dooropening.toString() + ' inch Door', door.x0 + 10, door.y0 - 10);

        ctx.setLineDash([5, 15]);
        ctx.arc(door.x0, door.y0, doorswing, degreesToRadians(90), 0, true);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.moveTo(door.x0, door.y0);
        ctx.lineTo(door.x0, door.y0 + doorwdth);
        ctx.stroke();

        ctx.LineWidth = 100;
        ctx.moveTo(door.x0, door.y0);
        ctx.lineTo(door.x0 + doorwdth, door.y0);
        ctx.strokeStyle = 'white';
        ctx.stroke();
      }
    } else {
      if (door.op == 'Out') {
        //ctx.fillStyle = 'black';
        //ctx.fillText(dooropening.toString() + ' inch Door', door.x0 + 10, door.y0 - 10);

        ctx.setLineDash([5, 15]);
        ctx.arc(
          door.x0 + doorwdth,
          door.y0,
          doorswing,
          degreesToRadians(180),
          degreesToRadians(270),
          false
        );
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.moveTo(door.x0 + doorwdth, door.y0);
        ctx.lineTo(door.x0 + doorwdth, door.y0 - doorwdth);
        ctx.stroke();

        ctx.LineWidth = 100;
        ctx.moveTo(door.x0, door.y0);
        ctx.lineTo(door.x0 + doorwdth, door.y0);
        ctx.strokeStyle = 'white';
        ctx.stroke();
      } else {
        //ctx.fillStyle = 'black';
        //ctx.fillText(dooropening.toString() + ' inch Door', door.x0 + 10, door.y0 - 10);

        ctx.setLineDash([5, 15]);
        ctx.arc(
          door.x0 + doorwdth,
          door.y0,
          doorswing,
          degreesToRadians(90),
          degreesToRadians(180),
          false
        );
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.moveTo(door.x0 + doorwdth, door.y0);
        ctx.lineTo(door.x0 + doorwdth, door.y0 + doorwdth);
        ctx.stroke();

        ctx.LineWidth = 100;
        ctx.moveTo(door.x0, door.y0);
        ctx.lineTo(door.x0 + doorwdth, door.y0);
        ctx.strokeStyle = 'white';
        ctx.stroke();
      }
    }
  }
}

// select the nearest line to the mouse
function closestLine(mx, my) {
  var dist = 100000000;
  var index = -1;
  var pt;
  for (var i = 0; i < lines.length; i++) {
    //
    var xy = closestXY(lines[i], mx, my);
    //

    if (lines[i].s == 'Horizontal') {
      if (Math.abs(lines[i].y0 - my) < 20) {
        pt = xy;
        index = i;
      }
    } else {
      if (Math.abs(lines[i].x0 - mx) < 20) {
        pt = xy;
        index = i;
      }
    }

    //var dx=mx-xy.x;
    //var dy=my-xy.y;
    //var thisDist=dx*dx+dy*dy;
    //if(thisDist<dist){
    //    dist=thisDist;
    //    pt=xy;
    //    index=i;
    //}
  }

  if (index >= 0) {
    var line = lines[index];
    selectedLine = index;
    return {
      pt: pt,
      line: line,
      originalLine: { x0: line.x0, y0: line.y0, x1: line.x1, y1: line.y1, s: line.s },
    };
  }
}

// select the nearest label to the mouse
function closestLabel(mx, my) {
  var dist = 100000000;
  var index = -1;
  var pt;
  for (var i = 0; i < labels.length; i++) {
    //
    var xy = closestXYLabel(labels[i], mx, my);
    //

    if (
      labels[i].y0 <= my &&
      labels[i].x0 <= mx &&
      labels[i].y0 + labels[i].y1 >= my &&
      labels[i].x0 + labels[i].x1 >= mx
    ) {
      pt = xy;
      index = i;
    }
  }

  if (index >= 0) {
    var label = labels[index];
    selectedLabel = index;
    return {
      pt: pt,
      label: label,
      originalLabel: { x0: label.x0, y0: label.y0, x1: label.x1, y1: label.y1, s: label.s },
    };
  }
}

// select the nearest door to the mouse
function closestDoor(mx, my) {
  var dist = 100000000;
  var index = -1;
  var pt;
  for (var i = 0; i < doors.length; i++) {
    //
    var xy = closestXYDoor(doors[i], mx, my);
    //

    //alert ('Door Position' + doors[i].s);
    //alert ('Door Swing' + doors[i].sw);
    //alert ('Door Open' + doors[i].op);
    //alert ('Door X0' + doors[i].x0);
    //alert ('Door Y0' + doors[i].y0);
    //alert ('Mouse X' + mx);
    //alert ('Mouse Y' + my);
    if (doors[i].li < 10000) {
      if (doors[i].s == 'Horizontal') {
        if (doors[i].op == 'Out') {
          if (
            doors[i].y0 >= my &&
            doors[i].x0 <= mx &&
            doors[i].y0 - 100 <= my &&
            doors[i].x0 + 100 >= mx
          ) {
            pt = xy;
            index = i;
          }
        } else {
          if (
            doors[i].y0 <= my &&
            doors[i].x0 <= mx &&
            doors[i].y0 + 100 >= my &&
            doors[i].x0 + 100 >= mx
          ) {
            pt = xy;
            index = i;
          }
        }

        //if (Math.abs(doors[i].x0 - mx) < 20) {
        //    pt=xy;
        //    index=i;
        //}
      } else {
        if (doors[i].op == 'Out') {
          if (
            doors[i].y0 - 100 <= my &&
            doors[i].x0 <= mx &&
            doors[i].y0 >= my &&
            doors[i].x0 + 100 >= mx
          ) {
            pt = xy;
            index = i;
          }
        } else {
          if (
            doors[i].y0 - 100 <= my &&
            doors[i].x0 >= mx &&
            doors[i].y0 >= my &&
            doors[i].x0 - 100 <= mx
          ) {
            pt = xy;
            index = i;
          }
        }

        //if (Math.abs(doors[i].y0 - my) < 20) {
        //    pt=xy;
        //    index=i;
        //}
      }
    }
  }

  if (index >= 0) {
    var door = doors[index];
    selectedDoor = index;

    //Unselect the line if a door is selected
    selectedLine = -1;
    nearest = null;

    return {
      pt: pt,
      door: door,
      originalDoor: { x0: door.x0, y0: door.y0, s: door.s, sw: door.sw, li: door.li, op: door.op },
    };
  }
}

// linear interpolation -- needed in setClosestLine()
function lerp(a, b, x) {
  return a + x * (b - a);
}

// find closest XY on line to mouse XY
function closestXY(line, mx, my) {
  var x0 = line.x0;
  var y0 = line.y0;
  var x1 = line.x1;
  var y1 = line.y1;
  var dx = x1 - x0;
  var dy = y1 - y0;
  var t = ((mx - x0) * dx + (my - y0) * dy) / (dx * dx + dy * dy);
  t = Math.max(0, Math.min(1, t));
  var x = lerp(x0, x1, t);
  var y = lerp(y0, y1, t);
  return { x: x, y: y };
}

function closestXYLabel(label, mx, my) {
  var x0 = label.x0;
  var y0 = label.y0;
  var dx = label.x1;
  var dy = label.y1;
  var t = ((mx - x0) * dx + (my - y0) * dy) / (dx * dx + dy * dy);
  t = Math.max(0, Math.min(1, t));
  var x = lerp(x0, x0 + dx, t);
  var y = lerp(y0, y0 + dy, t);
  return { x: x, y: y };
}

// find closest XY on line to mouse XY
function closestXYDoor(door, mx, my) {
  var x0 = door.x0;
  var y0 = door.y0;
  var dx = 50;
  var dy = 50;
  var t = ((mx - x0) * dx + (my - y0) * dy) / (dx * dx + dy * dy);
  t = Math.max(0, Math.min(1, t));
  var x = lerp(x0, x0 + 50, t);
  var y = lerp(y0, y0 + 50, t);
  return { x: x, y: y };
}

function handleMouseDown(e) {
  // tell the browser we're handling this event
  e.preventDefault();
  e.stopPropagation();
  // mouse position
  startX = parseInt(e.clientX - offsetX);
  startY = parseInt(e.clientY - offsetY);

  nearest = null;
  nearestLabel = null;
  nearestDoor = null;

  // find nearest line to mouse
  nearest = closestLine(startX, startY);

  //find nearest label to mouse
  nearestLabel = closestLabel(startX, startY);

  // find nearest door to mouse
  nearestDoor = closestDoor(startX, startY);

  // set dragging flag
  isDown = true;

  draw();
}

function handleMouseUpOut(e) {
  // tell the browser we're handling this event
  e.preventDefault();
  e.stopPropagation();
  // clear dragging flag
  isDown = false;

  //nearestLabel=closestLabel(startX, startY);

  //if (nearestLabel === null) {nearest=closestLine(startX,startY); }

  //nearestDoor=closestDoor(startX,startY);

  //nearest=null;
  nearest = closestLine(startX, startY);

  draw();

  if (glft > 0) {
    lines[1].x0 = 650;
    lines[1].x1 = 650;

    drawLine(1, 'black');

    document.getElementById('lft').value = glft;
    document.getElementById('lin').value = glin;
  }

  if (gwft > 0) {
    document.getElementById('wft').value = gwft;
    document.getElementById('win').value = gwin;
  }

  draw();
}

function handleMouseMove(e) {
  if (!isDown) {
    return;
  }
  // tell the browser we're handling this event
  e.preventDefault();
  e.stopPropagation();
  // mouse position
  mouseX = parseInt(e.clientX - offsetX);
  mouseY = parseInt(e.clientY - offsetY);
  // calc how far mouse has moved since last mousemove event
  var dx = mouseX - startX;
  var dy = mouseY - startY;
  startX = mouseX;
  startY = mouseY;

  // change nearest line vertices by distance moved
  if (nearest) {
    var line = nearest.line;

    if (line.s == 'Horizontal') {
      //Horizontal Line - only update the y position
      line.y0 += dy;
      line.y1 += dy;
    } else {
      //Vertical Line - only update the x position
      line.x0 += dx;
      line.x1 += dx;
    }
  }

  // change nearest door vertices by distance moved
  if (nearestDoor) {
    var door = nearestDoor.door;

    if (door.s == 'Horizontal') {
      //Door is on Horizontal Line - only update the x position
      var llen = document.getElementById('length').value;
      var lpos = 100 + (cw - 200) / llen * 0.5;
      var rpos = cw - 100 - (cw - 200) / llen * 0.5 - doorwdth;
      if (door.x0 + dx > lpos && door.x0 + dx < rpos) {
        door.x0 += dx;
      }
    } else {
      //Door is on Vertical Line - only update the y position
      var lwid = document.getElementById('width').value;
      var lpos = 112 + doorwdth;
      var rpos = lwid * 24 + 100 + 6;
      if (door.y0 + dy > lpos && door.y0 + dy < rpos) {
        door.y0 += dy;
      }
    }
  }

  // change nearest label vertices by distance moved
  if (nearestLabel) {
    var label = nearestLabel.label;

    label.x0 += dx;
    label.y0 += dy;
  }

  draw();
}

function flipSwing() {
  if (nearestDoor) {
    var door = nearestDoor.door;
    if (door.sw == 'Right') {
      door.sw = 'Left';
    } else {
      door.sw = 'Right';
    }

    draw();
  }
}

function flipDoor() {
  if (nearestDoor) {
    var door = nearestDoor.door;
    if (door.op == 'In') {
      door.op = 'Out';
    } else {
      door.op = 'In';
    }

    draw();
  }
}

function swapSlider(a, h1text, h3text, image) {
  document.getElementById('h1-1').innerHTML = h1text;
  document.getElementById('h3-1').innerHTML = h3text;
  document.getElementById('img-1').src =
    'http://polarkingdev.com/wp-content/uploads/2016/08/' + image;

  //Remove 'hb-active' class from all anchor tags then add it back to the current one.
  for (i = 1; i <= 5; i++) {
    var anchor = document.getElementById('a' + i);
    anchor.classList.remove('hb-active');
  }

  a.classList.add('hb-active');
}

function swapCS(div) {
  //Remove 'hb-active' class from all anchor tags then add it back to the current one.
  for (i = 1; i <= 7; i++) {
    var tdiv = document.getElementById('csdiv' + i);
    tdiv.classList.remove('cs-active');
  }

  var cdiv = document.getElementById(div);
  cdiv.classList.add('cs-active');
}

function clearCS() {
  //Remove 'hb-active' class from all anchor tags then add it back to the current one.
  for (i = 1; i <= 7; i++) {
    var tdiv = document.getElementById('csdiv' + i);
    tdiv.classList.remove('cs-active');
  }
}

function swapIcon(icon, filename) {
  document.getElementById(icon).src =
    'http://polarkingdev.com/wp-content/uploads/2016/08/' + filename;
}

function clearIcons() {
  document.getElementById('icon-1').src =
    'http://polarkingdev.com/wp-content/uploads/2016/08/icon-1-off.png';
  document.getElementById('icon-2').src =
    'http://polarkingdev.com/wp-content/uploads/2016/08/icon-2-off.png';
  document.getElementById('icon-3').src =
    'http://polarkingdev.com/wp-content/uploads/2016/08/icon-3-off.png';
  document.getElementById('icon-4').src =
    'http://polarkingdev.com/wp-content/uploads/2016/08/icon-4-off.png';
  document.getElementById('icon-5').src =
    'http://polarkingdev.com/wp-content/uploads/2016/08/icon-5-off.png';
  document.getElementById('icon-6').src =
    'http://polarkingdev.com/wp-content/uploads/2016/08/icon-6-off.png';
}

function toggle_visibility(id) {
  var e = document.getElementById(id);
  if (e.style.display == 'block') e.style.display = 'none';
  else e.style.display = 'block';
}

function clearme(c) {
  c.value = '';
}

function show(c, val) {
  if (c.value == '') {
    c.value = val;
  }
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function swapFSIcon(div) {
  document.getElementById(div).className = 'fs-icon-on';
}

function clearFSIcons() {
  document.getElementById('fsdiv-1').className = 'fs-icon-off';
  document.getElementById('fsdiv-2').className = 'fs-icon-off';
  document.getElementById('fsdiv-3').className = 'fs-icon-off';
  document.getElementById('fsdiv-4').className = 'fs-icon-off';
  document.getElementById('fsdiv-5').className = 'fs-icon-off';
  //document.getElementById('fsdiv-6').className = 'fs-icon-off';
  //document.getElementById('fsdiv-7').className = 'fs-icon-off';
  //document.getElementById('fsdiv-8').className = 'fs-icon-off';
  document.getElementById('fsdiv-9').className = 'fs-icon-off';
  document.getElementById('fsdiv-10').className = 'fs-icon-off';
  document.getElementById('fsdiv-11').className = 'fs-icon-off';
  document.getElementById('fsdiv-12').className = 'fs-icon-off';
  document.getElementById('fsdiv-13').className = 'fs-icon-off';
  document.getElementById('fsdiv-14').className = 'fs-icon-off';
  document.getElementById('fsdiv-15').className = 'fs-icon-off';
}

function updateMailTo() {
  var s = document.getElementById('your-state');
  var st = document.getElementById('sendto');
  var st2 = document.getElementById('sendto2');

  if (
    s.value == 'AL' ||
    s.value == 'AR' ||
    s.value == 'CA' ||
    s.value == 'IA' ||
    s.value == 'IL' ||
    s.value == 'IN' ||
    s.value == 'KS' ||
    s.value == 'KY' ||
    s.value == 'LA' ||
    s.value == 'MN' ||
    s.value == 'MO' ||
    s.value == 'MS' ||
    s.value == 'NV' ||
    s.value == 'OK' ||
    s.value == 'TN' ||
    s.value == 'TX' ||
    s.value == 'UT' ||
    s.value == 'WI' ||
    s.value == 'BC' ||
    s.value == 'MB' ||
    s.value == 'ON'
  ) {
    st.value = 'patrick.smith@polarking.com';
    st2.value = 'amy.richards@polarking.com';
  } else {
    st.value = 'brian.markham@polarking.com';
    st2.value = 'dan.parsenow@polarking.com';
  }
}

function getInches(val) {
  var inch = Math.floor(val * 12);

  return inch;
}
