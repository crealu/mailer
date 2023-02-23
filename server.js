const express = require('express');
const nodemailer = require('nodemailer');
const port = 4400 || process.env.PORT;
// require('dotenv').config({ path: '.env' });

const app = express();

app.use(express.urlencoded({extended: true}));

// app.get('/', (req, res) => {
// 	const output = `
// 		<p>New Membership</p>
// 		<ul>
// 			test
// 		</ul>
// 	`;

// 	let smtpConfig = {
// 		host: 'smtp.gmail.com',
// 		port: 465,
// 		secure: true,
// 		auth: {
// 			user: process.env.THE_EMAIL,
// 			pass: process.env.THE_KEY
// 		},
// 	}

// 	let transporter = nodemailer.createTransport(smtpConfig);

// 	let mailOptions = {
// 		from: 'Niheigo <niheigodev@site.com>',
// 		to: 'niheigodev@gmail.com',
// 		subject: 'Membership Request',
// 		text: 'text',
// 		html: output
// 	};

// 	transporter.sendMail(mailOptions, (err, info) => {
// 		if (err) { return console.log(err) }
// 		console.log(info);
// 	})

// 	res.send('Server running');
// });

app.post('/send-member', (req, res) => {
	const ouput = 'test';
	
	let smtpConfig = {
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: process.env.THE_EMAIL,
			pass: process.env.THE_KEY
		}
	}

	let transporter = nodemailer.createTransport(smtpConfig);

	let mailOptions = {
		from: 'Niheigo <niheigodev@site.com>',
		to: 'niheigodev@gmail.com',
		subject: 'Membership Request',
		text: 'text',
		html: output
	};

	transporter.sendMail(mailOptions, (err, info) => {
		if (err) { return console.log(err) }
		console.log(info);
	});

	res.send('Membership submitted');
})

app.listen(port, () => console.log('listening on 4400'));