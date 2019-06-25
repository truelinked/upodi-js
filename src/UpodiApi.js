`use strict`;

const ApiError = require('./UpodiApiError')
const services = require('./service')
const https = require('https')

module.exports = class UpodiApi {

  constructor(apiKey = null) {
    if (!apiKey) {
      throw new ApiError('Missing Api Key for Upodi')
    }
    this.__apiKey = apiKey
    this.setupServices()
  }

  setupServices() {
    for (const key in services) {
      if (services.hasOwnProperty(key)) {
        const element = new services[key](this);
        this[element.name] = element
      }
    }
  }

  async put(path, query = null, body = null){
    return this.send(path, 'PUT', query, body)
  }
  async post(path, body) {
    return this.send(path, 'POST', null, body)
  }

  async get(path, query) {
    return this.send(path, 'GET', query, null)
  }

  async send(path, method = 'GET', query = {}, body = {}) {

    return new Promise((resolve, reject) => {
      const bearer = Buffer.from(this.__apiKey).toString('base64')
      var options = {
        host: 'api.upodi.io',
        path: `/v3/${path}`,
        method: method,
        qs: JSON.stringify(query),
        headers: {
          accept: 'application/json; charset=utf-8',
          'content-type': 'application/json',
          Authorization: `bearer ${bearer}`
        }
      };
      if (options.method === 'POST') {
        options.body = JSON.stringify(body)
       // options.headers['Content-Length'] = options.body.length
      }

      const req = https.request(options, resp => {
        const status = resp.statusCode

        if (status == 401) {
          return reject('access denied')
        }

        let data = '';

        resp.on('data', (chunk) => {
          data += chunk;
        })

        resp.on('end', () => {
          try {
            var json = JSON.parse(data)
            data = {}
            for (var key in json) {
              data[key.toLowerCase()] = json[key]
            }
          } catch (ex) {
            return reject('Error parsing result')
          }

          if (status>300) {
            return reject(data)
          }

          return resolve(data)
        })

      }).on("error", (err) => {
        reject(err)
      })

      req.on('error', (e) => {
        reject(e)
      })

      req.end(options.body)

    })
  }
}
