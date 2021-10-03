import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    validatePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

UserSchema.pre("save", async function (next: mongoose.HookNextFunction) {
    let user = this as UserDocument;

    // If password has been modified then hash it
    if (!user.isModified("password")) return next();

    const salt = await bcrypt.genSalt(config.get("saltRound"));

    const hash = await bcrypt.hashSync(user.password, salt);

    user.password = hash;

    return next();
});

// validate password at login
UserSchema.methods.validatePassword = async function (
    userPassword: string
) {
    const user = this as UserDocument;

    return bcrypt.compare(userPassword, user.password).catch((e) => false);
};

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;