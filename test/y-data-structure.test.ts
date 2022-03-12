import { BinNode } from '../src/y-data-structure'

/**
 * Dummy test
 */
describe('BinNode测试', () => {
  it('基础测试', () => {
    const bn = new BinNode<number>({ e: 1 })
    console.log(bn)
  })
})
