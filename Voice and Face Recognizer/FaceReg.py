import cv2
import face_recognition
import os
import numpy as np
import time
import sys
from Adafruit_IO import MQTTClient

def encodeImg(img):
    encodeList = []
    for i in img:
        i = cv2.cvtColor(i, cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(i)[0]
        encodeList.append(encode)
    return encodeList

AIO_USERNAME = ""
AIO_KEY = ""
faceID = "On"
interval = 5
last = 0
safe_count = 5
isOpened = False
def connected(client):
    print("Ket noi thanh cong ...")
    client.subscribe("faceid")
    send_data("faceid", "On")

def subscribe(client , userdata , mid , granted_qos):
    print("Subscribe thanh cong ...")

def disconnected(client):
    print("Ngat ket noi ...")
    sys.exit (1)

def message(client , feed_id , payload):
    global faceID
    global interval
    global last
    global safe_count
    global isOpened
    if payload == "On":
        interval = 5
        last = 0
        safe_count = 5
        isOpened = False
    faceID = payload

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

path = "HostCheck"
images = []
classNames = []
myList = os.listdir(path)
for cl in myList:
    curImg = cv2.imread(f"{path}/{cl}")
    images.append(curImg)
    classNames.append(os.path.splitext(cl)[0])

encodeLst = encodeImg(images)
print("Encode SuccessFully") 
cap = cv2.VideoCapture(0)
while True:
    ret, frame = cap.read()
    framS = cv2.resize(frame,(0,0),None,fx=0.5,fy=0.5)
    framS = cv2.cvtColor(framS, cv2.COLOR_BGR2RGB)
    if safe_count == 0 and faceID == "On":
        faceID = "Off"
        send_data("faceid", "Off")
    currTime = time.time()
    if faceID == "On":
        faceCurr = face_recognition.face_locations(framS)
        if currTime - last >= interval:
            if isOpened:
                send_data("door", "Locked")
                faceID = "Off"
                send_data("faceid", "Off")
                continue
            encodeFrame = face_recognition.face_encodings(framS)
            for enFace, faceLoc in zip(encodeFrame, faceCurr):
                matches = face_recognition.compare_faces(encodeLst, enFace)
                faceDis = face_recognition.face_distance(encodeLst, enFace)
                print(faceDis)
                matchIndex = np.argmin(faceDis)
                if faceDis[matchIndex] < 0.3:
                    name = classNames[matchIndex].upper()
                    send_data("door", "Opened")
                    isOpened = True
                else:
                    name = "Unknown"
                    send_data("door", "Locked")
                    safe_count = safe_count - 1
                last = currTime
                y1, x2, y2, x1 = faceLoc
                y1, x2, y2, x1 = y1*2, x2*2, y2*2, x1*2
                cv2.rectangle(frame,(x1,y1), (x2,y2), (0,255,0), 1)
                cv2.putText(frame,name,(x2,y2),cv2.FONT_HERSHEY_COMPLEX,1,(255,0,255),2)
    cv2.imshow("Face ID", frame)
    if cv2.waitKey(1) == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()