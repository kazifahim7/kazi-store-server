import dotenv from 'dotenv'
import path from 'path'


dotenv.config({path:path.join(process.cwd(),".env")})

export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    dataBase_url: process.env.DATABASE_URL,
    salt_round: process.env.SALT_ROUND,
    jwt_secret: process.env.JWT_SECRET,
    store_id: process.env.STORE_ID,
    store_pass: process.env.STORE_PASS
}
