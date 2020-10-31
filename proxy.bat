adb -s emulator-5554 reverse tcp:8081 tcp:8081
adb -s emulator-5554 reverse tcp:3000 tcp:3000

REM if you're using a real device change its ID here
adb -s 9A251FFBA007TM reverse tcp:8081 tcp:8081
adb -s 9A251FFBA007TM reverse tcp:3000 tcp:3000
