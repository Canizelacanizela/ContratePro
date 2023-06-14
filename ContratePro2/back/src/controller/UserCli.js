const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

const create = async (req, res) => {
  let userCliente = await prisma.userCliente.create({
    data: req.body,
  });

  res.status(200).json(userCliente).end();
};

const readOne = async (req, res) => {
  let userCliente = await prisma.userCliente.findUnique({
    where: {
      id: Number(req.params.id),
    },
    select: {
      nome: true,
      email: true,
      descricao: true,
      telefone: true,
      email: true,
      cidade: true,
      imagem: true,
    },
  });

  //SELECT * FROM userCliente INNER JOIN publicacao ON userCliente.id = publicacao.usuario_id WHERE ....

  res.status(200).json(userCliente).end();
};

const read = async (req, res) => {
  let userCliente = await prisma.userCliente.findMany({
    select: {
      id: true,
      email: true,
      nome: true,
      descricao: true,
      senha: true,
      telefone: true,
      imagem: true,
      cidade: true
    },
  });

  //SELECT email, nome FROM userCliente WHERE email = ''

  res.status(200).json(userCliente).end();
};

const login = async (req, res) => {
  let userCliente = await prisma.userCliente.findMany({
    where: {
      AND: [{ email: req.body.email }, { senha: req.body.senha }],
    },
    select: {
      id: true,
      nome: true,
      email: true,
      telefone: true,
      imagem: true,
      cidade: true
    },
  });
  console.log(userCliente[0]);
  if (userCliente[0] != undefined) {
    jwt.sign(userCliente[0],
    process.env.KEY, { expiresIn: "10h" },
    function (err, token) {
      console.log(err);
        if (err == null) {
          userCliente[0]["token"] = token;
          res.status(200).json(userCliente[0]).end();
        } else {
          res.status(404).json(err).end();
        }
      }
    );
  } else {
    res.status(404).json({ msg: "Usuario ou Senha Invalidos" }).end();
  }
  //SELECT id, nome FROM userCliente WHERE email = '' AND senha = ''
};

const update = async (req, res) => {
  const userCliente = await prisma.userCliente.update({
    where: {
      id: Number(req.params.id),
    },
    data: req.body,
  });
  res.status(202).json(userCliente).end();
};

const del = async (req, res) => {
  const userCliente = await prisma.userCliente.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  res.status(204).end();
};

module.exports = {
  create,
  read,
  login,
  readOne,
  del,
  update
};
