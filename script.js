const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchorLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = document.querySelectorAll("section[id]");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const copyEmailButton = document.querySelector("#copy-email-btn");
const themeToggleButton = document.querySelector("#theme-toggle");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const projectModal = document.querySelector("#project-modal");
const projectModalClose = document.querySelector("#project-modal-close");
const modalProjectImage = document.querySelector("#modal-project-image");
const modalProjectNum = document.querySelector("#modal-project-num");
const modalProjectTitle = document.querySelector("#modal-project-title");
const modalProjectDescription = document.querySelector("#modal-project-description");
const modalProjectStack = document.querySelector("#modal-project-stack");
const modalProjectSource = document.querySelector("#modal-project-source");
const modalProjectDemo = document.querySelector("#modal-project-demo");
const emailText = "amanphadke004@gmail.com";
const THEME_KEY = "portfolio-theme";
let lastFocusedCard = null;

const PROJECT_DETAILS = {
  "voice-agent": {
    number: "01",
    title: "Voice Controlled AI Agent",
    description:`
      A modular, voice-driven AI assistant that listens, understands, and acts entirely through spoken commands. The pipeline begins with real-time audio capture, which is transcribed using the Groq-powered Whisper API for fast, accurate speech-to-text conversion. The transcript is then passed to an LLM-based intent classifier that determines what the user wants to do — chat, summarize text, or create and write files — and routes the request to the appropriate tool module.

Each tool lives in its own dedicated module under a clean, separation-of-concerns architecture, making it straightforward to add new capabilities without touching existing logic. A Gradio-powered UI ties everything together, providing a simple browser-based interface for interacting with the agent. All generated files are safely written to an isolated output directory. Ideal as a foundation for voice-first AI workflows, personal automation pipelines, or an extensible multi-tool agent platform.
      `,
    source: "https://github.com/AmanPhadke/voice_controlled_ai_agent",
    demo: "https://github.com/AmanPhadke",
    stack: ["Python", "Whisper", "Groq API", "Gradio"]
  },

  "autostream-agent": {
    number: "02",
    title: "AutoStream Sales Agent",
    description:
      `An intelligent conversational agent purpose-built for a streaming service's customer-facing operations. Powered by a configurable LLM backend, the agent handles incoming customer queries by grounding every response in a structured JSON knowledge base containing pricing tiers, subscription policies, and service details — ensuring answers stay accurate, consistent, and on-brand at all times.

The project ships with two distinct implementation approaches: a primary multi-agent orchestration pipeline and an alternate version built directly on the GenAI API, making it a valuable reference for developers comparing agent architectures and design patterns. The knowledge base, LLM configuration, and agent logic are each cleanly separated into their own files, making it easy to swap out the underlying model, update pricing data, or adapt the entire system to a completely different domain with minimal effort.`,
    source: "https://github.com/AmanPhadke/conversational_ai_agent",
    demo: null,
    stack: ["AutoGen", "Gemini LLM", "Python"]
  },

  lexitrack: {
    number: "03",
    title: "LexiTrack",
    description:
      `A personal, deep-dive linguistic analysis tool built for serious German language learners who want more than a spell checker. Paste any German text and LexiTrack dissects it across dozens of dimensions simultaneously — measuring lexical diversity via MTLD, analyzing clause density, detecting subordinate conjunction usage, validating dative and accusative prepositions, checking verb morphology and conjugation correctness, and flagging V2 word order violations in main clauses.

At its core, a custom Language Complexity Index (LCI) combines multiple weighted linguistic signals into a single composite score, which feeds directly into an automatic CEFR level estimator that classifies text from A1 through C2. Error rate per word count and a proficiency classification (Beginner, Intermediate, Advanced) round out the assessment. All results are presented through interactive Plotly charts with color-coded CEFR indicators and detailed per-error breakdowns. Purpose-built for personal use tracking German writing progress, but robust enough to serve any language researcher or educator working with learner corpora.`,

    source: "https://github.com/AmanPhadke/lexitrack",
    demo: null,
    stack: ["spaCy", "HanTa", "Streamlit", "Plotly"]
  },

  "mlops-pipeline": {
    number: "04",
    title: "MLOps Batch Pipeline",
    description:
      `A lightweight yet production-style batch processing pipeline for financial signal generation from OHLCV (Open, High, Low, Close, Volume) market data. The pipeline ingests a CSV of historical price data, applies configurable rolling mean calculations via a YAML config file, and outputs structured JSON metrics including signal rate, processing latency, row count, and execution status — all without overwriting previous run logs.

Built with MLOps best practices throughout: the entire job is configurable via CLI flags, fully containerized with Docker for reproducible execution across environments, and equipped with robust error handling for missing input files, absent columns, and malformed config. The first window-minus-one rows with NaN rolling values are explicitly handled by treating them as zero signals rather than crashing or silently dropping data. Clean separation between input, processing, and output stages makes it straightforward to slot this pipeline into a larger data platform or model training workflow.`,

    source: "https://github.com/AmanPhadke/mlops_batch_processing_job",
    demo: null,
    stack: ["Python", "Docker", "Pandas", "YAML"]
  },

  "binance-bot": {
    number: "05",
    title: "Binance Trading Bot",
    description:
      `A clean, modular, CLI-driven trading bot for executing limit and market orders on Binance Futures via the official REST API. Orders are authenticated using HMAC-SHA256 request signing, keeping credentials secure without relying on third-party trading libraries. Fire buy or sell orders directly from the terminal by specifying the trading pair, order type, quantity, and price as command-line arguments — making it easy to script, schedule, or integrate into larger trading systems.

The codebase is structured across dedicated modules for the API client, order preparation, input validation, configuration management, and logging — each with a single responsibility, making the system straightforward to extend with new order types or trading strategies. Dual logging to both file and stdout ensures a full, timestamped audit trail of every action taken. Testnet support is baked in via environment configuration, so you can safely develop and test strategies against Binance's paper trading environment before risking real capital.`,

    source: "https://github.com/AmanPhadke/binance_trading_bot",
    demo: null,
    stack: ["Python", "REST API", "Argparse", "HMAC-SHA256"]
  },

  "playstore-analytics": {
    number: "06",
    title: "Google Playstore Analytics",
    description:
      `A rich, fully interactive analytics dashboard dissecting over 10,000 Google Play Store apps across 16 distinct visualizations. The dashboard covers category distribution and rankings, revenue analysis by app category, install patterns and growth trends, app size versus rating correlations, paid versus free comparisons, geographic distribution maps, and ML-powered sentiment analysis using NLTK VADER — surfacing the statistical relationship between user review sentiment and app ratings.

The standout engineering feature is a time-based live chart system: six specific visualizations automatically activate and deactivate based on the current time in IST, with real-time live and offline badges updating dynamically in the browser. Built entirely as a static site hosted on GitHub Pages with no backend infrastructure required. The analysis pipeline is driven by a Jupyter notebook combining Python, Pandas, NumPy, Plotly Express, and Scikit-learn. Key findings include that Family and Lifestyle apps generate the highest revenue, Games dominate on installs despite larger file sizes, and over 90% of all apps on the platform are free.`,

    source: "https://github.com/AmanPhadke/playstore-analytics",
    demo: null,
    stack: ["Python", "Data Analysis", "NLTK", "Pandas"]
  },

  "gymiq": {
    number: "07",
    title: "GymIQ",
    description:
      `A data-driven workout analysis and performance intelligence system built for serious gym-goers who want to understand their training at a deeper level than any standard fitness tracker provides. GymIQ ingests historical workout logs and applies statistical modeling and data science techniques to surface actionable training insights — including fatigue accumulation scores, deload risk predictions, one-rep max (1RM) forecasting, personal record tracking, and strength progression trend analysis across exercises and muscle groups.

The system identifies optimal rest days based on volume and intensity patterns, flags early warning signs of overtraining before performance degrades, and visualizes long-term strength curves using interactive Plotly charts. Built as a Streamlit application for a clean, personal dashboard experience, with Pandas and NumPy handling all data processing under the hood. Designed and built from scratch for personal use as an active gym-goer — making it a genuine tool shaped by real training data and real performance goals rather than a generic demo project.
`,

    source: "https://github.com/AmanPhadke/gymiq",
    demo: null,
    stack: ["Python", "Data Analysis", "Plotly", "Pandas", "Streamlit", "Sports Analytics"]
  }


};

const updateThemeButtonLabel = (isDarkMode) => {
  if (!themeToggleButton) {
    return;
  }
  themeToggleButton.textContent = isDarkMode ? "Light" : "Dark";
  themeToggleButton.setAttribute(
    "aria-label",
    isDarkMode ? "Switch to light mode" : "Switch to dark mode"
  );
};

const applyTheme = (mode) => {
  const darkModeEnabled = mode === "dark";
  document.body.classList.toggle("dark-mode", darkModeEnabled);
  updateThemeButtonLabel(darkModeEnabled);
};

const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme === "dark" || savedTheme === "light") {
  applyTheme(savedTheme);
} else {
  applyTheme("light");
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navAnchorLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks) {
      navLinks.classList.remove("open");
    }
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      const activeId = entry.target.getAttribute("id");
      navAnchorLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${activeId}`;
        link.classList.toggle("active", isActive);
      });
    });
  },
  { rootMargin: "-30% 0px -55% 0px", threshold: 0.1 }
);

sections.forEach((section) => sectionObserver.observe(section));

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const tags = card.dataset.tech || "";
      const shouldShow = filter === "all" || tags.includes(filter);
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

if (copyEmailButton) {
  copyEmailButton.addEventListener("click", async () => {
    const originalLabel = copyEmailButton.textContent;
    try {
      await navigator.clipboard.writeText(emailText);
      copyEmailButton.textContent = "Email Copied";
    } catch (error) {
      copyEmailButton.textContent = "Copy Failed";
    }

    setTimeout(() => {
      copyEmailButton.textContent = originalLabel;
    }, 1300);
  });
}

if (themeToggleButton) {
  themeToggleButton.addEventListener("click", () => {
    const darkModeEnabled = document.body.classList.contains("dark-mode");
    const nextTheme = darkModeEnabled ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);

    try {
      const response = await fetch("https://formspree.io/f/mkokraqn", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        formStatus.textContent = "Thank You for reaching out! I'll get back to you soon :)";
        contactForm.reset();
      } else {
        formStatus.textContent = "Something went wrong :( Try emailing directly.";
      }
    } catch {
      formStatus.textContent = "Network error. Try emailing directly.";
    }
  });
}
   

const setModalLink = (element, href, fallbackText) => {
  if (!element) {
    return;
  }
  if (!href) {
    element.removeAttribute("href");
    element.classList.add("disabled");
    element.textContent = fallbackText;
    return;
  }
  element.href = href;
  element.classList.remove("disabled");
};

const closeProjectModal = () => {
  if (!projectModal) {
    return;
  }
  projectModal.classList.remove("open");
  projectModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lastFocusedCard) {
    lastFocusedCard.focus();
  }
};

const openProjectModal = (projectId, card) => {
  if (!projectModal) {
    return;
  }
  const details = PROJECT_DETAILS[projectId];
  if (!details) {
    return;
  }

  lastFocusedCard = card;
  modalProjectNum.textContent = details.number;
  modalProjectTitle.textContent = details.title;
  modalProjectDescription.textContent = details.description;
  modalProjectStack.innerHTML = details.stack
    .map((tech) => `<span class="tag">${tech}</span>`)
    .join("");
  setModalLink(modalProjectSource, details.source, "Source Unavailable");
  setModalLink(modalProjectDemo, details.demo, "Demo Unavailable");

  projectModal.classList.add("open");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

projectCards.forEach((card) => {
  const projectId = card.dataset.projectId;
  if (!projectId) {
    return;
  }

  card.addEventListener("click", () => openProjectModal(projectId, card));
  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    event.preventDefault();
    openProjectModal(projectId, card);
  });
});

if (projectModalClose) {
  projectModalClose.addEventListener("click", closeProjectModal);
}

if (projectModal) {
  projectModal.addEventListener("click", (event) => {
    if (event.target === projectModal) {
      closeProjectModal();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && projectModal?.classList.contains("open")) {
    closeProjectModal();
  }
});

const thinkSpotlight = document.querySelector(".think-spotlight");
const thinkShine = document.querySelector(".think-shine");
const thinkSpotlightRadius = 30;

const resetThinkSpotlight = () => {
  if (thinkShine) {
    thinkShine.style.clipPath = "circle(0px at 50% 50%)";
  }
};

if (
  thinkSpotlight &&
  thinkShine &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const updateThinkSpotlight = (clientX, clientY) => {
    const rect = thinkSpotlight.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    thinkShine.style.clipPath = `circle(${thinkSpotlightRadius}px at ${x}px ${y}px)`;
  };

  thinkSpotlight.addEventListener("mousemove", (event) => {
    updateThinkSpotlight(event.clientX, event.clientY);
  });

  thinkSpotlight.addEventListener("mouseleave", resetThinkSpotlight);

  thinkSpotlight.addEventListener(
    "touchstart",
    (event) => {
      const touch = event.touches[0];
      if (!touch) {
        return;
      }
      updateThinkSpotlight(touch.clientX, touch.clientY);
    },
    { passive: true }
  );

  thinkSpotlight.addEventListener(
    "touchmove",
    (event) => {
      const touch = event.touches[0];
      if (!touch) {
        return;
      }
      updateThinkSpotlight(touch.clientX, touch.clientY);
    },
    { passive: true }
  );

  thinkSpotlight.addEventListener("touchend", resetThinkSpotlight);
}
