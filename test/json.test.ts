import {expect, test} from '@oclif/test'
import PropeName from '../src/proper-name'
import {readJson} from '../src/json'

describe('readJson', () => {
  test
  .add('result', async () => readJson('./test/duplicate-lemmas.json'))
  .it('groups proper names by lemma', async ctx => {
    expect(ctx.result).to.deep.equal(
      {
        Abu: [
          new PropeName({lemma: 'Abu', guideWord: 'Abu (name)', pos: 'PN', origin: 'test', homonym: 1}),
          new PropeName({lemma: 'Abu', guideWord: 'Abu (city)', pos: 'SN', origin: 'test', homonym: 2}),
        ],
      }
    )
  })
})
