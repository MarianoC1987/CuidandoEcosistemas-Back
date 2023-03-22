const fetch = require("node-fetch");
const catchAsync = require("../utilities/catchAsync");

exports.searchApiTrefle = catchAsync(async (req, res, next) => {
  const response = await fetch(
    `https://trefle.io/api/v1/plants/search?token=${process.env.TREFLE_TOKEN}&q=${req.body.search}`
  );
  const json = await response.json();

  res.status(200).json({
    status: "success",
    results: json.data.length,
    data: { json },
  });
});
