import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

admin.initializeApp();

const db = admin.firestore();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'noreply.show.mailer@gmail.com',
    pass: 'banana!11'
  }
});

export const sendEmailNotification = onRequest(async (request, response) => {
  try {
    const snapshot = await db.collection('users').get();
    const emailPromises: Promise<any>[] = [];

    snapshot.forEach(doc => {
      const userEmail = doc.data().email;
      if (userEmail) {
        const mailOptions = {
          from: '"show_crawler" <noreply.show.mailer@gmail.com>', // 발신자 이름과 이메일 주소
          to: userEmail,
          subject: '반갑습니다. 예시 메일입니다.',
          text: '내용 내용 내용'
        };
        emailPromises.push(transporter.sendMail(mailOptions));
      }
    });

    await Promise.all(emailPromises);

    response.status(200).send('Emails sent successfully.');
  } catch (error) {
    logger.error('Error sending emails:', error);
    response.status(500).send('Error sending emails');
  }
});