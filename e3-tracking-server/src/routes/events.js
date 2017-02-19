import express from 'express';
import authenticate from '../middlewares/authenticate';

let router = express.Router();

router.post('/', authenticate, (req, res) => {
	//const { identifier, password } = req.body;
	res.status(201).json({ success: true});
});

export default router;