`use strict`;

module.exports = class InvoiceService {
  constructor(apiReference) {
    this.api = apiReference
    this.name = 'invoices'

  }

  async list(opt) {

    opt = opt || {}
    opt.$pagesize = opt.pagesize || 100
    opt.$pagenumber = opt.pagenumber || 1

    return await this.api.get('invoices', opt)
  }

  async query(opt) {
    opt = opt || {}
    var query = {}
    query.pagesize = opt.pagesize || 100
    query.pagenumber = opt.pagenumber || 1
    
    var filter = [];
    if (opt.CustomerID) {
      filter.push(`CustomerID eq guid'${opt.CustomerID}'`);
    }

    if (opt.SubscriptionID) {
      filter.push(`SubscriptionID eq guid'${opt.SubscriptionID}'`);
    }

    if (opt.PaymentMethodID) {
      filter.push(`PaymentMethodID eq guid'${opt.PaymentMethodID}'`);
    }

    if (filter.length > 0) {
      query.$filter = filter.join(' and ')
    } 

    return await this.api.get('invoices/query', query)
  }

  async get(invoiceId) {
    if (!invoiceId) {
      throw new Error('missing invoiceId')
    }

    return (await this.api.get(`invoices/${invoiceId}`))
  }

  async create(invoice) {
    return (await this.api.post('invoices', invoice))
  }

  async cancel(invoiceId) {
    if (!invoiceId) {
      throw new Error('missing invoiceId')
    }

    return (await this.api.put(`invoices/${invoiceId}/cancel`));
  }

  async book(invoiceId) {
    if (!invoiceId) {
      throw new Error('missing invoiceId')
    }

    return (await this.api.put(`invoices/${invoiceId}/book`));
  }

  async markPaid(invoiceId, paymentDate) {
    if (!invoiceId) {
      throw new Error('missing invoiceId')
    }
    let body = { };
    if (paymentDate) {
      body.PaymentDate = paymentDate;
    }

    return (await this.api.put(`invoices/${invoiceId}/markpaid`, paymentDate));
  }

  async refund(invoiceId) {
    if (!invoiceId) {
      throw new Error('missing invoiceId')
    }

    return (await this.api.put(`invoices/${invoiceId}/refund`));
  }

  async delete(invoiceId) {
    if (!invoiceId) {
      throw new Error('missing invoiceId')
    }

    return (await this.api.delete(`invoices/${invoiceId}`))
  }

  async download(invoiceId, filename) {
    if (!invoiceId) {
      throw new Error('missing invoiceId')
    }

    if (!filename) {
      throw new Error('missing filename')
    }

    return (await this.api.get(`invoices/${invoiceId}/getpdfwithid`, null, filename));
  }

  async duplicate(invoiceId, reverse) {
    if (!invoiceId) {
      throw new Error('missing invoiceId');
    }

    return (await this.api.post(`invoices/${invoiceId}/duplicate`, { reverse: !!reverse }));
  }
}
