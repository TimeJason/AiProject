const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const langToggle = document.getElementById("lang-toggle");
const fontButtons = document.querySelectorAll("[data-font]");

const translations = {
  zh: {
    brand: "Yun · 产品化个人站",
    tagline: "Build · Share · Inspire",
    status: "当前状态：正在构建 AI + Web 产品",
    headline: "一个可持续演进的个人网站系统",
    intro:
      "集成品牌展示、知识沉淀、作品集、工具平台与后台管理，支持模块化扩展与工程化部署。",
    overview: "网站总览",
  },
  en: {
    brand: "Yun · Productized Personal Site",
    tagline: "Build · Share · Inspire",
    status: "Now: Building AI + Web products",
    headline: "A personal website system built to evolve",
    intro:
      "Brand, knowledge, portfolio, tools, and admin merged into a modular, production-ready platform.",
    overview: "Site Overview",
  },
};

const setTheme = (theme) => {
  root.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "浅色模式" : "深色模式";
};

const setLanguage = (lang) => {
  document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
  langToggle.textContent = lang === "en" ? "中文" : "EN";
  langToggle.dataset.lang = lang;
};

const storedTheme = localStorage.getItem("theme") || "light";
const storedLang = localStorage.getItem("lang") || "zh";
setTheme(storedTheme);
setLanguage(storedLang);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
  });
}

if (langToggle) {
  langToggle.addEventListener("click", () => {
    const next = langToggle.dataset.lang === "en" ? "zh" : "en";
    setLanguage(next);
    localStorage.setItem("lang", next);
  });
}

fontButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const direction = button.dataset.font;
    const current = parseFloat(
      getComputedStyle(document.body).fontSize.replace("px", "")
    );
    const next = direction === "+" ? current + 1 : current - 1;
    const clamped = Math.min(20, Math.max(14, next));
    root.style.setProperty("--font-size", `${clamped}px`);
  });
});

const form = document.querySelector(".contact-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.reset();
    alert("感谢留言！我们会尽快联系你。");
  });
}
