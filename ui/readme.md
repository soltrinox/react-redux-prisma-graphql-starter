<div align="center">
<h2 align="center">Poltrex UI</h2>
</div>

# How to serve gzipped version using Nginx

[Read article here](https://medium.com/@selvaganesh93/how-to-serve-webpack-gzipped-file-in-production-using-nginx-692eadbb9f1c)

# FAQ

## Renaming file extensions breaks Webpack watch mode

Example

```bash
ERROR in ./src/layouts/Dashboard/test.js
Module build failed (from ../node_modules/babel-loader/lib/index.js):
Error: ENOENT: no such file or directory, open '/Users/pitops/poltrex/frontend/poltrex-ui/src/layouts/Dashboard/test.js'
 @ ./src/layouts/Dashboard/SideNav.jsx 20:0-26
 @ ./src/layouts/Dashboard/index.jsx
 @ ./src/screens/root.jsx
 @ ./src/index.jsx
 @ multi ../node_modules/webpack-dev-server/client?http://localhost:8000 ../node_modules/webpack/hot/dev-server.js ./src/index
```

Currently this is normal, an explanation of how Webpack works currently

> By default, webpack is configured to use "unsafeCache", which generally speeds things up, by avoiding hitting the filesystem continuously. The docs say that this is rare, but in actuality, it can be quite common when gradually porting files over from one language to another (e.g. _.js --> _.ts). When a developer ports a single file, all other developers that pull in this change are forced to restart webpack, which can be a big productivity drain.

By the comments it seems that it will be "fixed" in Webpack v5.0 so we wait. You can learn more [here](https://github.com/webpack/webpack/issues/8277)
