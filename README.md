# Chatore Sathi Cafe – Android App

This repo builds an Android APK from `www/index.html` using Apache Cordova,
via GitHub Actions.

**App name:** Chatore Sathi Cafe
**Package ID:** com.chatore.sathi

## How to use

1. Create a new GitHub repository.
2. Upload/push **all files in this zip** (keeping the folder structure) to
   the repository, root level (so `config.xml` and `package.json` sit at
   the repo root, `.github/workflows/build-apk.yml` stays inside
   `.github/workflows/`).
3. Push to the `main` (or `master`) branch — this automatically triggers
   the "Build Android APK" workflow. You can also trigger it manually from
   the **Actions** tab ("Run workflow" button).
4. Once the workflow finishes (green check), open the run, scroll to
   **Artifacts**, and download `chatore-sathi-cafe-apk` — it contains the
   debug `.apk` file you can install on any Android device.

## Making changes later

- Edit `www/index.html` to change app content — this is the file you
  uploaded.
- Edit `res/icon/android/*.png` to change the app icon (already generated
  from your logo at all required densities: ldpi, mdpi, hdpi, xhdpi,
  xxhdpi, xxxhdpi).
- Edit `config.xml` to change the app name, version, or package ID.
- Push your changes — the workflow rebuilds automatically.

## Notes

- This build produces a **debug APK** (unsigned, installable directly for
  testing). For a Play Store release build you need to add a signing
  keystore as a GitHub Secret and extend the workflow — ask if you want
  this set up.
- Minimum Android version supported: Android 5.1 (API 22).
