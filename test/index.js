var UpodiApi = require('../src/')

async function test() {
  var upodi = new UpodiApi('put in some key')
  try {
    var listOfCustomer = await upodi.customers.list()
    console.log(listOfCustomer)
  } catch (ex) {
    console.error(ex)
  }
}

console.log('stupid test')

test()

