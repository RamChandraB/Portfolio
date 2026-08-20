/* ============================================================
   App registry. Each app renders plain DOM into its window body.
   ============================================================ */

(function () {
	'use strict';

	const P = window.PORTFOLIO;
	const { profile, focusAreas, experience, projects, alsoBuilt, skills, education, assistant } = P;
	const icon = window.icon;

	const esc = (str) =>
		String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

	/* **bold** and newlines -> HTML */
	const md = (str) =>
		esc(str)
			.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
			.replace(/\n/g, '<br>');

	const tagList = (items, strong) =>
		items
			.map((t) => `<span class="tag${strong && strong.includes(t) ? ' accent' : ''}">${esc(t)}</span>`)
			.join('');

	const bullets = (items) => `<ul class="bullets">${items.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>`;

	/* ---------------------------------------------------------
	   About
	   --------------------------------------------------------- */
	function renderAbout(body, api) {
		body.innerHTML = `
			<div class="app">
				<div class="card about-hero">
					<div class="avatar">${esc(profile.initials)}</div>
					<div>
						<h2>${esc(profile.name)}</h2>
						<p class="role">${esc(profile.subtitle)}</p>
						<div class="tags">
							<span class="tag">${icon('briefcase')}&nbsp;${esc(profile.title)} @ ${esc(profile.company.replace(' Private Limited', ''))}</span>
							<span class="tag">${icon('graduation')}&nbsp;B.Tech, NIT Srinagar</span>
							<span class="tag good">${icon('clock')}&nbsp;4+ years experience</span>
						</div>
					</div>
				</div>

				<section>
					<div class="eyebrow">${icon('user')}Professional summary</div>
					<p class="muted" style="margin-top:0.5rem">${esc(profile.summary)}</p>
					<p class="muted" style="margin-top:0.6rem">${esc(profile.summaryLong)}</p>
				</section>

				<section>
					<div class="eyebrow">${icon('chart')}At a glance</div>
					<div class="grid-4" style="margin-top:0.55rem">
						${profile.stats
							.map((s) => `<div class="stat"><div class="num">${esc(s.value)}</div><div class="lbl">${esc(s.label)}</div></div>`)
							.join('')}
					</div>
				</section>

				<section>
					<div class="eyebrow">${icon('target')}What I focus on</div>
					<div class="grid-2" style="margin-top:0.55rem">
						${focusAreas
							.map(
								(f) => `
							<article class="card hoverable">
								<h3>${icon(f.icon)}&nbsp;${esc(f.title)}</h3>
								<p class="muted" style="margin-top:0.35rem;font-size:0.79rem">${esc(f.text)}</p>
							</article>`
							)
							.join('')}
					</div>
				</section>

				<div class="tags" style="gap:0.45rem">
					<button class="btn primary" data-open="experience">${icon('briefcase')}Experience</button>
					<button class="btn" data-open="projects">${icon('layers')}Projects</button>
					<button class="btn" data-open="skills">${icon('cpu')}Skills</button>
					<button class="btn" data-open="resume">${icon('fileText')}Resume</button>
					<button class="btn" data-open="contact">${icon('mail')}Contact</button>
				</div>
			</div>`;

		body.querySelectorAll('[data-open]').forEach((btn) => {
			btn.addEventListener('click', () => api.open(btn.dataset.open));
		});
	}

	/* ---------------------------------------------------------
	   Experience
	   --------------------------------------------------------- */
	function renderExperience(body) {
		body.innerHTML = `
			<div class="app">
				<div class="app-head">
					<h1>${icon('briefcase')}Professional experience</h1>
					<p>From Unity gameplay systems to leading an AI engineering team — four years, three companies.</p>
				</div>

				<div class="timeline">
					${experience
						.map(
							(job) => `
						<article class="card job${job.current ? ' current' : ''}">
							<div class="job-head">
								<h3>${esc(job.role)}</h3>
								${job.current ? '<span class="tag good">Current</span>' : ''}
							</div>
							<div class="company">${esc(job.company)}</div>
							<div class="period">${icon('calendar')}${esc(job.period)}</div>
							${bullets(job.highlights)}
							<div class="tags" style="margin-top:0.8rem">${tagList(job.tags)}</div>
						</article>`
						)
						.join('')}
				</div>

				<section>
					<div class="eyebrow">${icon('graduation')}Education</div>
					<div class="stack" style="margin-top:0.55rem">
						${education
							.map(
								(ed) => `
							<div class="card" style="display:flex;justify-content:space-between;gap:0.8rem;flex-wrap:wrap">
								<div>
									<h3>${esc(ed.degree)}</h3>
									<div class="company">${esc(ed.institution)}</div>
								</div>
								<div style="text-align:right">
									<div class="muted" style="font-size:0.78rem">${esc(ed.period)}</div>
									<div class="tag good" style="margin-top:0.25rem">${esc(ed.detail)}</div>
								</div>
							</div>`
							)
							.join('')}
					</div>
				</section>
			</div>`;
	}

	/* ---------------------------------------------------------
	   Projects
	   --------------------------------------------------------- */
	function renderProjects(body) {
		body.innerHTML = `
			<div class="app">
				<div class="app-head">
					<h1>${icon('layers')}Key projects</h1>
					<p>Production LLM systems, knowledge graphs, and immersive medical XR.</p>
				</div>

				<div class="stack">
					${projects
						.map(
							(pr) => `
						<article class="card hoverable${pr.featured ? ' featured' : ''}">
							<div class="proj-head">
								<span class="glyph">${icon(pr.icon)}</span>
								<div class="titles">
									<h3>${esc(pr.title)}</h3>
									<div class="sub">${esc(pr.subtitle)}</div>
								</div>
								${pr.badge ? `<span class="tag good">${esc(pr.badge)}</span>` : ''}
							</div>
							${bullets(pr.highlights)}
							<div class="tags" style="margin-top:0.8rem">${tagList(pr.tags)}</div>
						</article>`
						)
						.join('')}
				</div>

				<section>
					<div class="eyebrow">${icon('apps')}Also built</div>
					<div class="grid-4" style="margin-top:0.55rem">
						${alsoBuilt
							.map(
								(a) => `
							<div class="stat">
								<div style="font-weight:700;font-size:0.84rem;color:#fff">${esc(a.name)}</div>
								<div class="lbl">${esc(a.note)}</div>
							</div>`
							)
							.join('')}
					</div>
				</section>
			</div>`;
	}

	/* ---------------------------------------------------------
	   Skills
	   --------------------------------------------------------- */
	function renderSkills(body) {
		const total = skills.reduce((sum, g) => sum + g.items.length, 0);
		body.innerHTML = `
			<div class="app">
				<div class="app-head">
					<h1>${icon('cpu')}Core technical skills</h1>
					<p>Nine domains, from agentic LLM orchestration down to XR rendering and DevOps.</p>
				</div>

				<div class="filterbar">
					${icon('search')}
					<input id="skill-filter" placeholder='Filter skills — try "rerank", "neo4j", "unity"' autocomplete="off">
					<span class="count">${total} skills</span>
				</div>

				<div id="skill-groups">
					${skills
						.map(
							(g) => `
						<section class="skill-group">
							<div class="eyebrow">${icon(g.icon)}${esc(g.category)}</div>
							<div class="tags">${tagList(g.items, g.strong)}</div>
						</section>`
						)
						.join('')}
				</div>

				<p class="muted" id="skill-empty" hidden style="text-align:center">No skills match that filter.</p>
			</div>`;

		const input = body.querySelector('#skill-filter');
		const count = body.querySelector('.count');
		const groups = Array.from(body.querySelectorAll('.skill-group'));
		const tags = Array.from(body.querySelectorAll('.skill-group .tag'));

		input.addEventListener('input', () => {
			const q = input.value.trim().toLowerCase();
			let shown = 0;
			tags.forEach((tag) => {
				const match = !q || tag.textContent.toLowerCase().includes(q);
				tag.hidden = !match;
				tag.classList.toggle('hit', Boolean(q) && match);
				if (match) shown++;
			});
			groups.forEach((group) => {
				group.hidden = !Array.from(group.querySelectorAll('.tag')).some((t) => !t.hidden);
			});
			body.querySelector('#skill-empty').hidden = shown > 0;
			count.textContent = q ? `${shown} of ${total}` : `${total} skills`;
		});
	}

	/* ---------------------------------------------------------
	   Resume
	   --------------------------------------------------------- */
	function renderResume(body, api) {
		body.style.padding = '0';
		body.innerHTML = `
			<div class="resume-toolbar">
				<span class="muted" style="font-size:0.76rem;flex:1">${esc(profile.resume.split('/').pop())}</span>
				<button class="btn" id="res-open">${icon('external')}Open in tab</button>
				<a class="btn primary" id="res-dl" href="${esc(profile.resume)}" download>${icon('download')}Download</a>
			</div>
			<iframe class="pdf-frame" src="${esc(profile.resume)}#view=FitH" title="Resume PDF"></iframe>`;

		body.querySelector('#res-open').addEventListener('click', () => api.openExternal(profile.resume));
	}

	/* ---------------------------------------------------------
	   Contact
	   --------------------------------------------------------- */
	function renderContact(body, api) {
		const rows = [
			{ k: 'Email', v: profile.email, ic: 'mail', copy: profile.email, open: `mailto:${profile.email}` },
			{ k: 'Phone', v: profile.phone, ic: 'phone', copy: profile.phone, open: `tel:${profile.phone.replace(/[^+\d]/g, '')}` },
			{ k: 'LinkedIn', v: profile.linkedinLabel, ic: 'linkedin', copy: profile.linkedin, open: profile.linkedin },
			{ k: 'Location', v: profile.location, ic: 'home' }
		];

		body.innerHTML = `
			<div class="app">
				<div class="app-head">
					<h1>${icon('mail')}Get in touch</h1>
					<p>Let's talk retrieval quality, agentic systems, or anything at the intersection of LLMs and real-time 3D.</p>
				</div>

				<div class="status-pill"><span class="dot"></span>${esc(profile.availability)}</div>

				<div class="contact-grid">
					<div class="stack">
						${rows
							.map(
								(r) => `
							<div class="contact-row">
								<span class="glyph">${icon(r.ic)}</span>
								<div style="min-width:0">
									<div class="k">${esc(r.k)}</div>
									<div class="v">${esc(r.v)}</div>
								</div>
								<div class="row-actions">
									${r.copy ? `<button class="icon-btn" data-copy="${esc(r.copy)}" title="Copy">${icon('copy')}</button>` : ''}
									${r.open ? `<button class="icon-btn" data-link="${esc(r.open)}" title="Open">${icon('external')}</button>` : ''}
								</div>
							</div>`
							)
							.join('')}
					</div>

					<form class="card stack" id="msg-form">
						<h3>Compose a message</h3>
						<p class="muted" style="font-size:0.76rem">This opens your mail client with everything pre-filled — nothing is sent from the browser.</p>
						<div class="field">
							<label for="msg-name">Your name</label>
							<input id="msg-name" required placeholder="Jane Doe">
						</div>
						<div class="field">
							<label for="msg-subject">Subject</label>
							<input id="msg-subject" placeholder="Opportunity / question">
						</div>
						<div class="field">
							<label for="msg-body">Message</label>
							<textarea id="msg-body" rows="4" required placeholder="Hi Ram Chandra, …"></textarea>
						</div>
						<div class="tags" style="gap:0.45rem">
							<button class="btn primary" type="submit">${icon('send')}Open in mail app</button>
							<button class="btn" type="button" id="msg-copy">${icon('copy')}Copy message</button>
						</div>
					</form>
				</div>

				<div class="card" style="border-left:3px solid var(--emerald)">
					<p class="muted" style="font-size:0.8rem"><strong style="color:#fff">Currently</strong> leading the AI engineering team at Futureverse, building multimodal RAG and multi-agent systems in production.</p>
				</div>
			</div>`;

		body.querySelectorAll('[data-copy]').forEach((btn) => {
			btn.addEventListener('click', async () => {
				const ok = await api.copy(btn.dataset.copy);
				btn.innerHTML = icon(ok ? 'check' : 'x');
				btn.classList.add('done');
				api.toast('Copied', btn.dataset.copy, 'copy');
				setTimeout(() => {
					btn.innerHTML = icon('copy');
					btn.classList.remove('done');
				}, 1500);
			});
		});

		body.querySelectorAll('[data-link]').forEach((btn) => {
			btn.addEventListener('click', () => api.openExternal(btn.dataset.link));
		});

		const composed = () => {
			const name = body.querySelector('#msg-name').value.trim();
			const text = body.querySelector('#msg-body').value.trim();
			return `${text}\n\n— ${name}`;
		};

		body.querySelector('#msg-form').addEventListener('submit', (e) => {
			e.preventDefault();
			const subject = body.querySelector('#msg-subject').value.trim() || `Hello from ${body.querySelector('#msg-name').value.trim()}`;
			const href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(composed())}`;
			window.location.href = href;
			api.notify('Mail client opened', `Draft addressed to ${profile.email}`, 'mail');
		});

		body.querySelector('#msg-copy').addEventListener('click', async () => {
			await api.copy(`To: ${profile.email}\n\n${composed()}`);
			api.toast('Message copied', 'Recipient and body copied to clipboard.', 'copy');
		});
	}

	/* ---------------------------------------------------------
	   Terminal
	   --------------------------------------------------------- */
	function renderTerminal(body, api) {
		body.style.padding = '0';
		body.innerHTML = `
			<div class="term">
				<div class="term-out" id="term-out"></div>
				<form class="term-in">
					<span class="ps1">visitor@beniwal-os:~$</span>
					<input id="term-in" autocomplete="off" spellcheck="false" aria-label="Terminal input">
				</form>
			</div>`;

		const out = body.querySelector('#term-out');
		const input = body.querySelector('#term-in');
		const history = [];
		let histIndex = -1;

		function print(html, cls) {
			const line = document.createElement('div');
			if (cls) line.className = cls;
			line.innerHTML = html;
			out.appendChild(line);
			out.scrollTop = out.scrollHeight;
		}

		const COMMANDS = {
			help: () =>
				print(
					[
						'Available commands:',
						'  <b>about</b>       professional summary',
						'  <b>experience</b>  roles and companies',
						'  <b>projects</b>    selected work',
						'  <b>skills</b>      technical stack',
						'  <b>contact</b>     how to reach me',
						'  <b>education</b>   degree and institution',
						'  <b>open</b> &lt;app&gt;  launch an app (about, projects, resume, assistant…)',
						'  <b>ls</b>          list portfolio sections',
						'  <b>neofetch</b>    system summary',
						'  <b>date</b>        current date and time',
						'  <b>clear</b>       clear the screen'
					].join('\n')
				),
			about: () => print(`${profile.name} — ${profile.title}\n${profile.subtitle}\n\n${profile.summary}`),
			whoami: () => print(`${profile.name} · ${profile.title} @ ${profile.company}`),
			experience: () =>
				experience.forEach((job) =>
					print(`<b>${esc(job.role)}</b> — ${esc(job.company)}\n  ${esc(job.period)}\n  ${esc(job.highlights[0])}`)
				),
			projects: () => projects.forEach((pr) => print(`<b>${esc(pr.title)}</b>\n  ${esc(pr.subtitle)} · ${esc(pr.tags.join(', '))}`)),
			skills: () => skills.forEach((g) => print(`<b>${esc(g.category)}</b>: ${esc(g.items.join(', '))}`)),
			contact: () => print(`email    ${profile.email}\nphone    ${profile.phone}\nlinkedin ${profile.linkedin}`),
			education: () => education.forEach((ed) => print(`${esc(ed.degree)} — ${esc(ed.institution)} (${esc(ed.period)}, ${esc(ed.detail)})`)),
			ls: () => print('about  experience  projects  skills  education  resume.pdf  contact'),
			date: () => print(new Date().toString()),
			clear: () => {
				out.innerHTML = '';
			},
			neofetch: () =>
				print(
					[
						`<b>visitor@beniwal-os</b>`,
						'-----------------------',
						`OS        Beniwal OS (web desktop)`,
						`Host      ${esc(profile.name)}`,
						`Role      ${esc(profile.title)} @ ${esc(profile.company)}`,
						`Uptime    4+ years in production`,
						`Stack     RAG · Agents · Knowledge Graphs · Unity/XR`,
						`Contact   ${esc(profile.email)}`
					].join('\n')
				),
			sudo: () => print('Nice try. Permission denied — this desktop is read-only.', 'err'),
			exit: () => api.close()
		};

		function run(raw) {
			const line = raw.trim();
			print(`<span class="dim">visitor@beniwal-os:~$</span> ${esc(line)}`, 'cmd');
			if (!line) return;
			history.push(line);
			histIndex = history.length;

			const [cmd, ...args] = line.split(/\s+/);
			const key = cmd.toLowerCase();

			if (key === 'open') {
				const target = (args[0] || '').toLowerCase();
				if (!target) return print('usage: open <app>', 'err');
				const opened = api.open(target);
				if (opened) print(`Launching ${esc(target)}…`, 'ok');
				else print(`No app named "${esc(target)}".`, 'err');
				return;
			}

			if (key === 'echo') return print(esc(args.join(' ')));
			if (key === 'resume') {
				api.open('resume');
				return print('Opening resume…', 'ok');
			}

			const handler = COMMANDS[key];
			if (handler) handler(args);
			else print(`command not found: ${esc(cmd)} — type "help"`, 'err');
		}

		body.querySelector('.term-in').addEventListener('submit', (e) => {
			e.preventDefault();
			run(input.value);
			input.value = '';
		});

		input.addEventListener('keydown', (e) => {
			if (e.key === 'ArrowUp' && histIndex > 0) {
				histIndex--;
				input.value = history[histIndex] || '';
				e.preventDefault();
			}
			if (e.key === 'ArrowDown' && histIndex < history.length - 1) {
				histIndex++;
				input.value = history[histIndex] || '';
				e.preventDefault();
			}
		});

		print(`Beniwal OS shell — type <b>help</b> to get started.`, 'dim');
		COMMANDS.neofetch();
		setTimeout(() => input.focus(), 60);
	}

	/* ---------------------------------------------------------
	   File explorer (virtual filesystem built from the data)
	   --------------------------------------------------------- */
	function buildFs() {
		return {
			name: 'Portfolio',
			type: 'folder',
			children: [
				{
					name: 'Experience',
					type: 'folder',
					children: experience.map((job) => ({
						name: `${job.company.split(' ')[0]} — ${job.role}.txt`,
						type: 'file',
						content: [
							`ROLE: ${job.role}`,
							`COMPANY: ${job.company}`,
							`PERIOD: ${job.period}`,
							'',
							...job.highlights.map((h) => `• ${h}`),
							'',
							`STACK: ${job.tags.join(', ')}`
						].join('\n')
					}))
				},
				{
					name: 'Projects',
					type: 'folder',
					children: projects.map((pr) => ({
						name: `${pr.title.split(' —')[0]}.md`,
						type: 'file',
						content: [`# ${pr.title}`, `_${pr.subtitle}_`, '', ...pr.highlights.map((h) => `- ${h}`), '', `Tags: ${pr.tags.join(', ')}`].join('\n')
					}))
				},
				{
					name: 'Skills',
					type: 'folder',
					children: skills.map((g) => ({
						name: `${g.category.replace(/[^\w]+/g, '_')}.json`,
						type: 'file',
						content: JSON.stringify({ category: g.category, items: g.items }, null, 2)
					}))
				},
				{
					name: 'Documents',
					type: 'folder',
					children: [
						{ name: 'Resume.pdf', type: 'app', app: 'resume', content: 'Opens the resume viewer.' },
						{
							name: 'Education.txt',
							type: 'file',
							content: education.map((ed) => `${ed.degree}\n${ed.institution}\n${ed.period} · ${ed.detail}`).join('\n\n')
						}
					]
				},
				{
					name: 'About_Me.txt',
					type: 'file',
					content: [
						`NAME: ${profile.name}`,
						`TITLE: ${profile.title}`,
						`COMPANY: ${profile.company}`,
						`LOCATION: ${profile.location}`,
						'',
						profile.summary,
						'',
						profile.summaryLong
					].join('\n')
				},
				{
					name: 'Contact.txt',
					type: 'file',
					content: [`EMAIL: ${profile.email}`, `PHONE: ${profile.phone}`, `LINKEDIN: ${profile.linkedin}`].join('\n')
				},
				{ name: 'Assistant.exe', type: 'app', app: 'assistant', content: 'Launches the portfolio assistant.' }
			]
		};
	}

	function renderFiles(body, api) {
		body.style.padding = '0';
		const root = buildFs();
		let path = [root];

		body.innerHTML = `
			<div class="files">
				<aside class="files-side">
					<div class="section-label" style="padding:0 0.55rem 0.5rem">Quick access</div>
					<div id="files-side"></div>
				</aside>
				<div class="files-main">
					<div class="files-bar">
						<button class="icon-btn" id="files-back" title="Back">${icon('arrowLeft')}</button>
						<span id="files-path"></span>
					</div>
					<div class="files-list" id="files-list"></div>
				</div>
			</div>`;

		const list = body.querySelector('#files-list');
		const pathEl = body.querySelector('#files-path');

		const sideItems = [{ name: 'Portfolio', node: root }].concat(
			root.children.filter((c) => c.type === 'folder').map((c) => ({ name: c.name, node: c }))
		);

		const side = body.querySelector('#files-side');
		sideItems.forEach((item) => {
			const btn = document.createElement('button');
			btn.className = 'side-item';
			btn.innerHTML = `${icon('folder')}${esc(item.name)}`;
			btn.addEventListener('click', () => {
				path = item.node === root ? [root] : [root, item.node];
				draw();
			});
			side.appendChild(btn);
		});

		function openNode(node) {
			if (node.type === 'folder') {
				path.push(node);
				draw();
				return;
			}
			if (node.type === 'app') {
				api.open(node.app);
				return;
			}
			list.innerHTML = `<div class="file-view" style="grid-column:1/-1">${esc(node.content)}</div>`;
			pathEl.textContent = `${path.map((p) => p.name).join(' / ')} / ${node.name}`;
		}

		function draw() {
			const current = path[path.length - 1];
			pathEl.textContent = path.map((p) => p.name).join(' / ');
			list.innerHTML = '';
			body.querySelectorAll('.side-item').forEach((btn, i) => {
				btn.classList.toggle('active', sideItems[i].node === current);
			});

			(current.children || []).forEach((node) => {
				const btn = document.createElement('button');
				btn.className = `file-item${node.type === 'folder' ? ' folder' : ''}`;
				const glyph = node.type === 'folder' ? 'folder' : node.type === 'app' ? 'bot' : node.name.endsWith('.pdf') ? 'fileText' : 'file';
				btn.innerHTML = `${icon(glyph)}<span>${esc(node.name)}</span>`;
				btn.addEventListener('click', () => openNode(node));
				list.appendChild(btn);
			});
		}

		body.querySelector('#files-back').addEventListener('click', () => {
			if (path.length > 1) path.pop();
			draw();
		});

		draw();
	}

	/* ---------------------------------------------------------
	   Assistant
	   --------------------------------------------------------- */
	function renderAssistant(body, api) {
		body.style.padding = '0';
		body.innerHTML = `
			<div class="chat">
				<div class="chat-log" id="chat-log"></div>
				<div class="chips" id="chat-chips"></div>
				<form class="chat-in">
					<input id="chat-input" placeholder="Ask about RAG, agents, XR, or contact details…" autocomplete="off">
					<button class="btn primary" type="submit">${icon('send')}Send</button>
				</form>
			</div>`;

		const log = body.querySelector('#chat-log');
		const chipHost = body.querySelector('#chat-chips');
		const input = body.querySelector('#chat-input');

		function bubble(text, mine) {
			const el = document.createElement('div');
			el.className = `msg${mine ? ' me' : ''}`;
			el.innerHTML = `<span class="who">${icon(mine ? 'user' : 'bot')}</span><div class="bubble">${md(text)}</div>`;
			log.appendChild(el);
			log.scrollTop = log.scrollHeight;
			return el;
		}

		function setChips(chips) {
			chipHost.innerHTML = '';
			(chips || []).forEach((label) => {
				const btn = document.createElement('button');
				btn.className = 'chip';
				btn.type = 'button';
				btn.textContent = label;
				btn.addEventListener('click', () => ask(label));
				chipHost.appendChild(btn);
			});
		}

		function match(question) {
			const q = question.toLowerCase();
			let best = null;
			let bestScore = 0;
			assistant.intents.forEach((intent) => {
				const score = intent.keys.reduce((sum, k) => (q.includes(k) ? sum + 1 : sum), 0);
				if (score > bestScore) {
					bestScore = score;
					best = intent;
				}
			});
			return bestScore > 0 ? best : assistant.fallback;
		}

		const APP_HINTS = [
			{ keys: ['open contact', 'contact app'], app: 'contact' },
			{ keys: ['open resume', 'download the resume', 'open the resume'], app: 'resume' },
			{ keys: ['open the projects', 'projects app', 'show projects', 'show me projects'], app: 'projects' },
			{ keys: ['open the skills', 'skills app'], app: 'skills' },
			{ keys: ['show experience', 'experience app'], app: 'experience' }
		];

		function ask(question) {
			bubble(question, true);
			setChips([]);
			const typing = bubble('<span class="typing"><i></i><i></i><i></i></span>');
			typing.querySelector('.bubble').innerHTML = '<span class="typing"><i></i><i></i><i></i></span>';

			setTimeout(() => {
				const hit = match(question);
				typing.querySelector('.bubble').innerHTML = md(hit.answer);
				setChips(hit.chips);
				log.scrollTop = log.scrollHeight;

				const q = question.toLowerCase();
				const hint = APP_HINTS.find((h) => h.keys.some((k) => q.includes(k)));
				if (hint) api.open(hint.app);
			}, 420);
		}

		body.querySelector('.chat-in').addEventListener('submit', (e) => {
			e.preventDefault();
			const value = input.value.trim();
			if (!value) return;
			input.value = '';
			ask(value);
		});

		bubble(assistant.greeting.answer);
		setChips(assistant.greeting.chips);
		setTimeout(() => input.focus(), 80);
	}

	/* ---------------------------------------------------------
	   Settings
	   --------------------------------------------------------- */
	function renderSettings(body, api) {
		body.style.padding = '0';

		const SECTIONS = [
			{ id: 'personalization', label: 'Personalization', ic: 'sparkles' },
			{ id: 'sound', label: 'Sound & Audio', ic: 'volume' },
			{ id: 'system', label: 'System & About OS', ic: 'monitor' }
		];

		body.innerHTML = `
			<div class="settings-shell">
				<aside class="settings-nav">
					<div class="section-label">Settings hub</div>
					${SECTIONS.map(
						(s) => `<button class="nav-item" data-section="${s.id}">${icon(s.ic)}${esc(s.label)}</button>`
					).join('')}
				</aside>
				<div class="settings-body" id="settings-body"></div>
			</div>`;

		const pane = body.querySelector('#settings-body');

		function paneWallpapers() {
			const cur = api.settings.get();
			return `
				<div class="settings-pane">
					<div class="pane-head">
						<h2>Desktop Background Wallpaper</h2>
						<p>Choose a theme wallpaper or paste a custom image URL.</p>
					</div>

					<div class="wall-grid">
						${api.settings.wallpapers
							.map(
								(w) => `
							<button class="wall-card${cur.wallpaper === w.id ? ' active' : ''}" data-wall="${w.id}"
								style="background-image:url('${w.url}')">
								<span class="wall-check">${icon('check')}</span>
								<span class="wall-name">${esc(w.label)}</span>
							</button>`
							)
							.join('')}
					</div>

					<div class="card stack">
						<div>
							<div class="k" style="font-size:0.82rem;font-weight:600;color:#fff">Custom wallpaper image URL</div>
							<div class="d" style="font-size:0.72rem;color:var(--slate-500);margin-top:0.15rem">Any direct image link, kept in this browser only.</div>
						</div>
						<div class="url-row">
							<input id="wall-url" placeholder="https://example.com/wallpaper.jpg"
								value="${esc(cur.customWallpaper || '')}">
							<button class="btn primary" id="wall-apply">Apply URL</button>
						</div>
					</div>

					<div class="setting-row">
						<div>
							<div class="k">Taskbar alignment</div>
							<div class="d">Centre the dock or push it to the left edge.</div>
						</div>
						<div class="seg" id="tb-align">
							<button data-align="center" class="${cur.taskbar === 'center' ? 'active' : ''}">Center</button>
							<button data-align="left" class="${cur.taskbar === 'left' ? 'active' : ''}">Left</button>
						</div>
					</div>

					<div class="setting-row">
						<div>
							<div class="k">Accent colour</div>
							<div class="d">Applies to windows, dock, and app icons.</div>
						</div>
						<div class="swatches">
							${Object.entries(api.settings.accents)
								.map(
									([key, val]) =>
										`<button class="swatch${cur.accent === key ? ' active' : ''}" data-accent="${key}" style="background:${val.gradient}" title="${esc(key)}"></button>`
								)
								.join('')}
						</div>
					</div>
				</div>`;
		}

		function paneSound() {
			const cur = api.settings.get();
			return `
				<div class="settings-pane">
					<div class="pane-head">
						<h2>Sound &amp; Audio</h2>
						<p>Synthesised interface sounds — no audio files are downloaded.</p>
					</div>

					<div class="setting-row">
						<div>
							<div class="k">Interface sounds</div>
							<div class="d">Startup chime, window open and close, notifications.</div>
						</div>
						<button class="toggle${cur.sound ? ' on' : ''}" id="sound-toggle" aria-label="Toggle sounds"></button>
					</div>

					<div class="setting-row">
						<div>
							<div class="k">Test notification</div>
							<div class="d">Fires a toast so you can hear the alert tone.</div>
						</div>
						<button class="btn" id="sound-test">${icon('bell')}Play</button>
					</div>
				</div>`;
		}

		function paneSystem() {
			return `
				<div class="settings-pane">
					<div class="pane-head">
						<h2>System &amp; About OS</h2>
						<p>What this desktop is made of.</p>
					</div>

					<div class="card stack">
						<div class="muted" style="font-size:0.8rem">
							<strong style="color:#fff">Beniwal OS</strong> — a portfolio built as a desktop environment.
							Vanilla HTML, CSS, and JavaScript: no framework, no bundler, no dependencies. Every app,
							the file tree, and the terminal all render from a single content file.
						</div>
						<div class="tags">
							<span class="tag accent">Version 2.0</span>
							<span class="tag">No dependencies</span>
							<span class="tag">Static hosting</span>
							<span class="tag">SVG wallpapers</span>
						</div>
					</div>

					<div class="card stack">
						<h3>Shortcuts</h3>
						<div class="stack" style="gap:0.4rem">
							<div class="muted" style="font-size:0.78rem"><strong style="color:#fff">/</strong> — open dock search</div>
							<div class="muted" style="font-size:0.78rem"><strong style="color:#fff">Esc</strong> — close open panels</div>
							<div class="muted" style="font-size:0.78rem"><strong style="color:#fff">Double-click</strong> a title bar to maximise, a desktop icon to open</div>
							<div class="muted" style="font-size:0.78rem"><strong style="color:#fff">index.html#projects</strong> — deep-link straight into an app</div>
						</div>
					</div>

					<div class="setting-row">
						<div>
							<div class="k">Reset preferences</div>
							<div class="d">Restores the default wallpaper, accent, dock, and sound settings.</div>
						</div>
						<button class="btn" id="prefs-reset">${icon('refresh')}Reset</button>
					</div>
				</div>`;
		}

		function show(sectionId) {
			body.querySelectorAll('.nav-item').forEach((n) => n.classList.toggle('active', n.dataset.section === sectionId));
			if (sectionId === 'sound') pane.innerHTML = paneSound();
			else if (sectionId === 'system') pane.innerHTML = paneSystem();
			else pane.innerHTML = paneWallpapers();
			bindPane();
			api.setSubtitle(SECTIONS.find((s) => s.id === sectionId).label);
		}

		function bindPane() {
			pane.querySelectorAll('[data-wall]').forEach((btn) => {
				btn.addEventListener('click', () => {
					api.settings.setWallpaper(btn.dataset.wall);
					pane.querySelectorAll('[data-wall]').forEach((b) => b.classList.toggle('active', b === btn));
				});
			});

			const urlInput = pane.querySelector('#wall-url');
			const urlApply = pane.querySelector('#wall-apply');
			if (urlApply) {
				const apply = () => {
					const url = urlInput.value.trim();
					if (!url) {
						api.toast('Nothing to apply', 'Paste a direct image URL first.', 'info');
						return;
					}
					api.settings.setCustomWallpaper(url);
					pane.querySelectorAll('[data-wall]').forEach((b) => b.classList.remove('active'));
					api.toast('Wallpaper applied', 'Using your custom image.', 'image');
				};
				urlApply.addEventListener('click', apply);
				urlInput.addEventListener('keydown', (e) => {
					if (e.key === 'Enter') apply();
				});
			}

			pane.querySelectorAll('[data-align]').forEach((btn) => {
				btn.addEventListener('click', () => {
					api.settings.setTaskbar(btn.dataset.align);
					pane.querySelectorAll('[data-align]').forEach((b) => b.classList.toggle('active', b === btn));
				});
			});

			pane.querySelectorAll('[data-accent]').forEach((btn) => {
				btn.addEventListener('click', () => {
					api.settings.setAccent(btn.dataset.accent);
					pane.querySelectorAll('[data-accent]').forEach((b) => b.classList.toggle('active', b === btn));
				});
			});

			const toggle = pane.querySelector('#sound-toggle');
			if (toggle) {
				toggle.addEventListener('click', () => {
					const on = !toggle.classList.contains('on');
					toggle.classList.toggle('on', on);
					api.settings.setSound(on);
				});
			}

			const test = pane.querySelector('#sound-test');
			if (test) test.addEventListener('click', () => api.notify('Sound check', 'This is how notifications look and sound.', 'bell'));

			const reset = pane.querySelector('#prefs-reset');
			if (reset) {
				reset.addEventListener('click', () => {
					api.settings.reset();
					show('personalization');
					api.toast('Preferences reset', 'Back to the default look.', 'refresh');
				});
			}
		}

		body.querySelectorAll('.nav-item').forEach((btn) => {
			btn.addEventListener('click', () => show(btn.dataset.section));
		});

		show('personalization');
	}

	/* ---------------------------------------------------------
	   Registry
	   --------------------------------------------------------- */
	window.APP_DEFS = [
		{
			id: 'about',
			pinned: true,
			name: 'About Me',
			subtitle: profile.title,
			icon: 'user',
			gradient: 'linear-gradient(135deg,#00a5ef,#4f39f6)',
			desktop: true,
			keywords: ['profile', 'summary', 'bio'],
			width: 880,
			height: 600,
			render: renderAbout
		},
		{
			id: 'experience',
			name: 'Experience',
			subtitle: 'Roles & education',
			icon: 'briefcase',
			gradient: 'linear-gradient(135deg,#00bb7f,#00a5ef)',
			desktop: true,
			keywords: ['work', 'jobs', 'career', 'futureverse', 'metamix'],
			width: 880,
			height: 620,
			render: renderExperience
		},
		{
			id: 'projects',
			pinned: true,
			name: 'Projects',
			subtitle: 'Selected work',
			icon: 'layers',
			gradient: 'linear-gradient(135deg,#8e51ff,#00a5ef)',
			desktop: true,
			keywords: ['rag', 'xr', 'anatomyxr', 'portfolio'],
			width: 880,
			height: 620,
			render: renderProjects
		},
		{
			id: 'skills',
			pinned: true,
			name: 'Skills',
			subtitle: 'Technical stack',
			icon: 'cpu',
			gradient: 'linear-gradient(135deg,#f99c00,#ff2357)',
			desktop: true,
			keywords: ['stack', 'tech', 'python', 'langchain'],
			width: 820,
			height: 580,
			render: renderSkills
		},
		{
			id: 'resume',
			name: 'Resume',
			subtitle: 'PDF',
			icon: 'fileText',
			gradient: 'linear-gradient(135deg,#00a5ef,#00bb7f)',
			desktop: true,
			keywords: ['cv', 'pdf', 'download'],
			width: 780,
			height: 640,
			render: renderResume
		},
		{
			id: 'contact',
			pinned: true,
			name: 'Contact',
			subtitle: 'Email & links',
			icon: 'mail',
			gradient: 'linear-gradient(135deg,#ff2357,#8e51ff)',
			desktop: true,
			keywords: ['email', 'hire', 'linkedin', 'phone'],
			width: 860,
			height: 620,
			render: renderContact
		},
		{
			id: 'assistant',
			pinned: true,
			name: 'Assistant',
			subtitle: 'Ask about my work',
			icon: 'bot',
			gradient: 'linear-gradient(135deg,#00bcfe,#4f39f6)',
			desktop: true,
			keywords: ['chat', 'ai', 'ask', 'bot'],
			width: 660,
			height: 600,
			render: renderAssistant
		},
		{
			id: 'files',
			pinned: true,
			name: 'File Explorer',
			subtitle: 'Portfolio volume',
			icon: 'folderOpen',
			gradient: 'linear-gradient(135deg,#f99c00,#ffb731)',
			desktop: true,
			keywords: ['files', 'folders', 'documents'],
			width: 880,
			height: 560,
			render: renderFiles
		},
		{
			id: 'terminal',
			name: 'Terminal',
			subtitle: 'visitor@beniwal-os',
			icon: 'terminal',
			gradient: 'linear-gradient(135deg,#1d293d,#45556c)',
			desktop: true,
			keywords: ['shell', 'cli', 'bash', 'console'],
			width: 720,
			height: 460,
			render: renderTerminal
		},
		{
			id: 'settings',
			pinned: true,
			name: 'Settings',
			subtitle: 'Personalise',
			icon: 'settings',
			gradient: 'linear-gradient(135deg,#45556c,#00a5ef)',
			desktop: false,
			keywords: ['theme', 'accent', 'wallpaper', 'sound'],
			width: 720,
			height: 560,
			render: renderSettings
		}
	];
})();
