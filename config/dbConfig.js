const mongoose = require("mongoose");

const mongoUrl = process.env.MONGODB_URL;

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(con => {
    console.log(`MongoDB database connected with HOST: ${con.connection.host}`);
});
