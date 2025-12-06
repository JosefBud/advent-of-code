/*
Written by me but the structure came from https://www.youtube.com/watch?v=t0Cq6tVNRBA
*/

/**
 * A binary min heap using a single 1-dimensional array
 */
export class Heap {
  items: number[] = [];
  get size() {
    return this.items.length;
  }

  getLeftChildIndex = (parentIndex: number) => 2 * parentIndex + 1;
  getRightChildIndex = (parentIndex: number) => 2 * parentIndex + 2;
  getParentIndex = (childIndex: number) => Math.floor((childIndex - 1) / 2);

  hasLeftChild = (index: number) => this.getLeftChildIndex(index) < this.size;
  hasRightChild = (index: number) => this.getRightChildIndex(index) < this.size;
  hasParent = (index: number) => this.getParentIndex(index) >= 0;

  leftChild = (index: number) => this.items[this.getLeftChildIndex(index)];
  rightChild = (index: number) => this.items[this.getRightChildIndex(index)];
  parent = (index: number) => this.items[this.getParentIndex(index)];

  swap(index1: number, index2: number) {
    const temp = this.items[index1];
    this.items[index1] = this.items[index2];
    this.items[index2] = temp;
  }

  peek() {
    if (this.size === 0) throw new Error('No items to peek');
    return this.items[0];
  }

  poll() {
    if (this.size === 0) throw new Error('No items to poll');
    const item = this.items[0];
    this.items[0] = this.items.pop()!;
    this.heapifyDown();
    return item;
  }

  add(item: number) {
    this.items.push(item);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.size - 1;
    while (this.hasParent(index) && this.parent(index) > this.items[index]) {
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }

  heapifyDown() {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      if (
        this.hasRightChild(index) &&
        this.rightChild(index) < this.leftChild(index)
      ) {
        smallerChildIndex = this.getRightChildIndex(index);
      }

      if (this.items[index] < this.items[smallerChildIndex]) {
        break;
      } else {
        this.swap(index, smallerChildIndex);
      }
      index = smallerChildIndex;
    }
  }

  print() {
    const numOfRows = Math.floor(Math.log2(this.size)) + 1;
    // console.log('numOfRows', numOfRows, Math.log2(this.size) + 1);
    const items = [...this.items];
    let output = Array(numOfRows).fill('').join('  ');
    // console.log('numOfRows', numOfRows);
    for (let i = 1; i <= numOfRows; i++) {
      const numOfNodes = 2 ** (i - 1);
      // console.log('numOfNodes', numOfNodes);
      const nodes: string[] = [
        Array(numOfRows - i + 1)
          .fill('')
          .join(' '),
      ];
      for (let a = 1; a <= numOfNodes; a++) {
        const node = items.shift();
        if (node !== undefined) {
          nodes.push(node.toString());
        } else {
          nodes.push('-');
        }
      }
      output += '\n';
      output += nodes.join(
        Array(Math.ceil(2 ** i / i))
          .fill('')
          .join(' '),
      );
      output += '\n';
    }
    // console.log(output);
  }
}
