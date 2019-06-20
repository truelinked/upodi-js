var UpodiApi = require('../src/')

async function test() {
  var upodi = new UpodiApi('0d4eeb99-69b2-4dd7-abcb-445e164efaba')
  try {
    var listOfCustomer = await upodi.customers.list()
    console.log(listOfCustomer)
  } catch (ex) {
    console.error(ex)
  }
}
async function testSignip() {
  try {
    var upodi = new UpodiApi('0d4eeb99-69b2-4dd7-abcb-445e164efaba')

    var customer = await upodi.customers.create('UX-peter-' + Math.round(Math.random()*10000), 'hmm du er mærkelig', 'DKK')

    var newCustomerId = customer.id

    var paymentmethod = await upodi.paymentmethods.create(newCustomerId, {
      type: 64,
      makedefault: true,
      puretoken: {
        "token" : "cus_C9VhJ6qk0qkKqI", /* Stripe customer ID */
        "paymentgateway" : "stripe"
      }
    })

  } catch (ex) {
    console.error(ex)
  }
}
console.log('stupid test')

// test()

testSignip()


const fs = require('fs')
fs.appendFileSync('message.txt', new Date());
fs.appendFileSync('message.txt', '\n');
