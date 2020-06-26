import {expect, test} from '@oclif/test'
import {MongoMemoryServer} from 'mongodb-memory-server'
import {MongoClient} from 'mongodb'

import cmd = require('../src')

function runCommand(ctx: {
  db: string;
  uri: string;
}) {
  return cmd.run(['--host', ctx.uri, '--db', ctx.db, './test/proper-names.json'])
}

describe('proper-name-importer', () => {
  test
  .do(() => cmd.run([]))
  .exit(2)
  .it('missing file argument')

  test
  .do(() => cmd.run(['not-found.json']))
  .exit(2)
  .it('file not found')

  const withDatabase = test
  .add('db', () => 'ebltest')
  .add('mongod', () => new MongoMemoryServer())
  .finally(async ctx => ctx.mongod.stop())
  .add('uri', async ctx => ctx.mongod.getUri())
  .add('client', async ctx => new MongoClient(ctx.uri, {useNewUrlParser: true, useUnifiedTopology: true}))
  .do(async ctx => ctx.client.connect())
  .finally(async ctx => ctx.client.close())
  .add('collection', ctx => ctx.client.db(ctx.db).collection('words'))

  const word = {
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
  }

  withDatabase
  .do(runCommand)
  .it('imports proper names', async ctx => {
    const fragments = await ctx.collection.find().toArray()
    expect(fragments).to.deep.equal([word])
  })

  withDatabase
  .stderr()
  .do(async ctx => ctx.collection.insertOne(word))
  .do(runCommand)
  .it('breaks', async ctx => {
    expect(ctx.stderr).to.contain('Abu')
    const fragments = await ctx.collection.find().toArray()
    expect(fragments).to.deep.equal([word])
  })
})
