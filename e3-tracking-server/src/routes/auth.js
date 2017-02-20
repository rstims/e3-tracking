import express from 'express';
import bcrypt from 'bcrypt';
import cache from 'memory-cache';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config';
import { authenticateAccess } from '../middlewares/authenticate';


let router = express.Router();

function authUser(data, callback){
	User.query({
		where: { username: data },
		orWhere: { email: data }
	}).fetch().then(callback);
}

router.post('/', (req, res) => {
	const { identifier, password } = req.body;
	authUser(identifier, user => {
		if(user){
			
			if(bcrypt.compareSync(password, user.get('password_digest'))){
				const token = jwt.sign({
					id: user.get('id'),
					username: user.get('username')
				}, config.jwtsecret);
				res.json({ token });
			}else{
				res.status(401).json({ errors: { form: 'Invalid Credentials' } })
			}
		}else{
			res.status(401).json({ errors: { form: 'Invalid Credentials' } })
		}
	})
	
	
})

router.post('/access', authenticateAccess, (req, res) => {
	
	let accessToken = cache.get('user' + req.userid);

	if(accessToken){
		console.log('Cached token');
		res.json({ accessToken: accessToken })
	}else if(req.username){
		console.log('Get User: ', req.username);
		authUser(req.username, user => {
			if(user){
				
				accessToken = jwt.sign({
					userAgent: req.headers['user-agent'],
					time: new Date(),
					key: req.body.apiKey
				}, config.jwtsecret);

				cache.put('user' + req.userid, accessToken, 64800);
				
				res.status(201).json({ accessToken: accessToken });
			}else{
				res.status(401).json({ error: 'Invalid Credentials' })
			}
		})
	}else{
		res.status(401).json({ error: 'Invalid Credentials'  })
	}


})

export default router;