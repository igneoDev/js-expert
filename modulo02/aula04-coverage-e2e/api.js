const http = require('http')

const DEFAULT_USER = {username: 'Ton', password: '123'}

const routes = {
  '/contact:get': (req, res) => {
    res.write('contact us')
    return res.end()
  },
  '/login:post': async (req, res) => {
    // response é um itrerator
    for await (const data of req) {
      const dataParsed = JSON.parse(data)
      if (dataParsed.username === DEFAULT_USER.username && dataParsed.password === DEFAULT_USER.password) {
        res.write('login has succeeded')
        return res.end()
      }
      res.writeHead(401)
      res.write('login has failed')
      return res.end()
    }
  },
  default: (req, res) => {
    res.write('default')
    return res.end()
  }
}

const handler = function (req, res) {
  const { url, method } = req
  const routeKey = `${url}:${method.toLowerCase()}`
  const chosen = routes[routeKey] || routes.default
  res.writeHead(200, { 'Content-Type': 'text/html' })
  return chosen(req, res)
}

const app = http.createServer(handler).listen(3000, () => console.log('Listening on port 3000'))

module.exports = app
