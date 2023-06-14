const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
    let propostas = await prisma.propostas.create({
        data: req.body
    });

    res.status(200).json(propostas).end();
}

const read = async (req, res) => {
    let propostas = await prisma.propostas.findMany({
        select: {
            id:true,
            proposta: true,
              id_cli: {
                select: {
                    nome: true,
                    imagem: true,
                }
              }
        }
    });

    res.status(200).json(propostas).end();
}


const del = async (req, res) => {
    const propostas = await prisma.propostas.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.status(204).end();
}

const readone = async (req, res) => {
    let propostas = await prisma.propostas.findUnique({
      where: {
        id: Number(req.params.id),
      },
      select: {
        id:true,
        proposta: true,
          id_cli: {
            select: {
                nome: true,
                imagem: true,
            }
          }
    },
    });
  
    //SELECT * FROM userCliente INNER JOIN publicacao ON userCliente.id = publicacao.usuario_id WHERE ....
  
    res.status(200).json(propostas).end();
  };

module.exports = {
    create,
    read,
    del,
    readone
}