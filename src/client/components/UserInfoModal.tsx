import { useEffect, useState } from 'react';
import { BankList } from '@/lib/types';
import { List, Modal } from 'antd';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import vietqr from 'vietqr';
import { BASE_URL } from '@/lib/consts';
import { UserData } from '@/lib/types';

import { getUserToken, validateUserData } from '@/lib/utils';

const VerifyModal = ({ open, prize }: { open: boolean; prize: string }) => {
	const [showAccountInput, setShowAccountInput] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [bankList, setBankList] = useState<BankList[]>([]);
	const [filteredBankList, setFilteredBankList] = useState<BankList[]>([]);
	const [bankName, setBankName] = useState('');
	const [bankAccount, setBankAccount] = useState('');
	const [fullName, setFullName] = useState('');
	const addPrize = async () => {
		const userData: UserData = JSON.parse(
			localStorage.getItem('userData') as string
		);
		const user = await getUserToken();
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
	};

	const saveUserInfo = async () => {
		setConfirmLoading(true);
		localStorage.setItem(
			'userData',
			JSON.stringify({
				banking_number: bankAccount,
				bank: bankName,
				name: fullName,
			})
		);
		if (validateUserData()) {
			await addPrize();
			setConfirmLoading(false);
			setShowModal(false);
		}
	};

	const getBankList = async () => {
		const vietQR = new vietqr.VietQR({
			apiKey: 'e612fcf7-8a1e-41b0-a680-17cde2f23846',
			clientID: '4f35fd01-fe2b-4e6e-b436-8a4fd01ad133',
		});

		const banks = (await vietQR.getBanks()) as {
			code: string;
			desc: string;
			data: BankList[];
		};

		setBankList(banks.data);
		setFilteredBankList(banks.data);
		return banks.data;
	};
	useEffect(() => {
		open && getBankList();
		setShowModal(open);
	}, [open]);
	return (
		<>
			<Modal
				open={showModal}
				confirmLoading={confirmLoading}
				cancelButtonProps={{
					style: {
						visibility: 'hidden',
					},
				}}
				okButtonProps={{
					style: {
						backgroundColor: '#F9A52B',
					},
				}}
				onOk={saveUserInfo}
				onCancel={() => {
					const validate = validateUserData();
					if (validate) {
						setShowModal(false);
					}
				}}
				className="w-fit">
				<h1 className="text-2xl font-bold text-center mb-5">
					Thông tin chuyển khoản
				</h1>
				<form className="flex flex-col min-h-[10rem]">
					<div className="flex flex-col font-bold text-lg ">
						<div className="flex flex-row">
							<label htmlFor="full-name">Họ và tên</label>
							<input
								type="text"
								name="full-name"
								id=""
								placeholder="full name"
								className=" pl-3 focus:outline-none"
								onChange={(e) => setFullName(e.target.value)}
							/>
						</div>

						<div className="flex flex-row">
							<label className="" htmlFor="bank">
								Ngân hàng
							</label>
							<input
								type="text"
								name="bank"
								id="bank"
								value={bankName}
								onChange={(e) => {
									setBankName(e.target.value);
									const newFilteredBankList = bankList.filter((bank) =>
										bank.code.includes(e.target.value)
									);
									setFilteredBankList(newFilteredBankList);
								}}
								placeholder="which bank?"
								className=" pl-3 focus:outline-none"
							/>
						</div>
					</div>
					{!showAccountInput && (
						<List
							itemLayout="horizontal"
							dataSource={filteredBankList}
							className="h-[20rem] overflow-y-scroll mt-5"
							renderItem={(bank) => (
								<List.Item>
									<List.Item.Meta
										avatar={
											<img
												width={32}
												height={32}
												src={bank.logo}
												alt={bank.name}
											/>
										}
										title={
											<p
												className="hover:text-blue-500 cursor-pointer"
												onClick={() => {
													setBankName(bank.code);
													setShowAccountInput(true);
												}}>
												{bank.code}
											</p>
										}
										description={bank.name}
									/>
								</List.Item>
							)}
						/>
					)}

					{showAccountInput && (
						<div className="flex flex-row gap-3 font-bold text-lg">
							<label className="" htmlFor="account-number">
								Số tài khoản
							</label>
							<input
								type="text"
								name="account-number"
								id=""
								onChange={(e) => setBankAccount(e.target.value)}
								placeholder="Account Number"
								className="focus:outline-none"
							/>
						</div>
					)}
				</form>
			</Modal>
		</>
	);
};
export default VerifyModal;
