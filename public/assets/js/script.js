import { useEffect } from 'react';
const ChangeWheelSize = () => {
	useEffect(() => {
		const changeWheelSize = () => {
			const wheelBackground = document.querySelector('.p-wheel__background');
			const wheelCanvas = document.querySelector('.bhdLno');

			const wheelBackgroundPos = wheelBackground.getBoundingClientRect();

			const wheelBackgroundWidth = wheelBackground.offsetWidth;
			wheelCanvas.style.left = '50%';
			wheelCanvas.style.transform = 'translateX(-50%)';
			wheelCanvas.style.zIndex = 30;
			wheelCanvas.style.maxWidth = '900px';
			wheelCanvas.style.maxHeight = '900px';
			wheelCanvas.style.width = `${wheelBackgroundWidth * 0.9}px`;
			wheelCanvas.style.height = `${wheelCanvas.offsetWidth}px`;
			const position = wheelBackgroundPos.top;

			wheelCanvas.style.position = 'absolute';
			wheelCanvas.style.top = `${position + wheelBackgroundWidth / 21}px`;

			const spinButtonsDiv = document.querySelector('.p-wheel__buttons');
			spinButtonsDiv.style.top = ` ${
				wheelBackground.getBoundingClientRect().bottom
			}px`;

			const turnDiv = document.querySelector('.p-wheel__turns');
			turnDiv.style.top = `${spinButtonsDiv.getBoundingClientRect().bottom}px`;
		};

		changeWheelSize();
		window.addEventListener('resize', changeWheelSize);

		return () => {
			window.removeEventListener('resize', changeWheelSize);
		};
	}, []);

	return null;
};

export default ChangeWheelSize;
