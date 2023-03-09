<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bouteille extends Model
{
    use HasFactory;

    public function bouteilleHasCellier()
    {
        // return $this->belongsTo('App\Models\Cellier', 'cellier_id', 'id');
        return $this->belongsTo(Cellier::class);
    }
}
