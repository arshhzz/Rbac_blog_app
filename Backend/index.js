const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const adminRoutes = require('./routes/admin')
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes)
app.use('/api/blog', adminRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('db connected :)'))
    .catch((e) => console.log('mongo err:', e));

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('server running on the port ' + PORT)
});
