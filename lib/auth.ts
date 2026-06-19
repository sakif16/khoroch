import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

export const client = new MongoClient(process.env.MONGODB_URI as string);
export const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }
),
    emailAndPassword: { 
    enabled: true, 
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24,      // refresh every day
  }, 

  user:{
    additionalFields:{
      familyId:{
        type:"string",
        required:false,
        defaultValue: null,

      },
    },
  },

});