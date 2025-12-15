from datetime import datetime

def calculate_timetable(subjects):
    today = datetime.today().date()
    timetable = []

    for subj in subjects:
        if not subj.name or not subj.examDate or not subj.hoursPerDay:
            continue

        try:
            exam_date = datetime.strptime(subj.examDate, "%Y-%m-%d").date()
        except ValueError:
            continue

        diff_days = (exam_date - today).days

        if diff_days <= 0:
            plan = "Exam Passed or Today!"
        else:
            hours = round(diff_days * subj.hoursPerDay, 2)
            plan = f"{subj.hoursPerDay} hrs/day for {diff_days} days"

        timetable.append({
            "subject": subj.name,
            "hours": plan
        })

    return timetable
