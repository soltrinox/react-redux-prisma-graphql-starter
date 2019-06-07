const timeMeasure = require('./timeMeasure')

describe('timeMeasure', () => {
  test('runs function and receives correct output', () => {
    const fakeFunc = jest.fn()
    fakeFunc.mockReturnValue('hello')

    const {fakeFunc: result} = timeMeasure({
      fakeFunc
    })

    expect(fakeFunc).toHaveBeenCalled()
    expect(result).toEqual('hello')
  })

  test('runs function and the console.time, console.timeEnd calls are made', () => {
    global.console = {time: jest.fn(), timeEnd: jest.fn()}

    const fakeFunc = jest.fn()
    fakeFunc.mockReturnValue('hello')

    const {fakeFunc: result} = timeMeasure({
      fakeFunc
    })

    expect(fakeFunc).toHaveBeenCalled()
    expect(result).toEqual('hello')
    expect(console.time).toBeCalled()
    expect(console.timeEnd).toBeCalled()
    expect(console.time).toHaveBeenCalledWith('fakeFunc')
    expect(console.timeEnd).toHaveBeenCalledWith('fakeFunc')
  })

  test('runs two functions and the console.time, console.timeEnd calls are made', () => {
    global.console = {time: jest.fn(), timeEnd: jest.fn()}

    const fakeFunc1 = jest.fn()
    fakeFunc1.mockReturnValue('hello')
    const fakeFunc2 = jest.fn()
    fakeFunc2.mockReturnValue('world')

    const {fakeFunc1: result1, fakeFunc2: result2} = timeMeasure([
      {
        fakeFunc1
      },
      {fakeFunc2}
    ])

    expect(fakeFunc1).toHaveBeenCalled()
    expect(result1).toEqual('hello')
    expect(console.time).toBeCalled()
    expect(console.timeEnd).toBeCalled()
    expect(console.time).toHaveBeenCalledWith('fakeFunc1')
    expect(console.timeEnd).toHaveBeenCalledWith('fakeFunc1')

    expect(fakeFunc2).toHaveBeenCalled()
    expect(result2).toEqual('world')
    expect(console.time).toBeCalled()
    expect(console.timeEnd).toBeCalled()
    expect(console.time).toHaveBeenCalledWith('fakeFunc2')
    expect(console.timeEnd).toHaveBeenCalledWith('fakeFunc2')
  })
})
