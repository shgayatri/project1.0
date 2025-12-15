from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas import SubjectList
from utils import calculate_timetable

app = FastAPI()

# Allow CORS (adjust origins in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify: ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Smart Study Planner API"}

@app.post("/generate-timetable")
def generate_timetable(data: SubjectList):
    return {"timetable": calculate_timetable(data.subjects)}
