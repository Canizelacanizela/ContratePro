const express = require('express');

const router = express.Router();

const Middle = require('../middleware/middleware');

const Prop = require('../controller/Propostas');
const Cat = require('../controller/Categoria');
const Profissa = require('../controller/UserProf');
const Aval = require('../controller/Avalia');
const UserCli = require('../controller/UserCli');
const Mensagem = require('../controller/mensagem');

// router.put('*', Middle.ValidaAcesso);
// router.delete('*', Middle.ValidaAcesso);
// router.post('*', Middle.ValidaAcesso);

//-------------------------------------------------------------------------------------
router.get('/prop', Prop.read);
router.post('/propcriar', Prop.create);
router.delete('/propdel/:id', Prop.del);
router.get('/propOne/:id', Prop.readone);

// ------------------------------Categorias-----------------------------------------
router.get('/cat', Cat.read);
router.post('/catcriar', Cat.create);
router.put('/catupdate/:id', Cat.update);
router.delete('/catdel/:id', Cat.del);
// ------------------------------UserProfissional------------------------------------
router.post('/loginProf', Profissa.login);
router.get('/prof', Profissa.read);
router.get('/profcom', Profissa.readComent);
router.get('/prof/:id', Profissa.readOne);
// -----------------------------------------
router.post('/profcriar',Profissa.create);
router.put('/profupdate/:id',Profissa.update);
router.delete('/profdel/:id',Profissa.del);
// ------------------------------Clientes------------------------------------
router.get('/cli', UserCli.read);
router.post('/clicriar',UserCli.create);
router.put('/cliupdate/:id',UserCli.update);
router.delete('/clidel/:id',UserCli.del);

router.post('/profcriar', Profissa.create);
router.put('/profupdate/:id', Profissa.update);
router.delete('/profdel/:id', Profissa.del);

// ------------------------------Aval------------------------------------
router.get('/aval', Aval.read);
router.get('/avalOne/:id', Aval.readOne);
router.post('/avalcriar', Aval.create);
router.put('/avalupdate/:id', Aval.update);
router.delete('/avaldel/:id', Aval.del);
// ------------------------------Usuario--------------------------------------
router.get('/user', UserCli.read);
router.get('/userOne/:id', UserCli.readOne);
router.post('/usercriar', UserCli.create);
router.post('/login', UserCli.login);
router.put('/userupdate/:id', UserCli.update);
router.delete('/userdel/:id', UserCli.del);
// ------------------------------mensagens-----------------------------------------
router.get('/men', Mensagem.read);


module.exports = router;