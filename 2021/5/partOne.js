const { COORDINATES } = require('./input');

const partOne = () => {
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

  const calculateAllLineCoordinates = (line) => {
    const [[x1, y1], [x2, y2]] = line;
    const vertical = x1 === x2;
    const lineCoordinates = [];
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
    return lineCoordinates;
  };

  const diagram = createEmptyDiagram(COORDINATES);

  for (const line of COORDINATES) {
    if (!checkIfHorizontalOrVertical(line)) continue;

    const [[x1, y1], [x2, y2]] = line;
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

partOne();
