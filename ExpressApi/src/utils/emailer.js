/**
* Email Service Wraper
* @author Rasinraj
*/

const noxEmailer = require('nox-emailer');
const utils = require('./index');

const configuration = {
	styles: {
		backgroundColor: '#F2F2F2', // Email background color.
		primaryBackgroundColor: '#2780F0', // Primary box color.
		secondaryBackgroundColor: 'FFFFFF', // Secondary box background color.
		primaryTextColor: '#2780F0', // Primary Text Color for Primary box background color.
		lightTextColor: '#FFFFFF', // Light text color.
		darkTextColor: '#717993', // Dark Text color for Secondary box background color.
		footerTextColor: '#a2a2a2', // Footer Text Color
	},
	general: {
		templateName: 'Eventure Transactional Emails',
		supportEmail: 'info@eventure.com',
		companyName: 'Eventure, Inc.',
		companyLogo: '',
		companyIcon: '',
	},
};


const emailConfiguration = {
	toAddress: '',
	fromAddress: 'rrkwave@gmail.com',
	subject: '',
};


exports.sendEmail = (data) => {
	emailConfiguration.toAddress = `${data.receiverName}<${data.receiverEmail}>`;
	emailConfiguration.subject = data.subject;
	noxEmailer.template.generateEmailContent(configuration, data)
		.then((htmlTemplate) => {
			noxEmailer.mailService.sendEmail(emailConfiguration, htmlTemplate)
				.then(() => true).catch(() => false);
		}).catch(() => false);
};
