import { resolve } from 'node:path';
import hbs from 'handlebars';
import { normalizePath } from 'vite';
import { resolveContext } from './context.js';
import { registerPartials } from './partials.js';
export default function handlebars({ context, reloadOnPartialChange = true, compileOptions, runtimeOptions, partialDirectory, helpers, } = {}) {
    // Keep track of what partials are registered
    const partialsSet = new Set();
    let root;
    hbs.registerHelper('resolve-from-root', function (path) {
        return resolve(root, path);
    });
    if (helpers) {
        hbs.registerHelper(helpers);
    }
    return {
        name: 'handlebars',
        configResolved(config) {
            root = config.root;
        },
        async handleHotUpdate({ server, file }) {
            if (reloadOnPartialChange && partialsSet.has(file)) {
                server.ws.send({
                    type: 'full-reload',
                });
                return [];
            }
        },
        transformIndexHtml: {
            // Ensure Handlebars runs _before_ any bundling
            order: 'pre',
            async handler(html, ctx) {
                if (partialDirectory) {
                    await registerPartials(partialDirectory, partialsSet);
                }
                const template = hbs.compile(html, compileOptions);
                const resolvedContext = await resolveContext(context, normalizePath(ctx.path));
                const result = template(resolvedContext, runtimeOptions);
                return result;
            },
        },
    };
}
