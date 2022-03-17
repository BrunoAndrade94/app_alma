// criptografar senha
const bcrypt = require("bcrypt-nodejs");

module.exports = (app) => {
	const n = app.api.config.notificacoes;
	const v = app.api.config.validacoes;
	const tabela = app.api.entidades.db.tabelas;
	const coluna = app.api.entidades.db.colunas;

	const criptografarSenha = (senha) => {
		const tempero = bcrypt.genSaltSync(10);
		return bcrypt.hashSync(senha, tempero);
	};

	const incluir = async (req, res) => {
		try {
			// obtem usuario do corpo da requisição
			const usuario = { ...req.body };

			// validações para persistencia dos dados
			v.existeOuErro(usuario.nome, n.nomeNaoInformado);
			v.existeOuErro(usuario.email, n.emailNaoInformado);
			v.existeOuErro(usuario.usuario, n.usuarioNaoInformado);
			v.existeOuErro(usuario.senha, n.senhaNaoInformada);
			v.existeOuErro(usuario.confirmacaoSenha, n.confirmacaoInvalida);
			v.igualOuErro(
				usuario.senha,
				usuario.confirmacaoSenha,
				n.senhasNaoConferem
			);

			// // consultar se existe cadastro de usuário ou email
			const verificarEmailDeUsuario = await app
				.db(tabela.usuarios)
				.where({ email: usuario.email })
				.whereNull(coluna.removidoEm);
			v.naoExisteOuErro(verificarEmailDeUsuario, n.emailJaCadastrado);

			const verificarUsuarioDeUsuario = await app
				.db(tabela.usuarios)
				.where({ usuario: usuario.usuario })
				.whereNull(coluna.removidoEm);
			v.naoExisteOuErro(verificarUsuarioDeUsuario, n.usuarioJaCadastrado);

			// criptografar a senha antes de persistir
			usuario.senha = criptografarSenha(usuario.senha);
			delete usuario.confirmacaoSenha;

			// persistir usuario no banco
			app.db(tabela.usuarios)
				.insert(usuario)
				.then((_) => res.status(204).send())
				.catch((erro) => res.status(500).send(erro));
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	// SEM USO
	const verificarEmailUsuario = (usuario) => {
		try {
			const verificarEmailDeUsuario = app
				.db(tabela.usuarios)
				.where({ email: usuario.email })
				.whereNull(coluna.removidoEm);
			v.naoExisteOuErro(verificarEmailDeUsuario, n.emailJaCadastrado);
		} catch (erro) {
			return erro;
		}
	};

	const verificarDadosDeEntrada = (usuario) => {
		try {
			v.existeOuErro(usuario.nome, n.nomeNaoInformado);
			v.existeOuErro(usuario.email, n.emailNaoInformado);
			v.existeOuErro(usuario.usuario, n.usuarioNaoInformado);
			v.existeOuErro(usuario.senha, n.senhaNaoInformada);
			v.existeOuErro(usuario.confirmacaoSenha, n.confirmacaoInvalida);
			v.igualOuErro(
				usuario.senha,
				usuario.confirmacaoSenha,
				n.senhasNaoConferem
			);
		} catch (erro) {
			throw erro;
		}
	};

	const atualizar = async (req, res) => {
		try {
			v.numeroOuErro(req.params.id, n.idInvalido);
			const usuario = { ...req.body };
			usuario.id = req.params.id;

			v.existeOuErro(usuario.nome, n.nomeNaoInformado);
			v.existeOuErro(usuario.email, n.emailNaoInformado);
			v.existeOuErro(usuario.usuario, n.usuarioNaoInformado);

			const verificarEmailDeUsuario = await app
				.db(tabela.usuarios)
				.where({ email: usuario.email })
				.whereNot({ id: usuario.id })
				.whereNull(coluna.removidoEm)
				.first();
			if (verificarEmailDeUsuario) {
				if (usuario.email === verificarEmailDeUsuario.email) {
					v.naoExisteOuErro(
						verificarEmailDeUsuario,
						n.emailJaCadastrado
					);
				}
			}

			const verificarUsuarioDeUsuario = await app
				.db(tabela.usuarios)
				.where({ usuario: usuario.usuario })
				.whereNot({ id: usuario.id })
				.whereNull(coluna.removidoEm)
				.first();

			if (verificarUsuarioDeUsuario) {
				if (usuario.usuario === verificarUsuarioDeUsuario.usuario) {
					v.naoExisteOuErro(
						verificarUsuarioDeUsuario,
						n.usuarioJaCadastrado
					);
				}
			}

			if (usuario.senha) {
				v.existeOuErro(usuario.confirmacaoSenha, n.confirmacaoInvalida);
				v.igualOuErro(
					usuario.senha,
					usuario.confirmacaoSenha,
					n.senhasNaoConferem
				);
				usuario.senha = criptografarSenha(usuario.senha);
				delete usuario.confirmacaoSenha;
			}

			if (usuario.token) {
				delete usuario.token, delete usuario.iat, delete usuario.exp;
				if (!usuario.senha) {
					delete usuario.senha, delete usuario.confirmacaoSenha;
				}
			}

			usuario.alteradoEm = new Date();
			app.db(tabela.usuarios)
				.update(usuario)
				.where({ id: usuario.id })
				.then((_) => res.status(204).send())
				.catch((erro) => res.status(500).send(erro));
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const remover = async (req, res) => {
		try {
			v.numeroOuErro(req.params.id, n.idInvalido);
			const deletadas = await app
				.db(tabela.usuarios)
				.update({ removidoEm: new Date() })
				.where({ id: req.params.id })
				.whereNull(coluna.removidoEm);

			v.existeOuErro(deletadas, n.usuarioNaoEncontrado);

			res.status(204).send();
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const obter = (req, res) => {
		app.db(tabela.usuarios)
			.select(
				coluna.id,
				coluna.nome,
				coluna.email,
				coluna.usuario,
				coluna.admin
			)
			.whereNull(coluna.removidoEm)
			.then((usuarios) => res.json(usuarios))
			.catch((erro) => res.status(500).send(erro));
	};

	const obterPorId = (req, res) => {
		try {
			v.numeroOuErro(req.params.id, n.idInvalido);

			app.db(tabela.usuarios)
				.select(
					coluna.id,
					coluna.nome,
					coluna.email,
					coluna.usuario,
					coluna.admin
				)
				.where({ id: req.params.id })
				.whereNull(coluna.removidoEm)
				.first()
				.then((usuario) => res.json(usuario))
				.catch((erro) => res.status(500).send(erro));
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	return { incluir, atualizar, remover, obter, obterPorId };
};
