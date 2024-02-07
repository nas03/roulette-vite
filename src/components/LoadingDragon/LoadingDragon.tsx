import './style.css';

const LoadingDragon = () => {
	return (
		<>
			<div className="m-0 p-0 bg-[rgba(255,246,227,0.5)] flex flex-row items-center justify-items-center w-full h-full absolute z-[100]">
				<div className="main left-1/2 -translate-x-1/2">
					<div className="shadow-wrapper ">
						<div className="shadow"></div>
					</div>
					<div className="opacity-[100]">
						<div className="dragon">
							<div className="body"></div>
							<div className="horn-left"></div>
							<div className="horn-right"></div>
							<div className="eye left"></div>
							<div className="eye right"></div>
							<div className="blush left"></div>
							<div className="blush right"></div>
							<div className="mouth"></div>
							<div className="tail-sting"></div>
						</div>
						<div className="fire-wrapper">
							<div className="fire"></div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default LoadingDragon;
