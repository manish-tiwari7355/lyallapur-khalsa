const uploadFiles = require("../../services/upload-files");
const Events = require("../../models/Events.mode.");
const formidable = require("formidable");
const createError = require("http-errors");

const createEvents = async (req, res, next) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      console.log(files);
      if (err) {
        res.status(400);
        res.send(err);
      }

      let { title, description, date } = fields;
      console.log("fields: ", fields);

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

      const events = new Events({
        // media: allFileUploadedArray,
        media: allFileUploadedArray,
        description,
        title,
        date,
      });

      // Save post to DB
      await events.save();

      res.status(200).json({
        success: true,
        data: events,
      });
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = createEvents;
