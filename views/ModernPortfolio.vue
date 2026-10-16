<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
import FutureOrbit from '@/templates/FutureOrbit.vue'
import { useWindowsStore } from '@/stores/windows'

const windowsStore = useWindowsStore()
const portfolio = ref(null)
const terminalScreen = ref(null)
const progress = ref(0)
const activeSection = ref('hero-sec')
const motionEnabled = ref(true)
const navigation = [
  ['about-sec', 'About'], ['jcpc-sec', 'JCPC Honors'], ['projects-sec', 'Projects'],
  ['skills-sec', 'Skills'], ['terminal-sec', 'Terminal'], ['contact-sec', 'Contact']
]
let revealObserver
let motionPreference
let scrollFrame = 0

const updateScroll = () => {
  if (scrollFrame) return
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = 0
    const root = portfolio.value
    if (!root) return
    const distance = root.scrollHeight - root.clientHeight
    progress.value = distance > 0 ? root.scrollTop / distance : 0
    const threshold = root.getBoundingClientRect().top + 180
    let current = 'hero-sec'
    root.querySelectorAll('section[id]').forEach(section => {
      if (section.getBoundingClientRect().top <= threshold) current = section.id
    })
    activeSection.value = current
  })
}

const lightCard = event => {
  if (!motionEnabled.value || event.pointerType === 'touch') return
  const card = event.target.closest('.project-box, .jcpc-card, .skill-group, .contact-box, .metric-item')
  if (!card) return
  const bounds = card.getBoundingClientRect()
  card.style.setProperty('--light-x', `${event.clientX - bounds.left}px`)
  card.style.setProperty('--light-y', `${event.clientY - bounds.top}px`)
}

const syncMotion = () => { motionEnabled.value = !motionPreference.matches }
onMounted(() => {
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  syncMotion()
  motionPreference.addEventListener('change', syncMotion)
  if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver.unobserve(entry.target)
        }
      })
    }, { root: portfolio.value, threshold: 0.08 })
    portfolio.value.querySelectorAll('.content-block > *, .metric-item').forEach((element, index) => {
      element.classList.add('scroll-reveal')
      element.style.setProperty('--reveal-delay', `${index % 4 * 70}ms`)
      revealObserver.observe(element)
    })
  }
  updateScroll()
})
onBeforeUnmount(() => {
  revealObserver?.disconnect()
  motionPreference?.removeEventListener('change', syncMotion)
  cancelAnimationFrame(scrollFrame)
})

// Active category filter for projects
const activeFilter = ref('all')

// Selected certificate for JCPC modal preview
const selectedCert = ref(null)

// Interactive Terminal State
const terminalHistory = ref([
  { type: 'system', text: 'Othman Linux/Matrix Terminal [Kernel 2026.10-green] initialized.' },
  { type: 'system', text: 'Type "help" to list available commands, or "1995" to return to Windows 95.' }
])
const terminalInput = ref('')

const handleTerminalCommand = async () => {
  const cmd = terminalInput.value.trim().toLowerCase()
  if (!cmd) return

  terminalHistory.value.push({ type: 'user', text: `othman@dev:~$ ${terminalInput.value}` })

  if (cmd === 'help') {
    terminalHistory.value.push({
      type: 'output',
      text: 'Available commands:\n• jcpc      : View JCPC & competitive programming ranks\n• projects  : List all software engineering projects\n• skills    : Show tech stack (.NET, Flutter, C++)\n• about     : Read bio & engineering background\n• contact   : Get in touch & social links\n• 1995      : Return to Windows 95 retro mode\n• clear     : Clear terminal output'
    })
  } else if (cmd === 'jcpc' || cmd === 'icpc') {
    terminalHistory.value.push({
      type: 'output',
      text: 'JCPC Achievements:\n- Ranked 12th & 13th nationally in Jordanian Collegiate Programming Contest (JCPC 2023, 2024)\n- 2nd & 3rd Place in ACM JU Mini Contests (University of Jordan)\n- 5-hour algorithm contests in C++ (Graphs, Dynamic Programming, Math)'
    })
  } else if (cmd === 'projects') {
    terminalHistory.value.push({
      type: 'output',
      text: '1. Enterprise Risk Management (.NET Core / React)\n2. QM Enterprise Backend Core (C# / EF Core)\n3. E-Gov Reporting Mobile App (Flutter / Firebase)\n4. Campus Compass (React / Supabase)\n5. Local Hybrid Search RAG (Python / FastAPI / ChromaDB)\n6. Local RAG FastAPI (Python / Ollama)\n7. Gymini Fitness Coach (Flutter)\n8. JoWardrobe Marketplace (Flutter)\n9. JavaFX Desktop Drawing App (Java)\n10. Project HCI'
    })
  } else if (cmd === 'skills') {
    terminalHistory.value.push({
      type: 'output',
      text: 'Backend: C#, ASP.NET Core, EF Core, SQL Server, REST APIs, JWT\nMobile: Flutter, Dart, Bloc, Provider, Firebase\nCore: C++, Data Structures, Algorithms, Git'
    })
  } else if (cmd === 'about') {
    terminalHistory.value.push({
      type: 'output',
      text: 'Othman Qwakneh — Web & Mobile Software Engineer graduated from the University of Jordan. Specializes in ASP.NET Core backends & Flutter cross-platform applications.'
    })
  } else if (cmd === 'contact') {
    terminalHistory.value.push({
      type: 'output',
      text: 'LinkedIn: linkedin.com/in/othman-qwakneh-601b2025b/\nGitHub: github.com/ossmanGR45\nTwitter: x.com/OthmanQwakneh\nInstagram: instagram.com/othmanqwakneh/'
    })
  } else if (cmd === '1995' || cmd === 'retro' || cmd === 'back') {
    returnTo1995()
  } else if (cmd === 'clear') {
    terminalHistory.value = []
  } else {
    terminalHistory.value.push({
      type: 'error',
      text: `Command not recognized: "${cmd}". Type "help" to see options.`
    })
  }

  terminalInput.value = ''
  await nextTick()
  terminalScreen.value?.scrollTo({ top: terminalScreen.value.scrollHeight, behavior: motionEnabled.value ? 'smooth' : 'instant' })
}

const returnTo1995 = () => {
  windowsStore.triggerTimeWarp('past')
}

const scrollTo = (id) => {
  if (id === 'hero-sec') {
    portfolio.value?.scrollTo({ top: 0, behavior: motionEnabled.value ? 'smooth' : 'instant' })
    return
  }
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: motionEnabled.value ? 'smooth' : 'instant', block: 'start' })
  }
}

// Complete list of all Othman's projects
const allProjects = [
  {
    id: 1,
    title: 'Enterprise Risk Management System',
    category: 'fullstack',
    badge: 'Enterprise System',
    desc: 'Full-cycle enterprise decision-support platform engineered for the University of Jordan. Implements multi-stage role-based approval workflows (RBAC), real-time risk score computation, and interactive 5×5 heat-map matrix visualizations.',
    tags: ['ASP.NET Core', 'C#', 'React', 'REST APIs', 'SQL Server', 'Heatmap'],
    repoUrl: 'https://github.com/ossmanGR45/final-integrated-Risk-mangement-system'
  },
  {
    id: 2,
    title: 'QM Enterprise Backend Core',
    category: 'fullstack',
    badge: 'Backend Architecture',
    desc: 'The robust, scalable backend core powering enterprise risk calculations and institutional data pipelines. Implements Clean Architecture, Entity Framework Core migrations, relational schemas, and secure tokenized authentication.',
    tags: ['C#', 'ASP.NET Core', 'Entity Framework Core', 'Clean Architecture', 'SQL Server'],
    repoUrl: 'https://github.com/ossmanGR45/QM'
  },
  {
    id: 3,
    title: 'E-Government Issue Reporting App',
    category: 'mobile',
    badge: 'Civic Mobile App',
    desc: 'Cross-platform mobile application built with Flutter enabling municipal citizens to seamlessly submit infrastructure grievances with photo attachments and geo-location tracking. Features real-time state synchronization via Firebase.',
    tags: ['Flutter', 'Dart', 'Firebase', 'Cloud Functions', 'Live Tracking'],
    repoUrl: 'https://github.com/ossmanGR45/reporting'
  },
  {
    id: 4,
    title: 'Campus Compass',
    category: 'fullstack',
    badge: 'Web Portal',
    desc: 'Modern university campus navigation, facility locator, and student portal. Built with React 18, TypeScript, and Supabase for cloud authentication, real-time database queries, and optimistic UI updates.',
    tags: ['React 18', 'TypeScript', 'Supabase', 'TanStack Query', 'Radix UI'],
    repoUrl: 'https://github.com/ossmanGR45/campus-compass'
  },
  {
    id: 5,
    title: 'Local Hybrid Search RAG Pipeline',
    category: 'ai',
    badge: 'Offline AI Pipeline',
    desc: 'Privacy-first, 100% offline Retrieval-Augmented Generation pipeline. Fuses dense semantic vector search (ChromaDB) with sparse keyword retrieval (BM25) via Reciprocal Rank Fusion (RRF), running locally on Ollama LLMs with FastAPI.',
    tags: ['Python', 'FastAPI', 'ChromaDB', 'BM25', 'Ollama', 'RRF Hybrid Search'],
    repoUrl: 'https://github.com/ossmanGR45/local-hybrid-rag'
  },
  {
    id: 6,
    title: 'Local RAG FastAPI Service',
    category: 'ai',
    badge: 'AI API Service',
    desc: 'Asynchronous FastAPI service for local document chunking, embeddings storage, and context retrieval. Enables private, on-premise generative question answering with zero external cloud dependencies.',
    tags: ['Python', 'FastAPI', 'LangChain', 'Ollama', 'Vector Embeddings'],
    repoUrl: 'https://github.com/ossmanGR45/local-rag-fastapi'
  },
  {
    id: 7,
    title: 'Gymini Personal Training App',
    category: 'mobile',
    badge: 'Mobile Fitness',
    desc: 'Flutter-based coaching and fitness management platform designed to streamline workout scheduling, client communication, and progress metric tracking for personal trainers.',
    tags: ['Flutter', 'Dart', 'State Management', 'Mobile UX', 'Fitness Metrics'],
    repoUrl: 'https://github.com/ossmanGR45'
  },
  {
    id: 8,
    title: 'JoWardrobe Mobile Marketplace',
    category: 'mobile',
    badge: 'E-Commerce',
    desc: 'Mobile marketplace application planned and designed for Jordanian clothing retailers, connecting local apparel shops with consumers to empower domestic businesses.',
    tags: ['Flutter', 'Dart', 'E-Commerce', 'Mobile Marketplace', 'Retail UI'],
    repoUrl: 'https://github.com/ossmanGR45'
  },
  {
    id: 9,
    title: 'JavaFX Interactive Drawing App',
    category: 'systems',
    badge: 'Desktop OOP',
    desc: 'Interactive desktop sketchpad built in Java and JavaFX demonstrating Object-Oriented Programming (OOP) paradigms, custom canvas event listeners, vector brush tools, and clean separation of scene graphs.',
    tags: ['Java', 'JavaFX', 'OOP Architecture', 'Event-Driven GUI', 'Canvas API'],
    repoUrl: 'https://github.com/ossmanGR45/drawing-in-javafx'
  },
  {
    id: 10,
    title: 'Project HCI',
    category: 'systems',
    badge: 'Human-Computer Interaction',
    desc: 'Academic project focusing on user experience principles, cognitive interaction models, accessibility guidelines, and usability testing methodologies.',
    tags: ['HCI', 'Interface Design', 'Usability Testing', 'Cognitive Ergonomics'],
    repoUrl: 'https://github.com/ossmanGR45/projectHCI'
  }
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return allProjects
  return allProjects.filter(p => p.category === activeFilter.value)
})
</script>

<template>
  <div ref="portfolio" class="green-portfolio" :class="{ 'motion-off': !motionEnabled }" @scroll.passive="updateScroll" @pointermove.passive="lightCard">
    <div class="ambient-field" aria-hidden="true"><div class="ambient-orb"></div></div>
    <div class="reading-progress" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true"></div>
    <!-- Top Matrix Green Header -->
    <header class="site-header">
      <div class="header-inner">
        <a class="brand" href="#hero-sec" @click.prevent="scrollTo('hero-sec')">
          <div class="brand-glyph">OQ<span>_</span></div>
          <div>
            <div class="brand-title">Othman Qwakneh</div>
            <div class="brand-sub">ENGINEERING PORTFOLIO // 2026</div>
          </div>
        </a>

        <nav class="nav-menu" aria-label="Portfolio sections">
          <a v-for="[id, label] in navigation" :key="id" :href="`#${id}`" :aria-current="activeSection === id ? 'location' : undefined" @click.prevent="scrollTo(id)">{{ label }}</a>
        </nav>

        <div class="header-actions">
          <button class="motion-toggle" :aria-pressed="motionEnabled" @click="motionEnabled = !motionEnabled">Motion {{ motionEnabled ? 'on' : 'off' }}</button>
          <a 
            :href="`${useRuntimeConfig().app.baseURL}files/resume.pdf`" 
            target="_blank" 
            class="btn-resume"
          >
            Résumé PDF ↗
          </a>
          <button class="btn-retro" @click="returnTo1995" title="Rewind back to Windows 95">
            ⏪ Return to 1995
          </button>
        </div>
      </div>
    </header>

    <div class="main-body">
      <!-- HERO SECTION -->
      <section id="hero-sec" class="hero-block">
        <div class="arrival-label"><span>1995</span><span class="arrival-line"></span><span>2026 / ARRIVAL CONFIRMED</span></div>
        <div class="hero-layout">
        <div class="hero-copy">
        <div class="status-chip">
          <span class="status-pulse"></span>
          <span>SOFTWARE ENGINEER • ASP.NET CORE &amp; FLUTTER • DUAL JCPC FINALIST</span>
        </div>

        <h1 class="hero-headline">
          Built with logic.<br />
          <span class="highlight-green">Made for what’s next.</span>
        </h1>

        <p class="hero-summary">
          I am a <b>Web &amp; Mobile Software Engineer</b> specialized in architecting robust enterprise backends with 
          <b>C# (ASP.NET Core)</b> and fluid cross-platform applications with <b>Dart (Flutter)</b>. 
          A dual competitive programming finalist in the <b>Jordanian Collegiate Programming Contest (JCPC)</b>, graduated from the 
          <b>University of Jordan</b> with a passion for software mechanics, system design, and algorithmic optimization.
        </p>

        <div class="hero-buttons">
          <button class="btn-primary" @click="scrollTo('projects-sec')">
            View All Projects (10)
          </button>
          <button class="btn-accent" @click="scrollTo('jcpc-sec')">
            🏆 JCPC Championship Ranks
          </button>
          <button class="btn-outline" @click="scrollTo('contact-sec')">
            Get In Touch
          </button>
          <button class="btn-time-rewind" @click="returnTo1995">
            ⏪ Back to 1995
          </button>
        </div>

        </div>
        <FutureOrbit :motion-enabled="motionEnabled" />
        </div>
        <button class="explore-cue" @click="scrollTo('jcpc-sec')"><span>↓</span> SCROLL TO EXPLORE <span class="explore-coordinates">AMMAN, JO / 31.95° N</span></button>

        <!-- Key Metrics Strip -->
        <div class="metrics-strip">
          <div class="metric-item">
            <div class="metric-val">12th &amp; 13th</div>
            <div class="metric-title">JCPC Championship</div>
            <div class="metric-desc">Nationally across Jordanian Universities</div>
          </div>
          <div class="metric-item">
            <div class="metric-val">2nd &amp; 3rd</div>
            <div class="metric-title">ACM JU Podium Finishes</div>
            <div class="metric-desc">University of Jordan Mini Contests</div>
          </div>
          <div class="metric-item">
            <div class="metric-val">10+</div>
            <div class="metric-title">Production Projects</div>
            <div class="metric-desc">.NET, Flutter, AI, Java &amp; Systems</div>
          </div>
          <div class="metric-item">
            <div class="metric-val">Amman 📍</div>
            <div class="metric-title">University of Jordan</div>
            <div class="metric-desc">Software Engineering Foundations</div>
          </div>
        </div>
      </section>

      <!-- DEDICATED JCPC & COMPETITIVE PROGRAMMING SECTION -->
      <section id="jcpc-sec" class="content-block jcpc-wrapper">
        <div class="block-tag">COMPETITIVE PROGRAMMING CHAMPIONSHIPS</div>
        <h2 class="block-heading">Jordanian Collegiate Programming Contest (JCPC)</h2>
        <p class="block-subtitle">
          The premier collegiate algorithmic championship in Jordan. Intense 5-hour timed battles testing advanced data structures, 
          graph algorithms, dynamic programming, number theory, and computational geometry under strict memory and time constraints.
        </p>

        <div class="jcpc-grid">
          <!-- JCPC 2024 Card -->
          <div class="jcpc-card">
            <div class="jcpc-card-header">
              <span class="jcpc-badge">JCPC 2024 CHAMPIONSHIP</span>
              <span class="jcpc-year">Year 2024</span>
            </div>
            <h3 class="jcpc-title">National Finals Contender</h3>
            <p class="jcpc-text">
              Returned to the national championship stage after a full year of rigorous algorithm training, applying advanced dynamic programming, 
              network flow, and segment trees to solve complex competitive programming problem sets under real-time contest pressure.
            </p>
            <div class="cert-box">
              <div class="cert-label">Official Certificate of Participation:</div>
              <img 
                :src="`${useRuntimeConfig().app.baseURL}files/icpc2024_cert.png`" 
                alt="JCPC 2024 Certificate"
                class="cert-img"
                @click="selectedCert = `${useRuntimeConfig().app.baseURL}files/icpc2024_cert.png`"
              />
              <div class="cert-hint">Click image to view full size</div>
            </div>
          </div>

          <!-- JCPC 2023 Card -->
          <div class="jcpc-card">
            <div class="jcpc-card-header">
              <span class="jcpc-badge">JCPC 2023 CHAMPIONSHIP</span>
              <span class="jcpc-year">Year 2023</span>
            </div>
            <h3 class="jcpc-title">National Finals Contender</h3>
            <p class="jcpc-text">
              Competed against top university engineering teams across Jordan. Coordinated algorithmic solutions, rapid problem breakdown, 
              and edge-case debugging in C++ during a grueling 5-hour contest session, securing top placement nationwide.
            </p>
            <div class="cert-box">
              <div class="cert-label">Official Certificate of Participation:</div>
              <img 
                :src="`${useRuntimeConfig().app.baseURL}files/icpc2023_cert.png`" 
                alt="JCPC 2023 Certificate"
                class="cert-img"
                @click="selectedCert = `${useRuntimeConfig().app.baseURL}files/icpc2023_cert.png`"
              />
              <div class="cert-hint">Click image to view full size</div>
            </div>
          </div>
        </div>

        <!-- ACM JU Mini Contests Banner -->
        <div class="acm-banner">
          <div class="acm-content">
            <div class="acm-header">
              <span class="acm-trophy">🏆</span>
              <div>
                <h3 class="acm-title">ACM JU Competitive Mini Contests</h3>
                <div class="acm-sub">University of Jordan Internal Competitive Programming Rounds</div>
              </div>
            </div>
            <p class="acm-desc">
              Demonstrated consistent high performance in individual and team problem-solving rounds at the University of Jordan, 
              achieving <b>2nd Place</b> and <b>3rd Place</b> podium finishes across the 2023 and 2024 contest seasons.
            </p>
            <div class="acm-tags">
              <span class="acm-tag">C++ Standard Library (STL)</span>
              <span class="acm-tag">Graph Theory (Dijkstra, BFS, DFS)</span>
              <span class="acm-tag">Dynamic Programming</span>
              <span class="acm-tag">Combinatorics &amp; Modulo Arithmetic</span>
              <span class="acm-tag">Fast I/O &amp; Complexity Optimization</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ALL PROJECTS SHOWCASE -->
      <section id="projects-sec" class="content-block">
        <div class="block-tag">SOFTWARE PORTFOLIO</div>
        <h2 class="block-heading">Engineered Projects</h2>
        <p class="block-subtitle">Full-cycle enterprise systems, mobile applications, AI pipelines, and algorithmic solutions.</p>

        <!-- Category Filters -->
        <div class="filter-strip">
          <button 
            class="filter-btn" 
            :class="{ active: activeFilter === 'all' }"
            :aria-pressed="activeFilter === 'all'"
            @click="activeFilter = 'all'"
          >
            All Projects (10)
          </button>
          <button 
            class="filter-btn" 
            :class="{ active: activeFilter === 'fullstack' }"
            :aria-pressed="activeFilter === 'fullstack'"
            @click="activeFilter = 'fullstack'"
          >
            Full-Stack &amp; .NET Core
          </button>
          <button 
            class="filter-btn" 
            :class="{ active: activeFilter === 'mobile' }"
            :aria-pressed="activeFilter === 'mobile'"
            @click="activeFilter = 'mobile'"
          >
            Mobile (Flutter)
          </button>
          <button 
            class="filter-btn" 
            :class="{ active: activeFilter === 'ai' }"
            :aria-pressed="activeFilter === 'ai'"
            @click="activeFilter = 'ai'"
          >
            AI &amp; RAG Pipelines
          </button>
          <button 
            class="filter-btn" 
            :class="{ active: activeFilter === 'systems' }"
            :aria-pressed="activeFilter === 'systems'"
            @click="activeFilter = 'systems'"
          >
            Systems &amp; Java
          </button>
        </div>

        <!-- Projects Grid -->
        <p class="project-count" role="status">{{ String(filteredProjects.length).padStart(2, '0') }} / 10 projects in view</p>
        <TransitionGroup name="project" tag="div" class="projects-grid">
          <div 
            v-for="project in filteredProjects"
            :key="project.id" 
            class="project-box"
          >
            <div class="proj-head">
              <span class="proj-badge">{{ project.badge }}</span>
            </div>
            <h3 class="proj-name">{{ project.title }}</h3>
            <p class="proj-desc">{{ project.desc }}</p>

            <div class="proj-tags">
              <span v-for="tag in project.tags" :key="tag" class="proj-tag">
                {{ tag }}
              </span>
            </div>

            <div class="proj-link-row">
              <a :href="project.repoUrl" target="_blank" class="proj-link">
                <span>View Repository</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </TransitionGroup>
      </section>

      <!-- ABOUT & EXPERIENCE -->
      <section id="about-sec" class="content-block">
        <div class="block-tag">BACKGROUND &amp; CAREER</div>
        <h2 class="block-heading">Engineering Background</h2>

        <div class="about-two-col">
          <div class="about-card-clean">
            <h3 class="card-heading">Professional Journey</h3>
            <div class="exp-timeline">
              <div class="exp-item">
                <div class="exp-bullet"></div>
                <div class="exp-role">Software Engineering Intern</div>
                <div class="exp-company">Tulips Technology • Amman, Jordan (2026)</div>
                <p class="exp-summary">
                  Completing technical internship focusing on professional software development practices, agile sprints, full-stack implementations, and production codebases.
                </p>
              </div>

              <div class="exp-item">
                <div class="exp-bullet"></div>
                <div class="exp-role">Bachelor of Science in Software Engineering / CS</div>
                <div class="exp-company">University of Jordan • Amman, Jordan</div>
                <p class="exp-summary">
                  Graduated with a strong foundation in low-level systems (C++), Object-Oriented Design, data structures, algorithms, database management, and distributed architectures.
                </p>
              </div>
            </div>
          </div>

          <div class="about-card-clean">
            <h3 class="card-heading">Engineering Approach</h3>
            <ul class="clean-list">
              <li>
                <span class="list-num">01</span>
                <div>
                  <strong>Architectural Clarity:</strong> Building layered, modular backends with Clean Architecture, CQRS patterns, and maintainable dependency injection in ASP.NET Core.
                </div>
              </li>
              <li>
                <span class="list-num">02</span>
                <div>
                  <strong>Algorithmic Thinking:</strong> Leveraging thousands of hours of competitive programming practice to solve performance bottlenecks and design optimal data flows.
                </div>
              </li>
              <li>
                <span class="list-num">03</span>
                <div>
                  <strong>Cross-Platform Precision:</strong> Engineering reactive, polished user experiences in Flutter with predictable state machines (Bloc/Provider).
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- TECHNICAL SKILLS -->
      <section id="skills-sec" class="content-block">
        <div class="block-tag">TECHNICAL TOOLING</div>
        <h2 class="block-heading">Skill Proficiency</h2>

        <div class="skills-three-col">
          <div class="skill-group">
            <div class="skill-group-head">
              <span class="group-icon">💻</span>
              <h3 class="group-name">Backend &amp; Cloud</h3>
            </div>
            <ul class="skill-row-list">
              <li><span>C# (.NET Core)</span> <span class="pill-green">Primary</span></li>
              <li><span>ASP.NET Core Web API</span> <span class="pill-green">Primary</span></li>
              <li><span>Entity Framework Core</span> <span class="pill-green">Proficient</span></li>
              <li><span>SQL Server &amp; Relational Schemas</span> <span class="pill-green">Proficient</span></li>
              <li><span>Role-Based Access Control (RBAC)</span> <span class="pill-green">Proficient</span></li>
              <li><span>RESTful API Design &amp; JWT</span> <span class="pill-green">Proficient</span></li>
            </ul>
          </div>

          <div class="skill-group">
            <div class="skill-group-head">
              <span class="group-icon">📱</span>
              <h3 class="group-name">Mobile &amp; Frontend</h3>
            </div>
            <ul class="skill-row-list">
              <li><span>Flutter &amp; Dart</span> <span class="pill-green">Primary</span></li>
              <li><span>Bloc &amp; Provider State Mgmt</span> <span class="pill-green">Primary</span></li>
              <li><span>React &amp; TypeScript</span> <span class="pill-green">Proficient</span></li>
              <li><span>Firebase Suite (Auth, Firestore)</span> <span class="pill-green">Proficient</span></li>
              <li><span>Supabase Integration</span> <span class="pill-green">Proficient</span></li>
              <li><span>Responsive CSS3 &amp; Web Standards</span> <span class="pill-green">Proficient</span></li>
            </ul>
          </div>

          <div class="skill-group">
            <div class="skill-group-head">
              <span class="group-icon">⚡</span>
              <h3 class="group-name">Algorithms &amp; Systems</h3>
            </div>
            <ul class="skill-row-list">
              <li><span>C++ &amp; Standard Template Library</span> <span class="pill-green">Competitive</span></li>
              <li><span>Advanced Graph Algorithms</span> <span class="pill-green">Competitive</span></li>
              <li><span>Dynamic Programming (DP)</span> <span class="pill-green">Competitive</span></li>
              <li><span>Python &amp; FastAPI</span> <span class="pill-green">Proficient</span></li>
              <li><span>Java &amp; JavaFX</span> <span class="pill-green">Proficient</span></li>
              <li><span>Git Version Control &amp; Agile</span> <span class="pill-green">Proficient</span></li>
            </ul>
          </div>
        </div>
      </section>

      <!-- TERMINAL SECTION -->
      <section id="terminal-sec" class="content-block">
        <div class="block-tag">INTERACTIVE SHELL</div>
        <h2 class="block-heading">Green Matrix Terminal</h2>
        <p class="block-subtitle">Query Othman's profile, projects, or achievements via command line.</p>

        <div class="term-box">
          <div class="term-bar">
            <div class="term-indicator"></div>
            <div class="term-title">othman@green-terminal:~ (2026.10)</div>
          </div>
          <div ref="terminalScreen" class="term-screen" role="log" aria-live="polite" aria-label="Terminal output">
            <div v-for="(entry, idx) in terminalHistory" :key="idx" class="term-line" :class="entry.type">
              {{ entry.text }}
            </div>
          </div>
          <form @submit.prevent="handleTerminalCommand" class="term-form">
            <span class="term-ps1">othman@dev:~$</span>
            <input 
              v-model="terminalInput" 
              type="text" 
              class="term-input" 
              placeholder="Type 'jcpc', 'projects', 'skills', or '1995'..."
              autocomplete="off"
              aria-label="Terminal command"
            />
          </form>
        </div>
      </section>

      <!-- CONTACT SECTION -->
      <section id="contact-sec" class="content-block">
        <div class="block-tag">GET IN TOUCH</div>
        <h2 class="block-heading">Contact &amp; Profiles</h2>
        <p class="block-subtitle">Open to software engineering roles, high-impact projects, and technical discussions.</p>

        <div class="contacts-grid">
          <a href="https://www.linkedin.com/in/othman-qwakneh-601b2025b/" target="_blank" class="contact-box">
            <span class="contact-symbol">💼</span>
            <div class="contact-info">
              <div class="contact-platform">LinkedIn</div>
              <div class="contact-handle">Othman Qwakneh ↗</div>
            </div>
          </a>

          <a href="https://github.com/ossmanGR45" target="_blank" class="contact-box">
            <span class="contact-symbol">🐙</span>
            <div class="contact-info">
              <div class="contact-platform">GitHub</div>
              <div class="contact-handle">@ossmanGR45 ↗</div>
            </div>
          </a>

          <a href="https://x.com/OthmanQwakneh" target="_blank" class="contact-box">
            <span class="contact-symbol">🐦</span>
            <div class="contact-info">
              <div class="contact-platform">Twitter / X</div>
              <div class="contact-handle">@OthmanQwakneh ↗</div>
            </div>
          </a>

          <a href="https://www.instagram.com/othmanqwakneh/" target="_blank" class="contact-box">
            <span class="contact-symbol">📸</span>
            <div class="contact-info">
              <div class="contact-platform">Instagram</div>
              <div class="contact-handle">@othmanqwakneh ↗</div>
            </div>
          </a>
        </div>
      </section>
    </div>

    <!-- Footer -->
    <footer class="site-footer">
      <div class="footer-inner">
        <div>© 2026 Othman Qwakneh • Software Engineer</div>
        <button class="footer-rewind-btn" @click="returnTo1995">
          ⏪ Time Machine: Return to Windows 95
        </button>
      </div>
    </footer>

    <!-- Persistent Floating Return Button -->
    <button class="floating-dock-btn" @click="returnTo1995" title="Take me back to 1995!">
      <span class="dock-icon">⏪</span>
      <span class="dock-label">Return to 1995</span>
    </button>

    <!-- Certificate Full Size Modal -->
    <div v-if="selectedCert" class="cert-modal-backdrop" @click="selectedCert = null">
      <div class="cert-modal-box" @click.stop>
        <div class="cert-modal-head">
          <span>Official JCPC Certificate</span>
          <button class="cert-close-btn" @click="selectedCert = null">✕</button>
        </div>
        <img :src="selectedCert" class="cert-modal-img" alt="JCPC Certificate Preview" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* PURE BESPOKE GREEN STYLES - ZERO BASE LIBRARY DEPENDENCIES */
.green-portfolio {
  position: fixed;
  inset: 0;
  z-index: 100000;
  background-color: #070d0a;
  color: #ecfdf5;
  overflow-y: auto;
  overflow-x: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  scroll-behavior: smooth;
  user-select: text;
  line-height: 1.5;
}

/* Header */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(7, 13, 10, 0.94);
  border-bottom: 1px solid rgba(16, 185, 129, 0.2);
  backdrop-filter: blur(12px);
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.brand-glyph {
  font-size: 18px;
}

.brand-title {
  font-weight: 800;
  font-size: 16px;
  color: #ffffff;
  letter-spacing: -0.3px;
}

.brand-sub {
  font-size: 10px;
  font-weight: 700;
  color: #10b981;
  letter-spacing: 1.5px;
}

.nav-menu {
  display: flex;
  gap: 24px;
}

.nav-menu a {
  color: #94a39d;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.15s;
}

.nav-menu a:hover {
  color: #34d399;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-resume {
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.35);
  color: #34d399;
  padding: 7px 14px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-resume:hover {
  background: rgba(16, 185, 129, 0.25);
  border-color: #10b981;
}

.btn-retro {
  background: #064e3b;
  border: 1px solid #10b981;
  color: #ecfdf5;
  padding: 7px 14px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-retro:hover {
  background: #047857;
}

/* Main Body Container */
.main-body {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 80px 24px;
}

/* Hero */
.hero-block {
  padding: 80px 0 60px 0;
}

.status-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.4);
  color: #34d399;
  padding: 6px 14px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.2px;
  margin-bottom: 24px;
}

.status-pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
}

.hero-headline {
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 900;
  line-height: 1.15;
  color: #ffffff;
  letter-spacing: -1px;
  margin: 0 0 20px 0;
  max-width: 950px;
}

.highlight-green {
  color: #10b981;
}

.hero-summary {
  font-size: 17px;
  color: #94a39d;
  line-height: 1.7;
  max-width: 840px;
  margin: 0 0 32px 0;
}

.hero-summary b {
  color: #ecfdf5;
}

.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 48px;
}

.btn-primary {
  background: #10b981;
  color: #022c22;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 800;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-primary:hover {
  background: #34d399;
}

.btn-accent {
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid #10b981;
  color: #34d399;
  padding: 12px 20px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-accent:hover {
  background: rgba(16, 185, 129, 0.28);
}

.btn-outline {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #d1fae5;
  padding: 12px 20px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.15s;
}

.btn-outline:hover {
  border-color: rgba(255, 255, 255, 0.4);
}

.btn-time-rewind {
  background: rgba(6, 78, 59, 0.4);
  border: 1px dashed rgba(16, 185, 129, 0.6);
  color: #6ee7b7;
  padding: 12px 18px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-time-rewind:hover {
  background: rgba(6, 78, 59, 0.8);
  border-style: solid;
}

/* Metrics Strip */
.metrics-strip {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  border-top: 1px solid rgba(16, 185, 129, 0.2);
  padding-top: 32px;
}

.metric-item {
  background: #0c1611;
  border: 1px solid rgba(16, 185, 129, 0.15);
  padding: 20px;
  border-radius: 8px;
}

.metric-val {
  font-size: 28px;
  font-weight: 900;
  color: #10b981;
  margin-bottom: 4px;
}

.metric-title {
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
}

.metric-desc {
  font-size: 12px;
  color: #6ee7b7;
  margin-top: 2px;
}

/* Content Blocks */
.content-block {
  padding: 60px 0;
  border-top: 1px solid rgba(16, 185, 129, 0.12);
}

.block-tag {
  color: #10b981;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 8px;
}

.block-heading {
  font-size: clamp(26px, 3.5vw, 36px);
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 10px 0;
}

.block-subtitle {
  font-size: 15px;
  color: #94a39d;
  max-width: 780px;
  margin: 0 0 36px 0;
  line-height: 1.6;
}

/* JCPC Section */
.jcpc-wrapper {
  background: rgba(6, 78, 59, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 12px;
  padding: 40px 32px;
  margin-bottom: 40px;
}

.jcpc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.jcpc-card {
  background: #0d1913;
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.jcpc-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.jcpc-badge {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  font-size: 11px;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 4px;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.jcpc-year {
  font-size: 12px;
  color: #6ee7b7;
  font-weight: 600;
}

.jcpc-title {
  font-size: 18px;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 10px 0;
}

.jcpc-text {
  font-size: 13px;
  color: #94a39d;
  line-height: 1.6;
  margin-bottom: 20px;
}

.cert-box {
  margin-top: auto;
  border-top: 1px solid rgba(16, 185, 129, 0.15);
  padding-top: 16px;
}

.cert-label {
  font-size: 11px;
  font-weight: 700;
  color: #34d399;
  margin-bottom: 8px;
}

.cert-img {
  width: 100%;
  height: 180px;
  object-fit: contain;
  background: #06110a;
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.2s, border-color 0.2s;
}

.cert-img:hover {
  transform: scale(1.02);
  border-color: #10b981;
}

.cert-hint {
  font-size: 10px;
  color: #5d7065;
  text-align: center;
  margin-top: 4px;
}

/* ACM Banner */
.acm-banner {
  background: #0c1811;
  border: 1px solid #10b981;
  border-radius: 8px;
  padding: 24px;
}

.acm-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 12px;
}

.acm-trophy {
  font-size: 28px;
}

.acm-title {
  font-size: 18px;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
}

.acm-sub {
  font-size: 12px;
  color: #34d399;
}

.acm-desc {
  font-size: 14px;
  color: #94a39d;
  line-height: 1.6;
  margin: 0 0 16px 0;
}

.acm-desc b {
  color: #34d399;
}

.acm-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.acm-tag {
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #d1fae5;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 4px;
}

/* Projects Filters & Grid */
.filter-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
}

.filter-btn {
  background: #0c1611;
  border: 1px solid rgba(16, 185, 129, 0.2);
  color: #94a39d;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.filter-btn.active, .filter-btn:hover {
  background: rgba(16, 185, 129, 0.18);
  border-color: #10b981;
  color: #34d399;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
}

.project-box {
  background: #0c1711;
  border: 1px solid rgba(16, 185, 129, 0.18);
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  transition: border-color 0.2s;
}

.project-box:hover {
  border-color: #10b981;
}

.proj-head {
  margin-bottom: 12px;
}

.proj-badge {
  background: rgba(16, 185, 129, 0.12);
  color: #34d399;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.proj-name {
  font-size: 18px;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 10px 0;
}

.proj-desc {
  font-size: 13px;
  color: #94a39d;
  line-height: 1.6;
  margin: 0 0 16px 0;
  flex-grow: 1;
}

.proj-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 18px;
}

.proj-tag {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #cbd5e1;
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 4px;
}

.proj-link-row {
  border-top: 1px solid rgba(16, 185, 129, 0.12);
  padding-top: 12px;
}

.proj-link {
  color: #34d399;
  text-decoration: none;
  font-size: 13px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.proj-link:hover {
  text-decoration: underline;
}

/* About Two Columns */
.about-two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 800px) {
  .about-two-col {
    grid-template-columns: 1fr;
  }
}

.about-card-clean {
  background: #0c1611;
  border: 1px solid rgba(16, 185, 129, 0.18);
  border-radius: 8px;
  padding: 28px;
}

.card-heading {
  font-size: 18px;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 20px 0;
}

.exp-timeline {
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-left: 2px solid rgba(16, 185, 129, 0.3);
  padding-left: 18px;
  margin-left: 6px;
}

.exp-item {
  position: relative;
}

.exp-bullet {
  position: absolute;
  left: -24px;
  top: 4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #10b981;
}

.exp-role {
  font-weight: 700;
  font-size: 15px;
  color: #ffffff;
}

.exp-company {
  font-size: 12px;
  color: #34d399;
  margin-bottom: 6px;
}

.exp-summary {
  font-size: 13px;
  color: #94a39d;
  line-height: 1.5;
  margin: 0;
}

.clean-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.clean-list li {
  display: flex;
  gap: 12px;
  font-size: 14px;
  color: #94a39d;
  line-height: 1.5;
}

.clean-list strong {
  color: #ecfdf5;
}

.list-num {
  color: #10b981;
  font-weight: 800;
}

/* Skills Three Columns */
.skills-three-col {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.skill-group {
  background: #0c1611;
  border: 1px solid rgba(16, 185, 129, 0.18);
  border-radius: 8px;
  padding: 24px;
}

.skill-group-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}

.group-icon {
  font-size: 20px;
}

.group-name {
  font-size: 16px;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
}

.skill-row-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skill-row-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 13px;
  color: #d1fae5;
}

.pill-green {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
}

/* Terminal */
.term-box {
  background: #08110b;
  border: 1px solid #10b981;
  border-radius: 8px;
  overflow: hidden;
}

.term-bar {
  background: #0d1a12;
  padding: 8px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid rgba(16, 185, 129, 0.2);
}

.term-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
}

.term-title {
  font-size: 12px;
  color: #6ee7b7;
  font-family: monospace;
}

.term-screen {
  padding: 16px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 13px;
  line-height: 1.6;
  max-height: 240px;
  overflow-y: auto;
}

.term-line.system { color: #5d7065; }
.term-line.user { color: #6ee7b7; font-weight: bold; }
.term-line.output { color: #34d399; white-space: pre-wrap; }
.term-line.error { color: #f87171; }

.term-form {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background: #060e09;
  border-top: 1px solid rgba(16, 185, 129, 0.2);
}

.term-ps1 {
  color: #10b981;
  font-family: monospace;
  font-size: 13px;
  font-weight: bold;
  margin-right: 8px;
}

.term-input {
  background: transparent;
  border: none;
  outline: none;
  color: #ffffff;
  font-family: monospace;
  font-size: 13px;
  flex-grow: 1;
}

/* Contacts */
.contacts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.contact-box {
  background: #0c1611;
  border: 1px solid rgba(16, 185, 129, 0.18);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  transition: border-color 0.15s;
}

.contact-box:hover {
  border-color: #10b981;
}

.contact-symbol {
  font-size: 24px;
}

.contact-platform {
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
}

.contact-handle {
  font-size: 12px;
  color: #34d399;
}

/* Footer */
.site-footer {
  border-top: 1px solid rgba(16, 185, 129, 0.2);
  padding: 24px;
  background: #050a07;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  font-size: 13px;
  color: #94a39d;
}

.footer-rewind-btn {
  background: transparent;
  border: 1px solid #10b981;
  color: #34d399;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.footer-rewind-btn:hover {
  background: rgba(16, 185, 129, 0.15);
}

/* Floating Return Button */
.floating-dock-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 200;
  background: #064e3b;
  border: 1.5px solid #10b981;
  color: #ecfdf5;
  padding: 10px 18px;
  border-radius: 9999px;
  font-weight: 800;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
}

.floating-dock-btn:hover {
  transform: translateY(-2px);
  background: #047857;
}

/* Certificate Modal */
.cert-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 300000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.cert-modal-box {
  background: #0c1711;
  border: 2px solid #10b981;
  border-radius: 8px;
  max-width: 900px;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 0 50px rgba(16, 185, 129, 0.4);
}

.cert-modal-head {
  background: #064e3b;
  color: #ffffff;
  padding: 10px 16px;
  font-weight: 800;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cert-close-btn {
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
}

.cert-modal-img {
  width: 100%;
  max-height: 80vh;
  object-fit: contain;
  display: block;
}

@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
}

/* Future environment: all effects stay inside this scroll surface. */
.green-portfolio { background: #060d0b; isolation: isolate; scrollbar-width: thin; scrollbar-color: #285b45 #060d0b; }
.green-portfolio::-webkit-scrollbar { width: 6px; background: #060d0b; }
.green-portfolio::-webkit-scrollbar-thumb { background: #285b45; border: 0; border-radius: 8px; }
.ambient-field { position: fixed; inset: 0; z-index: -1; pointer-events: none; overflow: hidden; background-image: radial-gradient(#76e4b019 .65px, transparent .65px); background-size: 28px 28px; mask-image: linear-gradient(black, #0004); }
.ambient-orb { position: absolute; top: -300px; right: -180px; width: 950px; height: 950px; border-radius: 50%; background: radial-gradient(ellipse, #0c6b4533, transparent 65%); animation: atmosphere 16s ease-in-out infinite alternate; }
.reading-progress { position: fixed; top: 0; left: 0; width: 100%; height: 2px; background: #a0ffd4; transform-origin: left; z-index: 202; box-shadow: 0 0 12px #73ffc0; pointer-events: none; }
.site-header { background: #060d0bd9; backdrop-filter: blur(20px); }
.header-inner { gap: 20px; max-width: 1400px; padding: 18px 32px; }
.brand { text-decoration: none; flex-shrink: 0; }
.brand-glyph { font: 600 18px ui-monospace, monospace; border: 1px solid #90edbf40; padding: 10px 7px; border-radius: 8px; color: #c0ffe1; }
.brand-glyph span { color: #64dca4; }
.brand-title { font-size: 13px; }.brand-sub { font-size: 8px; letter-spacing: 1px; }
.nav-menu { gap: 19px; }.nav-menu a { font-size: 12px; position: relative; padding: 8px 0; }
.nav-menu a[aria-current] { color: #b6fbd8; }
.nav-menu a::after { content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 1px; background: #79ebaf; transform: scaleX(0); transition: transform .25s; transform-origin: left; }
.nav-menu a[aria-current]::after, .nav-menu a:hover::after { transform: scaleX(1); }
.motion-toggle { color: #a1bdae; background: transparent; border: 1px solid #91deb52b; border-radius: 6px; padding: 8px 10px; font: 10px ui-monospace, monospace; cursor: pointer; white-space: nowrap; }
.btn-retro, .btn-resume { font-size: 11px; white-space: nowrap; }
.main-body { max-width: 1280px; padding-inline: 48px; }
.hero-block { padding: 34px 0 50px; }
.arrival-label { display: flex; align-items: center; gap: 12px; font: 9px ui-monospace, monospace; letter-spacing: 2px; color: #7f9e8c; margin-bottom: 38px; }
.arrival-label > span:first-child { color: #52695c; }.arrival-line { height: 1px; width: 65px; background: linear-gradient(90deg, #355943, #97e6bc); }
.hero-layout { display: grid; grid-template-columns: 1.25fr 1fr; align-items: center; gap: 54px; }
.hero-copy { min-width: 0; animation: arrival .9s cubic-bezier(.16, 1, .3, 1) both; }
.hero-headline { font-size: clamp(40px, 4.7vw, 68px); line-height: 1.06; font-weight: 600; letter-spacing: -3px; margin-bottom: 26px; }
.highlight-green { display: inline-block; color: #a1f1c6; background: linear-gradient(120deg, #d3ffe7, #69d8a0); background-clip: text; -webkit-text-fill-color: transparent; }
.status-chip { padding: 0; border: 0; background: none; font: 8px ui-monospace, monospace; letter-spacing: 1.2px; line-height: 1.7; color: #88b59c; margin-bottom: 24px; }
.status-pulse { width: 5px; height: 5px; flex-shrink: 0; background: #a1f1c6; animation: signal 3s ease-in-out infinite; }
.hero-summary { font-size: 14px; line-height: 1.9; color: #8ca699; max-width: 560px; }
.hero-summary b { font-weight: 500; color: #c2d8cb; }
.hero-buttons { gap: 10px; margin: 0; }.hero-buttons button { font-size: 11px; padding: 12px 17px; border-radius: 6px; }
.hero-buttons .btn-time-rewind { display: none; }.btn-primary { background: #b1f7cf; color: #062416; }
.btn-accent { border-color: #5d9e773d; background: #112c1d6b; color: #acd9bb; }
.explore-cue { display: flex; align-items: center; gap: 12px; background: none; border: 0; padding: 32px 0; width: 100%; color: #809b8c; font: 8px ui-monospace, monospace; letter-spacing: 2px; cursor: pointer; text-align: left; }
.explore-cue > span:first-child { color: #b2f6ce; font-size: 18px; animation: scroll-cue 2.5s ease-in-out infinite; }
.explore-coordinates { margin-left: auto; color: #4f715e; }
.metrics-strip { padding-top: 24px; gap: 14px; }.metric-item { background: #0d1b1480; padding: 22px; border-color: #84cfa422; }
.metric-val { font: 500 25px ui-monospace, monospace; color: #bbf2ce; }.metric-title { font-size: 12px; font-weight: 500; }.metric-desc { color: #7f9e8a; font-size: 10px; }
.content-block { padding: 76px 0; scroll-margin-top: 120px; }.block-tag { font: 9px ui-monospace, monospace; letter-spacing: 2.5px; color: #8cd8ac; }.block-heading { letter-spacing: -1px; font-weight: 600; }.block-subtitle { color: #8ba394; }
.project-box, .jcpc-card, .skill-group, .contact-box, .metric-item { position: relative; background-image: radial-gradient(350px circle at var(--light-x, -500px) var(--light-y, -500px), #87f4b313, transparent 70%); transition: border-color .3s, box-shadow .3s; }
.project-box:hover, .jcpc-card:hover, .skill-group:hover, .contact-box:hover, .metric-item:hover { border-color: #9ae7b766; box-shadow: 0 10px 40px #0002; }
.project-box { background-color: #0b1912b3; }.proj-name { letter-spacing: -.4px; }.proj-desc { color: #94ab9c; }.proj-link { transition: color .2s, gap .2s; }.proj-link:hover { color: #d0ffe3; gap: 18px; }
.filter-strip { gap: 8px; }.filter-btn { border-radius: 999px; font-size: 11px; }.filter-btn.active { background: #9aefbe; color: #082c17; border-color: #9aefbe; }
.project-count { font: 9px ui-monospace, monospace; letter-spacing: 1.5px; color: #7a9c87; margin: 0 0 22px; }
.projects-grid { position: relative; align-items: stretch; }.project-enter-active { transition: opacity .35s, transform .35s; }.project-leave-active { transition: opacity .15s; position: absolute; pointer-events: none; }.project-enter-from { opacity: 0; transform: translateY(20px); }.project-leave-to { opacity: 0; }
.scroll-reveal { opacity: 0; transform: translateY(24px); transition: opacity .8s var(--reveal-delay, 0ms), transform .8s cubic-bezier(.16, 1, .3, 1) var(--reveal-delay, 0ms); }
.scroll-reveal.is-visible { opacity: 1; transform: none; }
.term-box { box-shadow: 0 20px 70px #0004; }.term-bar { background: #13251a; }.term-input:focus { outline: none; }.term-form:focus-within { box-shadow: inset 0 -2px #9befbc; }
.floating-dock-btn { background: #0e2419e6; backdrop-filter: blur(12px); border-color: #8dd9aa50; font: 10px ui-monospace, monospace; padding: 12px 16px; }
.site-footer { padding-bottom: 90px; }
.green-portfolio :is(button, a, input):focus-visible { outline: 2px solid #b6fbd8; outline-offset: 5px; }
.motion-off { scroll-behavior: auto; }.motion-off *, .motion-off *::before, .motion-off *::after { animation: none !important; transition: none !important; }.motion-off .scroll-reveal { opacity: 1; transform: none; }
@keyframes atmosphere { to { transform: translate(-100px, 180px); } }
@keyframes arrival { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
@keyframes signal { 50% { box-shadow: 0 0 14px #a1f1c6; opacity: .5; } }
@keyframes scroll-cue { 50% { transform: translateY(5px); } }
@media (max-width: 1150px) { .header-inner { flex-wrap: wrap; gap: 10px; }.nav-menu { order: 3; width: 100%; justify-content: center; gap: 28px; }.header-actions { margin-left: auto; }.hero-layout { gap: 28px; }.main-body { padding-inline: 32px; } }
@media (max-width: 768px) {
  .header-inner { padding: 12px 20px; }.brand-sub { display: none; }.brand-glyph { font-size: 14px; padding: 6px; }.header-actions { gap: 7px; }.btn-resume { display: none; }.btn-retro { padding: 8px; font-size: 10px; }.motion-toggle { font-size: 9px; padding: 8px; }
  .nav-menu { display: flex; justify-content: flex-start; overflow-x: auto; gap: 24px; scrollbar-width: none; }.nav-menu a { white-space: nowrap; font-size: 11px; }
  .main-body { padding-inline: 22px; }.hero-layout { grid-template-columns: 1fr; gap: 32px; }.hero-headline { font-size: clamp(42px, 9vw, 64px); letter-spacing: -2px; }.arrival-label { margin-bottom: 30px; letter-spacing: 1px; font-size: 8px; }.hero-summary { max-width: none; }.hero-buttons { margin-bottom: 0; }
  .metrics-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); }.metric-item { padding: 16px; }.metric-val { font-size: 20px; }.explore-coordinates { display: none; }.content-block { padding: 48px 0; scroll-margin-top: 135px; }.block-heading { font-size: 26px; }.floating-dock-btn { bottom: 14px; right: 14px; }
}
@media (max-width: 380px) { .brand-title { display: none; }.main-body { padding-inline: 16px; }.metric-val { font-size: 17px; } }
@media (prefers-reduced-motion: reduce) { .green-portfolio { scroll-behavior: auto; }.green-portfolio *, .green-portfolio *::before, .green-portfolio *::after { animation: none !important; transition: none !important; }.scroll-reveal { opacity: 1; transform: none; } }
</style>
