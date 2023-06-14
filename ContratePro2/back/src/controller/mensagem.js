const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const read = async (req, res) => {
    let mensagem = await prisma.mensagens.findMany();

    res.status(200).json(mensagem).end();
}

const readOne = async (req, res) => {
    const {id_cliente} = req.params;

    try {
        const messages = await prisma.mensagens.findMany({
            where: {
                id_cliente: Number(id_cliente)
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

        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar as mensagens.' });
    }
};

module.exports = {
    read,
    readOne
}