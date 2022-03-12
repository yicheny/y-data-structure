export type BinNodePosi<T> = Voidable<BinNode<T>>

enum RB_COLOR {
  RB_RED,
  RB_BLACK
}

interface Props<T> {
  e: T
  p?: BinNodePosi<T>
  lc?: BinNodePosi<T>
  rc?: BinNodePosi<T>
  height?: number
  npl?: number
  c?: RB_COLOR
}

export class BinNode<T> {
  // 成员属性
  private _data: T
  private _parent: BinNodePosi<T>
  private _lc: BinNodePosi<T>
  private _rc: BinNodePosi<T>
  private _height: number
  private _npl: number
  private _color: RB_COLOR

  // 构造函数
  constructor(props: Props<T>) {
    const { e, p = null, lc = null, rc = null, height = 0, npl = 0, c = RB_COLOR.RB_RED } = props
    this._data = e
    this._parent = p
    this._lc = lc
    this._rc = rc
    this._height = height
    this._npl = npl
    this._color = c
  }

  // --------------修改相关-------------
  insertAsLC(e: T): BinNodePosi<T> {
    return (this._lc = new BinNode<T>({ e, p: this }))
  }

  insertAsRC(e: T): BinNodePosi<T> {
    return (this._rc = new BinNode<T>({ e, p: this }))
  }

  // --------------查询相关--------------
  isRoot() {
    return this._parent === null
  }

  isLChild() {
    return !this.isRoot() && this === this._parent?._lc
  }

  isRChild() {
    return !this.isRoot() && this === this._parent?._rc
  }

  hasParent() {
    return !this.isRoot()
  }

  hasLChild() {
    return this._lc
  }

  hasRChild() {
    return this._rc
  }

  hasChild() {
    return this.hasLChild() || this.hasRChild()
  }

  hasBothChild() {
    return this.hasLChild() && this.hasRChild()
  }

  isLeaf() {
    return !this.hasChild()
  }

  sibling() {
    return this.isLChild() ? this._parent?._rc : this._parent?._lc
  }

  uncle() {
    return this.isLChild() ? this._parent?._parent?._rc : this._parent?._parent?._lc
  }

  //修改父节点关联关系
  setFormParentTo(x: BinNodePosi<T>) {
    if (this.isRoot()) return null
    if (this.isLChild()) return this.setLC(x)
    return this.setRC(x)
  }

  //--------------Bean相关--------------
  getHeight() {
    return this._height
  }

  setHeight(x: number) {
    this._height = x
  }

  getLC() {
    return this._lc
  }

  setLC(x: BinNodePosi<T>) {
    this._lc = x
  }

  getRC() {
    return this._lc
  }

  setRC(x: BinNodePosi<T>) {
    this._rc = x
  }

  getParent() {
    return this._parent
  }

  setParent(x: BinNodePosi<T>) {
    this._parent = x
  }

  getData() {
    return this._data
  }
}

export function getHeight<T>(x: BinNodePosi<T>) {
  return x ? x.getHeight() : -1
}
