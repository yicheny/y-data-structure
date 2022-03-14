import { BinNode, BinNodePosi, getHeight } from './BinNode'
import { Stack } from '../Stack/Stack'

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

  //先序遍历-迭代版1
  private travPre_I1(x: BinNodePosi<T>, visit: Visit<T>) {
    const s = new Stack<BinNodePosi<T>>()
    if (x) s.push(x)
    while (!s.empty()) {
      x = s.pop()
      // @ts-ignore
      visit(x.getData())
      // @ts-ignore
      if (x.hasRChild()) s.push(x)
      // @ts-ignore
      if (x.hasLChild()) s.push(x)
    }
  }

  //先序遍历-迭代版2
  private travPre_I2(x: BinNodePosi<T>, visit: Visit<T>) {
    const s = new Stack<BinNodePosi<T>>()
    while (true) {
      this.visitAlongLeftBranch(x, visit, s)
      if (s.empty()) break
      x = s.pop()
    }
  }

  private visitAlongLeftBranch(x: BinNodePosi<T>, visit: Visit<T>, s: Stack<BinNodePosi<T>>) {
    while (x) {
      visit(x.getData())
      s.push(x.getRC())
      x = x.getLC()
    }
  }

  //中序遍历-递归
  private travIn_R(x: BinNodePosi<T>, visit: Visit<T>) {
    if (!x) return
    this.travPre_R(x.getLC(), visit)
    visit(x.getData())
    this.travPre_R(x.getRC(), visit)
  }

  //中序迭代-迭代1
  private travIn_I1(x: BinNodePosi<T>, visit: Visit<T>) {
    const s = new Stack<BinNodePosi<T>>()
    while (true) {
      this.goAlongLeftBranch(x, s)
      if (s.empty()) break
      x = s.pop()
      // @ts-ignore
      visit(x.getData())
      x = x?.getRC()
    }
  }

  private goAlongLeftBranch(x: BinNodePosi<T>, s: Stack<BinNodePosi<T>>) {
    while (x) {
      s.push(x.getRC())
      x = x.getLC()
    }
  }

  //中序遍历-迭代2
  private travIn_I2(x: BinNodePosi<T>, visit: Visit<T>) {
    const s = new Stack<BinNodePosi<T>>()
    while (true) {
      if (x) {
        s.push(x)
        x = x.getLC()
      } else if (!s.empty()) {
        x = s.pop()
        // @ts-ignore
        visit(x?.getData())
        x = x?.getRC()
      } else {
        break
      }
    }
  }

  //中序遍历-迭代3
  private travIn_I3(x: BinNodePosi<T>, visit: Visit<T>) {
    let backtrack: boolean = false

    while (true) {
      if (!backtrack && x?.hasLChild()) {
        x = x.getLC()
      } else {
        // @ts-ignore
        visit(x.getData())
        if (x?.hasRChild()) {
          x = x.getRC()
          backtrack = false
        } else {
          if (!(x = x?.succ())) break
          backtrack = true
        }
      }
    }
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
