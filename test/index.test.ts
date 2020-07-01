import {expect, test} from '@oclif/test'
import {withDatabase} from './context'

import cmd = require('../src')

function runCommand(file: string) {
  return (ctx: {
    db: string;
    uri: string;
  }) => cmd.run(['--uri', ctx.uri, '--db', ctx.db, `./test/${file}`])
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

  const abu_i = {
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

  withDatabase
  .do(runCommand('proper-names.json'))
  .it('imports proper names', async ctx => {
    const fragments = await ctx.collection.find().toArray()
    expect(fragments).to.deep.equal([abu_i])
  })

  withDatabase
  .stdout()
  .add('words', () => [abu_i, {...abu_i, _id: 'Abu II', homonym: 'II', pos: ['GN']}])
  .do(async ctx => ctx.collection.insertMany(ctx.words))
  .do(runCommand('duplicate-lemmas.json'))
  .it('reports duplicates in the database', async ctx => {
    expect(ctx.stdout).to.contain(`Abu I PN is duplicate.
Abu II SN is duplicate.
\tAbu I PN test
\tAbu II GN test`)
    const fragments = await ctx.collection.find().toArray()
    expect(fragments).to.deep.equal(ctx.words)
  })

  withDatabase
  .do(runCommand('duplicate-lemmas.json'))
  .it('creates homonyms on duplicate lemma', async ctx => {
    const fragments = await ctx.collection.find().toArray()
    expect(fragments).to.deep.equal([
      abu_i,
      {
        _id: 'Abu II',
        lemma: ['Abu'],
        homonym: 'II',
        attested: true,
        legacyLemma: 'Abu',
        forms: [],
        meaning: '',
        logograms: [],
        derived: [],
        derivedFrom: null,
        amplifiedMeanings: [],
        pos: ['SN'],
        guideWord: 'Abu (city)',
        oraccWords: [
          {
            lemma: 'Abu',
            guideWord: 'Abu (city)',
          },
        ],
        origin: 'test',
      },
    ])
  })
})
