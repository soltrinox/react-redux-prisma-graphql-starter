const timezoneChanged = require('./timezoneChanged')

describe('timezoneChanged', () => {
  test('failure when not provided with strings as arguments', () => {
    expect(() => timezoneChanged(new Date(), new Date())).toThrowError()
  })

  test('timezone did not change', () => {
    expect(
      timezoneChanged('2019-01-01T11:00:00+0200', '2019-01-01T10:00:00+0200')
    ).toBeFalsy()
  })

  test('timezone changed -1100 vs +0200', () => {
    expect(
      timezoneChanged('2019-01-01T11:00:00-1100', '2019-01-01T10:00:00+0200')
    ).toBeTruthy()
  })
})
