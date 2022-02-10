import * as jwt from "jsonwebtoken";
import * as IConfig from "config";
import {
	Unauthorized_Code,
	Unauthorized,
	Bad_Request,
	Invalid_Token,
} from "../status_code/status";

function auth(req, res, next) {
	// const token = req.header(IConfig.get("token"));
	const cookie_token = req.cookie(IConfig.get("token"));
	if (!cookie_token) {
		return res.status(Unauthorized_Code).json({
			message: Unauthorized + ". No Token Provided",
		});
	}
	try {
		const payload = jwt.verify(cookie_token, IConfig.get("jwtPrivateKey"));
		req.user = payload;
		console.log(cookie_token);
		next();
	} catch (ex) {
		ex.message;
		return res.status(Bad_Request).json({
			message: Invalid_Token,
		});
	}
}

export { auth as auth };
