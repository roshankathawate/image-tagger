import request from "supertest";
import { expect } from "chai";

import app from "../app";
import {dropCollections} from "./helper";
import User from "../model/user.model";
import Image from "../model/image.model";

describe("GET /api/v1/images", () => {
    beforeEach(async()=>{
        await Image.create({
            url: "http://abc.com/test/foo.jpeg",
            description: "foo",
            height: 4000,
            width: 3000,
            type: "Jpeg",
            tags:["6151b555a17adaa9bcebdff4", "6151b555a17adaa9bcebdff5"]
        })
    });

    afterEach(async() => {
        await dropCollections(["images"]);
    });

    it("should return all images", async() => {
        const response = await request(app).get("/api/v1/images");
        expect(response.statusCode).eq(200);
        expect(response.body.images).exist;
        expect(response.body.images[0].url).eq("http://abc.com/test/foo.jpeg");
    });
});

describe("GET /api/v1/images/:imageId", () => {
    let imageId:string;
    beforeEach(async()=>{
        const image = await Image.create({
            url: "http://abc.com/test/foo.jpeg",
            description: "foo",
            height: 4000,
            width: 3000,
            type: "Jpeg",
            tags:["6151b555a17adaa9bcebdff4", "6151b555a17adaa9bcebdff5"]
        });
        imageId = image._id
    });

    afterEach(async() => {
        await dropCollections(["images"]);
    });

    it("should return an image with a given ID", async() => {
        const response = await request(app).get(`/api/v1/images/${imageId}`);
        expect(response.statusCode).eq(200);
        expect(response.body._id).exist;
        expect(response.body.url).eq("http://abc.com/test/foo.jpeg");
    });
});

describe("GET /api/v1/images/:imageId/tags", () => {
    let imageId:string;
    beforeEach(async()=>{
        const image = await Image.create({
            url: "http://abc.com/test/foo.jpeg",
            description: "foo",
            height: 4000,
            width: 3000,
            type: "Jpeg",
            tags:["6151b555a17adaa9bcebdff4", "6151b555a17adaa9bcebdff5"]
        });
        imageId = image._id
    });

    afterEach(async() => {
        await dropCollections(["images"]);
    });

    it("should return all tags on an image", async() => {
        const response = await request(app).get(`/api/v1/images/${imageId}/tags`);
        expect(response.statusCode).eq(200);
        expect(response.body.length).eq(2);
    });
});