import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
    console.error("STREAM_API_KEY and STREAM_API_SECRET must be set");}

    const streamClient = StreamChat.getInstance(apiKey, apiSecret);

    export const upsertStreamUser = async (userData) => {
        try {
            await streamClient.upsertUsers([userData]);
        } catch (error) {
            console.error("Error upserting stream user:", error);
        }
    };

    export const generateStreamToken = async (userId) => {
        try {
            // ensure userId is a string
            const userIdStr = userId.toString();
            return streamClient.createToken(userIdStr);
          } catch (error) {
            console.error("Error generating Stream token:", error);
          }
    };
