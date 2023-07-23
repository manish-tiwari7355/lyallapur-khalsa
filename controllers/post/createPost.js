const uploadFiles = require("../../services/upload-files");
const Post = require("../../models/Post.model");
const formidable = require("formidable");

const createPost = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;


    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      console.log(files)
      if (err) {
        res.status(400);
        res.send(err);
      }

      try {
        let { description , repost ,rePostedID ,tag} =
          fields;

        if(tag)tag=JSON.parse(tag)
        let post
        if(!repost){
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
              `users/${userId}/posts`,
              null,
            );
            return {
              url: data.Location,
              type: fileType,
            };
          })
        );
        
    console.log(allFileUploadedArray[0])

      post = new Post({
       media: allFileUploadedArray,
       description,
       user: userId,
     });
    }else{
      post = new Post({
      // media: allFileUploadedArray,
       description,
       tag,
       user: userId,
       isRePosted:repost,
       rePostedID
     });
    }
    
        // Save post to DB
        const createdPost = await post.save();
        if (!createdPost)
          throw createError.InternalServerError(
            "Your request could not be processed. Please contact support or try again after some time."
          );

        res.status(200).json({
          success: true,
          data: createdPost,
        });

      } catch (error) {
        console.error("error in create post: ", error)
      }
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = createPost;