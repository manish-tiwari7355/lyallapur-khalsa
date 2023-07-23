const Enquiry = require("../../models/EnquiryForm.model");

const getAllEnquiryForm = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const viewSize = parseInt(req.query.viewSize) || 10;
    const searchCriteria = {};
    if (req.query.keyword) {
      searchCriteria["$and"] = [
        {
          email: { $regex: `^${req.query.keyword.trim()}`, $options: "i" },
        },
      ];
    }
    const data = await Enquiry.aggregate([
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
            {
              $limit: viewSize,
            },
          ],
        },
      },
    ]);
    const totalCount = await Enquiry.countDocuments(searchCriteria);
    if (!data) throw createError.BadRequest("No Enquiery Found");

    res.status(200).json({
      success: true,
      count: data.length,
      totalCount,
      data: data[0].data,
      total: data[0].count[0] ? data[0].count[0].total : 0,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports = getAllEnquiryForm;
