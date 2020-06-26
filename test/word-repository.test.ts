import {expect} from '@oclif/test'
import {withDatabase} from './context'
import WordRepository from '../src/word-repository'
import ProperName from './../src/proper-name'

describe('WordRepository', () => {
  withDatabase
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
