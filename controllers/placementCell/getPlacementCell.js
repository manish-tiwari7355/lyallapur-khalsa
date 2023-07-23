const Upplacement = require("../../models/PlacementCell");

const getAllPlacement = async (req, res, next) => {

    const startIndex = parseInt(req.query.startIndex) || 0;
  const viewSize = parseInt(req.query.viewSize) || 5;
  const searchCriteria = {};

  if (req.query.keyword) {
    searchCriteria["$or"] = [
      { Name: { $regex: `^${req.query.keyword}`, $options: "i" } },
    ];
  }
    try {
        const Placement = await Placement.find(searchCriteria)
            .skip(startIndex)
            .limit(viewSize)
            .sort({ createdAt: -1 });
        const count = await Placement.find(searchCriteria).count();

        res.json({
            success: true,
            message: "placement fetched successfully",
            placement,
            count: placement?.filter((item) => item !== req.query.keyword).length,
            totalCount: count,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}

module.exports = getAllPlacement;