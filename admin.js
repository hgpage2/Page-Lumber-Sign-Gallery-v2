(() => {
  const list = document.getElementById("adminList");
  const reset = document.getElementById("resetAdmin");
  const templates = window.PAGE_LUMBER_TEMPLATES || [];

  const defaults = templates.map((t, index) => ({
    id: t.id,
    public: true,
    order: index
  }));

  let settings = load();

  function load() {
    try {
      const stored = JSON.parse(localStorage.getItem("pageLumberTemplateSettings"));
      if (!Array.isArray(stored)) return structuredClone(defaults);

      return defaults.map(def => {
        const found = stored.find(item => item.id === def.id);
        return found ? { ...def, ...found } : def;
      });
    } catch {
      return structuredClone(defaults);
    }
  }

  function save() {
    localStorage.setItem("pageLumberTemplateSettings", JSON.stringify(settings));
  }

  function render() {
    const ordered = templates
      .map(template => {
        const state = settings.find(s => s.id === template.id);
        return { template, state };
      })
      .sort((a, b) => a.state.order - b.state.order);

    list.innerHTML = "";

    ordered.forEach(({ template, state }, displayIndex) => {
      const row = document.createElement("div");
      row.className = "admin-row";
      row.innerHTML = `
        <div class="admin-row-title">
          <strong>${escapeHtml(template.name)}</strong>
          <span>${escapeHtml(template.sizeLabel)} · ${escapeHtml(template.id)}</span>
        </div>

        <label class="admin-toggle">
          <input type="checkbox" ${state.public ? "checked" : ""}>
          Public
        </label>

        <button class="button button-secondary button-small" data-move="up" type="button" ${displayIndex === 0 ? "disabled" : ""}>↑</button>
        <button class="button button-secondary button-small" data-move="down" type="button" ${displayIndex === ordered.length - 1 ? "disabled" : ""}>↓</button>
      `;

      row.querySelector('input[type="checkbox"]').addEventListener("change", event => {
        state.public = event.target.checked;
        save();
      });

      row.querySelector('[data-move="up"]').addEventListener("click", () => move(state.id, -1));
      row.querySelector('[data-move="down"]').addEventListener("click", () => move(state.id, 1));

      list.appendChild(row);
    });
  }

  function move(id, direction) {
    const ordered = [...settings].sort((a, b) => a.order - b.order);
    const index = ordered.findIndex(item => item.id === id);
    const next = index + direction;
    if (index < 0 || next < 0 || next >= ordered.length) return;

    [ordered[index], ordered[next]] = [ordered[next], ordered[index]];
    ordered.forEach((item, i) => item.order = i);

    settings = settings.map(item => ({
      ...item,
      order: ordered.find(x => x.id === item.id).order
    }));

    save();
    render();
  }

  reset.addEventListener("click", () => {
    settings = structuredClone(defaults);
    save();
    render();
  });

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  render();
})();
