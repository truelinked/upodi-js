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

  async post(path, body) {
    this.send(path, 'POST', body)
  }

  async send(path, method = 'GET', body = undefined) {
    const bearer = Buffer.from(this.__apiKey).toString('base64')
    let options = {
      host: 'api.upodi.io',
      path: '/v3/' + path,
      method: method,
      headers: {
        accept: 'application/json; charset=utf-8',
        'content-type': 'application/json',
        Authorization: `bearer ${bearer}`
      },
      body: body
    };
    console.log(path)
    return new Promise((resolve, reject) => {

      https.get(options, (resp) => {
        console.log(resp.statusMessage)
        /// crap here
        if (401 === resp.statusCode) {
          return reject('access denied')
        }

        let data = '';

        resp.on('data', (chunk) => data += chunk);

        resp.on('end', () => {
          try {
            data = JSON.parse(data)
          } catch (ex) {
            return reject('Error parsing result')
          }
          return resolve(data)
        })

      }).on('error', (err) => {
        reject(err)
      })
    })

  }
}
