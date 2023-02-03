module.exports = {
  apps:[

    {
      name: 'ordenes-ventas.socket-aicode.art',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      env:{
        HOST: 'localhost',
        PORT: 3100
      }
    }
  ]
}
