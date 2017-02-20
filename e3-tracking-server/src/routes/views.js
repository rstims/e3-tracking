import express from 'express';
import { authenticateAccessToken } from '../middlewares/authenticate';
import View from '../models/view';
let router = express.Router();

router.post('/', authenticateAccessToken, (req, res) => {
	const { route } = req.body;
	const user_id = req.userid;

	View.forge({
		route
	}, { hasTimestamps: true }).save()
	.then(user => res.json({ success: true }))
	.catch(err => res.status(500).json({ error: err }))

});

export default router;