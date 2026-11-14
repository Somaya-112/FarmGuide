# Farm Guide (React Native / Expo)

## Build an installable Android APK
1. Install Node.js (LTS) from nodejs.org
2. In this folder:
       npm install
       npx expo install --fix
3. Quick test on your phone: install "Expo Go" from Play Store, then run `npx expo start` and scan the QR code.
4. Build the APK (free Expo account needed):
       npm install -g eas-cli
       eas login
       eas build -p android --profile preview
   When finished, EAS gives a download link for the .apk. Open it on your phone and install
   (allow "Install unknown apps" when asked).
