import mongoose from "mongoose";

import log from "../logger";

export async function dropCollections(collections:Array<String>){
    if(process.env.NODE_ENV != "test"){
        throw new Error("Attempting to clear non testing database.")
    }

    for(const collection in collections){
        if(mongoose.connection.collections.hasOwnProperty(collection)){
            const res = await mongoose.connection.collections[collection].drop();
            if(res){
                log.info(`Collection ${mongoose.connection.collections[collection].name} dropped`);
            } else{
                log.error(`Unable to drop collection ${mongoose.connection.collections[collection].name}`);
                throw new Error("Unable to drop collection.")
            }
        }
    }
}