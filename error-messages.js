module.exports = {
    missingEnvFile: 'The .env file is missing.',
    emptyEnvFile: 'The .env file does not contain any values.',
};

const errorMessages = require('./error-messages.js');

if (!process.env.env_file) {
    console.error(errorMessages.missingEnvFile);
}

if (process.env.env_file === '') {
    console.error(errorMessages.emptyEnvFile);
}
