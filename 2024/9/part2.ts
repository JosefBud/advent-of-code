import { getExampleInput, getInput, int } from '../../util/index.ts';

// const input = getExampleInput(); // 2858
const input = getInput(); // 6373055193464

const rawMap = input.trim().split('').map(int);

/**
 * Right now, index == amount of free space, element == file ID before it
 */
const freeSpaceByIds: number[][] = Array(10).fill([]);
const map: Array<number | undefined> = rawMap.flatMap((num, idx) => {
  if (idx % 2 !== 0 && num !== 0) {
    freeSpaceByIds[num] = [...freeSpaceByIds[num], Math.floor(idx / 2)];
  }
  return Array(num).fill(idx % 2 === 0 ? idx / 2 : undefined);
});

const movedFileIds: number[] = [];
for (const _idx in map) {
  const idx = int(_idx);
  console.log(`Iteration ${idx} of ${map.length - 1}`);
  const fileId = map.at(-idx - 1);
  // If we "passed" the first free space that could be found, time to stop
  if (map.indexOf(undefined) > map.length - idx - 1) {
    break;
  }
  // Only work on files, not spaces. And skip files that were already moved.
  if (fileId === undefined || movedFileIds.includes(fileId)) {
    continue;
  }
  const numOfFileIds = map.filter((n) => n === fileId).length;
  const firstUndefined = map.indexOf(undefined);

  // Find free spaces, and start with the smallest space possible, which == the number of
  // files, then go up from there.
  // Highest possible amount of free space is 9.
  for (let i = numOfFileIds; i <= 9; i++) {
    // Create a slice of the map starting at the first undefined value, so that findIndex
    // is faster w/ less values to check
    const sliced = map.slice(firstUndefined);
    const slicedFileIdx = sliced.indexOf(fileId);
    const freeSpaceIdx = sliced.findIndex((val, idx) => {
      let returnValue =
        val === undefined &&
        sliced[idx + numOfFileIds - 1] === undefined &&
        // If the index goes past the index of the file itself, time to give up
        idx < slicedFileIdx;
      if (!returnValue) return returnValue;
      // Check each value *after* the value that meets the above criteria
      for (let a = 0; a < numOfFileIds; a++) {
        returnValue &&= sliced[idx + a] === undefined;
        if (!returnValue) break;
      }
      return returnValue;
    });
    if (freeSpaceIdx === -1) {
      continue;
    } else {
      // Swap!
      const actualFreeSpaceIdx = freeSpaceIdx + firstUndefined;
      const fileIds = map.splice(
        map.indexOf(fileId),
        numOfFileIds,
        ...Array(numOfFileIds).fill(undefined),
      );
      map.splice(actualFreeSpaceIdx, numOfFileIds, ...fileIds);
      movedFileIds.push(fileId);
      break;
    }
  }
}

const checksum = map.reduce((a, b, idx) => {
  return (a ?? 0) + (b ?? 0) * idx;
}, 0);
console.log(checksum);
// 6373055193464
