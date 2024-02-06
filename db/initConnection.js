import mongoose from "mongoose";

const initialConnections = () => {
  mongoose
    .connect('mongodb+srv://naglaafawzy015:<password>@cluster0.ynfwmij.mongodb.net/')
    //mongodb+srv://naglaafawzy015:<password>@cluster0.ynfwmij.mongodb.net/ 
    //mongodb://localhost:27017/dbfinalE-commerce
   
    .then(console.log("database connected"))
    .catch((err) => console.log("error" + err));
};

export default initialConnections;
//-------------------------------------------------------------------------//