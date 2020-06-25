import {MongoClient, Collection} from 'mongodb'

const wordTemplate: {readonly [key: string]: unknown} = {
  homonym: 'I',
  attested: true,
  forms: [],
  meaning: '',
  logograms: [],
  derived: [],
  derivedFrom: null,
  amplifiedMeanings: [],
  pos: [],
  oraccWords: [],
}

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

  async insertProperName(lemma: string, pos: string, guideWord: string, origin: string): Promise<void> {
    await this.collection.insertOne({
      ...wordTemplate,
      _id: `${lemma} I`,
      lemma: ['Abu'],
      legacyLemma: 'Abu I',
      pos: [pos],
      guideWord: guideWord,
      oraccWords: [
        {
          lemma,
          guideWord,
        },
      ],
      origin: origin,
    })
  }
}
