# kindle-clock

A single-page digital clock for old Kindle e-readers, viewed through the device's built-in experimental web browser — no jailbreak required.

Live page: https://allenbrooks2026.github.io/kindle-clock/

## What's here

- `index.html` / `index.js` — the clock itself: current time (`HH:mm`), date, weekday, and lunar date/zodiac year, all in English. Styled with Inter Bold and rotated 90° for a sideways-mounted display.
- `calendar.min.js` — third-party lunar calendar library ([jjonline/calendar.js](https://github.com/jjonline/calendar.js), MIT), used to compute the lunar date line.
- `clock-font.ttf` / `clock-font-OFL.txt` — the Inter Bold font file and its required SIL Open Font License text.

## Customizing

The page reads URL parameters:

- `?fs=10.5` — base font size (time/date/lunar-date all scale from this)
- `?r=90` — rotation in degrees (0, 90, 180, 270)

## Usage on a Kindle

Open the live page URL in the Kindle's experimental browser, then use a screensaver-disable trick (see repo history/discussion for the current method for your firmware) so the browser stays awake instead of sleeping.
