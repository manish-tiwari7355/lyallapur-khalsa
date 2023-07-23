const uploadFiles = require("../../services/upload-files");
const Events = require("../../models/Events.mode.");
const formidable = require("formidable");
const createError = require("http-errors");

const getAllEvents = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    // const viewSize = parseInt(req.query.viewSize) || 10;
    const searchCriteria = {};

    if (req.query.keyword) {
      searchCriteria["$and"] = [
        {
          title: { $regex: `^${req.query.keyword.trim()}`, $options: "i" },
        },
      ];
    }
    const data = await Events.aggregate([
      {
        $match: searchCriteria,
      },
      {
        $facet: {
          count: [{ $count: "totalCount" }],
          data: [
            {
              $sort: {
                createdAt: -1,
              },
            },

            {
              $skip: startIndex,
            },
            // {
            //   $limit: viewSize,
            // },
            {
              $sort: { date: -1 },
            },
          ],
        },
      },
    ]);
    const totalCount = await Events.countDocuments(searchCriteria);

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

module.exports = getAllEvents;
