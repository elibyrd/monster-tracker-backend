<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Monster extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'maxHP',
        'AC',
        'legendaryActions',
        'legendaryResistances',
        'statblock',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
