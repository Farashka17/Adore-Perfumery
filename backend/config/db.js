import mongoose from "mongoose";

const db = () => {
  mongoose
    .connect("mongodb+srv://farahnv:Favinya1911@final.a5fds.mongodb.net/")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
};
export default db;
