<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrcamentoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);

        return [
            'id' => $this->id,
            'fk_cliente_id' => $this->fk_cliente_id,
            'tipo_orcamento' => $this->tipo_orcamento,
            'navegadores_os' => $this->navegadores_os,
            'paginas_telas' => $this->paginas_telas,
            'sistema_login' => $this->sistema_login,
            'sistema_pagamento' => $this->sistema_pagamento,
            'suporte_impressora' => $this->suporte_impressora,
            'licenca_acesso' => $this->licenca_acesso,
            'created_at' => $this->created_at,
        ];
    }
}
