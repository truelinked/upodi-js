class UpodiApiError extends Error {

  constructor(message) {
      super();
      this.message = message || 'UpodiApiError'
  }

}

module.exports = UpodiApiError