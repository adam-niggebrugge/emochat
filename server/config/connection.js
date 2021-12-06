const mongoose = require("mongoose");
// const connectDB = async () => {
//    try {
 
   mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/emoChatServer2', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });

//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//     
//   } catch (error) {
//     console.log(`Error: ${error.message}`);
//     process.exit();
//   }
// };

module.exports = mongoose.connection;