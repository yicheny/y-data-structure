import { Vector } from '../Vector/Vector'

export class Stack<T> extends Vector<T> {
  push(e: T) {
    this.insert(this.size(), e)
  }

  pop() {
    return this.remove(this.size() - 1)
  }

  top() {
    return this._data[this.size() - 1]
  }
}
