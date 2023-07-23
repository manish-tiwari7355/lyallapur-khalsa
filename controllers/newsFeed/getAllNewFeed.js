const uploadFiles = require("../../services/upload-files");
const NewsFeed = require("../../models/NewsFeed.model");
const formidable = require("formidable");
const createError = require("http-errors");

const getAllNewFeed = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const viewSize = parseInt(req.query.viewSize) || 10;
    const searchCriteria = {};

    if (req.query.keyword) {
      searchCriteria["$and"] = [
        {
          title: { $regex: `^${req.query.keyword.trim()}`, $options: "i" },
        },
      ];
    }

    // if(req.query.keyword){
    //   searchCriteria["$or"]=[
    //   {
    //     name: { $regex: `${req.query.keyword.trim()}`, $options: "i" },
    //   },
    // ];
    // }
    const data = await NewsFeed.aggregate([
      {
        $match: searchCriteria,
      },
      {
        $facet: {
          count: [{ $count: "totalCount" }],
          data: [
            {
              $group: {
                _id: "$year",
                data: {
                  $addToSet: {
                    _id: "$_id",
                    title: "$title",
                    media: "$media",
                    date: "$date",
                    year: "$year",
                  },
                },
              },
            },
            {
              $sort: {
                createdAt: -1,
              },
            },

            {
              $skip: startIndex,
            },
            {
              $limit: viewSize,
            },
          ],
        },
      },
    ]);
    const totalCount = await NewsFeed.countDocuments(searchCriteria);

    if (!data) throw createError.BadRequest("News feed not found");
    res.status(200).json({
      success: true,
      count: data.length,
      totalCount,
      data: data[0].data,
      total: data[0].count[0] ? data[0].count[0].total : 0,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = getAllNewFeed;
