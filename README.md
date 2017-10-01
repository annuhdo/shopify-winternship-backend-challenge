# Backend Intern Challenge - Winter 2018

## Problem
Different merchants have different customer data needs. For example, business to business (B2B) customers will be subject to stricter requirements that their business to consumer (B2C) counterparts.

To address this situation we decided to build a system that allows dynamic field validation.

The validations constraints are expressed as objects in a JSON array, specified as follows:

| Validation | Possible Values | Optional | Description |
|------------| --------------- | -------- | ----------- |
|`required`|`true`,`false`|✓|If not provided, defaults to `false`. Flags a field as required
|`type`|`"boolean"`, `"number"`, `"string"`|✓|Specifies the JSON type of the value (if not provided, everything is valid).
|`length`|An object that contains `min` or `max` keys (one or both)|✓|The value must be greater than or equal to `min` characters if present. The value must be less than or equal to `max` characters if present. Fields with this validation can be assumed to be of type `String`

**Example:**

```json
{
  "validations": [
    {
      "name": {
        "required": true,
        "length": {
          "min": 5,
          "max": 20
        }
      }
    },
    {
      "email": {
        "required": true
      }
    },
    {
      "age": {
        "type": "number"
      }
    },
    {
      "password": {
        "required": true,
        "length": {
          "min": 8
        }
      }
    }
  ]
}
```

## API response
The response will contain the followings keys:

* `validations` - Array containing validations as specified in the previous section
* `customers` - Array containing each customer data as an object
* `pagination` - An object containing the `current_page`, `per_page` and `total` keys

## Instructions
**Candidates can use any programming language of their choice.**

Obtain a list of customers from the API, and perform the validations defined in the response against each customer, producing an output like the following:

```json
{
  "invalid_customers": [
    { "id": 1, "invalid_fields": ["name", "age"] },
    { "id": 3, "invalid_fields": ["password"] }
  ]
}
```

The output is expected to be in JSON and contain the following keys:

* `invalid_customers` - Array containing information about the records that failed the validation in the following format:
	1. `id` - The id of the customer record
	2. `invalid_fields` - All fields that failed the validation for that record

The API endpoint can be found at:

https://backend-challenge-winter-2017.herokuapp.com/customers.json

This will return the first page of customers. You can obtain subsequent pages by providing a `page` query parameter:

https://backend-challenge-winter-2017.herokuapp.com/customers.json?page=2

[Source](https://backend-challenge-winter-2017.herokuapp.com/)
