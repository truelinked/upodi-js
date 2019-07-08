# upodi-js
Unofficial NodeJs library for consuming the upodi.com API

## Overview
* [Documentation](https://docs.upodi.com)
* [API Documentation](https://docs.upodi.com/v2.0/reference)
* [Request a trial](http://www.upodi.com/product/signup/)
* [Stack Overflow](http://stackoverflow.com/questions/tagged/upodi)

## Getting started

### Install

```
npm install upodi
```

### Initialization
```
const UpodiApi = require('upodi')

const upodi = new UpodiApi('${api key}')
const listOfCustomer = await upodi.customers.list({pagesize: '000, pagenumber: 1})
```

### 10 line sign up
10 lines and you have signed up a customer, assigned a plan and started a subscription. This example uses Stripe.
```
const UpodiApi = require('upodi')

const upodi = new UpodiApi('${api key}')

var newCustomerId = upodi.Customers.Create("70225683", "Upodi ApS", "DKK");

upodi.SignUp.SignUp(new SignUpRequest {
      Customer = new Customer { ID = newCustomerId },
      CardToken = new CardToken { PaymentGateway = "stripe", Token = "- enter strike customer token cus_XXX -" },
      StartDate = DateTime.UtcNow,
      ProductPlan = new ProductPlan {  ID = productPlanId }
});
```

### Working with Customers
List all customers. Options to limited list all or paged results. See limited lists below.
```
var customers = upodi.Customers.List(all: true);
```


Create a new customer. Requires accountnumber, fullname and currencycode.
```
var newId = upodi.Customers.Create("acocuntnumber", "fullname", "USD");
```

### Working with Subscriptions
List all subscriptions. Options to limited list all or paged results. See limited lists below.
```
var subscriptions = upodi.Subscriptions.List(all: true);
```

Create a new subscription. Requires the customer and product plan id.
```
var newId = upodi.Subscriptions.Create(customerId, productPlanId, DateTime.UtcNow);
```

Subscriptions enable various actions.
```
var result = upodi.Subscriptions.activateSubcription(subscriptionId);
var result = upodi.Subscriptions.cancelSubcription(subscriptionId);
var result = upodi.Subscriptions.expireSubcription(subscriptionId);
var result = upodi.Subscriptions.holdSubcription(subscriptionId);
var result = upodi.Subscriptions.resumeSubcription(subscriptionId);
```

Update amount of a subscription charge.
```
var result = upodi.Subscriptions.SetAmount(subscriptionId, productPlanChargeId, 302.34);
```
## Limited lists
Using the .List() method on customer and subscription (ex. upodi.Subscriptions.List()) will return a reduced number of records due to performance. You will have to iterate through the list fetching each object to get the full object.

| List          | Properties    |
| ------------- | ------------- |
| Customer      | ID,CompanyName,AccountNumber,CurrencyCode,FullName,AutoBill,RefKey,CreatedDate,ModifiedDate |
| Subscription  | ID,SubscriptionNumber,CustomerID,ProductPlanID,StartDate,StateCode,Status,EndDate,RefKey,CreatedDate,ModifiedDate      |