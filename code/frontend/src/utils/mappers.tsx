import { User } from "../interfaces/User";

function extractCourseIds(courses: string[]): string[] {
    return courses.map(course => {
        // Match the digits following 'CS'
        const match = course.match(/CS(\d+)/);
        return match ? match[1] : '';
    }).filter(id => id !== ''); // Filter out any empty strings
}

// Mapping function from DisplayUser to ApiUser
export function mapUserToAPIBody(user: User): string {

    return JSON.stringify({
        "authId": user.authId,
        "email": user.email,
        "passwordHash": user.password,
        "fName": user.fName,
        "lName": user.lName,
        "programCode": user.programCode,
        "courseTaken": extractCourseIds(user.coursesTaken),
        "pathInterest": user.pathOfInterest,
        "courseToTake": user.coursesToTake,
    });
}
