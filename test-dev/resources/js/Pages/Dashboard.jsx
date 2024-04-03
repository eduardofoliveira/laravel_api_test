import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';

export default function Dashboard({ auth }) {
    const [orcamentos, setOrcamentos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [metadata, setMetadata] = useState({});
    const [clienteID, setClienteID] = useState(0);
    const [cliente, setCliente] = useState({});

    useEffect(() => {
        if (clienteID === 0) return;

        axios.get(`/api/cliente/${clienteID}`)
            .then(response => {
                setCliente(response.data.data);
            });
    }, [clienteID])

    useEffect(() => {
        setOrcamentos([])

        axios.get('/api/orcamento', {
            params: {
                page: currentPage
            }
        })
            .then(response => {
                setOrcamentos(response.data.data);
                setMetadata(response.data.meta);
            });
    }, [currentPage])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Orçamentos</h2>}
        >
            <Head title="Lista" />

            {orcamentos.length === 0 && <div className="text-center flex flex-col flex-1 justify-center items-center">
                <div role="status">
                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>}

            {orcamentos.length > 1 && <div className="p-12">
                <div className='flex p-1 justify-center'>
                    <nav aria-label="Page navigation example">
                        <ul className="inline-flex -space-x-px text-sm">
                            <li>
                                <button onClick={() => {
                                    setCurrentPage(1)
                                }} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">First</button>
                            </li>
                            <li>
                                <button onClick={() => {
                                    if (metadata.current_page > 1) {
                                        setCurrentPage(metadata.current_page - 1)
                                    }
                                }} class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Prev</button>
                            </li>
                            <li>
                                <button aria-current="page" class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{metadata.current_page}</button>
                            </li>
                            <li>
                                <button onClick={() => {
                                    if (metadata.current_page < metadata.last_page) {
                                        setCurrentPage(metadata.current_page + 1)
                                    }
                                }} class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
                            </li>
                            <li>
                                <button onClick={() => {
                                    setCurrentPage(metadata.last_page)
                                }} class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Last</button>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Tipo
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Suporte
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Paginas
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Sistema Login
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Suporte Impressora
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Sistema Pagamento
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Licença Acesso
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Dados Cliente
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orcamentos && orcamentos.length > 0 && orcamentos.map(orcamento =>
                            (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                        {orcamento.id}
                                    </th>
                                    <td className="px-6 py-4 text-center">
                                        {orcamento.tipo_orcamento}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {orcamento.navegadores_os}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {orcamento.paginas_telas}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {orcamento.sistema_login ? 'SIM' : 'NÃO'}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {orcamento.sistema_pagamento ? 'SIM' : 'NÃO'}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {orcamento.suporte_impressora ? 'SIM' : 'NÃO'}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {orcamento.licenca_acesso ? 'SIM' : 'NÃO'}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button type="button" onClick={() => {
                                            document.getElementById('my_modal_1').showModal();
                                            setClienteID(orcamento.fk_cliente_id)
                                        }} class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Ver
                                        </button>
                                    </td>
                                </tr>
                            )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>}

            <dialog id="my_modal_1" class="modal rounded-lg">
                <div class="modal-box p-10 rounded-lg">
                    <h3 class="font-bold text-lg">Dados do Cliente</h3>

                    <div className='flex gap-4'>
                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                            <input type="text" id="first_name" value={cliente.nome || ''} disabled class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nome" required />
                        </div>

                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                            <input type="text" id="first_name" value={cliente.email || ''} disabled class=" min-w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="E-mail" required />
                        </div>

                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefone</label>
                            <input type="text" id="first_name" value={cliente.telefone || ''} disabled class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Telefone" required />
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Logradouro</label>
                            <input type="text" id="first_name" value={cliente.logradouro || ''} disabled class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Logradouro" required />
                        </div>

                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numero</label>
                            <input type="text" id="first_name" value={cliente.numero || ''} disabled class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Numero" required />
                        </div>

                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Complemento</label>
                            <input type="text" id="first_name" value={cliente.complemento || ''} disabled class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Complemento" required />
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bairro</label>
                            <input type="text" id="first_name" value={cliente.bairro || ''} disabled class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bairro" required />
                        </div>

                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cidade</label>
                            <input type="text" id="first_name" value={cliente.cidade || ''} disabled class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cidade" required />
                        </div>

                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CEP</label>
                            <input type="text" id="first_name" value={cliente.cep || ''} disabled class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="CEP" required />
                        </div>
                    </div>

                    <div class="modal-action pt-4">
                        <form method="dialog">
                            <button class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Fechar</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </AuthenticatedLayout>
    );
}
