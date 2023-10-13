<?php

namespace App\Http\Controllers;

use App\Models\Monster;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class MonsterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() : Response
    {
        $user = auth()->user();
        return Inertia::render('Monsters/Index', [
            'monsters' => $user->monsters()->with(['user'])->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Monsters/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) : RedirectResponse
    {
        $user = auth()->user();
        $validated = $request->validate([
            'name' => [
                'bail',
                'string',
                'required',
                'max:255',
                // Enforce unique name among user's monsters.
                Rule::unique('monsters')->where(fn (Builder $query) => $query->where('user_id', $user->getKey())),
            ],
            'maxHP' => 'integer|required|min:1',
            'AC' => 'integer|nullable|min:1',
            'legendaryActions' => 'integer|nullable|min:1',
            'legendaryResistances' => 'integer|nullable|min:1',
            'statblock' => 'string|nullable|max:10240',
        ]);

        $request->user()->monsters()->create($validated);

        return redirect(route('monsters.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Monster $monster)
    {
        $this->authorize('view', $monster);

        return Inertia::render('Monsters/View', [
            'monster' => $monster,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Monster $monster) : Response
    {
        $this->authorize('update', $monster);

        return Inertia::render('Monsters/Edit', [
            'monster' => $monster,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Monster $monster)
    {
        $this->authorize('update', $monster);

        $user = auth()->user();
        $validated = $request->validate([
            'name' => [
                'bail',
                'string',
                'required',
                'max:255',
                // Enforce unique name among user's monsters (excluding the existing monster).
                Rule::unique('monsters')->ignore($monster->id)->where(fn (Builder $query) => $query->where('user_id', $user->getKey())),
            ],
            'maxHP' => 'integer|required|min:1',
            'AC' => 'integer|nullable|min:1',
            'legendaryActions' => 'integer|nullable|min:1',
            'legendaryResistances' => 'integer|nullable|min:1',
            'statblock' => 'string|nullable|max:10240',
        ]);

        $monster->update($validated);

        return redirect(route('monsters.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Monster $monster)
    {
        //
    }
}
