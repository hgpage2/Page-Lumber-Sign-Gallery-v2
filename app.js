/* =========================================================
   PAGE LUMBER SIGN STUDIO APP
   ========================================================= */

(() => {
  const app = document.getElementById("app");
  const templates = window.PAGE_LUMBER_TEMPLATES || [];

  const DEFAULT_SETTINGS = templates.map((t, index) => ({
    id: t.id,
    public: true,
    order: index
  }));

  function getSettings() {
    try {
      const saved = JSON.parse(localStorage.getItem("pageLumberTemplateSettings"));
      if (!Array.isArray(saved)) return DEFAULT_SETTINGS;

      // Ensure newly added templates still appear.
      const merged = DEFAULT_SETTINGS.map(def => {
        const found = saved.find(item => item.id === def.id);
        return found ? { ...def, ...found } : def;
      });
      return merged;
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  function getVisibleTemplates() {
    const settings = getSettings();
    return templates
      .map(template => {
        const state = settings.find(s => s.id === template.id) || { public: true, order: 999 };
        return { template, state };
      })
      .filter(item => item.state.public !== false)
      .sort((a, b) => a.state.order - b.state.order)
      .map(item => item.template);
  }

  function route() {
    const hash = window.location.hash || "#/";
    const editorMatch = hash.match(/^#\/template\/([^/?]+)/);

    if (editorMatch) {
      const id = decodeURIComponent(editorMatch[1]);
      renderEditor(id);
      return;
    }

    renderGallery();
  }

  function renderGallery() {
    document.title = "Page Lumber Sign Studio";
    const visible = getVisibleTemplates();

    app.innerHTML = `
      <header class="site-header">
        <div>
          <div class="brand-lockup">
            <div class="brand-mark">PL</div>
            <div>
              <p class="eyebrow">Page Lumber sign library</p>
              <h1 class="site-title">Choose a sign.</h1>
            </div>
          </div>
          <p class="site-subtitle">
            Select the template you need, click the sign text to edit it, then print or save it as a PDF.
            Your changes will not alter the original template.
          </p>
        </div>
        <div class="header-actions">
          <a class="button button-secondary" href="admin.html">Admin</a>
        </div>
      </header>

      <main class="gallery-shell">
        <div id="galleryGrid" class="gallery-grid"></div>
      </main>
    `;

    const grid = document.getElementById("galleryGrid");

    visible.forEach(template => {
      const card = document.createElement("article");
      card.className = "template-card";
      card.innerHTML = `
        <div class="preview-window">
          <div class="preview-stage"></div>
        </div>
        <div class="template-meta">
          <h2 class="template-name">${escapeHtml(template.name)}</h2>
          <p class="template-dimensions">${escapeHtml(template.sizeLabel)}</p>
          <a class="button" href="#/template/${encodeURIComponent(template.id)}">Use this template</a>
        </div>
      `;

      grid.appendChild(card);

      const previewStage = card.querySelector(".preview-stage");
      const sign = buildSign(template, false);
      previewStage.appendChild(sign);

      requestAnimationFrame(() => fitPreview(card, sign, previewStage));
    });
  }

  function fitPreview(card, sign, stage) {
    const windowEl = card.querySelector(".preview-window");
    const padding = 48;
    const maxW = windowEl.clientWidth - padding;
    const maxH = windowEl.clientHeight - padding;
    const scale = Math.min(maxW / sign.offsetWidth, maxH / sign.offsetHeight);

    stage.style.width = `${sign.offsetWidth * scale}px`;
    stage.style.height = `${sign.offsetHeight * scale}px`;
    sign.style.transform = `scale(${scale})`;
    sign.style.transformOrigin = "top left";
  }

  function renderEditor(id) {
    const template = templates.find(t => t.id === id);
    if (!template) {
      window.location.hash = "#/";
      return;
    }

    document.title = `${template.name} — Page Lumber Sign Studio`;

    app.innerHTML = `
      <main class="editor-shell">
        <div class="editor-toolbar">
          <div class="editor-toolbar-left">
            <a href="#/" class="button button-secondary">← Back to templates</a>
            <div class="toolbar-title">
              <strong>${escapeHtml(template.name)}</strong>
              <span>${escapeHtml(template.sizeLabel)}</span>
            </div>
          </div>

          <div class="editor-toolbar-right">
            <button id="resetButton" class="button button-secondary" type="button">Reset</button>
            <button id="printButton" class="button" type="button">Print</button>
            <button id="pdfButton" class="button" type="button">Save PDF</button>
          </div>
        </div>

        <section id="editorWorkspace" class="editor-workspace">
          <div id="canvasWrap" class="canvas-wrap"></div>
          <p class="editor-hint">
            Click any editable text directly on the sign. Long text automatically reduces in size to stay inside its assigned frame.
          </p>
        </section>
      </main>
    `;

    const wrap = document.getElementById("canvasWrap");
    const sign = buildSign(template, true);
    sign.id = "printTarget";
    wrap.appendChild(sign);

    restoreWorkingCopy(template, sign);
    setupEditableFields(template, sign);
    scaleEditorCanvas(sign, wrap);

    window.addEventListener("resize", editorResize, { passive: true });

    function editorResize() {
      scaleEditorCanvas(sign, wrap);
    }

    document.getElementById("resetButton").addEventListener("click", () => {
      showConfirmModal({
        title: "Reset this sign?",
        body: "This clears your current edits and restores the original template text.",
        confirmText: "Reset",
        danger: true,
        onConfirm: () => {
          localStorage.removeItem(workingKey(template.id));
          renderEditor(template.id);
        }
      });
    });

    document.getElementById("printButton").addEventListener("click", () => {
      printTemplate(template);
    });

    document.getElementById("pdfButton").addEventListener("click", () => {
      showPdfModal(template);
    });
  }

  function buildSign(template, editable) {
    const sign = document.createElement("div");
    sign.className = `sign-page ${template.className}`;
    sign.dataset.size = template.pageSize;
    sign.dataset.templateId = template.id;
    sign.innerHTML = template.render();

    if (!editable) {
      sign.querySelectorAll("[contenteditable]").forEach(el => {
        el.removeAttribute("contenteditable");
        el.classList.remove("editable");
      });
    }

    return sign;
  }

  function setupEditableFields(template, sign) {
    const fields = [...sign.querySelectorAll(".editable")];

    fields.forEach(el => {
      el.setAttribute("spellcheck", "false");
      fitText(el);

      el.addEventListener("input", () => {
        fitText(el);
        saveWorkingCopy(template, sign);
      });

      el.addEventListener("blur", () => {
        fitText(el);
        saveWorkingCopy(template, sign);
      });

      el.addEventListener("paste", event => {
        event.preventDefault();
        const text = (event.clipboardData || window.clipboardData).getData("text/plain");
        document.execCommand("insertText", false, text);
      });

      // Prevent accidental Enter on fields that are visually single-line.
      if (!["features", "details", "note", "sku"].includes(el.dataset.field)) {
        el.addEventListener("keydown", event => {
          if (event.key === "Enter") event.preventDefault();
        });
      }
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => fields.forEach(fitText));
    }
  }

  function fitText(el) {
    const max = parseFloat(el.dataset.max || getComputedStyle(el).fontSize);
    const min = parseFloat(el.dataset.min || 10);

    el.style.fontSize = `${max}px`;

    let size = max;
    let guard = 0;

    while (
      size > min &&
      (el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1) &&
      guard < 400
    ) {
      size -= 1;
      el.style.fontSize = `${size}px`;
      guard += 1;
    }

    // Final safety: fixed design frames always clip remaining overflow.
    el.style.overflow = "hidden";
  }

  function workingKey(id) {
    return `pageLumberWorkingCopy:${id}`;
  }

  function saveWorkingCopy(template, sign) {
    const data = {};
    sign.querySelectorAll(".editable[data-field]").forEach(el => {
      data[el.dataset.field] = el.innerHTML;
    });
    localStorage.setItem(workingKey(template.id), JSON.stringify(data));
  }

  function restoreWorkingCopy(template, sign) {
    try {
      const saved = JSON.parse(localStorage.getItem(workingKey(template.id)));
      if (!saved || typeof saved !== "object") return;

      sign.querySelectorAll(".editable[data-field]").forEach(el => {
        if (Object.prototype.hasOwnProperty.call(saved, el.dataset.field)) {
          el.innerHTML = saved[el.dataset.field];
        }
      });
    } catch {
      // ignore corrupt local state
    }
  }

  function scaleEditorCanvas(sign, wrap) {
    const workspace = document.getElementById("editorWorkspace");
    if (!workspace) return;

    const availableW = Math.max(320, workspace.clientWidth - 36);
    const rawW = sign.offsetWidth;
    const scale = Math.min(1, availableW / rawW);

    wrap.style.width = `${rawW * scale}px`;
    wrap.style.height = `${sign.offsetHeight * scale}px`;

    sign.style.transform = `scale(${scale})`;
    sign.style.transformOrigin = "top left";
  }

  function printTemplate(template) {
    const style = document.createElement("style");
    style.id = "dynamicPrintPageSize";
    style.textContent = `
      @page {
        size: ${template.widthIn}in ${template.heightIn}in;
        margin: 0;
      }
      @media print {
        #printTarget {
          width: ${template.widthIn}in !important;
          height: ${template.heightIn}in !important;
        }
      }
    `;

    document.getElementById("dynamicPrintPageSize")?.remove();
    document.head.appendChild(style);

    // Re-fit before print in case fonts became available late.
    document.querySelectorAll("#printTarget .editable").forEach(fitText);

    setTimeout(() => window.print(), 30);
  }

  function showPdfModal(template) {
    const modal = document.createElement("div");
    modal.className = "modal-backdrop";
    modal.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="pdfTitle">
        <h2 id="pdfTitle">Save as PDF</h2>
        <p>
          The browser's print window will open. Choose <strong>Save as PDF</strong> as the printer/destination,
          set scale to <strong>100%</strong>, and enable <strong>Background graphics</strong> if your browser shows that option.
          This template is ${escapeHtml(template.sizeLabel)}.
        </p>
        <div class="modal-actions">
          <button class="button button-secondary" data-action="cancel" type="button">Cancel</button>
          <button class="button" data-action="continue" type="button">Open PDF dialog</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    modal.querySelector('[data-action="cancel"]').addEventListener("click", () => modal.remove());
    modal.querySelector('[data-action="continue"]').addEventListener("click", () => {
      modal.remove();
      printTemplate(template);
    });
  }

  function showConfirmModal({ title, body, confirmText, danger, onConfirm }) {
    const modal = document.createElement("div");
    modal.className = "modal-backdrop";
    modal.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true">
        <h2>${escapeHtml(title)}</h2>
        <p>${escapeHtml(body)}</p>
        <div class="modal-actions">
          <button class="button button-secondary" data-action="cancel" type="button">Cancel</button>
          <button class="button ${danger ? "button-danger" : ""}" data-action="confirm" type="button">${escapeHtml(confirmText)}</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    modal.querySelector('[data-action="cancel"]').addEventListener("click", () => modal.remove());
    modal.querySelector('[data-action="confirm"]').addEventListener("click", () => {
      modal.remove();
      onConfirm?.();
    });
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  window.addEventListener("hashchange", route);
  window.addEventListener("DOMContentLoaded", route);
})();
