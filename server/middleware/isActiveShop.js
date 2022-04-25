const StoreModel = require("../../utils/models/StoreModel.js");

const isActiveShop = async (req, res, next) => {
  const { shop, host } = req.query;

  if (!shop) {
    next();
    return;
  }

  const isShopAvaialble = await StoreModel.findOne({ shop });

  if (isShopAvaialble === null || !isShopAvaialble.isActive) {
    if (isShopAvaialble === null) {
      await StoreModel.create({ shop, isActive: false });
    } else if (!isShopAvaialble.isActive) {
      await StoreModel.findOneAndUpdate({ shop }, { isActive: false });
    }
    res.redirect(`/auth?shop=${shop}&host=${host}`);
  } else {
    next();
  }
};

module.exports = isActiveShop;
