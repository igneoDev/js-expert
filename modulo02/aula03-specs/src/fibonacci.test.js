import assert from 'assert'
import sinon from 'sinon'
import { Fibonacci } from './fibonacci.js'

// Fibonacci: o proóximo valor corresponde a soma dos dois anteriores
// dado 3: 0, 1, 1
// dado 5: 0, 1, 1, 2, 3
;
(async () => {
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci, fibonacci.execute.name)
    for await (const i of fibonacci.execute(3)) { console.log(i, spy.callCount) }
    // nosso algoritmo começa do 0
    const expectedCallCount = 4
    assert.deepStrictEqual(spy.callCount, expectedCallCount)
  }
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci, fibonacci.execute.name)
    const [...results] = fibonacci.execute(5)
    // [0] input = 5, current = 0, next = 1
    // [1] input = 4, current = 1, next = 1
    // [2] input = 3, current = 1, next = 2
    // [3] input = 2, current = 2, next = 3
    // [4] input = 1, current = 3, next = 5
    // [5] input = 0 -> Para o input 0, o algoritmo para a execução

    const { args } = spy.getCall(2)

    const expected = [0, 1, 1, 2, 3]
    const expectedParams = Object.values({
      input: 3,
      current: 1,
      next: 2
    })

    assert.deepStrictEqual(args, expectedParams)
    assert.deepStrictEqual(results, expected)
  }
})()
