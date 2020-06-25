import {expect, test} from '@oclif/test'
import {MongoMemoryServer} from 'mongodb-memory-server'
import {MongoClient} from 'mongodb'
import WordRepository from '../src/word-repository'

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
  .do(async ctx => ctx.repository.insertProperName('Abu', 'PN', 'Abu (name)', 'test'))
  .it('creates words', async ctx => {
    const words = await ctx.collection.find().toArray()
    expect(words).to.deep.equal([
      {
        _id: 'Abu I',
        lemma: ['Abu'],
        homonym: 'I',
        attested: true,
        legacyLemma: 'Abu I',
        forms: [],
        meaning: '',
        logograms: [],
        derived: [],
        derivedFrom: null,
        amplifiedMeanings: [],
        pos: ['PN'],
        guideWord: 'Abu (name)',
        oraccWords: [
          {
            lemma: 'Abu',
            guideWord: 'Abu (name)',
          },
        ],
        origin: 'test',
      },
    ])
  })
})
