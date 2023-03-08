const express = require('express');
const nodemailer = require('nodemailer');
const port = 4400 || process.env.PORT;
require('dotenv').config({ path: '.env' });

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile('membershipForm.html', { root: './' });
});

app.post('/send-member', (req, res) => {
	// console.log(req.body);
	const output = 'test';
	
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
		from: 'Email <email@site.com>',
		to: 'email@gmail.com',
		subject: 'Membership Request',
		text: 'text',
		html: output
	};

	transporter.sendMail(mailOptions, (err, info) => {
		if (err) { return console.log(err) }
		console.log(info);
	});

	res.send('received');	
	res.redirect('/');
})

app.listen(port, () => console.log('listening on 4400'));