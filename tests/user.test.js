const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should sign up a new user', async () => {
  const response = await request(app).post('/users').send({
    name: 'Cecilia',
    email: 'cecilia@example.com',
    password: 'cecilia1017'
  }).expect(201)

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id)
  expect(user).not.toBeNull()

  //Assertions about the response (object)
  expect(response.body).toMatchObject({
    user: {
      name: 'Cecilia',
      email: 'cecilia@example.com'
    },
    token: user.tokens[0].token
  })

  expect(user.password).not.toBe('cecilia1017')
})

test('Should login existing user', async () => {
  const response = await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password
  }).expect(200)

  const user = await User.findById(userOneId)
  expect(response.body.token).toBe(user.tokens[1].token)
})

test('Shoud not login nonexisting user', async () => {
  await request(app).post('/users/login').send({
    email: userOne.email,
    password: 'asdititgergerg'
  }).expect(400)
})

test('Should get profile for user', async () => {
  await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
  await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete the account for user', async () => {
  const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
  
  const user = await User.findById(userOneId)
  expect(user).toBeNull()
})

test('Should not delete the account without authorization', async () => {
  await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
  await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

  const user = await User.findById(userOneId)
  expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
  await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
          name: 'Jenny'
        })
        .expect(200)
  
  const user = await User.findById(userOneId)
  expect(user.name).toEqual('Jenny')
})

test('Should not update invalid user fields', async () => {
  await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
          location: 'Calgary'
        })
        .expect(400)
})


