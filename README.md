# Webpack Starter

A webpack starter with separate development and production configurations

Both configurations support:

-   loading of CSS, image and font assets,
-   transpilation of JavaScript down to ES5,
-   generation of an HTML index file.

The production build supports

-   [minification][minification]
-   [tree shaking][treeshaking].

The development build supports

-   [hot module reloading][hmr]

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

Webpack serves your app in memory when you run `npm start`. No physical files are written. When the app is built using `npm run build`, physical files are generated to `/public` folder and the app is served from `/public`.

### How is Sass being processed?

We're handling it differently in DEV vs PROD.

When you run `npm start`:

1.  The sass-loader compiles Sass into CSS
2.  Webpack bundles the compiled CSS into app.bundle.js.
3.  app.bundle.js contains code that loads styles into the &lt;head&gt; section of index.html via JavaScript. This is why there is no stylesheet reference in index.html.

When you run `npm run build`:

1.  The sass-loader compiles Sass into CSS

### How do I deploy this?

`npm run build` does the following:

-   Minifies all JS and CSS
-   Places the resulting built project files into `/public` directory. (These are the files you'll expose to the world).

[minification]: https://en.wikipedia.org/wiki/Minification_(programming)
[treeshaking]: https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking
[hmr]: https://webpack.js.org/concepts/hot-module-replacement/
