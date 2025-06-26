import cron from 'cron'
import https from "https"

const { CronJob } = cron;

const job = new CronJob('0 */14 * * * *', () => {
    https.get(process.env.API_URL, (res) => {
        console.log(`Cron job executed at ${new Date().toLocaleString()}`);
        console.log(`Response status code: ${res.statusCode}`);
    }).on('error', (err) => {
        console.error(`Error during cron job execution: ${err.message}`);
    });
});

export default job;