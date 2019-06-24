var UpodiApi = require('../src/')
require('dotenv').config()
async function test() {
  var upodi = new UpodiApi(process.env.UpodiApiKey)
  try {
    var listOfCustomer = await upodi.customers.list()
    console.log(listOfCustomer)
  } catch (ex) {
    console.error(ex)
  }
}

async function testCreateCustomer(){
  var upodi = new UpodiApi(process.env.UpodiApiKey)
  try {
    var customer = await upodi.customers.create({fullname: "test georgi"})
    console.log(customer)
  } catch (ex) {
    console.error(ex)
  }
}
async function testCreateCustomerFailsIfNoFullname(){
  var upodi = new UpodiApi(process.env.UpodiApiKey)
  try {
    var customer = await upodi.customers.create({})
    console.log(customer)
  } catch (ex) {
    console.error(ex)
  }
}
async function testSignip() {
  try {
    var upodi = new UpodiApi(process.env.UpodiApiKey)

    var customer = await upodi.customers.create('UX-peter-' + Math.round(Math.random()*10000), 'hmm du er mærkelig', 'DKK')

    var newCustomerId = customer.id

    var paymentmethod = await upodi.paymentmethods.create(newCustomerId, {
      type: 64,
      makedefault: true,
      puretoken: {
        "token" : process.env.stripeToken , /* Stripe customer ID */
        "paymentgateway" : "stripe"
      }
    })

  } catch (ex) {
    console.error(ex)
  }
}

async function testGetListByAccountNumber() {
  try {
    var upodi = new UpodiApi(process.env.UpodiApiKey)

    var customer = await upodi.customers.getByAccountNumber(1)
    console.log(customer)
  } catch (error) {
    console.error(error)
    
  }
}
async function testGetContact() {
  try {
    var upodi = new UpodiApi(process.env.UpodiApiKey)

    var contact = await upodi.ContactService.list()
    console.log(contact)
  } catch (error) {
    console.error(error)
    
  }
}

async function testCreateContact() {
  try {
    var upodi = new UpodiApi(process.env.UpodiApiKey)
    var customer = await upodi.customers.getByAccountNumber(1)
    var contact = await upodi.ContactService.create(customer.items[0].ID, customer.items[0].FullName)
    console.log(contact)
  } catch (error) {
    console.error(error)
    
  }
}

async function testGetProductPlan() {
  try {
    var upodi = new UpodiApi(process.env.UpodiApiKey)

    var productPlan = await upodi.ProductPlanService.list()
    console.log(productPlan)
  } catch (error) {
    console.error(error)
    
  }
}

async function createGetProductPlan() {
  try {
    var upodi = new UpodiApi(process.env.UpodiApiKey)

    var productPlan = await upodi.ProductPlanService.create()
    console.log(productPlan)
  } catch (error) {
    console.error(error)
    
  }
}

async function testGetSubscription() {
  try {
    var upodi = new UpodiApi(process.env.UpodiApiKey)

    var subscription = await upodi.subscription.list({pagesize: 1000, pagenumber: 1})
    console.log(subscription)
  } catch (error) {
    console.error(error)
    
  }
}
async function testCreateSubscription() {
  try {
    var upodi = new UpodiApi(process.env.UpodiApiKey)
    var customer = await upodi.customers.getByAccountNumber(1)
    var subscription = await upodi.subscription.create({customerid: customer.items[0].ID, productplanid: "1"})
    console.log(subscription)
  } catch (error) {
    console.error(error)
    
  }
}

console.log('stupid test')

// test()
// testCreateCustomer()
// testCreateCustomerFailsIfNoFullname()
// testSignip()
// testGetListByAccountNumber()
// testGetContact()
// testCreateContact()
// testGetProductPlan()
// createGetProductPlan()
// testGetSubscription()
// testCreateSubscription()

const fs = require('fs')
fs.appendFileSync('message.txt', new Date());
fs.appendFileSync('message.txt', '\n');
