import nodemailer from 'nodemailer'
import { ReactNode } from 'react'

export async function sendMail(to: string, subject: string, html?: ReactNode, text?: string) {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.NODEMAILER_EMAIL,
			pass: process.env.NODEMAILER_PW,
		},
	})

	const mailOptions = {
		from: process.env.NODEMAILER_EMAIL,
		to,
		subject,
		html: html?.toString(),
		text
	}
	await new Promise((resolve, reject) => {
		transporter.sendMail(mailOptions, (err, response) => {
			if (err) {
				reject(err)
			} else {
				resolve(response)
			}
		})
	})
}
