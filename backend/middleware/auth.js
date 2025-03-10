import jwt from "jsonwebtoken";

const auth= async (req, res, next)=>{
    const token= req.headers.authorization.split(" ")[1]

    try {
        let decodedData
        
        if (token ){
            decodedData=jwt.verify(token, process.env.MY_SECRET)
            req.userId=decodedData?.id
        }

        next()
        
    } catch (error) {
        console.log(error)
    }
}

export default auth

