import React from 'react';
import { usePage } from '@inertiajs/react';

export default function Monster({ monster, detailedView }) {
    const { auth } = usePage().props;

    let details;
    if(detailedView){
        details = <div>
            <p className="mt-4 text-lg text-gray-900">Max HP: {monster.maxHP}</p>
            {monster.AC ?
                <p className="mt-4 text-lg text-gray-900">AC: {monster.AC}</p>
            :''}
            {monster.legendaryActions ?
                <p className="mt-4 text-lg text-gray-900">Legendary Actions: {monster.legendaryActions}</p>
            :''}
            {monster.legendaryResistances ?
                <p className="mt-4 text-lg text-gray-900">Legendary Resistances: {monster.legendaryResistances}</p>
            :''}
            {monster.statblock ?
                <p className="mt-4 text-lg text-gray-900">{monster.statblock}</p>
            :''}
        </div>
    }

    return (
        <div className="p-6 flex space-x-2">
            <div className="flex-1">
                <h2>{monster.name}</h2>
                {details}
            </div>
            {detailedView ? '' :
                <div className="flex-1">
                    <a href={route('monsters.show', monster.id)} className="">
                        View
                    </a>
                    {monster.user.id === auth.user.id &&
                        <a href={route('monsters.edit', monster.id)} className="" >
                            Edit
                        </a>
                    }
                </div>
            }
        </div>
    );
}
