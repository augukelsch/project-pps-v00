import { Factory, LogIn, User, Lock, Boxes, Cog, Warehouse, ShieldX } from "lucide-react"
import { useState } from "react"
import { postLogin } from "../services/auth.api"

type UserData = {
    username: string,
    password: string
}


function Login() {
    const [loginData, setLoginData] = useState<UserData>({ username: "", password: "" })
    const [isUserIncorrect, setIsUserIncorrect] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setIsUserIncorrect(false)
        const fieldName = e.target.name as keyof typeof loginData;
        const fieldValue = e.target.value;

        setLoginData(prev => ({
            ...prev,
            [fieldName]: fieldValue,
        }));
    }

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        
        const payload: UserData = {
            ...loginData,
        };

        try {
            const response = await postLogin(payload);
            if(response.access_token != undefined){
                localStorage.setItem("access_token", response.access_token)
                window.location.pathname = '/';
            }else{
                setIsUserIncorrect(true)
                setTimeout(()=>{
                    return setIsUserIncorrect(false)
                },2000)
            }
        } catch (err) {
            console.error('Erro ao logar:', err);
        }
    }

    return (
        <div className="flex flex-col items-center  justify-center bg-gray-200 dark:bg-gray-900 dark:text-gray-300 min-h-screen">
            <div className="rounded-2xl border-2 border-gray-700 bg-gray-800 w-full max-w-90">
                <form onSubmit={handleLogin} className="flex flex-col p-6">
                    <div className="text-center justify-items-center mb-3">
                        <div className=" w-20 bg-amber-700 rounded-md p-4">
                            <Factory size={46} />
                        </div>
                    </div>
                    <div className="text-center mb-5">
                        <h2 className="font-bold text-2xl mb-2">Nome Empresa</h2>
                        <h3 className="font-light text-sm">Sistema de Gerenciamento de Produção</h3>
                    </div>
                    <div className="mb-2">
                        <label className="flex gap-2" htmlFor="username"><User />Usuário:</label>
                    </div>
                    <input
                        className="bg-gray-200 border-1 dark:bg-gray-600 p-2 rounded-sm mb-4 w-full text-gray-900 dark:text-gray-100"
                        id="username"
                        name="username"
                        value={loginData.username}
                        onChange={handleChange}
                        placeholder="Insira seu usuário"
                    />
                    <div className="mb-2">
                        <label className="flex gap-2" htmlFor="password"><Lock />Senha:</label>
                    </div>
                    <input
                        className="bg-gray-200 border-1  dark:bg-gray-600 p-2 rounded-sm mb-5 w-full text-gray-900 dark:text-gray-100"
                        id="password"
                        name="password"
                        type="password"
                        value={loginData.password}
                        onChange={handleChange}
                        placeholder="Insira sua senha"
                    />
                    <div id="wrongCredentials" className={`${isUserIncorrect ? "opacity-100  translate-y-2 " : "opacity-0 rotate-5"} flex items-center gap-2 text-red-600 font-bold transition duration-500 ease-in-out`}><ShieldX /> Wrong Credentials </div>
                    <button
                        className="button py-2 px-4 flex gap-3 w-full items-center justify-center mt-5 font-bold"
                        onClick={handleLogin}><LogIn size={20} />Logar</button>
                    <span className="border-1 border-gray-700 mt-6" />
                    <div className="flex justify-between p-4 font-light text-xs mt-3">
                        <div className="flex items-center flex-col gap-1">
                            <Boxes size={40} className="text-amber-600 bg-gray-700 p-2 rounded-md" />
                            <h3>Produtos</h3>
                        </div>
                        <div className="flex items-center flex-col gap-1">
                            <Cog size={40} className="text-amber-600 bg-gray-700 p-2 rounded-md" />
                            <h3>Produção</h3>
                        </div>
                        <div className="flex items-center flex-col gap-1">
                            <Warehouse size={40} className="text-amber-600 bg-gray-700 p-2 rounded-md" />
                            <h3>Estoque</h3>
                        </div>
                    </div>
                </form>
            </div>
            <div className="mt-5 font-light text-xs text-gray-600">
                © 2025 Empresa. Todos os direitos reservados.
            </div>
        </div>
    )
}

export default Login