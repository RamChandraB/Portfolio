/* ============================================================
   Desktop shell: boot, window manager, taskbar, panels.
   Apps register themselves through window.APP_DEFS (see apps.js).
   ============================================================ */

(function () {
	'use strict';

	const { profile } = window.PORTFOLIO;
	const $ = (sel, root) => (root || document).querySelector(sel);
	const apps = new Map();
	const windows = new Map();

	let zTop = 100;
	let winSeq = 0;
	let cascade = 0;
	let focusedId = null;

	const WALLPAPERS = [
		{ id: 'bloom', label: 'Windows 11 Bloom', url: 'assets/wallpapers/bloom.svg' },
		{ id: 'neon', label: 'Cyberpunk Neon', url: 'assets/wallpapers/neon.svg' },
		{ id: 'aurora', label: 'Aurora Borealis', url: 'assets/wallpapers/aurora.svg' },
		{ id: 'obsidian', label: 'Deep Obsidian', url: 'assets/wallpapers/obsidian.svg' },
		{ id: 'waves', label: 'Retro Mountain Waves', url: 'assets/wallpapers/waves.svg' },
		{ id: 'sunset', label: 'Calm Horizon Sunset', url: 'assets/wallpapers/sunset.svg' }
	];

	const state = {
		accent: localStorage.getItem('os.accent') || 'sky',
		wallpaper: localStorage.getItem('os.wallpaper') || 'bloom',
		customWallpaper: localStorage.getItem('os.wallpaper.custom') || '',
		taskbar: localStorage.getItem('os.taskbar') || 'center',
		sound: localStorage.getItem('os.sound') !== 'off',
		notifications: []
	};

	const ACCENTS = {
		sky: { accent: '#00a5ef', soft: '#00bcfe', text: '#7dd8ff', gradient: 'linear-gradient(135deg,#00a5ef,#4f39f6)' },
		emerald: { accent: '#00bb7f', soft: '#46d9a4', text: '#7ceec0', gradient: 'linear-gradient(135deg,#00bb7f,#00a5ef)' },
		violet: { accent: '#8e51ff', soft: '#a684ff', text: '#c9b2ff', gradient: 'linear-gradient(135deg,#8e51ff,#00a5ef)' },
		amber: { accent: '#f99c00', soft: '#ffb731', text: '#ffd489', gradient: 'linear-gradient(135deg,#f99c00,#ff2357)' }
	};

	/* ---------------------------------------------------------
	   Sound (tiny WebAudio blips, no assets needed)
	   --------------------------------------------------------- */
	let audioCtx = null;

	function tone(freq, at, dur, gain) {
		if (!state.sound) return;
		try {
			if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
			if (audioCtx.state === 'suspended') audioCtx.resume();
			const osc = audioCtx.createOscillator();
			const vol = audioCtx.createGain();
			osc.type = 'sine';
			osc.frequency.value = freq;
			vol.gain.setValueAtTime(0, audioCtx.currentTime + at);
			vol.gain.linearRampToValueAtTime(gain, audioCtx.currentTime + at + 0.02);
			vol.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + at + dur);
			osc.connect(vol).connect(audioCtx.destination);
			osc.start(audioCtx.currentTime + at);
			osc.stop(audioCtx.currentTime + at + dur + 0.05);
		} catch (err) {
			/* audio is a nicety, never a failure */
		}
	}

	const sfx = {
		startup: () => [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.11, 0.35, 0.05)),
		open: () => tone(880, 0, 0.09, 0.03),
		close: () => tone(420, 0, 0.09, 0.025),
		ping: () => {
			tone(1046.5, 0, 0.12, 0.035);
			tone(1318.5, 0.08, 0.14, 0.03);
		}
	};

	/* ---------------------------------------------------------
	   Theme
	   --------------------------------------------------------- */
	function wallpaperUrl() {
		if (state.wallpaper === 'custom' && state.customWallpaper) return state.customWallpaper;
		const found = WALLPAPERS.find((w) => w.id === state.wallpaper);
		return (found || WALLPAPERS[0]).url;
	}

	function applyTheme() {
		const a = ACCENTS[state.accent] || ACCENTS.sky;
		document.documentElement.style.setProperty('--accent', a.accent);
		document.documentElement.style.setProperty('--accent-soft', a.soft);
		document.documentElement.style.setProperty('--accent-text', a.text);
		/* set on the element, not a custom property: url() in a custom property
		   resolves against the stylesheet path rather than the document */
		const layer = $('#wallpaper');
		if (layer) layer.style.backgroundImage = `url("${wallpaperUrl()}")`;
		document.body.dataset.wallpaper = state.wallpaper;
		document.body.dataset.taskbar = state.taskbar;
		document.body.dataset.accent = state.accent;
	}

	function setAccent(name) {
		state.accent = name;
		localStorage.setItem('os.accent', name);
		applyTheme();
		renderDesktopIcons();
		renderTasks();
	}

	function setWallpaper(name) {
		state.wallpaper = name;
		localStorage.setItem('os.wallpaper', name);
		applyTheme();
	}

	function setCustomWallpaper(url) {
		state.customWallpaper = url;
		state.wallpaper = 'custom';
		localStorage.setItem('os.wallpaper.custom', url);
		localStorage.setItem('os.wallpaper', 'custom');
		applyTheme();
	}

	function setTaskbar(align) {
		state.taskbar = align;
		localStorage.setItem('os.taskbar', align);
		applyTheme();
	}

	function resetPreferences() {
		['os.accent', 'os.wallpaper', 'os.wallpaper.custom', 'os.taskbar', 'os.sound'].forEach((k) => localStorage.removeItem(k));
		state.accent = 'sky';
		state.wallpaper = 'bloom';
		state.customWallpaper = '';
		state.taskbar = 'center';
		state.sound = true;
		applyTheme();
		renderDesktopIcons();
		renderTasks();
	}

	function setSound(on) {
		state.sound = on;
		localStorage.setItem('os.sound', on ? 'on' : 'off');
	}

	/* ---------------------------------------------------------
	   Window manager
	   --------------------------------------------------------- */
	function defaultGeometry(def) {
		const host = $('#desktop').getBoundingClientRect();
		const w = Math.min(def.width || 860, Math.max(320, host.width - 40));
		const h = Math.min(def.height || 560, Math.max(240, host.height - 40));
		const offset = (cascade % 6) * 26;
		cascade++;
		const left = Math.max(12, Math.min(host.width - w - 12, (host.width - w) / 2 + offset - 60));
		const top = Math.max(12, Math.min(host.height - h - 12, (host.height - h) / 2 + offset - 40));
		return { left, top, w, h };
	}

	function focusWindow(id) {
		const win = windows.get(id);
		if (!win) return;
		focusedId = id;
		win.el.style.zIndex = ++zTop;
		win.el.classList.remove('minimized');
		windows.forEach((w) => w.el.classList.toggle('focused', w.id === id));
		renderTasks();
	}

	function openApp(appId, payload) {
		const def = apps.get(appId);
		if (!def) return null;

		if (def.singleton !== false) {
			for (const win of windows.values()) {
				if (win.appId === appId) {
					focusWindow(win.id);
					if (payload && typeof win.onPayload === 'function') win.onPayload(payload);
					return win;
				}
			}
		}

		const id = `win-${++winSeq}`;
		const geo = defaultGeometry(def);
		const gradient = def.gradient || (ACCENTS[state.accent] || ACCENTS.sky).gradient;

		const el = document.createElement('section');
		el.className = 'window';
		el.id = id;
		el.style.left = `${geo.left}px`;
		el.style.top = `${geo.top}px`;
		el.style.width = `${geo.w}px`;
		el.style.height = `${geo.h}px`;
		el.innerHTML = `
			<header class="titlebar">
				<span class="tb-glyph" style="background:${gradient}">${window.icon(def.icon)}</span>
				<span class="tb-title">${def.name}</span>
				${def.subtitle ? `<span class="tb-sub">— ${def.subtitle}</span>` : ''}
				<div class="tb-actions">
					<button class="tb-btn min" title="Minimise" aria-label="Minimise">${window.icon('minus')}</button>
					<button class="tb-btn max" title="Maximise" aria-label="Maximise">${window.icon('square')}</button>
					<button class="tb-btn close" title="Close" aria-label="Close">${window.icon('x')}</button>
				</div>
			</header>
			<div class="win-body"></div>
			<span class="resize-handle n"></span>
			<span class="resize-handle s"></span>
			<span class="resize-handle e"></span>
			<span class="resize-handle w"></span>
			<span class="resize-handle se"></span>`;

		$('#windows').appendChild(el);

		const win = { id, appId, def, el, body: $('.win-body', el), maximized: false, onPayload: null, onClose: null };
		windows.set(id, win);

		$('.tb-btn.min', el).addEventListener('click', () => minimizeWindow(id));
		$('.tb-btn.max', el).addEventListener('click', () => toggleMaximize(id));
		$('.tb-btn.close', el).addEventListener('click', () => closeWindow(id));
		el.addEventListener('pointerdown', () => focusWindow(id), true);

		const bar = $('.titlebar', el);
		bar.addEventListener('pointerdown', (e) => {
			if (e.target.closest('.tb-btn')) return;
			startDrag(win, e);
		});
		bar.addEventListener('dblclick', (e) => {
			if (e.target.closest('.tb-btn')) return;
			toggleMaximize(id);
		});

		el.querySelectorAll('.resize-handle').forEach((handle) => {
			handle.addEventListener('pointerdown', (e) => startResize(win, e, handle.classList[1]));
		});

		const api = {
			win,
			body: win.body,
			open: openApp,
			close: () => closeWindow(id),
			setSubtitle: (text) => {
				const sub = $('.tb-sub', el);
				if (sub) sub.textContent = text ? `— ${text}` : '';
			},
			toast,
			notify,
			copy,
			openExternal,
			settings: {
				get: () => ({
					accent: state.accent,
					wallpaper: state.wallpaper,
					customWallpaper: state.customWallpaper,
					taskbar: state.taskbar,
					sound: state.sound
				}),
				setAccent,
				setWallpaper,
				setCustomWallpaper,
				setTaskbar,
				setSound,
				reset: resetPreferences,
				accents: ACCENTS,
				wallpapers: WALLPAPERS
			}
		};

		def.render(win.body, api, payload);
		focusWindow(id);
		renderTasks();
		sfx.open();
		return win;
	}

	function closeWindow(id) {
		const win = windows.get(id);
		if (!win) return;
		if (typeof win.onClose === 'function') win.onClose();
		win.el.remove();
		windows.delete(id);
		if (focusedId === id) {
			focusedId = null;
			const last = Array.from(windows.values()).pop();
			if (last) focusWindow(last.id);
		}
		renderTasks();
		sfx.close();
	}

	function minimizeWindow(id) {
		const win = windows.get(id);
		if (!win) return;
		win.el.classList.add('minimized');
		if (focusedId === id) focusedId = null;
		renderTasks();
	}

	function toggleMaximize(id) {
		const win = windows.get(id);
		if (!win) return;
		win.maximized = !win.maximized;
		win.el.classList.toggle('maximized', win.maximized);
		const btn = $('.tb-btn.max', win.el);
		btn.innerHTML = window.icon(win.maximized ? 'restore' : 'square');
		btn.title = win.maximized ? 'Restore' : 'Maximise';
		focusWindow(id);
	}

	function startDrag(win, event) {
		if (win.maximized || window.matchMedia('(max-width: 640px)').matches) return;
		const rect = win.el.getBoundingClientRect();
		const host = $('#desktop').getBoundingClientRect();
		const dx = event.clientX - rect.left;
		const dy = event.clientY - rect.top;
		focusWindow(win.id);

		function move(e) {
			const left = Math.max(-rect.width + 90, Math.min(host.width - 60, e.clientX - dx - host.left));
			const top = Math.max(0, Math.min(host.height - 40, e.clientY - dy - host.top));
			win.el.style.left = `${left}px`;
			win.el.style.top = `${top}px`;
		}

		function up() {
			window.removeEventListener('pointermove', move);
			window.removeEventListener('pointerup', up);
			document.body.style.userSelect = '';
		}

		document.body.style.userSelect = 'none';
		window.addEventListener('pointermove', move);
		window.addEventListener('pointerup', up);
	}

	function startResize(win, event, dir) {
		if (win.maximized) return;
		event.stopPropagation();
		const rect = win.el.getBoundingClientRect();
		const host = $('#desktop').getBoundingClientRect();
		const startX = event.clientX;
		const startY = event.clientY;
		const start = { left: rect.left - host.left, top: rect.top - host.top, w: rect.width, h: rect.height };
		focusWindow(win.id);

		function move(e) {
			const dx = e.clientX - startX;
			const dy = e.clientY - startY;
			if (dir.includes('e')) win.el.style.width = `${Math.max(320, start.w + dx)}px`;
			if (dir.includes('s')) win.el.style.height = `${Math.max(220, start.h + dy)}px`;
			if (dir.includes('w')) {
				const w = Math.max(320, start.w - dx);
				win.el.style.width = `${w}px`;
				win.el.style.left = `${start.left + (start.w - w)}px`;
			}
			if (dir.includes('n')) {
				const h = Math.max(220, start.h - dy);
				win.el.style.height = `${h}px`;
				win.el.style.top = `${start.top + (start.h - h)}px`;
			}
		}

		function up() {
			window.removeEventListener('pointermove', move);
			window.removeEventListener('pointerup', up);
			document.body.style.userSelect = '';
		}

		document.body.style.userSelect = 'none';
		window.addEventListener('pointermove', move);
		window.addEventListener('pointerup', up);
	}

	/* ---------------------------------------------------------
	   Taskbar + desktop rendering
	   --------------------------------------------------------- */
	/* dock = pinned apps first, then anything else that is running */
	function renderTasks() {
		const host = $('#tb-tasks');
		host.innerHTML = '';

		const order = [];
		apps.forEach((def) => {
			if (def.pinned) order.push(def.id);
		});
		windows.forEach((win) => {
			if (!order.includes(win.appId)) order.push(win.appId);
		});

		order.forEach((appId) => {
			const def = apps.get(appId);
			if (!def) return;
			const win = Array.from(windows.values()).find((w) => w.appId === appId);
			const open = Boolean(win);
			const visible = open && !win.el.classList.contains('minimized');

			const btn = document.createElement('button');
			btn.className = 'task';
			btn.classList.toggle('running', open);
			btn.classList.toggle('active', visible && win.id === focusedId);
			btn.title = def.name;
			btn.innerHTML = `<span class="glyph" style="background:${def.gradient || ACCENTS[state.accent].gradient}">${window.icon(def.icon)}</span>`;
			btn.addEventListener('click', () => {
				if (!win) {
					openApp(appId);
					return;
				}
				if (visible && win.id === focusedId) minimizeWindow(win.id);
				else focusWindow(win.id);
			});
			host.appendChild(btn);
		});
	}

	function renderDesktopIcons() {
		const host = $('#desktop-icons');
		host.innerHTML = '';
		apps.forEach((def) => {
			if (!def.desktop) return;
			const btn = document.createElement('button');
			btn.className = 'desk-icon';
			btn.innerHTML = `
				<span class="glyph" style="background:${def.gradient || ACCENTS[state.accent].gradient}">${window.icon(def.icon)}</span>
				<span class="label">${def.name}</span>`;
			btn.addEventListener('click', () => {
				host.querySelectorAll('.desk-icon').forEach((n) => n.classList.remove('selected'));
				btn.classList.add('selected');
				/* touch devices have no double-click affordance */
				if (window.matchMedia('(hover: none)').matches) openApp(def.id);
			});
			btn.addEventListener('dblclick', () => openApp(def.id));
			btn.addEventListener('keydown', (e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					openApp(def.id);
				}
			});
			host.appendChild(btn);
		});
	}

	function renderStartApps(filter) {
		const host = $('#start-grid');
		const query = (filter || '').trim().toLowerCase();
		host.innerHTML = '';
		let shown = 0;
		apps.forEach((def) => {
			if (def.hidden) return;
			const haystack = `${def.name} ${def.subtitle || ''} ${(def.keywords || []).join(' ')}`.toLowerCase();
			if (query && !haystack.includes(query)) return;
			shown++;
			const btn = document.createElement('button');
			btn.className = 'start-app';
			btn.innerHTML = `
				<span class="glyph" style="background:${def.gradient || ACCENTS[state.accent].gradient}">${window.icon(def.icon)}</span>
				<span class="label">${def.name}</span>`;
			btn.addEventListener('click', () => {
				closePanels();
				openApp(def.id);
			});
			host.appendChild(btn);
		});
		$('#start-empty').hidden = shown > 0;
	}

	/* ---------------------------------------------------------
	   Panels: start menu, notifications, context menu
	   --------------------------------------------------------- */
	function closePanels() {
		$('#start-menu').hidden = true;
		$('#notif-panel').hidden = true;
		$('#ctx-menu').hidden = true;
		$('#tb-start').classList.remove('active');
	}

	function toggleStart(focusSearch) {
		const panel = $('#start-menu');
		const willOpen = panel.hidden;
		closePanels();
		panel.hidden = !willOpen;
		$('#tb-start').classList.toggle('active', willOpen);
		if (willOpen) {
			const input = $('#start-input');
			input.value = '';
			renderStartApps('');
			if (focusSearch !== false) setTimeout(() => input.focus(), 30);
		}
	}

	function toggleNotifications() {
		const panel = $('#notif-panel');
		const willOpen = panel.hidden;
		closePanels();
		panel.hidden = !willOpen;
	}

	function renderNotifications() {
		const host = $('#notif-list');
		const badge = $('#notif-dot');
		host.innerHTML = '';
		if (!state.notifications.length) {
			host.innerHTML = '<p class="notif-empty">No new notifications</p>';
		} else {
			state.notifications.forEach((n) => {
				const el = document.createElement('article');
				el.className = 'notif';
				el.innerHTML = `
					<div class="nt">${window.icon(n.icon || 'info')}${n.title}</div>
					<div class="nb">${n.body}</div>`;
				host.appendChild(el);
			});
		}
		if (badge) badge.style.display = state.notifications.length ? 'block' : 'none';
	}

	function notify(title, body, iconName) {
		state.notifications.unshift({ title, body, icon: iconName });
		state.notifications = state.notifications.slice(0, 12);
		renderNotifications();
		toast(title, body, iconName);
	}

	function toast(title, body, iconName) {
		const el = document.createElement('div');
		el.className = 'toast';
		el.innerHTML = `
			<div class="tt">${window.icon(iconName || 'info')}${title}</div>
			${body ? `<div class="tb">${body}</div>` : ''}`;
		$('#toasts').appendChild(el);
		sfx.ping();
		setTimeout(() => {
			el.classList.add('out');
			setTimeout(() => el.remove(), 300);
		}, 4200);
	}

	function openContextMenu(x, y) {
		const menu = $('#ctx-menu');
		menu.hidden = false;
		const rect = menu.getBoundingClientRect();
		menu.style.left = `${Math.min(x, window.innerWidth - rect.width - 8)}px`;
		menu.style.top = `${Math.min(y, window.innerHeight - rect.height - 8)}px`;
	}

	/* ---------------------------------------------------------
	   Small shared helpers exposed to apps
	   --------------------------------------------------------- */
	async function copy(text) {
		try {
			await navigator.clipboard.writeText(text);
			return true;
		} catch (err) {
			const ta = document.createElement('textarea');
			ta.value = text;
			ta.style.position = 'fixed';
			ta.style.opacity = '0';
			document.body.appendChild(ta);
			ta.select();
			let ok = false;
			try {
				ok = document.execCommand('copy');
			} catch (e) {
				ok = false;
			}
			ta.remove();
			return ok;
		}
	}

	function openExternal(url) {
		window.open(url, '_blank', 'noopener');
	}

	/* ---------------------------------------------------------
	   Clock
	   --------------------------------------------------------- */
	function tickClock() {
		const now = new Date();
		const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
		const date = now.toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' });
		$('#clock-time').textContent = time;
		$('#clock-date').textContent = date;
		const lockTime = $('#lock-time');
		if (lockTime) {
			lockTime.textContent = time;
			$('#lock-date').textContent = now.toLocaleDateString([], {
				weekday: 'long',
				day: 'numeric',
				month: 'long'
			});
		}
	}

	/* ---------------------------------------------------------
	   Boot sequence
	   --------------------------------------------------------- */
	const BOOT_STEPS = [
		'Initialising kernel…',
		'Mounting portfolio volume…',
		'Loading retrieval index…',
		'Starting agent services…',
		'Preparing desktop…'
	];

	function runBoot() {
		const fill = $('#boot-fill');
		const log = $('#boot-log');
		let i = 0;

		function step() {
			if (i >= BOOT_STEPS.length) {
				fill.style.width = '100%';
				setTimeout(showLock, 380);
				return;
			}
			log.textContent = BOOT_STEPS[i];
			fill.style.width = `${((i + 1) / BOOT_STEPS.length) * 100}%`;
			i++;
			setTimeout(step, 420);
		}

		step();
	}

	function hashApp() {
		const id = (location.hash || '').replace('#', '').toLowerCase();
		return apps.has(id) ? id : null;
	}

	function showLock() {
		const boot = $('#boot');
		boot.style.opacity = '0';
		setTimeout(() => {
			boot.hidden = true;
			$('#lock').hidden = false;
			/* a shared link like index.html#projects lands straight on that app */
			if (hashApp() || location.hash === '#desktop') enterDesktop(hashApp());
		}, 420);
	}

	function enterDesktop(appId) {
		const lock = $('#lock');
		if (lock.hidden) return;
		sfx.startup();
		lock.style.opacity = '0';
		setTimeout(() => {
			lock.hidden = true;
			openApp(appId || 'about');
			setTimeout(() => {
				notify(
					'Welcome aboard',
					`This desktop is ${profile.name}'s portfolio. Double-click an icon, or ask the Assistant anything.`,
					'sparkles'
				);
			}, 700);
		}, 420);
	}

	/* ---------------------------------------------------------
	   Wiring
	   --------------------------------------------------------- */
	function bindShell() {
		$('#tb-start').addEventListener('click', (e) => {
			e.stopPropagation();
			toggleStart();
		});

		$('#tb-search').addEventListener('click', (e) => {
			e.stopPropagation();
			if ($('#start-menu').hidden) toggleStart(true);
			else closePanels();
		});

		$('#tb-notif').addEventListener('click', (e) => {
			e.stopPropagation();
			toggleNotifications();
		});

		$('#tb-clock').addEventListener('click', (e) => {
			e.stopPropagation();
			toggleNotifications();
		});

		$('#start-input').addEventListener('input', (e) => renderStartApps(e.target.value));
		$('#start-input').addEventListener('keydown', (e) => {
			if (e.key !== 'Enter') return;
			const first = $('#start-grid .start-app');
			if (first) first.click();
		});

		$('#start-lock').addEventListener('click', () => {
			closePanels();
			$('#lock').hidden = false;
			$('#lock').style.opacity = '1';
		});

		$('#start-power').addEventListener('click', () => {
			closePanels();
			windows.forEach((win) => closeWindow(win.id));
			$('#boot-log').textContent = 'Shutting down…';
			$('#boot-fill').style.width = '0%';
			$('#boot').hidden = false;
			$('#boot').style.opacity = '1';
			setTimeout(() => {
				$('#boot-log').textContent = 'Restarting…';
				runBoot();
			}, 900);
		});

		$('#notif-clear').addEventListener('click', () => {
			state.notifications = [];
			renderNotifications();
		});

		$('#lock').addEventListener('click', () => enterDesktop());
		window.addEventListener('hashchange', () => {
			const id = hashApp();
			if (!id) return;
			if ($('#lock').hidden) openApp(id);
			else enterDesktop(id);
		});
		document.addEventListener('keydown', (e) => {
			if (!$('#lock').hidden && (e.key === 'Enter' || e.key === ' ')) {
				enterDesktop();
				return;
			}
			if (e.key === 'Escape') closePanels();
			if (e.key === '/' && e.target === document.body) {
				e.preventDefault();
				toggleStart(true);
			}
		});

		document.addEventListener('click', (e) => {
			if (e.target.closest('.panel') || e.target.closest('#taskbar')) return;
			closePanels();
		});

		$('#desktop').addEventListener('contextmenu', (e) => {
			if (e.target.closest('.window')) return;
			e.preventDefault();
			openContextMenu(e.clientX, e.clientY);
		});

		$('#ctx-menu').addEventListener('click', (e) => {
			const item = e.target.closest('.ctx-item');
			if (!item) return;
			closePanels();
			const action = item.dataset.action;
			if (action === 'open') openApp(item.dataset.app);
			if (action === 'wallpaper') openApp('settings');
			if (action === 'refresh') {
				renderDesktopIcons();
				toast('Desktop refreshed', 'Icons reloaded from the app registry.', 'refresh');
			}
		});

		$('#hero-resume').addEventListener('click', () => openApp('resume'));
		$('#hero-assistant').addEventListener('click', () => openApp('assistant'));

		window.addEventListener('resize', () => {
			windows.forEach((win) => {
				const host = $('#desktop').getBoundingClientRect();
				const rect = win.el.getBoundingClientRect();
				if (rect.left - host.left > host.width - 80) win.el.style.left = `${Math.max(12, host.width - rect.width - 12)}px`;
				if (rect.top - host.top > host.height - 60) win.el.style.top = `${Math.max(12, host.height - rect.height - 12)}px`;
			});
		});
	}

	function fillProfileChrome() {
		$('#lock-avatar').textContent = profile.initials;
		$('#lock-name').textContent = profile.name;
		$('#lock-role').textContent = `${profile.title} · ${profile.company}`;
		$('#boot-title').textContent = profile.name;
		$('#boot-sub').textContent = `${profile.title} — portfolio desktop`;
		$('#start-avatar').textContent = profile.initials;
		$('#start-name').textContent = profile.name;
		$('#start-role').textContent = profile.title;
		$('#hero-name').textContent = profile.name;
		$('#hero-tagline').textContent = profile.subtitle;
	}

	function init() {
		(window.APP_DEFS || []).forEach((def) => apps.set(def.id, def));
		applyTheme();
		fillProfileChrome();
		renderDesktopIcons();
		renderStartApps('');
		renderNotifications();
		renderTasks();
		bindShell();
		tickClock();
		setInterval(tickClock, 15000);
		runBoot();
	}

	window.OS = {
		open: openApp,
		close: closeWindow,
		toast,
		notify,
		copy,
		openExternal,
		setAccent,
		setWallpaper,
		setCustomWallpaper,
		setTaskbar,
		setSound,
		reset: resetPreferences,
		wallpapers: WALLPAPERS,
		get state() {
			return state;
		}
	};

	document.addEventListener('DOMContentLoaded', init);
})();
