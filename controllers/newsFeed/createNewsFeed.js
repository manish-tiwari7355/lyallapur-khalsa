const uploadFiles = require("../../services/upload-files");
const NewsFeed = require("../../models/NewsFeed.model");
const dayjs = require("dayjs");
const formidable = require("formidable");
const createNewsFeed = async (req, res, next) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      console.log(files);
      if (err) {
        res.status(400);
        res.send(err);
      }
      let { title, date, year } = fields;
      // upload files to s3
      const filesArray = Object.values(files);
      const allFileUploadedArray = await Promise.all(
        filesArray?.map(async (item) => {
          let location = item.path;
          const originalFileName = item.name;
          const fileType = item.type;
          // uploads file.
          const data = await uploadFiles.upload(
            location,
            originalFileName,
            "post/",
            null
          );
          return {
            url: data.Location,
            type: fileType,
          };
        })
      );

      console.log(allFileUploadedArray[0]);

      const newsFeed = new NewsFeed({
        // media: allFileUploadedArray,
        media: allFileUploadedArray,
        date,
        year: dayjs(date).format("YYYY"),
        title,
      });
      console.log(dayjs(date).format("YYYY"));
      // Save post to DB
      await newsFeed.save();

      res.status(200).json({
        success: true,
        data: newsFeed,
      });
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = createNewsFeed;
