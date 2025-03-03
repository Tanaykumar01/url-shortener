import express, { json } from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

const app = express();


app.use(json());
app.use(cors({
    origin: [process.env.CLIENT_URL , "https://pk5xbqm4-5173.inc1.devtunnels.ms/"],
    credentials: true
}));
app.use(helmet());

// import routes
import urlRoutes from "./routes/urlRoutes.js";

// use routes
app.use("/", urlRoutes);


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
});