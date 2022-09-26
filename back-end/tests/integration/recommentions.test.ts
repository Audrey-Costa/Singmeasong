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

describe("Test the route GET /recommendations/", ()=>{
    it("Return status code 200 and an response with the recommendations", async ()=>{
        const result = await supertest(app).get("/recommendations/");
        
        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Array);
    });
});

describe("Test the route GET /recommendations/random", ()=>{
    it("Return status code 200 and an response with the recommendations", async ()=>{
        const recommendation = {
            name: "Billie Eilish - ilomilo (Audio)",
            youtubeLink: "https://www.youtube.com/watch?v=-e7wiyNO2us&list=RDEMcce0hP5SVByOVCd8UWUHEA&index=3"
        };
        await prisma.recommendation.create({data: recommendation});

        const result = await supertest(app).get("/recommendations/random");

        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Object);
    });

    it("Return status code 404 when none recommendations is found", async ()=>{
        const result = await supertest(app).get("/recommendations/random");

        expect(result.status).toBe(404);
    });
});

describe("Test the route GET /recommendations/top/:amount", ()=>{
    it("Return status 200 and response with the given number of recommendations", async ()=>{
        const recommendations = [{
            name: "Eminem - Stan (Long Version) ft. Dido",
            youtubeLink: "https://www.youtube.com/watch?v=gOMhN-hfMtY",
        }, {
            name: "ilomilo (Audio)",
            youtubeLink: "https://www.youtube.com/watch?v=-e7wiyNO2us&list=RDEMcce0hP5SVByOVCd8UWUHEA&index=3",
        }, {
            name: "Billie Eilish - NDA", 
            youtubeLink: "https://www.youtube.com/watch?v=Dm9Zf1WQ_A&list=RDEMcce0hP5SVByOVCd8UWUHEA&index=3",
        }, { 
            name: "Billie Eilish - Bury a Friend", 
            youtubeLink: "https://www.youtube.com/watch?v=DmZf1WYQ_A&list=RDEMcce0hP5SVByOVCd8UWUHEA&index=3",
        } ,{
            name: "Billie Eilish - Your Power", 
            youtubeLink: "https://www.youtube.com/watch?v=Dm9ZfWYQ_A&list=RDEMcce0hP5SVByOVCd8UWUHEA&index=3",
        }, {
            name: "Billie Eilish - Everything I Wanted", 
            youtubeLink: "https://www.youtube.com/watch?v=Dm9Zf1WYQ_A&list=RDEMcce0hP5SVByOVd8UWUHEA&index=3",
        }, {
            name: "Billie Eilish - Oceans Eyes", 
            youtubeLink: "https://www.youtube.com/watch?v=Dm9Zf1WYQ_A&list=RDEMcce0h5SVByOVCd8UWUHEA&index=3",
        }];
        const amount = 4;
        
        for(let i = 0; i < recommendations.length; i++){
            await prisma.recommendation.create({data: recommendations[i]});
        };

        const result = await supertest(app).get(`/recommendations/top/${amount}`);
        
        expect(result.status).toBe(200);
        expect(result.body.length).toEqual(amount);
    });
});

describe("Test the route GET /recommendatons/:id", ()=>{
    it("Return status 200 and response with the respective recommendation given id by params", async ()=>{
        const recommendations = [{
            name: "Eminem - Stan (Long Version) ft. Dido",
            youtubeLink: "https://www.youtube.com/watch?v=gOMhN-hfMtY",
        }, {
            name: "ilomilo (Audio)",
            youtubeLink: "https://www.youtube.com/watch?v=-e7wiyNO2us&list=RDEMcce0hP5SVByOVCd8UWUHEA&index=3",
        }, {
            name: "Billie Eilish - NDA", 
            youtubeLink: "https://www.youtube.com/watch?v=Dm9Zf1WQ_A&list=RDEMcce0hP5SVByOVCd8UWUHEA&index=3",
        }, { 
            name: "Billie Eilish - Bury a Friend", 
            youtubeLink: "https://www.youtube.com/watch?v=DmZf1WYQ_A&list=RDEMcce0hP5SVByOVCd8UWUHEA&index=3",
        } ,{
            name: "Billie Eilish - Your Power", 
            youtubeLink: "https://www.youtube.com/watch?v=Dm9ZfWYQ_A&list=RDEMcce0hP5SVByOVCd8UWUHEA&index=3",
        }, {
            name: "Billie Eilish - Everything I Wanted", 
            youtubeLink: "https://www.youtube.com/watch?v=Dm9Zf1WYQ_A&list=RDEMcce0hP5SVByOVd8UWUHEA&index=3",
        }, {
            name: "Billie Eilish - Oceans Eyes", 
            youtubeLink: "https://www.youtube.com/watch?v=Dm9Zf1WYQ_A&list=RDEMcce0h5SVByOVCd8UWUHEA&index=3",
        }];

        for(let i = 0; i < recommendations.length; i++){
            await prisma.recommendation.create({data: recommendations[i]});
        };
        const recommendation = await prisma.recommendation.findFirst({where: {name: "Billie Eilish - Everything I Wanted"}});

        const result = await supertest(app).get(`/recommendations/${recommendation.id}`);

        expect(result.status).toBe(200);
        expect(result.body).toStrictEqual(recommendation);
    });

    it("Return status 404", async()=>{
        const id = 3;
        
        const result = await supertest(app).get(`/recommendations/${id}`);

        expect(result.status).toBe(404);
    })
});

describe("Test the route POST /recommendations/:id/upvote", ()=>{
    it("Update the recommendation score and response status code 200", async ()=>{
        const recommendation = {
            name: "Billie Eilish - ilomilo (Audio)",
            youtubeLink: "https://www.youtube.com/watch?v=-e7wiyNO2us&list=RDEMcce0hP5SVByOVCd8UWUHEA&index=3"
        };
        await prisma.recommendation.create({data: recommendation});
        const recomenndationBefore = await prisma.recommendation.findFirst({where: {name: recommendation.name}});

        const result = await supertest(app).post(`/recommendations/${recomenndationBefore.id}/upvote`).send();
        const recomenndationAfter = await prisma.recommendation.findFirst({where: {name: recommendation.name}});

        expect(result.status).toBe(200);
        expect(recomenndationAfter.score).toBe(recomenndationBefore.score + 1);

    });

    it("Return 404 when recommendation not found", async ()=>{
        const id = 1;

        const result = await supertest(app).post(`/recommendations/${id}/upvote`).send();

        expect(result.status).toBe(404);
    })
});

afterAll(async () => {
    await prisma.$disconnect();
});