from pydantic import BaseModel
from typing import List

class StudentInfo(BaseModel):
    user_id: str
    student_name: str
    course_taken: List[int]
    path_interest: str
    course_to_take: int
    
class MessageInfo(BaseModel):
    user_id: str
    message: str