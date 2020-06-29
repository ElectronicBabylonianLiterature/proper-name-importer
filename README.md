proper-name-importer
====================

Imports proper names to Dictionary.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Maintainability](https://api.codeclimate.com/v1/badges/830c8cce2a2afd665b75/maintainability)](https://codeclimate.com/github/ElectronicBabylonianLiterature/proper-name-importer/maintainability)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage
<!-- usage -->
```sh-session
$ npm install -g @electronicbabylonianliterature/proper-name-importer
$ import-names (-v|--version|version)
@electronicbabylonianliterature/proper-name-importer/1.0.0 win32-x64 node-v14.2.0
$ import-names --help
USAGE
  $ import-names FILE

ARGUMENTS
  FILE  Path to the JSON file

OPTIONS
  -d, --db=db    [default: ebl] database name
  -h, --help     show CLI help
  -u, --uri=uri  [default: mongodb://localhost:27017] MongoDB URI
  -v, --version  show CLI version
  --ssl          Use SSL connection.
```

The file be a valid JSON containing an array of objets with following string properties `lemma`,
`guideWord`, `pos`, `origin`. A new word is added to the `words` collection in the database.
If the data contains duplicate lemmata, a new homonym is created for each.
<!-- usagestop -->
