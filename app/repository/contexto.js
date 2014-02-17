var xml = require('./../infra/xml'),
    xmlParser = require('xml2js');

var contexto = (function () {

    var instancia;

    function init() {

        var dados = {
            paginas: [
                {
                    pagina: {
                        id: 1,
                        descricao: "Home",
                        titulo: "Bem-vindo!",
                        subtitulo: "Responsabilidade, compromisso e qualidade são o nosso lema"
                    }
                },
                {
                    pagina: {
                        id: 2,
                        descricao: "Estúdio",
                        titulo: "Bem-Vindo!",
                        texto: {
                            paragrafos: [
                                {
                                    paragrafo: {
                                        id: 1,
                                        descricao: 'O estúdio som do mar foi criado com o objetivo de realizar trabalhos sonoros para o cliente de uma forma individualizada, obedecendo as peculiaridades artísticas de cada trabalho. Especializamo-nos em gravações de ótima qualidade, o que implica em know-how e equipamentos necessários, pelo absoluto prazer em trabalhar com música. Marque seu horário no Estúdio Som do Mar e saia por ai fazendo sucesso. Sentimo-nos orgulhosos de participar de seus sonhos.'
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    pagina: {
                        id: 3,
                        descricao: "Portfólio - Jingles",
                        texto: {
                            paragrafos: [
                                {
                                    paragrafo: {
                                        id: 1,
                                        descricao: 'O Som do Mar produz para os mais variados ramos da publicidade, desde rádio e TV até campanhas políticas e publicitárias.'
                                    },
                                    paragrafo: {
                                        id: 2,
                                        descricao: 'Ouça ao lado alguns trabalhos que produzimos.'
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    pagina: {
                        id: 4,
                        descricao: "Portfólio - Pessoal",
                        texto: {
                            paragrafos: [
                                {
                                    paragrafo: {
                                        id: 1,
                                        descricao: 'Anfrisio, Diretor e proprietário do Estudio Som do Mar é músico com uma grande história em eventos musicais no Ceará e com trabalhos feitos pelo Brasil à fora.'
                                    },
                                    paragrafo: {
                                        id: 2,
                                        descricao: 'Profissional com larga experiência em música, Formado em Licenciatura em Música, sua vida inteira foi dedicar-se à música, fazendo disso sua principal função na vida. É Multi-instrumentista e dono de grande habilidade com os instrumentos.'
                                    },
                                    paragrafo: {
                                        id: 3,
                                        descricao: 'Anfrisio é arranjador, compositor, produtor e diretor de seu próprio estúdio em Fortaleza, a Cidade Bela de todos nós.'
                                    }
                                }
                            ]
                        }
                    }
                }
            ],
            usuario: {
                id: 1,
                email: 'anfrisiorocha@hotmail.com',
                nome: 'Anfrísio',
                sobrenome: 'Rocha',
                senha: 'b8697f01954168599e814940515ba00972699bd62dcdd5756214c10dba9c84d1',
                arquivoImagemPerfil: 'nova_logo_198x198.jpg',
                telefones: [
                    {
                        telefone: {
                            numero: '(85) 8883.6480',
                            tipo: 'oi'
                        }
                    }
                ],
                redesSociais: [
                    {
                        redeSocial: {
                            link: 'www.facebook.com/profile.php?id=1012718819&ref=ts',
                            tipo: 'facebook'
                        }
                    }
                ]
            },
            artistas: [
                {
                    artista: {
                        id: 1,
                        nome: 'Priscila Ribeiro',
                        site: 'www.priscilaribeiro.com.br',
                        email: 'priscilabribeiro@hotmail.com',
                        telefones: [
                            {
                                telefone: {
                                    numero: '(85) 8883.6480',
                                    tipo: 'oi'
                                }
                            }
                        ],
                        redesSociais: [
                            {
                                redeSocial: {
                                    link: 'www.facebook.com/profile.php?id=1012718819&ref=ts',
                                    tipo: 'facebook'
                                }
                            }
                        ],
                        imagens: {
                            perfil: 'artistas_priscila_ribeiro.jpg',
                            background: {
                                cor: '#ffffff',
                                imagem: 'priscila_ribeiro_background.jpg'
                            }
                        },
                        musicas: [
                            {
                                musica: {
                                    nome: 'Saudade',
                                    arquivoMusica: 'saudade.mp3',
                                    arquivoCapaAlbum: 'o_amor_e_suas_cancoes.jpg'
                                }
                            },
                            {
                                musica: {
                                    nome: 'Ah, o amor',
                                    arquivoMusica: 'ah_o_amor.mp3',
                                    arquivoCapaAlbum: 'ensaio_sobre_a_dor.jpg'
                                }
                            }
                        ]
                    }
                },
                {
                    artista: {
                        id: 2,
                        nome: 'Flavinho Souza',
                        email: 'flavioiconio@hotmail.com',
                        telefones: [
                            {
                                telefone: {
                                    numero: '(85) 8883.6480',
                                    tipo: 'oi'
                                }
                            }
                        ],
                        redesSociais: [
                            {
                                redeSocial: {
                                    link: 'www.facebook.com/profile.php?id=1012718819&ref=ts',
                                    tipo: 'facebook'
                                }
                            }
                        ],
                        imagens: {
                            perfil: 'imagem.jpg',
                            background: {
                                cor: '#ffffff',
                                imagem: 'imagem.jpg'
                            }
                        },
                        musicas: [
                            {
                                musica: {
                                    nome: 'Caminho Estreito',
                                    arquivoMusica: 'caminho estreito.mp3',
                                    arquivoCapaAlbum: 'caminho estreito.jpg'
                                }
                            }
                        ]
                    }
                }
            ],
            portfolio: [
                {
                    musica: {
                        id: 1,
                        nome: 'Restaura-me',
                        artista: 'Janaina Castro',
                        arquivoMusica: 'cd_janaina_castro-restaura-me.mp3',
                        arquivoCapaAlbum: 'janaina_castro_player.jpg',
                        secao: 'lancamento'
                    }
                },
                {
                    musica: {
                        id: 2,
                        nome: 'Demo',
                        artista: 'Daniel Costa',
                        arquivoMusica: 'cd_daniel_costa.mp3',
                        arquivoCapaAlbum: '',
                        secao: 'outro'
                    }
                },
                {
                    musica: {
                        id: 3,
                        nome: 'Restaura-me',
                        artista: 'Janaina Castro',
                        arquivoMusica: 'cd_janaina_castro-restaura-me.mp3',
                        arquivoCapaAlbum: '',
                        secao: 'jingle'
                    }
                },
                {
                    musica: {
                        id: 4,
                        nome: 'Restaura-me',
                        artista: 'Janaina Castro',
                        arquivoMusica: 'cd_janaina_castro-restaura-me.mp3',
                        arquivoCapaAlbum: 'janaina_castro_player.jpg',
                        secao: 'pessoal'
                    }
                }
            ],
            radio: {
                id: 1,
                descricao: 'Programa Tal',
                arquivoMusica: 'radio.mp3'
            },
            fotos: [
                {
                    foto: {
                        id: 1,
                        titulo: 'Aristides Cavalcante',
                        secao: 'musico',
                        imagemPequena: 'musico-aristides_cavalcante_xs.jpg',
                        imagemAmpliada: 'musico-aristides_cavalcante_b.jpg'
                    }
                },
                {
                    foto: {
                        id: 2,
                        titulo: 'Júnior Finnis',
                        secao: 'musico',
                        imagemPequena: 'musico-jr_finnis_xs.jpg',
                        imagemAmpliada: 'musico-jr_finnis_b.jpg'
                    }
                },
                {
                    foto: {
                        id: 3,
                        titulo: 'Ronald Melo',
                        secao: 'musico',
                        imagemPequena: 'musico-ronald_melo_xs.jpg',
                        imagemAmpliada: 'musico-ronald_melo_b.jpg'
                    }
                },
                {
                    foto: {
                        id: 4,
                        titulo: 'Rodrigo Cardozo',
                        secao: 'musico',
                        imagemPequena: 'musico-rodrigo_cardozo_xs.jpg',
                        imagemAmpliada: 'musico-rodrigo_cardozo_b.jpg'
                    }
                },
                {
                    foto: {
                        id: 5,
                        titulo: 'Backing Vocal - Thiago, Suelen e Daniel',
                        secao: 'musico',
                        imagemPequena: 'musico-thisudan_xs.jpg',
                        imagemAmpliada: 'musico-thisudan_b.jpg'
                    }
                },
                {
                    foto: {
                        id: 6,
                        titulo: 'Aquário',
                        secao: 'estudio',
                        imagemPequena: 'aquario-1_xs.jpg',
                        imagemAmpliada: 'aquario-1_b.jpg'
                    }
                },
                {
                    foto: {
                        id: 7,
                        titulo: 'Aquário',
                        secao: 'estudio',
                        imagemPequena: 'aquario-2_xs.jpg',
                        imagemAmpliada: 'aquario-2_b.jpg'
                    }
                },
                {
                    foto: {
                        id: 8,
                        titulo: 'Bateria',
                        secao: 'estudio',
                        imagemPequena: 'bateria-1_xs.jpg',
                        imagemAmpliada: 'bateria-1_b.jpg'
                    }
                },
                {
                    foto: {
                        id: 9,
                        titulo: 'Bateria',
                        secao: 'estudio',
                        imagemPequena: 'bateria-3_xs.jpg',
                        imagemAmpliada: 'bateria-3_b.jpg'
                    }
                },
                {
                    foto: {
                        id: 10,
                        titulo: 'Bateria',
                        secao: 'estudio',
                        imagemPequena: 'bateria-4_xs.jpg',
                        imagemAmpliada: 'bateria-4_b.jpg'
                    }
                },
                {
                    foto: {
                        id: 11,
                        titulo: 'Instrumentos',
                        secao: 'estudio',
                        imagemPequena: 'instrumentos-1_xs.jpg',
                        imagemAmpliada: 'instrumentos-1_b.jpg'
                    }
                },
                {
                    foto: {
                        id: 12,
                        titulo: 'Mesa',
                        secao: 'estudio',
                        imagemPequena: 'mesa-2_xs.jpg',
                        imagemAmpliada: 'mesa-2_b.jpg'
                    }
                },
                {
                    foto: {
                        id: 13,
                        titulo: 'Mesa',
                        secao: 'estudio',
                        imagemPequena: 'mesa-3_xs.jpg',
                        imagemAmpliada: 'mesa-3_b.jpg'
                    }
                },
                {
                    foto: {
                        id: 14,
                        titulo: 'Mesa',
                        secao: 'estudio',
                        imagemPequena: 'mesa-4_xs.jpg',
                        imagemAmpliada: 'mesa-4_b.jpg'
                    }
                },
                {
                    foto: {
                        id: 15,
                        titulo: 'Microfone',
                        secao: 'estudio',
                        imagemPequena: 'microfone_xs.jpg',
                        imagemAmpliada: 'microfone_b.jpg'
                    }
                },
                {
                    foto: {
                        id: 16,
                        titulo: 'Periféricos',
                        secao: 'estudio',
                        imagemPequena: 'perifericos-2_xs.jpg',
                        imagemAmpliada: 'perifericos-2_b.jpg'
                    }
                },
                {
                    foto: {
                        id: 17,
                        titulo: 'Periféricos',
                        secao: 'estudio',
                        imagemPequena: 'perifericos-3_xs.jpg',
                        imagemAmpliada: 'perifericos-3_b.jpg'
                    }
                },
                {
                    foto: {
                        id: 18,
                        titulo: 'Periféricos',
                        secao: 'estudio',
                        imagemPequena: 'perifericos-4_xs.jpg',
                        imagemAmpliada: 'perifericos-4_b.jpg'
                    }
                },
                {
                    foto: {
                        id: 19,
                        titulo: 'Recepção',
                        secao: 'estudio',
                        imagemPequena: 'recepcao_xs.jpg',
                        imagemAmpliada: 'recepcao_b.jpg'
                    }
                },
                {
                    foto: {
                        id: 20,
                        titulo: 'Teclado',
                        secao: 'estudio',
                        imagemPequena: 'teclado_xs.jpg',
                        imagemAmpliada: 'teclado_b.jpg'
                    }
                },
                {
                    foto: {
                        id: 21,
                        titulo: 'Técnica',
                        secao: 'estudio',
                        imagemPequena: 'tecnica-1_xs.jpg',
                        imagemAmpliada: 'tecnica-1_b.jpg'
                    }
                },
                {
                    foto: {
                        id: 22,
                        titulo: 'Técnica',
                        secao: 'estudio',
                        imagemPequena: 'tecnica-2_xs.jpg',
                        imagemAmpliada: 'tecnica-2_b.jpg'
                    }
                },
                {
                    foto: {
                        id: 23,
                        titulo: 'Técnica',
                        secao: 'home',
                        imagemPequena: 'tecnica-1_s.jpg',
                        imagemAmpliada: 'tecnica-1_b.jpg'
                    }
                },
                {
                    foto: {
                        id: 24,
                        titulo: 'Aquário',
                        secao: 'home',
                        imagemPequena: 'aquario-1_s.jpg',
                        imagemAmpliada: 'aquario-1_b.jpg'
                    }
                },
                {
                    foto: {
                        id: 25,
                        titulo: 'Bateria',
                        secao: 'home',
                        imagemPequena: 'bateria-4_s.jpg',
                        imagemAmpliada: 'bateria-4_b.jpg'
                    }
                },
                {
                    foto: {
                        id: 26,
                        titulo: 'Mesa Controladora',
                        secao: 'home',
                        imagemPequena: 'mesa-4_s.jpg',
                        imagemAmpliada: 'mesa-4_b.jpg'
                    }
                },
                {
                    foto: {
                        id: 27,
                        titulo: 'Periféricos',
                        secao: 'home',
                        imagemPequena: 'perifericos-3_s.jpg',
                        imagemAmpliada: 'perifericos-3_b.jpg'
                    }
                }
            ],
            videos: [
                {
                    video: {
                        id: 1,
                        titulo: 'Flavinho Souza | Pseudo Amor',
                        //'#text': 'Flavinho Souza | Pseudo Amor',
                        url: '//www.youtube.com/embed/sX1EmPOwBsU'
                    }
                },
                {
                    video: {
                        id: 2,
                        titulo: 'Som do Mar | Anfrísio Rocha',
                        //'#text': 'Som do Mar | Anfrísio Rocha',
                        url: '//www.youtube.com/embed/u6wWBzDvZcE'
                    }
                },
                {
                    video: {
                        id: 3,
                        titulo: 'Banda Frequencia 33 || Making Of Gravação',
                        url: '//www.youtube.com/embed/J3ODdCOAY5E'
                    }
                },
                {
                    video: {
                        id: 4,
                        titulo: 'Espera | Anfrísio Rocha',
                        url: '//www.youtube.com/embed/6gUCAy6rWKU'
                    }
                },
                {
                    video: {
                        id: 5,
                        titulo: 'Sarquis Fermanian - Fast Track',
                        url: '//www.youtube.com/embed/2vPa1TT-3xY'
                    }
                },
                {
                    video: {
                        id: 6,
                        titulo: 'Estúdio Som do Mar | Institucional',
                        url: '//www.youtube.com/embed/RWOLnEuKGWA'
                    }
                }
            ],
            servicos: [
                {
                    servico: {
                        id: 1,
                        descricao: 'Gravação de CD',
                        secao: 'servico'
                    }
                },
                {
                    servico: {
                        id: 2,
                        descricao: 'PC Intel Core 2 duo 3.0 - 4gb ram - HDs 80 + 160 + 1tera (x2)',
                        secao: 'equipamento'
                    }
                }
            ]
        };

        // Criando arquivo XML com os dados

        var recriar = false;
        xml.criar(dados, recriar);

        // contexto

        var obterInstancia = function () {
            return xml.obterContexto();
        };

        // métodos úteis

        var obterNovoId = function (array) {
            var id = 0;

            for (var i = 0; i < array.length; i++) {
                array[i].id = parseInt(array[i].id);

                if (array[i].id > id) {
                    id = array[i].id;
                }
            }

            return parseInt(id) + 1;
        };

        // Páginas

        var obterTodasAsPaginas = function () {
            var contexto = xml.obterContexto();
            return contexto.paginas;
        };

        var obterPaginaPorId = function (id, contexto) {
            if (!contexto) {
                contexto = xml.obterContexto();
            }

            for (var cont in contexto.paginas) {
                if (contexto.paginas[cont].id.toString() === id) {
                    return contexto.paginas[cont];
                }
            }
        };

        var obterPaginaPorDescricao = function (descricao) {
            var contexto = xml.obterContexto();
            for (var cont in contexto.paginas) {
                if (contexto.paginas[cont].descricao === descricao) {
                    return contexto.paginas[cont];
                }
            }
        };

        var alterarPagina = function (paginaAlterada) {
            var contexto = xml.obterContexto();
            var paginaExistente = obterPaginaPorId(paginaAlterada.id, contexto);

            paginaExistente.titulo = paginaAlterada.titulo;
            paginaExistente.subtitulo = paginaAlterada.subtitulo;
            paginaExistente.texto = paginaAlterada.texto;

            xml.salvar(contexto);

            return obterPaginaPorId(paginaAlterada.id);
        };

        // Usuário

        var obterUsuario = function (idUsuario, contexto) {
            if (!contexto) {
                contexto = xml.obterContexto();
            }

            return contexto.usuario;
        };

        var obterUsuarioPorEmail = function (emailUsuario, contexto) {
            if (!contexto) {
                contexto = xml.obterContexto();
            }

            if (contexto.usuario.email === emailUsuario) {
                return contexto.usuario;
            } else {
                return undefined;
            }
        };

        var alterarUsuarioDadosPessoais = function (usuarioAlterado) {
            var contexto = xml.obterContexto();
            var usuarioExistente = obterUsuario(usuarioAlterado.id, contexto);

            usuarioExistente.nome = usuarioAlterado.nome;
            usuarioExistente.sobrenome = usuarioAlterado.sobrenome;
            usuarioExistente.email = usuarioAlterado.email;
            usuarioExistente.telefones = usuarioAlterado.telefones;
            usuarioExistente.redesSociais = usuarioAlterado.redesSociais;

            xml.salvar(contexto);

            return obterUsuario(usuarioAlterado.id);
        };

        // Portfólio

        var obterTodasAsMusicas = function () {
            var contexto = xml.obterContexto();
            return contexto.portfolio;
        };

        var obterMusicaPorId = function (id, contexto) {
            if (!contexto) {
                contexto = xml.obterContexto();
            }

            for (var cont in contexto.portfolio) {
                if (contexto.portfolio[cont].id.toString() === id) {
                    return contexto.portfolio[cont];
                }
            }
        };

        var obterMusicaPorNomeEArtista = function (nomeMusica, nomeArtista) {
            var contexto = xml.obterContexto();
            for (var cont in contexto.portfolio) {
                if (contexto.portfolio[cont].nome === nomeMusica && contexto.portfolio[cont].artista === nomeArtista) {
                    return contexto.portfolio[cont];
                }
            }
        };

        var obterMusicasPorSecao = function (secao, contexto) {
            if (!contexto) {
                contexto = xml.obterContexto();
            }

            var musicasEncontradas = undefined;

            for (var cont in contexto.portfolio) {
                if (contexto.portfolio[cont].secao === secao) {
                    if (!musicasEncontradas) {
                        musicasEncontradas = [];
                    }

                    musicasEncontradas.push(contexto.portfolio[cont]);
                }
            }

            return musicasEncontradas;
        };

        var incluirNovaMusica = function (novaMusica) {
            var contexto = xml.obterContexto();
            var novoId = obterNovoId(contexto.portfolio);
            novaMusica.id = novoId;
            contexto.portfolio.push(novaMusica);
            xml.salvar(contexto);

            return novaMusica;
        };

        var alterarPortfolio = function (musicaAlterada) {
            var contexto = xml.obterContexto();
            var musicaExistente = obterMusicaPorId(musicaAlterada.id, contexto);

            musicaExistente.nome = musicaAlterada.nome;
            musicaExistente.artista = musicaAlterada.artista;
            musicaExistente.arquivoMusica = musicaAlterada.arquivoMusica;
            musicaExistente.arquivoCapaAlbum = musicaAlterada.arquivoCapaAlbum;

            xml.salvar(contexto);

            return obterMusicaPorId(musicaAlterada.id);
        };

        var excluirMusicaPorId = function (id) {
            var contexto = xml.obterContexto();

            var musicaProcurada = undefined;

            for (var i = 0; i < contexto.portfolio.length; i++) {
                if (contexto.portfolio[i].id == id) {
                    musicaProcurada = contexto.portfolio[i];
                }
            }

            if (musicaProcurada) {
                var quantidadeDeMusicasRestantesDoMesmoTipoDaMusicaProcurada = obterMusicasPorSecao(musicaProcurada.secao).length;
                if (quantidadeDeMusicasRestantesDoMesmoTipoDaMusicaProcurada > 1) {
                    var indiceMusica = contexto.portfolio.indexOf(musicaProcurada);
                    contexto.portfolio.splice(indiceMusica, 1);
                    xml.salvar(contexto);
                } else {
                    var secao = '';

                    if (musicaProcurada.secao === 'lancamento') {
                        secao = 'Últimos Lançamentos';
                    }

                    if (musicaProcurada.secao === 'outro') {
                        secao = 'Outros Trabalhos';
                    }

                    if (musicaProcurada.secao === 'jingle') {
                        secao = 'Jingles';
                    }

                    if (musicaProcurada.secao === 'pessoal') {
                        secao = 'Pessoal';
                    }

                    throw new Error('Não é permitido excluir todos os itens da seção \'' + secao + '\'');
                }
            }

            return musicaProcurada;
        };

        // Rádio

        var obterProgramaDeRadio = function (contexto) {
            if (!contexto) {
                contexto = xml.obterContexto();
            }

            return contexto.radio;
        };

        var alterarProgramaDeRadio = function (radioAlterada) {
            var contexto = xml.obterContexto();
            var radioExistente = obterProgramaDeRadio(contexto);

            radioExistente.descricao = radioAlterada.descricao;
            radioExistente.arquivoMusica = radioAlterada.arquivoMusica;

            xml.salvar(contexto);

            return obterProgramaDeRadio();
        };

        // Artistas

        var obterTodosOsArtistas = function () {
            var contexto = xml.obterContexto();
            return contexto.artistas;
        };

        var obterArtistaPorId = function (id, contexto) {
            if (!contexto) {
                contexto = xml.obterContexto();
            }

            for (var cont in contexto.artistas) {
                if (contexto.artistas[cont].id.toString() === id) {
                    return contexto.artistas[cont];
                }
            }
        };

        var obterArtistaPorNome = function (nome) {
            var contexto = xml.obterContexto();
            var artistaEncontrado = undefined;

            for (var cont in contexto.artistas) {
                if (contexto.artistas[cont].nome === nome) {
                    artistaEncontrado = contexto.artistas[cont];
                }
            }

            return artistaEncontrado;
        };

        var incluirNovoArtista = function (novoArtista) {
            var contexto = xml.obterContexto();
            var novoId = obterNovoId(contexto.artistas);
            novoArtista.id = novoId;
            contexto.artistas.push(novoArtista);
            xml.salvar(contexto);

            return novoArtista;
        };

        var alterarDadosPessoais = function (artistaAlterado) {
            var contexto = xml.obterContexto();
            var artistaExistente = obterArtistaPorId(artistaAlterado.id, contexto);

            artistaExistente.nome = artistaAlterado.nome;
            artistaExistente.site = artistaAlterado.site;
            artistaExistente.email = artistaAlterado.email;
            artistaExistente.telefones = artistaAlterado.telefones;
            artistaExistente.redesSociais = artistaAlterado.redesSociais;

            xml.salvar(contexto);

            return obterArtistaPorId(artistaAlterado.id);
        };

        var alterarMusicas = function (idArtista, musicas) {
            var contexto = xml.obterContexto();
            var artistaExistente = obterArtistaPorId(idArtista, contexto);

            artistaExistente.musicas = musicas;

            xml.salvar(contexto);

            return obterArtistaPorId(idArtista);
        };

        var alterarNomeArquivoImagemPerfil = function (idArtista, nomeArquivoImagemPerfil) {
            var contexto = xml.obterContexto();
            var artistaExistente = obterArtistaPorId(idArtista, contexto);

            artistaExistente.imagens.perfil = nomeArquivoImagemPerfil;

            xml.salvar(contexto);

            return obterArtistaPorId(idArtista);
        };

        var alterarBackground = function (idArtista, corDeFundo, nomeArquivoImagemBackground) {
            var contexto = xml.obterContexto();
            var artistaExistente = obterArtistaPorId(idArtista, contexto);

            artistaExistente.imagens.background.cor = corDeFundo;

            if (nomeArquivoImagemBackground) {
                artistaExistente.imagens.background.imagem = nomeArquivoImagemBackground;
            }

            xml.salvar(contexto);

            return obterArtistaPorId(idArtista);
        };

        var excluirArtistaPorId = function (id) {
            var contexto = xml.obterContexto();

            var artistaProcurado = undefined;

            for (var i = 0; i < contexto.artistas.length; i++) {
                if (contexto.artistas[i].id == id) {
                    artistaProcurado = contexto.artistas[i];
                }
            }

            if (artistaProcurado) {
                if (contexto.artistas.length > 1) {
                    var indiceArtista = contexto.artistas.indexOf(artistaProcurado);
                    contexto.artistas.splice(indiceArtista, 1);
                    xml.salvar(contexto);
                } else {
                    throw new Error('Não é permitido excluir todos os artistas');
                }
            }

            return artistaProcurado;
        };

        // Fotos

        var obterTodasAsFotos = function () {
            var contexto = xml.obterContexto();
            return contexto.fotos;
        };

        var obterFotosPorSecao = function (secao) {
            var contexto = xml.obterContexto();
            var fotosEncontradas = undefined;

            for (var cont in contexto.fotos) {
                if (contexto.fotos[cont].secao === secao) {
                    if (!fotosEncontradas) {
                        fotosEncontradas = [];
                    }

                    fotosEncontradas.push(contexto.fotos[cont]);
                }
            }

            return fotosEncontradas;
        };

        var obterFotoPorId = function (id, contexto) {
            if (!contexto) {
                contexto = xml.obterContexto();
            }

            var fotoEncontrada = undefined;

            for (var cont in contexto.fotos) {
                if (contexto.fotos[cont].id === id) {
                    fotoEncontrada = contexto.fotos[cont];
                }
            }

            return fotoEncontrada;
        };

        var obterFotoPorTitulo = function (titulo) {
            var contexto = xml.obterContexto();
            var fotoEncontrada = undefined;

            for (var cont in contexto.fotos) {
                if (contexto.fotos[cont].titulo === titulo) {
                    fotoEncontrada = contexto.fotos[cont];
                }
            }

            return fotoEncontrada;
        };

        var incluirNovaFoto = function (novaFoto) {
            var contexto = xml.obterContexto();
            var novoId = obterNovoId(contexto.fotos);
            novaFoto.id = novoId;
            contexto.fotos.push(novaFoto);
            xml.salvar(contexto);

            return novaFoto;
        };

        var alterarFoto = function (fotoAlterada) {
            var contexto = xml.obterContexto();
            var fotoExistente = obterFotoPorId(fotoAlterada.id, contexto);

            fotoExistente.titulo = fotoAlterada.titulo;
            fotoExistente.imagemPequena = fotoAlterada.imagemPequena;
            fotoExistente.imagemAmpliada = fotoAlterada.imagemAmpliada;

            xml.salvar(contexto);

            return obterFotoPorId(fotoAlterada.id);
        };

        var excluirFotoPorId = function (id) {
            var contexto = xml.obterContexto();

            var fotoASerExcluida = undefined;

            for (var i = 0; i < contexto.fotos.length; i++) {
                if (contexto.fotos[i].id == id) {
                    fotoASerExcluida = contexto.fotos[i];
                }
            }

            if (fotoASerExcluida) {
                var quantidadeDeFotosRestantesDaMesmaSecaoDaFotoProcurada = obterFotosPorSecao(fotoASerExcluida.secao).length;
                if (quantidadeDeFotosRestantesDaMesmaSecaoDaFotoProcurada > 1) {
                    var indiceFoto = contexto.fotos.indexOf(fotoASerExcluida);
                    contexto.fotos.splice(indiceFoto, 1);
                    xml.salvar(contexto);
                } else {
                    var secao = '';

                    if (fotoASerExcluida.secao === 'musico') {
                        secao = 'Músico';
                    }

                    if (fotoASerExcluida.secao === 'estudio') {
                        secao = 'Estúdio';
                    }

                    if (fotoASerExcluida.secao === 'home') {
                        secao = 'Home';
                    }

                    if (fotoASerExcluida.secao === 'participacao') {
                        secao = 'Participação';
                    }

                    throw new Error('Não é permitido excluir todos os itens da seção \'' + secao + '\'');
                }
            }

            return fotoASerExcluida;
        };

        // Vídeos

        var obterTodosOsVideos = function () {
            var contexto = xml.obterContexto();
            return contexto.videos;
        };

        var obterVideoPorId = function (id) {
            var contexto = xml.obterContexto();
            var videoEncontrado = undefined;

            for (var cont in contexto.videos) {
                if (contexto.videos[cont].id.toString() === id) {
                    videoEncontrado = contexto.videos[cont];
                }
            }

            return videoEncontrado;
        };

        var obterVideoPorTitulo = function (titulo) {
            var contexto = xml.obterContexto();
            var videoEncontrado = undefined;

            for (var cont in contexto.videos) {
                if (contexto.videos[cont].titulo === titulo) {
                    videoEncontrado = contexto.videos[cont];
                }
            }

            return videoEncontrado;
        };

        var incluirNovoVideo = function (novoVideo) {
            var contexto = xml.obterContexto();
            var novoId = obterNovoId(contexto.videos);
            novoVideo.id = novoId;
            contexto.videos.push(novoVideo);
            xml.salvar(contexto);

            return novoVideo;
        };

        var excluirVideoPorId = function (id) {
            var contexto = xml.obterContexto();

            var videoProcurado = undefined;

            for (var i = 0; i < contexto.videos.length; i++) {
                if (contexto.videos[i].id == id) {
                    videoProcurado = contexto.videos[i];
                }
            }

            if (videoProcurado) {
                if (contexto.videos.length > 1) {
                    var indiceVideo = contexto.videos.indexOf(videoProcurado);
                    contexto.videos.splice(indiceVideo, 1);
                    xml.salvar(contexto);
                } else {
                    throw new Error('Não é permitido excluir todos os vídeos');
                }
            }

            return videoProcurado;
        };

        // Serviços e Equipamentos

        var obterTodosOsServicos = function () {
            var contexto = xml.obterContexto();
            return contexto.servicos;
        };

        var obterServicoPorId = function (id, contexto) {
            if (!contexto) {
                contexto = xml.obterContexto();
            }

            var servicoEncontrado = undefined;

            for (var cont in contexto.servicos) {
                if (contexto.servicos[cont].id === id) {
                    servicoEncontrado = contexto.servicos[cont];
                }
            }

            return servicoEncontrado;
        };

        var obterServicosPorSecao = function (secao) {
            var contexto = xml.obterContexto();
            var servicosEncontrados = undefined;

            for (var cont in contexto.servicos) {
                if (contexto.servicos[cont].secao === secao) {
                    if (!servicosEncontrados) {
                        servicosEncontrados = [];
                    }

                    servicosEncontrados.push(contexto.servicos[cont]);
                }
            }

            return servicosEncontrados;
        };

        var obterServicoPorDescricao = function (descricao) {
            var contexto = xml.obterContexto();
            var servicoEncontrado = undefined;

            for (var cont in contexto.servicos) {
                if (contexto.servicos[cont].descricao === descricao) {
                    servicoEncontrado = contexto.servicos[cont];
                }
            }

            return servicoEncontrado;
        };

        var incluirNovoServico = function (novoServico) {
            var contexto = xml.obterContexto();
            var novoId = obterNovoId(contexto.servicos);
            novoServico.id = novoId;
            contexto.servicos.push(novoServico);
            xml.salvar(contexto);

            return novoServico;
        };

        var alterarServico = function (servicoAlterado) {
            var contexto = xml.obterContexto();
            var servicoExistente = obterServicoPorId(servicoAlterado.id, contexto);

            servicoExistente.descricao = servicoAlterado.descricao;

            xml.salvar(contexto);

            return obterMusicaPorId(servicoAlterado.id);
        };

        var excluirServicoPorId = function (id) {
            var contexto = xml.obterContexto();

            var servicoASerExcluido = undefined;

            for (var i = 0; i < contexto.servicos.length; i++) {
                if (contexto.servicos[i].id == id) {
                    servicoASerExcluido = contexto.servicos[i];
                }
            }

            if (servicoASerExcluido) {
                var quantidadeDeServicosRestantesDaMesmaSecaoDoServicoProcurada = obterServicosPorSecao(servicoASerExcluido.secao).length;
                if (quantidadeDeServicosRestantesDaMesmaSecaoDoServicoProcurada > 1) {
                    var indiceServico = contexto.servicos.indexOf(servicoASerExcluido);
                    contexto.servicos.splice(indiceServico, 1);
                    xml.salvar(contexto);
                } else {
                    var secao = '';

                    if (servicoASerExcluido.secao === 'servico') {
                        secao = 'Serviço';
                    }

                    if (servicoASerExcluido.secao === 'equipamento') {
                        secao = 'Equipamento';
                    }

                    throw new Error('Não é permitido excluir todos os itens da seção \'' + secao + '\'');
                }
            }

            return servicoASerExcluido;
        };

        return {
            obterInstancia: obterInstancia,
            paginas: {
                obterTodas: obterTodasAsPaginas,
                obterPorId: obterPaginaPorId,
                alterar: alterarPagina,
                obterPorDescricao: obterPaginaPorDescricao
            },
            usuario: {
                obterUsuario: obterUsuario,
                obterPorEmail: obterUsuarioPorEmail,
                alterarDadosPessoais: alterarUsuarioDadosPessoais
            },
            portfolio: {
                obterTodasAsMusicas: obterTodasAsMusicas,
                obterPorId: obterMusicaPorId,
                obterPorNomeEArtista: obterMusicaPorNomeEArtista,
                obterPorSecao: obterMusicasPorSecao,
                incluir: incluirNovaMusica,
                alterar: alterarPortfolio,
                excluirPorId: excluirMusicaPorId
            },
            radio: {
                obterPrograma: obterProgramaDeRadio,
                alterar: alterarProgramaDeRadio
            },
            artistas: {
                obterTodos: obterTodosOsArtistas,
                obterPorId: obterArtistaPorId,
                obterPorNome: obterArtistaPorNome,
                incluir: incluirNovoArtista,
                alterarDadosPessoais: alterarDadosPessoais,
                alterarMusicas: alterarMusicas,
                alterarNomeArquivoImagemPerfil: alterarNomeArquivoImagemPerfil,
                alterarBackground: alterarBackground,
                excluirPorId: excluirArtistaPorId
            },
            fotos: {
                obterTodas: obterTodasAsFotos,
                obterPorId: obterFotoPorId,
                obterPorSecao: obterFotosPorSecao,
                obterPorTitulo: obterFotoPorTitulo,
                incluir: incluirNovaFoto,
                alterar: alterarFoto,
                excluirPorId: excluirFotoPorId
            },
            videos: {
                obterTodos: obterTodosOsVideos,
                obterPorId: obterVideoPorId,
                obterPorTitulo: obterVideoPorTitulo,
                incluir: incluirNovoVideo,
                excluirPorId: excluirVideoPorId
            },
            servicos: {
                obterTodos: obterTodosOsServicos,
                obterPorId: obterServicoPorId,
                obterPorDescricao: obterServicoPorDescricao,
                obterPorSecao: obterServicosPorSecao,
                incluir: incluirNovoServico,
                alterar: alterarServico,
                excluirPorId: excluirServicoPorId
            }
        };
    };

    return {
        // Get the Singleton instance if one exists
        // or create one if it doesn't
        obterInstancia: function () {
            if (!instancia) {
                instancia = init();
            }

            return instancia;
        }
    };
})();

module.exports = contexto.obterInstancia();