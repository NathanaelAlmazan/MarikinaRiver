from flask_cors import CORS
from flask import Flask, jsonify
from flask_apscheduler import APScheduler
from datetime import datetime, timezone, timedelta

# system modules
from server.forecast import Forecast
from server.pipeline import Pipeline

app = Flask(__name__)

scheduler = APScheduler()
scheduler.init_app(app)
scheduler.start()

CORS(app)

sample = Forecast()

######################## API ROUTES ############################

@app.route("/", methods=['GET'])
def greet():
    try:
        pipeline = Forecast()
        pipeline.update()
        
        return jsonify({ 'message': 'HELLO WORLD!!!' }), 200
    except Exception as e:
        return jsonify({ 'error': e }), 400

######################### ROUTINES #############################
@scheduler.task('interval', id='update_pipeline', seconds=3600, misfire_grace_time=900)
def update_pipeline():
    try:
        pipeline = Pipeline()
        pipeline.update()
        
        print('Updated pipeline on', datetime.now(timezone(timedelta(hours=8))).isoformat())
    except Exception as e:
        print('Failed to update pipeline because of exception', e)

@scheduler.task('interval', id='update_forecast', seconds=10800, misfire_grace_time=3600)
def update_forecast():
    try:
        pipeline = Forecast()
        pipeline.update()
        
        print('Updated forecast on', datetime.now(timezone(timedelta(hours=8))).isoformat())
    except Exception as e:
        print('Failed to update forecast because of exception', e)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=False)