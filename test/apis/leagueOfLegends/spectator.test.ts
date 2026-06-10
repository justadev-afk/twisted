import * as httpStatus from '../../../src/constants/http-status'
import { SpectatorApi } from '../../../src/apis/lol/spectator/spectator'
import { Regions } from '../../../src/constants'

describe('Spectator API', () => {
  describe('Active game', () => {
    const request = jest.fn()
    const testId = 'id'
    const testRegion = Regions.AMERICA_NORTH

    beforeEach(() => {
      (SpectatorApi.prototype as any).request = request
    })

    afterEach(() => {
      request.mockClear()
    })

    it('Should return error message if dont exists an active game', async () => {
      request.mockImplementation(() => {
        const error: any = new Error()
        error.statusCode = httpStatus.NOT_FOUND
        throw error
      })
      const api = new SpectatorApi()
      const response = await api.activeGame(testId, testRegion)
      expect(response).toHaveProperty('message')
    })
    it('Should throw error with another status code errors', (done) => {
      request.mockImplementation(() => {
        const error: any = new Error()
        error.statusCode = httpStatus.FORBIDDEN
        throw error
      })
      const api = new SpectatorApi()
      api.activeGame(testId, testRegion)
        .then(() => done(new Error('Bad error handler response')))
        .catch(() => done())
    })
  })
})
