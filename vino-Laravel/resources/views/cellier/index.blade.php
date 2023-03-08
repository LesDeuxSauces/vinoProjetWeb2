@extends('layouts.app')
@section('content')

<div>
  <h1>Celliers</h1>

  @if (count($celliers) > 0)
  <ul>
    @foreach ($celliers as $cellier)
    <li><a href="{{ route('cellier.show', $cellier->id) }}">{{ $cellier->nom }}</a></li>
    @endforeach
  </ul>
  @else
  <p>Aucun cellier trouvé</p>
  @endif
</div>
<div>
  <a href="{{ route('cellier.create') }}">Créer un nouveau cellier</a>

</div>

@endsection