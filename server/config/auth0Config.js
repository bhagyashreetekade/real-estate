import {auth} from 'express-oauth2-jwt-bearer'

const jwtCheck =auth({
    audience:"http://localhost:8000",
    issuerBaseURL:"https://dev-52ewzcoek5jdsm0n.us.auth0.com",
    // Default method of token signing in
    tokenSigningAlg:"RS256" 
})

export default jwtCheck