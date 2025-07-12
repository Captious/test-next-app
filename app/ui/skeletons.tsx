export default function TableSkeleton() {
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