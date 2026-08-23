const DATA_URL = "data/apps.json";
const CATEGORIES = [
  "All",
  "Composition",
  "Live Visuals",
  "Interactive Media",
  "Music Education",
  "AI Tools",
  "Recording & Production"
];

function setCurrentYear() {
  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();
}

async function loadApps() {
  const response = await fetch(DATA_URL);
  if (!response.ok) throw new Error(`Could not load app data: ${response.status}`);
  const data = await response.json();
  return data.apps;
}

function createPill(text) {
  const span = document.createElement("span");
  span.className = "pill";
  span.textContent = text;
  return span;
}

function createAppCard(app) {
  const article = document.createElement("article");
  article.className = "app-card";

  const meta = document.createElement("div");
  meta.className = "card-meta";
  meta.append(createPill(app.category), createPill(app.status));

  const heading = document.createElement("h3");
  heading.textContent = app.name;

  const description = document.createElement("p");
  description.textContent = app.shortDescription;

  const link = document.createElement("a");
  link.className = "button card-link";
  link.href = `app.html?id=${encodeURIComponent(app.id)}`;
  link.textContent = "View Details";
  link.setAttribute("aria-label", `View details for ${app.name}`);

  article.append(meta, heading, description, link);
  return article;
}

function initLibrary(apps) {
  const grid = document.querySelector("#app-grid");
  const search = document.querySelector("#search-input");
  const filters = document.querySelector("#category-filters");
  const resultCount = document.querySelector("#result-count");
  const emptyState = document.querySelector("#empty-state");
  let activeCategory = "All";

  function render() {
    const query = search.value.trim().toLowerCase();
    const matches = apps.filter((app) => {
      const categoryMatch = activeCategory === "All" || app.category === activeCategory;
      const searchable = [
        app.name,
        app.category,
        app.shortDescription,
        app.overview,
        app.howItWorks,
        app.suggestedUseCase,
        ...app.keywords,
        ...app.memberUses
      ].join(" ").toLowerCase();
      return categoryMatch && searchable.includes(query);
    });

    grid.replaceChildren(...matches.map(createAppCard));
    resultCount.textContent = `${matches.length} ${matches.length === 1 ? "app" : "apps"}`;
    emptyState.hidden = matches.length !== 0;
  }

  CATEGORIES.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "filter-button";
    button.textContent = category;
    button.setAttribute("aria-pressed", String(category === activeCategory));
    button.addEventListener("click", () => {
      activeCategory = category;
      filters.querySelectorAll("button").forEach((item) => {
        item.setAttribute("aria-pressed", String(item === button));
      });
      render();
    });
    filters.append(button);
  });

  search.addEventListener("input", render);
  render();
}

function fillList(selector, items) {
  const list = document.querySelector(selector);
  list.replaceChildren(...items.map((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    return li;
  }));
}

function renderAppDetail(app) {
  document.title = `${app.name} · CMD Lab App Library`;
  document.querySelector("#detail-name").textContent = app.name;
  document.querySelector("#detail-summary").textContent = app.shortDescription;
  document.querySelector("#detail-overview").textContent = app.overview;
  document.querySelector("#detail-how").textContent = app.howItWorks;
  document.querySelector("#detail-use-case").textContent = app.suggestedUseCase;
  document.querySelector("#detail-owner").textContent = app.owner;

  const meta = document.querySelector("#detail-meta");
  meta.append(createPill(app.category), createPill(app.status));

  const officialLink = document.querySelector("#official-link");
  officialLink.href = app.officialUrl;
  officialLink.setAttribute("aria-label", `Visit the official ${app.name} website in a new tab`);

  fillList("#detail-uses", app.memberUses);
  fillList("#detail-pros", app.pros);
  fillList("#detail-cons", app.cons);

  const videos = document.querySelector("#detail-videos");
  if (app.exampleVideos.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No example videos added yet.";
    videos.append(li);
  } else {
    app.exampleVideos.forEach((url, index) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = `Example video ${index + 1} ↗`;
      link.setAttribute("aria-label", `Open ${app.name} example video ${index + 1} in a new tab`);
      li.append(link);
      videos.append(li);
    });
  }

  document.querySelector("#detail-loading").hidden = true;
  document.querySelector("#app-detail").hidden = false;
}

function showNotFound() {
  document.title = "App Not Found · CMD Lab App Library";
  document.querySelector("#detail-loading").hidden = true;
  document.querySelector("#not-found").hidden = false;
}

async function init() {
  setCurrentYear();
  const page = document.body.dataset.page;

  try {
    const apps = await loadApps();
    if (page === "home") initLibrary(apps);
    if (page === "detail") {
      const id = new URLSearchParams(window.location.search).get("id");
      const app = apps.find((item) => item.id === id);
      if (app) renderAppDetail(app);
      else showNotFound();
    }
  } catch (error) {
    console.error(error);
    if (page === "home") {
      document.querySelector("#result-count").textContent = "Unavailable";
      document.querySelector("#data-error").hidden = false;
    } else {
      showNotFound();
    }
  }
}

init();
