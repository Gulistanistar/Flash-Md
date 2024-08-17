const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0hLaHJkemFWTFRVS0F6Z3o1K1krcU1ObmN6TGNvdzU1TlFJd0JGMHhYaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVnlQL3pBV3RKSHM4OHFDalJybDZrZytRUTZvdWU4VGU0U1hNc1doQWtoMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrRXU4MWoxcjVBT1l3aXJHc1BjdXZRVzRqNGhxOGNtOHVHMkZjbmgwa1c0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4SjIwbUQ5SUQwaGpOejRNR0JEUDg1YndqZ3FiVGNodGFJR2Q2dThoMW53PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNJaFFyNG5jZEc0dFZYVlUrT0w3UEhGbFVXZGFucHE5bEVZM01xRDZjbjA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlnSVZnUXB0L1BZMllVa0E4SGJDVzYvSld0WFV0QVhWVjFVWjQwM1MwZ0U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaVA0YXBDYUxwaDNQbXQzMjBCbXJSV3V0OXltdU5mQlZUdXJCeWJ1d0ZrST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTklBNEl1YnhTam92RXhIdGhFNElLbGNzNzRxTGs3aTlEbzA1NVdKcU14az0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFYNThha3B3TlNvZGMxTlFCUzV0VzFyZVpxZFVxMFhGYytUS1MvZForWG1ZZTlxWEFKczRCQ1lYOVlBL1JyTlBBc0RjNG90VWJuWG11d0RqV0pQcUJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTA4LCJhZHZTZWNyZXRLZXkiOiJWeTNqTnhzQ3dxcVNWQ0JPVnRmeU01QjVwa2JvS0xuWk4zek1GaktLenN3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJzMzJ3SDNrQlExdUR5YVg3ZUxjbFpBIiwicGhvbmVJZCI6ImM3MjY2MmE2LTY4ODAtNDI3Zi04YTE4LWJiYjM1NWFhOGFlNCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1VEFFMTBsckNJMHVkVjNIK1J6RVRHOVNLQXM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0xKZGpKK3h6bVVDVmlsUjVhOG5yVHQ1MFlNPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjkzSkJBTFIzIiwibWUiOnsiaWQiOiI5MjMzMDgzNjM0MzM6NDlAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01XMjZvY0hFTmYvLzdVR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjRLZVRYbXdCM0pibTRPTExlb2V0cHRPNDlIWTcvS3R6MmU2dURMYzJnZ1k9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImwwS3JIelZZWEtscWF1ZHNnTHlsbWhxckxyRXJXbUIzQmw2VFF6WEYxbGdKZjM0aENPN2piaStDV1IwTnIydnY1eDhmOG82Q2tlNER6MUxDZXFJb0FBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI1Yy9wRExlSERWQ0ltbERmY09WQmJhVWg4RDJLUUcxOXJYVVQ5ZDhFSnZHakV3TmkvTGN4dVZKQlAramlkc2NYdjhkR0tobHZVR09oS1lUV3Y4Zy9BZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzMwODM2MzQzMzo0OUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlQ25rMTVzQWR5VzV1RGl5M3FIcmFiVHVQUjJPL3lyYzludXJneTNOb0lHIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIzODU4OTE1LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU1xQyJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Gulistani star",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "923308363433", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'U M A R I-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
