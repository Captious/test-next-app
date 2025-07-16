import {User} from "@prisma/client";
import {toLocalDatetimeValue} from "@/app/lib/utils";
import {Pencil, Trash} from "lucide-react";

export default async function UserTable({
                                            users,
                                            onEditAction,
                                            onDeleteAction,
                                        }: {
    users: User[],
    onEditAction: (user: User) => void;
    onDeleteAction: (user: User) => void;
}) {
    return (
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
                    <td className="border px-4 py-2">{user.name ?? '-'}</td>
                    <td className="border px-4 py-2">{toLocalDatetimeValue(new Date(user.createdAt))}</td>
                    <td className="border px-4 py-2">
                        <button
                            onClick={() => onEditAction(user)}
                            className="text-blue-600 hover:text-blue-800 p-2"
                            title="Edit"
                        >
                            <Pencil className="w-5 h-5"/>
                        </button>
                        <button
                            onClick={() => onDeleteAction(user)}
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
    );
}