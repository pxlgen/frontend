let x = 0;
let y = 0;
let doX = true;
let doY = false;
let plus = true;
let turns = 0;
let numToPlace = 20;
let offsetAmnt = 50;
let runs = 0;
let arr = [];
while (numToPlace > 0) {
  for (var i = 1; i <= numToPlace; i++) {
    if (i > 1 || numToPlace < 20) {
      if (doX) {
        if (plus) {
          x = x + offsetAmnt;
        } else {
          x = x - offsetAmnt;
        }
      } else if (doY) {
        if (plus) {
          y = y + offsetAmnt;
        } else {
          y = y - offsetAmnt;
        }
      }
    }

    console.log(i);
    console.log(doX);
    console.log(`${x},${y}`);
    arr.push(`${x},${y}`);
  }
  if (numToPlace == 20) {
    numToPlace = numToPlace - 1;
  } else {
    runs += 1;
    if (runs == 2) {
      numToPlace = numToPlace - 1;
      runs = 0;
    }
  }
  turns += 1;
  if (turns == 2) {
    if (plus) {
      plus = false;
    } else {
      plus = true;
    }
    turns = 0;
  }
  if (doX) {
    doY = true;
    doX = false;
  } else {
    doY = false;
    doX = true;
  }
}

console.log(JSON.stringify(arr));
let Offset = [
  { x: 0, y: 0 },
  { x: 50, y: 0 },
  { x: 100, y: 0 },
  { x: 150, y: 0 },
  { x: 200, y: 0 },
  { x: 250, y: 0 },
  { x: 300, y: 0 },
  { x: 350, y: 0 },
  { x: 400, y: 0 },
  { x: 450, y: 0 },
  { x: 500, y: 0 },
  { x: 550, y: 0 },
  { x: 600, y: 0 },
  { x: 650, y: 0 },
  { x: 700, y: 0 },
  { x: 750, y: 0 },
  { x: 800, y: 0 },
  { x: 850, y: 0 },
  { x: 900, y: 0 },
  { x: 950, y: 0 },
  { x: 950, y: 50 },
  { x: 950, y: 100 },
  { x: 950, y: 150 },
  { x: 950, y: 200 },
  { x: 950, y: 250 },
  { x: 950, y: 300 },
  { x: 950, y: 350 },
  { x: 950, y: 400 },
  { x: 950, y: 450 },
  { x: 950, y: 500 },
  { x: 950, y: 550 },
  { x: 950, y: 600 },
  { x: 950, y: 650 },
  { x: 950, y: 700 },
  { x: 950, y: 750 },
  { x: 950, y: 800 },
  { x: 950, y: 850 },
  { x: 950, y: 900 },
  { x: 950, y: 950 },
  { x: 900, y: 950 },
  { x: 850, y: 950 },
  { x: 800, y: 950 },
  { x: 750, y: 950 },
  { x: 700, y: 950 },
  { x: 650, y: 950 },
  { x: 600, y: 950 },
  { x: 550, y: 950 },
  { x: 500, y: 950 },
  { x: 450, y: 950 },
  { x: 400, y: 950 },
  { x: 350, y: 950 },
  { x: 300, y: 950 },
  { x: 250, y: 950 },
  { x: 200, y: 950 },
  { x: 150, y: 950 },
  { x: 100, y: 950 },
  { x: 50, y: 950 },
  { x: 0, y: 950 },
  { x: 0, y: 900 },
  { x: 0, y: 850 },
  { x: 0, y: 800 },
  { x: 0, y: 750 },
  { x: 0, y: 700 },
  { x: 0, y: 650 },
  { x: 0, y: 600 },
  { x: 0, y: 550 },
  { x: 0, y: 500 },
  { x: 0, y: 450 },
  { x: 0, y: 400 },
  { x: 0, y: 350 },
  { x: 0, y: 300 },
  { x: 0, y: 250 },
  { x: 0, y: 200 },
  { x: 0, y: 150 },
  { x: 0, y: 100 },
  { x: 0, y: 50 },
  { x: 50, y: 50 },
  { x: 100, y: 50 },
  { x: 150, y: 50 },
  { x: 200, y: 50 },
  { x: 250, y: 50 },
  { x: 300, y: 50 },
  { x: 350, y: 50 },
  { x: 400, y: 50 },
  { x: 450, y: 50 },
  { x: 500, y: 50 },
  { x: 550, y: 50 },
  { x: 600, y: 50 },
  { x: 650, y: 50 },
  { x: 700, y: 50 },
  { x: 750, y: 50 },
  { x: 800, y: 50 },
  { x: 850, y: 50 },
  { x: 900, y: 50 },
  { x: 900, y: 100 },
  { x: 900, y: 150 },
  { x: 900, y: 200 },
  { x: 900, y: 250 },
  { x: 900, y: 300 },
  { x: 900, y: 350 },
  { x: 900, y: 400 },
  { x: 900, y: 450 },
  { x: 900, y: 500 },
  { x: 900, y: 550 },
  { x: 900, y: 600 },
  { x: 900, y: 650 },
  { x: 900, y: 700 },
  { x: 900, y: 750 },
  { x: 900, y: 800 },
  { x: 900, y: 850 },
  { x: 900, y: 900 },
  { x: 850, y: 900 },
  { x: 800, y: 900 },
  { x: 750, y: 900 },
  { x: 700, y: 900 },
  { x: 650, y: 900 },
  { x: 600, y: 900 },
  { x: 550, y: 900 },
  { x: 500, y: 900 },
  { x: 450, y: 900 },
  { x: 400, y: 900 },
  { x: 350, y: 900 },
  { x: 300, y: 900 },
  { x: 250, y: 900 },
  { x: 200, y: 900 },
  { x: 150, y: 900 },
  { x: 100, y: 900 },
  { x: 50, y: 900 },
  { x: 50, y: 850 },
  { x: 50, y: 800 },
  { x: 50, y: 750 },
  { x: 50, y: 700 },
  { x: 50, y: 650 },
  { x: 50, y: 600 },
  { x: 50, y: 550 },
  { x: 50, y: 500 },
  { x: 50, y: 450 },
  { x: 50, y: 400 },
  { x: 50, y: 350 },
  { x: 50, y: 300 },
  { x: 50, y: 250 },
  { x: 50, y: 200 },
  { x: 50, y: 150 },
  { x: 50, y: 100 },
  { x: 100, y: 100 },
  { x: 150, y: 100 },
  { x: 200, y: 100 },
  { x: 250, y: 100 },
  { x: 300, y: 100 },
  { x: 350, y: 100 },
  { x: 400, y: 100 },
  { x: 450, y: 100 },
  { x: 500, y: 100 },
  { x: 550, y: 100 },
  { x: 600, y: 100 },
  { x: 650, y: 100 },
  { x: 700, y: 100 },
  { x: 750, y: 100 },
  { x: 800, y: 100 },
  { x: 850, y: 100 },
  { x: 850, y: 150 },
  { x: 850, y: 200 },
  { x: 850, y: 250 },
  { x: 850, y: 300 },
  { x: 850, y: 350 },
  { x: 850, y: 400 },
  { x: 850, y: 450 },
  { x: 850, y: 500 },
  { x: 850, y: 550 },
  { x: 850, y: 600 },
  { x: 850, y: 650 },
  { x: 850, y: 700 },
  { x: 850, y: 750 },
  { x: 850, y: 800 },
  { x: 850, y: 850 },
  { x: 800, y: 850 },
  { x: 750, y: 850 },
  { x: 700, y: 850 },
  { x: 650, y: 850 },
  { x: 600, y: 850 },
  { x: 550, y: 850 },
  { x: 500, y: 850 },
  { x: 450, y: 850 },
  { x: 400, y: 850 },
  { x: 350, y: 850 },
  { x: 300, y: 850 },
  { x: 250, y: 850 },
  { x: 200, y: 850 },
  { x: 150, y: 850 },
  { x: 100, y: 850 },
  { x: 100, y: 800 },
  { x: 100, y: 750 },
  { x: 100, y: 700 },
  { x: 100, y: 650 },
  { x: 100, y: 600 },
  { x: 100, y: 550 },
  { x: 100, y: 500 },
  { x: 100, y: 450 },
  { x: 100, y: 400 },
  { x: 100, y: 350 },
  { x: 100, y: 300 },
  { x: 100, y: 250 },
  { x: 100, y: 200 },
  { x: 100, y: 150 },
  { x: 150, y: 150 },
  { x: 200, y: 150 },
  { x: 250, y: 150 },
  { x: 300, y: 150 },
  { x: 350, y: 150 },
  { x: 400, y: 150 },
  { x: 450, y: 150 },
  { x: 500, y: 150 },
  { x: 550, y: 150 },
  { x: 600, y: 150 },
  { x: 650, y: 150 },
  { x: 700, y: 150 },
  { x: 750, y: 150 },
  { x: 800, y: 150 },
  { x: 800, y: 200 },
  { x: 800, y: 250 },
  { x: 800, y: 300 },
  { x: 800, y: 350 },
  { x: 800, y: 400 },
  { x: 800, y: 450 },
  { x: 800, y: 500 },
  { x: 800, y: 550 },
  { x: 800, y: 600 },
  { x: 800, y: 650 },
  { x: 800, y: 700 },
  { x: 800, y: 750 },
  { x: 800, y: 800 },
  { x: 750, y: 800 },
  { x: 700, y: 800 },
  { x: 650, y: 800 },
  { x: 600, y: 800 },
  { x: 550, y: 800 },
  { x: 500, y: 800 },
  { x: 450, y: 800 },
  { x: 400, y: 800 },
  { x: 350, y: 800 },
  { x: 300, y: 800 },
  { x: 250, y: 800 },
  { x: 200, y: 800 },
  { x: 150, y: 800 },
  { x: 150, y: 750 },
  { x: 150, y: 700 },
  { x: 150, y: 650 },
  { x: 150, y: 600 },
  { x: 150, y: 550 },
  { x: 150, y: 500 },
  { x: 150, y: 450 },
  { x: 150, y: 400 },
  { x: 150, y: 350 },
  { x: 150, y: 300 },
  { x: 150, y: 250 },
  { x: 150, y: 200 },
  { x: 200, y: 200 },
  { x: 250, y: 200 },
  { x: 300, y: 200 },
  { x: 350, y: 200 },
  { x: 400, y: 200 },
  { x: 450, y: 200 },
  { x: 500, y: 200 },
  { x: 550, y: 200 },
  { x: 600, y: 200 },
  { x: 650, y: 200 },
  { x: 700, y: 200 },
  { x: 750, y: 200 },
  { x: 750, y: 250 },
  { x: 750, y: 300 },
  { x: 750, y: 350 },
  { x: 750, y: 400 },
  { x: 750, y: 450 },
  { x: 750, y: 500 },
  { x: 750, y: 550 },
  { x: 750, y: 600 },
  { x: 750, y: 650 },
  { x: 750, y: 700 },
  { x: 750, y: 750 },
  { x: 700, y: 750 },
  { x: 650, y: 750 },
  { x: 600, y: 750 },
  { x: 550, y: 750 },
  { x: 500, y: 750 },
  { x: 450, y: 750 },
  { x: 400, y: 750 },
  { x: 350, y: 750 },
  { x: 300, y: 750 },
  { x: 250, y: 750 },
  { x: 200, y: 750 },
  { x: 200, y: 700 },
  { x: 200, y: 650 },
  { x: 200, y: 600 },
  { x: 200, y: 550 },
  { x: 200, y: 500 },
  { x: 200, y: 450 },
  { x: 200, y: 400 },
  { x: 200, y: 350 },
  { x: 200, y: 300 },
  { x: 200, y: 250 },
  { x: 250, y: 250 },
  { x: 300, y: 250 },
  { x: 350, y: 250 },
  { x: 400, y: 250 },
  { x: 450, y: 250 },
  { x: 500, y: 250 },
  { x: 550, y: 250 },
  { x: 600, y: 250 },
  { x: 650, y: 250 },
  { x: 700, y: 250 },
  { x: 700, y: 300 },
  { x: 700, y: 350 },
  { x: 700, y: 400 },
  { x: 700, y: 450 },
  { x: 700, y: 500 },
  { x: 700, y: 550 },
  { x: 700, y: 600 },
  { x: 700, y: 650 },
  { x: 700, y: 700 },
  { x: 650, y: 700 },
  { x: 600, y: 700 },
  { x: 550, y: 700 },
  { x: 500, y: 700 },
  { x: 450, y: 700 },
  { x: 400, y: 700 },
  { x: 350, y: 700 },
  { x: 300, y: 700 },
  { x: 250, y: 700 },
  { x: 250, y: 650 },
  { x: 250, y: 600 },
  { x: 250, y: 550 },
  { x: 250, y: 500 },
  { x: 250, y: 450 },
  { x: 250, y: 400 },
  { x: 250, y: 350 },
  { x: 250, y: 300 },
  { x: 300, y: 300 },
  { x: 350, y: 300 },
  { x: 400, y: 300 },
  { x: 450, y: 300 },
  { x: 500, y: 300 },
  { x: 550, y: 300 },
  { x: 600, y: 300 },
  { x: 650, y: 300 },
  { x: 650, y: 350 },
  { x: 650, y: 400 },
  { x: 650, y: 450 },
  { x: 650, y: 500 },
  { x: 650, y: 550 },
  { x: 650, y: 600 },
  { x: 650, y: 650 },
  { x: 600, y: 650 },
  { x: 550, y: 650 },
  { x: 500, y: 650 },
  { x: 450, y: 650 },
  { x: 400, y: 650 },
  { x: 350, y: 650 },
  { x: 300, y: 650 },
  { x: 300, y: 600 },
  { x: 300, y: 550 },
  { x: 300, y: 500 },
  { x: 300, y: 450 },
  { x: 300, y: 400 },
  { x: 300, y: 350 },
  { x: 350, y: 350 },
  { x: 400, y: 350 },
  { x: 450, y: 350 },
  { x: 500, y: 350 },
  { x: 550, y: 350 },
  { x: 600, y: 350 },
  { x: 600, y: 400 },
  { x: 600, y: 450 },
  { x: 600, y: 500 },
  { x: 600, y: 550 },
  { x: 600, y: 600 },
  { x: 550, y: 600 },
  { x: 500, y: 600 },
  { x: 450, y: 600 },
  { x: 400, y: 600 },
  { x: 350, y: 600 },
  { x: 350, y: 550 },
  { x: 350, y: 500 },
  { x: 350, y: 450 },
  { x: 350, y: 400 },
  { x: 400, y: 400 },
  { x: 450, y: 400 },
  { x: 500, y: 400 },
  { x: 550, y: 400 },
  { x: 550, y: 450 },
  { x: 550, y: 500 },
  { x: 550, y: 550 },
  { x: 500, y: 550 },
  { x: 450, y: 550 },
  { x: 400, y: 550 },
  { x: 400, y: 500 },
  { x: 400, y: 450 },
  { x: 450, y: 450 },
  { x: 500, y: 450 },
  { x: 500, y: 500 },
  { x: 450, y: 500 },
];
export {};
