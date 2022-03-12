import { BinNode, BinNodePosi, getHeight } from './BinNode'

type Visit<T> = (data: T) => void

export class BinTree<T> {
  protected _size: number
  protected _root: BinNodePosi<T>

  constructor(root?: BinNodePosi<T>, size?: number) {
    this._size = size ?? 0
    this._root = root ?? null
  }

  // ----------------修改相关------------
  private updateHeight(x: BinNodePosi<T>) {
    x?.setHeight(1 + Math.max(getHeight(x.getLC()), getHeight(x.getRC())))
  }

  private updateHeightAbove(x: BinNodePosi<T>) {
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
    x?.insertAsLC(e)
    this.updateHeightAbove(x)
    return x?.getLC()
  }

  insertAsRC(x: BinNodePosi<T>, e: T) {
    this._size++
    x?.insertAsRC(e)
    this.updateHeightAbove(x)
    return x?.getRC()
  }

  //将S作为节点x的左子树接入
  attachAsLC(x: BinNodePosi<T>, S: BinTree<T>) {
    if (S.root()) {
      // @ts-ignore
      x.setLC(S.root())
      x?.getLC()?.setParent(x)
    }
    this._size += S.size()
    this.updateHeightAbove(x)
    return x
  }

  attachAsRC(x: BinNodePosi<T>, S: BinTree<T>) {
    if (S.root()) {
      // @ts-ignore
      x.setRC(S.root())
      x?.getRC()?.setParent(x)
    }
    this._size += S.size()
    this.updateHeightAbove(x)
    return x
  }

  remove(x: BinNodePosi<T>) {
    x?.setFormParentTo(null)
    this.updateHeightAbove(x?.getParent())
    const removeCount = this.getNodeSize(x)
    this._size -= removeCount
    return removeCount
  }

  //分离子树
  secede(x: BinNodePosi<T>) {
    x?.setFormParentTo(null)
    this.updateHeightAbove(x?.getParent())

    const subTreeSize = this.getNodeSize(x)
    const S = new BinTree<T>(x, subTreeSize)
    x?.setParent(null)
    this._size -= subTreeSize
    return S
  }

  traverse() {}

  //先序遍历-递归版
  private travPre_R(x: BinNodePosi<T>, visit: Visit<T>) {
    if (!x) return
    visit(x.getData())
    this.travPre_R(x.getLC(), visit)
    this.travPre_R(x.getRC(), visit)
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

  private getNodeSize(x: BinNodePosi<T>): number {
    if (!x) return 0
    return 1 + this.getNodeSize(x.getLC()) + this.getNodeSize(x.getRC())
  }
}
