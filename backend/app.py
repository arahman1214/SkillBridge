# app.py
from flask import Flask, request, jsonify
import boto3
from utility import calculate_resume_score
#import spacy

app = Flask(__name__)

from flask_cors import CORS
CORS(app)


def get_skills(table_name):
    # Configure your AWS credentials and region
    aws_access_key_id = 'AKIAU6GDXBSTZLO6Q53Z'
    aws_secret_access_key = 'XpgGbmjNFMu77wRvj49Jqa4mlpiikfKCglJwZWq0'
    region_name = 'us-east-1'

    # Create DynamoDB resource
    dynamodb = boto3.resource('dynamodb', region_name=region_name,
                            aws_access_key_id=aws_access_key_id,
                            aws_secret_access_key=aws_secret_access_key)
    

    table = dynamodb.Table(table_name) 
    response = table.scan()
    items = response.get('Items', [])

    technical_skills = {}
    soft_skills = []
    for item in items:
        if table_name=="full_stack_python":
            skill = item.get('skill', '')    
        else:
            skill= item.get('Skill', '')
        
        resource = item.get('resource', '')
        skill_type = item.get('skill_type', '')
        if skill:
            if skill_type == 'Technical':
                technical_skills[skill] = resource
            elif skill_type == 'Soft':
                soft_skills.append(skill)

    return {'technical_skills': technical_skills, 'soft_skills': soft_skills}


@app.route('/analyze-resume', methods=['POST'])
def analyze_resume():
    job_title = request.json['jobTitle']
    resume_text = request.json['resumeText'].lower()  # Convert resume_text to lowercase
    output=get_skills(job_title)
    standard_technical_skills=output['technical_skills']
    standard_soft_skills=output['soft_skills']
    
    standard_technical_skills_size=len(standard_technical_skills)
    standard_soft_skills_size=len(standard_soft_skills)

    missing_technical_skills = {}
    missing_soft_skills = set()
    print(standard_technical_skills.keys())
    for item in standard_technical_skills.keys():

        if item.lower() not in resume_text:
            #Dict of key val
            missing_technical_skills[item]=standard_technical_skills[item]

    for item in standard_soft_skills:
        if item.lower() not in resume_text:
            missing_soft_skills.add(item)
    
    missing_technical_skills_size=len(missing_technical_skills)
    missing_soft_skills_size=len(missing_soft_skills)
    
    resume_score=calculate_resume_score(standard_technical_skills_size,standard_soft_skills_size,missing_technical_skills_size,missing_soft_skills_size)
    return jsonify({'technical_skills': (missing_technical_skills),'soft_skills':list(missing_soft_skills),'resume_score':resume_score})

if __name__ == '__main__':
    app.run(debug=True)
    
