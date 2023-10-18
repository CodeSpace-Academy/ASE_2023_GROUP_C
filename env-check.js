const fs = require('fs');

const envFilePath = '.env.local';
if (fs.existsSync(envFilePath)) {
} else {
  console.error('Error: .env.local file not found!'); 
  process.exit(1); 
}
