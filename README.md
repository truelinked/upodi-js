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


### Working with Customers
List all customers. Options to limited list all or paged results. See limited lists below.
```
var customers = upodi.customers.list(all: true);
```


Create a new customer. Requires accountnumber, fullname and currencycode.
```
var newId = upodi.customers.create("acocuntnumber", "fullname", "USD");
```

### Working with Subscriptions
List all subscriptions. Options to limited list all or paged results. See limited lists below.
```
var subscriptions = upodi.Subscriptions.list(all: true);
```

Create a new subscription. Requires the customer and product plan id.
```
var newId = upodi.subscriptions.create(customerId, productPlanId, DateTime.UtcNow);
```

Subscriptions enable various actions.
```
var result = upodi.subscriptions.activate(subscriptionId);
var result = upodi.subscriptions.cancel(subscriptionId);
var result = upodi.subscriptions.expire(subscriptionId);
var result = upodi.subscriptions.hold(subscriptionId);
var result = upodi.subscriptions.resume(subscriptionId);
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