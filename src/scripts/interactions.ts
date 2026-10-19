/** Content and locale are rendered by Astro; this script only adds interactions. */
function setupPage() {
  const header = document.querySelector<HTMLElement>("#site-header");
  const menu = document.querySelector<HTMLElement>("#navigation");
  const toggle = document.querySelector<HTMLButtonElement>("#menu-toggle");
  const background = document.querySelector<HTMLVideoElement>("#hero-video");
  const pause = document.querySelector<HTMLButtonElement>("#toggle-hero-video");
  const watch = document.querySelector<HTMLButtonElement>("#watch-video");
  const dialog = document.querySelector<HTMLDialogElement>("#video-dialog");
  const player = document.querySelector<HTMLVideoElement>("#dialog-player");
  if (
    !header ||
    !menu ||
    !toggle ||
    !background ||
    !pause ||
    !watch ||
    !dialog ||
    !player
  )
    return;

  function closeMenu() {
    menu!.classList.remove("open");
    toggle!.setAttribute("aria-expanded", "false");
  }
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("open", open);
  });
  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    if (
      event.target.closest('a[href^="#"]') ||
      !event.target.closest("#site-header")
    )
      closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1100) closeMenu();
  });

  // A real locale link also works with JavaScript disabled. Retain the section when switching.
  document
    .querySelectorAll<HTMLAnchorElement>("[data-locale-link]")
    .forEach((link) => {
      link.addEventListener("click", () => {
        link.hash = window.location.hash;
      });
    });

  function syncPause() {
    const label = background!.paused
      ? pause!.dataset.resumeLabel
      : pause!.dataset.pauseLabel;
    pause!.textContent = label ?? "";
    pause!.setAttribute("aria-label", label ?? "");
  }
  background.addEventListener("play", syncPause);
  background.addEventListener("pause", syncPause);
  pause.addEventListener("click", () => {
    if (background.paused) background.play().catch(syncPause);
    else background.pause();
  });
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!reducedMotion.matches) background.play().catch(syncPause);
  syncPause();

  // Ease mouse-wheel scrolling; keep touch, keyboard and nested scrolling native.
  let scrollTarget = window.scrollY;
  let scrollFrame = 0;
  let lastScrollTime = 0;
  function stopSmoothScroll() {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = 0;
    scrollTarget = window.scrollY;
  }
  function animateScroll(time: number) {
    const elapsed = Math.min(time - lastScrollTime, 50);
    lastScrollTime = time;
    scrollTarget = Math.max(0, Math.min(scrollTarget, document.documentElement.scrollHeight - window.innerHeight));
    const next = window.scrollY + (scrollTarget - window.scrollY) * (1 - Math.exp(-elapsed / 90));
    window.scrollTo({ top: next, behavior: "instant" });
    if (Math.abs(scrollTarget - window.scrollY) > 1) {
      scrollFrame = requestAnimationFrame(animateScroll);
    } else {
      window.scrollTo({ top: scrollTarget, behavior: "instant" });
      scrollFrame = 0;
    }
  }
  window.addEventListener("wheel", (event) => {
    if (event.defaultPrevented || event.ctrlKey || reducedMotion.matches || dialog.open ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    let element = event.target instanceof Element ? event.target : null;
    while (element && element !== document.body) {
      const style = getComputedStyle(element);
      if (/(auto|scroll)/.test(style.overflowY) && element.scrollHeight > element.clientHeight) return;
      element = element.parentElement;
    }
    event.preventDefault();
    if (!scrollFrame) scrollTarget = window.scrollY;
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
    scrollTarget += event.deltaY * unit;
    scrollTarget = Math.max(0, Math.min(scrollTarget, document.documentElement.scrollHeight - window.innerHeight));
    if (!scrollFrame) {
      lastScrollTime = performance.now();
      scrollFrame = requestAnimationFrame(animateScroll);
    }
  }, { passive: false });
  window.addEventListener("pointerdown", stopSmoothScroll, { passive: true });
  window.addEventListener("touchstart", stopSmoothScroll, { passive: true });
  window.addEventListener("keydown", stopSmoothScroll);
  window.addEventListener("hashchange", stopSmoothScroll);
  reducedMotion.addEventListener("change", stopSmoothScroll);

  let resumeBackground = false;
  watch.addEventListener("click", () => {
    resumeBackground = !background.paused;
    background.pause();
    dialog.showModal();
    document.body.style.overflow = "hidden";
    player.play().catch(() => {
      /* Native controls allow retry if autoplay is blocked. */
    });
  });
  document
    .querySelector("#close-dialog")
    ?.addEventListener("click", () => dialog.close());
  document
    .querySelector("#dialog-discover")
    ?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      dialog.close();
  });
  dialog.addEventListener("close", () => {
    player.pause();
    document.body.style.overflow = "";
    if (resumeBackground && !reducedMotion.matches)
      background.play().catch(syncPause);
  });

  if (!reducedMotion.matches && "IntersectionObserver" in window) {
    document.documentElement.classList.add("motion-enabled");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document
      .querySelectorAll<HTMLElement>("[data-reveal]")
      .forEach((element, i) => {
        element.style.transitionDelay = `${(i % 3) * 70}ms`;
        observer.observe(element);
      });
  }
  const sections = ["home", "project", "program", "partners", "contact"];
  function updateNavigation() {
    let current = "home";
    for (const id of sections)
      if (
        (document.getElementById(id)?.getBoundingClientRect().top ??
          Infinity) <= 180
      )
        current = id;
    document
      .querySelectorAll<HTMLAnchorElement>('.nav-links a[href^="#"]')
      .forEach((link) => {
        if (link.hash === `#${current}`)
          link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    header!.classList.toggle("scrolled", window.scrollY > 20);
  }
  let queued = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(() => {
          updateNavigation();
          queued = false;
        });
      }
    },
    { passive: true },
  );
  updateNavigation();
}
setupPage();
