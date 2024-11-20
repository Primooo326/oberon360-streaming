import { createHash } from "crypto";
import axios from "axios";
import https from "https";

export function md5(data) {
    return createHash("md5").update(data).digest("hex");
}

export const axiosInstance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
    }),
});