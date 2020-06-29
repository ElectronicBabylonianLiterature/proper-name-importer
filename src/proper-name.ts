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

interface OraccWord {
  lemma: string;
  guideWord: string;
}

export default class ProperName {
    readonly lemma: string

    readonly homonymNumber: number

    readonly pos: string

    readonly guideWord: string

    readonly origin: string

    constructor(config: {lemma: string; homonym: number; pos: string; guideWord: string; origin: string}) {
      this.lemma = config.lemma
      this.homonymNumber = config.homonym
      this.pos = config.pos
      this.guideWord = config.guideWord
      this.origin = config.origin
    }

    get homonym(): string {
      return toRoman(this.homonymNumber)
    }

    get id(): string {
      return `${this.lemma} ${this.homonym}`
    }

    get oraccWord(): OraccWord {
      return {
        lemma: this.lemma,
        guideWord: this.guideWord,
      }
    }

    get word() {
      return {
        ...wordTemplate,
        _id: this.id,
        lemma: [this.lemma],
        homonym: this.homonym,
        legacyLemma: this.lemma,
        pos: [this.pos],
        guideWord: this.guideWord,
        oraccWords: [this.oraccWord],
        origin: this.origin,
      }
    }
}
