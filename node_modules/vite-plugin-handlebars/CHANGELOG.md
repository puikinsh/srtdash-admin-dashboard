# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.0](https://github.com/alexlafroscia/vite-plugin-handlebars/compare/v1.6.0...v2.0.0) (2024-01-06)

### ⚠ BREAKING CHANGES

- Versions of Vite older than `5.0.0` are no longer tested against or guaranteed to work
- Only distribute ESM build of package. This package no longer works as a CommonJS import. If you need to use it from a CommonJS context, you can import it using `import()`

### Features

- Support Vite 5 ([#255](https://github.com/alexlafroscia/vite-plugin-handlebars/issues/255)) ([0e1fffd](https://github.com/alexlafroscia/vite-plugin-handlebars/commit/0e1fffd00c57400be91dccc1fdd895b0e8aca02d))

## [1.6.0](https://github.com/alexlafroscia/vite-plugin-handlebars/compare/v1.5.1...v1.6.0) (2021-06-25)

### Features

- allow registering of helpers ([f8b0a4b](https://github.com/alexlafroscia/vite-plugin-handlebars/commit/f8b0a4b12d1997a308a4ab75163788c45fb166e2))

### [1.5.1](https://github.com/alexlafroscia/vite-plugin-handlebars/compare/v1.5.0...v1.5.1) (2021-03-29)

### Bug Fixes

- normalize paths for Windows support ([af4d8d7](https://github.com/alexlafroscia/vite-plugin-handlebars/commit/af4d8d7c4ae0854952f7956b860f854461d8f940))

## [1.5.0](https://github.com/alexlafroscia/vite-plugin-handlebars/compare/v1.4.2...v1.5.0) (2021-03-26)

### Features

- expose page path to `context` functions ([#42](https://github.com/alexlafroscia/vite-plugin-handlebars/issues/42)) ([0a4441f](https://github.com/alexlafroscia/vite-plugin-handlebars/commit/0a4441f6ae53b81cb1c3f18dff5a0fcd6bae1455))

### [1.4.2](https://github.com/alexlafroscia/vite-plugin-handlebars/compare/v1.4.1...v1.4.2) (2021-03-26)

### Bug Fixes

- avoid disrupting HMR ([e7ab905](https://github.com/alexlafroscia/vite-plugin-handlebars/commit/e7ab905d48db37b79e8eefbda6471a70e310f8ca)), closes [#38](https://github.com/alexlafroscia/vite-plugin-handlebars/issues/38)

### [1.4.1](https://github.com/alexlafroscia/vite-plugin-handlebars/compare/v1.4.0...v1.4.1) (2021-03-21)

### Bug Fixes

- handle async functions in context ([8b5eef4](https://github.com/alexlafroscia/vite-plugin-handlebars/commit/8b5eef4f068563cebafb4eefb07757c6c7a88ca8))

## [1.4.0](https://github.com/alexlafroscia/vite-plugin-handlebars/compare/v1.3.0...v1.4.0) (2021-03-21)

### Features

- reload page on partial change ([3976806](https://github.com/alexlafroscia/vite-plugin-handlebars/commit/3976806caf6d4a68d00a6fa38b7b83a0150c979b)), closes [#2](https://github.com/alexlafroscia/vite-plugin-handlebars/issues/2)

## [1.3.0](https://github.com/alexlafroscia/vite-plugin-handlebars/compare/v1.2.0...v1.3.0) (2021-03-20)

### Features

- support functions as context values ([9780f4b](https://github.com/alexlafroscia/vite-plugin-handlebars/commit/9780f4b56dbc62d9bc0846fe43eef0298d3be611))

## [1.2.0](https://github.com/alexlafroscia/vite-plugin-handlebars/compare/v1.1.2...v1.2.0) (2021-03-19)

### Features

- add ability to process multiple partial folders ([#28](https://github.com/alexlafroscia/vite-plugin-handlebars/issues/28)) ([fbcb39f](https://github.com/alexlafroscia/vite-plugin-handlebars/commit/fbcb39f4c14e2279f5dccc391f0fd00109752545))
- support nested partial directories ([9e657b2](https://github.com/alexlafroscia/vite-plugin-handlebars/commit/9e657b2fecc045eb0d1b49a3304cde585522aa05))

### Bug Fixes

- only register html or hbs files as partials ([15c67b2](https://github.com/alexlafroscia/vite-plugin-handlebars/commit/15c67b225543e99ac9553355a261dcbb269ffda6))

### [1.1.2](https://github.com/alexlafroscia/vite-plugin-handlebars/compare/v1.1.1...v1.1.2) (2021-02-20)

### Bug Fixes

- read root even if not explicitly provided ([9541b81](https://github.com/alexlafroscia/vite-plugin-handlebars/commit/9541b819417f5a2ae05144ef5bb357b0b6dc9f37))

### [1.1.1](https://github.com/alexlafroscia/vite-plugin-handlebars/compare/v1.1.0...v1.1.1) (2021-02-20)

### Bug Fixes

- ensure files are built before publishing ([8a3ad6f](https://github.com/alexlafroscia/vite-plugin-handlebars/commit/8a3ad6f9e5784b7ce16a694690103fb72a0e1a7e))

## [1.1.0](https://github.com/alexlafroscia/vite-plugin-handlebars/compare/v1.0.4...v1.1.0) (2021-02-20)

### Features

- add `resolve-from-root` helper ([f03f7c9](https://github.com/alexlafroscia/vite-plugin-handlebars/commit/f03f7c992123d2cd07f979be6cfeec3cd682e317))

### [1.0.4](https://github.com/alexlafroscia/vite-plugin-handlebars/compare/v1.0.3...v1.0.4) (2021-02-03)

### Bug Fixes

- move `enforce` to hook definition ([f80ff40](https://github.com/alexlafroscia/vite-plugin-handlebars/commit/f80ff4081e49ea530f6ab49d96394bccabc27991)), closes [/github.com/vitejs/vite/blob/41167277d7c14cbc53877480d0a322bcb1bedd1f/packages/vite/src/node/plugins/html.ts#L403](https://github.com/alexlafroscia//github.com/vitejs/vite/blob/41167277d7c14cbc53877480d0a322bcb1bedd1f/packages/vite/src/node/plugins/html.ts/issues/L403)

### [1.0.3](https://github.com/alexlafroscia/vite-plugin-handlebars/compare/v1.0.1...v1.0.3) (2021-02-03)

### [1.0.2](https://github.com/alexlafroscia/vite-plugin-handlebars/compare/v1.0.1...v1.0.2) (2021-02-03)

### [1.0.1](https://github.com/alexlafroscia/vite-plugin-handlebars/compare/v1.0.0...v1.0.1) (2021-02-03)

### Bug Fixes

- avoid compressing output assets ([dc4ae91](https://github.com/alexlafroscia/vite-plugin-handlebars/commit/dc4ae9120ca961c04c6fb11e637cb2676e89d3a2))
- handle empty partials directory ([d22ef98](https://github.com/alexlafroscia/vite-plugin-handlebars/commit/d22ef98e75a44739758422567fdbb5f57c55262b)), closes [#1](https://github.com/alexlafroscia/vite-plugin-handlebars/issues/1)

## 1.0.0 (2021-02-03)

### Features

- support Handlebars context and basic partials ([2342f8e](https://github.com/alexlafroscia/vite-plugin-handlebars/commit/2342f8e8106fcbea639fbd6e57661a9456ae70cb))

### Bug Fixes

- define files to include in package ([d7eaa30](https://github.com/alexlafroscia/vite-plugin-handlebars/commit/d7eaa300c1ae49b2aad3f31d8c770c1676210195))
