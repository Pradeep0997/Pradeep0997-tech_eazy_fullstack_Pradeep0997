const express = require('express');
const app = express();
const parcelRoutes = require('./parcel/parcelController');
const {sequelize} = require('./parcel/parcelModel');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/', parcelRoutes);

sequelize.sync().then(()=>{
    const PORT = 3000;
    app.listen(PORT, ()=> console.log(`Backend running on http://localhost:${PORT}`));
})