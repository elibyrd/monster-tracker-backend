<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MonsterResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'maxHP' => $this->maxHP,
            'AC' => $this->AC,
            'legendaryActions' => $this->legendaryActions,
            'legendaryResistances' => $this->legendaryResistances,
            'statblock' => $this->statblock,
        ];
    }
}
