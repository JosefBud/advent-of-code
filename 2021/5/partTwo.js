const { COORDINATES } = require('./input');

const partTwo = () => {
  const createEmptyDiagram = (coordinates) => {
    let largestXCoord = 0;
    let largestYCoord = 0;

    for (const line of coordinates) {
      const [[x1, y1], [x2, y2]] = line;
      if (x1 > largestXCoord) largestXCoord = x1;
      if (x2 > largestXCoord) largestXCoord = x1;
      if (y1 > largestYCoord) largestYCoord = y1;
      if (y2 > largestYCoord) largestYCoord = y2;
    }

    const emptyDiagram = [];

    for (let i = 0; i < largestYCoord + 1; i += 1) {
      emptyDiagram.push(new Array(largestXCoord).fill(0));
    }

    return emptyDiagram;
  };

  const checkIfHorizontalOrVertical = (line) => {
    const [[x1, y1], [x2, y2]] = line;
    return x1 === x2 || y1 === y2;
  };

  // Apparently all diagonal lines from input are 45 degree angle, so this isn't used
  const checkIf45DegreeAngle = (line) => {
    const [[x1, y1], [x2, y2]] = line;
    let diffX = x1 - x2;
    if (diffX < 0) diffX *= -1;

    let diffY = y1 - y2;
    if (diffY < 0) diffY *= -1;

    return diffY === diffX;
  };

  // Yo dawg I heard you like brute forcing
  const calculateAllLineCoordinates = (line) => {
    const [[x1, y1], [x2, y2]] = line;
    const lineCoordinates = [];

    const horizontalOrVertical = checkIfHorizontalOrVertical(line);

    if (horizontalOrVertical) {
      const vertical = x1 === x2;
      if (vertical) {
        if (y1 > y2) {
          for (let i = y1; i >= y2; i -= 1) {
            lineCoordinates.push([x1, i]);
          }
        } else {
          for (let i = y2; i >= y1; i -= 1) {
            lineCoordinates.push([x1, i]);
          }
        }
      } else {
        if (x1 > x2) {
          for (let i = x1; i >= x2; i -= 1) {
            lineCoordinates.push([i, y1]);
          }
        } else {
          for (let i = x2; i >= x1; i -= 1) {
            lineCoordinates.push([i, y1]);
          }
        }
      }
    } else {
      let xCoords = [];
      let yCoords = [];

      if (x1 > x2) {
        for (let i = x1; i >= x2; i -= 1) {
          xCoords.push(i);
        }

        if (y1 > y2) {
          for (let a = y1; a >= y2; a -= 1) {
            yCoords.push(a);
          }
        } else {
          for (let a = y1; a <= y2; a += 1) {
            yCoords.push(a);
          }
        }
      } else {
        for (let i = x2; i >= x1; i -= 1) {
          xCoords.push(i);
        }

        if (y2 > y1) {
          for (let a = y2; a >= y1; a -= 1) {
            yCoords.push(a);
          }
        } else {
          for (let a = y2; a <= y1; a += 1) {
            yCoords.push(a);
          }
        }
      }

      for (const index in xCoords) {
        lineCoordinates.push([xCoords[index], yCoords[index]]);
      }
    }

    return lineCoordinates;
  };

  const diagram = createEmptyDiagram(COORDINATES);

  for (const line of COORDINATES) {
    const lineCoordinates = calculateAllLineCoordinates(line);
    for (const coordinates of lineCoordinates) {
      const [x, y] = coordinates;
      diagram[y][x] += 1;
    }
  }

  let overlaps = 0;
  for (const row of diagram) {
    for (const coord of row) {
      if (coord >= 2) {
        overlaps += 1;
      }
    }
  }

  console.log(overlaps);
};

partTwo();
