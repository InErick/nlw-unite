let participantes = [
    {
        nome: 'Erick Ribeiro da Silva',
        email: 'ericktho202@gmail.com',
        dataInscricao: new Date(2024, 3, 1, 19, 20), // ano, mês, dia, hora, minuto
        dataCheckIn: new Date(2024, 3, 2, 11, 58)
    },
    {
        nome: 'Ana Souza',
        email: 'anasouza@example.com',
        dataInscricao: new Date(2024, 2, 28, 15, 10),
        dataCheckIn: null
    },
    {
        nome: 'Carlos Oliveira',
        email: 'carlos.oliveira@example.com',
        dataInscricao: new Date(2024, 2, 29, 10, 45),
        dataCheckIn: new Date(2024, 3, 2, 10, 15)
    },
    {
        nome: 'Maria Santos',
        email: 'msantos@example.com',
        dataInscricao: new Date(2024, 3, 1, 8, 30),
        dataCheckIn: new Date(2024, 3, 2, 12, 20)
    },
    {
        nome: 'João Silva',
        email: 'joaosilva@example.com',
        dataInscricao: new Date(2024, 3, 1, 10, 0),
        dataCheckIn: new Date(2024, 3, 2, 11, 0)
    },
    {
        nome: 'Patrícia Ferreira',
        email: 'patricia.ferreira@example.com',
        dataInscricao: new Date(2024, 2, 30, 14, 20),
        dataCheckIn: new Date(2024, 3, 2, 10, 45)
    },
    {
        nome: 'Gabriel Costa',
        email: 'gabriel.costa@example.com',
        dataInscricao: new Date(2024, 3, 1, 12, 15),
        dataCheckIn: null
    },
    {
        nome: 'Juliana Oliveira',
        email: 'juliana.oliveira@example.com',
        dataInscricao: new Date(2024, 3, 1, 9, 40),
        dataCheckIn: new Date(2024, 3, 2, 11, 45)
    },
    {
        nome: 'Rafael Martins',
        email: 'rafael.martins@example.com',
        dataInscricao: new Date(2024, 3, 1, 13, 5),
        dataCheckIn: new Date(2024, 3, 2, 14, 15)
    },
    {
        nome: 'Luciana Oliveira',
        email: 'luciana.oliveira@example.com',
        dataInscricao: new Date(2024, 3, 1, 7, 55),
        dataCheckIn: null
    }
];

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()). to(participante.dataInscricao) // Formata a data da inscrição

    let dataCheckIn = dayjs(Date.now()). to(participante.dataCheckIn) // Formata a data do CheckIn
    
    if(participante.dataCheckIn == null){
        dataCheckIn = `
        <button
            data-email="${participante.email}"
            onclick="fazerCheckIn(event)">
            Confirmar check-in
        </button>
        `
    }
        return `
    <tr>
        <td>
            <strong>
                ${participante.nome}
            </strong>
            <br>
            <small>
                ${participante.email}
            </small>
        </td>
        <td>${dataInscricao}</td>
        <td>${dataCheckIn}</td>
    </tr>
        `
}
const atualizarLista = (participantes) => {
    let output = ""
    for( let participante of participantes){
        output = output + criarNovoParticipante(participante)
    }

    //Substituir informação do HTML
    document.querySelector('tbody').innerHTML = output
}
atualizarLista(participantes)


const adicionarParticipante = (event) => {
    event.preventDefault()

    const dadosDoFormulario = new FormData(event.target)
    
    const participante = {
        nome: dadosDoFormulario.get('nome'),
        email: dadosDoFormulario.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }

    // Verificar se o participante já existe
    const participanteExiste = participantes.find((p) => {
        return p.email == participante.email
        }
    )

    if(participanteExiste) {
        alert("Participante já cadastrado!")
        return
    }

    participantes = [participante, ...participantes]
    atualizarLista(participantes)

    // limpar o formulário
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
} 

const fazerCheckIn = (event) => {
    // Confirmar se realmente quer o check-in
    const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in ?'
    if(confirm(mensagemConfirmacao) == false){
        return
    }

    // encontrar o participante dentro da lista
    const participante = participantes.find((p) => {
        return p.email == event.target.dataset.email
    })
    //atualizar o check-in do participante
    participante.dataCheckIn = new Date()
    //atualizar a lista de participante
    atualizarLista(participantes)
}

