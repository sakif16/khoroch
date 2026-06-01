import { Schema, model, models } from "mongoose";
import { unique } from "next/dist/build/utils";


const FamilySchema = new Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },

        code:{
            type:String,
            required:true,
            unique:true

        },
        createdBy:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    },
    {
        timestamps:true
    }
)

const Family = models.Family || model("Family", FamilySchema);

export default Family