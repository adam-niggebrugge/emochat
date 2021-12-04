const mongoose = require("mongoose");
// const connectDB = async () => {
//    try {
      mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/emoChatServer', {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useFindAndModify: false,
      });

//       return conn;
//   } catch (error) {
//     console.log(`Error: ${error.message}`);
//     process.exit();
//   }
// };

module.exports = mongoose.connection;