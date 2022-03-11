import { BinNode, BinNodePosi, getHeight } from './BinNode'

class BinTree<T> {
  protected _size: number
  protected _root: Nullable<BinNodePosi<T>>

  constructor() {
    this._size = 0
    this._root = null
  }

  // ----------------修改相关------------
  updateHeight(x: BinNodePosi<T>) {
    x.setHeight(1 + Math.max(getHeight(x.getLC()), getHeight(x.getRC())))
  }

  updateHeightAbove(x: Nullable<BinNodePosi<T>>) {
    while (x) {
      this.updateHeight(x)
      x = x.getParent()
    }
  }

  insertAsRoot(e: T) {
    this._size = 1
    return (this._root = new BinNode<T>({ e }))
  }

  insertAsLC(x: BinNodePosi<T>, e: T) {
    this._size++
    x.insertAsLC(e)
    this.updateHeightAbove(x)
    return x.getLC()
  }

  insertAsRC(x: BinNodePosi<T>, e: T) {
    this._size++
    x.insertAsRC(e)
    this.updateHeightAbove(x)
    return x.getRC()
  }

  //----------------查询相关------------

  size() {
    return this._size
  }

  empty() {
    return this._root === null
  }

  root() {
    return this._root
  }
}
