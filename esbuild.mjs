import esbuild from 'esbuild';
import http from 'node:http'
import {postcssModules, sassPlugin} from 'esbuild-sass-plugin';
import svgPlugin from 'esbuild-plugin-svg';
import {existsSync, mkdirSync} from 'fs';
import {readFile, copyFile} from 'fs/promises';

const portParam = process.argv.find(v => v.startsWith('--port='));
const PORT = portParam ? +portParam.slice(7) : 3007;

const pkg = JSON.parse(
    await readFile(
        new URL('./package.json', import.meta.url)
    )
);

const isProductionMode = process.env.NODE_ENV === 'production'
const isWatchMode = !!process.env.WATCH || !!process.env.SERVE;
const isServe = !!process.env.SERVE;
const UIKIT_MODE = !!process.env.UIKIT_MODE;

if (!existsSync('public')){
    mkdirSync('public');
}

const options = {
    // outdir: 'dist',
    target: 'esnext',
    outfile: 'public/index.js',
    metafile: true, // needs to be set,
    format: 'esm',
    loader: {
        '.html': 'text',
        '.svg': 'text'
    },
    // external: [
    //   ...Object.keys(pkg.dependencies),
    //   ...Object.keys(pkg.peerDependencies || {})
    // ],
    bundle: true,
    entryPoints: [ UIKIT_MODE ?  './src/uikit/index.ts' :'./src/index.ts'],
    minify: !isWatchMode,
    plugins: [
        sassPlugin({
            filter: /\.(module|local)\.s?css$/,
            transform: postcssModules({
                scopeBehaviour: 'local',
                // ...put here the options for postcss-modules: https://github.com/madyankin/postcss-modules
                generateScopedName: "[name]_[local]_[hash]",
            })
        }),
        sassPlugin({}),
        svgPlugin(),]
}

if (isWatchMode) {
    const ctx = await esbuild.context(options)
    let { host, port } = await ctx[isServe ? 'serve' : 'watch']({
        servedir: 'public/',
        host: 'localhost',
        port: PORT,
    });
    copyFile('./index.html', './public/index.html');
    console.log(`started dev server at http://${host}:${PORT}`);
    if (isServe) {
        const proxyServerPort = 3777;
        // Then start a proxy server on port "proxyServerPort"
        http.createServer((req, res) => {

            const options = {
                hostname: host,
                port: proxyServerPort,
                path: req.url,
                method: req.method,
                headers: req.headers,
            }

            const proxyConfig = [
                {
                    from: '/assets/icons',
                    target: 'http://mossaic.dev.int.nt-com.ru'
                },
                {
                    from: '/proxy',
                    target: 'http://mossaic.dev.int.nt-com.ru'
                },
                {
                    from: '/upload',
                    target: 'http://u1.mossaic.dev.int.nt-com.ru',
                    pathRewrite: {'^/upload': ''},
                },
                {
                    from: '/download',
                    target: 'http://s1.mossaic.dev.int.nt-com.ru',
                    pathRewrite: {'^/download': ''},
                }
            ]

            const found = proxyConfig.find(conf => options.path.startsWith(conf.from));
            if (found) {
                let target = options.path;
                if (found.pathRewrite) {
                    Object.keys(found.pathRewrite).forEach(key => {
                        target = target.replace(new RegExp(key), found.pathRewrite[key])
                    })
                }
                options.path = found.target + target;
                console.log('proxying to ', options.path);
                options.hostname = 'mossaic.dev.int.nt-com.ru';
                options.port = 80;
                // const tmp = 'http://cobalt.dev.int.nt-com.ru'
                // options.headers.host = tmp;
                // options.headers.origin = tmp;
                // options.headers.referer = tmp + '/';
            }
            // console.debug(options, options.hostname);

            // Forward each incoming request to esbuild
            const proxyReq = http.request(options, proxyRes => {
                res.writeHead(proxyRes.statusCode, proxyRes.headers)
                proxyRes.pipe(res, {end: true})
            })

            // Forward the body of the request to esbuild
            req.pipe(proxyReq, {end: true})
        }).listen(proxyServerPort)
    }
} else {
    await esbuild.build(options)
}
