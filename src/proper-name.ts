import {toRoman} from 'roman-numerals'

const wordTemplate: {readonly [key: string]: unknown} = {
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

    readonly homonym: number

    readonly pos: string

    readonly guideWord: string

    readonly origin: string

    constructor(config: {lemma: string; homonym: number; pos: string; guideWord: string; origin: string}) {
      this.lemma = config.lemma
      this.homonym = config.homonym
      this.pos = config.pos
      this.guideWord = config.guideWord
      this.origin = config.origin
    }

    get word() {
      const homonym = toRoman(this.homonym)
      const id = `${this.lemma} ${homonym}`
      return {
        ...wordTemplate,
        _id: id,
        lemma: [this.lemma],
        homonym: homonym,
        legacyLemma: id,
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
