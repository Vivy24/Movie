/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
  // Configure Angular `environment.ts` file path
  const targetPath = './src/environments/environment.ts';
  // Load node modules
  require('../../package.json').version;
  require('dotenv').config({
    path: 'src/environments/.env',
  });
  // `environment.ts` file structure
  const envConfigFile = `export const environment = {
    production: true,
    HTTP_API_KEY: '${process.env['HTTP_API_KEY']}',
    HTTP_ORIGINAL_IMAGE: 'https://image.tmdb.org/t/p/original',
    basedAddress: 'http://localhost:4200',
    encryptedSecretKey: '${process.env['encryptedSecretKey']}',
};
`;

  writeFile(targetPath, envConfigFile, (err: Error) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        `Angular environment.ts file generated correctly at ${targetPath} \n`
      );
    }
  });
};

setEnv();
