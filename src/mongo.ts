import {MongoClientOptions, MongoClient} from 'mongodb'

function createOptions(useSsl: boolean): MongoClientOptions {
  const options: MongoClientOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  if (useSsl) {
    options.ssl = true
    options.sslValidate = false
  }
  return options
}
export function createClient(uri: string, useSsl: boolean): MongoClient {
  const options = createOptions(useSsl)
  return new MongoClient(uri, options)
}
