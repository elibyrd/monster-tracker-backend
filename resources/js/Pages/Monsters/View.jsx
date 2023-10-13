import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Monster from '@/Components/Monster';
import React from 'react';
import { useForm, Head } from '@inertiajs/react';

export default function View({ auth, monster }) {

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Monsters" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    <Monster key={monster.id} monster={monster} detailedView={true} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
