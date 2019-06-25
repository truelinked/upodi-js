var UpodiApi = require('../src/')
require('dotenv').config()
const expect = require('chai').expect
const upodi = new UpodiApi(process.env.UpodiApiKey)

describe('Get services', function() {
  describe('Customer', function() {
    it('Get customer', async function() {
      expect(upodi.customer.list).to.not.throw()
    })
    it('Get customer by account number', async function() {
      expect(async () => await upodi.customer.getByAccountNumber(1)).to.not.throw()
    })
  })
  describe('subcription', function() {
    it('Get subcription', async function() {
        expect(upodi.subscriptions.list).to.not.throw()
    })
  })
  describe('Invoice', function() {
    it('Get Invoice', async function() {
      expect(upodi.invoice.list).to.not.throw()
    })
  })
  describe('ProductPlan', function() {
    it('Get ProductPlan', async function() {
      expect(upodi.productPlan.list).to.not.throw()
    })
  })
  describe('Contact', function() {
    it('Get Contact', async function() {
      expect(upodi.contacts.list).to.not.throw()
    })
  })
})

describe('Create services', function() {
  describe('Customer', function() {
    it('Create customer', async function() {
      expect(async () => await upodi.customer.create({fullname: "test georgi"})).to.not.throw()
    })
  })
  describe('PaymentMethods', function() {
    it('Create paymentmethods', async function() {
      var customer = await upodi.customer.create('UX-peter-' + Math.round(Math.random()*10000), 'hmm du er mærkelig', 'DKK')
      var newCustomerId = customer.id
      expect(async () => await upodi.paymentMethod.create(newCustomerId, {
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
      var customer = await upodi.customer.getByAccountNumber(1)
      var productPlan = await upodi.productPlan.list();
      expect(async () => await upodi.subscriptions.create({customerid: customer.items[0].ID, productplanid: productPlan.items[0].ID})).to.not.throw()
    })
  })
  describe('Invoices', function() {
    it('Create Invoice', async function() {
      var customer = await upodi.customer.getByAccountNumber(1)
      expect(async () => await upodi.invoice.create({customerid: customer.items[0].ID, currencycode: 'DKK', paymentterm: 30})).to.not.throw()
    })
  })
  describe('Contact', function() {
    it('Get contact', async function() {
      var customer = await upodi.customer.getByAccountNumber(1)
      expect(async () => await upodi.contact.create(customer.items[0].ID, customer.items[0].FullName)).to.not.throw()
    })
  })
})


describe('PUT Services', function() {
  describe('subcription', function() {
    it('Activate subcription', async function() {
      var subscriptions = await upodi.subscriptions.list()
      expect(async () => await upodi.subscriptions.activateSubcription(subscriptions.items[0].id)).to.not.throw()
    })
  })
})
console.log('stupid test')
const fs = require('fs')
fs.appendFileSync('message.txt', new Date());
fs.appendFileSync('message.txt', '\n');
