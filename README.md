# @nordnet/cz-conventional-changelog

[![NPM version][npm-image]][npm-url]
[![Build][travis-image]][travis-url]
[![Dependency Status][depstat-image]][depstat-url]

> conventional-changelog config for commitizen

## Prerequisite

As far as its [commitizen](https://github.com/commitizen/cz-cli) config, you should have one in the first place.

    npm install --save-dev commitizen
    # or
    yarn add --dev commitizen

## Install

    npm install --save-dev @nordnet/cz-conventional-changelog
    # or
    yarn add --dev @nordnet/cz-conventional-changelog

Add this field into your `package.json`

```js
  "config": {
    "commitizen": {
      "path": "@nordnet/cz-conventional-changelog"
    }
  },
```

Add commit script to your npm scripts in `package.json`:

```js
  "scripts": {
    "commit": "git-cz",
    // …
  },
```

## Usage

    npm run commit
    # or
    yarn commit

## API

commitizen with this config enabled will ask 6 questions.

Note:

- `BREAKING CHANGE` will trigger major release
- `feat` type will trigger minor release
- `fix` type will trigger patch release

`{npm,yarn} run commit` will generate messages like these:

- `fix: fix broken button`
- `fix(Button): fix broken onClick handler`
- ```
  feat(CtaButton): add new component

  new Call-to-Action Button component to be used in Marketing campaigns
  ```

- ```
  fix: remove deprecated endpoints

  BREAKING CHANGE: remove previously exported endpoints (endpoint1, endpoint2)
  ```

- ```
  docs: document gravity

  Closed issues: UNIVERSE-1
  ```

- ```
  feat(standardModel): proof Higgs boson

  validate the Standard Model

  BREAKING CHANGE: Symmetry of the electroweak interaction

  Closed issues: UNIVERSE-21
  ```

Template is:

```
${type}{${ scope ? `(${scope})` : '' }}: ${shortDescription}

${longerDescription}

${breaking ? : `BREAKING CHANGE: ${breaking}` : ''}

${closes ? : `Closes issues: ${closes}` : ''}
```

### Type

- Required: `true`
- Examples: `feat`, `fix`, etc

> - **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
> - **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
> - **docs**: Documentation only changes
> - **feat**: A new feature
> - **fix**: A bug fix
> - **perf**: A code change that improves performance
> - **refactor**: A code change that neither fixes a bug nor adds a feature
> - **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
> - **test**: Adding missing tests or correcting existing tests
>
> —[github/angular/angular/CONTRIBUTING.md#type](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#type)

Note:

- `feat` will trigger minor release
- `fix` will trigger patch release

### Scope

- Required: `false`
- Examples: `Button`, `historyDuck`, `l10n`, etc

The scope should be the name of code entity affected. Say react component, redux duck, l10n

### Short description

- Required: `true`

The short description contains succinct description of the change

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize first letter
- no dot (.) at the end

### Longer description

- Required: `false`

Just as in the **short description**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### BREAKING CHANGE

- Required: `false`
- Examples: `remove previously exported endpoints (endpoint1, endpoint2)`

Free text input. **Will be prepended with `BREAKING CHANGE: ` automatically.**

### Closes issues

- Required: `false`
- Examples: `UNIVERSE-1`, `CERN-13, CERN-29`, etc

Free text input. **Will be prepended with `Closes issues: ` automatically.**

## License

MIT © [Nordnet Bank AB](https://www.nordnet.se)

[npm-url]: https://npmjs.org/package/@nordnet/cz-conventional-changelog
[npm-image]: https://img.shields.io/npm/v/@nordnet/cz-conventional-changelog.svg?style=flat-square
[travis-url]: https://travis-ci.org/nordnet/cz-conventional-changelog
[travis-image]: https://img.shields.io/travis/nordnet/cz-conventional-changelog.svg?style=flat-square
[depstat-url]: https://david-dm.org/nordnet/cz-conventional-changelog
[depstat-image]: https://david-dm.org/nordnet/cz-conventional-changelog.svg?style=flat-square
