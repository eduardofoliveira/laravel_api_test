<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreOrcamentoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'tipo_orcamento' => 'required|string|in:WEB,MOBILE,DESKTOP',
            'navegadores_os' => 'required|string',
            'paginas_telas' => 'required|numeric',
            'sistema_login' => 'required|boolean',
            'sistema_pagamento' => 'required|boolean',
            'suporte_impressora' => 'required|boolean',
            'licenca_acesso' => 'required|boolean',
            'fk_cliente_id' => 'required|numeric',
        ];
    }

    public function messages()
    {
        return [
            'tipo_orcamento.required' => 'O campo tipo_orcamento é obrigatório.',
            'tipo_orcamento.string' => 'O campo tipo_orcamento deve ser uma string.',
            'tipo_orcamento.in' => 'O campo tipo_orcamento deve ser WEB, MOBILE ou DESKTOP.',
            'navegadores_os.required' => 'O campo navegadores_os é obrigatório.',
            'navegadores_os.string' => 'O campo navegadores_os deve ser uma string.',
            'paginas_telas.required' => 'O campo paginas_telas é obrigatório.',
            'paginas_telas.numeric' => 'O campo paginas_telas deve ser um número.',
            'sistema_login.required' => 'O campo sistema_login é obrigatório.',
            'sistema_login.boolean' => 'O campo sistema_login deve ser um booleano.',
            'sistema_pagamento.required' => 'O campo sistema_pagamento é obrigatório.',
            'sistema_pagamento.boolean' => 'O campo sistema_pagamento deve ser um booleano.',
            'suporte_impressora.required' => 'O campo suporte_impressora é obrigatório.',
            'suporte_impressora.boolean' => 'O campo suporte_impressora deve ser um booleano.',
            'licenca_acesso.required' => 'O campo licenca_acesso é obrigatório.',
            'licenca_acesso.boolean' => 'O campo licenca_acesso deve ser um booleano.',
            'fk_cliente_id.required' => 'O campo fk_cliente_id é obrigatório.',
            'fk_cliente_id.numeric' => 'O campo fk_cliente_id deve ser um número.',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        $errors = $validator->errors(); // Here is your array of errors
        throw new HttpResponseException(response()->json(['error' => $errors], 400));
    }
}
