const fs = require("fs");
const AWS = require("aws-sdk");
const keys = require("../../config/keys").aws;
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
// const { PassThrough } = require("stream");
ffmpeg.setFfmpegPath(ffmpegPath);
// const uploadFiles = require("../upload-files");
const mainFunc = async (inputFilePath, fileName, fragmentDurationInSeconds) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    ffmpeg()
      .input(inputFilePath)
      //   .format("flv")
      .inputOptions([`-ss 0`])
      .outputOptions([`-t ${fragmentDurationInSeconds}`])
      // .noAudio()
      .output(fileName)
      .on("end", resolve)
      .on("error", reject)
      .run();
  });
};
exports.generateVideoPreview = async (
  inputFilePath,
  fileName,
  modelName,
  fragmentDurationInSeconds = 4
) => {
  return new Promise((resolve, reject) => {
    mainFunc(inputFilePath, fileName, fragmentDurationInSeconds)
      .then(async () => {
        const fileData = fs.readFileSync(fileName);

        const s3 = new AWS.S3({
          accessKeyId: keys.accessKeyId,
          secretAccessKey: keys.secretAccessKey,
          region: keys.region,
        });
        const params = {
          Bucket: keys.bucketName,
          Key: modelName + "/preview_" + fileName,
          Body: fileData,
          ACL: "public-read",
        };
        const s3Response = await s3.upload(params).promise();
        fs.unlink(fileName, (err) => {
          if (err) console.log("error unlinking file: ", err);
        });
        return resolve(s3Response);
      })
      .catch((err) => {
        console.log("error in generate video preview: ", err);
        reject(err);
      });
  });
};
