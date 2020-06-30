import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import * as _ from 'lodash'
import WordRepository from './word-repository'
import ProperName from './proper-name'
import {createClient} from './mongo'
import {ProperNames, readJson} from './json'

async function insertProperName(repository: WordRepository, properName: ProperName) {
  try {
    await repository.insertProperName(properName)
  } catch (error) {
    cli.warn(error)
  }
}

async function inserProperNamesForLemma(lemma: string, names: ProperName[], repository: WordRepository): Promise<void> {
  const words = await repository.findWords(lemma)
  if (_.isEmpty(words)) {
    for (const properName of names) {
      // eslint-disable-next-line no-await-in-loop
      await insertProperName(repository, properName)
    }
  } else {
    for (const properName of names) {
      cli.log(`${properName.lemma} ${properName.homonym} ${properName.pos} is duplicate.`)
      for (const word of words) {
        cli.log(`\t${word.lemma} ${word.homonym} ${word.pos} ${word.origin}`)
      }
    }
  }
}

async function insertProperNames(uri: string, ssl: boolean, db: string, properNames: ProperNames) {
  const client = createClient(uri, ssl)
  const repository = new WordRepository(client, db)
  try {
    client.connect()
    for (const [lemma, names] of _.toPairs(properNames)) {
      // eslint-disable-next-line no-await-in-loop
      await inserProperNamesForLemma(lemma, names, repository)
    }
  } finally {
    client.close()
  }
}

class ProperNameImporter extends Command {
  static description = 'Imports proper names from a JSON file to the Dictionary.'

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    uri: flags.string({char: 'u', description: 'MongoDB URI', default: 'mongodb://localhost:27017'}),
    db: flags.string({char: 'd', description: 'database name', default: 'ebl'}),
    ssl: flags.boolean({description: 'Use SSL connection.'}),
  }

  static args = [{name: 'file', description: 'Path to the JSON file', required: true}]

  async run() {
    const {args: {file}, flags: {uri, db, ssl}} = this.parse(ProperNameImporter)

    try {
      cli.action.start(`Loading guide words from ${file}...`)
      const properNames = readJson(file)
      cli.action.stop()

      cli.action.start(`Inserting words to MongoDB ${uri}...`)
      await insertProperNames(uri, ssl, db, properNames)
      cli.action.stop()
    } catch (error) {
      this.error(error)
    }
  }
}

export = ProperNameImporter
