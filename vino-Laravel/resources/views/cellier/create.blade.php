@extends('layouts.app')
@section('content')

<div class="container">
  <h1>Créer un cellier</h1>
  <form action="{{ route('cellier.store') }}" method="POST">
    @csrf
    <div>
      <label for="nom">Nom :</label>
      <input type="text" id="nom" name="nom" required>
    </div>
    <input type="hidden" id="user_id" name="user_id" value="1">
    <button type="submit">Créer</button>
  </form>
  <a href="{{ route('cellier.index') }}">Retour au cellier</a>
</div>

@endsection