import { createEnv } from "@t3-oss/env-nextjs"
import * as z from "zod"
export const env = createEnv({
    server: {
        FROTEND_URL: z.url(),
        BACKEND_URL: z.url(),
        APP_URL: z.url(),
        AUTH_URL: z.url()
    },
    client: {
        NEXT_PUBLIC_BACKEND_URL: z.url(),
        NEXT_PUBLIC_APP_URL: z.url()
    },
    runtimeEnv: {
        FROTEND_URL: process.env.FROTEND_URL,
        BACKEND_URL: process.env.BACKEND_URL,
        APP_URL: process.env.APP_URL,
        AUTH_URL: process.env.AUTH_URL,
        NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL
    }
})