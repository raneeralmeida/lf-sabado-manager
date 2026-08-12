let jogadoresData = [
    { id: 1, nome: "Râneer", posicao: "linha", presente: false, foto: "fotos/raneer.jpg" },
    { id: 2, nome: "Alex Vie.", posicao: "linha", presente: false, foto: "fotos/alex_vie.jpg" },
    { id: 3, nome: "Kaique Fer.", posicao: "linha", presente: false, foto: "fotos/kaique_fer.jpg" },
    { id: 4, nome: "Eduardo Bol.", posicao: "linha", presente: false, foto: "fotos/eduardo_bol.jpg" },
    { id: 5, nome: "Michel", posicao: "goleiro", presente: false, foto: "fotos/michel.jpg" },
    { id: 6, nome: "Kaique Mar.", posicao: "linha", presente: false, foto: "fotos/kaique_mar.jpg" },
    { id: 7, nome: "Pé de Pano", posicao: "linha", presente: false, foto: "fotos/pe_de_pano.jpg" },
    { id: 8, nome: "Vitorino", posicao: "goleiro", presente: false, foto: "fotos/vitorino.jpg" },
    { id: 9, nome: "Christiano", posicao: "goleiro", presente: false, foto: "fotos/christiano.jpg" },
    { id: 10, nome: "Lucas Vas.", posicao: "linha", presente: false, foto: "fotos/lucas_vas.jpg" },
    { id: 11, nome: "Tchobba", posicao: "linha", presente: false, foto: "fotos/tchobba.jpg" },
    { id: 12, nome: "Lucas Ven.", posicao: "linha", presente: false, foto: "fotos/lucas_ven.jpg" },
    { id: 13, nome: "Solidão", posicao: "linha", presente: false, foto: "fotos/solidao.jpg" },
    { id: 14, nome: "Eliel Sch.", posicao: "linha", presente: false, foto: "fotos/eliel_sch.jpg" },
    { id: 15, nome: "Wesley", posicao: "linha", presente: false, foto: "fotos/wesley.jpg" },
    { id: 16, nome: "Jorge", posicao: "linha", presente: false, foto: "fotos/jorge.jpg" },
    { id: 17, nome: "Braz", posicao: "linha", presente: false, foto: "fotos/braz.jpg" },
    { id: 18, nome: "Tulio", posicao: "linha", presente: false, foto: "fotos/tulio.jpg" },
    { id: 19, nome: "Paulo", posicao: "linha", presente: false, foto: "fotos/paulo.jpg" },
    { id: 20, nome: "Teta", posicao: "linha", presente: false, foto: "fotos/teta.jpg" },
    { id: 21, nome: "Daniel Par.", posicao: "linha", presente: false, foto: "fotos/daniel_par.jpg" },
    { id: 22, nome: "Felipe Teo.", posicao: "linha", presente: false, foto: "fotos/felipe_teo.jpg" },
    { id: 23, nome: "Anderson Ant.", posicao: "linha", presente: false, foto: "fotos/anderson_ant.jpg" },
    { id: 24, nome: "Caio Doidin", posicao: "linha", presente: false, foto: "fotos/caio_doidin.jpg" },
    { id: 25, nome: "Daniel Con.", posicao: "linha", presente: false, foto: "fotos/daniel_con.jpg" },
    { id: 26, nome: "Eduardo Fer.", posicao: "linha", presente: false, foto: "fotos/eduardo_fer.jpg" },
    { id: 27, nome: "Eduardo Bor.", posicao: "linha", presente: false, foto: "fotos/eduardo_bor.jpg" },
    { id: 28, nome: "Felipe Fre.", posicao: "linha", presente: false, foto: "fotos/felipe_fre.jpg" },
    { id: 29, nome: "Felipe Sha.", posicao: "linha", presente: false, foto: "fotos/felipe_sha.jpg" },
    { id: 30, nome: "Gabriel Nag.", posicao: "linha", presente: false, foto: "fotos/gabriel_nag.jpg" },
    { id: 31, nome: "Guilherme Fra.", posicao: "linha", presente: false, foto: "fotos/guilherme_fra.jpg" },
    { id: 32, nome: "Guilherme Pir.", posicao: "linha", presente: false, foto: "fotos/guilherme_pir.jpg" },
    { id: 33, nome: "Mike", posicao: "linha", presente: false, foto: "fotos/mike.jpg" },
    { id: 34, nome: "Wilker Pim", posicao: "linha", presente: false, foto: "fotos/wilker_pim.jpg" },
    { id: 35, nome: "Willian", posicao: "linha", presente: false, foto: "fotos/willian.jpg" },
    { id: 36, nome: "Zaqueu", posicao: "linha", presente: false, foto: "fotos/zaqueu.jpg" }
];

let timesSorteadosGlobal = [];
let timeSelecionadoParaGol = '';

const TEMPO_TOTAL = 420; 
let tempoRestante = TEMPO_TOTAL;
let cronometroRodando = false;
let intervaloCronometro;

let placar = { A: 0, B: 0 };
let historicoGolsPartida = { A: [], B: [] };

// --- CONTROLE DE TELA (WAKE LOCK) ---
let wakeLock = null;

async function manterTelaAtiva() {
    if ('wakeLock' in navigator) {
        try {
            wakeLock = await navigator.wakeLock.request('screen');
        } catch (err) {
            console.log('Wake Lock erro:', err);
        }
    }
}

function liberarTela() {
    if (wakeLock !== null) {
        wakeLock.release().then(() => wakeLock = null);
    }
}

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        salvarBackup();
    } else if (document.visibilityState === 'visible' && cronometroRodando) {
        manterTelaAtiva();
    }
});

function getAvatarUrl(nome) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=334155&color=fff&bold=true`;
}

function salvarBackup() {
    const backup = {
        jogadoresData,
        timesSorteadosGlobal,
        tempoRestante,
        placar,
        historicoGolsPartida
    };
    localStorage.setItem('backupPelada', JSON.stringify(backup));
}

function init() {
    verificarLimpezaMeiaNoite();
    
    const backup = localStorage.getItem('backupPelada');
    if (backup) {
        const dados = JSON.parse(backup);
        jogadoresData = dados.jogadoresData || jogadoresData;
        timesSorteadosGlobal = dados.timesSorteadosGlobal || [];
        tempoRestante = dados.tempoRestante !== undefined ? dados.tempoRestante : TEMPO_TOTAL;
        placar = dados.placar || { A: 0, B: 0 };
        historicoGolsPartida = dados.historicoGolsPartida || { A: [], B: [] };
        
        if (timesSorteadosGlobal.length > 0) {
            document.getElementById('btn-sortear').classList.add('hidden');
            document.getElementById('lista-jogadores-section').classList.add('hidden');
            document.getElementById('resultado-section').classList.remove('hidden');
            renderTimes(timesSorteadosGlobal);
        }
        
        document.getElementById('placar-a').innerText = placar['A'];
        document.getElementById('placar-b').innerText = placar['B'];
        
        cronometroRodando = false; 
        document.getElementById('btn-cronometro').innerHTML = '<i class="fa-solid fa-play mr-2"></i> Retomar';
        document.getElementById('btn-cronometro').className = 'flex-1 bg-amber-500 text-slate-900 py-2.5 rounded-xl font-bold text-base active:scale-95 transition-all';
        if(tempoRestante === TEMPO_TOTAL) {
            document.getElementById('btn-cronometro').innerHTML = '<i class="fa-solid fa-play mr-2"></i> Iniciar';
            document.getElementById('btn-cronometro').className = 'flex-1 bg-emerald-500 text-slate-900 py-2.5 rounded-xl font-bold text-base active:scale-95 transition-all';
        }
    }

    document.getElementById('total-jogadores').innerText = jogadoresData.length;
    renderLista();
    atualizarContador();
    atualizarDisplayCronometro();
    renderArtilharia();
}

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); 
    deferredPrompt = e;
    setTimeout(() => {
        document.getElementById('install-banner').classList.remove('hidden');
    }, 3000);
});

document.getElementById('btn-install').addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('Usuário aceitou a instalação do PWA');
        }
        deferredPrompt = null;
        fecharBannerInstall();
    }
});

function fecharBannerInstall() {
    document.getElementById('install-banner').classList.add('hidden');
}

window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if (splash) {
            splash.style.opacity = '0';
            setTimeout(() => {
                splash.remove();
                document.body.classList.remove('overflow-hidden');
            }, 500); 
        }
    }, 2500); 
});

function verificarLimpezaMeiaNoite() {
    const dataSalva = localStorage.getItem('dataPelada');
    const dataHoje = new Date().toDateString(); 
    
    if (dataSalva !== dataHoje) {
        localStorage.removeItem('artilhariaPelada');
        localStorage.removeItem('backupPelada'); 
        localStorage.setItem('dataPelada', dataHoje);
    }
}

function mudarAba(aba) {
    document.getElementById('tab-sorteio').classList.add('hidden');
    document.getElementById('tab-partida').classList.add('hidden');
    document.getElementById('tab-artilharia').classList.add('hidden');
    
    document.querySelectorAll('nav button').forEach(btn => {
        btn.classList.remove('text-emerald-500', 'font-bold');
        btn.classList.add('text-slate-500', 'font-medium');
    });

    document.getElementById(`tab-${aba}`).classList.remove('hidden');
    document.getElementById(`nav-${aba}`).classList.remove('text-slate-500', 'font-medium');
    document.getElementById(`nav-${aba}`).classList.add('text-emerald-500', 'font-bold');

    if (aba === 'artilharia') renderArtilharia();
}

function renderLista() {
    jogadoresData.sort((a, b) => a.nome.localeCompare(b.nome));
    const container = document.getElementById('lista-jogadores');
    container.innerHTML = '';

    jogadoresData.forEach(jogador => {
        const card = document.createElement('div');
        card.className = `player-card flex items-center p-3 rounded-xl border-2 cursor-pointer bg-slate-800 ${jogador.presente ? 'selected' : 'border-transparent'}`;
        card.onclick = () => togglePresenca(jogador.id);
        
        const badgeColor = jogador.posicao === 'goleiro' ? 'bg-amber-500 text-amber-950' : 'bg-slate-600 text-slate-200';
        const badgeText = jogador.posicao === 'goleiro' ? 'Goleiro' : 'Linha';

        card.innerHTML = `
            <img src="${jogador.foto}" onerror="this.onerror=null; this.src=getAvatarUrl('${jogador.nome}')" alt="${jogador.nome}" class="w-10 h-10 object-cover rounded-full mr-3 border-2 border-slate-700 bg-slate-700">
            <div class="flex flex-col flex-1">
                <span class="font-bold text-sm leading-tight">${jogador.nome}</span>
                <span class="position-badge font-bold px-1.5 py-0.5 rounded mt-0.5 w-max ${badgeColor}">${badgeText}</span>
            </div>
            <div class="ml-2">
                <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center ${jogador.presente ? 'border-emerald-500 bg-emerald-500' : 'border-slate-500'}">
                    ${jogador.presente ? '<i class="fa-solid fa-check text-slate-900 text-xs"></i>' : ''}
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function togglePresenca(id) {
    const jogador = jogadoresData.find(j => j.id === id);
    if (jogador) {
        const estavaPresente = jogador.presente;
        jogador.presente = !jogador.presente;
        
        if (timesSorteadosGlobal.length > 0) {
            if (!estavaPresente && jogador.presente) {
                alocarJogadorAtrasado(jogador);
            } else if (estavaPresente && !jogador.presente) {
                removerJogadorSorteado(jogador.id);
            }
        }

        renderLista();
        atualizarContador();
        salvarBackup();
    }
}

function selecionarTodos() {
    const todosPresentes = jogadoresData.every(j => j.presente);
    jogadoresData.forEach(j => j.presente = !todosPresentes);
    
    if (timesSorteadosGlobal.length > 0) {
        alert("Atenção: O sorteio já foi feito. Alterar todos agora não reorganiza automaticamente. Use os botões de troca no painel de times.");
    }
    
    renderLista();
    atualizarContador();
    salvarBackup();
}

function atualizarContador() {
    const presentes = jogadoresData.filter(j => j.presente).length;
    document.getElementById('contador-presentes').innerText = presentes;
}

function adicionarPlayer() {
    let nomeInput = prompt("Digite o nome do jogador convidado:\n(Ou deixe em branco para ser automático)");
    if (nomeInput === null) return;

    let nomeFinal = nomeInput.trim();
    if (nomeFinal === "") {
        const qtdPlayers = jogadoresData.filter(j => j.nome.startsWith('Player')).length;
        nomeFinal = `Player ${qtdPlayers + 1}`;
    }
    
    const ehLinha = confirm(`O ${nomeFinal} é Jogador de Linha ou Goleiro?\n\n✅ Clique em [OK] se for LINHA.\n❌ Clique em [Cancelar] se for GOLEIRO.`);
    const posicaoFinal = ehLinha ? "linha" : "goleiro";
    
    const novoId = Math.max(...jogadoresData.map(j => j.id)) + 1;

    const novoJogador = {
        id: novoId,
        nome: nomeFinal,
        posicao: posicaoFinal, 
        presente: true, 
        foto: "" 
    };

    jogadoresData.push(novoJogador);

    if (timesSorteadosGlobal.length > 0) {
        alocarJogadorAtrasado(novoJogador);
    }

    document.getElementById('total-jogadores').innerText = jogadoresData.length;
    renderLista(); 
    atualizarContador();
    salvarBackup();
}

function alocarJogadorAtrasado(jogador) {
    if (timesSorteadosGlobal.length === 0) return;
    let ultimoTime = timesSorteadosGlobal[timesSorteadosGlobal.length - 1];

    if (ultimoTime.jogadores.length < 5) {
        if (!ultimoTime.jogadores.find(j => j.id === jogador.id)) {
            ultimoTime.jogadores.push(jogador);
        }
    } else {
        timesSorteadosGlobal.push({ nome: `Time`, jogadores: [jogador] });
    }
    
    renomearTimesSequencialmente();
    renderTimes(timesSorteadosGlobal);
}

function removerJogadorSorteado(id) {
    timesSorteadosGlobal.forEach(time => {
        time.jogadores = time.jogadores.filter(j => j.id !== id);
    });
    renomearTimesSequencialmente();
    renderTimes(timesSorteadosGlobal);
}

function renomearTimesSequencialmente() {
    timesSorteadosGlobal = timesSorteadosGlobal.filter(t => t.jogadores.length > 0);
    timesSorteadosGlobal.forEach((t, index) => {
        t.nome = `Time ${index + 1}`;
    });
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function iniciarSorteio() {
    const presentes = jogadoresData.filter(j => j.presente);
    if (presentes.length < 5) {
        alert("Selecione pelo menos 5 jogadores para formar um time.");
        return;
    }

    document.getElementById('btn-sortear').classList.add('hidden');
    document.getElementById('lista-jogadores-section').classList.add('hidden');
    document.getElementById('resultado-section').classList.add('hidden');
    document.getElementById('loading-sorteio').classList.remove('hidden');

    const audioSorteio = document.getElementById('audio-sorteio');
    audioSorteio.currentTime = 0;
    audioSorteio.play().catch(e => console.log("Áudio bloqueado pelo navegador."));

    let tempoDeEspera = (audioSorteio.duration && !isNaN(audioSorteio.duration)) 
        ? audioSorteio.duration * 1000 
        : 5000;

    setTimeout(() => {
        document.getElementById('loading-sorteio').classList.add('hidden');
        document.getElementById('resultado-section').classList.remove('hidden');
        document.getElementById('btn-sortear').classList.remove('hidden');
        document.getElementById('lista-jogadores-section').classList.remove('hidden');
        
        sortearImparcial(presentes);
    }, tempoDeEspera);
}

function sortearImparcial(presentes) {
    let goleiros = shuffle(shuffle(presentes.filter(j => j.posicao === 'goleiro')));
    let linhas = shuffle(shuffle(presentes.filter(j => j.posicao === 'linha')));
    
    let numTimesTotal = Math.floor(presentes.length / 5);
    let times = [];

    for (let i = 0; i < numTimesTotal; i++) {
        times.push({ nome: `Time`, jogadores: [] });
    }

    for (let i = 0; i < numTimesTotal; i++) {
        if (goleiros.length > 0) {
            times[i].jogadores.push(goleiros.pop());
        }
    }

    let restanteMisto = shuffle(shuffle(linhas.concat(goleiros)));

    for (let jogador of restanteMisto) {
        let timesDisponiveis = shuffle(times.filter(t => t.jogadores.length < 5));
        if (timesDisponiveis.length === 0) break; 
        timesDisponiveis[0].jogadores.push(jogador);
    }

    let idsAlocados = new Set(times.flatMap(t => t.jogadores.map(j => j.id)));
    let restoGeral = shuffle(presentes.filter(p => !idsAlocados.has(p.id)));

    if (restoGeral.length > 0) {
        times.push({ nome: `Time`, jogadores: restoGeral });
    }

    timesSorteadosGlobal = times;
    renomearTimesSequencialmente();
    renderTimes(timesSorteadosGlobal);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    salvarBackup();
}

function renderTimes(times) {
    const container = document.getElementById('times-container');
    container.innerHTML = '';

    times.forEach(time => {
        const timeDiv = document.createElement('div');
        timeDiv.className = `bg-slate-800 rounded-xl overflow-hidden border border-slate-700`;
        
        const header = document.createElement('div');
        header.className = `px-4 py-2 font-bold flex justify-between items-center bg-slate-700/50 text-emerald-400`;
        header.innerHTML = `
            <span>${time.nome}</span>
            <div class="flex items-center gap-3">
                <span class="text-xs font-bold px-2 py-1 bg-slate-900 rounded-lg text-slate-400">${time.jogadores.length}/5</span>
                ${time.jogadores.length < 5 ? `<button onclick="abrirModalSubSorteio(${times.indexOf(time)})" class="text-emerald-400 hover:text-emerald-300 bg-slate-700 hover:bg-slate-600 rounded px-2 py-1 text-xs transition-colors" title="Adicionar jogador à vaga"><i class="fa-solid fa-plus"></i></button>` : ''}
            </div>
        `;
        timeDiv.appendChild(header);

        const ul = document.createElement('ul');
        ul.className = 'divide-y divide-slate-700/50';
        
        time.jogadores.forEach(j => {
            const li = document.createElement('li');
            li.className = 'px-4 py-3 flex items-center justify-between gap-3';
            
            const iconePosicao = j.posicao === 'goleiro' 
                ? '<i class="fa-solid fa-hands-holding text-amber-500 w-4 text-center"></i>' 
                : '<i class="fa-solid fa-shoe-prints text-slate-500 w-4 text-center"></i>';

            li.innerHTML = `
                <div class="flex items-center gap-3 flex-1 overflow-hidden">
                    ${iconePosicao}
                    <img src="${j.foto}" onerror="this.onerror=null; this.src=getAvatarUrl('${j.nome}')" class="w-8 h-8 object-cover rounded-full border border-slate-600 bg-slate-700 shrink-0">
                    <span class="font-semibold text-slate-200 truncate">${j.nome}</span>
                </div>
                <div class="flex gap-1 shrink-0">
                    <button onclick="abrirModalSubSorteio(${times.indexOf(time)}, ${j.id})" class="text-slate-400 hover:text-emerald-400 p-2 transition-colors" title="Trocar de lugar"><i class="fa-solid fa-right-left"></i></button>
                    <button onclick="removerJogadorDoTimeSorteado(${times.indexOf(time)}, ${j.id})" class="text-slate-500 hover:text-red-400 p-2 transition-colors" title="Remover deste time"><i class="fa-solid fa-xmark"></i></button>
                </div>
            `;
            ul.appendChild(li);
        });

        timeDiv.appendChild(ul);
        container.appendChild(timeDiv);
    });
}

function desfazerSorteio() {
    if(confirm("Tem certeza que deseja apagar os times formados e voltar ao sorteio?")) {
        timesSorteadosGlobal = [];
        document.getElementById('resultado-section').classList.add('hidden');
        document.getElementById('btn-sortear').classList.remove('hidden');
        document.getElementById('lista-jogadores-section').classList.remove('hidden');
        salvarBackup();
    }
}

let modalSorteioTimeIndex = null;
let modalSorteioJogadorSaindoId = null;

function removerJogadorDoTimeSorteado(timeIndex, jogadorId) {
    if(confirm("Deseja apenas remover este jogador do time (ele ficará livre para ser adicionado em outra vaga)?")) {
        timesSorteadosGlobal[timeIndex].jogadores = timesSorteadosGlobal[timeIndex].jogadores.filter(j => j.id !== jogadorId);
        renomearTimesSequencialmente();
        renderTimes(timesSorteadosGlobal);
        salvarBackup();
    }
}

function abrirModalSubSorteio(timeIndex, jogadorSaindoId = null) {
    modalSorteioTimeIndex = timeIndex;
    modalSorteioJogadorSaindoId = jogadorSaindoId;

    const timeData = timesSorteadosGlobal[timeIndex];
    const titulo = document.getElementById('titulo-modal-sub-sorteio');

    if (jogadorSaindoId !== null) {
        const jogadorSaindo = timeData.jogadores.find(j => j.id === jogadorSaindoId);
        titulo.innerText = `Trocar ${jogadorSaindo.nome} por:`;
    } else {
        titulo.innerText = `Adicionar jogador ao ${timeData.nome}:`;
    }

    const lista = document.getElementById('modal-sub-sorteio-lista');
    lista.innerHTML = '';

    const presentes = jogadoresData.filter(j => j.presente);
    const jogadoresOutros = presentes.filter(p => !timeData.jogadores.find(j => j.id === p.id)).sort((a, b) => a.nome.localeCompare(b.nome));

    if (jogadoresOutros.length === 0) {
        lista.innerHTML = '<p class="text-slate-400 text-center p-4">Nenhum outro jogador disponível.</p>';
    } else {
        jogadoresOutros.forEach(j => {
            const btn = document.createElement('button');
            btn.className = "w-full text-left p-3 mb-2 bg-slate-700 hover:bg-emerald-500 hover:text-slate-900 rounded-lg font-bold text-white transition-colors flex items-center gap-3";
            btn.innerHTML = `
                <img src="${j.foto}" onerror="this.onerror=null; this.src=getAvatarUrl('${j.nome}')" class="w-8 h-8 object-cover rounded-full bg-slate-600">
                ${j.nome}
            `;
            btn.onclick = () => efetivarSubSorteio(j.id);
            lista.appendChild(btn);
        });
    }

    document.getElementById('modal-sub-sorteio').classList.remove('hidden');
    document.getElementById('modal-sub-sorteio').classList.add('flex');
}

function efetivarSubSorteio(jogadorEntrandoId) {
    const timeAlvo = timesSorteadosGlobal[modalSorteioTimeIndex];
    const jogadorEntrando = jogadoresData.find(j => j.id === jogadorEntrandoId);

    let timeDoEntrando = null;
    let indexNoTimeDoEntrando = -1;

    timesSorteadosGlobal.forEach(t => {
        const idx = t.jogadores.findIndex(j => j.id === jogadorEntrandoId);
        if (idx !== -1) {
            timeDoEntrando = t;
            indexNoTimeDoEntrando = idx;
        }
    });

    if (modalSorteioJogadorSaindoId !== null) {
        const indexSaindo = timeAlvo.jogadores.findIndex(j => j.id === modalSorteioJogadorSaindoId);
        const jogadorSaindo = timeAlvo.jogadores[indexSaindo];

        timeAlvo.jogadores[indexSaindo] = jogadorEntrando;

        if (timeDoEntrando !== null) {
            timeDoEntrando.jogadores[indexNoTimeDoEntrando] = jogadorSaindo;
        }
    } else {
        timeAlvo.jogadores.push(jogadorEntrando);
        if (timeDoEntrando !== null) {
            timeDoEntrando.jogadores.splice(indexNoTimeDoEntrando, 1);
        }
    }

    fecharModalSubSorteio();
    renomearTimesSequencialmente();
    renderTimes(timesSorteadosGlobal);
    salvarBackup();
}

function fecharModalSubSorteio() {
    document.getElementById('modal-sub-sorteio').classList.add('hidden');
    document.getElementById('modal-sub-sorteio').classList.remove('flex');
}

function atualizarDisplayCronometro() {
    const min = Math.floor(tempoRestante / 60).toString().padStart(2, '0');
    const sec = (tempoRestante % 60).toString().padStart(2, '0');
    document.getElementById('cronometro-display').innerText = `${min}:${sec}`;
}

function toggleCronometro() {
    const btn = document.getElementById('btn-cronometro');
    
    if (cronometroRodando) {
        clearInterval(intervaloCronometro);
        cronometroRodando = false;
        liberarTela(); 
        salvarBackup();
        
        btn.innerHTML = '<i class="fa-solid fa-play mr-2"></i> Retomar';
        btn.className = 'flex-1 bg-amber-500 text-slate-900 py-2.5 rounded-xl font-bold text-base active:scale-95 transition-all';
    } else {
        if(tempoRestante === TEMPO_TOTAL) {
            document.getElementById('audio-apito').play().catch(()=>{});
        }
        
        cronometroRodando = true;
        manterTelaAtiva(); 
        salvarBackup();
        
        btn.innerHTML = '<i class="fa-solid fa-pause mr-2"></i> Pausar';
        btn.className = 'flex-1 bg-red-500 text-white py-2.5 rounded-xl font-bold text-base active:scale-95 transition-all';
        
        intervaloCronometro = setInterval(() => {
            tempoRestante--;
            atualizarDisplayCronometro();
            
            if (tempoRestante <= 0) {
                finalizarPartidaTempo("Fim de Jogo! O tempo estourou (7 minutos).", false);
            }
        }, 1000);
    }
}

function finalizarPartidaTempo(mensagem, tocarApito = false) {
    clearInterval(intervaloCronometro);
    cronometroRodando = false;
    liberarTela(); 
    salvarBackup();
    
    if (tocarApito) {
        document.getElementById('audio-apito').play().catch(()=>{}); 
    }
    
    const btn = document.getElementById('btn-cronometro');
    btn.innerHTML = '<i class="fa-solid fa-play mr-2"></i> Iniciar';
    btn.className = 'flex-1 bg-emerald-500 text-slate-900 py-2.5 rounded-xl font-bold text-base active:scale-95 transition-all';

    setTimeout(() => {
        alert(mensagem);
    }, 300);
}

function resetarCronometro() {
    clearInterval(intervaloCronometro);
    cronometroRodando = false;
    tempoRestante = TEMPO_TOTAL;
    atualizarDisplayCronometro();
    liberarTela();
    salvarBackup();
    
    const btn = document.getElementById('btn-cronometro');
    btn.innerHTML = '<i class="fa-solid fa-play mr-2"></i> Iniciar';
    btn.className = 'flex-1 bg-emerald-500 text-slate-900 py-2.5 rounded-xl font-bold text-base active:scale-95 transition-all';
}

function encerrarPartidaSimples() {
    if(confirm("Deseja zerar o placar e preparar o cronômetro para o próximo jogo?")) {
        placar = { A: 0, B: 0 };
        historicoGolsPartida = { A: [], B: [] }; 
        document.getElementById('placar-a').innerText = '0';
        document.getElementById('placar-b').innerText = '0';
        resetarCronometro();
        salvarBackup();
    }
}

function abrirModalGol(time) {
    if (!cronometroRodando) {
        alert("Inicie ou retome o cronômetro antes de registrar um gol!");
        return;
    }
    
    if (tempoRestante <= 0) {
        alert("O tempo já esgotou! Zere o placar para iniciar um novo jogo.");
        return;
    }
    if (placar['A'] >= 2 || placar['B'] >= 2) {
        alert("A partida já atingiu o limite de gols (2)! Caso o gol tenha sido marcado errado, use a opção de remover.");
        return;
    }

    timeSelecionadoParaGol = time;
    
    const presentes = jogadoresData.filter(j => j.presente).sort((a, b) => a.nome.localeCompare(b.nome));
    renderListaJogadoresModal(presentes);

    document.getElementById('busca-jogador-gol').value = '';
    document.getElementById('modal-gol').classList.remove('hidden');
    document.getElementById('modal-gol').classList.add('flex');
    
    setTimeout(() => document.getElementById('busca-jogador-gol').focus(), 100);
}

function renderListaJogadoresModal(lista) {
    const listaModal = document.getElementById('modal-jogadores-lista');
    listaModal.innerHTML = '';

    lista.forEach(j => {
        const btn = document.createElement('button');
        btn.className = "jogador-item-modal w-full text-left p-3 bg-slate-700 hover:bg-emerald-500 hover:text-slate-900 rounded-lg font-bold text-white transition-colors flex items-center gap-3";
        btn.innerHTML = `
            <img src="${j.foto}" onerror="this.onerror=null; this.src=getAvatarUrl('${j.nome}')" class="w-8 h-8 object-cover rounded-full bg-slate-600">
            <span class="nome-jogador">${j.nome}</span>
        `;
        btn.onclick = () => registrarGol(j.id, j.nome, timeSelecionadoParaGol);
        listaModal.appendChild(btn);
    });
}

function filtrarJogadoresGol() {
    const termo = document.getElementById('busca-jogador-gol').value.toLowerCase();
    const itens = document.querySelectorAll('.jogador-item-modal');
    
    itens.forEach(item => {
        const nome = item.querySelector('.nome-jogador').innerText.toLowerCase();
        if (nome.includes(termo)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function fecharModalGol() {
    document.getElementById('modal-gol').classList.add('hidden');
    document.getElementById('modal-gol').classList.remove('flex');
}

function registrarGol(jogadorId, jogadorNome, time) {
    placar[time]++;
    historicoGolsPartida[time].push(jogadorId);
    document.getElementById(`placar-${time.toLowerCase()}`).innerText = placar[time];
    
    let artilharia = JSON.parse(localStorage.getItem('artilhariaPelada')) || {};
    
    if (artilharia[jogadorId]) {
        artilharia[jogadorId].gols++;
    } else {
        artilharia[jogadorId] = { nome: jogadorNome, gols: 1, foto: jogadoresData.find(j => j.id === jogadorId).foto };
    }
    
    localStorage.setItem('artilhariaPelada', JSON.stringify(artilharia));
    fecharModalGol();
    salvarBackup();

    if (placar[time] >= 2) {
        finalizarPartidaTempo(`Fim de Jogo! O Time ${time === 'A' ? '1' : '2'} atingiu 2 gols e venceu.`, false);
    }
}

function removerGol(time) {
    if (placar[time] > 0 && historicoGolsPartida[time].length > 0) {
        const ultimoJogadorId = historicoGolsPartida[time].pop();
        
        placar[time]--;
        document.getElementById(`placar-${time.toLowerCase()}`).innerText = placar[time];
        
        let artilharia = JSON.parse(localStorage.getItem('artilhariaPelada')) || {};
        
        if (artilharia[ultimoJogadorId] && artilharia[ultimoJogadorId].gols > 0) {
            artilharia[ultimoJogadorId].gols--;
            
            if (artilharia[ultimoJogadorId].gols === 0) {
                delete artilharia[ultimoJogadorId];
            }
            
            localStorage.setItem('artilhariaPelada', JSON.stringify(artilharia));
        }
        salvarBackup();
    } else {
        alert("Não existem gols computados nesta partida para o Time " + (time === 'A' ? '1' : '2') + ".");
    }
}

function renderArtilharia() {
    const container = document.getElementById('lista-artilheiros');
    container.innerHTML = '';
    
    let artilharia = JSON.parse(localStorage.getItem('artilhariaPelada'));
    if (!artilharia || Object.keys(artilharia).length === 0) {
        container.innerHTML = '<p class="text-center text-slate-500 py-10">Nenhum gol marcado neste sábado ainda.</p>';
        return;
    }

    let arrayArtilheiros = Object.values(artilharia).sort((a, b) => b.gols - a.gols);
    let posicoes = [...new Set(arrayArtilheiros.map(j => j.gols))];

    arrayArtilheiros.forEach((jogador) => {
        let colocacao = posicoes.indexOf(jogador.gols) + 1;
        
        let medalha = '';
        if (colocacao === 1) medalha = '<i class="fa-solid fa-medal text-yellow-500 text-xl"></i>';
        else if (colocacao === 2) medalha = '<i class="fa-solid fa-medal text-slate-300 text-xl"></i>';
        else if (colocacao === 3) medalha = '<i class="fa-solid fa-medal text-amber-600 text-xl"></i>';

        const div = document.createElement('div');
        div.className = "bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center justify-between";
        div.innerHTML = `
            <div class="flex items-center gap-4">
                <span class="font-black text-slate-500 w-4">${colocacao}º</span>
                <img src="${jogador.foto}" onerror="this.onerror=null; this.src=getAvatarUrl('${jogador.nome}')" class="w-12 h-12 object-cover rounded-full border-2 border-slate-600 bg-slate-700">
                <span class="font-bold text-white text-lg">${jogador.nome}</span>
            </div>
            <div class="flex items-center gap-3">
                ${medalha}
                <div class="bg-emerald-500 text-slate-900 font-black w-10 h-10 rounded-lg flex items-center justify-center text-xl">
                    ${jogador.gols}
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

function zerarArtilharia() {
    if(confirm("Tem certeza que deseja zerar toda a artilharia deste sábado? Isso não pode ser desfeito.")) {
        localStorage.removeItem('artilhariaPelada');
        renderArtilharia();
    }
}

function copiarParaWhatsApp() {
    if (timesSorteadosGlobal.length === 0) return;
    let texto = "⚽ *SORTEIO DOS TIMES* ⚽\n\n";
    timesSorteadosGlobal.forEach(time => {
        texto += `*${time.nome.toUpperCase()}*\n`;
        time.jogadores.forEach(j => {
            const pos = j.posicao === 'goleiro' ? '🧤' : '🏃';
            texto += `${pos} ${j.nome}\n`;
        });
        texto += "\n";
    });
    navigator.clipboard.writeText(texto.trim()).then(() => {
        alert("Escalação copiada! Agora é só colar no grupo do WhatsApp.");
    }).catch(err => {
        console.error("Erro ao copiar: ", err);
        alert("Não foi possível copiar automaticamente.");
    });
}

function copiarArtilharia() {
    let artilharia = JSON.parse(localStorage.getItem('artilhariaPelada'));
    if (!artilharia || Object.keys(artilharia).length === 0) {
        alert("Nenhum gol registrado para copiar.");
        return;
    }
    
    let arrayArtilheiros = Object.values(artilharia).sort((a, b) => b.gols - a.gols);
    let posicoes = [...new Set(arrayArtilheiros.map(j => j.gols))];

    let texto = "🏆 *ARTILHARIA DO SÁBADO* 🏆\n\n";
    
    arrayArtilheiros.forEach((jogador) => {
        let colocacao = posicoes.indexOf(jogador.gols) + 1;
        let medalhaEmoji = '';
        
        if (colocacao === 1) medalhaEmoji = '🥇';
        else if (colocacao === 2) medalhaEmoji = '🥈';
        else if (colocacao === 3) medalhaEmoji = '🥉';
        else medalhaEmoji = '⚽';

        texto += `${medalhaEmoji} ${jogador.nome} - ${jogador.gols} gol(s)\n`;
    });

    navigator.clipboard.writeText(texto.trim()).then(() => {
        alert("Artilharia copiada! Agora é só colar no grupo do WhatsApp.");
    }).catch(err => {
        console.error("Erro ao copiar: ", err);
        alert("Não foi possível copiar automaticamente.");
    });
}

init();