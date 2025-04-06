import speech_recognition as sr
import pyttsx3
import sys
from Adafruit_IO import MQTTClient

recognizer = sr.Recognizer()
AIO_USERNAME = ""
AIO_KEY = ""
client = MQTTClient(AIO_USERNAME , AIO_KEY)
def connected(client):
    print("Ket noi thanh cong ...")

def subscribe(client , userdata , mid , granted_qos):
    print("Subscribe thanh cong ...")

def disconnected(client):
    print("Ngat ket noi ...")
    sys.exit (1)

def message(client , feed_id , payload):
    print("Nhan du lieu: " + payload)

def send_data(feed_key, value):
    client.publish(feed_key, value)
    print(f"Send {value} to {feed_key}")

client = MQTTClient(AIO_USERNAME , AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

while True:
    try:
        with sr.Microphone() as mic:
            recognizer.adjust_for_ambient_noise(mic, duration = 0.2)
            audio = recognizer.listen(mic)
            text = recognizer.recognize_google(audio)
            text = text.lower()
            print(f"{text}")
            if "fan" in text and "on" in text:
                send_data("fan", "20")
            elif "fan" in text and ("off" in text):
                send_data("fan", "0")
            elif "fan" in text and ("one" in text or "1" in text):
                send_data("fan", "20")
            elif "fan" in text and ("two" in text or "2" in text):
                send_data("fan", "40")
            elif "fan" in text and ("three" in text or "3" in text):
                send_data("fan", "60")
            elif "fan" in text and ("four" in text or "4" in text):
                send_data("fan", "80")
            elif "fan" in text and ("five" in text or "5" in text):
                send_data("fan", "100")
            elif "light" in text and "on" in text:
                send_data("lightbulb", "On")
            elif "light" in text and "off" in text:
                send_data("lightbulb", "Off")


    except sr.UnknownValueError:
        recognizer = sr.Recognizer()
        continue


