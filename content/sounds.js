/* ✏️ SOUNDS — open this file with Notepad (right-click, Open with). Never delete the ` mark at the very start and very end of the text. */
window.SOUND_TEXT = `
# ✏️ SOUNDS
#
# Every sound on the site. Right now they are all made by the computer, so there are no sound files.
#
# HOW IT WORKS
#   1. Put your sound file in the content/sounds/ folder (mp3, wav or ogg all work).
#   2. Type its file name after the colon of the sound you want to change:
#          Menu button sound: beep.mp3
#   3. To make it quieter, add a | and a number from 0 to 100:
#          Menu button sound: beep.mp3 | 60
#   4. Leave a line empty to keep the built-in sound.
#   5. Type  off  to make that sound completely silent.
#
# Keep clips short (under a second) for button sounds. Lines starting with a # are notes and are ignored.

# ----- BUTTONS -----
# Pressing a menu button (MANIFEST, CAPTAINS LOG, COMMS and any pages you add)
Menu button sound:
# Pressing a link button (the buttons inside comms and your own pages)
Link button sound:
# Switching the sound on and switching it off with the audio button
Audio on sound:
Audio off sound:

# ----- CAMERA -----
# The static hiss when the camera picture changes
Camera change sound:
# The camera key being pushed down, and springing back up
Camera key down sound:
Camera key up sound:

# ----- SPACESHIP CONTROLS SCREEN -----
# The red alert siren (it is cut off after 5 seconds, when the alert ends)
Red alert sound:
# The speed switch flicking up, and dropping back down
Speed switch on sound:
Speed switch off sound:

# ----- START-UP SCREEN -----
# One long clip that plays during the whole start-up (the computer coming to life).
# If you use this, it replaces the built-in hum and rising whine, and it fades out as the doors open.
# Tip: if your clip already has typing sounds in it, set the next two lines to off.
Boot sound:
# A tiny click for every line of text that appears while starting up
Boot typing sound:
# A relay clunk every few lines of text
Boot relay sound:
# The whoosh as the doors open
Door sound:
`;
