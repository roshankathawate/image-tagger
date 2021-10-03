import config from "config";
import { Request, Response } from "express";
import { get, omit } from "lodash";

import { registerUser, validatePassword } from "../service/user.service";
import log from "../logger";
import {
    createSession,
    createAccessToken,
    updateSession,
    findSessions,
} from "../service/session.service";
import { sign } from "../util/jwt";

export async function registerUserHandler(req: Request, res: Response) {
    try {
        const user = await registerUser(req.body);
        return res.send(omit(user.toJSON(), "password"));
    } catch (error) {
        let errorMessage = "Error";
        if (error instanceof Error) {
            errorMessage = `${errorMessage}: ${error.message}`;
            log.error(errorMessage);
        }

        return res.status(409).send(errorMessage);
    }
}

export async function getUserSessionsHandler(req: Request, res: Response) {
    const userId = get(req, "user._id");

    const sessions = await findSessions({ user: userId, valid: true });

    return res.send(sessions);
}

export async function createUserSessionHandler(req: Request, res: Response) {
    // validate the email and password
    const user = await validatePassword(req.body);

    if (!user) {
        return res.status(401).send("Invalid username or password");
    }

    // Create a session
    const session = await createSession(user._id, req.get("user-agent") || "");

    // create access token
    const accessToken = createAccessToken({
        user,
        session,
    });

    // create refresh token
    const refreshToken = sign(session, {
        expiresIn: config.get("refreshTokenTtl"), // 1 year
    });

    // send refresh & access token back
    return res.send({ accessToken, refreshToken });
}

export async function invalidateUserSessionHandler(
    req: Request,
    res: Response
) {
    const sessionId = get(req, "user.session");

    await updateSession({ _id: sessionId }, { valid: false });

    return res.sendStatus(200);
}




