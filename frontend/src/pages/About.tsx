import Header from '../components/Header'

function About() {
    return (

<div className="flex flex-col min-h-screen">
    <Header>Mais Informações</Header>

    <div className="flex flex-col flex-grow items-center justify-center text-black dark:text-white text-center text-3xl">
        <div className="flex flex-col gap-8">
            <p>Criado por Augusto de Freitas Kelsch</p>
            <p>TCC com fins Acadêmicos</p>
            <p>Pós Graduação: Desenvolvimento Fullstack</p>
            <p className='flex flex-col gap-3'> Universidade: PUC RS <img src="https://online.pucrs.br/hubfs/Trinto/pucrs-logo.svg" alt="GitHub Icon" className='h-30' /></p>
        </div>
        <div className="flex p-12 flex-col  gap-4">
            <p className='flex gap-3'> <img src="https://www.svgrepo.com/show/247466/letter-contact.svg" alt="GitHub Icon" className='h-10' />Contato: <a href="mailto:augustokelsch@hotmail.com" className="underline">augustokelsch@hotmail.com</a></p>
            <p className='flex gap-3'> <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub Icon" className='h-10' /> GitHub: <a href="https://github.com/augukelsch/project-pps-v00" target='blank' className="underline">augukelsch / project-pps-v00</a></p>
        </div>
    </div>
</div>
    )
}

export default About