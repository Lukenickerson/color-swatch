class ColorSwatch {
	constructor(selector = '.color-swatch') {
		this.selector = selector;
		this.containerClassName = 'color-swatch-container';
		this.containerId = 'color-swatch-' + (++ColorSwatch.index);
		// TODO: move class names to obj to allow for customization
		this.doc = window.document;
		this.element = null;
		this.containerElement = null;
		this.uiElement = null;
	}

	addToDom() {
		this.element = this.doc.querySelector(this.selector);
		if (!this.element) { return false; }
		this.containerElement = this.makeSwatchContainer();
		this.element.parentNode.appendChild(this.containerElement);
		this.uiElement = this.containerElement.querySelector('.color-swatch-ui');
		this.addEvents();
		this.selectColor(this.element.value);
		return true;
	}

	addEvents() {
		this.containerElement.querySelector('.color-swatch-preview')
			.addEventListener('click', () => this.toggle());

		this.element.addEventListener('change', () => {
			this.setSwatchColor(this.element.value);
			this.close();
		});

		this.uiElement.addEventListener('click', (event) => {
			const { target } = event;
			if (!target.classList.contains('color-swatch-option')) { return; }
			this.selectColor(target.dataset.value);
		});

		this.doc.addEventListener('click', (event) => {
			const { target } = event;
			if (target.closest(`#${this.containerId}`)) { return; }
			this.close();
		});
	}

	removeFromDom() {
		// TODO: nice to have, especially for integration with SPAs
	}

	selectColor(value) {
		if (!this.setSwatchColor(value)) { return false; }
		this.element.value = value;
		return true;
	}

	setSwatchColor(value) {
		if (!this.validateColor(value)) { return false; }
		const selectionElt = this.uiElement.querySelector('.color-swatch-selection');
		selectionElt.style.background = value;
		const previewElt = this.containerElement.querySelector('.color-swatch-preview');
		previewElt.style.background = value;
		return true;
	}

	validateColor(value) {
		// TODO: nice to have
		return true;
	}

	open() {
		this.uiElement.classList.add('open');
	}

	close() {
		this.uiElement.classList.remove('open');
	}

	toggle() {
		this.uiElement.classList.toggle('open');
	}

	makeSwatchContainer() {
		const swatchContainer = this.doc.createElement('div');
		swatchContainer.innerHTML = this.getSwatchHtml();
		swatchContainer.id = this.containerId;
		swatchContainer.classList.add(this.containerClassName);
		return swatchContainer;
	}

	getSwatchHtml() {
		return (
			`<div class="color-swatch-preview" title="Toggle color swatch selection"></div>
			<div class="color-swatch-ui">
			<div class="color-swatch-selection"></div>
			<div>
				<ul><div>${this.getListItemsHtml()}</div></ul>
			</div>
			</div>`
		);
	}

	getListItemsHtml() {
		const optionData = this.getOptionData();
		const half = Math.floor(optionData.length / 2);
		const listItems = optionData.map((obj, i) => {
			let h = (
				`<li title="Select color ${obj.text} (${obj.value})"
					data-value="${obj.value}"
					style="background: ${obj.value}"
					class="color-swatch-option"
				>
				</li>`
			);
			if (i === half) {
				h = `${h}</div><div>`;
			}
			return h;
		});
		return listItems.join(' ');
	}

	getOptionData() {
		if (!this.element) { return []; }
		const options = this.element.getElementsByTagName('option');
		return [...options].map((option) => {
			const { value, text } = option;
			return { value, text };
		});
	}

	init(doc = window.document) {
		this.doc = doc;
		this.doc.addEventListener('DOMContentLoaded', () => this.addToDom());
		return this;
	}
}

ColorSwatch.index = Math.round(Math.random() * 9999999);

export default ColorSwatch;
