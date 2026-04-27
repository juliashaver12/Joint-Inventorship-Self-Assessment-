// ============================================================
// APP.JS — Interview engine, rendering, state management
// Reads all content from CONTENT (data.js).
// Persists state via Storage (storage.js).
// Exports PDF via PDFExport (pdf.js).
// ============================================================

// ---- State ----
let state = {
  started:              false,   // has the interview been started
  acknowledged:         false,   // disclaimer checkbox
  gettingStartedPage:   0,       // 0 = not started, 1 = page 1, 2 = page 2
  contributionText:     '',      // free-text from getting started page 2
  current:              'A',     // current screen ID
  history:              [],      // navigation stack for Back button
  answerLog:            [],      // [{ q, a }] for PDF
  conclusionIsRtp:      false,
  conclusionStep:       null,    // 1|2|3
  phase:                'opening', // 'opening' | 'getting-started' | 'interview' | 'conclusion'
};

let tooltipOpen = false;

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  buildOpeningPage();
  checkForResumableSession();
});

// ---- Session resume check ----
function checkForResumableSession() {
  if (!Storage.hasResumableSession()) return;
  showResumeModal();
}

// ---- Build opening page from CONTENT ----
function buildOpeningPage() {
  const c = CONTENT.opening;

  document.getElementById('app-title').textContent    = c.appTitle;
  document.getElementById('app-subtitle').textContent = c.appSubtitle;

  const sectionsEl = document.getElementById('opening-sections');
  sectionsEl.innerHTML = '';

  c.sections.forEach((section, si) => {
    if (si > 0) sectionsEl.insertAdjacentHTML('beforeend', '<hr class="divider">');

    sectionsEl.insertAdjacentHTML('beforeend',
      `<div class="section-heading">${section.label}</div>`
    );

    section.paragraphs.forEach(p => {
      if (p.hasTooltip) {
        // Render the tooltip paragraph using the tooltip config
        const tt = c.tooltip;
        sectionsEl.insertAdjacentHTML('beforeend', `
          <div class="body-text-muted">
            ${tt.beforeAnchor}
            <span class="tooltip-anchor" id="conception-anchor" tabindex="0" role="button" aria-expanded="false"
              onclick="toggleTooltip(event)" onkeydown="if(event.key==='Enter'||event.key===' ')toggleTooltip(event)"
            >${tt.anchorText}<span class="tooltip-qmark" aria-hidden="true">?</span><div class="tooltip-bubble" id="conception-tooltip" role="tooltip">
                <div class="tooltip-title">${tt.popupTitle}</div>
                ${tt.popupBody}
              </div></span>${tt.afterAnchor}
          </div>`
        );
      } else {
        const cls = p.muted ? 'body-text-muted' : 'body-text';
        if (p.isHtml) {
          sectionsEl.insertAdjacentHTML('beforeend', `<div class="${cls}">${p.text}</div>`);
        } else {
          const div = document.createElement('div');
          div.className = cls;
          div.textContent = p.text;
          sectionsEl.appendChild(div);
        }
      }
    });
  });

  // Disclaimer
  const d = c.disclaimer;
  document.getElementById('disclaimer-title').textContent = d.title;
  const disclaimerBody = document.getElementById('disclaimer-body');
  disclaimerBody.innerHTML = d.paragraphs.map(p => `<div>${p}</div>`).join('');

  // Acknowledgment + begin button
  document.getElementById('ack-text').textContent      = c.acknowledgment.text;
  document.getElementById('begin-btn').textContent     = c.beginButton;
}

// ---- Tooltip ----
function toggleTooltip(e) {
  if (e) e.stopPropagation();
  const tip    = document.getElementById('conception-tooltip');
  const anchor = document.getElementById('conception-anchor');
  tooltipOpen  = !tooltipOpen;
  tip.classList.toggle('visible', tooltipOpen);
  if (anchor) anchor.setAttribute('aria-expanded', String(tooltipOpen));
}

document.addEventListener('click', (e) => {
  const anchor = document.getElementById('conception-anchor');
  if (anchor && !anchor.contains(e.target)) {
    const tip = document.getElementById('conception-tooltip');
    if (tip) { tip.classList.remove('visible'); tooltipOpen = false; }
  }
});

// ---- Acknowledgment checkbox ----
function toggleAck() {
  state.acknowledged = !state.acknowledged;
  document.getElementById('ack-box').classList.toggle('checked', state.acknowledged);
  const btn = document.getElementById('begin-btn');
  btn.classList.toggle('enabled', state.acknowledged);
  btn.disabled = !state.acknowledged;
}

// ---- Start interview (from opening page) ----
function startInterview() {
  if (!state.acknowledged) return;
  state.started             = true;
  state.gettingStartedPage  = 1;
  state.phase               = 'getting-started';
  Storage.save(state);
  showPhase('getting-started');
  renderGettingStarted(1);
}

// ---- Getting started pages ----
function renderGettingStarted(page) {
  state.gettingStartedPage = page;
  Storage.save(state);
  const area = document.getElementById('getting-started-area');

  if (page === 1) {
    const gs = CONTENT.gettingStarted.page1;
    const linksHtml = gs.links.map(l => `
      <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="link-block-anchor">
        <div class="link-block link-block--clickable">
          <div class="link-block-row">
            <div class="link-title">${l.title}</div>
            <div class="link-arrow">↗</div>
          </div>
          <div class="link-description">${l.description}</div>
          <div class="link-url">${l.urlDisplay}</div>
        </div>
      </a>`
    ).join('');

    area.innerHTML = `
      <div class="gs-heading">${gs.heading}</div>
      <div class="gs-subheading">${gs.subheading}</div>
      <div class="body-text">${gs.intro}</div>
      <div class="body-text-muted">${gs.claimsNote}</div>
      ${linksHtml}
      <div class="tip-block">${gs.notRequired}</div>
      <div class="flag-card" style="margin-top:0">
        <div class="flag-body">${gs.pendingWarning}</div>
      </div>
      <div class="nav-row">
        <button class="action-btn primary" onclick="renderGettingStarted(2)">${gs.nextButton}</button>
      </div>`;

  } else if (page === 2) {
    const gs = CONTENT.gettingStarted.page2;
    area.innerHTML = `
      <div class="gs-heading">${gs.heading}</div>
      <div class="body-text">${gs.intro}</div>
      <div class="body-text-muted">${gs.introMuted}</div>
      <textarea
        id="contribution-textarea"
        class="contribution-textarea"
        placeholder="${gs.textareaPlaceholder}"
        rows="6"
        oninput="saveContributionText(this.value)"
      >${escHtml(state.contributionText)}</textarea>
      <div class="tip-block" style="margin-top:10px">${gs.note}</div>
      <div class="nav-row">
        <button class="action-btn" onclick="renderGettingStarted(1)">← Back</button>
        <button class="action-btn primary" onclick="beginQuestions()">${gs.continueButton}</button>
        <button class="action-btn" onclick="beginQuestions()">${gs.skipButton}</button>
      </div>`;
  }
}

function saveContributionText(val) {
  state.contributionText = val;
  Storage.save(state);
}

function beginQuestions() {
  // Capture textarea value one final time before leaving the page
  const ta = document.getElementById('contribution-textarea');
  if (ta) state.contributionText = ta.value;
  state.current  = 'A';
  state.history  = [];
  state.answerLog = [];
  state.phase    = 'interview';
  Storage.save(state);
  showPhase('interview');
  render('A');
}

// ---- Resume from saved session ----
function resumeSession() {
  const saved = Storage.load();
  if (!saved) return;
  state = saved;
  closeResumeModal();

  if (state.phase === 'conclusion') {
    showPhase('conclusion');
    showConclusion(state.conclusionStep || 1);
  } else if (state.phase === 'getting-started') {
    showPhase('getting-started');
    renderGettingStarted(state.gettingStartedPage || 1);
  } else {
    showPhase('interview');
    render(state.current);
  }
}

// ---- Restart from scratch ----
function restartFull() {
  Storage.clear();
  state = {
    started:             false,
    acknowledged:        false,
    gettingStartedPage:  0,
    contributionText:    '',
    current:             'A',
    history:             [],
    answerLog:           [],
    conclusionIsRtp:     false,
    conclusionStep:      null,
    phase:               'opening',
  };
  closeResumeModal();
  showPhase('opening');
  document.getElementById('ack-box').classList.remove('checked');
  const btn = document.getElementById('begin-btn');
  btn.classList.remove('enabled');
  btn.disabled = true;
}

// ---- Phase visibility ----
function showPhase(phase) {
  document.getElementById('opening').style.display         = phase === 'opening'          ? 'block' : 'none';
  document.getElementById('getting-started').style.display = phase === 'getting-started'  ? 'block' : 'none';
  document.getElementById('interview').style.display       = phase === 'interview'         ? 'block' : 'none';
  document.getElementById('conclusion').style.display      = phase === 'conclusion'        ? 'block' : 'none';
}

// ---- Main render function ----
function render(id) {
  const screens = CONTENT.screens;
  const s       = screens[id];
  if (!s) return;

  state.current = id;
  Storage.save(state);

  const area        = document.getElementById('question-area');
  const backBtn     = document.getElementById('back-btn');
  const progressBar = document.getElementById('progress-bar');

  backBtn.style.display = state.history.length > 0 ? 'block' : 'none';

  // Handle terminal / routing screen types
  if (s.type === 'continue_main' || s.type === 'continue_rtp') {
    state.conclusionIsRtp = (s.type === 'continue_rtp');
    state.phase           = 'conclusion';
    state.conclusionStep  = 1;
    Storage.save(state);
    showPhase('conclusion');
    showConclusion(1);
    return;
  }

  // Progress dots
  if (s.progress !== undefined) {
    let dots = '';
    for (let i = 1; i <= CONTENT.TOTAL_DOTS; i++) {
      const cls = i < s.progress ? 'done' : i === s.progress ? 'active' : '';
      dots += `<div class="progress-dot ${cls}"></div>`;
    }
    progressBar.innerHTML = dots;
  } else {
    progressBar.innerHTML = '';
  }

  if (s.type === 'options') {
    const optHtml = s.options.map(o =>
      `<button class="opt-btn" onclick="choose('${o.next}', this)">${o.text}</button>`
    ).join('');
    area.innerHTML = `
      <div class="q-label">${s.label}</div>
      <div class="q-text">${s.q}</div>
      ${s.sub ? `<div class="q-sub">${s.sub}</div>` : ''}
      ${optHtml}`;

  } else if (s.type === 'stop') {
    progressBar.innerHTML = '';
    area.innerHTML = `
      <div class="stop-card">
        <div class="stop-title">${s.title}</div>
        <div class="stop-body">${s.body}</div>
      </div>
      <div class="nav-row">
        ${state.history.length > 0
          ? '<button class="action-btn" onclick="goBack()">← Back</button>'
          : ''}
        <button class="action-btn" onclick="restartFull()">Start over</button>
        <button class="action-btn print-btn" onclick="downloadPDF('not-met', '${escAttr(s.title)}', '${escAttr(s.body)}')">Download PDF summary</button>
      </div>`;

  } else if (s.type === 'flag') {
    progressBar.innerHTML = '';
    area.innerHTML = `
      <div class="flag-card">
        <div class="flag-title">${s.title}</div>
        <div class="flag-body">${s.body}</div>
      </div>
      <div class="nav-row">
        ${state.history.length > 0
          ? '<button class="action-btn" onclick="goBack()">← Back</button>'
          : ''}
        <button class="action-btn" onclick="restartFull()">Start over</button>
        <button class="action-btn print-btn" onclick="downloadPDF('ambiguous', '${escAttr(s.title)}', '${escAttr(s.body)}')">Download PDF summary</button>
      </div>`;
  }
}

// ---- Choose an answer ----
function choose(next, btn) {
  const answerText = btn ? btn.textContent.trim() : '';
  logAnswer(state.current, answerText);
  state.history.push(state.current);
  Storage.save(state);
  render(next);
}

// ---- Go back ----
function goBack() {
  if (state.history.length === 0) return;
  const label = CONTENT.qLabels[state.current];
  if (label) {
    const idx = state.answerLog.map(e => e.q).lastIndexOf(label);
    if (idx !== -1) state.answerLog.splice(idx, 1);
  }
  state.current = state.history.pop();
  Storage.save(state);
  render(state.current);
}

// ---- Go back from conclusion to interview ----
function goBackFromConclusion() {
  state.phase          = 'interview';
  state.conclusionStep = null;
  Storage.save(state);
  showPhase('interview');
  render(state.current);
}

// ---- Log answer ----
function logAnswer(screenId, answerText) {
  const label = CONTENT.qLabels[screenId];
  if (label) state.answerLog.push({ q: label, a: answerText });
}

// ---- Conclusion multi-step flow ----
function showConclusion(step) {
  state.conclusionStep = step;
  Storage.save(state);

  const area    = document.getElementById('conclusion-area');
  const backBtn = document.getElementById('conclusion-back-btn');
  const c       = CONTENT.conclusion;

  if (step === 1) {
    backBtn.style.display = 'block';
    backBtn.onclick = () => goBackFromConclusion();
    const rtpNote = state.conclusionIsRtp ? c.step1.rtpNote : '';
    area.innerHTML = `
      <div class="progress-label">${c.step1.progressLabel}</div>
      <div class="continue-card">
        <div class="continue-title">${c.step1.cardTitle}</div>
        <div class="continue-body">${c.step1.cardBody}${rtpNote}</div>
      </div>
      <div class="body-text">${c.step1.bodyText}</div>
      <div class="body-text-muted">${c.step1.bodyMuted}</div>
      <div class="nav-row">
        <button class="action-btn" onclick="goBackFromConclusion()">← Back</button>
        <button class="action-btn primary" onclick="showConclusion(2)">Next ↗</button>
      </div>`;

  } else if (step === 2) {
    backBtn.style.display = 'none';
    const cs = c.step2;
    const itemsHtml = cs.evidenceItems.map(item =>
      `<div class="doc-item"><div class="doc-bullet"></div><div>${item}</div></div>`
    ).join('');
    area.innerHTML = `
      <div class="progress-label">${cs.progressLabel}</div>
      <div class="conclusion-section-heading">${cs.sectionLabel}</div>
      <div class="body-text">${cs.intro}</div>
      <div class="body-text-muted">${cs.introMuted}</div>
      ${itemsHtml}
      <div class="nav-row">
        <button class="action-btn" onclick="showConclusion(1)">← Back</button>
        <button class="action-btn primary" onclick="showConclusion(3)">Next ↗</button>
      </div>`;

  } else if (step === 3) {
    backBtn.style.display = 'none';
    const cs = c.step3;
    area.innerHTML = `
      <div class="progress-label">${cs.progressLabel}</div>
      <div class="conclusion-section-heading">${cs.sectionLabel}</div>
      <div class="body-text">${cs.intro}</div>
      <div class="body-text-muted">${cs.introMuted}</div>
      <hr class="divider">
      <div class="conclusion-section-heading">${cs.legalHelpLabel}</div>
      <div class="body-text-muted">${cs.legalHelpText1}</div>
      <div class="body-text-muted">${cs.legalHelpText2}</div>
      <div class="tip-block">${cs.tip}</div>
      <div class="nav-row">
        <button class="action-btn" onclick="showConclusion(2)">← Back</button>
        <button class="action-btn print-btn" onclick="downloadPDF('met', '', '')">${cs.pdfButton}</button>
        <button class="action-btn" onclick="restartFull()">${cs.restartButton}</button>
      </div>`;
  }
}

// ---- PDF export ----
function downloadPDF(outcomeType, titleOverride, bodyOverride) {
  PDFExport.generate(
    outcomeType,
    titleOverride,
    bodyOverride,
    state.answerLog,
    state.conclusionIsRtp,
    state.contributionText
  );
}

// ---- Resume modal ----
function showResumeModal() {
  const c = CONTENT.resumeModal;
  document.getElementById('resume-modal-title').textContent = c.title;
  document.getElementById('resume-modal-body').textContent  = c.body;
  document.getElementById('resume-btn').textContent         = c.resumeButton;
  document.getElementById('modal-restart-btn').textContent  = c.restartButton;
  document.getElementById('modal-overlay').style.display    = 'flex';
}

function closeResumeModal() {
  document.getElementById('modal-overlay').style.display = 'none';
}

// ---- Utilities ----
function escAttr(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '&quot;')
    .replace(/\n/g, ' ');
}

function escHtml(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
