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
        'react-hot-loader/babel',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
        'dynamic-import-node',
        [
          'import',
          {
            libraryName: 'antd',
            style: true
          }
        ]
      ]
    },
    development: {
      presets: [
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'entry',
            modules: 'auto'
          }
        ],
        '@babel/preset-react',
        '@babel/preset-flow'
      ],
      plugins: [
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
        ],
        '@babel/plugin-transform-flow-comments'
      ]
    },
    production: {
      presets: [
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'entry',
            modules: 'auto'
          }
        ],
        '@babel/preset-react'
      ],
      plugins: [
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
