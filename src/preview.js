const inquirer = require('inquirer');
const fs = require('fs-extra');
const uuid = require('uuidv4');
const opener = require('opener');
const Uploader = require('s3-batch-upload').default;

const build = require('./build');

module.exports = async function preview() {
  await build({
    answers: {
      emptyBuildDir: true,
      build: ['all'],
    },
  });

  let s3Credentials = null;

  try {
    s3Credentials = await fs.readJson('./.previewsrc');

    if (!s3Credentials.uuid) {
      s3Credentials.uuid = uuid();
      await fs.writeJson('./.previewsrc', s3Credentials);
    }
  } catch (e) {
    s3Credentials = await inquirer.prompt([
      {
        type: 'input',
        name: 'accessKeyId',
        description: 'Please fill in the access key for the S3 Bucket',
      },
      {
        type: 'input',
        name: 'secretAccessKey',
        description: 'Please fill in the secret access key for the S3 Bucket',
      },
      // {
      //   type: 'list',
      //   name: 'region',
      //   description: 'Please select region',
      //   choices: [
      //     'eu-west-1',
      //     'eu-west-2',
      //     'eu-west-3',
      //     'eu-central-1',
      //     'eu-north-1',
      //     'us-east-2',
      //     'us-east-1',
      //     'us-west-1',
      //     'us-west-2',
      //     'ap-south-1',
      //     'ap-northeast-3',
      //     'ap-northeast-2',
      //     'ap-southeast-1',
      //     'ap-southeast-2',
      //     'ap-northeast-1',
      //     'ca-central-1',
      //     'cn-north-1',
      //     'cn-northwest-1',
      //     'sa-east-1',
      //   ],
      // },
      // {
      //   type: 'input',
      //   name: 'host',
      //   description: 'Please fill in the host adress for the S3 Bucket',
      // },
      {
        type: 'input',
        name: 'bucket',
        description: 'Please fill in the host adress for the S3 Bucket',
      },
    ]);

    s3Credentials.uuid = uuid();

    await fs.writeJson('./.previewsrc', s3Credentials);
  }

  await new Uploader({
    config: './.previewsrc', // can also use environment variables
    bucket: s3Credentials.bucket,
    localPath: './build',
    remotePath: `./${s3Credentials.uuid}`,
    glob: '*.*', // default is '*.*'
    concurrency: '200', // default is 100
    dryRun: false, // default is false
    // cacheControl: 'max-age=300', // can be a string, for all uploade resources
    cacheControl: {
      // or an object with globs as keys to match the input path
      // '**/settings.json': 'max-age=60', // 1 mins for settings, specific matches should go first
      // '**/*.json': 'max-age=300', // 5 mins for other jsons
      '**/*.*': 'max-age=60', // 1 hour for everthing else
    },
  }).upload();

  console.log(`go to ${s3Credentials.host}/${s3Credentials.bucket}/index.html`);

  opener(
    `https://${s3Credentials.bucket}.s3-eu-west-1.amazonaws.com/${s3Credentials.uuid}/index.html`,
  );
};
