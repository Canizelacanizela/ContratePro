const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
    let AvaliaProfissional = await prisma.avaliaProfissional.create({
        data: req.body
    });

    res.status(200).json(AvaliaProfissional).end();    
}

const read = async (req, res) => {
    let AvaliaProfissional = await prisma.avaliaProfissional.findMany({
        select: {
            id: true,
            comentario: true
        }
    });

    res.status(200).json(AvaliaProfissional).end();
}

const update = async (req, res) => {
    const AvaliaProfissional = await prisma.avaliaProfissional.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })
    res.status(202).json(AvaliaProfissional).end();
}

const del = async (req, res) => {
    const AvaliaProfissional = await prisma.avaliaProfissional.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.status(204).end();
}

const readOne = async (req, res) => {

     let AvaliaProfissional = await prisma.avaliaProfissional.findUnique({
    
     where: {
     id: Number(req.params.id)
     },
     select: {
    comentario: true,
     }
    });

    //SELECT * FROM user INNER JOIN publicacao ON user.id = publicacao.usuario_id WHERE ....
  
     res.status(200).json(AvaliaProfissional).end();
    }

module.exports = {
    create,
    read,
    del,
    update,
    readOne
}

