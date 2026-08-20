/* Portfolio content. Everything the desktop renders comes from this file. */

const profile = {
	name: 'Ram Chandra Beniwal',
	initials: 'RC',
	title: 'AI/ML Lead',
	subtitle: 'LLM & Agentic Systems Engineer · Senior Unity3D/XR Developer',
	company: 'Futureverse Private Limited',
	location: 'India · Remote friendly',
	email: 'ramchandra.nitsri@gmail.com',
	phone: '+91-8290637199',
	linkedin: 'https://www.linkedin.com/in/ramchandra95',
	linkedinLabel: 'linkedin.com/in/ramchandra95',
	resume: 'assets/RamChandra_Beniwal_Resume.pdf',
	availability: 'Open to conversations about RAG & agentic systems',
	summary:
		'AI/ML Lead with 4+ years building and shipping production LLM systems: multimodal RAG pipelines, agentic orchestration, multi-agent systems, and knowledge-graph-powered retrieval. Currently leading a full AI engineering team at Futureverse, owning architecture from ingestion and hybrid retrieval (BM25 + vector) through reranking, evaluation, and deployment.',
	summaryLong:
		'Deep hands-on expertise in RAG, GraphRAG, AI agents, knowledge graphs, embeddings, and RAG evaluation using the OpenAI API, LangChain, Weaviate, Neo4j, and Hugging Face. Unique background bridging intelligent AI backends with real-time 3D/XR frontends for medical training and surgical visualisation products.',
	stats: [
		{ value: '4+', label: 'Years in production' },
		{ value: '3', label: 'Companies' },
		{ value: '4', label: 'Medical XR products' },
		{ value: '1', label: 'AI team led' }
	]
};

const focusAreas = [
	{
		icon: 'network',
		title: 'Agentic Systems',
		text: 'Multi-agent orchestration where specialised LLM agents split retrieval, reasoning, and response generation — running in production, not demos.'
	},
	{
		icon: 'search',
		title: 'Retrieval that holds up',
		text: 'Hybrid BM25 + vector search, multi-query expansion, cross-encoder reranking, and relevance thresholds that cut off-topic and hallucinated citations.'
	},
	{
		icon: 'image',
		title: 'Multimodal RAG',
		text: 'Vision-LLM captions embedded in the same vector space as text, so images and prose rank together in one unified retrieval pass.'
	},
	{
		icon: 'graph',
		title: 'Knowledge Graphs',
		text: 'AutoSchema extraction turning unstructured clinical documents into Neo4j graphs for hybrid vector + graph retrieval.'
	},
	{
		icon: 'shield',
		title: 'Evaluation & Reliability',
		text: 'RAG eval suites scoring faithfulness, completeness, and citation accuracy — plus the production debugging to keep them green.'
	},
	{
		icon: 'cube',
		title: 'Real-time 3D / XR',
		text: 'Unity3D and OpenXR medical training and surgical visualisation, validated with doctors and researchers.'
	}
];

const experience = [
	{
		id: 'exp-futureverse',
		role: 'AI/ML Lead',
		company: 'Futureverse Private Limited',
		period: 'Feb 2026 — Present',
		current: true,
		highlights: [
			'Lead the AI engineering team end-to-end: architecture decisions, sprint planning, code reviews, and mentoring across RAG, agentic orchestration, and multi-agent initiatives.',
			'Designed agentic orchestration and multi-agent workflows coordinating specialised LLM agents for retrieval, reasoning, and response generation in production.',
			'Built a multimodal RAG pipeline — heading-based chunking with multi-granularity metadata, hybrid BM25 + vector indexing (Weaviate, bge-m3), and vision-LLM image captioning embedded in the same vector space as text.',
			'Fused surrounding document context into image embeddings and added LLM-based decorative-image filtering, overcoming vision-model recognition limits and improving retrieval precision.',
			'Added multi-query expansion with cross-encoder reranking and relevance-threshold cutoffs to eliminate off-topic and hallucinated citations.',
			'Auto-rendered inline citations and images in the UI, backed by a RAG eval suite scoring faithfulness, completeness, and citation accuracy.',
			'Fixed a critical vector-DB schema bug causing silent retrieval failures, restoring production search reliability.'
		],
		tags: ['Weaviate', 'bge-m3', 'BM25', 'Cross-Encoder Reranking', 'Vision LLMs', 'Multi-Agent', 'RAG Eval']
	},
	{
		id: 'exp-metamix',
		role: 'Team Lead — Unity, XR & AI/LLM Development',
		company: 'Metamix Technologies',
		period: 'Jun 2023 — Feb 2026',
		highlights: [
			'Led Unity + AI development for medical XR products: AnatomyXR, Medvisor, BirthXR, LivXR.',
			'Built RAG and GraphRAG pipelines (OpenAI API, LangChain, Neo4j) powering AI-driven medical knowledge retrieval and in-app anatomy Q&A inside XR applications.',
			'Developed an LLM-based question and quiz generator for AnatomyXR, auto-creating assessment content grounded in the medical knowledge base.',
			'Implemented AutoSchema Extraction workflows to generate Neo4j graph schemas from unstructured medical content.',
			'Designed modular Unity architecture using design patterns; built client-server multi-user XR applications.',
			'Optimised applications for Windows desktop, mobile, and XR devices; integrated backend SQL data systems.',
			'Collaborated with doctors, researchers, 3D modelers, and UI/UX teams across the full development lifecycle.'
		],
		tags: ['LangChain', 'Neo4j', 'GraphRAG', 'OpenAI API', 'Unity3D', 'OpenXR', 'SQL']
	},
	{
		id: 'exp-parcellinc',
		role: 'Unity Game & Web Developer',
		company: 'Parcellinc',
		period: 'Jan 2022 — Jun 2023',
		highlights: [
			'Developed Unity-based games (Zombie Runner, Realm Rush) with AI-driven gameplay mechanics.',
			'Implemented AI behaviour trees and decision systems for enemy NPC logic and adaptive difficulty.',
			'Built WebGL and Three.js interactive 3D web experiences; developed cross-platform Android applications.',
			'Improved performance, resolved bugs, and optimised rendering pipelines in agile cycles with designers and 3D artists.'
		],
		tags: ['Unity3D', 'Behaviour Trees', 'WebGL', 'Three.js', 'Android']
	}
];

const projects = [
	{
		id: 'proj-rag-platform',
		title: 'Multimodal Enterprise RAG Platform',
		subtitle: 'Futureverse',
		icon: 'graph',
		featured: true,
		badge: 'Flagship',
		highlights: [
			'Unified text and image search in a single vector space with hybrid BM25 + vector retrieval, so prose and figures compete in one ranked result set.',
			'Cross-encoder reranking and relevance thresholds on top of multi-query expansion, cutting off-topic and hallucinated citations.',
			'Inline cited answers rendered automatically in the UI — every claim traceable to its source passage or image.',
			'Backed by a full evaluation suite scoring faithfulness, completeness, and citation accuracy, orchestrated via a multi-agent pipeline.'
		],
		tags: ['Weaviate', 'bge-m3', 'Hybrid BM25 + Vector', 'Cross-Encoder', 'Vision LLM', 'Multi-Agent', 'RAG Eval']
	},
	{
		id: 'proj-anatomyxr',
		title: 'AnatomyXR — Immersive Anatomy Learning with AI Tutor',
		subtitle: 'Meta Quest · Metamix Technologies',
		icon: 'cube',
		highlights: [
			'Built layered organ interaction and gesture-based XR modules; optimised high-poly anatomical assets for headset frame budgets.',
			'Integrated a RAG pipeline with a Neo4j knowledge graph for AI-driven anatomy Q&A inside the XR environment.',
			'Shipped an automatic quiz and question generator grounded in the medical knowledge base via retrieval-augmented prompting.'
		],
		tags: ['Unity3D', 'Meta Quest', 'Neo4j', 'LangChain', 'OpenAI API', 'OpenXR']
	},
	{
		id: 'proj-medkg',
		title: 'Medical Knowledge Graph System',
		subtitle: 'AutoSchema & Semantic Retrieval',
		icon: 'network',
		highlights: [
			'Designed an AutoSchema Extraction pipeline that parses unstructured clinical documents and structures them into Neo4j graphs.',
			'Enabled hybrid vector + graph retrieval, letting semantic similarity and explicit clinical relationships answer the same query together.'
		],
		tags: ['Neo4j', 'GraphRAG', 'AutoSchema', 'Embeddings', 'Python']
	},
	{
		id: 'proj-medvisor',
		title: 'Medvisor — Mixed Reality Surgical AI Assistance',
		subtitle: 'Metamix Technologies',
		icon: 'health',
		highlights: [
			'Developed MR surgical visualisation and contextual simulation workflows, validated with practising medical professionals.'
		],
		tags: ['Mixed Reality', 'Unity3D', 'MRTK', 'XR Interaction Toolkit']
	}
];

const alsoBuilt = [
	{ name: 'BirthXR', note: 'Medical XR training product' },
	{ name: 'LivXR', note: 'Medical XR training product' },
	{ name: 'Zombie Runner', note: 'Unity game, AI-driven mechanics' },
	{ name: 'Realm Rush', note: 'Unity tower defence, behaviour trees' }
];

const skills = [
	{
		category: 'LLM & Agentic Systems',
		icon: 'bot',
		items: ['RAG', 'Multimodal RAG', 'GraphRAG', 'Agentic Orchestration', 'Multi-Agent Systems', 'AI Agents', 'Tool Use / Function Calling', 'Prompt Engineering'],
		strong: ['RAG', 'Multimodal RAG', 'GraphRAG']
	},
	{
		category: 'Retrieval & Search',
		icon: 'search',
		items: ['Hybrid BM25 + Vector Search', 'Semantic Retrieval', 'Multi-Query Expansion', 'Cross-Encoder Reranking', 'Relevance Thresholding', 'Chunking Strategies', 'Embedding Pipelines (bge-m3)'],
		strong: ['Hybrid BM25 + Vector Search']
	},
	{
		category: 'Knowledge Graphs',
		icon: 'network',
		items: ['Neo4j', 'AutoSchema Extraction', 'Hybrid Vector + Graph Search'],
		strong: ['Neo4j']
	},
	{
		category: 'AI Frameworks & APIs',
		icon: 'plug',
		items: ['LangChain', 'PyTorch', 'Hugging Face Transformers', 'OpenAI API', 'Vision LLMs', 'Image Captioning / Understanding'],
		strong: ['LangChain', 'OpenAI API']
	},
	{
		category: 'Evaluation & Reliability',
		icon: 'shield',
		items: ['RAG Eval Suites', 'Faithfulness', 'Completeness', 'Citation Accuracy', 'Hallucination Mitigation', 'Production Debugging'],
		strong: []
	},
	{
		category: 'Databases',
		icon: 'database',
		items: ['Weaviate', 'Pinecone', 'FAISS', 'Neo4j', 'SQL / MySQL'],
		strong: ['Weaviate']
	},
	{
		category: 'Programming',
		icon: 'code',
		items: ['Python', 'C# (Advanced)', 'C++', 'JavaScript (ES6+)', 'SQL'],
		strong: ['Python', 'C# (Advanced)']
	},
	{
		category: '3D / XR',
		icon: 'cube',
		items: ['Unity3D (4+ years)', 'OpenXR', 'MRTK', 'XR Interaction Toolkit', 'ARCore', 'WebGL / Three.js'],
		strong: ['Unity3D (4+ years)']
	},
	{
		category: 'Cloud & DevOps',
		icon: 'cloud',
		items: ['Docker', 'AWS (EC2, S3, Lambda)', 'CI/CD', 'Git', 'Linux', 'REST APIs'],
		strong: []
	}
];

const education = [
	{
		degree: 'B.Tech — Chemical Engineering',
		institution: 'National Institute of Technology, Srinagar',
		period: '2014 — 2018',
		detail: 'CGPA 7.41'
	}
];

/* Canned answers for the assistant app. Matched by keyword. */
const assistantIntents = [
	{
		keys: ['futureverse', 'current', 'now', 'lead', 'team'],
		answer:
			'**Futureverse Private Limited — AI/ML Lead (Feb 2026 – Present)**\n\nRam leads the AI engineering team end-to-end: architecture, sprint planning, reviews, and mentoring. The flagship system is a multimodal enterprise RAG platform — heading-based chunking, hybrid BM25 + vector retrieval on Weaviate with bge-m3, vision-LLM image captions in the same vector space, cross-encoder reranking, and a RAG eval suite scoring faithfulness, completeness, and citation accuracy.',
		chips: ['How does the multimodal RAG work?', 'What did he do at Metamix?', 'Show me the tech stack']
	},
	{
		keys: ['multimodal', 'rag', 'retrieval', 'rerank', 'bm25', 'vector', 'weaviate'],
		answer:
			'**Retrieval architecture**\n\n1. Heading-based chunking with multi-granularity metadata.\n2. Hybrid BM25 + dense vector indexing in Weaviate (bge-m3 embeddings).\n3. Vision-LLM captions embedded in the *same* space as text, with surrounding document context fused into image embeddings and decorative images filtered out by an LLM.\n4. Multi-query expansion, then cross-encoder reranking with relevance-threshold cutoffs.\n5. Inline citations rendered automatically, validated by a RAG eval suite.',
		chips: ['Tell me about knowledge graphs', 'What is his current role?', 'Contact info']
	},
	{
		keys: ['graph', 'neo4j', 'knowledge', 'autoschema'],
		answer:
			'**Knowledge graphs**\n\nRam built an AutoSchema Extraction pipeline that parses unstructured clinical documents and structures them into Neo4j graphs, then enabled hybrid vector + graph retrieval so semantic similarity and explicit clinical relationships answer the same query together. It also powers in-XR anatomy Q&A inside AnatomyXR.',
		chips: ['Tell me about AnatomyXR', 'What about evaluation?', 'Show projects']
	},
	{
		keys: ['metamix', 'previous', 'xr', 'unity', 'anatomyxr', 'medvisor', 'medical'],
		answer:
			'**Metamix Technologies — Team Lead, Unity/XR & AI/LLM (Jun 2023 – Feb 2026)**\n\nLed Unity + AI development for four medical XR products: AnatomyXR, Medvisor, BirthXR, and LivXR. Built RAG and GraphRAG pipelines with OpenAI API, LangChain, and Neo4j for medical knowledge retrieval, plus an LLM quiz generator grounded in the knowledge base. Worked directly with doctors and researchers.',
		chips: ['What is his current role?', 'Show me projects', 'Skills and stack']
	},
	{
		keys: ['skill', 'stack', 'tech', 'tool', 'language', 'python'],
		answer:
			'**Core stack**\n\n· LLM/agentic: RAG, multimodal RAG, GraphRAG, multi-agent orchestration\n· Retrieval: hybrid BM25 + vector, multi-query expansion, cross-encoder reranking\n· Frameworks: LangChain, PyTorch, Hugging Face, OpenAI API\n· Data: Weaviate, Pinecone, FAISS, Neo4j, SQL\n· Languages: Python, C# (advanced), C++, JavaScript\n· 3D/XR: Unity3D, OpenXR, MRTK, WebGL/Three.js\n· Cloud: Docker, AWS, CI/CD, Linux',
		chips: ['Open the Skills app', 'What about evaluation?', 'Contact info']
	},
	{
		keys: ['eval', 'faithful', 'hallucination', 'reliab', 'quality'],
		answer:
			'**Evaluation & reliability**\n\nEvery retrieval change ships with an eval suite scoring faithfulness, completeness, and citation accuracy. Relevance thresholds cut low-confidence matches instead of letting the model improvise. He also fixed a critical vector-DB schema bug that was causing silent retrieval failures in production.',
		chips: ['How does the multimodal RAG work?', 'Show experience', 'Contact info']
	},
	{
		keys: ['contact', 'email', 'hire', 'reach', 'phone', 'linkedin'],
		answer: `**Get in touch**\n\n· Email: ${profile.email}\n· Phone: ${profile.phone}\n· LinkedIn: ${profile.linkedinLabel}\n\nHe is ${profile.availability.toLowerCase()}.`,
		chips: ['Open Contact app', 'Download the resume', 'What is his current role?']
	},
	{
		keys: ['education', 'degree', 'college', 'nit'],
		answer: '**Education**\n\nB.Tech in Chemical Engineering from the National Institute of Technology, Srinagar (2014–2018), CGPA 7.41 — then a self-taught path into gameplay AI, XR, and production LLM systems.',
		chips: ['Show experience', 'Skills and stack', 'Contact info']
	},
	{
		keys: ['project', 'built', 'portfolio', 'work'],
		answer:
			'**Selected projects**\n\n1. Multimodal Enterprise RAG Platform (Futureverse) — flagship.\n2. AnatomyXR — immersive anatomy learning with an AI tutor.\n3. Medical Knowledge Graph System — AutoSchema + hybrid retrieval.\n4. Medvisor — mixed reality surgical AI assistance.\n\nAlso: BirthXR, LivXR, Zombie Runner, Realm Rush.',
		chips: ['Tell me about AnatomyXR', 'Open the Projects app', 'Contact info']
	},
	{
		keys: ['resume', 'cv', 'download'],
		answer: '**Resume**\n\nThe full PDF is on this desktop — open the Resume app, or grab it directly from the Downloads folder in File Explorer.',
		chips: ['Open Resume', 'Contact info', 'Skills and stack']
	}
];

const assistantGreeting = {
	answer: `Hi — I'm the assistant for **${profile.name}**'s desktop.\n\nAsk me about his work as an **${profile.title}** at **Futureverse**, the multimodal RAG platform, knowledge graphs, medical XR at Metamix, or how to get in touch.`,
	chips: ['What is his current role?', 'How does the multimodal RAG work?', 'What did he do at Metamix?', 'Skills and stack', 'Contact info']
};

const assistantFallback = {
	answer:
		"I don't have a scripted answer for that one. Try asking about the multimodal RAG platform, knowledge graphs and Neo4j, the medical XR work at Metamix, his tech stack, evaluation practices, or contact details.",
	chips: ['What is his current role?', 'Show projects', 'Skills and stack', 'Contact info']
};

window.PORTFOLIO = {
	profile,
	focusAreas,
	experience,
	projects,
	alsoBuilt,
	skills,
	education,
	assistant: { intents: assistantIntents, greeting: assistantGreeting, fallback: assistantFallback }
};
