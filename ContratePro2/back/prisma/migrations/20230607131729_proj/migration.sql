-- CreateTable
CREATE TABLE `UserCliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imagem` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mensagens` (
    `id_mensagem` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cliente` INTEGER NOT NULL,
    `id_profissional` INTEGER NOT NULL,
    `conteudo` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_mensagem`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `respostas` (
    `id_mensagem` INTEGER NOT NULL AUTO_INCREMENT,
    `id_profiss` INTEGER NOT NULL,
    `id_clien` INTEGER NOT NULL,
    `conteudo` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_mensagem`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserProfissionais` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imagem` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `biografia` VARCHAR(191) NOT NULL,
    `porhora` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `id_categoria` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoriaProfissoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_categoria` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `avaliaProfissional` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cliente` INTEGER NOT NULL,
    `comentario` VARCHAR(191) NOT NULL,
    `id_profissional` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Propostas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `proposta` VARCHAR(191) NOT NULL,
    `id_cliente` INTEGER NOT NULL,
    `id_profissional` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `mensagens` ADD CONSTRAINT `mensagens_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `UserCliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mensagens` ADD CONSTRAINT `mensagens_id_profissional_fkey` FOREIGN KEY (`id_profissional`) REFERENCES `UserProfissionais`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `respostas` ADD CONSTRAINT `respostas_id_clien_fkey` FOREIGN KEY (`id_clien`) REFERENCES `UserCliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `respostas` ADD CONSTRAINT `respostas_id_profiss_fkey` FOREIGN KEY (`id_profiss`) REFERENCES `UserProfissionais`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserProfissionais` ADD CONSTRAINT `UserProfissionais_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `categoriaProfissoes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `avaliaProfissional` ADD CONSTRAINT `avaliaProfissional_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `UserCliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `avaliaProfissional` ADD CONSTRAINT `avaliaProfissional_id_profissional_fkey` FOREIGN KEY (`id_profissional`) REFERENCES `UserProfissionais`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Propostas` ADD CONSTRAINT `Propostas_id_profissional_fkey` FOREIGN KEY (`id_profissional`) REFERENCES `UserProfissionais`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Propostas` ADD CONSTRAINT `Propostas_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `UserCliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
