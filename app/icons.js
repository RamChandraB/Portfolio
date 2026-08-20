/* Minimal inline SVG icon set (24x24, stroke-based). */

const ICON_PATHS = {
	user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/>',
	briefcase: '<rect x="2" y="7" width="20" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M2 12h20"/>',
	layers: '<path d="M12 3 3 8l9 5 9-5-9-5Z"/><path d="m3 13 9 5 9-5"/>',
	chart: '<path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/>',
	fileText: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h4"/>',
	file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5"/>',
	mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m3 6 9 7 9-7"/>',
	terminal: '<rect x="2" y="3" width="20" height="18" rx="2"/><path d="m6 9 3 3-3 3"/><path d="M12 15h6"/>',
	folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
	folderOpen: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v1H3Z"/><path d="m3 10 2.2 7.6A2 2 0 0 0 7.1 19h9.8a2 2 0 0 0 1.9-1.4L21 10Z"/>',
	bot: '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 8V4"/><circle cx="9" cy="14" r="1.1"/><circle cx="15" cy="14" r="1.1"/><path d="M2 13v3"/><path d="M22 13v3"/>',
	settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3"/><path d="M12 19v3"/><path d="m4.2 4.2 2.1 2.1"/><path d="m17.7 17.7 2.1 2.1"/><path d="M2 12h3"/><path d="M19 12h3"/><path d="m4.2 19.8 2.1-2.1"/><path d="m17.7 6.3 2.1-2.1"/>',
	search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
	wifi: '<path d="M2 8.8a16 16 0 0 1 20 0"/><path d="M5 12.5a11 11 0 0 1 14 0"/><path d="M8.5 16a6 6 0 0 1 7 0"/><circle cx="12" cy="19.4" r="0.8"/>',
	battery: '<rect x="2" y="7" width="17" height="10" rx="2"/><path d="M22 11v2"/><path d="M5 10h9v4H5z" fill="currentColor" stroke="none"/>',
	volume: '<path d="M4 9h3l4-4v14l-4-4H4z"/><path d="M16 9.5a4 4 0 0 1 0 5"/>',
	bell: '<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 19a2 2 0 0 0 4 0"/>',
	power: '<path d="M12 3v8"/><path d="M6.5 6.5a8 8 0 1 0 11 0"/>',
	minus: '<path d="M5 12h14"/>',
	square: '<rect x="5" y="5" width="14" height="14" rx="2"/>',
	restore: '<rect x="7" y="7" width="12" height="12" rx="2"/><path d="M5 16V6a2 2 0 0 1 2-2h9"/>',
	x: '<path d="m6 6 12 12"/><path d="M18 6 6 18"/>',
	copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M15 9V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4"/>',
	check: '<path d="m5 13 4 4L19 7"/>',
	external: '<path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/>',
	download: '<path d="M12 3v12"/><path d="m7 11 5 5 5-5"/><path d="M4 21h16"/>',
	printer: '<path d="M7 8V3h10v5"/><rect x="3" y="8" width="18" height="8" rx="2"/><path d="M7 16h10v5H7z"/>',
	calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M3 10h18"/>',
	graduation: '<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11.5V17c0 1.7 2.7 3 6 3s6-1.3 6-3v-5.5"/>',
	cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M10 2v4"/><path d="M14 2v4"/><path d="M10 18v4"/><path d="M14 18v4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M18 10h4"/><path d="M18 14h4"/>',
	database: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
	cloud: '<path d="M7 18.5a4.2 4.2 0 0 1 .6-8.4 6 6 0 0 1 11.3 2A3.6 3.6 0 0 1 18 18.5Z"/>',
	code: '<path d="m9 8-5 4 5 4"/><path d="m15 8 5 4-5 4"/>',
	cube: '<path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="m3 7 9 5 9-5"/><path d="M12 22V12"/>',
	network: '<circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M12 7.5v3.8"/><path d="m11.2 11.6-4.6 5"/><path d="m12.8 11.6 4.6 5"/>',
	graph: '<circle cx="12" cy="12" r="3"/><circle cx="4" cy="6" r="2"/><circle cx="20" cy="6" r="2"/><circle cx="4" cy="18" r="2"/><circle cx="20" cy="18" r="2"/><path d="m5.7 7.2 3.9 3.1"/><path d="m18.3 7.2-3.9 3.1"/><path d="m5.7 16.8 3.9-3.1"/><path d="m18.3 16.8-3.9-3.1"/>',
	shield: '<path d="m12 3 8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z"/><path d="m9 12 2 2 4-4"/>',
	image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.4"/><path d="m4 18 5-5 4 4 3-3 4 4"/>',
	health: '<path d="M12 20s-7-4.3-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.7-7 9-7 9Z"/>',
	plug: '<path d="M9 3v6"/><path d="M15 3v6"/><path d="M7 9h10v3a5 5 0 0 1-10 0z"/><path d="M12 17v4"/>',
	send: '<path d="M22 2 11 13"/><path d="M22 2l-7 20-4-9-9-4z"/>',
	chevronRight: '<path d="m9 6 6 6-6 6"/>',
	arrowLeft: '<path d="M19 12H5"/><path d="m11 6-6 6 6 6"/>',
	home: '<path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 21v-7h6v7"/>',
	sparkles: '<path d="m12 3 1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="m18 16 .9 2.3L21 19l-2.1.8L18 22l-.9-2.2L15 19l2.1-.7z"/>',
	grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
	phone: '<path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2Z"/>',
	linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7"/><path d="M8 7v.01"/><path d="M12 17v-4a2 2 0 0 1 4 0v4"/>',
	monitor: '<rect x="2" y="4" width="20" height="12" rx="2"/><path d="M8 20h8"/><path d="M12 16v4"/>',
	refresh: '<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 4v5h-5"/>',
	info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8v.01"/>',
	target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>',
	clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
	lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
	apps: '<circle cx="7" cy="7" r="1.6"/><circle cx="12" cy="7" r="1.6"/><circle cx="17" cy="7" r="1.6"/><circle cx="7" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="17" cy="12" r="1.6"/><circle cx="7" cy="17" r="1.6"/><circle cx="12" cy="17" r="1.6"/><circle cx="17" cy="17" r="1.6"/>'
};

function icon(name, extraClass) {
	const path = ICON_PATHS[name] || ICON_PATHS.info;
	const cls = extraClass ? `icon ${extraClass}` : 'icon';
	return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${path}</svg>`;
}

window.icon = icon;
window.ICON_PATHS = ICON_PATHS;
