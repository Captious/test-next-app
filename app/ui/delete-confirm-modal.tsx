'use client';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onCloseAction: () => void;
    onConfirmAction: () => void;
}

export default function DeleteConfirmModal({
                                               isOpen,
                                               onCloseAction,
                                               onConfirmAction,
                                           }: Readonly<DeleteConfirmModalProps>) {
    if (!isOpen) {
        return null;
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-[var(--background)] text-[var(--foreground)] p-6 rounded shadow-lg w-80">
                <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                <p className="mb-4">Are you sure you want to delete this user?</p>
                <div className="flex justify-end gap-2">
                    <button onClick={onCloseAction} className="border px-4 py-1 rounded">
                        Cancel
                    </button>
                    <button
                        onClick={onConfirmAction}
                        className="bg-red-600 text-white px-4 py-1 rounded"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
