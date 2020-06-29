import {expect, test} from '@oclif/test'
import PropeName from '../src/proper-name'

describe('ProperName', () => {
  const properName = test
  .add('properName', () => new PropeName({
    lemma: 'Abu',
    homonym: 1,
    pos: 'PN',
    guideWord: 'Abu (name)',
    origin: 'test',
  }))

  properName.it('word has correct properties', async ctx => {
    expect(ctx.properName.word).to.deep.equal(
      {
        _id: 'Abu I',
        lemma: ['Abu'],
        homonym: 'I',
        attested: true,
        legacyLemma: 'Abu',
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

  properName.it('has correct homonym', ctx => {
    expect(ctx.properName.homonym).to.equal('I')
  })

  properName.it('has correct id', ctx => {
    expect(ctx.properName.id).to.equal('Abu I')
  })

  properName.it('has correct oraccWord', ctx => {
    expect(ctx.properName.oraccWord).to.deep.equal({
      lemma: 'Abu',
      guideWord: 'Abu (name)',
    })
  })
})
