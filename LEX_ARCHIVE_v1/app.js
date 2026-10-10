const projects = {
  panelly: {
    file:
      "FILE 001",

    type:
      "Solo build",

    title:
      "Panelly",

    subtitle:
      "Manga discovery and reading platform.",

    role:
      "Designer + Developer",

    year:
      "2026",

    stack:
      "HTML · CSS · JavaScript · AniList API · MangaDex API · Local Storage · Vercel",

    status:
      "In development",

    preview:
      "assets/images/panelly.jpg",

    description:
      "Panelly is a manga discovery and reading interface that combines series discovery, manga information, available chapters, bookmarks, and reading progress.",

    contribution: [
      "Designed the responsive interface and visual identity.",
      "Built search, browse, detail, and reader experiences.",
      "Used AniList for catalog information and MangaDex for available hosted chapters.",
      "Added bookmarks and Continue Reading using Local Storage.",
      "Deployed and tested the project on Vercel."
    ],

    links: [
      {
        label:
          "Live site ↗",

        url:
          "https://panelly-delta.vercel.app/"
      },

      {
        label:
          "GitHub ↗",

        url:
          "https://github.com/lexyian/Panelly"
      }
    ]
  },

  hirelens: {
    file:
      "FILE 002",

    type:
      "Solo build",

    title:
      "HireLens",

    subtitle:
      "Interview practice platform for students, fresh graduates, and job seekers.",

    role:
      "Designer + Developer",

    year:
      "2026",

    stack:
      "HTML · CSS · JavaScript · Web Speech API · Vercel",

    status:
      "Stage 1 in build",

    preview:
      "",

    fallback:
      "HL / 002",

    description:
      "HireLens is an interview-practice product built around realistic question flows, spoken or typed answers, timers, session review, and a later secure AI feedback layer.",

    contribution: [
      "Designed the product direction and responsive interview flow.",
      "Built role, interview type, difficulty, and question-count setup.",
      "Implemented typed answers, timers, word counts, and progress tracking.",
      "Added browser speech recognition with typed fallback.",
      "Structured the project so AI and saved sessions can be added later."
    ],

    links: []
  },

  eduhub: {
    file:
      "FILE 003",

    type:
      "Team project",

    title:
      "EduHub",

    subtitle:
      "K–12 educational platform with resources, study tools, and learning activities.",

    role:
      "Frontend Contributor + QA Tester",

    year:
      "2026",

    stack:
      "HTML · CSS · JavaScript · GitHub",

    status:
      "Completed academic project",

    preview:
      "assets/images/learning_resource.jpeg",

    description:
      "EduHub is a team-built educational platform. My work went beyond QA: I built the Learning Resources experience shown in this portfolio, including the resource browsing page and PDF resource viewer.",

    contribution: [
      "Built the Learning Resources page shown in the project screenshots.",
      "Built the PDF resource viewing experience used to open and navigate learning materials.",
      "Worked with the team on frontend integration.",
      "Tested pages and interactive features for bugs and usability issues.",
      "Helped verify fixes before submission."
    ],

    links: [
      {
        label:
          "GitHub ↗",

        url:
          "https://github.com/villgrum/EduHub"
      }
    ]
  },

  wanlab: {
    file:
      "FILE 004",

    type:
      "Pair laboratory",

    title:
      "WAN Technologies Lab",

    subtitle:
      "Router-to-router WAN configuration using PPP and static routing.",

    role:
      "Network Configuration",

    year:
      "2026",

    stack:
      "Cisco Packet Tracer · PPP · IPv4 · Static Routing · Ping · Traceroute",

    status:
      "Completed laboratory",

    preview:
      "assets/images/wan-topology.png",

    previewClass:
      "topology",

    description:
      "A WAN Technologies laboratory connecting an HQ network and a branch network through two routers, with PPP on the serial link and route verification across both LANs.",

    contribution: [
      "Configured the HQ and branch network devices with my laboratory partner.",
      "Set up the serial WAN connection between the two routers.",
      "Verified PPP and interface status using Cisco IOS commands.",
      "Checked routing tables and static routes.",
      "Validated end-device connectivity using ping and traceroute."
    ],

    links: []
  },

  hintayan: {
    file:
      "FILE 005",

    type:
      "Creative project",

    title:
      "Hin(taya)n",

    subtitle:
      "Short-film post-production project.",

    role:
      "Editor",

    year:
      "2026",

    stack:
      "DaVinci Resolve · Edit · Color · Fairlight",

    status:
      "Academic film project",

    preview:
      "",

    fallback:
      "H(T) / 005",

    description:
      "Hin(taya)n is a short-film project where I handled editing work across the main film and promotional cuts, with attention to pacing, transitions, color, audio, titles, and continuity.",

    contribution: [
      "Edited the full film and promotional cuts.",
      "Worked on pacing, transitions, and continuity.",
      "Developed separate visual looks for present-day and flashback scenes.",
      "Handled audio cleanup, ambience, and supporting sound effects.",
      "Built titles and other post-production elements in DaVinci Resolve."
    ],

    links: []
  }
};

const projectDialog =
  document.getElementById(
    "projectDialog"
  );

const dialogClose =
  document.getElementById(
    "dialogClose"
  );

const dialogFile =
  document.getElementById(
    "dialogFile"
  );

const dialogPreview =
  document.getElementById(
    "dialogPreview"
  );

const dialogType =
  document.getElementById(
    "dialogType"
  );

const dialogTitle =
  document.getElementById(
    "dialogTitle"
  );

const dialogSubtitle =
  document.getElementById(
    "dialogSubtitle"
  );

const dialogRole =
  document.getElementById(
    "dialogRole"
  );

const dialogYear =
  document.getElementById(
    "dialogYear"
  );

const dialogStack =
  document.getElementById(
    "dialogStack"
  );

const dialogStatus =
  document.getElementById(
    "dialogStatus"
  );

const dialogDescription =
  document.getElementById(
    "dialogDescription"
  );

const dialogContribution =
  document.getElementById(
    "dialogContribution"
  );

const dialogLinks =
  document.getElementById(
    "dialogLinks"
  );

const jumpButton =
  document.getElementById(
    "jumpButton"
  );

const jumpDialog =
  document.getElementById(
    "jumpDialog"
  );

const jumpClose =
  document.getElementById(
    "jumpClose"
  );

const randomProjectButton =
  document.getElementById(
    "randomProjectButton"
  );

const scrollProgress =
  document.getElementById(
    "scrollProgress"
  );

const emailButton =
  document.getElementById(
    "emailButton"
  );

const emailStatus =
  document.getElementById(
    "emailStatus"
  );

const wanTopologyImage =
  document.getElementById(
    "wanTopologyImage"
  );

const wanPlaceholder =
  document.getElementById(
    "wanPlaceholder"
  );

function renderDialogPreview(
  project
) {
  dialogPreview.className =
    "dialog-preview";

  if (
    project.preview
  ) {
    if (
      project.previewClass
    ) {
      dialogPreview.classList.add(
        project.previewClass
      );
    }

    dialogPreview.innerHTML = `
      <img
        src="${project.preview}"
        alt="${project.title} project preview"
      >
    `;

    return;
  }

  dialogPreview.classList.add(
    "no-image"
  );

  dialogPreview.textContent =
    project.fallback ||
    project.title;
}

function openProject(
  projectKey
) {
  const project =
    projects[projectKey];

  if (!project) {
    return;
  }

  dialogFile.textContent =
    project.file;

  dialogType.textContent =
    project.type;

  dialogTitle.textContent =
    project.title;

  dialogSubtitle.textContent =
    project.subtitle;

  dialogRole.textContent =
    project.role;

  dialogYear.textContent =
    project.year;

  dialogStack.textContent =
    project.stack;

  dialogStatus.textContent =
    project.status;

  dialogDescription.textContent =
    project.description;

  dialogContribution.innerHTML =
    project.contribution
      .map(
        (item) =>
          `<li>${item}</li>`
      )
      .join("");

  if (
    project.links.length
  ) {
    dialogLinks.innerHTML =
      project.links
        .map(
          (link) => `
            <a
              class="button button-dark"
              href="${link.url}"
              target="_blank"
              rel="noreferrer"
            >
              ${link.label}
            </a>
          `
        )
        .join("");
  } else {
    dialogLinks.innerHTML = `
      <span
        class="button button-light"
        aria-disabled="true"
      >
        Link coming later
      </span>
    `;
  }

  renderDialogPreview(
    project
  );

  document.body
    .classList.add(
      "dialog-open"
    );

  projectDialog.showModal();
}

function closeProject() {
  if (
    projectDialog.open
  ) {
    projectDialog.close();
  }

  document.body
    .classList.remove(
      "dialog-open"
    );
}

document
  .querySelectorAll(
    "[data-project]"
  )
  .forEach(
    (button) => {
      button.addEventListener(
        "click",
        () => {
          openProject(
            button.dataset.project
          );
        }
      );
    }
  );

dialogClose.addEventListener(
  "click",
  closeProject
);

projectDialog.addEventListener(
  "click",
  (event) => {
    if (
      event.target ===
      projectDialog
    ) {
      closeProject();
    }
  }
);

projectDialog.addEventListener(
  "close",
  () => {
    document.body
      .classList.remove(
        "dialog-open"
      );
  }
);

jumpButton.addEventListener(
  "click",
  () => {
    jumpDialog.showModal();
  }
);

jumpClose.addEventListener(
  "click",
  () => {
    jumpDialog.close();
  }
);

jumpDialog
  .querySelectorAll(
    "[data-jump]"
  )
  .forEach(
    (button) => {
      button.addEventListener(
        "click",
        () => {
          const target =
            document.getElementById(
              button.dataset.jump
            );

          jumpDialog.close();

          target?.scrollIntoView({
            behavior:
              "smooth"
          });
        }
      );
    }
  );

document.addEventListener(
  "keydown",
  (event) => {
    const activeElement =
      document.activeElement;

    const tagName =
      activeElement?.tagName;

    if (
      event.key === "/" &&
      tagName !== "INPUT" &&
      tagName !== "TEXTAREA" &&
      !projectDialog.open
    ) {
      event.preventDefault();

      if (
        !jumpDialog.open
      ) {
        jumpDialog.showModal();
      }
    }

    if (
      event.key ===
        "Escape" &&
      jumpDialog.open
    ) {
      jumpDialog.close();
    }
  }
);

randomProjectButton.addEventListener(
  "click",
  () => {
    const keys =
      [
        "panelly",
        "hirelens",
        "eduhub",
        "wanlab",
        "hintayan"
      ];

    const randomKey =
      keys[
        Math.floor(
          Math.random() *
          keys.length
        )
      ];

    document
      .getElementById(
        randomKey
      )
      ?.scrollIntoView({
        behavior:
          "smooth"
      });
  }
);

function updateScrollProgress() {
  const totalHeight =
    document.documentElement
      .scrollHeight -
    window.innerHeight;

  const percentage =
    totalHeight > 0
      ? (
          window.scrollY /
          totalHeight
        ) * 100
      : 0;

  scrollProgress.style.width =
    `${Math.min(
      100,
      Math.max(
        0,
        percentage
      )
    )}%`;
}

window.addEventListener(
  "scroll",
  updateScrollProgress,
  {
    passive: true
  }
);

updateScrollProgress();

if (
  wanTopologyImage
) {
  wanTopologyImage.addEventListener(
    "load",
    () => {
      wanPlaceholder.style.display =
        "none";
    }
  );

  wanTopologyImage.addEventListener(
    "error",
    () => {
      wanTopologyImage.style.display =
        "none";

      wanPlaceholder.style.display =
        "grid";
    }
  );
}

const portfolioEmail = "lexpanerio@gmail.com";

if (
  portfolioEmail
) {
  emailButton.textContent =
    "Copy email";
}

emailButton.addEventListener(
  "click",
  async () => {
    if (
      !portfolioEmail
    ) {
      emailStatus.textContent =
        "Add your portfolio email inside app.js before publishing.";

      return;
    }

    try {
      await navigator
        .clipboard
        .writeText(
          portfolioEmail
        );

      emailStatus.textContent =
        "Email copied.";
    } catch {
      emailStatus.textContent =
        portfolioEmail;
    }
  }
);