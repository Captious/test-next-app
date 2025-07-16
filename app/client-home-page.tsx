'use client'

import {Suspense, useState} from "react";
import UserFormModal from "@/app/ui/user-form-modal";
import {User} from "@prisma/client";
import {deleteUser} from "@/app/lib/actions";
import DeleteConfirmModal from "@/app/ui/delete-confirm-modal";
import toast from "react-hot-toast";
import ExcelUploadModal from "@/app/ui/excel-upload-modal";
import UserTable from "@/app/ui/user-table";
import TableSkeleton from "@/app/ui/skeletons";

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

    const openDelete = (user: User) => {
        setUserToDelete(user);
        setDeleteModalOpen(true);
    }

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
            <Suspense key="user-table-suspense" fallback={<TableSkeleton/>}>
                <UserTable users={users} onEditAction={openEdit} onDeleteAction={openDelete}/>
            </Suspense>
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
