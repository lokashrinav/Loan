import { handleError, initAuth, User } from "@propelauth/cloudflare-worker";
import { Env } from "hono/types";


const { validateAuthHeaderAndGetUser,
    fetchUserMetadataByUserId,
    // ...
} = initAuth({
    authUrl: "https://28441449250.propelauthtest.com",
    apiKey: "2b9940454fc2eb28690cfb8a80c5bf115a3ea72f9c8990c68f944f02bc4e1961e3040c483f39d3915994826dc679e382",
    verifierKey: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArQIE1y9sROuhXTtzu0u8UajtYys4OKWA/NBnPCYy+Ut/h7e/OoTY/aPEUTZdH/ooS6ISSYCsVb5+lusnthU9q6Dv8FtXKOntqBcKis0eu0150feQfGvubpa58s+nEtve1H7C6kMS0L7yUc2JxO8k6//la3Oa9gNaF5SFo1PzuupYiSJc5fV9Kuag+TUXPy/X3NNrpZ4lE2xecQSGUIzz+UAMkaRGKPt/hQiSwArRRc4EIhAIGSTPtxJ2ETdO3L8eiS824wPmZeslqwHsCMO0hUHNC2B9xPBHz4M7EyHCynABWZQau+OH3YvmpwKMCBw1ZgSQ7hmWOknifqLFDj5AwIDAQAB",
    //issuer: "https://28441449250.propelauthtest.com",
});

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        try {
            const authHeader = request.headers.get("authorization")
            const user = await validateAuthHeaderAndGetUser(authHeader)
            const userMetadata = await fetchUserMetadataByUserId(user.userId)
            console.log(userMetadata)
            return Response.json(user)
        } catch (e) {
            const error = handleError(e)
            return new Response(error.message, { status: error.status })
        }
    },
};
/*
Verifier key
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArQIE1y9sROuhXTtzu0u8
UajtYys4OKWA/NBnPCYy+Ut/h7e/OoTY/aPEUTZdH/uooS6ISSYCsVb5+lusnthU
9q6Dv8FtXKOntqBcKis0eu0150feQfGvubpa58s+nEtve1H7C6kMS0L7yUc2JxO8
k6//la3Oa9gNaF5SFo1PzuupYiSJc5fV9Kuag+TUXPy/X3NNrpZ4lE2xecQSGUIz
z+UAMkaRGKPt/hQiSwArRRc4EIhAIGSTPtxJ2ETdO3L8eiS824wPmZeslqwHsCMO
0hUHNC2B9xPBHz4M7EyHCynABWZQau+OH3YvmpwKMCBw1ZgSQ7hmWOknifqLFDj5
AwIDAQAB*/