import { Modal } from 'antd';
const OOTurnPopup = ({ showPopup }: { showPopup: boolean }) => {
	return (
		<>
			<Modal open={showPopup} centered>
				<div className="">
					<p>Bạn đã hết lượt chơi</p>
				</div>
			</Modal>
		</>
	);
};
export default OOTurnPopup;
