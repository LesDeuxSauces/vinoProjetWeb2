<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BouteilleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nom' => $this->nom,
            'format' => $this->format,
            'prix' => $this->prix,
            'description' => $this->description,
            'taux' => $this->taux,
            'annee' => $this->annee,
            'codeSaq' => $this->code_saq,
            'urlSaq' => $this->url_saq,
            'urlImage' => $this->url_image,
            'paysId' => $this->pays_id,
            'typesId' => $this->types_id,
        ];
    }
}
