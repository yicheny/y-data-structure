type Rank = number

export class Vector<T> {
  private _size: Rank
  protected readonly _data: Array<T>

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

  remove(r: Rank) {
    const x = this._data[r]
    this._removeRank(r, r + 1)
    return x
  }

  private _removeRank(lo: Rank, hi: Rank) {
    if (hi <= lo) return 0
    while (hi < this._size) {
      this._data[lo++] = this._data[hi++]
    }
    this._size = lo //更新规模，丢弃尾部[lo,_size=hi)的内容--注：此时lo已增长为删除后的长度
    return hi - lo
  }
}
