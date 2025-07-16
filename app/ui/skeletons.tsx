export function TableSkeleton() {
    return (
        <table className="w-full border animate-pulse">
            <thead>
            <tr>
                {['Name', 'Email', 'Created At', 'Actions'].map((col) => (
                    <th key={col} className="border p-2 bg-gray-100 dark:bg-gray-800"/>
                ))}
            </tr>
            </thead>
            <tbody>
            {[...Array(5)].map((_, i) => (
                <tr key={i}>
                    <td className="border p-2 bg-gray-100 dark:bg-gray-900 h-6" colSpan={4}></td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default function HomeSkeleton() {
    return (
        <main className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Users</h1>
                <button
                    disabled={true}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    + Add User
                </button>
                <button
                    disabled={true}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Upload from Excel
                </button>
            </div>
            <TableSkeleton/>
        </main>
    );
}