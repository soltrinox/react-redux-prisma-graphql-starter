const delay = require('./delay')

describe.only('delay', () => {
  test('delay resolve with a promise', async () => {
    await delay(1000).then(resolve => {
      expect(resolve).toEqual('called')
    })
  })

  // NOTE jest.useFakeTimers overwrites setTimeout, setInterval etc
  // write tests below this test if you want to make use of that else, above
  // reference: https://jestjs.io/docs/en/timer-mocks
  test('delay calls timeout with one second', async () => {
    jest.useFakeTimers()

    delay(1000)

    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000)
  })
})
