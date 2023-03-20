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
            'annee' => $this->annee,
            'code_saq' => $this->code_saq,
            'url_saq' => $this->url_saq,
            'url_img' => $this->url_img,
            'pays' => $this->pays,
            'type_id' => $this->type_id,
        ];
    }
}
