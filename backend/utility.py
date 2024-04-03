import math

def calculate_resume_score(standard_technical_skills_size,standard_soft_skills_size,missing_technical_skills_size,missing_soft_skills_size):
    try:
        technical_skills_score = ((standard_technical_skills_size - missing_technical_skills_size) / standard_technical_skills_size) * 80
        soft_skills_score = ((standard_soft_skills_size - missing_soft_skills_size) / standard_soft_skills_size) * 10
        resume_score = (technical_skills_score + soft_skills_score)
        return round(resume_score,2)
    except Exception as E:
        return 0

