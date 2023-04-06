<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cellier extends Model
{
  use HasFactory;
  protected $fillable = [
    'nom',
    'user_id'
  ];

  public function cellierHasUser()
  {
    return $this->belongsTo(User::class);
  }

  public function cellierHasBouteille()
  {
      return $this->belongsToMany(Bouteille::class, 'celliers_has_bouteilles')->withPivot('quantite');
  }

  // ajout de la relation avec la table celliers_has_bouteilles
  public function celliersHasBouteilles()
  {
      return $this->hasMany(CelliersHasBouteilles::class);
  }

  
}
