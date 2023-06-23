import StoreModel from "../../utils/models/StoreModel.js";

const isShopActive = async (req, res, next) => {
  const { shop, host } = req.query;

  if (!shop) {
    next();
    return;
  }

  const isShopAvailable = await StoreModel.findOne({ shop });

  if (isShopAvailable === null || !isShopAvailable.isActive) {
    if (isShopAvailable === null) {
      await StoreModel.create({ shop, isActive: false });
    } else if (!isShopAvailable.isActive) {
      await StoreModel.findOneAndUpdate({ shop }, { isActive: false });
    }
    res.redirect(`/auth?shop=${shop}&host=${host}`);
  } else {
    next();
  }
};

export default isShopActive;
