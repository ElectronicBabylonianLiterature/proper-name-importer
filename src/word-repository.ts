import {MongoClient, Collection} from 'mongodb'
import * as _ from 'lodash'
import ProperName from './proper-name'

export default class WordRepository {
  private readonly client: MongoClient

  private readonly db: string

  constructor(client: MongoClient, db: string) {
    this.client = client
    this.db = db
  }

  private get collection(): Collection {
    return this.client.db(this.db).collection('words')
  }

  async insertProperName(propeName: ProperName): Promise<void> {
    await this.collection.insertOne(propeName.word)
  }

  async hasWord(id: string): Promise<boolean> {
    return !_.isNil(await this.collection.findOne({_id: id}))
  }

  async addOraccWord(properName: ProperName): Promise<void> {
    await this.collection.updateOne(
      {_id: properName.id},
      {$addToSet: {oraccWords: properName.oraccWord}},
    )
  }
}
