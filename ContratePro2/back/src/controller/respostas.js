const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const read = async (req, res) => {
    let resposta = await prisma.respostas.findMany();

    res.status(200).json(resposta).end();
}

const readOne = async (req, res) => {
    const {id_profiss} = req.params;

    try {
        const resposta = await prisma.respostas.findMany({
            where: {
                id_profiss: Number(id_profiss)
            },
            orderBy: {
                data: 'asc' // Ordenar por data em ordem crescente (do mais antigo para o mais recente)
            },
            select: {
                id_mensagem: true,
                conteudo: true,
                id_cliente: true,
                id_profissional: true,
                data: true // Adicionando a propriedade 'data' para ser retornada
            }
        });

        res.status(200).json(resposta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar as mensagens.' });
    }
};

module.exports = {
    read,
    readOne
}