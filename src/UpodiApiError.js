class UpodiApiError extends Error {

  constructor(obj, innerError = null) {
      super();

      this.name = 'UpodiApiError'
      this.innerError = innerError
      if (typeof(obj) === 'string') {
        this.message = obj
      } else {
      for (var key in obj) {
        this[key] = obj[key]
      }
    }
  }
}

module.exports = UpodiApiError