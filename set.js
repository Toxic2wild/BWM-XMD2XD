const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUQ0ZDlQakp0cXpuRnltano2ajdNczlibm5KWGxzNUdMb1IwdHV4WVAzUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTVZRZ2VKZGNUMDNONzZhY0hFc1NRd1R0WC8xdGxvS2swa0pnWG1ERU5Uaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrS3NtZnFaYUYxVCtyeVNMQkhkcmFDQW1aZEtNblF3bTd5QnRlWDJrc1hzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvS2lva2wyVE1EZFdMcHJYR0xDVDBVTElUVnh6WnVGSDhiN1d1cnlJSFhJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNERHZhZ0pQT2t2TEExSlg4anNNWXdDckU2QjZVcjhyY2RRZXhLc3huR1U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBNaldoRTBMU3MyMS83VjhwT1lWVUZGNGJ1MTVFb3ZVenJURXlkYUdUMms9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0hyOVlUYWRNOGFLaGNsbkRUK2Evc01tWk1JOVdQNWVvMlRlU0N6amQyND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV01DWmlSWGFhT2lnRGdwVXBuNXpBLy8vNWlHU3hUVXJuQ251ZFVZa05tVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdnYnluYklJSkNoNXhIRlJMNGwxWUhMQk90VytoRTM1bEsxaDArbjZGbWJhTlRZRFBsMXRXc2FkZ1ZqWDRQdDVUU2ZzUkFQU3dpTDJCR3YxOVRKNERBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzUsImFkdlNlY3JldEtleSI6IlZNSnZwbWhCbnAySkU3YXV1RW5ab0NuVEx0MXU5NXFhL0k4dHk2MVY3azQ9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ikw1N3RhVnBDU1ZTb0lUZGFTRXlXeEEiLCJwaG9uZUlkIjoiMTNlNWJkNDUtOGEyZC00MzM5LThhZjAtZjA0NzI3MWRhNDY4IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRwKzQvdVBDdXJ4RGZaRDAvdnBKQ2dBN1RROD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTSElLQlVMVHk2RmExMVcvUGhkKzl5dXRqUU09In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiMkpZRDZTVlkiLCJtZSI6eyJpZCI6IjIzNDkwMzkwMzEzOTI6NjVAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01QWTRxZ0NFSW1QcWJVR0dBWWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlZNN3lKSmF4QWZ0M3FhcnV1bWNYQUNzUnJ0MDN5YUJHRTJOaXFUQllTSHc9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjBtQkZXN2ttQlczUk5IY1ZkVncyRnRoMjJ3OGZxdFRRZEpXVXBlb01naExZK1pDYmozU0VSZVVqNnk5bnUxWXZuV1lTai96bGN6dDRzdVlSblo2V0FRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJsUzV2bkZST2lUM2tWVUJMcFN1bFlhUTBzZTRocENUck5hR3Zhc1ZnSjZWeGY0WHFSektwNGFndGtuL1NycFhmVFRMZlRPYXpKR3ovMkd0V3l0TmlEQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDkwMzkwMzEzOTI6NjVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVlRPOGlTV3NRSDdkNm1xN3JwbkZ3QXJFYTdkTjhtZ1JoTmpZcWt3V0VoOCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMjQzNTQ3OX0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

