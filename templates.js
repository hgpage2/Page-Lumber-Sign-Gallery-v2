/* =========================================================
   PAGE LUMBER SIGN TEMPLATE DEFINITIONS
   96 CSS px = 1 physical inch inside the editor.
   ========================================================= */

const PAGE_LUMBER_TEMPLATES = [
  {
    id: "clearance-v2",
    name: "Clearance V2",
    sizeLabel: "11 × 8.5 in",
    pageSize: "letter-landscape",
    widthIn: 11,
    heightIn: 8.5,
    className: "template-clearance-v2",
    render() {
      return `
        <div class="top-block"></div>
        <div class="vertical-label" data-static="true">CLEARANCE</div>
        <div class="editable product" data-field="product" data-max="57" data-min="26" contenteditable="true">DEWALT 20V BRUSHLESS IMPACT DRIVER KIT</div>
        <div class="editable price" data-field="price" data-max="205" data-min="96" contenteditable="true">$219.99</div>
        <div class="editable details" data-field="details" data-max="24" data-min="14" contenteditable="true">SAVE $20<br>WHILE SUPPLIES LAST</div>
        <div class="editable sku-label" data-field="sku" data-max="16" data-min="11" contenteditable="true">ITEM # 9963331</div>
      `;
    }
  },
  {
    id: "closeout-v1-copy",
    name: "Closeout V1 Copy",
    sizeLabel: "11 × 8.5 in",
    pageSize: "letter-landscape",
    widthIn: 11,
    heightIn: 8.5,
    className: "template-closeout template-closeout-copy",
    render() {
      return `
        <div class="header-block"></div>
        <div class="editable label" data-field="label" data-max="72" data-min="38" contenteditable="true">CLOSEOUT</div>
        <div class="editable code" data-field="sku" data-max="16" data-min="11" contenteditable="true">ITEM # 3888955</div>
        <div class="editable product" data-field="product" data-max="48" data-min="24" contenteditable="true">OSCILLATING MULTI TOOL 20V KIT</div>
        <div class="editable price" data-field="price" data-max="212" data-min="96" contenteditable="true">$199.99</div>
        <div class="editable footer-left" data-field="save" data-max="24" data-min="14" contenteditable="true">SAVE $100</div>
        <div class="editable footer-right" data-field="note" data-max="16" data-min="11" contenteditable="true">FINAL SALE<br>WHILE SUPPLIES LAST</div>
      `;
    }
  },
  {
    id: "essentials-sign",
    name: "Essentials Sign",
    sizeLabel: "11 × 8.5 in",
    pageSize: "letter-landscape",
    widthIn: 11,
    heightIn: 8.5,
    className: "template-essentials",
    render() {
      return `
        <div class="essential-strip"></div>
        <div class="editable essential-label" data-field="label" data-max="19" data-min="12" contenteditable="true">PAGE LUMBER ESSENTIALS</div>
        <div class="editable price" data-field="price" data-max="208" data-min="94" contenteditable="true">$24.99</div>
        <div class="editable product" data-field="product" data-max="48" data-min="23" contenteditable="true">HEAVY DUTY CONTRACTOR TRASH BAGS</div>
        <div class="editable model" data-field="model" data-max="20" data-min="13" contenteditable="true">MODEL: CONTRACTOR 42 GAL</div>
        <div class="editable sku" data-field="sku" data-max="17" data-min="11" contenteditable="true">SKU: 0000000</div>
        <div class="badge">EVERYDAY<br>JOB SITE<br>ESSENTIAL</div>
      `;
    }
  },
  {
    id: "closeout-v1",
    name: "Closeout V1",
    sizeLabel: "11 × 8.5 in",
    pageSize: "letter-landscape",
    widthIn: 11,
    heightIn: 8.5,
    className: "template-closeout",
    render() {
      return `
        <div class="header-block"></div>
        <div class="editable label" data-field="label" data-max="72" data-min="38" contenteditable="true">CLOSEOUT</div>
        <div class="editable code" data-field="sku" data-max="16" data-min="11" contenteditable="true">ITEM # 9627720</div>
        <div class="editable product" data-field="product" data-max="48" data-min="24" contenteditable="true">4 PORT FLEXVOLT CHARGER</div>
        <div class="editable price" data-field="price" data-max="212" data-min="96" contenteditable="true">$329.99</div>
        <div class="editable footer-left" data-field="save" data-max="24" data-min="14" contenteditable="true">SAVE $50</div>
        <div class="editable footer-right" data-field="note" data-max="16" data-min="11" contenteditable="true">FINAL SALE<br>WHILE SUPPLIES LAST</div>
      `;
    }
  },
  {
    id: "new-product-v3",
    name: "New Product Sign V3",
    sizeLabel: "11 × 8.5 in",
    pageSize: "letter-landscape",
    widthIn: 11,
    heightIn: 8.5,
    className: "template-new-product",
    render() {
      return `
        <div class="rail"></div>
        <div class="rail-word">NEW PRODUCT</div>
        <div class="editable product" data-field="product" data-max="65" data-min="28" contenteditable="true">DEWALT PALM SANDER</div>
        <div class="features-box"></div>
        <div class="editable features" data-field="features" data-max="35" data-min="20" contenteditable="true">• Cordless<br>• 20 Volt<br>• Compact &amp; Jobsite Ready</div>
        <div class="footer-price-label">INTRO PRICE</div>
        <div class="editable price" data-field="price" data-max="86" data-min="42" contenteditable="true">$129.99</div>
        <div class="editable sku-label" data-field="sku" data-max="16" data-min="11" contenteditable="true">MODEL: DCW200<br>ITEM # 0000000</div>
      `;
    }
  },
  {
    id: "clearance",
    name: "Clearance",
    sizeLabel: "11 × 8.5 in",
    pageSize: "letter-landscape",
    widthIn: 11,
    heightIn: 8.5,
    className: "template-clearance",
    render() {
      return `
        <div class="clearance-band"></div>
        <div class="editable clearance-label" data-field="label" data-max="62" data-min="34" contenteditable="true">CLEARANCE</div>
        <div class="editable sku-label" data-field="sku" data-max="16" data-min="11" contenteditable="true">ITEM # 0000000</div>
        <div class="editable product" data-field="product" data-max="52" data-min="25" contenteditable="true">SELECT WINDOWS &amp; DOORS</div>
        <div class="editable price" data-field="price" data-max="220" data-min="100" contenteditable="true">$99.99</div>
        <div class="editable unit" data-field="unit" data-max="25" data-min="15" contenteditable="true">SELECT ITEMS</div>
        <div class="editable footer" data-field="note" data-max="16" data-min="11" contenteditable="true">POUGHKEEPSIE STORE<br>WHILE SUPPLIES LAST</div>
      `;
    }
  },
  {
    id: "xl-clearance",
    name: "XL Clearance Sign",
    sizeLabel: "17 × 11 in",
    pageSize: "tabloid-landscape",
    widthIn: 17,
    heightIn: 11,
    className: "template-xl-clearance",
    render() {
      return `
        <div class="xl-head"></div>
        <div class="editable label" data-field="label" data-max="82" data-min="42" contenteditable="true">CLEARANCE</div>
        <div class="editable sku" data-field="sku" data-max="18" data-min="12" contenteditable="true">ITEM # 0000000</div>
        <div class="editable product" data-field="product" data-max="74" data-min="34" contenteditable="true">DISPLAY MODEL / SPECIAL BUY</div>
        <div class="editable price" data-field="price" data-max="330" data-min="155" contenteditable="true">$499.99</div>
        <div class="editable details" data-field="details" data-max="31" data-min="18" contenteditable="true">SAVE BIG • LIMITED QUANTITY</div>
        <div class="editable footer" data-field="note" data-max="18" data-min="12" contenteditable="true">PAGE LUMBER<br>WHILE SUPPLIES LAST</div>
      `;
    }
  }
];

window.PAGE_LUMBER_TEMPLATES = PAGE_LUMBER_TEMPLATES;
