import express from 'express';
import { authenticateAccessToken, authenticate } from '../middlewares/authenticate';
import View from '../models/view';
let router = express.Router();

router.post('/', authenticateAccessToken, (req, res) => {
	const { route } = req.body;
	const user_id = req.userid;

	View.forge({
		user_id, route
	}, { hasTimestamps: true }).save()
	.then(user => res.json({ success: true }))
	.catch(err => res.status(500).json({ error: err }))

});

router.get('/', authenticate, (req, res) => {
	const user_id = req.userid;

	View.query({}).fetchAll().then(views => {
		if(views){
			res.json({ views: views });
		}
	})
	.catch(err => res.status(500).json({ error: err }));

});

export default router;