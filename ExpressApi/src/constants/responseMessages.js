/**
* Response Constants
* @author Sulfikar
*/

exports.responseConstants = {
	REGISTER: {
		success: 'Registration success.Please activate your account through the confirmation mail send to your mail id',
		error: 'Failed to create user',
		info: 'User already exists in the system. Please login to your account',
	},
	LOGIN: {
		success: 'Successfully logged in.',
		enterOTP:'To login enter OTP',
        invalidEmail:'Incorrect username',
        invaliPassword:'Incorrect Password',        
		error: 'Incorrect username / password',
		info: 'Please verify your account',
		suspended: 'You account has been suspended',
	},
	LOGIN_OTP: {
		success: 'Successfully logged in.',        
        invalidOTP:'incorrect OTP',		
		suspended: 'You account has been suspended',
	},
	ENABLE_2FA: {
		success: 'Two factor authentication enabled.',
		invalidOTP: 'OTP is wrong and two factor authentication not enabled',
		error: 'otp is not provided and twofa not enabled'
	},
	DISABLE_2FA: {
		success: 'Two factor authentication disabled',
		error: 'OTP is wrong and two factor authentication not disabled',
		},
	VERIFICATION: {
		success: 'The account has been verified. Please log in.',
		error: 'This user has already been verified.',
		info: 'We were unable to find a user for this token.',
		expired: 'We were unable to find a valid token. Your token my have expired.',
	},
	LOGOUT: {
		success: 'logged out from all the devices successfully',
	},
	PASSWORD_RESET_EMAIL: {
		success: 'Successfully sent verification link to your email address.',
		verificationMethod: 'Invalid verification method',
		error: 'Unable to process the request',
		info: 'No account with that email address exists.',
		expired: 'Verification code has been expired',
	},
	PASSWORD_RESET_PHONE: {
		success: 'Successfully sent verification code to your phone.',
		verificationMethod: 'Invalid verification method',
		error: 'Unable to process the request',
		info: 'Unable to identify the user',
		expired: 'Verification code has been expired',
	},
	PASSWORD_UPDATE: {
		success: 'Successfully updated the password.',
		error: 'Unable to process the request',
		info: 'Unable to identify the user',
		expired: 'Verification code has been expired',
	}, 
	MIDDLEWARE: {
		error: 'Not authorized to access this resource',
		info: 'Access Denied: You dont have correct privilege to perform this operation',
	}  
};
