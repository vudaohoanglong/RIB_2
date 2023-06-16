import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser'
export async function requireLogin(req, res, next) {
	if (req.path == '/login') return next();
	if (req.cookies && req.cookies.token) {
		jwt.verify(req.cookies.token, "privateKEY", (err, decoded) => {
			if (err) {
				return res.status(403).json({ message: 'Invalid token' });
			  }
			  req.userID = decoded._id.toString();
			  req.permission = decoded.role;
			  console.log(req.userID,req.permission);
		}
		)
	  next();
	} else {
	  res.redirect('/login');
	}
  }
export async function checkPermission(req,res,next){
	if (req.permission=="Teacher") next();
	else res.status(401).json({message:"You are not allowed"});
}
export function generateToken(payload){
	try {
		return jwt.sign(payload, "privateKEY");
	} catch (error) {
		console.log(`Error in generate access token:  + ${error}`);
		return null;
	}
}