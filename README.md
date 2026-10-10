# LEX // ARCHIVE

LEX ARCHIVE is my personal portfolio website showcasing selected projects across web development, quality assurance, networking, and post-production.

Instead of using a standard portfolio grid, the website presents each project as an individual case file with its own layout, project details, role, tools, and contribution.

## About Me

I'm Lex, a BSIT student interested in frontend development, product interfaces, QA, networking, and creative post-production.

I enjoy working on projects that involve building interfaces, testing how systems behave, solving technical problems, and shaping visual experiences.

## Contact

**Email:**  
[lexpanerio@gmail.com](mailto:lexpanerio@gmail.com)

**GitHub:**  
[github.com/lexyian](https://github.com/lexyian)

## Project Status

LEX // ARCHIVE is still being updated as I finish, improve, and publish more of my work.

Some projects in the archive are completed academic projects, while others such as HireLens are still actively being developed.

Project descriptions are written based on the work I actually contributed to each project.

## Featured Projects

### Panelly

Panelly is a manga discovery and reading website built using vanilla JavaScript and external APIs.

**Role:** Designer + Developer

**Technologies:**
- HTML
- CSS
- JavaScript
- Fetch API
- JSON
- Local Storage
- AniList API
- MangaDex API
- Jikan API
- Vercel

**Main Features:**
- Manga search
- Genre browsing
- Trending and recently updated manga
- Manga detail pages
- Available chapter listings
- Built-in reader for supported chapters
- Previous and next chapter navigation
- Panel Shelf / bookmark feature
- Continue Reading
- Random manga discovery
- Responsive desktop and mobile layout
- Loading and error handling

Panelly retrieves manga information dynamically through external APIs rather than storing an entire manga catalog in its own database.

AniList is used mainly for manga information and discovery, while MangaDex is used for available hosted chapters and readable pages.

**Live Website:**  
https://panelly-delta.vercel.app/

**Repository:**  
https://github.com/lexyian/Panelly

---

### HireLens

HireLens is an interview practice web application designed for students, fresh graduates, and job seekers.

**Role:** Designer + Developer

**Status:** In Development

The project is being developed in stages. The initial version focuses on building a complete working interview flow before adding AI functionality and user accounts.

**Technologies:**
- HTML
- CSS
- JavaScript
- Web Speech API
- Vercel
- AI integration planned for a later stage

**Core Features:**
- Job role selection
- Interview type selection
- Difficulty selection
- Adjustable number of questions
- Role-based interview questions
- One-question-at-a-time interview flow
- Typed answers
- Browser speech transcription
- Editable transcripts
- Answer timer
- Word count
- Session progress
- Completed-answer review
- Basic practice checks
- Responsive layout

**Planned Features:**
- Secure LLM integration
- AI-generated questions
- Contextual follow-up questions
- Feedback on relevance, clarity, structure, and technical content
- STAR analysis for behavioral answers
- Saved interview sessions
- Authentication
- Interview history
- Progress comparisons
- Optional résumé-based questions

The AI and database features will only be added after the core interview experience is working reliably.

---

### EduHub

EduHub is a team-built K–12 educational platform containing learning resources, study tools, and educational activities.

**Role:** Frontend Contributor + QA Tester

My contribution to EduHub was not limited to quality assurance. I also worked directly on frontend features of the platform.

**My Frontend Contributions:**
- Built the Learning Resources page
- Worked on the resource browsing interface
- Built the PDF / learning-material viewing experience
- Worked on frontend integration with the rest of the website

**My QA Contributions:**
- Tested pages and interactive features
- Checked for bugs and broken functionality
- Reviewed usability issues
- Verified fixes before submission
- Helped with final checking and presentation preparation

**Technologies:**
- HTML
- CSS
- JavaScript
- GitHub

**Repository:**  
https://github.com/villgrum/EduHub

---

### WAN Technologies Lab

The WAN Technologies Lab is a networking laboratory focused on connecting an HQ network and a branch network through a router-to-router WAN connection.

**Role:** Network Configuration

The laboratory was completed with a partner and focused on configuring, testing, and verifying communication between two separate LANs.

**Tools and Technologies:**
- Cisco Packet Tracer
- Cisco IOS
- IPv4 Addressing
- Serial WAN Connection
- PPP
- Static Routing
- Routing Table Verification
- Ping
- Traceroute

**Work Completed:**
- Configured HQ and branch network devices
- Configured router interfaces
- Established the serial WAN connection
- Configured PPP
- Checked interface status
- Verified routing tables
- Configured static routes
- Tested router-to-router connectivity
- Tested end-device connectivity
- Used ping and traceroute for verification

---

### Hin(taya)n

Hin(taya)n is a short-film project where I handled post-production and editing work.

**Role:** Editor

**Software:**
- DaVinci Resolve
- Edit
- Fusion
- Color
- Fairlight

**My Contributions:**
- Edited the full short film
- Edited the teaser and trailer
- Worked on pacing and continuity
- Created transitions between scenes
- Worked on POV and flashback transitions
- Developed separate visual looks for present-day and flashback scenes
- Performed color grading
- Worked on stabilization where needed
- Cleaned and balanced dialogue and audio
- Added ambience and supporting sound effects
- Worked on titles and logo animation
- Helped shape the final visual and emotional flow of the film

A public viewing link will be added to the portfolio when available.

## Portfolio Features

LEX // ARCHIVE itself was built as an interactive portfolio rather than a standard collection of project cards.

**Features include:**
- Responsive desktop and mobile design
- Archive-inspired visual system
- Individual project case-file sections
- Project screenshots
- Detailed project information
- Project contribution breakdowns
- Project detail dialogs
- External live-site links
- GitHub repository links
- Quick project navigation
- `/` keyboard shortcut for navigation
- Random Project button
- Animated archive ticker
- Scroll progress indicator
- Contact section
- Accessible navigation
- Keyboard-friendly controls
- Responsive typography and layouts

## Technologies Used

The portfolio is built using:

- HTML
- CSS
- Vanilla JavaScript
- Google Fonts
- GitHub
- VS Code

No frontend framework is required.

## Project Structure

```text
LEX_ARCHIVE_v1/
├── index.html
├── style.css
├── app.js
├── README.md
└── assets/
    ├── images/
    │   ├── EDUHUB.jpeg
    │   ├── learning_resource.jpeg
    │   ├── PDF.jpeg
    │   ├── panelly.jpg
    │   ├── panelly0.jpg
    │   └── wan-topology.png
    └── projects/
