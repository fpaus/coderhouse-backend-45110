import { userModel } from '../../models/user.model.js';
export const authenticated = async (req, res, next) => {
  const email = req.session.user;
  if (email) {
    const user = await userModel.findOne({ email });
    req.user = user;
    next();
  } else {
    res.redirect('/login');
  }
};
