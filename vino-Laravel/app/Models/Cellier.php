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
    // return $this->hasOne('App\Models\User', 'id', 'user_id');
  }

  public function cellierHasBouteille()
  {
      return $this->belongsToMany(Bouteille::class, 'celliers_has_bouteilles');
  }

  
}
