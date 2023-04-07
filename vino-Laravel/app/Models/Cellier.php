<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cellier extends Model
{
  use HasFactory;
  // Les attributs que l'on peut remplir dans la table "celliers"
  protected $fillable = [
    'nom',
    'user_id'
  ];

  // Relation : un cellier appartient à un utilisateur
  public function cellierHasUser()
  {
    return $this->belongsTo(User::class);
  }

  // Relation : un cellier a plusieurs bouteilles
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
