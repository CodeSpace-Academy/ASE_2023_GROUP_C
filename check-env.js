// module.exports = {
//     missingEnvFile: 'The .env file is missing.',
//     emptyEnvFile: 'The .env file does not contain any values.',
// };

// const errorMessages = require('./error-messages.js');

// if (!process.env.env_file) {
//     console.error(errorMessages.missingEnvFile);
// }

// if (process.env.env_file === '') {
//     console.error(errorMessages.emptyEnvFile);
// }


// const errorMessages = {
//   emptyEnvVariable: ' is not defined or is empty in the environment.',
// };

// if (!process.env.MONGODB_USERNAME) {
//   console.error('MONGODB_USERNAME' + errorMessages.emptyEnvVariable);
//   throw new Error('MONGODB_USERNAME' + errorMessages.emptyEnvVariable);
// }

// if (!process.env.MONGODB_PASSWORD) {
//   console.error('MONGODB_PASSWORD' + errorMessages.emptyEnvVariable);
//   throw new Error('MONGODB_PASSWORD' + errorMessages.emptyEnvVariable);
// }

// if (!process.env.MONGODB_CLUSTERNAME) {
//   console.error('MONGODB_CLUSTERNAME' + errorMessages.emptyEnvVariable);
//   throw new Error('MONGODB_CLUSTERNAME' + errorMessages.emptyEnvVariable);
// }

// if (!process.env.MONGODB_DATABASE) {
//   console.error('MONGODB_DATABASE' + errorMessages.emptyEnvVariable);
//   throw new Error('MONGODB_DATABASE' + errorMessages.emptyEnvVariable);
// }




const errorMessages = {
  emptyEnvObject: 'The `env` object is not defined or is empty in the environment.',
};

if (!process.env.env || Object.keys(process.env.env).length === 0) {
  console.error(errorMessages.emptyEnvObject);
  throw new Error(errorMessages.emptyEnvObject);
} else {
  console.log('Environment is correctly configured.'); // Log a message when the `env` object is defined and not empty.
}
