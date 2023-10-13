import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Monster from '@/Components/Monster';
import { useForm, Head } from '@inertiajs/react';
import React from 'react';

export default function Index({ auth, monsters }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Monsters" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <a href={route('monsters.create')}>Create monster</a>
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {monsters.map(monster =>
                        <Monster key={monster.id} monster={monster} detailedView={false} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
