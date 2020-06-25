import {expect, test} from '@oclif/test'
import {MongoMemoryServer} from 'mongodb-memory-server'
import {MongoClient} from 'mongodb'
import WordRepository from '../src/word-repository'
import ProperName from './../src/proper-name'

describe('WordRepository', () => {
  test
  .add('db', () => 'ebltest')
  .add('mongod', () => new MongoMemoryServer())
  .finally(async ctx => ctx.mongod.stop())
  .add('uri', async ctx => ctx.mongod.getUri())
  .add('client', async ctx => new MongoClient(ctx.uri, {useNewUrlParser: true, useUnifiedTopology: true}))
  .do(async ctx => ctx.client.connect())
  .finally(async ctx => ctx.client.close())
  .add('collection', ctx => ctx.client.db(ctx.db).collection('words'))
  .stdout()
  .stderr()
  .add('repository', ctx => new WordRepository(ctx.client, ctx.db))
  .add('properName', () => new ProperName('Abu', 'PN', 'Abu (name)', 'test'))
  .do(async ctx => ctx.repository.insertProperName(ctx.properName))
  .it('creates words', async ctx => {
    const words = await ctx.collection.find().toArray()
    expect(words).to.deep.equal([
      ctx.properName.word,
    ])
  })
})
