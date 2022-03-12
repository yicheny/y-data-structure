type Rank = number

export class Vector<T> {
  private _size: Rank
  private _data: Array<T>

  constructor(source?: Array<T>) {
    this._size = 0
    this._data = []
    if (source) {
      while (this._size < source.length) {
        this._size++
        this._data[this._size] = source[this._size]
      }
    }
  }

  //-------------------只读相关--------------------
  empty() {
    return this._size === 0
  }

  size() {
    return this._size
  }

  //--------------------修改相关--------------------
  insert(r: Rank, d: T) {
    for (let i = this._size; i > r; i--) this._data[i] = this._data[i - 1]
    this._data[r] = d
    this._size++
    return r
  }

  remove() {}
}
