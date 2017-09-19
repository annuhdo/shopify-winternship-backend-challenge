const helpers = require('./helpers.js');

// Helper functions to check validity of each field
const checkRequired = helpers.checkRequired;
const checkType = helpers.checkType;
const checkLength = helpers.checkLength;

// getAPI function that calls request
const getAPI = helpers.getAPI;

// Constants
const PATH = 'https://backend-challenge-winter-2017.herokuapp.com/customers.json?page=';

// Given the array of validations and a customer
// Return an array of invalid fields after checking
// 	each field's validity
const checkValidity = (validations, customer) => {
    let invalidFields = [];

    for (let j = 0; j < validations.length; j++) {
        const validation = validations[j];

        const field = Object.keys(validation)[0];

        const len = validation[field] && validation[field]["length"];
        const type = validation[field] && validation[field]["type"];
        const required = validation[field] && validation[field]["required"];

        const requiredMatch = checkRequired(required, customer[field]);
        const typeMatch = checkType(type, customer[field]);
        let lenMatch = true;

        // If the type is string let's check the length
        if (type && type === "string" || typeof customer[field] === "string") {
            lenMatch = checkLength(len, customer[field]);
        }

        if (!requiredMatch || !typeMatch || !lenMatch) {
            invalidFields.push(field);
        }
    }

    return invalidFields;
}

// Loop through each page from API
// return an Object of invalid customers that is an array
async function getInvalidFields(startingPage) {
    try {
        let invalid_customers = [];
        let res = {};
        let page = startingPage;

        if (page < 1) {
        	page = 1;
        }

        while (true) {
            let res = await getAPI(`${PATH}${page}`);

            let pagination = res.pagination;
            let validations = res.validations;
            let customers = res.customers;

            // If the page contains no customers assume subsequent
            // pages have none either
            if (!customers || customers.length === 0) {
                break;
            }

            // Find invalid fields in each customer and
            // push to invalid_customers array
            for (let i = 0; i < customers.length; i++) {
                let customer = customers[i];
                let invalidFields = checkValidity(validations, customer);
                if (invalidFields && invalidFields.length > 0) {
                    invalid_customers.push({
                        id: customer["id"],
                        invalid_fields: invalidFields
                    });
                }
            }

            // Break before we request for the next page
            if (pagination.current_page * pagination.per_page >= pagination.total) {
                break;
            }

            // Next page
            page++;
        }

        res["invalid_customers"] = invalid_customers;
        res = JSON.stringify(res);
        return res;
    } catch (err) {
        console.error(err);
    }


}

// Start the call at page 1
getInvalidFields(1);