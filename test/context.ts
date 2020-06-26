import {test} from '@oclif/test'
import {MongoMemoryServer} from 'mongodb-memory-server'
import {MongoClient} from 'mongodb'

export const withDatabase = test
.add('db', () => 'ebltest')
.add('mongod', () => new MongoMemoryServer())
.finally(async ctx => ctx.mongod.stop())
.add('uri', async ctx => ctx.mongod.getUri())
.add('client', async ctx => new MongoClient(ctx.uri, {useNewUrlParser: true, useUnifiedTopology: true}))
.do(async ctx => ctx.client.connect())
.finally(async ctx => ctx.client.close())
.add('collection', ctx => ctx.client.db(ctx.db).collection('words'))
