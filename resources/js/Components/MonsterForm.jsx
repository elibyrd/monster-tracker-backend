import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Markdown from 'react-markdown';
import PrimaryButton from '@/Components/PrimaryButton';
import React from 'react';
import remarkGfm from 'remark-gfm';
import TextInput from '@/Components/TextInput';
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
            <div>
                <InputLabel htmlFor="name" value="Monster name" />
                <TextInput
                    id="name"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('name', e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="maxHP" value="Max HP" />
                <TextInput
                    id="maxHP"
                    name="maxHP"
                    value={data.maxHP}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('maxHP', e.target.value)}
                />
                <InputError message={errors.maxHP} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="AC" value="AC" />
                <TextInput
                    id="AC"
                    name="AC"
                    value={data.AC}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('AC', e.target.value)}
                />
                <InputError message={errors.AC} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="legendaryActions" value="Legendary Actions" />
                <TextInput
                    id="legendaryActions"
                    name="legendaryActions"
                    value={data.legendaryActions}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('legendaryActions', e.target.value)}
                />
                <InputError message={errors.legendaryActions} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="legendaryResistances" value="Legendary Resistances" />
                <TextInput
                    id="legendaryResistances"
                    name="legendaryResistances"
                    value={data.legendaryResistances}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('legendaryResistances', e.target.value)}
                />
                <InputError message={errors.legendaryResistances} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="statblock" value="Statblock" />
                <textarea
                    id="statblock"
                    name="statblock"
                    value={data.statblock}
                    className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                    onChange={e => setData('statblock', e.target.value)}
                ></textarea>
                <InputError message={errors.statblock} className="mt-2" />
                {data.statblock.length > 0 &&
                    <div>
                        <p className="mt-4">Preview:</p>
                        <Markdown className='statblock-markdown statblock-preview border-gray-300 rounded-md shadow-sm mt-2' remarkPlugins={[remarkGfm]} >
                            {data.statblock}
                        </Markdown>
                    </div>
                }
            </div>
            <PrimaryButton className="mt-4" disabled={processing}>{isNew?'Create':'Update'} monster</PrimaryButton>
        </form>
    );
}
