/* ✏️ BUTTONS — open this file with Notepad (right-click, Open with). Never delete the ` mark at the very start and very end of the text. */
window.BUTTON_TEXT = `
# ✏️ BUTTONS
#
# Change how each button looks by giving it your own pictures or animations.
# Right now every line is empty, so every button looks exactly as it does today.
#
# HOW IT WORKS (using CAM 1 as the example)
#   1. Put your pictures in the content/images/ folder.
#   2. Type their file names after the colon:
#          CAM 1 button on: blue.png
#          CAM 1 button off: dark-blue.png
#      "on" is the picture shown while the button is switched on, "off" while it is switched off.
#      Menu buttons and camera buttons stay on until you pick another one. The audio button is on when the sound is on.
#      Buttons that are never "left on" (the start-up screen buttons and the link buttons) count as "on" only while they are pressed down, and "off" when let go.
#   3. The picture is stretched to fill the whole button, so make it the same shape as the button.
#
# ANIMATIONS
#   Put short animated gif, webp or png files in the content/animations/ folder and type the file name on one of these lines:
#          CAM 1 button loop animation: pulse.gif            plays again and again while the button is on (it takes the place of the "on" picture)
#          CAM 1 button on animation: switch-on.gif | 0.8    plays once, from the start, at the moment the button switches on
#          CAM 1 button off animation: switch-off.gif | 0.8  plays once, from the start, at the moment the button switches off
#   For the two play-once lines, type a | and how long the animation lasts in seconds (if you leave it out, 1 second is used).
#   When that time is up, the button settles on its "on" or "off" picture. Tip: make the last frame of the animation match that picture.
#   If a button has both an "on animation" and a "loop animation", the play-once one plays first and then the loop takes over.
#
# WORDS AND SIZE (optional)
#   words:  type  hide  to hide the words on the button (useful when your picture already has them). Empty keeps the words.
#   size:   type the width and height in pixels, like   120 x 48   Empty keeps the current size.
#
# If you only fill in one of "on" and "off", the other one keeps the current look.
# Lines starting with a # are notes and are ignored.

# ================= MENU BUTTONS =================
# The first set is used for every menu button that does not have its own set below (including pages you add).
# ----- ALL MENU BUTTONS -----
Menu button on:
Menu button off:
Menu button loop animation:
Menu button on animation:
Menu button off animation:
Menu button words:
Menu button size:

# ----- MANIFEST BUTTON -----
Menu button for manifest on:
Menu button for manifest off:
Menu button for manifest loop animation:
Menu button for manifest on animation:
Menu button for manifest off animation:
Menu button for manifest words:
Menu button for manifest size:

# ----- CAPTAINS LOG BUTTON -----
Menu button for captains-log on:
Menu button for captains-log off:
Menu button for captains-log loop animation:
Menu button for captains-log on animation:
Menu button for captains-log off animation:
Menu button for captains-log words:
Menu button for captains-log size:

# ----- COMMS BUTTON -----
Menu button for comms on:
Menu button for comms off:
Menu button for comms loop animation:
Menu button for comms on animation:
Menu button for comms off animation:
Menu button for comms words:
Menu button for comms size:

# To give a page you add its own button, copy one of the sets above and change the page name (the word after the | in content/navigation.js), for example  Menu button for about-us on:

# ================= CAMERA BUTTONS =================
# ----- CAM 1 BUTTON -----
CAM 1 button on:
CAM 1 button off:
CAM 1 button loop animation:
CAM 1 button on animation:
CAM 1 button off animation:
CAM 1 button words:
CAM 1 button size:

# ----- CAM 2 BUTTON -----
CAM 2 button on:
CAM 2 button off:
CAM 2 button loop animation:
CAM 2 button on animation:
CAM 2 button off animation:
CAM 2 button words:
CAM 2 button size:

# ----- CAM 3 BUTTON -----
CAM 3 button on:
CAM 3 button off:
CAM 3 button loop animation:
CAM 3 button on animation:
CAM 3 button off animation:
CAM 3 button words:
CAM 3 button size:

# ================= AUDIO BUTTON (top bar) =================
# ----- AUDIO BUTTON -----
# on = sound is switched on, off = sound is switched off
Audio button on:
Audio button off:
Audio button loop animation:
Audio button on animation:
Audio button off animation:
Audio button words:
Audio button size:

# ================= SPACESHIP CONTROLS SCREEN =================
# ----- RED ALERT BUTTON -----
# on = while the alert is running (5 seconds), off = the rest of the time
Red alert button on:
Red alert button off:
Red alert button loop animation:
Red alert button on animation:
Red alert button off animation:
Red alert button words:
Red alert button size:
# ----- SPEED SWITCH -----
# on = while the switch is up (5 seconds), off = the rest of the time. A picture replaces the whole switch.
Speed switch on:
Speed switch off:
Speed switch loop animation:
Speed switch on animation:
Speed switch off animation:
Speed switch words:
Speed switch size:
# ================= START-UP SCREEN BUTTONS =================
# These count as "on" only while being pressed down.
# ----- START-UP SOUND BUTTON -----
Start-up sound button on:
Start-up sound button off:
Start-up sound button loop animation:
Start-up sound button on animation:
Start-up sound button off animation:
Start-up sound button words:
Start-up sound button size:

# ----- START-UP SILENT BUTTON -----
Start-up silent button on:
Start-up silent button off:
Start-up silent button loop animation:
Start-up silent button on animation:
Start-up silent button off animation:
Start-up silent button words:
Start-up silent button size:

# ----- SKIP BUTTON -----
Skip button on:
Skip button off:
Skip button loop animation:
Skip button on animation:
Skip button off animation:
Skip button words:
Skip button size:

# ================= LINK BUTTONS =================
# The buttons inside the comms screen and inside your own pages. They count as "on" only while being pressed down.
# ----- LINK BUTTONS -----
Link button on:
Link button off:
Link button loop animation:
Link button on animation:
Link button off animation:
Link button words:
Link button size:
`;
