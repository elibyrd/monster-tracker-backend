import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import MonsterForm from '@/Components/MonsterForm';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function Edit({ auth, monster }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Monsters" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <MonsterForm monster={monster} isNew={false} />
            </div>
        </AuthenticatedLayout>
    );
}
