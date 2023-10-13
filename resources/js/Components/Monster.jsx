import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { usePage } from '@inertiajs/react';

export default function Monster({ monster, detailedView }) {
    const { auth } = usePage().props;

    let details;
    if(detailedView){
        details = <div>
            <p className="mt-4 text-lg text-gray-900"><strong>Max HP:</strong> {monster.maxHP}</p>
            {monster.AC ?
                <p className="mt-4 text-lg text-gray-900"><strong>AC:</strong> {monster.AC}</p>
            :''}
            {monster.legendaryActions ?
                <p className="mt-4 text-lg text-gray-900"><strong>Legendary Actions:</strong> {monster.legendaryActions}</p>
            :''}
            {monster.legendaryResistances ?
                <p className="mt-4 text-lg text-gray-900"><strong>Legendary Resistances:</strong> {monster.legendaryResistances}</p>
            :''}
            {monster.statblock ?
                <>
                    <hr className="mt-4" />
                    <Markdown className='mt-4 statblock-markdown' remarkPlugins={[remarkGfm]} >
                        {monster.statblock}
                    </Markdown>
                </>
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
