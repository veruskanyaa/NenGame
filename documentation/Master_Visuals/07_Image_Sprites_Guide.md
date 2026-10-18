# Image Sprites Guide — Putting Pictures on Monsters and the Nen User

The battle portraits automatically try to load a picture, and fall back to the
ASCII art if no image file exists. This lives in `UI.setPortrait` (src/ui/UI.js).

## The rule
```text
images/sprites/<name-in-lowercase-hyphens>.png
      │
      └── name of the character object, lowercased, spaces -> "-"
```
Examples: "Chimera Ant Soldier" -> `chimera-ant-soldier.png`,
"Elite Nen Guardian" -> `elite-nen-guardian.png`.

Current portraits:
| What | File to add |
|---|---|
| You (the player) | `<your hunter name>.png` in lowercase (e.g. `veruska.png`) |
| Chimera Ant Soldier | `chimera-ant-soldier.png` |
| Phantom Beast | `phantom-beast.png` |
| Elite Nen Guardian | `elite-nen-guardian.png` |
| Any custom enemy | `<name>.png` as above |

## Image specs
- PNG, transparent background
- Square: 64x64 or 96x96 px (any square size works; it's contained)
- CSS handles the crisp retro look: `.portrait-img { image-rendering: pixelated; }`

## Where to get/make art
- Draw: **piskelapp.com** (free pixel editor), or Aseprite (paid)
- Ready-made: **kenney.nl** / **opengameart.org** (pick CC0/free licenses and note the author in the README if required)

## How it renders (for the person presenting UI)
```text
UI.showBattle
  -> setPortrait(<div id="portraitPlayer">, slug(player.name), asciiFallback)
       1. innerHTML = ASCII art immediately (instant feedback)
       2. Image() loads images/sprites/<slug>.png
            onload  -> replace portrait with the <img class="portrait-img">
            onerror -> keep ASCII art (game never breaks)
```
Hit flash animation is applied to the portrait *frame* via `UI.flash`, so it works
for both images and ASCII.
