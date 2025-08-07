# `vite-plugin-handlebars`

> Vite support for Handlebars

## Why?

I really like Vite as a simple static site bundler. It can handle bundling multiple HTML files, which is great, but lacks the ability out-of-the-box to share parts of those HTML files.

While a JS framework like React or Vue could be used to solve this problem, this is heavy-handed for a simple site that could be completely pre-rendered without a JS run-time of any kind.

Handlebars provides what we need to be able to stitch together multiple HTML files, interpolate variables, etc.

## Installation

Start by installing the package like you would any other

```
yarn add -D vite-plugin-handlebars
```

It can then be added to your Vite configuration as a plugin:

```javascript
// vite.config.js
import handlebars from 'vite-plugin-handlebars';

export default {
  plugins: [handlebars()],
};
```

Configuring the plugin is covered later in this guide.

### Requirements

- This plugin is intended to work with Vite 2
- This plugin requires Node 14 or higher (due to usage of `fs/promises`)

## Configuration

### Defining Context

If you want to make use of [Handlebars Context](https://handlebarsjs.com/guide/#simple-expressions) to inject variables into your HTML file, you'll need to define their values in the `context` object passed to the `handlebars` plugin:

```html
<!-- index.html -->
<h1>{{title}}</h1>
```

```javascript
// vite.config.js
import handlebars from 'vite-plugin-handlebars';

export default {
  plugins: [
    handlebars({
      context: {
        title: 'Hello, world!',
      },
    }),
  ],
};
```

This will result in `<h1>Hello, world!</h1>` in your output HTML file.

You can also provide a (asynchronous) function, either as the `context` key or any of the keys within the object, which will be evaluated to create the value that will be made available inside your page. This function is called with an identifier parameter based on the HTML file path which makes it possible to provide unique data to each HTML page in a multipage application setup.

```javascript
// vite.config.js
import handlebars from 'vite-plugin-handlebars';

const pageData = {
  '/index.html': {
    title: 'Main Page',
  },
  '/nested/subpage.html': {
    title: 'Sub Page',
  },
};

export default {
  plugins: [
    handlebars({
      context(pagePath) {
        return pageData[pagePath];
      },
    }),
  ],
};
```

### Partials

If you want to make use of [partials](https://handlebarsjs.com/guide/partials.html#basic-partials) in your HTML files, you _must_ define the `partialDirectory` option for the `handlebars` plugin.

```javascript
// vite.config.js
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default {
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'partials'),
    }),
  ],
};
```

If you want to use multiple partial folders, an array can be submitted.

Each file in these directories (`.html` or `.hbs`) will become registered as a partial. The name of the file is used to invoke it. So, with the above configuration and the following files:

```html
<!-- partials/header.hbs -->
<header><a href="/">My Website</a></header>
```

```html
<!-- index.html -->
{{> header }}

<h1>The Main Page</h1>
```

Your output website content would become:

```html
<header><a href="/">My Website</a></header>

<h1>The Main Page</h1>
```

Make sure to review the [quirks section](#quirks) for information on potentially-unexpected behavior.

### Helpers

Custom helpers can be registered using the `helpers` configuration option:

```js
// vite.config.js
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default {
  plugins: [
    handlebars({
      helpers: {
        capitalize: (value) => value.toUpperCase(),
      },
    }),
  ],
};
```

For more information on helpers, see [the Handlebars documentation](https://handlebarsjs.com/api-reference/helpers.html).

### Other Handlebars Options

All other Handlebars configuration options can also be passed through.

- [`compileOptions`](https://handlebarsjs.com/api-reference/compilation.html#pre-compilation) can be used to alter the compilation step
- [`runtimeOptions`](https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access) can be used to alter the rendering step

Each of these can also be passed through to the `handlebars` plugin:

```javascript
// vite.config.js
import handlebars from 'vite-plugin-handlebars';

export default {
  plugins: [
    handlebars({
      compileOptions: {
        // Example config option: avoid auto-indenting partials
        preventIndent: true,
      },
      runtimeOptions: {
        // Example config option: define custom private @variables
        data: {
          foo: 'bar',
        },
      },
    }),
  ],
};
```

### Disabling Browser Refresh on Partial Change

By default, any time a partial changes, your browser window will be full reloaded. If you want to disable this behavior, you can set `reloadOnPartialChange` to `false`:

```javascript
// vite.config.js
import handlebars from 'vite-plugin-handlebars';

export default {
  plugins: [
    handlebars({
      reloadOnPartialChange: false,
    }),
  ],
};
```

## Built-In Helpers

### `resolve-from-root`

You can resolve a file path relative to the Vite root using the `resolve-from-root` helper. This assists with injecting other files, like linking to a CSS file, within a partial.

```hbs
<!-- partials/head.hbs -->
<link rel='stylesheet' href='{{resolve-from-root "css/global.css"}}' />
```

## Quirks

- Assets included in a partial using a relative path will _probably_ not work how you would first expect; the relative path is left alone, making it relative to the _output_ file, not the partial itself. It's recommended that you use the `resolve-from-root` helper to ensure paths are resolved from the project root, rather than relative to a particular file.
