/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import '@/assets/js/script.js';
import { Wheel } from 'react-custom-roulette';
import UserInfoModal from './components/UserInfoModal';
import { BASE_URL } from '@/lib/consts';
import { getUserToken, randomPrizeNumber, validateUserData } from '@/lib/utils';
import { UserData } from '@/lib/types';
import changeWheelSize from '@/assets/js/script.ts';
import { prizeData } from './wheelPrize';
import LoadingDragon from '@/components/LoadingDragon/LoadingDragon';
import { Modal } from 'antd';
const ClientPage: React.FC = () => {
	const [mustSpin, setMustSpin] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [turn, setTurn] = useState<number>(0);
	const [prizeNumber, setPrizeNumber] = useState<number>(0);
	const [user, setUser] = useState('');
	const [prize, setPrize] = useState('');
	const [loading, setLoading] = useState(false);
	const [showPopup, setShowPopup] = useState(false);
	const getTurn = async () => {
		const token = await getUserToken();
		setUser(token);
		const response = await fetch(
			`${BASE_URL}/user/get-turn-left?token=${user}`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		const { data } = await response.json();

		const turn_left = data.turn_left;

		if (turn_left == 0) {
			const validate = validateUserData();
			if (!validate) {
				setShowModal(true);
			}
		}
		setTurn(turn_left);
		return turn_left;
	};

	const handleSpinClick = async () => {
		setLoading(true);
		document.body.style.overflow = 'hidden';
		const token = await getUserToken();
		const response = await fetch(`${BASE_URL}/user/random`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ secret_token: token }),
		});
		const body = await response.json();

		if (body.code == '0') {
			const { type_reward } = body.data;
			const getPrizeNumber = randomPrizeNumber(type_reward);
			setPrize(type_reward);
			setPrizeNumber(getPrizeNumber);
			setLoading(false);
			document.body.style.overflow = 'auto';
			setTurn(turn - 1);
			setMustSpin(true);
			return;
		} else if (body.code == '400') {
			setLoading(false);
			setTurn(0);
			setShowPopup(true);
			const validate = validateUserData();
			if (!validate) {
				setShowModal(true);
			}
		}
	};

	const handleStopSpin = async () => {
		setMustSpin(false);
		if (prize != 'none') {
			const validate = validateUserData();
			if (!validate) {
				setShowModal(true);
			} else {
				const userData: UserData = JSON.parse(
					localStorage.getItem('userData') as string
				);
				const response = await fetch(`${BASE_URL}/admin/add_reward`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						banking_number: userData.banking_number,
						bank: userData.bank,
						name: userData.name,
						secret_token: user,
						type_reward: prize,
					}),
				});
				await response.json();
			}
		}
	};
	const handleDisableScroll = () => {
		document.body.style.overflow = 'hidden';
		setTimeout(() => {
			document.body.style.overflow = 'auto';
		}, 500);
	};
	window.scrollTo(0, 0);
	changeWheelSize();

	useEffect(() => {
		handleDisableScroll();
		window.addEventListener('resize', changeWheelSize);
	}, []);

	useEffect(() => {
		getTurn();
	}, [turn]);

	return (
		<>
			<div className="scroll-smooth h-full">
				{loading && <LoadingDragon />}
				<main className="l-main w-screen">
					<img
						src={'/assets/svg/fun_bug.svg'}
						width={64}
						height={64}
						className="absolute left-[5rem] top-[5rem] max-md:top-[1rem] max-md:left-[2rem] "
					/>
					<img
						className="p-background h-full w-screen max-xl:h-screen  object-cover"
						src={'/assets/img/Item/BG.png'}
						width={2260}
						height={1607}
						alt=""
					/>

					<section className="p-wheel">
						<div className="p-wheel__body l-container">
							<Modal
								open={showPopup}
								onOk={() => setShowPopup(false)}
								className="w-min"
								cancelButtonProps={{
									disabled: true,
									hidden: true,
								}}
								okButtonProps={{ style: { background: 'rgb(59 130 246)' } }}>
								<div className="text-center text-xl font-bold">
									<p>Bạn đã hết lượt chơi</p>
								</div>
							</Modal>
							<div
								className=" w-fit h-fit max-sm:w-full max-sm:h-auto"
								data-media="sp">
								<img
									id=""
									className="p-wheel__background mr-auto ml-auto z-10 absolute top-[8vh] left-1/2 -translate-x-1/2 max-md:w-[60%] max-[500px]:w-[95%] w-1/3 h-auto"
									width={1000}
									height={1000}
									src="/assets/img/Item/wheel.png"
									alt=""
								/>
							</div>
							<div className="p-wheel__play-table z-20">
								<Wheel
									textColors={['#fff', 'red']}
									radiusLineWidth={3}
									outerBorderWidth={0}
									prizeNumber={prizeNumber}
									mustStartSpinning={mustSpin}
									data={prizeData}
									onStopSpinning={() => {
										handleStopSpin();
									}}
									disableInitialAnimation={false}
								/>
							</div>
						</div>

						<div className="p-wheel__buttons flex flex-row w-fit absolute pt-5 left-1/2 -translate-x-1/2">
							<button className="p-wheel__button" onClick={handleSpinClick}>
								<img
									className="max-sm:w-[12rem] max-w-[15rem]"
									width={305}
									height={151}
									src="/assets/img/Item/button_1.svg"
									alt="Quay 1 lần"
								/>
							</button>

							<UserInfoModal open={showModal} prize={prize} />
						</div>
						<div className="p-wheel__turns absolute left-1/2 -translate-x-1/2 text-orange-500 text-xl max-md:text-lg max-sm:text-base">
							Bạn đang có{' '}
							<span className="" id="turn">
								{turn}
							</span>{' '}
							lượt quay
						</div>
					</section>
				</main>
			</div>
		</>
	);
};
export default ClientPage;
