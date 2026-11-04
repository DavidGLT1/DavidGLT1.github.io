/* ==========================================================================
   SITE TEXT — the words around the site (top bar, headline, footer, start-up screen)
   ==========================================================================
   HOW THIS FILE WORKS
   - Every line is  Name of thing: the words you want
   - Change only the words AFTER the first colon. Never change the name before it.
   - Never delete the colon, and never delete the ` mark on the line below
     or on the very last line of this file.
   - Don't type the ` mark or the two characters ${ inside your text.
   ========================================================================== */
// ===== 🚫 DO NOT EDIT THIS LINE =====
var SITE_TEXT = String.raw`
# ===== ✏️ EDIT THE TEXT BELOW — safe to change =====

# Text shown on the browser tab
Browser tab title: Lunar Horizon Productions

# Company name in the top-left of the top bar
Company name: 

# Words next to the glowing light in the top bar
Status light text: Systems nominal

# Label on the sound button when sound is ON
Audio on label: Audio on

# Label on the sound button when sound is OFF
Audio off label: Audio off

# Small blue line above the main headline
Hero label: 

# The big main headline (only shown when "Hero image" below is left blank)
Hero headline:

# The logo picture shown in place of the big headline. Type the file name of a picture inside the content/images folder.
# Leave it blank (nothing after the colon) to show the headline words above instead.
Hero image: lunar-horizon-logo.png

# Description of the logo for people who use screen readers (it isn't shown on screen)
Hero image description: Lunar Horizon Productions

# The paragraph under the main headline
Hero paragraph: Lunar Horizon is an independant production company from Ireland that specialises in documentary and short films.

# Text at the top of the moon screen, next to the red dot (the camera number is added automatically)
Monitor top left: Live cam

# Second line at the top of the moon screen (shown on CAM 1 and CAM 2)
Monitor top right: Surface link

# Second line at the top of the moon screen when CAM 3 is showing the space station
Monitor station label: Space station 1000 m

# The three camera buttons under the moon screen
Cam button 1: CAM 1
Cam button 2: CAM 2
Cam button 3: CAM 3

# Small caption under the camera buttons
Monitor plate: LHP-2 // SURFACE OPTICS

# Intro paragraph on the COMMS page (the buttons come from content/comms.js)
Comms intro: Commissions, collaborations, crew enquiries and pitches are all welcome. Send a message and we’ll reply within two working days.

# Message under the COMMS buttons before anyone clicks
Comms idle message: Channel idle.

# Message under the COMMS buttons after someone clicks a button
Comms sent message: Channel open. Handing off to your mail client.

# Small text at the very bottom of the page
Footer text: Lunar Horizon Productions. Film titles and contact details are placeholders: swap in your own.

# START-UP SCREEN: small line above the big heading
Boot label: Lunar Horizon Productions

# START-UP SCREEN: the big heading
Boot heading: Engage systems

# START-UP SCREEN: the paragraph under the heading
Boot paragraph: Bring the console online. Sound effects are synthesized and can be muted at any time.

# START-UP SCREEN: the two buttons
Boot button sound: Engage with sound
Boot button silent: Engage silent

# START-UP SCREEN: title bar of the loading window while it boots
Boot window title: LHP-OS 4.1 // cold start

# START-UP SCREEN: the button that skips the boot sequence
Skip button: Skip

# START-UP SCREEN: the lines that appear one by one while booting.
# Each line starting with "Boot line:" appears in order. Add, remove or reword lines freely.
Boot line: LUNAR HORIZON OS 4.1 // COLD START
Boot line: POWER BUS ............ ONLINE
Boot line: CORE MEMORY .......... 64 TB OK
Boot line: REACTOR .............. 100%
Boot line: OPTICS ARRAY ......... CALIBRATED
Boot line: LENS ALIGNMENT ....... OK
Boot line: RENDER FARM .......... 4096 NODES
Boot line: STAR CHARTS .......... LOADED
Boot line: SURFACE CAM 02 ....... LOCKED
Boot line: CREW MANIFEST ........ VERIFIED
Boot line: ALL SYSTEMS NOMINAL
Boot line: WELCOME ABOARD, CAPTAIN.

# ===== 🚫 DO NOT EDIT BELOW THIS LINE =====
`;
