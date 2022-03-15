import { Vector } from '../Vector/Vector'

export class Queue<T> extends Vector<T> {
  enqueue(e: T) {
    this.insert(this.size(), e)
  }

  dequeue() {
    return this.remove(0)
  }

  front() {
    return this._data[0]
  }
}
