from typing import List,  Literal
from pydantic import BaseModel, Field

class StudentInfo(BaseModel):
    user_id: str
    student_name: str
    course_taken: List[int]
    path_interest: str
    course_to_take: int


class APIInfo(StudentInfo):
    message: str
    
class RouteQuery(BaseModel):
    """Route the user query to the most relevant tool."""

    type: Literal["course_builder", "general_questions"] = Field(
        ...,
        description="Given a user question choose to route it to the course builder or the general questions",
    )