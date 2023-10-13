import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import React from 'react';
import { useForm } from '@inertiajs/react';

export default function MonsterForm({ monster, isNew }) {

    const { data, setData, post, patch, processing, reset, errors } = useForm({
        name: monster.name??'',
        maxHP: monster.maxHP??'',
        AC: monster.AC??'',
        legendaryActions: monster.legendaryActions??'',
        legendaryResistances: monster.legendaryResistances??'',
        statblock: monster.statblock??'',
    });

    const submit = (e) => {
        e.preventDefault();
        if(isNew){
            post(route('monsters.store'), { onSuccess: () => reset() });
        }
        else {
            patch(route('monsters.update', monster.id), { onSuccess: () => reset() });
        }
    };

    return (
        <form onSubmit={submit}>
        <input
          value={data.name}
          placeholder="Monster name"
          onChange={e => setData('name', e.target.value)}
        />
        <input
            value={data.maxHP}
            placeholder="Max HP"
            onChange={e => setData('maxHP', e.target.value)}
        />
        <input
            value={data.AC}
            placeholder="AC"
            onChange={e => setData('AC', e.target.value)}
        />
        <input
            value={data.legendaryActions}
            placeholder="Legendary Actions"
            onChange={e => setData('legendaryActions', e.target.value)}
        />
        <input
            value={data.legendaryResistances}
            placeholder="Legendary Resistances"
            onChange={e => setData('legendaryResistances', e.target.value)}
        />
        <textarea
            value={data.statblock}
            placeholder="Statblock"
            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            onChange={e => setData('statblock', e.target.value)}
        ></textarea>
        <InputError message={errors.message} className="mt-2" />
        <PrimaryButton className="mt-4" disabled={processing}>{isNew?'Create':'Update'} monster</PrimaryButton>
    </form>
    );
}
