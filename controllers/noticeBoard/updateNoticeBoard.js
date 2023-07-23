const uploadFiles = require("../../services/upload-files");
const NoticeBoard = require("../../models/NoticeBoard.model");
const formidable = require("formidable");
const createError = require("http-errors");
const { isValidObjectId } = require("mongoose");
const { ObjectId } = require("mongoose").Types;
const updateNoticeBoard = async (req, res, next) => {
  try {
    const { id } = req.params;

    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(400);
        res.send(err);
      }

      let { date, title, description, file } = fields;

      console.log("file", file, fields);

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

      const getNotice = await NoticeBoard.findOne({
        _id: Object(id),
      });

      const noticeBoard = await NoticeBoard.findOneAndUpdate(
        {
          _id: Object(id),
        },
        {
          media: file ? getNotice?.media : allFileUploadedArray,
          description,
          date,
          title,
        },
        { new: true }
      );

      // Save post to DB

      res.status(200).json({
        success: true,
        data: noticeBoard,
      });
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = updateNoticeBoard;
