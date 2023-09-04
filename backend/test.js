const request = require('supertest')
const app = require('./server') // Adjust the path based on your folder structure
const fs = require('fs')
const express = require('express')
const path = require('path')

app.use(express.json())

describe('Static responses are working', () => {
  it('should return hello world on test', async () => {
    const response = await request(app).get('/api/test')
    expect(response.status).toEqual(200)
    expect(response.text).toEqual('Hello World!')
  })

  it('should return cool message on test2', async () => {
    const response = await request(app).get('/api/test2')
    expect(response.status).toEqual(200)
    expect(response.text).toEqual('Dan is sick nasty with it.')
  })
})

describe('upload route', () => {
  jest.setTimeout(20000)
  const imagePath = path.join(
    __dirname,
    '../frontend/public/carImages/ae86red.jpg'
  )

  const imageBuffer = fs.readFileSync(imagePath)

  it('should some types on a correct image upload', async () => {
    const res = await request(app)
      .post('/api/upload')
      .attach('image', imageBuffer, 'image.jpg')

    const aiPredictions = JSON.parse(res.text)
    // console.log(aiPredictions)

    expect(res.status).toEqual(200)
    expect(aiPredictions.response.predictions).toBeDefined()
    expect(aiPredictions.response.predictions.length).toBeGreaterThan(0)
  })
})
