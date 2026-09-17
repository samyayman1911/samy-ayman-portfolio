/**
 * SAMY AYMAN - CYBERSECURITY & SOC ANALYST PORTFOLIO
 * Vanilla JavaScript Functionality
 * Features: Dark/Light Mode, Mobile Navigation, Scrollspy,
 * Intersection Reveal, Project Modals, Form Validation, Clipboard & Toast
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initScrollspy();
  initScrollReveal();
  initProjectModals();
  initContactForm();
  initBackToTop();
  initCopyClipboard();
  initFooterYear();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const savedTheme = localStorage.getItem('samy_portfolio_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Default to Dark Mode per specification
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'dark');
  applyTheme(initialTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('samy_portfolio_theme', newTheme);
    showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`);
    themeToggleBtn.setAttribute('title', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`);
  }
}

/* ==========================================================================
   2. Mobile Navigation
   ========================================================================== */
function initMobileNav() {
  const navToggle = document.getElementById('mobile-nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-link');

  if (!navToggle || !navLinks) return;

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close mobile nav on link click
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close mobile nav on click outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !navToggle.contains(e.target) && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================================================
   3. Active Navigation Spy (Scrollspy)
   ========================================================================== */
function initScrollspy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   4. Scroll Reveal Animations
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   5. Project Deep-Dive Modals & Interactive Details
   ========================================================================== */
const projectDetailsData = {
  project1: {
    title: "SOC Perimeter Defense & Suricata NIDS/NIPS Lab",
    category: "SOC / Network Security / IDS/IPS",
    status: "Completed / Hands-on Lab",
    description: "Built a multi-node virtual SOC lab using pfSense Firewall, Kali Linux, and Ubuntu Server to simulate an enterprise perimeter security environment.",
    overview: "This project replicates a real-world enterprise boundary protection architecture. pfSense was placed at the perimeter dividing external and internal zones, while Suricata was deployed on Ubuntu Server to monitor ingress/egress network flows in both NIDS and inline NIPS modes.",
    keyWork: [
      "Configured pfSense as the primary network perimeter firewall with customized WAN/LAN interfaces",
      "Used Kali Linux to generate controlled security traffic, scanning probes, and simulated threat flows",
      "Deployed Suricata on Ubuntu Server with tuned threading and interface packet capture parameters",
      "Configured Suricata in NIDS passive mode and evaluated alert signatures",
      "Tested inline NIPS functionality to automatically drop malicious traffic streams",
      "Created custom detection rules targeting specific protocol anomalies and headers",
      "Monitored Suricata alerts and inspected telemetry within fast.log and eve.json",
      "Conducted ICMP sweeps, TCP SYN flood simulations, and multi-port scanning probes",
      "Configured pfSense NAT rules, firewall policies, and state-table inspection"
    ],
    technologies: ["pfSense", "Suricata", "Kali Linux", "Ubuntu Server", "VirtualBox", "Linux CLI"],
    outcomes: "Demonstrated full attack-to-alert correlation: attack initiated from Kali -> detected/blocked by pfSense & Suricata -> analyzed via logs."
  },
  project2: {
    title: "Linux Enterprise Firewall Management",
    category: "Linux Security / Firewall",
    status: "Completed / Hands-on Lab",
    description: "Configured Linux iptables rules to control inbound and outbound network traffic and enforce basic host-level security policies.",
    overview: "A dedicated host-defense implementation on Ubuntu Server focusing on strict ingress/egress control, default-drop chain policies, stateful packet inspection, and connection tracking.",
    keyWork: [
      "Designed and implemented packet-filtering rules across INPUT, FORWARD, and OUTPUT chains",
      "Enforced default DROP policies to prevent unauthorized inbound traffic",
      "Configured stateful connection tracking (ESTABLISHED, RELATED) for legitimate reply flows",
      "Restricted SSH access to trusted administration subnets with rate-limiting rules",
      "Controlled outbound traffic to restrict unauthorized exfiltration channels",
      "Implemented port-blocking policies for vulnerable legacy services",
      "Generated test traffic to validate rule ordering, hit counters, and logging behavior",
      "Investigated dropped connection logs using syslog and journalctl"
    ],
    technologies: ["Linux", "iptables", "Ubuntu Server", "Networking", "Bash CLI"],
    outcomes: "Established a hardened host defense baseline, verifying zero unauthorized packet ingress while maintaining valid services."
  },
  project3: {
    title: "Enterprise Network Infrastructure Design",
    category: "Networking / Cisco",
    status: "Completed / Network Lab",
    description: "Designed and configured a multi-VLAN enterprise network using Cisco Packet Tracer with routing, segmentation, ACLs, and NAT/PAT.",
    overview: "Designed a multi-tier corporate network topology separating Corporate Management, Accounting, IT, Guest, and Server Farm segments. Integrated dynamic routing protocols and edge security.",
    keyWork: [
      "Designed hierarchical multi-VLAN network architecture across Cisco Catalyst switches",
      "Configured VLANs, 802.1Q trunking, and native VLAN security best practices",
      "Implemented Router-on-a-Stick and Layer-3 Inter-VLAN Routing",
      "Configured dynamic routing protocols including OSPF (Single Area) and RIPv2",
      "Applied Standard and Extended Access Control Lists (ACLs) to segregate departmental traffic",
      "Configured Port Address Translation (NAT/PAT) on edge routers for internal LAN internet access",
      "Segmented sensitive network resources from unauthorized guest network access",
      "Validated end-to-end connectivity, convergence times, and ACL drop behavior using simulation mode"
    ],
    technologies: ["Cisco Packet Tracer", "VLAN", "ACL", "OSPF", "RIP", "NAT/PAT", "Cisco IOS"],
    outcomes: "Engineered a scalable enterprise topology with verified traffic segregation and edge NAT boundary protection."
  },
  project4: {
    title: "Multi-Branch Network Design",
    category: "Network Infrastructure / Cisco",
    status: "Completed / Network Lab",
    description: "Designed and configured a network topology connecting multiple branches and enabling communication between different network segments.",
    overview: "Simulated a multi-site enterprise infrastructure connecting a Central Headquarters with remote Regional Branch Offices over simulated WAN links.",
    keyWork: [
      "Connected multiple branch locations with serial and Ethernet WAN/LAN links",
      "Configured Cisco edge routers and distribution switches across all locations",
      "Engineered efficient VLSM IP addressing schemes to prevent address exhaustion",
      "Configured static routing and dynamic routing redistribution between sites",
      "Enforced security boundaries preventing branch-to-branch cross-contamination",
      "Conducted extensive ping, traceroute, and packet-inspection tests across WAN links",
      "Troubleshot network communication anomalies and convergence delays"
    ],
    technologies: ["Cisco Packet Tracer", "Routers", "Switches", "IP Addressing", "Routing", "VLSM"],
    outcomes: "Successfully routed inter-branch communications while isolating localized subnet broadcasts."
  },
  project5: {
    title: "SOC Monitoring & Threat Detection Lab",
    category: "SOC / Threat Detection",
    status: "Hands-on Security Lab",
    description: "Built a controlled security lab to understand how suspicious network activity is generated, detected, logged, and investigated from a SOC perspective.",
    overview: "A specialized security monitoring ecosystem designed to bridge offensive adversary tactics with defensive detection engineering and triage methodologies.",
    keyWork: [
      "Generated controlled offensive traffic from Kali Linux (reconnaissance, SYN sweeps, port enumeration)",
      "Captured live packet streams using Wireshark and analyzed protocol headers & TCP flags",
      "Configured Suricata IDS to inspect captured network flows in real time",
      "Monitored alert streams and correlated event timestamps across multiple nodes",
      "Investigated suspicious anomalies, extracting indicators of compromise (IPs, user-agents)",
      "Created and tuned custom Suricata detection rules to reduce false positives",
      "Connected offensive adversary activity directly with defensive triage workflows"
    ],
    technologies: ["Kali Linux", "Wireshark", "Suricata", "Ubuntu Server", "VirtualBox"],
    outcomes: "Demonstrated end-to-end detection engineering: from threat generation to packet inspection, rule tuning, and incident triage."
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-project-title');
  const modalBody = document.getElementById('modal-project-body');
  const triggerBtns = document.querySelectorAll('[data-project-id]');

  if (!modalOverlay || !modalCloseBtn) return;

  function openModal(projectId) {
    const data = projectDetailsData[projectId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalBody.innerHTML = `
      <div style="margin-bottom: 1.25rem; display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
        <span class="badge badge-blue">${data.category}</span>
        <span class="badge badge-green">${data.status}</span>
      </div>
      
      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-family: var(--font-heading); font-size: 1.05rem; margin-bottom: 0.5rem; color: var(--text-primary);">Project Overview</h4>
        <p style="color: var(--text-secondary); line-height: 1.7; font-size: 0.95rem;">${data.overview}</p>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-family: var(--font-heading); font-size: 1.05rem; margin-bottom: 0.75rem; color: var(--text-primary); display: flex; align-items: center; gap: 0.5rem;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
          Key Technical Work & Achievements
        </h4>
        <ul style="display: flex; flex-direction: column; gap: 0.5rem; padding-left: 0.25rem;">
          ${data.keyWork.map(item => `
            <li style="font-size: 0.9rem; color: var(--text-secondary); display: flex; align-items: flex-start; gap: 0.5rem; line-height: 1.5;">
              <span style="color: var(--accent-primary); font-weight: bold; flex-shrink: 0;">▹</span>
              <span>${item}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-family: var(--font-heading); font-size: 1.05rem; margin-bottom: 0.5rem; color: var(--text-primary);">Defensive Outcome</h4>
        <p style="background: rgba(34, 197, 94, 0.08); border-left: 3px solid var(--accent-primary); padding: 0.85rem 1rem; border-radius: 4px; font-size: 0.9rem; color: var(--text-primary); line-height: 1.6;">
          ${data.outcomes}
        </p>
      </div>

      <div>
        <h4 style="font-family: var(--font-heading); font-size: 1.05rem; margin-bottom: 0.6rem; color: var(--text-primary);">Technologies & Tools Used</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${data.technologies.map(tech => `<span class="tech-pill">${tech}</span>`).join('')}
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-id');
      openModal(projectId);
    });
  });

  modalCloseBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. Contact Form Simulation & Validation
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#contact-name')?.value.trim();
    const email = form.querySelector('#contact-email')?.value.trim();
    const subject = form.querySelector('#contact-subject')?.value.trim();
    const message = form.querySelector('#contact-message')?.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="16"></circle></svg>
      Sending message...
    `;

    // Simulate clean dispatch
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();
      showToast('✓ Message dispatched! Thank you for reaching out, Samy will respond promptly.');
    }, 900);
  });
}

/* ==========================================================================
   7. Back To Top
   ========================================================================== */
function initBackToTop() {
  const floatingBtn = document.getElementById('floating-back-to-top');
  const footerBtn = document.getElementById('footer-back-to-top');

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  if (floatingBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        floatingBtn.classList.add('visible');
      } else {
        floatingBtn.classList.remove('visible');
      }
    });

    floatingBtn.addEventListener('click', scrollToTop);
  }

  if (footerBtn) {
    footerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToTop();
    });
  }
}

/* ==========================================================================
   8. Copy To Clipboard & Toast Utility
   ========================================================================== */
function initCopyClipboard() {
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (!copyEmailBtn) return;

  copyEmailBtn.addEventListener('click', () => {
    const email = 'samymansour1911@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast('✓ Email copied to clipboard: ' + email);
    }).catch(() => {
      showToast('Email: ' + email);
    });
  });
}

function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  if (type === 'error') {
    toast.style.borderColor = '#EF4444';
    toast.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.3)';
  }

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${type === 'error' ? '#EF4444' : '#22C55E'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${type === 'error' 
        ? '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>' 
        : '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>'
      }
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

/* ==========================================================================
   9. Footer Year
   ========================================================================== */
function initFooterYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}