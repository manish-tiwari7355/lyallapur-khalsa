const Feedback = require("../../models/FeedbackForm");

const getAllFeedback = async (req, res, next) => {

    const startIndex = parseInt(req.query.startIndex) || 0;
  const viewSize = parseInt(req.query.viewSize) || 5;
  const searchCriteria = {};

  if (req.query.keyword) {
    searchCriteria["$or"] = [
      { Name: { $regex: `^${req.query.keyword}`, $options: "i" } },
    ];
  }
    try {
        const feedback = await Feedback.find(searchCriteria)
            .skip(startIndex)
            .limit(viewSize)
            .sort({ createdAt: -1 });
        const count = await Feedback.find(searchCriteria).count();

        res.json({
            success: true,
            message: "feedback fetched successfully",
            feedback,
            count: feedback?.filter((item) => item !== req.query.keyword).length,
            totalCount: count,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}

module.exports = getAllFeedback;