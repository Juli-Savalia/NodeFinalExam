const mongoose = require('mongoose')

const connectDB = async() =>{
    try {
        
        const conn = await mongoose.connect(
            'mongodb+srv://julicollege202:julicollege202@crud1.6224yxt.mongodb.net/Crud'
        )
        console.log(`MongoDB has been Connected Successfully..: ${conn.connection.host}`)
    } catch (error) {
        console.log(error);
        return false;
    }
}
module.exports = connectDB;