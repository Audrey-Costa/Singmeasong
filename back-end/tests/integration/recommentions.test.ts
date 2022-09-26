import supertest from "supertest";
import { prisma } from "../../src/database";
import app from "../../src/app";

beforeEach(async ()=>{
    await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
});

describe("Test the route Post /recommendations/", ()=>{
    it("Return status code 201 if it's a new recomenndation created", async ()=>{
        const recommendation = {
            name: "Billie Eilish - ilomilo (Audio)",
            youtubeLink: "https://www.youtube.com/watch?v=-e7wiyNO2us&list=RDEMcce0hP5SVByOVCd8UWUHEA&index=3"
        };

        const result = await supertest(app).post("/recommendations/").send(recommendation);
        const createdRecommendation = await prisma.recommendation.findMany();

        expect(createdRecommendation).not.toBeNull();
        expect(result.status).toBe(201);
    });

    it("Return status code 409 if it's a repeated recommendation", async ()=>{
        const recommendation = {
            name: "Billie Eilish - ilomilo (Audio)",
            youtubeLink: "https://www.youtube.com/watch?v=-e7wiyNO2us&list=RDEMcce0hP5SVByOVCd8UWUHEA&index=3"
        };
        await supertest(app).post("/recommendations/").send(recommendation);
        const result = await supertest(app).post("/recommendations/").send(recommendation);

        expect(result.status).toBe(409);
    });

    it("Return status code 400 if the body is invalid", async ()=>{
        const recommendation = {
            name: "Billie Eilish - ilomilo (Audio)"
        };

        const result = await supertest(app).post("/recommendations/").send(recommendation);

        expect(result.status).toBe(422);
    });
});

describe("Test the route /recommendations/", ()=>{
    it("Return status code 200 and an response with the recommendations", async ()=>{
        const result = await supertest(app).get("/recommendations/");
        
        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Array);
    })
})

afterAll(async () => {
    await prisma.$disconnect();
});