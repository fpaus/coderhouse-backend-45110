const auth = (req, res, next) => {
  const userID = req.session.user;
  if (userID) {
    next();
  } else {
    res.status(401).send({ error: 'Usuario no logueado' });
  }
};

// const auth = (rol) => {
//   return async (req, res, next) => {
//     const admin = req.session.admin;
//     const userID = req.session.user;

//     const user = userManager.findOne({ _id: userID });
//     if (!user) {
//       res.status(401).send({ error: 'No autorizado' });
//     } else {
//       if (user.roles.includes(rol)) {
//         req.user = user;
//         next();
//       } else {
//         res.status(401).send({ error: 'No autorizado' });
//       }
//     }
//     console.log(admin);
//     if (admin) {
//       next();
//     } else {
//       res.status(401).send({ error: 'No autorizado' });
//     }
//   };
//  }
