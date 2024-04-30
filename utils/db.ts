const mongoose = require('mongoose');

const connectToDB = async () => {
    const url = "mongodb://root:zjDnLGwajh1hzVSL4CrnYKwn@makalu.liara.cloud:34721/cms?authSource=admin"
    try {
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(url);
        }
        return mongoose.connection;
    } catch (error) {
        console.error('DB connection error:', error);
        throw error;
    }
}

export default connectToDB