const verifyToken = (req,res,next)=>{
    
    let token;
try{
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    }catch(error){
        console.error(error);
      res.status(401).json({ message: 'Niste autorizovani' });
    }
    if (!token) {
    res.status(401).json({ message: 'Niste autorizovani, nedostaje token' });
  }
}
module.exports = {
    verifyToken
}