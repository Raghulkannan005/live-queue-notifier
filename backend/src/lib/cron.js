import { CronJob } from 'cron';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const job = new CronJob('0 */14 * * * *', async () => {
  const url = `${process.env.API_URL}/test`;

  try {
    const res = await fetch(url);
    console.log(`[CRON] ${new Date().toLocaleString()} - Status: ${res.status}`);
  } catch (err) {
    console.error(`[CRON] Fetch failed:`, err.message);
  }
});

export default job;
