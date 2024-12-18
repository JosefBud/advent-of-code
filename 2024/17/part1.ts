import { getExampleInput, getInput, int } from '../../util/index.ts';

// const input = getExampleInput();
const input = getInput();

const [registerA, registerB, registerC] = input
  .matchAll(/Register [ABC]: ([0-9]*)/g)!
  .toArray()
  .map((m) => int(m[1]));

const program = input
  .match(/Program: ([0-9,]*[0-9])/)![1]
  .split(',')
  .map(int);
console.log(program);

class Processor {
  regA: number;
  regB: number;
  regC: number;
  program: number[];
  pointer: number = 0;
  output: number[] = [];
  constructor(registerValues: [number, number, number], program: number[]) {
    [this.regA, this.regB, this.regC] = registerValues;
    this.program = program;
  }

  get op() {
    return this.program[this.pointer];
  }
  /**
   * Combo operands 0 through 3 represent literal values 0 through 3.
   * Combo operand 4 represents the value of register A.
   * Combo operand 5 represents the value of register B.
   * Combo operand 6 represents the value of register C.
   * Combo operand 7 is reserved and will not appear in valid programs.
   */
  get opCombo() {
    switch (this.op) {
      case 0:
        return this.op;
      case 1:
        return this.op;
      case 2:
        return this.op;
      case 3:
        return this.op;
      case 4:
        return this.regA;
      case 5:
        return this.regB;
      case 6:
        return this.regC;
      default:
        throw new Error('Combo operand out of range');
    }
  }

  execute() {
    while (this.pointer < this.program.length - 1) {
      const opcode = this.op;
      this.pointer++;
      switch (opcode) {
        case 0:
          this.adv();
          break;
        case 1:
          this.bxl();
          break;
        case 2:
          this.bst();
          break;
        case 3:
          this.jnz();
          break;
        case 4:
          this.bxc();
          break;
        case 5:
          this.out();
          break;
        case 6:
          this.bdv();
          break;
        case 7:
          this.cdv();
          break;
        default:
          throw new Error(`Opcode ${opcode} out of range`);
      }
    }
  }

  /**
   * The adv instruction (opcode 0) performs division. The numerator is the value in the A register.
   * The denominator is found by raising 2 to the power of the instruction's combo operand.
   * (So, an operand of 2 would divide A by 4 (2^2); an operand of 5 would divide A by 2^B.)
   * The result of the division operation is truncated to an integer and then written to the A register.
   */
  adv() {
    this.regA = Math.floor(this.regA / 2 ** this.opCombo);
    this.pointer++;
  }

  /**
   * The bxl instruction (opcode 1) calculates the bitwise XOR of register B and the
   * instruction's literal operand, then stores the result in register B.
   */
  bxl() {
    this.regB = this.regB ^ this.op;
    this.pointer++;
  }

  /**
   * The bst instruction (opcode 2) calculates the value of its combo operand modulo 8
   * (thereby keeping only its lowest 3 bits), then writes that value to the B register.
   */
  bst() {
    this.regB = this.opCombo % 8;
    this.pointer++;
  }

  /**
   *
   * The jnz instruction (opcode 3) does nothing if the A register is 0. However, if the
   * A register is not zero, it jumps by setting the instruction pointer to the value of its literal
   * operand; if this instruction jumps, the instruction pointer is not increased by 2 after this instruction.
   */
  jnz() {
    if (!this.regA) return;
    this.pointer = this.op;
  }

  /**
   * The bxc instruction (opcode 4) calculates the bitwise XOR of register B and register C,
   * then stores the result in register B. (For legacy reasons, this instruction reads an operand but ignores it.)
   */
  bxc() {
    this.regB = this.regB ^ this.regC;
    this.pointer++;
  }

  /**
   * The out instruction (opcode 5) calculates the value of its combo operand modulo 8,
   * then outputs that value. (If a program outputs multiple values, they are separated by commas.)
   */
  out() {
    this.output.push(this.opCombo % 8);
    this.pointer++;
  }

  /**
   * The bdv instruction (opcode 6) works exactly like the adv instruction except that the
   * result is stored in the B register. (The numerator is still read from the A register.)
   */
  bdv() {
    this.regB = Math.floor(this.regA / 2 ** this.opCombo);
    this.pointer++;
  }

  /**
   * The cdv instruction (opcode 7) works exactly like the adv instruction except that the
   * result is stored in the C register. (The numerator is still read from the A register.)
   */
  cdv() {
    this.regC = Math.floor(this.regA / 2 ** this.opCombo);
    this.pointer++;
  }
}

const proc = new Processor([registerA, registerB, registerC], program);
proc.execute();
console.log(proc.output.join(','));
