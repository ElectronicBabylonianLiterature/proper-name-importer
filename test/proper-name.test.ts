import {expect, test} from '@oclif/test'
import PropeName from '../src/proper-name'

describe('WordRepository', () => {
  test
  .add('properName', () => new PropeName({
    lemma: 'Abu',
    homonym: 'I',
    pos: 'PN',
    guideWord: 'Abu (name)',
    origin: 'test',
  }))
  .it('word has correct properties', async ctx => {
    expect(ctx.properName.word).to.deep.equal(
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
      }
    )
  })
})
