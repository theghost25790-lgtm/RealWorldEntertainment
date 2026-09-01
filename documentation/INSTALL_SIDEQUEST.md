# Installing Project 2088 on a Quest Headset

Project 2088 builds currently contain an APK and a separate OBB data file. Installing only the APK is not a complete installation.

## What you need

- A compatible Meta Quest headset with Developer Mode enabled
- A Windows PC
- A suitable USB data cable
- The complete official Project 2088 release ZIP
- Sufficient free storage on the headset
- SideQuest or another working developer connection may be used to confirm that the headset is recognised

## Files in a release package

Keep these extracted files together:

- `Project_2088_SD-arm64.apk`
- `main.1.com.epicgames.Project_2088_SD.obb`
- `Install_Project_2088_SD-arm64.bat`
- `Uninstall_Project_2088_SD-arm64.bat`
- `win-x64/`

The OBB contains most of the game's data and is required.

## Recommended Windows installation

1. Download the complete ZIP attached to the required GitHub Release.
2. Extract the entire ZIP to a normal folder. Do not run the installer from inside the ZIP preview.
3. Connect the Quest headset to the PC.
4. Put on the headset and approve the USB debugging request. Choose to remember the computer when appropriate.
5. Confirm that the headset is recognised by SideQuest or the available Android development connection.
6. Double-click `Install_Project_2088_SD-arm64.bat`.
7. Keep the headset connected while the script installs the APK and transfers the OBB.
8. Wait until the window reports **Installation successful**.
9. Find Project 2088 in the appropriate Unknown Sources or development-app section of the headset library.

The Unreal-generated installer targets the package:

`com.epicgames.Project_2088_SD`

## Changing versions

Builds currently share the same Android package identifier. Installing another version will normally replace the installed Project 2088 application rather than creating a second application.

Uninstalling may remove local save data. Until a release specifically confirms save compatibility, treat every version change as capable of resetting or invalidating saves.

## If installation fails

- Confirm that Developer Mode is enabled.
- Approve the USB debugging prompt inside the headset.
- Check that only the intended headset is connected.
- Confirm that the ZIP was fully extracted.
- Do not move the BAT file away from the APK, OBB or `win-x64` folder.
- Check that the headset has enough storage for the APK, OBB and installation process.
- Read the error above the final message in the installer window.
- Use the installation-help issue template if the problem continues.

## Safety

Only run packages downloaded from official Project 2088 releases in this repository. Never share account credentials, developer credentials or signing keys when requesting support.
