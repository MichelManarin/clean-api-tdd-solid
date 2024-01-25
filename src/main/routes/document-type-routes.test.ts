import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let documentTypeCollection: Collection
let accountCollection: Collection
describe('TypeDocument Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    documentTypeCollection = await MongoHelper.getCollection('document_type')
    await documentTypeCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return an 403 on add document type without accessToken', async () => {
    await request(app)
      .post('/api/type-document')
      .send(
        {
          name: 'valid_name',
          fields: [{
            id: 'valid_id',
            name: 'valid_name',
            type: 'valid_type',
            value: 'valid_value',
            required: true,
            readonly: false,
            sensitive: false,
            seekable: false,
            hidden: false
          }]
        })
      .expect(403)
  })

  test('Should return an 204 on add document type with valid accessToken', async () => {
    const res = await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    const id = res.ops[0]._id
    const accessToken = sign({ id }, env.jwtSecret)
    await accountCollection.updateOne({
      _id: id
    }, {
      $set: {
        accessToken
      }
    })
    await request(app)
      .post('/api/type-document')
      .set('x-access-token', accessToken)
      .send(
        {
          name: 'valid_name',
          fields: [{
            id: 'valid_id',
            name: 'valid_name',
            type: 'valid_type',
            value: 'valid_value',
            required: true,
            readonly: false,
            sensitive: false,
            seekable: false,
            hidden: false
          }]
        })
      .expect(200)
  })

  test('Should return an 403 on add custom field without accessToken', async () => {
    const newDocumentType = await documentTypeCollection.insertOne({
      name: 'valid_name'
    })

    await request(app)
      .post('/api/type-document/field')
      .send(
        {
          documentTypeId: newDocumentType.ops[0]._id,
          field: {
            id: 'valid_id',
            name: 'valid_name',
            type: 'valid_type',
            value: 'valid_value',
            required: true,
            readonly: false,
            sensitive: false,
            seekable: false,
            hidden: false
          }
        })
      .expect(403)
  })

  test('Should return an 204 on add custom field with valid accessToken', async () => {
    const res = await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    const id = res.ops[0]._id
    const accessToken = sign({ id }, env.jwtSecret)
    await accountCollection.updateOne({
      _id: id
    }, {
      $set: {
        accessToken
      }
    })
    const newDocumentType = await documentTypeCollection.insertOne({
      name: 'valid_name'
    })
    await request(app)
      .post('/api/type-document/field')
      .set('x-access-token', accessToken)
      .send(
        {
          documentTypeId: newDocumentType.ops[0]._id,
          field: {
            id: 'valid_id',
            name: 'valid_name',
            type: 'valid_type',
            value: 'valid_value',
            required: true,
            readonly: false,
            sensitive: false,
            seekable: false,
            hidden: false
          }
        })
      .expect(200)
  })
})
