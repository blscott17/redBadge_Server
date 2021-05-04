module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header(
    'access-control-allow-headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  return next();
};

// const CorsMiddleware = (req, res, next) => {
//   module.exports = (req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header(
//       'access-control-allow-headers',
//       'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     );

//     next();
//   };
// };

// module.exports = CorsMiddleware;
