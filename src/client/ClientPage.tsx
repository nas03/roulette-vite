/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import '@/assets/js/script.js';
import { Wheel } from 'react-custom-roulette';
import UserInfoModal from './UserInfoModal';
import { BASE_URL } from '@/lib/consts';
import { getUserToken, randomPrizeNumber } from '@/lib/utils';
import { UserData } from '@/lib/types';
import changeWheelSize from '@/assets/js/script.ts';
import { prizeData } from './wheelPrize';
const ClientPage: React.FC = () => {
	const [mustSpin, setMustSpin] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [turn, setTurn] = useState<number>(0);
	const [prizeNumber, setPrizeNumber] = useState<number>(0);
	const [user, setUser] = useState('');
	const [prize, setPrize] = useState('');
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
			const userData = JSON.parse(localStorage.getItem('userData'));
			if (userData == null || userData == undefined) {
				setShowModal(true);
			}
		}
		setTurn(turn_left);
		return turn_left;
	};

	const handleSpinClick = async () => {
		await getTurn().then(async () => {
			const token = await getUserToken();
			const response = await fetch(`${BASE_URL}/user/random`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ secret_token: token }),
			}).then(async (response) => {
				const body = await response.json();

				if (body.code == '0') {
					const { type_reward } = body.data;
					const getPrizeNumber = randomPrizeNumber(type_reward);
					setPrize(type_reward);
					setPrizeNumber(getPrizeNumber);
					setMustSpin(true);
					setTurn(turn - 1);
					return;
				} else if (body.code == '400') {
					setTurn(0);
					alert('Bạn đã hết lượt chơi');
					const userData = JSON.parse(localStorage.getItem('userData'));
					if (userData == null || userData == undefined || userData == '') {
						setShowModal(true);
					}
				}
			});
		});
	};
	const handleStopSpin = async () => {
		let userData: UserData = JSON.parse(localStorage.getItem('userData'));
		if (userData == null || userData == undefined) {
			setShowModal(true);
		}
		userData = JSON.parse(localStorage.getItem('userData'));
		if (prize != 'none') {
			await fetch(`${BASE_URL}/admin/add_reward`, {
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
			}).then(() => {
				setMustSpin(false);
			});
		}
	};
	useEffect(() => {
		window.addEventListener('resize', changeWheelSize);
	}, []);
	changeWheelSize();
	useEffect(() => {
		getTurn();
		changeWheelSize();
	}, [turn]);
	return (
		<div className="">
			<main className="l-main ">
				<img
					className="p-background h-full max-xl:h-screen w-auto object-cover"
					src={'/assets/img/Item/BG.png'}
					width={2260}
					height={1607}
					alt=""
				/>
				<section className="p-wheel">
					<div className="p-wheel__body l-container">
						<div
							className=" w-fit h-fit max-sm:w-full max-sm:h-auto"
							data-media="sp">
							<img
								id=""
								className="p-wheel__background mr-auto ml-auto z-10 absolute top-[10vh] left-1/2 -translate-x-1/2 max-sm:w-full max-md:w-1/2 w-1/3 h-auto"
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

					<div className="p-wheel__buttons flex flex-row gap-5 w-fit absolute pt-5 left-1/2 -translate-x-1/2">
						<button className="p-wheel__button" onClick={handleSpinClick}>
							<img
								className="max-sm:w-[10rem] max-w-[15rem]"
								width={305}
								height={151}
								src="/assets/img/Item/button_1.svg"
								alt="Quay 1 lần"
							/>
						</button>
						<button className="p-wheel__button">
							<img
								className="max-sm:w-[10rem] max-w-[15rem]"
								width={305}
								height={151}
								src="/assets/img/Item/button_10.svg"
								alt="Quay 10 lần"
							/>
						</button>
						<UserInfoModal open={showModal} />
					</div>
					<div className="p-wheel__turns absolute left-1/2 -translate-x-1/2 text-orange-500 text-xl">
						Bạn đang có{' '}
						<span className="" id="turn">
							{turn}
						</span>{' '}
						lượt quay
					</div>
				</section>
			</main>
		</div>
	);
};
export default ClientPage;
