#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <WebSocketsServer.h>
#include <ArduinoJson.h>

#define SEALEVELPRESSURE_HPA (1013.25)

Adafruit_BME280 bme;
WebSocketsServer webSocket(81); 
ESP8266WebServer http_rest_server(80);

float temperature, humidity, pressure, altitude;
const char *ssid = "WeatherStationAP";
const char *password = "1234567890";

void config_rest_server_routing() {
    http_rest_server.on("/measurement", HTTP_GET, get_measurementJSON);    
}

void get_measurementJSON() {
    StaticJsonBuffer<200> jsonBuffer;
    JsonObject& jsonObj = jsonBuffer.createObject();
    char JSONmessageBuffer[200];  
        jsonObj["Temperature"] = bme.readTemperature();
        jsonObj["Humadity"] = bme.readHumidity();
        jsonObj["Pressure"] = bme.readPressure() / 100.0F;
        jsonObj["Altitude"] = bme.readAltitude(SEALEVELPRESSURE_HPA);
        jsonObj.prettyPrintTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));
        http_rest_server.send(200, "application/json", JSONmessageBuffer);
    }

 void get_measurement_WebSockets() {
    StaticJsonBuffer<200> jsonBuffer;
    JsonObject& jsonObj = jsonBuffer.createObject();
    char JSONmessageBuffer[200];  
        jsonObj["Temperature"] = bme.readTemperature();
        jsonObj["Humadity"] = bme.readHumidity();
        jsonObj["Pressure"] = bme.readPressure() / 100.0F;
        jsonObj["Altitude"] = bme.readAltitude(SEALEVELPRESSURE_HPA);
        jsonObj["Coordinates"] ="20°05'E,50°05'N";
        jsonObj.prettyPrintTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));
        webSocket.broadcastTXT(JSONmessageBuffer);
    }
    
void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length){  
   Serial.println("Connecting to webSocket server was successful.");
  } 


void setup() {
    WiFi.mode(WIFI_STA);
    WiFi.disconnect();
    delay(1000);
    Serial.begin(9600);
    Serial.println();
    WiFi.softAP(ssid, password);
    IPAddress apip = WiFi.softAPIP();
    Serial.print("visit: \n");
    Serial.println(apip);
    webSocket.begin();                          // start the websocket server
    webSocket.onEvent(webSocketEvent);          // if there's an incomming websocket message, go to function 'webSocketEvent'
    Serial.println("WebSocket server started.");
    bme.begin(0x76);
    config_rest_server_routing();
    http_rest_server.begin();
    Serial.println("HTTP REST Server Started");
    
}

void loop() {
  http_rest_server.handleClient();
  webSocket.loop();
   get_measurement_WebSockets();
   delay(50);
 
}
