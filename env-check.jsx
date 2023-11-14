const fs = require('fs');

const envFilePath = '.env.local';
if (fs.existsSync(envFilePath)) {
  // console.log('.env.local file is found!');
} else {
  // eslint-disable-next-line no-console
  console.error('Error: .env.local file not found!');
  process.exit(1);
}
