const express = require("express");
const db = require("../model/index");
const Province = db.Province;
const Khwang = db.Khwang;
const Khet = db.Khet;
const router = express.Router();
router.get("/", async (req, res, next) => {
  try {
    const getProvince = await getProvinceAll();
    const getKhwang = await getKhwangAll();
    const getKhet = await getKhetAll();

    res.json({ province: getProvince, khwang: getKhwang, khet: getKhet });
    return;
  } catch {
    res.json({});
    return;
  }
});
module.exports = router;
const getProvinceAll = async () => {
  return await Province.findAll({}).then((data) => {
    return data;
  });
};
const getKhwangAll = async () => {
  return await Khwang.findAll({}).then((data) => {
    return data;
  });
};
const getKhetAll = async () => {
  return await Khet.findAll({}).then((data) => {
    return data;
  });
};
