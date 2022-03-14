// @ts-ignore
import { Stack } from '../src/Stack/Stack'

describe('Stack测试', () => {
  it('初始化', () => {
    const s = new Stack<number>()
    expect(s).toBeInstanceOf(Stack)
    expect(s.top()).toBeUndefined()
  })

  it('push()', () => {
    const s = new Stack<number>()
    s.push(1)
    s.push(2)
    s.push(3)
    expect(s.size()).toBe(3)
    expect(s.top()).toBe(3)
  })

  it('pop()', () => {
    const s = new Stack<number>()
    s.push(1)
    s.push(2)
    s.push(3)
    s.pop()
    expect(s.size()).toBe(2)
    expect(s.top()).toBe(2)
  })
})
