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

exports.dataApiTrefle = catchAsync(async (req, res) => {
  const slug = req.params.slug;
  const response = await fetch(
    `https://trefle.io/api/v1/plants/${slug}?token=${process.env.TREFLE_TOKEN}`
  );
  const info = await response.json();

  res.status(200).json({
    id: info?.data.id,
    name: info?.data.common_name,
    year: info?.data.year,
    img: info?.data.image_url,
    slug: info?.data.slug,
    family: info?.data.main_species.family,
    habit: info?.data.main_species.images?.habit[0]?.image_url,
    leaf: info?.data.main_species.images?.leaf[0]?.image_url,
    bark: info?.data.main_species.images?.bark[0]?.image_url,
    flower: info?.data.main_species.images?.flower[0]?.image_url,
    moreInfo: info?.data.sources.map((fuentes) => fuentes.url),
  });
});
