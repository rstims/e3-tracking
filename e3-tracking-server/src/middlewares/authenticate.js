import jwt from 'jsonwebtoken';
import config from '../config';
import cache from 'memory-cache';


export function authenticate(req, res, next){
	const authorizationHeader = req.headers['authorization'];
	let token;

	if(authorizationHeader){
		token = authorizationHeader.split(' ')[1]
	}
	if(token){
		jwt.verify(token, config.jwtsecret, (err, decoded) => {

			if(err){
				res.status(401).json({ error: 'Failed to authenticate' })
			} else {
				req.userid = decoded.id;
				next();
			}
		})
	}else{
		res.status(403).json({ 
			error: 'No token provided'
		});
	}
}

export function authenticateAccess(req, res, next){
	
	if(req.body.apiKey){
		jwt.verify(req.body.apiKey, config.jwtsecret, (err, decoded) => {

			if(err){
				res.status(401).json({ error: 'Failed to authenticate' })
			} else {
				req.username = decoded.username;
				req.userid = decoded.id;
				next();
			}
		})
	}else{
		res.status(403).json({ 
			error: 'No key provided'
		});
	}
}

export function authenticateAccessToken(req, res, next){
	let accessToken = req.headers['x-api-at'];
	
	if(accessToken){
		jwt.verify(accessToken, config.jwtsecret, (err, decoded) => {

			if(err){
				res.status(401).json({ error: 'Failed to authenticate' })
			} else {

				jwt.verify(decoded.key, config.jwtsecret, (err, keyDecoded) => {
					if(err){
						res.status(401).json({ error: 'Failed to authenticate access token' })
					} else {
						
						if(keyDecoded.id){
							req.userid = keyDecoded.id;
							next();
						}else{
							res.status(401).json({ error: 'Failed to authenticate api key' })
						}
						
					}
				});

			}
		})
	}else{
		res.status(403).json({ 
			error: 'No token provided'
		});
	}
}