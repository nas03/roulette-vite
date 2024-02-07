const changeWheelSize = () => {
	const wheelBackground = document.querySelector('.p-wheel__background');
	const wheelCanvas = document.querySelector('.bhdLno') as HTMLElement;
	const spinButtonsDiv = document.querySelector(
		'.p-wheel__buttons'
	) as HTMLElement;
	const turnDiv = document.querySelector('.p-wheel__turns') as HTMLElement;

	if (!wheelBackground || !wheelCanvas || !spinButtonsDiv || !turnDiv) {
		return;
	}

	const wheelBackgroundWidth = (wheelBackground as HTMLElement).offsetWidth;
	wheelCanvas.style.left = '50%';
	wheelCanvas.style.transform = 'translateX(-50%)';
	wheelCanvas.style.zIndex = '30';
	wheelCanvas.style.maxWidth = '900px';
	wheelCanvas.style.maxHeight = '900px';
	wheelCanvas.style.width = `${wheelBackgroundWidth * 0.9}px`;
	wheelCanvas.style.height = `${wheelCanvas.offsetWidth}px`;
	const position = wheelBackground.getBoundingClientRect().top;

	wheelCanvas.style.position = 'absolute';
	wheelCanvas.style.top = `${position + wheelBackgroundWidth / 21}px`;

	spinButtonsDiv.style.top = `${wheelBackground.getBoundingClientRect().bottom}px`;

	turnDiv.style.top = `${spinButtonsDiv.getBoundingClientRect().bottom}px`;
};

export default changeWheelSize;
