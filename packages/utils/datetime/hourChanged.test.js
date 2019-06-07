const hourChanged = require('./hourChanged')

describe('hourChanged', () => {
  test('hour not changed', () => {
    expect(
      hourChanged('2019-01-01T10:00:00+0200', '2019-01-01T10:01:00+0200')
    ).toBeFalsy()
  })

  test('hour has changed', () => {
    expect(
      hourChanged('2019-01-01T10:00:00+0200', '2019-01-01T11:00:00+0200')
    ).toBeTruthy()
  })

  test('hour still changed with date inputs reversed', () => {
    expect(
      hourChanged('2019-01-01T11:00:00+0200', '2019-01-01T10:00:00+0200')
    ).toBeTruthy()
  })

  test('using date objects', () => {
    const dateA = new Date() - 61 * 60 * 1000
    const dateB = new Date()

    expect(hourChanged(dateA, dateB)).toBeTruthy()
  })
})
