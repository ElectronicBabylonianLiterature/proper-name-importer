import {expect} from '@oclif/test'
import {withDatabase} from './context'
import WordRepository from '../src/word-repository'
import ProperName from '../src/proper-name'

describe('WordRepository', () => {
  const insertWord = withDatabase
  .add('repository', ctx => new WordRepository(ctx.client, ctx.db))
  .add('properName', () => new ProperName({
    lemma: 'Abu',
    homonym: 1,
    pos: 'PN',
    guideWord: 'Abu (name)',
    origin: 'test',
  }))
  .do(async ctx => ctx.repository.insertProperName(ctx.properName))

  insertWord
  .it('insertWord creates the word', async ctx => {
    const words = await ctx.collection.find().toArray()
    expect(words).to.deep.equal([
      ctx.properName.word,
    ])
  })

  insertWord
  .add('homonym', () => new ProperName({
    lemma: 'Abu',
    homonym: 2,
    pos: 'GN',
    guideWord: 'other Abu',
    origin: 'test',
  }))
  .do(async ctx => ctx.repository.insertProperName(ctx.homonym))
  .it('findWords finds all homonyms', async ctx => {
    const words = await ctx.repository.findWords(ctx.properName.lemma)
    expect(words).to.deep.equal([
      ctx.properName.word,
      ctx.homonym.word,
    ])
  })
})
