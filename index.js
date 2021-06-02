'use strict';
require('dotenv').config();
const server =require ('./src/server.js');
const mongoose=require('mongoose');



mongoose
  .connect(process.env.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    server.listen(process.env.PORT, () => console.log('server up'));
  })
  .catch(e => console.error('Could not start server', e.message));