//Avoid unnecessary server crashes in the event something goes wrong

const errorHandler = (error, req, res, next) => {
  console.error(
    "---> Unhandled request error.",
    error?.constructor?.name || "Error"
  );

  if (res.headersSent) {
    return next(new Error("Request failed"));
  }

  const errorStatus = error?.status || error?.statusCode;
  const status =
    Number.isInteger(errorStatus) && errorStatus >= 400 && errorStatus <= 599
      ? errorStatus
      : 500;

  return res.status(status).send({
    error: status >= 500 ? "Internal server error" : "Invalid request",
  });
};

export default errorHandler;
