import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const whitelisted_origins = process.env.WHITELISTED_ORIGINS
  ? process.env.WHITELISTED_ORIGINS.split(",")
  : [];

/*
 * cors setup
 */
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || whitelisted_origins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by cors"));
      }
    },
  })
);
/*
* handle the data comming from frontend
*/
app.use(express.json({ limit: "16kb" }));  // data can come on json format like using form
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // data can come through url
app.use(express.static("public")); // to store folders, images in public folder


// cookie-parser is a middleware that helps you read cookies from the incoming request and set cookies in the response.
app.use(cookieParser())
export { app };
