import {MongoClient, Collection} from 'mongodb'

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
      _id: `${lemma} I`,
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
