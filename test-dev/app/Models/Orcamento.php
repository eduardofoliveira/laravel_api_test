<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orcamento extends Model
{
    use HasFactory;

    protected $table = 'orcamento';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'tipo_orcamento',
        'navegadores_os',
        'paginas_telas',
        'sistema_login',
        'sistema_pagamento',
        'suporte_impressora',
        'licenca_acesso',
        'fk_cliente_id',
    ];
}
