import {readFileSync} from 'fs'
import * as _ from 'lodash'
import ProperName from './proper-name'

export interface ProperNames {
  [key: string]: ProperName[];
}

export function readJson(fileName: string): ProperNames {
  return _(readFileSync(fileName, 'utf8'))
  .thru((data): any[] => JSON.parse(data))
  .groupBy('lemma')
  .mapValues(names => names.map((name, index) => new ProperName({...name, homonym: index + 1})))
  .value()
}
