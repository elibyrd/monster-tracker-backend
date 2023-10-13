import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Monster from '@/Components/Monster';
import { useForm, Head } from '@inertiajs/react';
import React from 'react';

export default function Index({ auth, monsters }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Monsters" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <a href={route('monsters.create')} className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">Create monster</a>
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {monsters.map(monster =>
                        <Monster key={monster.id} monster={monster} detailedView={false} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
