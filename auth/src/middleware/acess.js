const acess = (roles) => {
  
  return (req, res, next) => {
    console.log(req.user.role);
    if (roles.includes(req.user.role)) {
        next()
    }else{
        res.status(401).send("Your are not allowed to access this route")
    }
  };
};

module.exports = acess;
