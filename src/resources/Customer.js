{
  // id of object, set by Upodi 
  id : "guid",
  // object id if the customer has a parent customer 
  "parentid": "guid",
  // if true, the parent customer will be the billing entity 
  "billtoparent": "boolean",
  // if true, any invoices billed on the same day will be collected on one 
  "collectivebilling": "boolean",
  // required, can be customized 
  "accountnumber": "string",
  "companyname": "string",
  "companyvat": "string",
  // required 
  "fullname": "string", 
  // custom key, example a remote id 
  "refkey": "string", 
  "primaryemail": "string",
  // required 
  "currencycode": "string", 
  "currency": "currency object",
  // required 
  "autobill": "boolean", 
  // id of default payment method - can be extracted via $expand=DefaultPaymentMethod 
  "paymentmethod": "guid",
  "homephone": "string",
  "businessphone": "string",
  "mobilephone": "string",
  "addressline1": "string",
  "addressline2": "string",
  // text field 
  "note": "string",
  // address city 
  "city": "string",
  "postalcode": "string",
  // address country 
  "country": "string",
  // address county 
  "county": "string",
  // address state 
  "state": "string",
  // default payment method object if expanded 
  "defaultpaymentmethod": "paymentmethod object",
  "parent": "parent object",
  // supported days of payment term. values: 
  // -1=notset, 0=onreciept, 8=net8 days, 14=net14, 21=net21, 30=net30, 45=net45, 60=net60, 90=net90 
  "paymentterm" : "int",
  "businessunitid": "guid",
  "businessunit": "businessunit object",
  // Overwrite any default email template set coming from the product plan 
  "emailtemplatesetid": "guid",
  "subscriptions": "subscription[] array",
  "invoices": "invoice[] array",
  "contacts": "contact[] array",
  "paymentmethods": "paymentmethod[] array",
  "subscriptioncharges": "subscriptioncharge[] array",
  "transactions": "transaction[] array",  
    // set by upodi 
  "createdby": "guid",
    // set by upodi 
  "modifiedby": "guid",
    // set by upodi 
  "createddate": "datetime",
    // set by upodi 
  "modifieddate": "datetime"
}