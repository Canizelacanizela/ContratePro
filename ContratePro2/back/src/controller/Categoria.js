const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
    let categoriaProfissoes = await prisma.categoriaProfissoes.create({
        data: req.body
    });

    res.status(200).json(categoriaProfissoes).end();
}

const read = async (req, res) => {
    let categoriaProfissoes = await prisma.categoriaProfissoes.findMany({
        select: {
            id: true,
            nome_categoria: true
        }
    });

    res.status(200).json(categoriaProfissoes).end();
}

const update = async (req, res) => {
    const categoriaProfissoes = await prisma.categoriaProfissoes.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })
    res.status(202).json(categoriaProfissoes).end();
}

const del = async (req, res) => {
    const categoriaProfissoes = await prisma.categoriaProfissoes.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.status(204).end();
}

module.exports = {
    create,
    read,
    del,
    update
}