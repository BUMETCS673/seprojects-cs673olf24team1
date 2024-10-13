# Created by Poom, Annotated by Tash

from typing import List, Literal
from pydantic import BaseModel, Field

class StudentInfo(BaseModel):
    """
    Represents information about a student.

    This model captures essential details about a student,
    including their user ID, name, courses taken, area of interest,
    and the number of courses they plan to take.

    Attributes:
        user_id (str): Unique identifier for the student.
        student_name (str): Full name of the student.
        course_taken (List[int]): A list of integers representing the IDs of courses the student has completed.
        path_interest (str): The student's area of academic interest (e.g., "AI/ML").
        course_to_take (int): The number of courses the student intends to take in the upcoming semester.
    """
    user_id: str
    student_name: str
    course_taken: List[int]
    path_interest: str
    course_to_take: int


class APIInfo(StudentInfo):
    """
    Extends the StudentInfo model to include an API response message.

    This model is used to send back responses from the API that
    include both student information and a message.

    Attributes:
        message (str): A message providing context about the API response.
    """
    message: str


class RouteQuery(BaseModel):
    """
    Represents the routing information for user queries.

    This model defines how to route user questions to appropriate tools,
    such as a course builder or general questions handler.

    Attributes:
        type (Literal["course_builder", "general_questions"]): 
            Specifies the type of routing based on the user's query. 
            It should be either "course_builder" for routing to the course builder tool
            or "general_questions" for routing to a general inquiries handler.
    """
    type: Literal["course_builder", "general_questions"] = Field(
        ...,
        description="Given a user question, choose to route it to the course builder or the general questions",
    )
