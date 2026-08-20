# Ram Chandra Beniwal — Portfolio

**AI/ML Lead · LLM & Agentic Systems Engineer · RAG & Multi-Agent Systems · Senior Unity3D/XR Developer**

A portfolio you can actually use. Instead of a scrolling one-pager, everything about me is an
app on a desktop that boots in your browser — no sign-in, no server, no cloud.

Built on [NovaOS](https://github.com/runnova/NovaOS), a fully offline vanilla-JavaScript web desktop.

- Email: [ramchandra.nitsri@gmail.com](mailto:ramchandra.nitsri@gmail.com)
- Phone: +91-8290637199
- LinkedIn: [linkedin.com/in/ramchandra95](https://www.linkedin.com/in/ramchandra95)
- Resume: [PDF](assets/RamChandra_Beniwal_Resume.pdf)

## Run it locally

Any static file server works — the whole thing is HTML, CSS and vanilla JS.

```sh
python -m http.server 8000
```

Then open <http://localhost:8000>.

> The desktop stores itself in IndexedDB on first visit. To start over, open **Nova Setup**
> (the power icon in the Nova menu) and choose *Reset NovaOS*, or use *Erase Everything* on the
> boot screen.

## The apps

| App | What's in it |
| --- | --- |
| **About Me** | Professional summary, quick stats, and the six areas I focus on |
| **Experience** | Timeline of all three roles with full detail, tech tags, and education |
| **Projects** | Key projects, led by the multimodal enterprise RAG platform |
| **Skills** | All nine skill domains with a live filter |
| **Resume** | The full resume, with a dark/paper toggle, print support, and PDF download |
| **Contact** | Email, phone and LinkedIn with copy-to-clipboard |
| **Shell** | A terminal — try `help`, `whoami`, `skills retrieval`, or `neofetch` |

The stock NovaOS apps (Files, Settings, Browser, Text, Calculator, Music, Gallery, Clock) are
still installed and working.

## How it was put together

Each portfolio app is a self-contained HTML file in [`appdata/`](appdata), following the NovaOS
app format: a `nova-icon` meta tag carrying an inline SVG, `capabilities` and `permissions` for
the OS registry, `aspect-ratio` for the default window size, and `nova-include` to pull in the
`nova.css` design tokens so every app inherits the system theme.

Changes made to the underlying OS for this fork:

- **Boots straight to the desktop.** Visitors land on a provisioned account instead of an
  account picker; the login screen is still there as a fallback if the account is ever
  password-protected.
- **Lays itself out on first boot.** Desktop shortcuts, the dock, and a copy of the resume PDF
  in `Downloads` are all seeded during initialisation.
- **UTF-8 fixes.** File content is written as UTF-8 but was being read back one byte per
  character, so dashes, bullets and accents came out mangled in every app.
- **Desktop and dock ordering.** Icons were rendered from racing async callbacks, so their order
  was nondeterministic; they are now built sequentially. Dock shortcut tooltips also read
  `undefined*` instead of the shortcut name.
- **Removed the upstream analytics tag** and the tracking-consent dialog that blocked first boot.

## License

NovaOS is licensed under the **GNU General Public License v3.0**, and this project, as a
derivative work, is distributed under the same license. See [license.md](license.md).

Original NovaOS project: <https://github.com/runnova/NovaOS>
