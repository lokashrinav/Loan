from os import environ


def whichADB():
    if (environ.get("ANDROID_HOME")):
        return f"{environ.ANDROID_HOME}/platform-tools/adb"
    return 'adb'

print(whichADB())
