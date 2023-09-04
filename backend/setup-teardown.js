const app = require('./server')

let server

beforeAll((done) => {
  server = app.listen(0, () => {
    done()
  })
})

afterAll((done) => {
  server.close(() => {
    done()
  })
})
