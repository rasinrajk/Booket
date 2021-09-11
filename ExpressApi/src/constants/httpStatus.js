/**
* HTTP Responses and Messages
* @author Rasin
*/

exports.httpStatus = {
	SERVER: {
		code: 200,
		message: 'Server up and Running',
	},
	OK: {
		code: 200,
		message: 'OK',
	},
	BAD_REQUEST: {
		code: 400,
		message: 'Bad Request',
	},
	UNAUTHORIZED: {
		code: 401,
		message: 'Unauthorized',
	},
	INTERNAL_SERVER_ERROR: {
		code: 500,
		message: 'Internal Server Error',
	},
	NO_CONTENT: {
		code: 204,
		message: 'No Content',
	},
};
