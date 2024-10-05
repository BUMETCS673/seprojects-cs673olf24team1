export interface User {
    buId: string;
    firstName: string;
    lastName: string;
    email: string;
    programType: string;
    programName: string;
    path_interest: string;
    courses_to_take: number;
    courses_taken: string[];
    chat_session_ids: string[];
    isNew: boolean;
}