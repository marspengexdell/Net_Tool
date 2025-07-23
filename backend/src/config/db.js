/**
 * db.js
 * 负责连接到 MongoDB 数据库。
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// 加载 .env 文件中的环境变量
dotenv.config();

const connectDB = async () => {
  try {
    // 从环境变量中获取 MongoDB 连接字符串
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      console.error('MONGO_URI is not defined in your .env file.');
      process.exit(1); // 退出进程，因为没有数据库无法运行
    }

    // 连接到数据库
    const conn = await mongoose.connect(mongoURI, {
      // Mongoose 6+ 默认使用这些选项，所以它们不是必需的，但写出来更清晰
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // 连接失败时退出进程
  }
};

export default connectDB;
