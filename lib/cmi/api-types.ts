import { getResult, TraitScoresByTrait } from "./content";
import { Answers } from "./scoring";

// Extends data from questionnaire completion, used for backend storage
export type CMIResultData = {
    // 1. User submitted information
    email: string;
    subscribe: boolean;

    // 2. Calculated test result data
    answers: Answers;
    traitScores: TraitScoresByTrait;
    result: ReturnType<typeof getResult>;
}

// Final object structure stored in the backend (database)
export type StoredCMIResult = CMIResultData & {
    // 3. Unique Test Code
    code: string; // Randomly generated 6-digit alphanumeric code
    // 4. Creation timestamp
    createdAt: number;
}

// API Payload type for submission
export type CMISubmitPayload = CMIResultData & {
    locale: string; // Store user's locale
}

// API Success Response type
export type CMISubmitResponse = {
    code: string;
    message: string;
}