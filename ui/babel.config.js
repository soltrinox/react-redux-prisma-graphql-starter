module.exports = {
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'commonjs',
            debug: false
          }
        ],
        '@babel/preset-react'
      ],
      plugins: [
        'add-react-displayname',
        'react-hot-loader/babel',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
        'dynamic-import-node'
      ]
    },
    development: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: ['last 2 versions', 'not dead', 'not < 2%', 'not ie 11'],
            useBuiltIns: 'entry',
            corejs: 3,
            modules: 'auto'
          }
        ],
        '@babel/preset-react'
      ],
      plugins: [
        'add-react-displayname',
        'react-hot-loader/babel',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
        [
          'import',
          {
            libraryName: 'antd',
            style: true
          }
        ]
      ]
    },
    production: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: ['last 2 versions', 'not dead', 'not < 2%', 'not ie 11'],
            useBuiltIns: 'entry',
            corejs: 3
            // modules: 'auto'
          }
        ],
        '@babel/preset-react'
      ],
      plugins: [
        'add-react-displayname',
        'react-hot-loader/babel',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
        [
          'import',
          {
            libraryName: 'antd',
            style: true
          }
        ]
      ]
    }
  }
}
