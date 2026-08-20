# Ram Chandra Beniwal — Portfolio Desktop

A portfolio for an AI/ML Lead, presented as a small desktop environment: boot screen, lock
screen, desktop icons, a taskbar with a start menu and notification centre, and draggable,
resizable windows for each section.

Vanilla HTML, CSS, and JavaScript. No framework, no bundler, no dependencies to install.

## Run it

Any static file server works. From the project root:

```sh
python -m http.server 8000
```

Then open <http://localhost:8000>. Opening `index.html` straight from the filesystem also
works, though the resume PDF preview behaves better over HTTP.

## Layout

| Path | Purpose |
| --- | --- |
| `index.html` | Page shell: boot screen, lock screen, desktop, taskbar, panels |
| `app/data.js` | All portfolio content — the single file to edit for copy changes |
| `app/apps.js` | One render function per app, plus the app registry |
| `app/os.js` | Window manager, taskbar, start menu, notifications, boot sequence |
| `app/os.css` | Theme tokens and every style rule |
| `app/icons.js` | Inline SVG icon set |
| `assets/wallpapers/` | Six hand-drawn SVG wallpapers, no external images |
| `assets/` | Resume PDF and other static files |
| `legacy-novaos/` | The previous NovaOS-based version, kept for reference |

## Apps

About Me, Experience, Projects, Skills, Resume, Contact, Assistant, File Explorer, Terminal,
and Settings. The File Explorer and Terminal both read from `app/data.js`, so content added
there shows up everywhere without extra wiring.

## Editing content

Change text, roles, projects, or skills in `app/data.js` only. The desktop icons, start menu,
file tree, terminal commands, and assistant answers all derive from that file.

To add an app, append an entry to `window.APP_DEFS` in `app/apps.js` with an `id`, `name`,
`icon` (a key from `app/icons.js`), and a `render(body, api)` function.

## Interaction notes

- Double-click a desktop icon to open it; single click selects.
- Drag a title bar to move a window, double-click it to maximise, drag any edge to resize.
- `/` opens the start menu search, `Esc` closes open panels.
- Right-click the desktop for a context menu.
- The dock is centred by default and holds pinned apps; a small bar under an icon means the app
  is open. Settings can switch the dock to left alignment.
- Settings → Personalization picks one of the six bundled wallpapers or applies any image URL.
- Wallpaper, accent colour, dock alignment, and sound preferences persist in `localStorage`.

## Licence

See `license.md`.
