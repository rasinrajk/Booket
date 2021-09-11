/**
* Email Constants
* @author Sulfikar,Rasin
*/
const url = `${process.env.URL+':'+process.env.PORT}`;
exports.emailConstants = {
	VERIFICATION_EMAIL: {
		subject: 'Activate your account at Admin module',
		subTitle: 'Thanks for signing up!',
		mainTitle: 'Complete your registration',
		mailContent: 'We would like to make sure we have the correct email address EMAIL_ADDRESS for completion of the registration process, please verify your email using the verification button below.',
		buttonLink: url+'/verify',
		buttonText: 'VERIFY EMAIL',
	},
	PASSWORD_RESET_EMAIL: {
		subject: 'Verify your account at Admin module',
		subTitle: 'Requested to reset your password!',
		mainTitle: 'Verify your email address',
		mailContent: 'We would like to make sure that you have requested to reset your account password at TruDocs. For completion of the reset process, please verify your email using the verification button below.',
		buttonLink: process.env.baseURL+'/resetPassword?token=',
		buttonText: 'VERIFY EMAIL',
	},
	PASSWORD_UPDATE_EMAIL: {
		subject: 'Password Update Notification',
		subTitle: 'Password has been Updated',
		mainTitle: 'Importnat Notice',
		mailContent: 'We would like to inform you that your password has been updated for TruDocs. Please contact our support center if you haven\'t made the password reset request.',
		buttonLink: '',
		buttonText: 'VISIT DASHBOARD',
	},
};
