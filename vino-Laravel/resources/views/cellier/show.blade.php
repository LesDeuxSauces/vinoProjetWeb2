@extends('layouts.app')

@section('content')
<div>
  <h1>Nom du Cellier: {{ $cellier->nom }}</h1>

  <div>
    <h2>Bouteilles</h2>
    <ul>
      - ci-dessous, mes bouteilles de vin.
    </ul>
  </div>
  <h2>Ajouter une bouteille de vin à mon cellier</h2>
  <form>
    <button type="submit">Ajouter</button>
  </form>

  <a href="{{ route('cellier.index') }}">Retour au cellier</a>
</div>
@endsection