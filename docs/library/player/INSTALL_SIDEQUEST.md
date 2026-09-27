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

## Canonical Windows installation sequence

1. Download the complete Project 2088 Build 098 ZIP.
2. Extract the entire archive to a normal folder. Do not run the installer from inside the ZIP preview.
3. Connect a developer-enabled Meta Quest headset to a Windows PC using a USB data cable.
4. Put on the headset, approve the USB debugging request and choose Always allow from this computer if offered.
5. Run `Install_Project_2088_SD-arm64.bat`.
6. Keep the installer running. Open Project 2088 from Unknown Sources inside the headset to establish the bridge, then wait for the PC installer to confirm completion.
7. Disconnect the headset only after the PC installer confirms success.
8. Launch Project 2088 again from Unknown Sources.

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
- Confirm that Project 2088 was launched from Unknown Sources while the installer was still running.

[Request installation help](https://github.com/theghost25790-lgtm/RealWorldEntertainment/issues/new?assignees=&labels=installation&projects=&template=installation-help.md&title=%5BINSTALL%5D+)

## Safety

Only run packages downloaded from official Project 2088 releases in this repository. Never share account credentials, developer credentials or signing keys when requesting support.
