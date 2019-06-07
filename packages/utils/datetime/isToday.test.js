const isToday = require('./isToday')

describe('isToday', () => {
  test('date is not today', () => {
    expect(isToday('2019-02-11T11:56:27+02:00')).toBeFalsy()
  })

  test('date is today', () => {
    expect(isToday(new Date())).toBeTruthy()
  })
})
