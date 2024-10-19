import mongoose from "mongoose";    

export async function connect() { //this connect need to be in all plcaes in api to get connected to database
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.once("connected", () => {
            console.log("MongoDB database connection established successfully");
        });

        connection.on("error", (err) => {
            console.log("MongoDB database connection error. Please make sure MongoDB is running. " + err);
            process.exit();
        });

    } catch (error) {
        console.log("Could not connect to database");
        console.log(error);
    }
}