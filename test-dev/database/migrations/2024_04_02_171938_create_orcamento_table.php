<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orcamento', function (Blueprint $table) {
            $table->id();
            $table->enum('tipo_orcamento', ['WEB', 'MOBILE', 'DESKTOP']); // WEB, MOBILE, DESKTOP
            $table->string('navegadores_os'); // CHROME, FIREFOX, SAFARI, EDGE, IE, ANDROID, IOS, WINDOWS, LINUX, MACOS
            $table->integer('paginas_telas'); // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10...
            $table->boolean('sistema_login'); // SIM, NAO
            $table->boolean('sistema_pagamento'); // SIM, NAO
            $table->boolean('suporte_impressora'); // SIM, NAO
            $table->boolean('licenca_acesso'); // SIM, NAO
            $table->timestamps();
        });

        Schema::table('orcamento', function (Blueprint $table) {
            $table->integer('fk_cliente_id')->unsigned();
            $table->foreign('fk_cliente_id')->references('id')->on('cliente');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orcamento');
    }
};
