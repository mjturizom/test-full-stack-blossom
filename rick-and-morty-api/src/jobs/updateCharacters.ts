import cron from 'node-cron';
import initializeDatabase from '../services/rickAndMortyAPI';

const scheduleJob = () => {
  cron.schedule('0 */12 * * *', () => {
    console.log('Updating characters...');
    initializeDatabase();
  });
};

export default scheduleJob;
