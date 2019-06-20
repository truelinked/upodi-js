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
async function post() {
  var upodi = new UpodiApi('0d4eeb99-69b2-4dd7-abcb-445e164efaba')
  try {
    var customer = await upodi.customers.post()
    console.log(customer)
  } catch (ex) {
    console.error(ex)
  }
}
console.log('stupid test')

test()
post()
