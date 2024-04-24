from flask_cors import CORS
from flask import Flask, jsonify, request
from flask_apscheduler import APScheduler
from datetime import datetime, timezone, timedelta

# system modules
from server.forecast import Forecast
from server.pipeline import Pipeline
from server.views import remove_subscription, save_subscription, send_notifications

app = Flask(__name__)

scheduler = APScheduler()
scheduler.init_app(app)
scheduler.start()

CORS(app)

######################## API ROUTES ############################

@app.route("/subscribe", methods=['POST'])
def subscribe():
    try: 
        subscription = request.json['device']
        save_subscription(subscription)
        return jsonify({ 'message': 'Saved subscription successfully.' }), 200
    except:
        return jsonify({ 'error': 'Failed to save subscription. Subscription already exist.' }), 400

@app.route("/unsubscribe", methods=['POST'])
def unsubscribe():
    try: 
        subscription = request.json['device']
        remove_subscription(subscription)
        return jsonify({ 'message': 'Saved subscription successfully.' }), 200
    except:
        return jsonify({ 'error': 'Failed to save subscription. Subscription already exist.' }), 400

@app.route("/notify", methods=['POST'])
def notify():
    try:
        subject = request.json['subject']
        message = request.json['message']
        send_notifications(subject, message)

        return jsonify({ 'message': 'Send notifications successfully.' }), 200
    except:
        return jsonify({ 'error': 'Failed to send notifications.' }), 400

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