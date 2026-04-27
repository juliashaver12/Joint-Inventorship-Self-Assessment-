# Joint Inventorship Self-Assessment

A guided interview tool that helps graduate students, postdoctoral researchers, and academics determine whether their contribution to a research project may support a claim for joint inventorship on a patent.

## Deployment

This is a fully static site — no server, no build step, no npm required.

### GitHub Pages

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to **Deploy from a branch**, select `main`, folder `/` (root)
4. Your site will be live at `https://yourusername.github.io/repo-name/`

### Netlify

1. Drag and drop this folder onto [netlify.com/drop](https://app.netlify.com/drop)
2. That's it — Netlify gives you a live URL instantly

### Local development

Open `index.html` directly in a browser. No local server required.

---

## Project structure

```
joint-inventorship/
├── index.html      Shell, layout, and all CSS. Rarely needs editing.
├── js/
│   ├── data.js     ALL content — edit this file for any text changes
│   ├── app.js      Interview engine, routing, rendering, state
│   ├── storage.js  Session persistence via localStorage
│   └── pdf.js      Client-side PDF export using jsPDF
└── README.md
```

---

## Making content edits

**`js/data.js` is the only file you need to edit for content changes.**

### Editing question text or answer options

Find the screen by its ID in the `screens` object. Each question screen looks like this:

```js
A: {
  progress: 1,
  label: 'Type of contribution',
  q: 'Think about what you actually contributed...',
  sub: 'Choose the option that most closely matches your role.',
  type: 'options',
  options: [
    { text: 'I performed experiments...', next: 'STOP_A1' },
    { text: 'I came up with an idea...', next: 'B' },
    // ...
  ],
},
```

- `q` — the question text
- `sub` — optional subtext shown below the question (set to `null` to hide)
- `label` — the small uppercase label above the question
- `options[].text` — the answer button text
- `options[].next` — the ID of the screen to go to when this answer is chosen

### Editing outcome text (stop/flag cards)

```js
STOP_A1: {
  type: 'stop',
  title: 'Conception threshold not met',
  body: 'Performing experiments or collecting data...',
},
```

### Editing the opening page

All opening page copy is in `CONTENT.opening`:
- `sections` — array of content sections with label and paragraphs
- `disclaimer` — the amber disclaimer box
- `acknowledgment` — the checkbox text
- `tooltip` — the "conception" hover tooltip

### Editing the conclusion pages

The 3-step "threshold met" flow is in `CONTENT.conclusion.step1`, `step2`, `step3`.

### Editing PDF content

PDF labels, filename, and disclaimer text are in `CONTENT.pdf`.

### Adding a new question screen

1. Add a new entry to `CONTENT.screens` with a unique ID
2. Set `next` on an existing screen's option to point to your new screen ID
3. If the screen is a question with a logged answer, add its label to `CONTENT.qLabels`

### Changing branching logic

Change the `next` value on any answer option to point to a different screen ID.

---

## Session persistence

The app saves progress to `localStorage` automatically. Users who close and reopen the browser will see a modal asking whether to resume or start over. Sessions are keyed to the browser — not an account — so clearing browser data clears the session.

## PDF export

Uses [jsPDF](https://github.com/parallax/jsPDF) loaded from CDN. The PDF is generated entirely client-side and downloaded directly. No data is sent to any server.
