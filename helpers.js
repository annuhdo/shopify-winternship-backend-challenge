// HELPER FUNCTIONS
const request = require('request-promise');

async function getAPI(uri) {
    try {
        let body = await request.get(uri);
        let parsedBody = JSON.parse(body);
        return parsedBody;
    } catch (err) {
        console.error(err);
    }
}

const checkRequired = (requiredField, input) => {
	if (requiredField && ((typeof input === 'undefined') || (input === null))) {
		return false;
	}

	return true;
}

const checkType = (type, input) => {
	return (type && input) ? typeof input === type : true;
}

const checkLength = (len, input) => {
	if (len && input) {
		if (len.min && input.length < len.min) {
			return false;
		}

		if (len.max && input.length > len.max) {
			return false;
		}
	}
	return true;
}

module.exports = {
    getAPI: getAPI,
    checkRequired: checkRequired,
    checkType: checkType,
    checkLength: checkLength,
}