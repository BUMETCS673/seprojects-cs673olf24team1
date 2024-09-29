from typing import List
from pydantic import BaseModel

class StudentInfo(BaseModel):
    user_id: str
    student_name: str
    course_taken: List[int]
    path_interest: str
    course_to_take: int


class APIInfo(StudentInfo):
    message: str