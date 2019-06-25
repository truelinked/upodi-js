var UpodiApi = require('../src/')
require('dotenv').config()
const expect = require('chai').expect
const upodi = new UpodiApi(process.env.UpodiApiKey)

describe('Get services', function() {
  describe('Customer', function() {
    it('Get customer', async function() {
      expect(upodi.CustomerService.list).to.not.throw()
    })
    it('Get customer by account number', async function() {
      expect(async () => await upodi.CustomerService.getByAccountNumber(1)).to.not.throw()
    })
  })
  describe('subcription', function() {
    it('Get subcription', async function() {
        expect(upodi.SubscriptionService.list).to.not.throw()
    })
  })
  describe('Invoice', function() {
    it('Get Invoice', async function() {
      expect(upodi.InvoiceService.list).to.not.throw()
    })
  })
  describe('ProductPlan', function() {
    it('Get ProductPlan', async function() {
      expect(upodi.ProductplanService.list).to.not.throw()
    })
  })
  describe('Contact', function() {
    it('Get Contact', async function() {
      expect(upodi.ContactService.list).to.not.throw()
    })
  })
})

describe('Create services', function() {
  describe('Customer', function() {
    it('Create customer', async function() {
      expect(async () => await upodi.CustomerService.create({fullname: "test georgi"})).to.not.throw()
    })
  })
  describe('PaymentMethods', function() {
    it('Create paymentmethods', async function() {
      var customer = await upodi.CustomerService.create('UX-peter-' + Math.round(Math.random()*10000), 'hmm du er mærkelig', 'DKK')
      var newCustomerId = customer.id
      expect(async () => await upodi.PaymentMethodService.create(newCustomerId, {
          type: 64,
          makedefault: true,
          puretoken: {
            "token" : process.env.stripeToken , /* Stripe customer ID */
            "paymentgateway" : "stripe"
          }
        })
      ).to.not.throw()
    })
  })
  describe('Subcriptions', function() {
    it('Create subcription', async function() {
      var customer = await upodi.CustomerService.getByAccountNumber(1)
      var productPlan = await upodi.ProductplanService.list();
      expect(async () => await upodi.SubscriptionService.create({customerid: customer.items[0].ID, productplanid: productPlan.items[0].ID})).to.not.throw()
    })
  })
  describe('Invoices', function() {
    it('Create Invoice', async function() {
      var customer = await upodi.CustomerService.getByAccountNumber(1)
      expect(async () => await upodi.InvoiceService.create({customerid: customer.items[0].ID, currencycode: 'DKK', paymentterm: 30})).to.not.throw()
    })
  })
  describe('Contact', function() {
    it('Get contact', async function() {
      var customer = await upodi.CustomerService.getByAccountNumber(1)
      expect(async () => await upodi.ContactService.create(customer.items[0].ID, customer.items[0].FullName)).to.not.throw()
    })
  })
})


describe('PUT Services', function() {
  describe('subcription', function() {
    it('Activate subcription', async function() {
      var subscriptions = await upodi.SubscriptionService.list()
      expect(async () => await upodi.SubscriptionService.activateSubcription(subscriptions.items[0].id)).to.not.throw()
    })
  })
})
console.log('stupid test')
const fs = require('fs')
fs.appendFileSync('message.txt', new Date());
fs.appendFileSync('message.txt', '\n');
