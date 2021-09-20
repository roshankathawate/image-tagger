import { Request, Response, NextFunction } from "express";
import {AnySchema} from "yup";

import log from "../logger";

const validateRequest = (schema: AnySchema) => async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params
        });

        return next();
    }catch (err) {
        let errorMessage = "Error validating a request";
        if (err instanceof Error){
            errorMessage = `${errorMessage}: ${err.message}`;
            log.error(errorMessage);
        }
        
        return res.status(400).send(errorMessage);
    }
};

export default validateRequest;