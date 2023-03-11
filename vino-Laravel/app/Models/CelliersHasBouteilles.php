<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CelliersHasBouteilles extends Model
{
    use HasFactory;

    protected $fillable = [
        'quantite',
        'bouteille_id',
        'cellier_id'
    ] ;
}
