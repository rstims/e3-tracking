import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import users from './routes/users';
import auth from './routes/auth';
import views from './routes/views';


let app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-api-at");
  next();
});
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/views', views);

app.listen(8080, () => console.log('Running on localhost:8080'));