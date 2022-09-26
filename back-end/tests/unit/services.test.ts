import { jest } from "@jest/globals"
import { recommendationRepository } from "../../src/repositories/recommendationRepository"
import { recommendationService } from "../../src/services/recommendationsService";

describe("Test insert function", ()=>{
    it("Test the insertion of a new recommendatiion", async ()=>{
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

});