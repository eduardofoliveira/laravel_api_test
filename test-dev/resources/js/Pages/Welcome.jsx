import { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import { z } from 'zod'
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [cep, setCep] = useState('');

    const [tipoOrcamento, setTipoOrcamento] = useState('');
    const [navegadoresOs, setNavegadoresOs] = useState('');
    const [qtdPaginasTelas, setQtdPaginasTelas] = useState(0);
    const [sistemaLogin, setSistemaLogin] = useState(false);
    const [sistemaPagamento, setSistemaPagamento] = useState(false);
    const [suporteImpressora, setSuporteImpressora] = useState(false);
    const [licencaAcesso, setLicencaAcesso] = useState(false);

    const [stage, setStage] = useState(1);

    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    const handleValidateTo2WithZod = () => {
        const schema = z.object({
            nome: z.string().min(1, { message: 'Nome é obrigatório' }),
            email: z.string().email({ message: 'E-mail inválido' }),
            telefone: z.string().min(1, { message: 'Telefone é obrigatório' }),
            logradouro: z.string().min(1, { message: 'Logradouro é obrigatório' }),
            numero: z.string().optional(),
            complemento: z.string().optional(),
            bairro: z.string().min(1, { message: 'Bairro é obrigatório' }),
            cidade: z.string().min(1, { message: 'Cidade é obrigatório' }),
            cep: z.string().min(8, { message: 'CEP inválido' }),
        });

        const data = {
            nome,
            email,
            telefone,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            cep,
        };

        try {
            schema.parse(data);
            setStage(2);
        } catch (error) {
            // console.error(error.errors);
            error.errors.map((err) => toast.error(err.message));
        }
    }

    const handleValidateTo3WithZod = () => {
        const schema = z.object({
            tipoOrcamento: z.string().min(1, { message: 'Tipo de Orçamento é obrigatório' }),
            qtdPaginasTelas: z.number().min(1, { message: `Quantidade de ${tipoOrcamento === 'WEB' ? 'Páginas' : 'Telas'} é obrigatório` }),
            navegadoresOs: z.string().min(1, { message: `${tipoOrcamento === 'WEB' ? 'Navegadores' : 'Sistema Operacional'} é obrigatório` }),
            sistemaLogin: z.boolean().optional(),
            sistemaPagamento: z.boolean().optional(),
            suporteImpressora: z.boolean().optional(),
            licencaAcesso: z.boolean().optional(),
        });

        const data = {
            tipoOrcamento,
            qtdPaginasTelas: parseInt(qtdPaginasTelas),
            navegadoresOs,
            sistemaLogin,
            sistemaPagamento,
            suporteImpressora,
            licencaAcesso,
        };

        try {
            schema.parse(data);
            setStage(3);
        } catch (error) {
            // console.error(error.errors);
            error.errors.map((err) => toast.error(err.message));
        }
    }

    const handleRegister = async () => {
        try {
            const responseCliente = await axios.post('/api/cliente', {
                nome,
                email,
                telefone,
                logradouro,
                numero,
                complemento,
                bairro,
                cidade,
                cep,
            })

            const responseOrcamento = await axios.post('/api/orcamento', {
                tipo_orcamento: tipoOrcamento,
                navegadores_os: navegadoresOs,
                paginas_telas: qtdPaginasTelas,
                sistema_login: sistemaLogin,
                sistema_pagamento: sistemaPagamento,
                suporte_impressora: suporteImpressora,
                licenca_acesso: licencaAcesso,
                fk_cliente_id: responseCliente.data.id
            })

            toast.success('Orçamento solicitado com sucesso!');
            setStage(1);
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <>
            <Head title="Welcome" />
            <ToastContainer />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <img
                    id="background"
                    className="absolute -left-20 top-0 max-w-[877px]"
                    src="https://laravel.com/assets/img/welcome/background.svg"
                />

                <div className="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:justify-center lg:col-start-2">
                                <svg
                                    className="h-12 w-auto text-white lg:h-16 lg:text-[#FF2D20]"
                                    viewBox="0 0 62 65"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M61.8548 14.6253C61.8778 14.7102 61.8895 14.7978 61.8897 14.8858V28.5615C61.8898 28.737 61.8434 28.9095 61.7554 29.0614C61.6675 29.2132 61.5409 29.3392 61.3887 29.4265L49.9104 36.0351V49.1337C49.9104 49.4902 49.7209 49.8192 49.4118 49.9987L25.4519 63.7916C25.3971 63.8227 25.3372 63.8427 25.2774 63.8639C25.255 63.8714 25.2338 63.8851 25.2101 63.8913C25.0426 63.9354 24.8666 63.9354 24.6991 63.8913C24.6716 63.8838 24.6467 63.8689 24.6205 63.8589C24.5657 63.8389 24.5084 63.8215 24.456 63.7916L0.501061 49.9987C0.348882 49.9113 0.222437 49.7853 0.134469 49.6334C0.0465019 49.4816 0.000120578 49.3092 0 49.1337L0 8.10652C0 8.01678 0.0124642 7.92953 0.0348998 7.84477C0.0423783 7.8161 0.0598282 7.78993 0.0697995 7.76126C0.0884958 7.70891 0.105946 7.65531 0.133367 7.6067C0.152063 7.5743 0.179485 7.54812 0.20192 7.51821C0.230588 7.47832 0.256763 7.43719 0.290416 7.40229C0.319084 7.37362 0.356476 7.35243 0.388883 7.32751C0.425029 7.29759 0.457436 7.26518 0.498568 7.2415L12.4779 0.345059C12.6296 0.257786 12.8015 0.211853 12.9765 0.211853C13.1515 0.211853 13.3234 0.257786 13.475 0.345059L25.4531 7.2415H25.4556C25.4955 7.26643 25.5292 7.29759 25.5653 7.32626C25.5977 7.35119 25.6339 7.37362 25.6625 7.40104C25.6974 7.43719 25.7224 7.47832 25.7523 7.51821C25.7735 7.54812 25.8021 7.5743 25.8196 7.6067C25.8483 7.65656 25.8645 7.70891 25.8844 7.76126C25.8944 7.78993 25.9118 7.8161 25.9193 7.84602C25.9423 7.93096 25.954 8.01853 25.9542 8.10652V33.7317L35.9355 27.9844V14.8846C35.9355 14.7973 35.948 14.7088 35.9704 14.6253C35.9792 14.5954 35.9954 14.5692 36.0053 14.5405C36.0253 14.4882 36.0427 14.4346 36.0702 14.386C36.0888 14.3536 36.1163 14.3274 36.1375 14.2975C36.1674 14.2576 36.1923 14.2165 36.2272 14.1816C36.2559 14.1529 36.292 14.1317 36.3244 14.1068C36.3618 14.0769 36.3942 14.0445 36.4341 14.0208L48.4147 7.12434C48.5663 7.03694 48.7383 6.99094 48.9133 6.99094C49.0883 6.99094 49.2602 7.03694 49.4118 7.12434L61.3899 14.0208C61.4323 14.0457 61.4647 14.0769 61.5021 14.1055C61.5333 14.1305 61.5694 14.1529 61.5981 14.1803C61.633 14.2165 61.6579 14.2576 61.6878 14.2975C61.7103 14.3274 61.7377 14.3536 61.7551 14.386C61.7838 14.4346 61.8 14.4882 61.8199 14.5405C61.8312 14.5692 61.8474 14.5954 61.8548 14.6253ZM59.893 27.9844V16.6121L55.7013 19.0252L49.9104 22.3593V33.7317L59.8942 27.9844H59.893ZM47.9149 48.5566V37.1768L42.2187 40.4299L25.953 49.7133V61.2003L47.9149 48.5566ZM1.99677 9.83281V48.5566L23.9562 61.199V49.7145L12.4841 43.2219L12.4804 43.2194L12.4754 43.2169C12.4368 43.1945 12.4044 43.1621 12.3682 43.1347C12.3371 43.1097 12.3009 43.0898 12.2735 43.0624L12.271 43.0586C12.2386 43.0275 12.2162 42.9888 12.1887 42.9539C12.1638 42.9203 12.1339 42.8916 12.114 42.8567L12.1127 42.853C12.0903 42.8156 12.0766 42.7707 12.0604 42.7283C12.0442 42.6909 12.023 42.656 12.013 42.6161C12.0005 42.5688 11.998 42.5177 11.9931 42.4691C11.9881 42.4317 11.9781 42.3943 11.9781 42.3569V15.5801L6.18848 12.2446L1.99677 9.83281ZM12.9777 2.36177L2.99764 8.10652L12.9752 13.8513L22.9541 8.10527L12.9752 2.36177H12.9777ZM18.1678 38.2138L23.9574 34.8809V9.83281L19.7657 12.2459L13.9749 15.5801V40.6281L18.1678 38.2138ZM48.9133 9.14105L38.9344 14.8858L48.9133 20.6305L58.8909 14.8846L48.9133 9.14105ZM47.9149 22.3593L42.124 19.0252L37.9323 16.6121V27.9844L43.7219 31.3174L47.9149 33.7317V22.3593ZM24.9533 47.987L39.59 39.631L46.9065 35.4555L36.9352 29.7145L25.4544 36.3242L14.9907 42.3482L24.9533 47.987Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">

                            <div className='flex justify-center items-center flex-col'>
                                <h1 className='font-bold pb-20'>Solicitar Orçamento</h1>

                                <div className='flex'>
                                    <ol class="space-y-4 w-72 p-6">
                                        <li>
                                            <div class={
                                                stage === 1 ? 'w-full p-4 text-blue-700 bg-blue-100 border border-blue-300 rounded-lg dark:bg-gray-800 dark:border-blue-800 dark:text-blue-400' :
                                                    stage > 1 ? 'w-full p-4 text-green-700 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:border-green-800 dark:text-green-400' : 'w-full p-4 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'
                                            } role="alert">
                                                <div class="flex items-center justify-between">
                                                    <span class="sr-only">Dados do Cliente</span>
                                                    <h3 class="font-medium">1. Dados do Cliente</h3>
                                                    {stage === 1 && <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                    </svg>}

                                                    {stage > 1 && <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                                    </svg>}


                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class={
                                                stage === 2 ? 'w-full p-4 text-blue-700 bg-blue-100 border border-blue-300 rounded-lg dark:bg-gray-800 dark:border-blue-800 dark:text-blue-400' :
                                                    stage > 2 ? 'w-full p-4 text-green-700 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:border-green-800 dark:text-green-400' : 'w-full p-4 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'
                                            } role="alert">
                                                <div class="flex items-center justify-between">
                                                    <span class="sr-only">Dados do Orçamento</span>
                                                    <h3 class="font-medium">2. Dados do Orçamento</h3>
                                                    {stage === 2 && <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                    </svg>}

                                                    {stage > 2 && <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                                    </svg>}
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class={
                                                stage === 3 ? 'w-full p-4 text-blue-700 bg-blue-100 border border-blue-300 rounded-lg dark:bg-gray-800 dark:border-blue-800 dark:text-blue-400' :
                                                    stage > 3 ? 'w-full p-4 text-green-700 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:border-green-800 dark:text-green-400' : 'w-full p-4 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'
                                            } role="alert">
                                                <div class="flex items-center justify-between">
                                                    <span class="sr-only">Confirmação</span>
                                                    <h3 class="font-medium">3. Confirmação</h3>
                                                    {stage === 3 && <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                    </svg>}

                                                    {stage > 3 && <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                                    </svg>}
                                                </div>
                                            </div>
                                        </li>
                                    </ol>

                                    <div className='flex flex-col'>
                                        {(stage === 1 || stage === 3) && <div className='flex flex-col'>
                                            <div className='flex gap-4'>
                                                <div>
                                                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                                                    <input type="text" disabled={stage === 3} id="first_name" value={nome} onChange={e => setNome(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nome" required />
                                                </div>

                                                <div>
                                                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                                                    <input type="text" disabled={stage === 3} id="first_name" value={email} onChange={e => setEmail(e.target.value)} class=" min-w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="E-mail" required />
                                                </div>

                                                <div>
                                                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefone</label>
                                                    <input type="text" disabled={stage === 3} id="first_name" value={telefone} onChange={e => setTelefone(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Telefone" required />
                                                </div>
                                            </div>

                                            <div className='flex gap-4'>
                                                <div>
                                                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Logradouro</label>
                                                    <input type="text" disabled={stage === 3} id="first_name" value={logradouro} onChange={e => setLogradouro(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Logradouro" required />
                                                </div>

                                                <div>
                                                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numero</label>
                                                    <input type="text" disabled={stage === 3} id="first_name" value={numero} onChange={e => setNumero(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Numero" required />
                                                </div>

                                                <div>
                                                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Complemento</label>
                                                    <input type="text" disabled={stage === 3} id="first_name" value={complemento} onChange={e => setComplemento(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Complemento" required />
                                                </div>
                                            </div>

                                            <div className='flex gap-4'>
                                                <div>
                                                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bairro</label>
                                                    <input type="text" disabled={stage === 3} id="first_name" value={bairro} onChange={e => setBairro(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bairro" required />
                                                </div>

                                                <div>
                                                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cidade</label>
                                                    <input type="text" disabled={stage === 3} id="first_name" value={cidade} onChange={e => setCidade(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cidade" required />
                                                </div>

                                                <div>
                                                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CEP</label>
                                                    <input type="text" disabled={stage === 3} id="first_name" value={cep} onChange={e => setCep(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="CEP" required />
                                                </div>
                                            </div>
                                        </div>}

                                        {(stage === 2 || stage === 3) && <div className='flex flex-col'>
                                            <div className='flex gap-4 pt-4'>
                                                <div className='min-w-96'>
                                                    <label for="orcamento" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de Orçamento</label>
                                                    <select disabled={stage === 3} value={tipoOrcamento} onChange={e => {
                                                        setTipoOrcamento(e.target.value)
                                                        setNavegadoresOs('')
                                                    }} id="orcamento" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                        <option selected value="">Selecione uma opção</option>
                                                        <option value="WEB">WEB</option>
                                                        <option value="MOBILE">MOBILE</option>
                                                        <option value="DESKTOP">DESKTOP</option>
                                                    </select>
                                                </div>

                                                <div className='min-w-96'>
                                                    <label for="paginas_telas" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantidade de {tipoOrcamento === 'WEB' ? 'Páginas' : 'Telas'}</label>
                                                    <input disabled={stage === 3} type="number" id="paginas_telas" value={qtdPaginasTelas} onChange={e => setQtdPaginasTelas(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Telefone" required />
                                                </div>
                                            </div>

                                            {tipoOrcamento === 'WEB' && <>
                                                <label class="pt-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Navegadores</label>

                                                <div className='pl-4 pb-4'>
                                                    <div class="flex items-center">
                                                        <input id="checkbox-chrome" disabled={stage === 3} checked={navegadoresOs.includes('Chrome')} onChange={() => {
                                                            if (navegadoresOs.includes('Chrome')) {
                                                                setNavegadoresOs(navegadoresOs.replace('Chrome', ''))
                                                            } else {
                                                                if (navegadoresOs.length > 0) {
                                                                    setNavegadoresOs(navegadoresOs + ' Chrome')
                                                                } else {
                                                                    setNavegadoresOs(navegadoresOs + 'Chrome')
                                                                }
                                                            }
                                                        }} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label for="checkbox-chrome" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Chrome</label>
                                                    </div>

                                                    <div class="flex items-center">
                                                        <input id="checked-firefox" disabled={stage === 3} checked={navegadoresOs.includes('Firefox')} onChange={() => {
                                                            if (navegadoresOs.includes('Firefox')) {
                                                                setNavegadoresOs(navegadoresOs.replace('Firefox', ''))
                                                            } else {
                                                                if (navegadoresOs.length > 0) {
                                                                    setNavegadoresOs(navegadoresOs + ' Firefox')
                                                                } else {
                                                                    setNavegadoresOs(navegadoresOs + 'Firefox')
                                                                }
                                                            }
                                                        }} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label for="checked-firefox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Firefox</label>
                                                    </div>

                                                    <div class="flex items-center">
                                                        <input id="checked-safari" disabled={stage === 3} checked={navegadoresOs.includes('Safari')} onChange={() => {
                                                            if (navegadoresOs.includes('Safari')) {
                                                                setNavegadoresOs(navegadoresOs.replace('Safari', ''))
                                                            } else {
                                                                if (navegadoresOs.length > 0) {
                                                                    setNavegadoresOs(navegadoresOs + ' Safari')
                                                                } else {
                                                                    setNavegadoresOs(navegadoresOs + 'Safari')
                                                                }
                                                            }
                                                        }} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label for="checked-safari" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Safari</label>
                                                    </div>

                                                    <div class="flex items-center">
                                                        <input id="checked-edge" disabled={stage === 3} checked={navegadoresOs.includes('EDGE')} onChange={() => {
                                                            if (navegadoresOs.includes('EDGE')) {
                                                                setNavegadoresOs(navegadoresOs.replace('EDGE', ''))
                                                            } else {
                                                                if (navegadoresOs.length > 0) {
                                                                    setNavegadoresOs(navegadoresOs + ' EDGE')
                                                                } else {
                                                                    setNavegadoresOs(navegadoresOs + 'EDGE')
                                                                }
                                                            }
                                                        }} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label for="checked-edge" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">EDGE</label>
                                                    </div>

                                                    <div class="flex items-center">
                                                        <input id="checked-ie" disabled={stage === 3} checked={navegadoresOs.includes('IE')} onChange={() => {
                                                            if (navegadoresOs.includes('IE')) {
                                                                setNavegadoresOs(navegadoresOs.replace('IE', ''))
                                                            } else {
                                                                if (navegadoresOs.length > 0) {
                                                                    setNavegadoresOs(navegadoresOs + ' IE')
                                                                } else {
                                                                    setNavegadoresOs(navegadoresOs + 'IE')
                                                                }
                                                            }
                                                        }} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label for="checked-ie" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">IE</label>
                                                    </div>
                                                </div>
                                            </>}

                                            {tipoOrcamento === 'MOBILE' && <>
                                                <label class="pt-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sistemas Mobiles</label>

                                                <div className='pl-4 pb-4'>
                                                    <div class="flex items-center">
                                                        <input id="checkbox-android" disabled={stage === 3} checked={navegadoresOs.includes('Android')} onChange={() => {
                                                            if (navegadoresOs.includes('Android')) {
                                                                setNavegadoresOs(navegadoresOs.replace('Android', ''))
                                                            } else {
                                                                if (navegadoresOs.length > 0) {
                                                                    setNavegadoresOs(navegadoresOs + ' Android')
                                                                } else {
                                                                    setNavegadoresOs(navegadoresOs + 'Android')
                                                                }
                                                            }
                                                        }} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label for="checkbox-android" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Android</label>
                                                    </div>

                                                    <div class="flex items-center">
                                                        <input id="checked-ios" disabled={stage === 3} checked={navegadoresOs.includes('IOS')} onChange={() => {
                                                            if (navegadoresOs.includes('IOS')) {
                                                                setNavegadoresOs(navegadoresOs.replace('IOS', ''))
                                                            } else {
                                                                if (navegadoresOs.length > 0) {
                                                                    setNavegadoresOs(navegadoresOs + ' IOS')
                                                                } else {
                                                                    setNavegadoresOs(navegadoresOs + 'IOS')
                                                                }
                                                            }
                                                        }} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label for="checked-ios" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">IOS</label>
                                                    </div>
                                                </div>
                                            </>}

                                            {tipoOrcamento === 'DESKTOP' && <>
                                                <label class="pt-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sistemas Operacionais</label>

                                                <div className='pl-4 pb-4'>
                                                    <div class="flex items-center">
                                                        <input id="checkbox-windows" disabled={stage === 3} checked={navegadoresOs.includes('Windows')} onChange={() => {
                                                            if (navegadoresOs.includes('Windows')) {
                                                                setNavegadoresOs(navegadoresOs.replace('Windows', ''))
                                                            } else {
                                                                if (navegadoresOs.length > 0) {
                                                                    setNavegadoresOs(navegadoresOs + ' Windows')
                                                                } else {
                                                                    setNavegadoresOs(navegadoresOs + 'Windows')
                                                                }
                                                            }
                                                        }} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label for="checkbox-windows" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Windows</label>
                                                    </div>

                                                    <div class="flex items-center">
                                                        <input id="checked-linux" disabled={stage === 3} checked={navegadoresOs.includes('Linux')} onChange={() => {
                                                            if (navegadoresOs.includes('Linux')) {
                                                                setNavegadoresOs(navegadoresOs.replace('Linux', ''))
                                                            } else {
                                                                if (navegadoresOs.length > 0) {
                                                                    setNavegadoresOs(navegadoresOs + ' Linux')
                                                                } else {
                                                                    setNavegadoresOs(navegadoresOs + 'Linux')
                                                                }
                                                            }
                                                        }} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label for="checked-linux" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Linux</label>
                                                    </div>

                                                    <div class="flex items-center">
                                                        <input id="checked-macos" disabled={stage === 3} checked={navegadoresOs.includes('MACOS')} onChange={() => {
                                                            if (navegadoresOs.includes('MACOS')) {
                                                                setNavegadoresOs(navegadoresOs.replace('MACOS', ''))
                                                            } else {
                                                                if (navegadoresOs.length > 0) {
                                                                    setNavegadoresOs(navegadoresOs + ' MACOS')
                                                                } else {
                                                                    setNavegadoresOs(navegadoresOs + 'MACOS')
                                                                }
                                                            }
                                                        }} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label for="checked-macos" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">MACOS</label>
                                                    </div>
                                                </div>
                                            </>}

                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Features</label>

                                            <div className='pl-4 pb-4'>
                                                {tipoOrcamento !== 'DESKTOP' && <div class="flex items-center">
                                                    <input id="checkbox-login" disabled={stage === 3} checked={sistemaLogin} onChange={() => {
                                                        setSistemaLogin(!sistemaLogin)
                                                    }} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="checkbox-login" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sistema de Login</label>
                                                </div>}

                                                {tipoOrcamento !== 'DESKTOP' && <div class="flex items-center">
                                                    <input id="checked-pagamento" disabled={stage === 3} checked={sistemaPagamento} onChange={() => {
                                                        setSistemaPagamento(!sistemaPagamento)
                                                    }} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="checked-pagamento" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sistema de Pagamento</label>
                                                </div>}

                                                {tipoOrcamento === 'DESKTOP' && <div class="flex items-center">
                                                    <input id="checked-impressora" disabled={stage === 3} checked={suporteImpressora} onChange={() => {
                                                        setSuporteImpressora(!suporteImpressora)
                                                    }} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="checked-impressora" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Suporte a Impressora</label>
                                                </div>}

                                                {tipoOrcamento === 'DESKTOP' && <div class="flex items-center">
                                                    <input id="checked-licenca" disabled={stage === 3} checked={licencaAcesso} onChange={() => {
                                                        setLicencaAcesso(!licencaAcesso)
                                                    }} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="checked-licenca" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Licença de Acesso</label>
                                                </div>}
                                            </div>
                                        </div>}
                                    </div>
                                </div>

                                <div className='flex gap-4 justify-end w-full'>
                                    {stage > 1 && <button type="button" onClick={() => {
                                        setStage(stage - 1);
                                    }} class="disabled:bg-slate-500 px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Voltar
                                    </button>}

                                    {stage < 3 && <button type="button" onClick={() => {
                                        if (stage === 1) {
                                            handleValidateTo2WithZod()
                                        }
                                        if (stage === 2) {
                                            handleValidateTo3WithZod()
                                        }
                                    }} class="disabled:bg-slate-500 px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Proximo
                                    </button>}

                                    {stage === 3 && <button type="button" onClick={() => {
                                        handleRegister()
                                    }} class="disabled:bg-slate-500 px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Enviar
                                    </button>}
                                </div>
                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            Laravel v{laravelVersion} (PHP v{phpVersion})
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
