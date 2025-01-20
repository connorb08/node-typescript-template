import * as esbuild from 'esbuild';

const _OUT_FILE = 'dist/index.js';
const _ENTRY_FILE = 'src/index.ts';

const _MINIFY = true; // read argument from command line?
const _BUNDLE = true; // read argument from command line?

const build = () =>
    esbuild.build({
        entryPoints: ['src/index.ts'],
        bundle: true,
        outfile: 'dist/index.js',
        minify: true
    });

const _buildNode = () =>
    esbuild.build({
        entryPoints: ['src/index.ts'],
        bundle: true,
        platform: 'node',
        target: ['node22.13.1'],
        outfile: 'dist/index.js',
        minify: true
    });

const _buildBrowser = () =>
    esbuild.build({
        entryPoints: ['src/index.ts'],
        bundle: true,
        outfile: 'dist/index.js',
        minify: true,
        target: 'es6',
        platform: 'browser'
    });

console.log('Building...');

const buildResult = await build();
buildResult.errors.forEach((error) => console.error(error));
buildResult.warnings.forEach((warning) => console.warn(warning));

if (buildResult.errors.length) {
    console.error('Build failed');
    process.exit(1);
}

if (buildResult.warnings.length) {
    console.warn('Build succeeded with warnings');
    process.exit(0);
}

console.log('Build succeeded');
process.exit(0);
