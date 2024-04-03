<?php

namespace Tests\Feature\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class OrcamentoTest extends TestCase
{
    /**
     * Verifica se o retorno da listagem de orcamento é 200 OK.
     */
    public function test_list_orcamento_200_ok(): void
    {
        $response = $this->get('http://nginx/api/orcamento');

        $response->assertStatus(200);
    }

    /**
     * Verifica se o retorno para adicionar orcamento é 201 CREATED.
     */
    public function test_create_orcamento_201_created(): void
    {
        $responseCreateCliente = $this->postJson('http://nginx/api/cliente', [
            "nome" => "João",
            "email" => "joao@gmail.com",
            "telefone" => "1112345678",
            "logradouro" => "Rua do João",
            "numero" => 123456,
            "complemento" => "Casa do João",
            "bairro" => "Bairro do João",
            "cidade" => "Cidade do João",
            "cep" => "12345-123"
        ]);

        $responseCreateCliente->assertStatus(201);

        $responseCreateOrcamento = $this->postJson('http://nginx/api/orcamento', [
            "tipo_orcamento" =>  "DESKTOP",
            "navegadores_os" =>  "WINDOWS",
            "paginas_telas" =>  13,
            "sistema_login" =>  true,
            "sistema_pagamento" =>  false,
            "suporte_impressora" =>  false,
            "licenca_acesso" =>  false,
            "fk_cliente_id" =>  $responseCreateCliente->json('id')
        ]);

        $responseCreateOrcamento->assertStatus(201);

        $this->delete('http://nginx/api/orcamento/' . $responseCreateOrcamento->json('id'));
        $this->delete('http://nginx/api/cliente/' . $responseCreateCliente->json('id'));
    }

    /**
     * Verifica se a listagem de orcamentos retorna um array.
     */
    public function test_get_orcamentos_returns_array(): void
    {
        $responseCreateCliente = $this->postJson('http://nginx/api/cliente', [
            "nome" => "João",
            "email" => "joao@gmail.com",
            "telefone" => "1112345678",
            "logradouro" => "Rua do João",
            "numero" => 123456,
            "complemento" => "Casa do João",
            "bairro" => "Bairro do João",
            "cidade" => "Cidade do João",
            "cep" => "12345-123"
        ]);

        $responseCreateCliente->assertStatus(201);

        $responseCreateOrcamento = $this->postJson('http://nginx/api/orcamento', [
            "tipo_orcamento" =>  "DESKTOP",
            "navegadores_os" =>  "WINDOWS",
            "paginas_telas" =>  13,
            "sistema_login" =>  true,
            "sistema_pagamento" =>  false,
            "suporte_impressora" =>  false,
            "licenca_acesso" =>  false,
            "fk_cliente_id" =>  $responseCreateCliente->json('id')
        ]);

        $responseCreateOrcamento->assertStatus(201);

        $response = $this->getJson('http://nginx/api/orcamento');

        $response->assertJsonIsObject()->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'fk_cliente_id',
                    'tipo_orcamento',
                    'navegadores_os',
                    'paginas_telas',
                    'sistema_login',
                    'sistema_pagamento',
                    'suporte_impressora',
                    'licenca_acesso',
                ]
            ]
        ]);

        $this->delete('http://nginx/api/orcamento/' . $responseCreateOrcamento->json('id'));
        $this->delete('http://nginx/api/cliente/' . $responseCreateCliente->json('id'));
    }

    /**
     * Verifica se o retorno HTTP CODE quando deleta é 204 NO CONTENT.
     */
    public function test_delete_orcamento_return_204_no_content(): void
    {
        $responseCreateCliente = $this->postJson('http://nginx/api/cliente', [
            "nome" => "João",
            "email" => "joao@gmail.com",
            "telefone" => "1112345678",
            "logradouro" => "Rua do João",
            "numero" => 123456,
            "complemento" => "Casa do João",
            "bairro" => "Bairro do João",
            "cidade" => "Cidade do João",
            "cep" => "12345-123"
        ]);

        $responseCreateCliente->assertStatus(201);

        $responseCreateOrcamento = $this->postJson('http://nginx/api/orcamento', [
            "tipo_orcamento" =>  "DESKTOP",
            "navegadores_os" =>  "WINDOWS",
            "paginas_telas" =>  13,
            "sistema_login" =>  true,
            "sistema_pagamento" =>  false,
            "suporte_impressora" =>  false,
            "licenca_acesso" =>  false,
            "fk_cliente_id" =>  $responseCreateCliente->json('id')
        ]);

        $responseCreateOrcamento->assertStatus(201);

        $response = $this->delete('http://nginx/api/orcamento/' . $responseCreateOrcamento->json('id'));
        $this->delete('http://nginx/api/cliente/' . $responseCreateCliente->json('id'));

        $response->assertStatus(204);
    }
}
