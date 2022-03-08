type BinNodePosi<T> = BinNode<T>

enum RB_COLOR {
  RB_RED,
  RB_BLACK
}

type Nullable<T> = T | null

interface Props<T> {
  e: T
  p?: BinNodePosi<T>
  lc?: BinNodePosi<T>
  rc?: BinNodePosi<T>
  height?: number
  npl?: number
  c?: RB_COLOR
}

class BinNode<T> {
  //成员属性
  private data: T
  public parent: Nullable<BinNodePosi<T>>
  public lc: Nullable<BinNodePosi<T>>
  public rc: Nullable<BinNodePosi<T>>
  public height: number
  private npl: number
  private color: RB_COLOR

  //构造函数
  constructor(props: Props<T>) {
    const { e, p = null, lc = null, rc = null, height = 0, npl = 0, c = RB_COLOR.RB_RED } = props
    this.data = e
    this.parent = p
    this.lc = lc
    this.rc = rc
    this.height = height
    this.npl = npl
    this.color = c
  }
}

//一些常用操作
function isRoot<T>(x: BinNode<T>) {
  return x.parent !== null
}

function isLChild<T>(x: BinNode<T>) {
  return isRoot<T>(x) && x === x.parent?.lc
}
