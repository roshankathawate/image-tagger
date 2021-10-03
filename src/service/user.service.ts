import { DocumentDefinition, FilterQuery } from "mongoose";
import { omit } from "lodash";

import log from "../logger";
import User, { UserDocument } from "../model/user.model";

export async function registerUser(input: DocumentDefinition<UserDocument>) {
    try {
        return await User.create(input);
    } catch (error) {
        let errorMessage = "Error creating the user";
        if (error instanceof Error) {
            errorMessage = `${errorMessage}: ${error.message}`;
            log.error(errorMessage);
        }
        throw new Error(errorMessage);
    }
}

export async function findUser(query: FilterQuery<UserDocument>) {
    return User.findOne(query).lean();
}

export async function validatePassword({
    email,
    password,
}: {
    email: UserDocument["email"];
    password: string;
}) {
    const user = await User.findOne({ email });

    if (!user) {
        return false;
    }

    const isValid = await user.validatePassword(password);

    if (!isValid) {
        return false;
    }

    return omit(user.toJSON(), "password");
}