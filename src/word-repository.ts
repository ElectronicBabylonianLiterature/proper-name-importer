import {MongoClient, Collection} from 'mongodb'
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
}
