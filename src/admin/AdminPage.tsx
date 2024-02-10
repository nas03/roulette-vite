/* eslint-disable @typescript-eslint/no-unused-vars */
import DataTable from './DataTable';
import { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from 'antd';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { User } from '@/lib/types';
import { BASE_URL } from '@/lib/consts';

const AdminPage: React.FC = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const fetchUsers = async () => {
		const response = await fetch(`${BASE_URL}/admin/reward/get-all-reward`);
		const body = await response.json();
		const data = body.data;
		setUsers(data);
		return data;
	};
	const updateTransferStatus = async (id: string) => {
		await fetch(`${BASE_URL}/admin/reward/tranfer-money/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		await fetchUsers();
	};

	useEffect(() => {
		fetchUsers();
	}, []);
	const columns: ColumnDef<User>[] = [
		{
			accessorKey: 'name',
			header: ({ column }) => {
				return (
					<Button
						className="w-full"
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === 'asc')
						}>
						Name
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div className="text-center">{row.getValue('name')}</div>
			),
		},
		{
			accessorKey: 'bank',
			header: ({ column }) => {
				return (
					<Button
						className="w-full"
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === 'asc')
						}>
						Bank
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},

			cell: ({ row }) => (
				<div className="text-center">{row.getValue('bank')}</div>
			),
		},
		{
			accessorKey: 'banking_number',
			header: ({ column }) => {
				return (
					<Button
						className="w-full"
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === 'asc')
						}>
						Banking Number
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div className="text-center">{row.getValue('banking_number')}</div>
			),
		},
		{
			accessorKey: 'reward_type',
			header: ({ column }) => {
				return (
					<Button
						className="w-full"
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === 'asc')
						}>
						Reward type
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div className="text-center">{row.getValue('reward_type')}</div>
			),
		},
		{
			accessorKey: 'money_tranfered',
			size: 100,

			header: ({ column }) => {
				return (
					<Button
						className="mr-auto ml-auto w-full"
						variant={'ghost'}
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === 'asc')
						}>
						money_tranfered
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			//TODO: count users
			cell: ({ row }) => (
				<div className="text-center">
					{row.getValue('money_tranfered') ? 'true' : 'false'}
				</div>
			),
		},
		{
			id: 'actions',
			header: 'Actions',
			enableHiding: false,
			cell: ({ row }) => {
				const item = row.original;

				return (
					<>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="h-8 w-8 p-0">
									<span className="sr-only">Open menu</span>
									<MoreHorizontal className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Actions</DropdownMenuLabel>
								<DropdownMenuItem
									onClick={() => {
										navigator.clipboard.writeText(String(item.secret_token));
									}}>
									Copy User Secret Token
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={() => updateTransferStatus(item._id)}>
									Update Money Transferred Status
								</DropdownMenuItem>

								<DropdownMenuItem>Delete User Reward Records</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</>
				);
			},
		},
	];

	return (
		<>
			<div className=" text-slate-600 flex flex-col gap-10">
				<h1 className="text-3xl font-bold pl-5 mt-16">Admin Management</h1>
				<div className="flex flex-row  items-center justify-center gap-5  w-fit mr-auto ml-auto"></div>
				{/* <UpdatePostModal/> */}
				<DataTable width={'[90%]'} data={users} columns={columns} />
			</div>
		</>
	);
};
export default AdminPage;
