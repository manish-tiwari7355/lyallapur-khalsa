const  UpcommingPlacement= require("../../models/UpcommingPlacement.model");

const getAllUpcomingPlacements = async (req, res, next) => {

    const startIndex = parseInt(req.query.startIndex) || 0;
  const viewSize = parseInt(req.query.viewSize) || 5;
  const searchCriteria = {};

  if (req.query.keyword) {
    searchCriteria["$or"] = [
      { Name: { $regex: `^${req.query.keyword}`, $options: "i" } },
    ];
  }
    try {
        const upcommingPlacement = await UpcommingPlacement.find(searchCriteria)
            .skip(startIndex)
            .limit(viewSize)
            .sort({ createdAt: -1 });
        const count = await UpcommingPlacement.find(searchCriteria).count();

        res.json({
            success: true,
            message: "placements fetched successfully",
            upcommingPlacement,
            count: upcommingPlacement?.filter((item) => item !== req.query.keyword).length,
            totalCount: count,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}

module.exports = getAllUpcomingPlacements;