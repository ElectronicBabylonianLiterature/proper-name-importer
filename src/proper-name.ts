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

export default class ProperName {
    readonly lemma: string

    readonly pos: string

    readonly guideWord: string

    readonly origin: string

    constructor(lemma: string, pos: string, guideWord: string, origin: string) {
      this.lemma = lemma
      this.pos = pos
      this.guideWord = guideWord
      this.origin = origin
    }

    get word() {
      return {
        ...wordTemplate,
        _id: `${this.lemma} I`,
        lemma: ['Abu'],
        legacyLemma: 'Abu I',
        pos: [this.pos],
        guideWord: this.guideWord,
        oraccWords: [
          {
            lemma: this.lemma,
            guideWord: this.guideWord,
          },
        ],
        origin: this.origin,
      }
    }
}
