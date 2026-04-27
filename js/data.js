// ============================================================
// DATA.JS — Single source of truth for all content
// Edit this file to change any text, questions, answers,
// branching logic, or outcomes. Do not edit index.html
// for content changes.
// ============================================================

const CONTENT = {

  // ----------------------------------------------------------
  // META
  // ----------------------------------------------------------
  meta: {
    pageTitle: 'Joint Inventorship Self-Assessment',
    pageDescription: 'A guided interview for researchers and academics to assess whether their contribution may support a joint inventorship claim.',
  },

  // ----------------------------------------------------------
  // OPENING PAGE
  // ----------------------------------------------------------
  opening: {
    appTitle: 'Joint inventorship self-assessment',
    appSubtitle: 'A guided interview for researchers and academics',

    sections: [
      {
        label: 'Purpose',
        paragraphs: [
          {
            text: 'This tool helps you determine whether your contribution to research may support a claim to be named as a joint inventor on a patent. It asks a series of factual questions about the nature, origin, and timing of your contribution, and guides you toward a preliminary assessment of whether the legal threshold has been met. Most people complete the interview in five to ten minutes.',
            muted: false,
          },
          {
            // hasTooltip: true means app.js will render this using the tooltip config below
            // rather than using the text field directly
            text: '',
            muted: true,
            hasTooltip: true,
          },
        ],
      },
      {
        label: 'Authorship vs. ownership vs. inventorship',
        paragraphs: [
          {
            text: 'These three roles are often confused but carry very different legal weight.',
            muted: false,
          },
          {
            text: '<strong>Authorship</strong> on a paper is an academic credit that can reflect many kinds of contributions — supervision, guidance, data collection, writing. It is governed by journal or institutional norms, not law, and does not confer any legal rights.',
            muted: true,
            isHtml: true,
          },
          {
            text: '<strong>Ownership</strong> of a patent is a legal and economic right — typically held by an employer, institution, or assignee — that determines who can commercially exploit the invention. Inventors do not automatically retain ownership; in most research settings, the institution holds it.',
            muted: true,
            isHtml: true,
          },
          {
            text: '<strong>Inventorship</strong> is a narrow legal standard that determines who must be named on the patent itself. It focuses solely on who contributed the specific ideas that make the invention protectable. Authorship and inventorship do not always overlap — and in academic research, they often diverge significantly.',
            muted: true,
            isHtml: true,
          },
        ],
      },
      {
        label: 'Who this is for',
        paragraphs: [
          {
            text: 'Graduate students, postdoctoral researchers, faculty, and other academics who contributed to a research project and believe they may have a claim to joint inventorship — whether or not a patent has been filed yet. You do not need legal knowledge to use this tool. The questions are framed around things you experienced and can describe in your own words.',
            muted: true,
          },
        ],
      },
    ],

    tooltip: {
      // The text rendered before the clickable anchor
      beforeAnchor: 'The threshold question for whether a person is an inventor on a patent is whether their contributions led to the',
      // The clickable underlined text (followed by a ? icon)
      anchorText: 'conception of the inventive idea',
      // The text rendered after the anchor
      afterAnchor: '. This interview focuses solely on that question — it does not assess ownership, assignment, or the other legal requirements for a valid inventorship claim; a patent attorney will assess everything else necessary to evaluate the full merits of your claim.',
      // Tooltip popup content
      popupTitle: 'What is conception?',
      popupBody: 'Conception is the point at which someone has a clear and specific idea of how an invention would work — not just a goal or direction, but an actual solution. In joint inventorship, you do not need to have come up with the entire invention yourself. Contributing a specific idea to even one part of the invention can be enough. Conception is the starting point for any inventorship claim and is the main focus of this interview.',
    },

    disclaimer: {
      title: 'Important — please read before proceeding',
      paragraphs: [
        'This tool does not constitute legal advice and does not create an attorney-client relationship. It is designed to help you organize your thinking before consulting a professional — not to replace that consultation.',
        'If you are affiliated with a university or research institution, your institution may have intellectual property policies that affect your rights, including obligations to disclose and assign inventions. This tool does not account for those policies. You should consult your institution\'s technology transfer office or an attorney before taking any action.',
        'The output of this interview is not a legal determination. Only a qualified patent attorney can assess the full merits of a joint inventorship claim.',
      ],
    },

    acknowledgment: {
      text: 'I understand that this tool does not provide legal advice, does not replace consultation with a patent attorney, and that my institution\'s intellectual property policies may affect my rights independently of this assessment.',
    },

    beginButton: 'Begin the interview',
  },

  // ----------------------------------------------------------
  // RESUME SESSION MODAL
  // ----------------------------------------------------------
  resumeModal: {
    title: 'Resume your session?',
    body: 'You have an interview in progress. Would you like to pick up where you left off, or start fresh?',
    resumeButton: 'Resume interview',
    restartButton: 'Start over',
  },

  // ----------------------------------------------------------
  // GETTING STARTED PAGES
  // Shown after disclaimer acknowledgment, before any questions.
  // Page 1: patent search resources
  // Page 2: free-text contribution description
  // ----------------------------------------------------------
  gettingStarted: {
    page1: {
      heading: 'Before you begin',
      subheading: 'Finding the patent',
      intro: 'If you know a patent has already been granted, or that an application is pending, you may want to locate it before going further. You can search by inventor names, your institution\'s name, or keywords related to the invention.',
      claimsNote: 'Once you find it, look at the <strong>claims</strong> section — this is where the inventive idea is legally defined. The claims tell you exactly what the patent protects. You may want to use them as a reference as you work through this interview to think about how your specific contribution maps onto what is claimed.',
      notRequired: 'Finding the patent is not required to complete this interview. If you cannot locate it, you can still proceed.',
      pendingWarning: '<strong>Note on pending applications:</strong> Claims in a pending application are often broader and may change significantly before the patent is granted. What is ultimately protected may look different from what was originally filed.',
      links: [
        {
          title: 'Granted patents',
          description: 'Search issued US patents by inventor name, assignee, or keyword.',
          url: 'https://patents.google.com/',
          urlDisplay: 'patents.google.com',
        },
        {
          title: 'Pending applications',
          description: 'Search published US patent applications that have not yet been granted.',
          url: 'https://ppubs.uspto.gov/basic/',
          urlDisplay: 'ppubs.uspto.gov',
        },
      ],
      nextButton: 'Continue →',
    },

    page2: {
      heading: 'Describe your contribution',
      intro: 'Before the questions begin, take a moment to write out your contribution in your own words.',
      introMuted: 'This is not a formal statement and does not need to be legally precise or perfectly worded. The purpose is to help you articulate your own thinking before the interview begins, and to serve as a reference if you later share this summary with an attorney.',
      textareaPlaceholder: 'Describe what you contributed to this project. What was the specific idea, method, or element you came up with? When did you contribute it, and what was happening in the project at that time?',
      note: 'Whatever you write here will appear in your downloaded PDF summary regardless of the interview outcome.',
      continueButton: 'Start the interview →',
      skipButton: 'Skip',
    },
  },

  // ----------------------------------------------------------
  // CONCLUSION PAGES (the 3-step "likely met" flow)
  // ----------------------------------------------------------
  conclusion: {
    step1: {
      progressLabel: 'Step 1 of 3',
      cardTitle: 'Conception threshold likely met',
      cardBody: 'Based on your answers, your contribution appears to meet the threshold for conception — a specific, concrete idea independently originated and directed at the invention itself, made while conception was still in progress.',
      rtpNote: ' Your contribution arose during the building or testing phase, but appears to have added to or changed what the invention actually is — a recognized but narrow path to inventorship.',
      bodyText: 'This is the most fundamental requirement for joint inventorship, and clearing it means you have a credible factual basis to explore a claim further.',
      bodyMuted: 'What follows is not more analysis for you to work through — it is a summary of what still needs to be assessed, and what you can do now to be in the best position when you speak to an attorney.',
    },

    step2: {
      progressLabel: 'Step 2 of 3',
      sectionLabel: 'Next Steps',
      intro: 'Regardless of whether a patent has been granted or is even pending, gathering documentation now puts you in a much stronger position if you decide to pursue a claim. If a patent has already been granted or is pending, the law requires that a joint inventorship claim be supported by clear and convincing evidence — your own account alone is not sufficient. The following types of documents can significantly help clarify the strength and viability of your claim when you speak to an attorney.',
      introMuted: 'Ideally each document shows two things: that your contribution happened during the relevant period, and that it connects you to the project. The closer in time these records are to when you made your contribution, the more useful they are likely to be.',
      evidenceItems: [
        'Lab notebooks — dated entries are strongest, witnessed entries even better',
        'Emails, Slack or Teams messages, or internal memos from the relevant period',
        'Draft manuscripts, abstracts, or conference presentations that reference your contribution',
        'Meeting notes or calendar records showing when and how you were involved',
        'Draft patent disclosures or invention reports that identify contributors',
        'Testimony from colleagues who directly witnessed your contribution — ideally supported by documentary evidence',
      ],
    },

    step3: {
      progressLabel: 'Step 3 of 3',
      sectionLabel: 'Full legal review',
      intro: 'This interview helped you work through some of the key factual questions around your contribution. A patent attorney can conduct a full review of your situation — including everything this interview covered and the factors it did not — and advise you on whether you have a viable claim, what steps are available to you, and what the process would look like.',
      introMuted: 'Before that conversation, it helps to have the patent or application in hand if one exists. An attorney can locate it for you, but searching yourself beforehand means you arrive more prepared.',
      legalHelpLabel: 'Seeking legal help',
      legalHelpText1: 'If you are at a university or research institution, your technology transfer office is often the right first contact — they can advise on your institution\'s intellectual property policies, whether they have handled similar situations before, and whether they can refer you to outside counsel if needed.',
      legalHelpText2: 'If you are not affiliated with an institution, look for a patent attorney with experience in inventorship disputes or university intellectual property. What you have worked through here gives you a solid starting point for that first conversation.',
      tip: 'You do not need to have everything figured out before speaking to an attorney. The purpose of a first consultation is to assess whether a claim is worth pursuing — not to have already proven it.',
      pdfButton: 'Download PDF summary',
      restartButton: 'Start over',
    },
  },

  // ----------------------------------------------------------
  // PDF EXPORT
  // ----------------------------------------------------------
  pdf: {
    filename: 'joint-inventorship-self-assessment.pdf',
    title: 'Joint Inventorship Self-Assessment',
    subtitle: 'For attorney reference only',
    contributionLabel: 'Your contribution (self-described)',
    contributionPlaceholder: 'Not provided.',
    responsesLabel: 'Interview responses',
    nextStepsLabel: 'Next steps — documents to gather',
    noResponses: 'No responses recorded.',
    outcomes: {
      met: {
        label: 'Conception threshold likely met',
        body: 'Based on the responses below, the contribution appears to meet the threshold for conception. This is a preliminary self-assessment only. A full legal review is required to evaluate the merits of any claim.',
      },
      ambiguous: {
        label: 'Timing is ambiguous — attorney review recommended',
        body: 'The timing of the contribution relative to when conception was complete is unclear. Attorney review is recommended to assess whether the contribution falls within the conception period.',
      },
    },
    disclaimer: 'This document is the output of a self-administered screening interview and does not constitute legal advice. It does not create an attorney-client relationship. The responses above are self-reported and have not been verified. Only a qualified patent attorney can assess the full merits of a joint inventorship claim. If the user is affiliated with a university or research institution, institutional intellectual property policies may independently affect their rights.',
  },

  // ----------------------------------------------------------
  // QUESTION LABELS (used in PDF / answer log)
  // ----------------------------------------------------------
  qLabels: {
    A:             'What best describes your contribution?',
    A_FU1:         'Did you describe a specific solution alongside the problem?',
    A_FU2:         'Did you suggest the solution at the same time as the problem?',
    A_RTP:         'Did you come up with a specific new idea during building or testing?',
    B:             'Could you describe your idea in specific terms?',
    B_UNSURE:      'Which best matches your contribution?',
    B_UNSURE_SUBJ: 'Would the invention be different without your contribution?',
    B_RTP:         'Could you describe that specific new idea in concrete terms?',
    B_UNSURE_RTP:  'Which better describes what happened during building or testing?',
    C:             'Where did this specific idea come from?',
    C_FU:          'How specific was the direction you were given?',
    C_RTP:         'Where did this specific new idea come from?',
    C_RTP_FU:      'How specific was the direction you were given during building or testing?',
    E:             'What was the state of the project when you contributed?',
    G:             'Did the team\'s understanding of what they were building shift after your contribution?',
    G_UNSURE:      'Did anyone rethink or redesign after your contribution?',
  },

  // ----------------------------------------------------------
  // INTERVIEW SCREENS
  // ----------------------------------------------------------
  TOTAL_DOTS: 6,

  screens: {

    A: {
      progress: 1,
      label: 'Type of contribution',
      q: 'Think about what you actually contributed to this project. Which of these best describes it?',
      sub: 'Choose the option that most closely matches your role.',
      type: 'options',
      options: [
        { text: 'I performed experiments, ran tests, or collected data that others used', next: 'STOP_A1' },
        { text: 'I provided technical skills, equipment, or materials that the project needed', next: 'STOP_A2' },
        { text: 'I came up with an idea about how the invention should work', next: 'B' },
        { text: 'I suggested a problem worth solving or a goal worth pursuing', next: 'A_FU1' },
        { text: 'I contributed during the building or testing phase of the invention', next: 'A_RTP' },
      ],
    },

    STOP_A1: {
      type: 'stop',
      title: 'Conception is likely not met',
      body: 'Performing experiments or collecting data — even skilled and essential work — is not a contribution to conception. Inventorship requires contributing a specific idea about how the invention works, not the labor of testing or building it.',
    },

    STOP_A2: {
      type: 'stop',
      title: 'Conception is likely not met',
      body: 'Providing technical skills, equipment, or materials is a contribution to the project but not to conception of the invention. Inventorship requires contributing a specific idea about how the invention works.',
    },

    A_FU1: {
      progress: 1,
      label: 'Problem suggestion',
      q: 'When you suggested this problem or goal, did you also describe a specific way to solve it — or did you leave the solution open for others to figure out?',
      sub: null,
      type: 'options',
      options: [
        { text: 'I described a specific solution alongside the problem', next: 'A_FU2' },
        { text: 'I identified the problem and left the solution to others', next: 'STOP_A_FU1' },
      ],
    },

    STOP_A_FU1: {
      type: 'stop',
      title: 'Conception is likely not met',
      body: 'Identifying a problem worth solving — even a valuable and insightful one — is a research goal, not a conception. Patent law does not reward the identification of the right problem with inventorship. Conception requires contributing the specific technical solution, not the motivation to find one.',
    },

    A_FU2: {
      progress: 1,
      label: 'Timing of the solution',
      q: 'Did you suggest the solution at the same time as the problem — or did the specific approach emerge through later discussion, experimentation, or someone\'s input?',
      sub: null,
      type: 'options',
      options: [
        { text: 'Same time — the specific solution was part of my original suggestion', next: 'B' },
        { text: 'It developed later or through others\' input', next: 'STOP_A_FU2' },
      ],
    },

    STOP_A_FU2: {
      type: 'stop',
      title: 'Conception is likely not met',
      body: 'If the specific solution emerged through later work or someone else\'s input, your contribution was a research goal that motivated others to conceive the invention — not a conception in its own right. The inventive moment happened downstream of your suggestion.',
    },

    A_RTP: {
      progress: 1,
      label: 'Contribution during building or testing',
      q: 'During that building or testing process, did you come up with a specific new idea that changed or added to what the invention actually is — not just how to build it, but what it became?',
      sub: null,
      type: 'options',
      options: [
        { text: 'Yes — my idea changed or added to what the invention actually is', next: 'B_RTP' },
        { text: 'No — my work was about building, optimizing, or validating what was already designed', next: 'STOP_RTP' },
      ],
    },

    STOP_RTP: {
      type: 'stop',
      title: 'Conception is likely not met',
      body: 'Contributing to building, optimizing, or validating an already-designed invention is reduction to practice — valuable work, but not conception. Inventorship requires that you contributed a specific idea to what the invention is, not just how it was constructed or proven.',
    },

    B_RTP: {
      progress: 2,
      label: 'Specificity of your idea',
      q: 'Could you describe that specific new idea in concrete terms — the actual mechanism, method, or design element you contributed?',
      sub: 'Not just the category of approach — precisely what the idea was.',
      type: 'options',
      options: [
        { text: 'Yes — I can describe it specifically and concretely', next: 'C_RTP' },
        { text: 'No — I can only describe it in general terms', next: 'STOP_B_RTP_GENERAL' },
        { text: 'I\'m not sure', next: 'B_UNSURE_RTP' },
      ],
    },

    B_UNSURE_RTP: {
      progress: 2,
      label: 'Specificity check',
      q: 'Think about the moment you came up with this idea during the building or testing process. Which of these better describes what happened?',
      sub: 'This is one of the less common paths to inventorship — take a moment with this question.',
      type: 'options',
      options: [
        { text: 'I was working through how to build or test something already designed, and I found a better or more efficient way to do it', next: 'STOP_B_RTP' },
        { text: 'I was working through how to build or test something, and in doing so I realized the invention itself needed to be different — I came up with a new element or mechanism that became part of what the invention actually is', next: 'C_RTP' },
      ],
    },

    STOP_B_RTP: {
      type: 'stop',
      title: 'Conception is likely not met',
      body: 'Finding a better or more efficient way to build or test something that was already designed is skilled reduction to practice work — but it is not conception. The inventive idea already existed before your contribution. What you improved was how the invention was constructed or demonstrated, not what the invention is. Patent law recognizes the value of that work but does not treat it as a conceiving act.',
    },

    STOP_B_RTP_GENERAL: {
      type: 'stop',
      title: 'Conception is likely not met',
      body: 'A general or vague idea does not reach the level of specificity that conception requires, even when it arose during reduction to practice. The contribution needs to be specific enough that someone skilled in the field could identify and act on it as a distinct inventive element.',
    },

    C_RTP: {
      progress: 3,
      label: 'Origin of your idea',
      q: 'Thinking about where this specific new idea came from — which best describes your role?',
      sub: null,
      type: 'options',
      options: [
        { text: 'I originated this idea independently during the building or testing process', next: 'CONTINUE_RTP' },
        { text: 'I was told by someone else what the solution needed to be and I implemented it', next: 'STOP_C_INSTRUCTIONS' },
        { text: 'I was directing or managing the people who actually came up with this specific idea', next: 'STOP_C_SUPERVISING' },
        { text: 'Someone gave me a direction during the build process and I developed the specific idea from it', next: 'C_RTP_FU' },
      ],
    },

    C_RTP_FU: {
      progress: 3,
      label: 'Specificity of direction received',
      q: 'Think about the direction or instruction you were given during building or testing. How specific was it?',
      sub: null,
      type: 'options',
      options: [
        { text: 'It pointed me toward a problem within the build process — the specific new idea was something I worked out myself', next: 'CONTINUE_RTP' },
        { text: 'It already described the specific solution in enough detail that I could have implemented it without figuring out the mechanism myself', next: 'STOP_C_FU' },
      ],
    },

    CONTINUE_RTP: { type: 'continue_rtp' },

    B: {
      progress: 2,
      label: 'Specificity of your idea',
      q: 'Could you describe your idea in specific terms — not just "we should try approach X" but how approach X would actually work?',
      sub: 'Think about whether you could write down the mechanism, method, or design in concrete detail.',
      type: 'options',
      options: [
        { text: 'Yes — I can describe it in specific, concrete terms', next: 'C' },
        { text: 'No — I can only describe it in general terms', next: 'STOP_B' },
        { text: 'I\'m not sure', next: 'B_UNSURE' },
      ],
    },

    B_UNSURE: {
      progress: 2,
      label: 'Specificity and subject matter check',
      q: 'Which of these better matches your contribution?',
      sub: null,
      type: 'options',
      options: [
        { text: 'A suggestion of how the invention should work — pointing toward a type of solution without specifying the exact mechanism', next: 'STOP_B' },
        { text: 'A specific technical idea of how the invention could work — describing the actual mechanism precisely enough that someone could act on it', next: 'B_UNSURE_SUBJ' },
        { text: 'A specific idea about how to test, measure, or prove something that was already designed', next: 'STOP_B_SUBJ' },
      ],
    },

    B_UNSURE_SUBJ: {
      progress: 2,
      label: 'Subject matter check',
      q: 'If you removed your contribution from the invention entirely, would the invention be different — or would it just be harder to prove that it works?',
      sub: null,
      type: 'options',
      options: [
        { text: 'The invention would be different — my contribution changed what it is', next: 'C' },
        { text: 'It would just be harder to prove — my contribution helped demonstrate it works', next: 'STOP_B_SUBJ' },
      ],
    },

    STOP_B: {
      type: 'stop',
      title: 'Conception is likely not met',
      body: 'A general or directional idea does not reach the level of specificity that conception requires. Suggesting a category of approach or research direction — even an insightful one — is not the same as conceiving the specific technical solution. Inventorship requires the latter.',
    },

    STOP_B_SUBJ: {
      type: 'stop',
      title: 'Conception is likely not met',
      body: 'A contribution to experimental methodology — testing, measuring, or characterizing an invention — is not a contribution to conception. Even highly skilled experimental design does not qualify if the inventive concept was already formed before that work began.',
    },

    C: {
      progress: 3,
      label: 'Origin of your idea',
      q: 'Thinking about where this specific idea came from — which best describes your role?',
      sub: null,
      type: 'options',
      options: [
        { text: 'I originated this idea independently — it was my own mental act', next: 'E' },
        { text: 'I was given the specific solution by someone else and implemented it', next: 'STOP_C_INSTRUCTIONS' },
        { text: 'I directed or managed others who came up with the specific technical solution', next: 'STOP_C_SUPERVISING' },
        { text: 'Someone else proposed a direction and I developed the specific mechanism from it', next: 'C_FU' },
      ],
    },

    STOP_C_INSTRUCTIONS: {
      type: 'stop',
      title: 'Conception is likely not met',
      body: 'If the specific technical solution was given to you by someone else and your role was to implement it, the conception happened with the person who provided that solution — not with you. Carrying out a pre-specified solution, even skillfully and independently, is execution rather than conception.',
    },

    STOP_C_SUPERVISING: {
      type: 'stop',
      title: 'Conception is likely not met',
      body: 'Directing or managing others who generate the specific technical ideas is an administrative or managerial contribution — not a contribution to conception. Inventorship requires personally contributing an idea, not overseeing the people who do.',
    },

    C_FU: {
      progress: 3,
      label: 'Specificity of direction received',
      q: 'Think about the direction or instruction you were given. How specific was it?',
      sub: null,
      type: 'options',
      options: [
        { text: 'It pointed me toward a problem or general approach — the specific technical solution was something I worked out myself', next: 'E' },
        { text: 'It described a specific technical solution in enough detail that I could have implemented it without figuring out the mechanism myself', next: 'STOP_C_FU' },
      ],
    },

    STOP_C_FU: {
      type: 'stop',
      title: 'Conception is likely not met',
      body: 'If the direction you received already described the specific technical solution in enough detail to implement it, the conception happened with the person who gave that direction — not with you. Carrying out a pre-specified solution, even skillfully and independently, is execution rather than conception.',
    },

    E: {
      progress: 4,
      label: 'Project state and timing',
      q: 'When you made this contribution, what best describes the state of the project?',
      sub: 'Think about what the team was working on and what had already been decided.',
      type: 'options',
      options: [
        { text: 'The team was still debating which approach or method to use', next: 'G' },
        { text: 'A general direction existed but no specific technical solution had been proposed yet', next: 'G' },
        { text: 'A specific solution had already been proposed by someone else, tested or not', next: 'STOP_E' },
        { text: 'The invention was already designed and the team was building, testing, or refining it', next: 'STOP_E' },
      ],
    },

    STOP_E: {
      type: 'stop',
      title: 'Timing — conception is likely already complete',
      body: 'Based on the project\'s state when you contributed, conception appears to have been complete before your contribution. Once a specific technical solution has been proposed by someone else, conception is done — whether or not that solution had been tested yet. Contributions made after that point are generally not counted toward inventorship.',
    },

    G: {
      progress: 5,
      label: 'Effect of your contribution',
      q: 'After you made your contribution, did the team\'s understanding of what they were building stay the same — or shift?',
      sub: 'Think about whether your contribution changed the direction or definition of the invention.',
      type: 'options',
      options: [
        { text: 'It shifted — my contribution changed or clarified what the invention was or would be', next: 'CONTINUE_MAIN' },
        { text: 'It stayed the same — the team already knew what they were building, my contribution helped them get there', next: 'STOP_G' },
        { text: 'I\'m not sure', next: 'G_UNSURE' },
      ],
    },

    G_UNSURE: {
      progress: 5,
      label: 'Timing check',
      q: 'After your contribution, did anyone need to go back and rethink or redesign the invention — or did the work shift to building, testing, and proving it?',
      sub: null,
      type: 'options',
      options: [
        { text: 'Someone rethought or redesigned based on my contribution', next: 'CONTINUE_MAIN' },
        { text: 'The work shifted to building and proving what was already conceived', next: 'STOP_G' },
        { text: 'Still unclear — both happened to some degree', next: 'FLAG_ATTORNEY' },
      ],
    },

    STOP_G: {
      type: 'stop',
      title: 'Timing — conception is likely already complete',
      body: 'Your contribution appears to have come after the inventive concept was already settled. Helping a team reach a goal they had already defined — even in an essential way — is generally not a contribution to conception.',
    },

    FLAG_ATTORNEY: {
      type: 'flag',
      title: 'Timing is ambiguous — attorney review recommended',
      body: 'The timing of your contribution relative to when conception was complete is genuinely unclear from your answers. This is too close to resolve through a self-administered interview. An attorney can assess the specific facts and determine whether your contribution falls within the conception period.',
    },

    CONTINUE_MAIN: { type: 'continue_main' },

  }, // end screens

}; // end CONTENT
