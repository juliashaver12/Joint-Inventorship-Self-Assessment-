// ============================================================
// PDF.JS — Client-side PDF export using jsPDF
// ============================================================

const PDFExport = {

  generate(outcomeType, outcomeTitle, outcomeBody, answerLog, isRtp, contributionText) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'pt', format: 'letter' });

    const cfg = CONTENT.pdf;
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });

    // ---- Colors ----
    const colors = {
      textPrimary:   [44,  44,  42],
      textSecondary: [95,  94,  90],
      textTertiary:  [136, 135, 128],
      met:           { bg: [225, 245, 238], border: [93, 202, 165], text: [4, 52, 44] },
      ambiguous:     { bg: [250, 238, 218], border: [239, 159, 39], text: [65, 36, 2] },
      notMet:        { bg: [252, 235, 235], border: [240, 149, 149], text: [80, 19, 19] },
      purpleLight:   [175, 169, 236],
      divider:       [211, 209, 199],
      evidenceBg:    [241, 239, 232],
      contributionBg:[241, 239, 232],
      green:         [29, 158, 117],
    };

    const margin   = 56;
    const pageW    = doc.internal.pageSize.getWidth();
    const contentW = pageW - margin * 2;
    let y = margin;

    const checkPage = (needed = 40) => {
      if (y + needed > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }
    };

    const filledBox = (bx, by, bw, bh, fillColor, borderColor) => {
      doc.setFillColor(...fillColor);
      if (borderColor) {
        doc.setDrawColor(...borderColor);
        doc.setLineWidth(0.5);
        doc.roundedRect(bx, by, bw, bh, 4, 4, 'FD');
      } else {
        doc.roundedRect(bx, by, bw, bh, 4, 4, 'F');
      }
    };

    const drawDivider = () => {
      checkPage(20);
      doc.setDrawColor(...colors.divider);
      doc.setLineWidth(0.5);
      doc.line(margin, y, margin + contentW, y);
      y += 14;
    };

    const sectionLabel = (text) => {
      checkPage(24);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...colors.textTertiary);
      doc.text(text.toUpperCase(), margin, y);
      y += 14;
    };

    // ==== HEADER ====
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(...colors.textPrimary);
    doc.text(cfg.title.toUpperCase(), margin, y);
    y += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...colors.textTertiary);
    doc.text(`Completed ${date} — ${cfg.subtitle}`, margin, y + 10);
    y += 28;

    drawDivider();

    // ==== OUTCOME BOX ====
    const outcomePalette =
      outcomeType === 'met'       ? colors.met :
      outcomeType === 'ambiguous' ? colors.ambiguous :
      colors.notMet;

    let pdfOutcomeLabel = outcomeTitle;
    let pdfOutcomeBody  = outcomeBody;

    if (outcomeType === 'met') {
      pdfOutcomeLabel = cfg.outcomes.met.label + (isRtp ? ' (building or testing route)' : '');
      pdfOutcomeBody  = cfg.outcomes.met.body;
    } else if (outcomeType === 'ambiguous') {
      pdfOutcomeLabel = cfg.outcomes.ambiguous.label;
      pdfOutcomeBody  = cfg.outcomes.ambiguous.body;
    }

    doc.setFontSize(9);
    const bodyLines = doc.splitTextToSize(pdfOutcomeBody, contentW - 28);
    const boxH = 14 + 6 + bodyLines.length * 13 + 14;

    checkPage(boxH + 16);
    filledBox(margin, y, contentW, boxH, outcomePalette.bg, outcomePalette.border);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...outcomePalette.text);
    doc.text(pdfOutcomeLabel.toUpperCase(), margin + 14, y + 16);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...outcomePalette.text);
    let bodyY = y + 30;
    bodyLines.forEach(line => {
      doc.text(line, margin + 14, bodyY);
      bodyY += 13;
    });

    y += boxH + 20;

    // ==== CONTRIBUTION TEXT (always shown) ====
    drawDivider();
    sectionLabel(cfg.contributionLabel);

    const contribText = (contributionText || '').trim() || cfg.contributionPlaceholder;
    const contribLines = doc.splitTextToSize(contribText, contentW - 24);
    const contribBoxH  = contribLines.length * 13 + 20;

    checkPage(contribBoxH + 8);
    filledBox(margin, y - 10, contentW, contribBoxH, colors.contributionBg, null);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...colors.textPrimary);
    contribLines.forEach((line, i) => {
      doc.text(line, margin + 12, y + i * 13);
    });
    y += contribBoxH + 8;

    // ==== INTERVIEW RESPONSES ====
    drawDivider();
    sectionLabel(cfg.responsesLabel);

    if (!answerLog || answerLog.length === 0) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...colors.textSecondary);
      doc.text(cfg.noResponses, margin, y);
      y += 20;
    } else {
      answerLog.forEach((entry, idx) => {
        const qLines = doc.splitTextToSize(entry.q, contentW);
        const aLines = doc.splitTextToSize(entry.a, contentW - 14);
        const entryH = qLines.length * 12 + aLines.length * 12 + 16;
        checkPage(entryH);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(...colors.textPrimary);
        qLines.forEach((line, i) => {
          doc.text(line, margin, y + i * 12);
        });
        y += qLines.length * 12 + 2;

        doc.setFillColor(...colors.purpleLight);
        doc.rect(margin, y, 2, aLines.length * 12 + 2, 'F');

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...colors.textSecondary);
        aLines.forEach((line, i) => {
          doc.text(line, margin + 10, y + i * 12 + 9);
        });
        y += aLines.length * 12 + 16;

        if (idx < answerLog.length - 1) {
          doc.setDrawColor(...colors.divider);
          doc.setLineWidth(0.3);
          doc.line(margin, y - 6, margin + contentW, y - 6);
        }
      });
    }

    y += 8;

    // ==== NEXT STEPS / EVIDENCE (met outcomes only) ====
    if (outcomeType === 'met') {
      drawDivider();
      sectionLabel(cfg.nextStepsLabel);

      const evidenceItems = CONTENT.conclusion.step2.evidenceItems;
      evidenceItems.forEach(item => {
        const itemLines = doc.splitTextToSize(item, contentW - 20);
        const itemH     = itemLines.length * 12 + 10;
        checkPage(itemH + 6);

        filledBox(margin, y - 10, contentW, itemH, colors.evidenceBg, null);

        doc.setFillColor(...colors.green);
        doc.circle(margin + 10, y - 2, 2.5, 'F');

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...colors.textPrimary);
        itemLines.forEach((line, i) => {
          doc.text(line, margin + 20, y + i * 12);
        });
        y += itemH + 4;
      });

      y += 8;
    }

    // ==== DISCLAIMER ====
    checkPage(60);
    drawDivider();

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...colors.textTertiary);

    const disclaimerLines = doc.splitTextToSize(cfg.disclaimer, contentW);
    disclaimerLines.forEach(line => {
      checkPage(12);
      doc.text(line, margin, y);
      y += 11;
    });

    doc.save(cfg.filename);
  },

};
