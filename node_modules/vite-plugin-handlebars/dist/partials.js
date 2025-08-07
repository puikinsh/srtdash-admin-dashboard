import { opendir, readFile } from 'node:fs/promises';
import { join, parse } from 'node:path';
import hbs from 'handlebars';
import { normalizePath } from 'vite';
const VALID_EXTENSIONS = new Set(['.html', '.hbs']);
// Borrowed from https://gist.github.com/lovasoa/8691344
async function* walk(dir) {
    for await (const d of await opendir(dir)) {
        const fullFileName = join(dir, d.name);
        if (d.isDirectory()) {
            yield* walk(fullFileName);
        }
        else if (d.isFile()) {
            yield fullFileName;
        }
    }
}
/**
 * Registers each HTML file in a directory as Handlebars partial
 */
export async function registerPartials(directoryPath, partialsSet) {
    const pathArray = Array.isArray(directoryPath) ? directoryPath : [directoryPath];
    for await (const path of pathArray) {
        try {
            const normalizedPath = normalizePath(path);
            for await (const fileName of walk(path)) {
                const normalizedFileName = normalizePath(fileName);
                const parsedPath = parse(normalizedFileName);
                if (VALID_EXTENSIONS.has(parsedPath.ext)) {
                    let partialName = parsedPath.name;
                    if (parsedPath.dir !== normalizedPath) {
                        const prefix = parsedPath.dir.replace(`${normalizedPath}/`, '');
                        partialName = `${prefix}/${parsedPath.name}`;
                    }
                    const content = await readFile(fileName);
                    partialsSet.add(fileName);
                    hbs.registerPartial(partialName, content.toString());
                }
            }
        }
        catch (e) {
            // This error indicates the partial directory doesn't exist; ignore it
            if (e.code !== 'ENOENT') {
                throw e;
            }
        }
    }
}
