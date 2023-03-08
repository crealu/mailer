const express = require('express');
const nodemailer = require('nodemailer');
const port = 4400 || process.env.PORT;
// require('dotenv').config({ path: '.env' });

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile('membershipForm.html', { root: './' });
});

app.post('/send-member', (req, res) => {
	console.log(req.body);
	const output = `
		<h3>New Membership Request</h3>
		<p>
			Submittal Date: ${req.body.submittalDate}<br/>
			Precinct #: ${req.body.precinct}<br/>
			Name: ${req.body.name}<br/>
			Email: ${req.body.email}<br/>
			Address: ${req.body.address}<br/>
			Employer: ${req.body.employer}<br/>
			Occupation: ${req.body.occupation}<br/>
			Recruited By: ${req.body.recruitedBy}<br/>
		</p>

		<p>Methods of Contact:</p>
		<ul>
			${req.body.mailContact == 'on' ? '<li>Mail</li>' : ''}
			${req.body.emailContact == 'on' ? '<li>Email</li>' : ''}
			${req.body.phoneContact == 'on' ? '<li>Phone</li>' : ''}
		</ul>

		<p>Interested in:</p>
		<ul>
			${req.body.memI == 'on' ? '<li>Membership</li>' : ''}
			${req.body.nomI == 'on' ? '<li>Nominating</li>' : ''}
			${req.body.issueAdvI == 'on' ? '<li>Issue Advocacy</li>' : ''}
			${req.body.commServI == 'on' ? '<li>Community Service</li>' : ''}
			${req.body.legisI == 'on' ? '<li>Legislative</li>' : ''}
			${req.body.legalI == 'on' ? '<li>Legal</li>' : ''}
			${req.body.commI == 'on' ? '<li>Communications</li>' : ''}
			${req.body.fundI == 'on' ? '<li>Fundraising</li>' : ''}
			${req.body.voterRegI == 'on' ? '<li>Voter Registration</li>' : ''}
		</ul>

		<p>Payment by: </p>
		<ul>
			${req.body.duesCash == 'on' ? '<li>Cash</li>' : ''}
			${req.body.duesCheck == 'on' ? '<li>Check</li>' : ''}
		</ul>

		<p>Signature: ${req.body.signature}</p>
		<p>Date: ${req.body.date}</p>
	`;
	
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

	res.sendFile('success.html', { root: './' });
})

app.listen(port, () => console.log('listening on 4400'));