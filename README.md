# :cat2: Maya - Webpack Starter

This webpack starter supports:

-   'assets' folder outside the webpack root
-   write files to target folder even on dev mode
-   loading of CSS, image and font assets,
-   transpilation of JavaScript down to ES5,
-   generation of an HTML index file.

### Installation

```
$ git clone https://github.com/costacode/maya.git maya-starter
$ cd maya-starter
$ npm i
```

## Development

There are two ways in which you can build and run the web app:

-   Build once for (ready for **_Production_**):
    -   `$ npm run build`
    -   Open `public/index.html` through the local webserver

*   Hot reloading via webpack dev server:
    -   `$ npm start`
    -   Point your browser to http://localhost:3000/, page hot reloads automatically when there are changes

### What's happening when you run `npm start`?

Webpack serves your app in memory when you run `npm start`. No physical files are written. When the app is built using `npm run build`, physical files are generated to `/assets` folder and the app is served from `/assets`.

### How is Sass being processed?

We're handling it differently in DEV vs PROD.

When you run `npm start`:

1.  The sass-loader compiles Sass into CSS
2.  Webpack bundles the compiled CSS into maya.bundle.js.
3.  maya.bundle.js contains code that loads styles into the &lt;head&gt; section of index.html via JavaScript. This is why there is no stylesheet reference in index.html.

When you run `npm run build`:

1.  The sass-loader compiles Sass into CSS
2.  Webpack extracts and bundles CSS into maya.bundle.css.
3.  Webpack minifies app.bundle.css. It also minifies all JS.

### How do I deploy this?

-   Webpack places the resulting built project files into `/assets` directory. (There you will see the files you'll expose to the world).

### How do I add this on my app?

-   Replicate the folder structure for src
-   Replicate package.json
-   Replicate Webpack config files
-   Replicate postCSS config file
-   Ignore stuff (.gitignore for Git)
-   Run 'npm install'

### Key concepts

-   **minification:** https://en.wikipedia.org/wiki/Minification_(programming)
-   **treeshaking:** https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking
-   **hmr:** https://webpack.js.org/concepts/hot-module-replacement/

### Current issues

-   Hot reloading is not supported (yet) by MiniCssExtractPlugin v0.4.1, so the page has to be refrehed to see changes

### CSS conventions

-   Use camelCase for naming classes
