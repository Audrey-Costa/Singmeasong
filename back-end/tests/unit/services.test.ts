import { jest } from "@jest/globals";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { recommendationService } from "../../src/services/recommendationsService";

describe("Test insert function", ()=>{
    it("Test the insertion of a new recommendation", async ()=>{
        const recommendation = {
            name: "Billie Eilish - TV (Live from the Cloud Forest, Singapore)",
            youtubeLink: "https://www.youtube.com/watch?v=UQphbBmXI-E&list=RDEMcce0hP5SVByOVCd8UWUHEA&index=6"
        };
        
        jest.spyOn(recommendationRepository, "findByName").mockImplementationOnce((): any=>{});
        jest.spyOn(recommendationRepository, "create").mockImplementationOnce((): any=>{});
        await recommendationService.insert(recommendation);
        
        expect(recommendationRepository.findByName).toBeCalled();
        expect(recommendationRepository.create).toBeCalled();
    });

    it("Test the insertion of a repeated recommendation", async ()=>{
        const recommendation = {
            name: "Billie Eilish - my future",
            youtubeLink: "https://www.youtube.com/watch?v=Dm9Zf1WYQ_A&list=RDEMcce0hP5SVByOVCd8UWUHEA&index=3"
        };
        
        jest.spyOn(recommendationRepository, "findByName").mockImplementationOnce((): any=>{
            return {
                id:1, 
                name: "Billie Eilish - my future", 
                youtubeLink: "https://www.youtube.com/watch?v=Dm9Zf1WYQ_A&list=RDEMcce0hP5SVByOVCd8UWUHEA&index=3",
                score: 453
            }});
        jest.spyOn(recommendationRepository, "create").mockImplementationOnce((): any=>{});
        const promise = recommendationService.insert(recommendation);

        expect(promise).rejects.toEqual({"message": "Recommendations names must be unique", "type": "conflict"});
        expect(recommendationRepository.findByName).toBeCalled();
    });
});

describe("Test upvote function", ()=>{
    it("Test the upvote for valid id", async ()=>{
        const recommendation = {
            id: 1,
            name: "Billie Eilish - my future",
            youtubeLink: "https://www.youtube.com/watch?v=Dm9Zf1WYQ_A&list=RDEMcce0hP5SVByOVCd8UWUHEA&index=3",
            score: 210
        };

        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any=>{return recommendation});
        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any=>{});
        await recommendationService.upvote(recommendation.id);

        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();
    });

    it("Test the upvote for invalid id", async ()=>{
        const recommendation = {
            id: 3,
            name: "Billie Eilish - ilomilo (Audio)",
            youtubeLink: "https://www.youtube.com/watch?v=-e7wiyNO2us&list=RDEMcce0hP5SVByOVCd8UWUHEA&index=3",
            score: 210
        };

        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any=>{return null});
        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any=>{});
        const promise = recommendationService.upvote(recommendation.id);

        expect(promise).rejects.toEqual({"message": "", "type": "not_found"});
    });
});

describe("Test the function get", ()=>{
    it("Test the call of recommendationRepository function findAll", async ()=>{
        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((): any=>{});
        await recommendationService.get();

        expect(recommendationRepository.findAll).toBeCalled();
    });
});

describe("Test the function getById", ()=>{
    it("Test the call of recommendationRepository function find", async ()=>{
        const recommendation = {
            id: 3,
            name: "Billie Eilish - ilomilo (Audio)",
            youtubeLink: "https://www.youtube.com/watch?v=-e7wiyNO2us&list=RDEMcce0hP5SVByOVCd8UWUHEA&index=3",
            score: 210
        };

        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any=>{return recommendation});
        const promise = await recommendationService.getById(recommendation.id);

        expect(promise).toBe(recommendation);
    })
})

describe("Test the function getRandom", ()=>{
    it("Test the call of recommendationRepository function getByScore when don't have recommendations", async ()=>{
        jest.spyOn(recommendationRepository, "findAll").mockResolvedValue([]);
        const promise = recommendationService.getRandom();

        expect(promise).rejects.toEqual({"message": "", "type": "not_found"});
    });

    it("Test the call of recommendationRepository function getByscore when all the recommendations are bellow or above score 10", async ()=>{
        const recommendation = {
            id: 3,
            name: "Billie Eilish - ilomilo (Audio)",
            youtubeLink: "https://www.youtube.com/watch?v=-e7wiyNO2us&list=RDEMcce0hP5SVByOVCd8UWUHEA&index=3",
            score: 210
        };
        jest.spyOn(recommendationRepository, "findAll").mockResolvedValueOnce([]);
        jest.spyOn(recommendationRepository, "findAll").mockResolvedValueOnce([recommendation]);
        const promise = await recommendationService.getRandom();

        expect(promise).toBe(recommendation);
    });

    it("Test the call of recommendationRepository function getByscore return a score above 10 in 70% of time", async ()=>{
        const recommendation = {
            id: 3,
            name: "Billie Eilish - ilomilo (Audio)",
            youtubeLink: "https://www.youtube.com/watch?v=-e7wiyNO2us&list=RDEMcce0hP5SVByOVCd8UWUHEA&index=3",
            score: 210
        };
        
        jest.spyOn(Math, "random").mockReturnValue(0.4);
        jest.spyOn(recommendationRepository, "findAll").mockResolvedValue([recommendation]);
        const promise = await recommendationService.getRandom();

        expect(promise).toBe(recommendation);

    });

    it("Test the call of recommendationRepository function getByscore return a score bellow 10 in 30% of time", async ()=>{
        const recommendation = {
            id:1,
            name: "Eminem - Stan (Long Version) ft. Dido",
            youtubeLink: "https://www.youtube.com/watch?v=gOMhN-hfMtY",
            score: 3
        };

        jest.spyOn(Math, "random").mockReturnValueOnce(0.8);
        jest.spyOn(recommendationRepository, "findAll").mockResolvedValueOnce([recommendation]);
        const promise = await recommendationService.getRandom();

        expect(promise).toBe(recommendation);
    });
});