import * as path from 'path'

export default [
  {
    serveRoot: '/admin',
    rootPath: '',
    exclude: ['/api', '/graphql'],
  },
  {
    serveRoot: '/graphql',
    rootPath: '',
  },
  {
    serveRoot: '/swagger',
    rootPath: path.join(__dirname, 'swagger'),
  },
  {
    serveRoot: '/2021',
    rootPath: path.resolve('./html'),
  },
]
