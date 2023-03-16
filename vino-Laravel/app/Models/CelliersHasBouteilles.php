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
  ];


  // ajout de la relation avec la table celliers
  public function cellier()
  {
    return $this->belongsTo(Cellier::class);
  }


  // ajout de la relation avec la table bouteilles
  public function bouteille()
  {
    return $this->belongsTo(Bouteille::class);
  }
}
