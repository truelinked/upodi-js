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

console.log('stupid test')

// test()
// testCreateCustomer()
// testCreateCustomerFailsIfNoFullname()
// testSignip()
testGetListByAccountNumber()

const fs = require('fs')
fs.appendFileSync('message.txt', new Date());
fs.appendFileSync('message.txt', '\n');
