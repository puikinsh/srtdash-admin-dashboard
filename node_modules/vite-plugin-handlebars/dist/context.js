export async function resolveContext(context, pagePath) {
    if (typeof context === 'undefined') {
        return context;
    }
    if (typeof context === 'function') {
        return resolveContext(await context(pagePath), pagePath);
    }
    const output = {};
    for (const key of Object.keys(context)) {
        const value = context[key];
        if (typeof value === 'function') {
            output[key] = await value(pagePath);
        }
        else {
            output[key] = value;
        }
    }
    return output;
}
