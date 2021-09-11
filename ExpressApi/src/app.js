let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let userRouter = require('./routers/api');
let port = process.env.PORT;

require('./db/db.js');
let app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.use('/',userRouter);


// routes(app);

app.listen(port, function (){
    console.log(`app running on port ${port}`);
});
