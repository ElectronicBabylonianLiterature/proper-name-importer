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
  .it('hasWords returns true if the word exists', async ctx => {
    expect(await ctx.repository.hasWord('Abu I')).equal(true)
  })

  insertWord
  .it('hasWords returns false if the word does not exist', async ctx => {
    expect(await ctx.repository.hasWord('Abu II')).equal(false)
  })
})
