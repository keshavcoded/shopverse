import Product from "../models/product.model.js";

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push(productId);
    }

    await user.save();

    return res.status(200).json({
      success: true,
      cartItems: user.cartItems,
    });
  } catch (error) {
    console.log("Error in addtoCart controller : ", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const removeAllCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter((item) => item.id !== productId);
    }
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Cart items removed" });
  } catch (error) {
    console.log("Error in removeAllCart controller : ", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const user = req.user;
    const { quantity } = req.body;

    const existingItem = await user.cartItems.find(
      (item) => item.id === productId
    );

    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter((item) => item.id !== productId);
        await user.save();
        return res
          .status(200)
          .json({ success: true, cartItems: user.cartItems });
      } else {
        existingItem.quantity = quantity;
        await user.save();
        return res
          .status(200)
          .json({ success: true, cartItems: user.cartItems });
      }
    } else {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }
  } catch (error) {
    console.log("Error in updateQuantity controller : ", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getCart = async (req, res) => {
  try {
    const products = await Product.find({ _id: { $in: req.user.cartItems } });
    const cartItems = products.map((product) => {
      const item = req.user.cartItems.find(
        (cartItem) => cartItem.id === product.id
      );
      return { ...product.toJSON(), quantity: item.quantity };
    });
    return res.status(200).json({ sucess: true, cartItems: cartItems });
  } catch (error) {
    console.log("Error in getCart controller : ", error.message);
    return res
      .status(500)
      .json({ sucess: false, message: "Internal server error" });
  }
};
