# SwampHacksX

## Inspiration
We drew inspiration from the Apple Watch's photoplethysmography (PPG) sensor. Which uses optical properties to measure heart rate. We want to make the world of biometrics more accessible/affordable through the use of common electronics. 


## What it does
Using an analog PPG sensor we can detect the user's heart rate through the optical properties of human blood vessels and how they reflect infrared light. An ESP32-S3 microcontroller takes in biometric data from the sensor and uses that to calculate heart rate, while displaying it to the onboard LCD screen before sending the data via Bluetooth to the mobile app. 

## How we built it
The entire system is comprised of three main components, the PPG sensor, ESP32 devboard, and the associated mobile app. 

The PPG sensor is comprised of an Infrared (IR) LED whose light penetrates through the users finger. the light is reflected off capillaries and blood vessels that shrink and expand as one's heart beats. This reflected IR light is then received by a photodiode to produce a fluctuating voltage. Using an operational amplifier circuit we are able to apply some gain to the very weak AC signal to get it within a range that the ESP32's ADC can actually read. We then step down the DC aspect of the signal to protect the ADC from being damaged while maintaining the readable AC. 

The ESP32 samples the ADC signal once every few milliseconds filling a vector of samples for 4 seconds. This vector is then scanned to find the maximum ADC reading. By comparing against other similar values we are able to determine the amount of peaks that have passed within 4 seconds and thus can find the BPM of the user's heart. This information is then relayed to the LCD and Bluetooth

The mobile app was developed using ReactNative and Expo. We used Expo's ability to run our app on our phones to test the majority of the application.

## Challenges we ran into
We ran into several challenges along the way that were some major setbacks

Regarding the sensor we had a photodiode break after just building the circuit for the first time, and several hours down the line an IR LED suddenly just gave out. Due to the exposed nature of the breadboard circuit and the instability of through-hole components on the board, the sensor itself is very sensitive to outside interference or any movement. This makes accurate reading difficult at times but they are still possible. 

The particular ESP devboard we chose was not particularly suited for this applicated ad did not have very readable documentation. This meant that just to access the ADC pin we had to do quite a bit more digging through data sheets than usual. The ESP-IDF framework gave us much more trouble than we thought and was not very intuitive to debug halting our progress and leading to a switch to the arduino framework through PlatformIO. The use of LVGL for graphics on the LCD was very difficult to get running due to several missing includes and header files that had to be found.

Additionally, the app faced trouble when it came to setting up the Bluetooth pairing. The only way to access the Bluetooth peripherals is by loading a compiled version of the app onto our devices. Due to the nature of our devices, we were not able to access the Bluetooth hardware since our phones would not trust a self-signed application. 

## Accomplishments that we're proud of
A working optical heartbeat sensor 
Successfully carried out at least the skeleton of most of the desired components of the project
 

## What we learned
LVGL Basics 
Simple Signal Processing
ReactNative


## What's next for Analog Heartbeat Sensor with Bluetooth App
We would like to create a housing for the sensor to combat some of the inaccuracies.
Integrate several other sensors such as blood pressure and oxygen level


