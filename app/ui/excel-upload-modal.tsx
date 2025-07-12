'use client';

import {useState} from 'react';
import * as XLSX from 'xlsx';
import {uploadUsersFromExcel} from '@/app/lib/actions';
import {toast} from 'react-hot-toast';

interface ExcelUploadModalProps {
    isOpen: boolean;
    onCloseAction: () => void;
}

export default function ExcelUploadModal({isOpen, onCloseAction}: ExcelUploadModalProps) {
    const [loading, setLoading] = useState(false);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setLoading(true);
        try {
            const data = await file.arrayBuffer();
            const workbook = XLSX.read(data);
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            if (!Array.isArray(jsonData) || jsonData.length === 0) {
                toast.error('Invalid or empty Excel file');
                return;
            }
            const plainData = JSON.parse(JSON.stringify(jsonData));
            await uploadUsersFromExcel(plainData);
            toast.success('Users imported successfully');
            onCloseAction();
        } catch (err) {
            console.error(err);
            toast.error('Failed to upload file');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-[var(--background)] text-[var(--foreground)] p-6 rounded shadow-lg w-[400px]">
                <h2 className="text-lg font-semibold mb-4">Upload Users from Excel</h2>
                <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                    className="border p-2 rounded w-full"
                    disabled={loading}
                />
                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={onCloseAction} className="border px-4 py-1 rounded">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
