`use strict`;

const ApiError = require('./UpodiApiError')
const CustomerService = require('./CustomerService')
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
    this.customers = new CustomerService(this)
  }

  async get(path) {
    const bearer = Buffer.from(this.__apiKey).toString('base64')

    var options = {
      host: 'api.upodi.io',
      path: '/v3' + path,
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `bearer ${bearer}`
      }
    };

    return new Promise((resolve, reject) => {

      https.get(options, (resp) => {

        /// crap here
        if (resp.statusCode == 401) {
          return reject('access denied')
        }

        let data = '';

        resp.on('data', (chunk) => {
          data += chunk;
        })

        resp.on('end', () => {
          try {
            data = JSON.parse(data)
          } catch (ex) {
            return reject('Error parsing result')
          }
          return resolve(data)
        })

      }).on("error", (err) => {
        reject(err)
      })
    })

  }
}
