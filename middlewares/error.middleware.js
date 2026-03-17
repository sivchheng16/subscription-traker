const errorMiddleware = (err, req, res, nex) => {
  try {
    let error = { ...err };
    error.message = err.message;
    console.error(err);

    //Mongoose bad ObjectID
    if (err.name === "CastError") {
      const message = "Resoure not found";
      error = new Error(message);
      error.statusCode = 404;
    }

    //Mongoose duplicate key
    if (err.code === 11000) {
      const message = "Dublicate field value entered";
      error = new Error(message);
      error.statusCode = 400;
    }

    // Mongoose validate error
    if (err.name === "ValidateionError") {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new Error(message.join(", "));
      error.statusCode = 400;
    }

    res
      .status(error.statusCode || 500)
      .json({ sucess: false, error: error.message || "Server Error" });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
