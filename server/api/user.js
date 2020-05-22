const express = require("express");
const db = require("../model/index");
const Users = db.Users;
const Address = db.Address;

const router = express.Router();
router.get("/", async (req, res, next) => {
  const userData = await Users.findAll({}).then((data) => {
    return data;
  });
  res.json(userData);
});
router.delete("/delete/:id", async (req, res, next) => {
  try {
    await Users.destroy({
      where: { user_id: req.params.id },
    });
    res.json("success");
  } catch {
    res.json("fail");
  }
});
router.post("/insert", async (req, res, next) => {
  try {
    const createIdUser = await Users.create(
      {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      },
      { fields: ["user_id"] }
    ).then((res) => {
      return res.user_id;
    });
    const createIdAddress = await Address.create(
      {
        user_id: createIdUser,
        province_id: req.body.province,
        khet_id: req.body.khet,
        khwang_id: req.body.khwang,
      },
      { fields: ["address_id"] }
    ).then((res) => res.address_id);

    await Users.update(
      { address_id: createIdAddress },
      {
        where: { user_id: createIdUser },
      }
    );
    res.json("success");
  } catch {
    res.json("fail");
  }
});

router.patch("/update", async (req, res, next) => {
  try {
    await Users.update(
      {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      },
      { where: { user_id: req.body.user_id } }
    );
    await Address.update(
      {
        province_id: req.body.province,
        khet_id: req.body.khet,
        khwang_id: req.body.khwang,
      },
      { where: { address_id: req.body.address_id } }
    );
    res.json("success");
  } catch {
    res.json("fail");
  }
});
module.exports = router;
