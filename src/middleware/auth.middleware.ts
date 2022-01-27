import * as jwt from "jsonwebtoken";
import * as config from "config";
import {
	Unauthorized_Code,
	Unauthorized,
	Bad_Request,
	Invalid_Token,
} from "../status_code/status";

function auth(req, res, next) {
	const token = req.header(config.token_header);
	if (!token) {
		return res.status(Unauthorized_Code).json({
			message: Unauthorized + ". No Token Provided",
		});
	}
	try {
		const payload = jwt.verify(token, config.get("jwtPrivateKey"));
		req.user = payload;
		next();
	} catch (ex) {
		ex.message;
		return res.status(Bad_Request).json({
			message: Invalid_Token,
		});
	}
}

export { auth as auth };
