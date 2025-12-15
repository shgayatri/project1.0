from pydantic import BaseModel
from typing import List

class Subject(BaseModel):
    name: str
    examDate: str  # Format: YYYY-MM-DD
    hoursPerDay: float

class SubjectList(BaseModel):
    subjects: List[Subject]
