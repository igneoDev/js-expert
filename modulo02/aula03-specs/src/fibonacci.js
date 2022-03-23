
export class Fibonacci {
  * execute (input, current = 0, next = 1) {
    if (input === 0) {
      return current
    }
    // if (input === 1) {
    //   return next
    // }
    yield current
    yield * this.execute(input - 1, next, current + next)
  }
}
