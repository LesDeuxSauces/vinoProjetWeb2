<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bouteille extends Model
{
    use HasFactory;

    protected $fillable = [
        'id' ,
        'nom' ,
        'format' ,
        'prix' ,
        'description' ,
        'annee' ,
        'code_saq' ,
        'url_saq' ,
        'url_img' ,
        'pays' ,
        'type_id' ,
    ];


    public function bouteilleHasCellier()
    {
        return $this->belongsTo(Cellier::class);
    }
}
