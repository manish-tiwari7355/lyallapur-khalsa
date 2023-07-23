const uploadFiles = require("../../services/upload-files");
const Media = require("../../models/Media.model");
const formidable = require("formidable");
const createMedia= async (req, res, next) => {
    try {
      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => {
        console.log(files);
        if (err) {
          res.status(400);
          res.send(err);
        }
        let{title}= fields;
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

    const media = new Media({
      // media: allFileUploadedArray,
      media: allFileUploadedArray,
      title,
    });

    // Save post to DB
    await media.save();

    res.status(200).json({
      success: true,
      data: media,
    });
  });
} catch (error) {
  console.log("error: ", error);
  next(error);
}
};

module.exports = createMedia;