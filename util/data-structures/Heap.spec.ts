import { describe, it } from 'node:test';
import a from 'node:assert/strict';
import { Heap } from './Heap.ts';

describe('Heap', () => {
  it('Should be all heapy and stuff', () => {
    const h = new Heap();
    h.add(20);
    h.add(5);
    h.add(15);
    h.add(9);
    h.add(22);
    h.add(13);
    h.add(2);
    h.add(1);
    // console.log(h.items);
    // h.poll();
    console.log(h.items);
    h.print();
    /*

              2
            /   \
          5       9
        /   \   /   \
      13    15 20   22
    */
  });
});
