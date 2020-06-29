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
  .stderr()
  .do(async ctx => ctx.collection.insertOne({...abu_i, oraccWords: [
    {lemma: 'Uba', guideWord: 'Uba'},
  ]}))
  .do(runCommand('proper-names.json'))
  .it('adds oraccWords to existing words', async ctx => {
    const fragments = await ctx.collection.find().toArray()
    expect(fragments).to.deep.equal([{
      ...abu_i,
      oraccWords: [{lemma: 'Uba', guideWord: 'Uba'}, ...abu_i.oraccWords],
    }])
  })

  withDatabase
  .do(async ctx => ctx.collection.insertOne(abu_i))
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
