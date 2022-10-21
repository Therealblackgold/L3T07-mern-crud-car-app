// To avoid try catching every controller function this function helps catch errors
const asyncHandler = (controllerfunction) => (req, res, next) =>
  Promise.resolve(controllerfunction(req, res, next)).catch(next);

module.exports = asyncHandler;
