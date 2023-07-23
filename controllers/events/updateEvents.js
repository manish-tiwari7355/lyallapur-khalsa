const uploadFiles = require("../../services/upload-files");
const Events = require("../../models/Events.mode.");
const formidable = require("formidable");
const createError = require("http-errors");
const { isValidObjectId } = require("mongoose");
const { ObjectId } = require("mongoose").Types;
const updateEvents = async (req, res, next) => {
  try {
    const { id } = req.params;

    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      console.log(files);
      if (err) {
        res.status(400);
        res.send(err);
      }

      let { title, description, date, file0 } = fields;

      /// here find existing values that shouldn't be changed
      const imageVals = Object.values(fields)?.filter((item) =>
        item?.includes("http")
      );

      // upload files to s3`
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

      const getEvent = await Events.findOne({
        _id: Object(id),
      });

      /// here get object of files that should be retained in document
      for (let x of getEvent?.media) {
        const file = imageVals?.find((item) => item == x.url);

        if (file) {
          allFileUploadedArray?.push(x);
        }
      }

      const events = await Events.findOneAndUpdate(
        {
          _id: Object(id),
        },
        {
          media: allFileUploadedArray,

          description,
          date,
          title,
        },
        { new: true }
      );

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

module.exports = updateEvents;
