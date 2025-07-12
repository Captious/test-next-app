'use client';

import {useState, useTransition} from 'react';
import {createUser, updateUser} from '@/app/lib/actions';
import {type User} from '@prisma/client';
import {toLocalDatetimeValue} from "@/app/lib/utils";
import toast from "react-hot-toast";

interface UserFormModalProps {
    isOpen: boolean;
    onCloseAction: () => void;
    mode: 'create' | 'edit';
    initialData?: Partial<User>;
}

export default function UserFormModal({
                                          isOpen,
                                          onCloseAction,
                                          mode,
                                          initialData = {},
                                      }: UserFormModalProps) {
    const [errors, setErrors] = useState<{ name?: string[]; email?: string[]; createdAt?: string[] }>({});
    const [isPending, startTransition] = useTransition();

    if (!isOpen) {
        return null;
    }

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            const action = mode === 'edit' ? updateUser : createUser;
            const result = await action(formData);
            if (result?.validationError) {
                setErrors(result.validationError);
            } else {
                setErrors({});
                onCloseAction();
            }
            if (result.serverError) {
                toast.error(result.serverError);
            } else if (mode === 'edit') {
                toast.success('User updated successfully');
            } else {
                toast.success('User created successfully');
            }
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-[var(--background)] text-[var(--foreground)] p-6 rounded shadow-lg w-96">
                <h2 className="text-lg font-semibold mb-4">
                    {mode === 'edit' ? 'Edit User' : 'Add New User'}
                </h2>
                <form action={handleSubmit}>
                    {mode === 'edit' && (
                        <input type="hidden" name="id" value={initialData.id}/>
                    )}
                    <div className="mb-2">
                        <label className="block" htmlFor="name">Name:</label>
                        <input
                            id="name"
                            name="name"
                            className="border px-2 py-1 w-full"
                            defaultValue={initialData.name ?? ''}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name[0]}</p>}
                    </div>
                    <div className="mb-2">
                        <label className="block" htmlFor="email">Email:</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="border px-2 py-1 w-full"
                            defaultValue={initialData.email ?? ''}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}
                    </div>
                    <div className="mb-2">
                        <label className="block" htmlFor="createdAt">Created At:</label>
                        <input
                            id="createdAt"
                            name="createdAt"
                            type="datetime-local"
                            className="border px-2 py-1 w-full"
                            defaultValue={
                                initialData.createdAt
                                    ? toLocalDatetimeValue(new Date(initialData.createdAt))
                                    : toLocalDatetimeValue(new Date())
                            }
                        />
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onCloseAction}
                            className="px-4 py-1 border rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="bg-blue-600 text-white px-4 py-1 rounded"
                        >
                            {isPending ? 'Saving...' : mode === 'edit' ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
