'use client'

import {useState} from "react";
import UserFormModal from "@/app/ui/user-form-modal";
import {toLocalDatetimeValue} from "@/app/lib/utils";
import {Pencil, Trash} from "lucide-react";
import {User} from "@prisma/client";
import {deleteUser} from "@/app/lib/actions";
import DeleteConfirmModal from "@/app/ui/delete-confirm-modal";
import toast from "react-hot-toast";
import ExcelUploadModal from "@/app/ui/excel-upload-modal";

export default function ClientHomePage({users}: { users: User[] }) {
    const [userFormModalOpen, setUserFormModalOpen] = useState(false);
    const [excelModalOpen, setExcelModalOpen] = useState(false);
    const [editUser, setEditUser] = useState<User | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    const confirmDelete = async () => {
        if (userToDelete) {
            const result = await deleteUser(userToDelete.id);
            setDeleteModalOpen(false);
            setUserToDelete(null);
            if (result.serverError) {
                toast.error(result.serverError);
            } else {
                toast.success('User deleted successfully');
            }
        }
    };

    const openCreate = () => {
        setEditUser(null);
        setUserFormModalOpen(true);
    };

    const openEdit = (user: User) => {
        setEditUser(user);
        setUserFormModalOpen(true);
    };

    return (
        <main className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Users</h1>
                <button
                    onClick={openCreate}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    + Add User
                </button>
                <button
                    onClick={() => setExcelModalOpen(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Upload from Excel
                </button>
            </div>
            <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                <tr>
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Created At</th>
                    <th className="border px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td className="border px-4 py-2">{user.id}</td>
                        <td className="border px-4 py-2">{user.email}</td>
                        <td className="border px-4 py-2">{user.name || '-'}</td>
                        <td className="border px-4 py-2">{toLocalDatetimeValue(new Date(user.createdAt))}</td>
                        <td className="border px-4 py-2">
                            <button
                                onClick={() => openEdit(user)}
                                className="text-blue-600 hover:text-blue-800 p-2"
                                title="Edit"
                            >
                                <Pencil className="w-5 h-5"/>
                            </button>
                            <button
                                onClick={() => {
                                    setUserToDelete(user);
                                    setDeleteModalOpen(true);
                                }}
                                className="text-red-600 hover:text-red-800 p-1"
                                title="Delete"
                            >
                                <Trash className="w-5 h-5"/>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <UserFormModal
                isOpen={userFormModalOpen}
                onCloseAction={() => setUserFormModalOpen(false)}
                mode={editUser ? 'edit' : 'create'}
                initialData={editUser ?? {}}
            />
            <DeleteConfirmModal
                isOpen={deleteModalOpen}
                onCloseAction={() => setDeleteModalOpen(false)}
                onConfirmAction={confirmDelete}
            />
            <ExcelUploadModal
                isOpen={excelModalOpen}
                onCloseAction={() => setExcelModalOpen(false)}
            />
        </main>
    );
}
