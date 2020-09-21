`use strict`;

const ApiError = require('./UpodiApiError')
const services = require('./service')
const fs = require('fs');
const https = require('https')
const querystring = require('querystring');

const UPODI_API_SERVER = 'api.upodi.io'
const UPODI_API_VERSION = 'v3'

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

  async get(path, query, filename = null) {
    return this.send(path, 'GET', query, null, filename)
  }

  async put(path, body = null){
    return this.send(path, 'PUT', null, body)
  }

  async patch(path, body = null){
    return this.send(path, 'PATCH', null, body)
  }
  
  async post(path, body) {
    return this.send(path, 'POST', null, body)
  }

  async delete(path) {
    return this.send(path, 'DELETE', null, null)
  }

  async send(path, method = 'GET', query = {}, body = null, filename = null) {

    return new Promise((resolve, reject) => {
      const bearer = Buffer.from(this.__apiKey).toString('base64')
      const qs = querystring.stringify(query)
      var options = {
        host: UPODI_API_SERVER,
        path: `/${UPODI_API_VERSION}/${path}?${qs}`,
        method: method,
        body: JSON.stringify(body),
        headers: {
          accept: 'application/json; charset=utf-8',
          'content-type': 'application/json',
          Authorization: `bearer ${bearer}`
        },
        timeout: 60000,
      }

      const req = https.request(options, resp => {
        const status = resp.statusCode

        switch (status) {
          case 401:
              return reject(new 'access denied')    
          case 404:
              return resolve(null)
        }

        if(filename) {
          let stream = fs.createWriteStream(filename);
          resp.on('data', chunk => stream.write(chunk));
          resp.on('end', () => {
            stream.close();
            resolve(filename);
          });
          stream.on('error', err => {
            req.end();
            return reject(err);
          })
        }
        else {
          let data = '';

          resp.on('data', (chunk) => {
            data += chunk;
          })
  
          resp.on('end', () => {
            try {
              data = JSON.parse(data)
            } catch (ex) {
              if (method !== 'DELETE') {
                return reject(new ApiError('Error parsing result', ex))
              }
            }
  
            if (status>300) {
              if (data && typeof(data) === 'object') {
                data.message = data.Message
              }
              return reject(new ApiError(data))
            }
  
            return resolve(data)
          })
        }
      }).on("error", (err) => {
        reject(new ApiError(err.message, err))
      })

      req.on('error', (e) => {
        reject(new ApiError(e.message, e))
      })

      req.end(options.body)
    })
  }
  parseWebhook(body) {
    if(!body) {
      throw new ApiError("body can't be null")
    }
    if(!body.Action) {
      throw new ApiError("action is not found in webhook body", body) 
    }
    if(!body.Type) {
      throw new ApiError("type is not found in webhook body", body)
    }
    if(!body.Issuer) {
      throw new ApiError("issue is not found in webhook body", body)
    }
    if(!body.Issuer.Identifier) {
      throw new ApiError("Identifier is not found in webhook body", body)
    }
    // if(body.Signature !== this.__apiKey) {
    //   throw new ApiError("not authorerized")
    // }
    return {
      action: body.Action,
      identifier: body.Issuer.Identifier,
      type: body.Type,
      signature: body.Signature,
      body
    }
  }
}
