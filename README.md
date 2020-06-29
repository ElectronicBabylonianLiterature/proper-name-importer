proper-name-importer
====================

Imports proper names to Dictionary.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Maintainability](https://api.codeclimate.com/v1/badges/830c8cce2a2afd665b75/maintainability)](https://codeclimate.com/github/ElectronicBabylonianLiterature/proper-name-importer/maintainability)

<!-- toc -->
* [Usage](#usage)
<!-- tocstop -->

# Usage
<!-- usage -->
```sh-session
$ npm install -g @electronicbabylonianliterature/proper-name-importer
$ import-names COMMAND
running command...
$ import-names (-v|--version|version)
@electronicbabylonianliterature/proper-name-importer/1.0.0 win32-x64 node-v14.2.0
$ import-names --help [COMMAND]
USAGE
  $ import-names COMMAND
...
```
<!-- usagestop -->

The file be a valid JSON containing an array of objets with following string properties `lemma`,
`guideWord`, `pos`, `origin`. A new word is added to the `words` collection in the database.
If the data contains duplicate lemmata, a new homonym is created for each.
