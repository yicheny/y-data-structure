// @ts-ignore
import { Queue } from '../src/Queue/Queue'

describe('Queue测试', () => {
  it('初始化', () => {
    const q = new Queue<number>()
    expect(q).toBeInstanceOf(Queue)
    expect(q.front()).toBeUndefined()
  })

  it('enqueue()', () => {
    const q = new Queue<number>()
    q.enqueue(1)
    q.enqueue(2)
    q.enqueue(3)
    expect(q.size()).toBe(3)
    expect(q.front()).toBe(1)
  })

  it('dequeue()', () => {
    const q = new Queue<number>()
    q.enqueue(1)
    q.enqueue(2)
    q.enqueue(3)
    q.enqueue(4)
    q.dequeue()
    expect(q.size()).toBe(3)
    expect(q.front()).toBe(2)
  })
})
