const { emailQueue } = require('./jobs/emailJob');

emailQueue.process(async (job) => {
  const { email } = job.data;
  console.log(`📨 Sending email to ${email}...`);
  await new Promise(r => setTimeout(r, 3000)); // simulate delay
  console.log(`✅ Email sent to ${email}`);
});
