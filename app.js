const jogadoresData = [
    { id: 1, nome: "Râneer", posicao: "linha", nivel: 3, presente: false, foto: "fotos/raneer.jpg" },
    { id: 2, nome: "Alex Vie.", posicao: "linha", nivel: 3, presente: false, foto: "fotos/alex_vie.jpg" },
    { id: 3, nome: "Kaique Fer.", posicao: "linha", nivel: 3, presente: false, foto: "fotos/kaique_fer.jpg" },
    { id: 4, nome: "Eduardo Bol.", posicao: "linha", nivel: 4, presente: false, foto: "fotos/eduardo_bol.jpg" },
    { id: 5, nome: "Michel", posicao: "goleiro", nivel: 0, presente: false, foto: "fotos/michel.jpg" },
    { id: 6, nome: "Kaique Mar.", posicao: "linha", nivel: 2, presente: false, foto: "fotos/kaique_mar.jpg" },
    { id: 7, nome: "Pé de Pano", posicao: "linha", nivel: 3, presente: false, foto: "fotos/pe_de_pano.jpg" },
    { id: 8, nome: "Vitorino", posicao: "goleiro", nivel: 0, presente: false, foto: "fotos/vitorino.jpg" },
    { id: 9, nome: "Christiano", posicao: "goleiro", nivel: 0, presente: false, foto: "fotos/christiano.jpg" },
    { id: 10, nome: "Lucas Vas.", posicao: "linha", nivel: 3, presente: false, foto: "fotos/lucas_vas.jpg" },
    { id: 11, nome: "Tchobba", posicao: "linha", nivel: 3, presente: false, foto: "fotos/tchobba.jpg" },
    { id: 12, nome: "Lucas Ven.", posicao: "linha", nivel: 3, presente: false, foto: "fotos/lucas_ven.jpg" },
    { id: 13, nome: "Solidão", posicao: "linha", nivel: 4, presente: false, foto: "fotos/solidao.jpg" },
    { id: 14, nome: "Eliel Sch.", posicao: "linha", nivel: 3, presente: false, foto: "fotos/eliel_sch.jpg" },
    { id: 15, nome: "Wesley", posicao: "linha", nivel: 4, presente: false, foto: "fotos/wesley.jpg" },
    { id: 16, nome: "Jorge", posicao: "linha", nivel: 3, presente: false, foto: "fotos/jorge.jpg" },
    { id: 17, nome: "Braz", posicao: "linha", nivel: 2, presente: false, foto: "fotos/braz.jpg" },
    { id: 18, nome: "Tulio", posicao: "linha", nivel: 2, presente: false, foto: "fotos/tulio.jpg" },
    { id: 19, nome: "Paulo", posicao: "linha", nivel: 3, presente: false, foto: "fotos/paulo.jpg" },
    { id: 20, nome: "Teta", posicao: "linha", nivel: 3, presente: false, foto: "fotos/teta.jpg" },
    { id: 21, nome: "Daniel Par.", posicao: "linha", nivel: 4, presente: false, foto: "fotos/daniel_par.jpg" },
    { id: 22, nome: "Felipe Teo.", posicao: "linha", nivel: 2, presente: false, foto: "fotos/felipe_teo.jpg" },
    { id: 23, nome: "Anderson Ant.", posicao: "linha", nivel: 4, presente: false, foto: "fotos/anderson_ant.jpg" },
    { id: 24, nome: "Caio Doidin", posicao: "linha", nivel: 3, presente: false, foto: "fotos/caio_doidin.jpg" },
    { id: 25, nome: "Daniel Con.", posicao: "linha", nivel: 3, presente: false, foto: "fotos/daniel_con.jpg" },
    { id: 26, nome: "Eduardo Fer.", posicao: "linha", nivel: 4, presente: false, foto: "fotos/eduardo_fer.jpg" },
    { id: 27, nome: "Eduardo Bor.", posicao: "linha", nivel: 2, presente: false, foto: "fotos/eduardo_bor.jpg" },
    { id: 28, nome: "Felipe Fre.", posicao: "linha", nivel: 3, presente: false, foto: "fotos/felipe_fre.jpg" },
    { id: 29, nome: "Felipe Sha.", posicao: "linha", nivel: 3, presente: false, foto: "fotos/felipe_sha.jpg" },
    { id: 30, nome: "Gabriel Nag.", posicao: "linha", nivel: 3, presente: false, foto: "fotos/gabriel_nag.jpg" },
    { id: 31, nome: "Guilherme Fra.", posicao: "linha", nivel: 4, presente: false, foto: "fotos/guilherme_fra.jpg" },
    { id: 32, nome: "Guilherme Pir.", posicao: "linha", nivel: 3, presente: false, foto: "fotos/guilherme_pir.jpg" },
    { id: 33, nome: "Mike", posicao: "linha", nivel: 4, presente: false, foto: "fotos/mike.jpg" },
    { id: 34, nome: "Wilker Pim", posicao: "linha", nivel: 4, presente: false, foto: "fotos/wilker_pim.jpg" },
    { id: 35, nome: "Willian", posicao: "linha", nivel: 4, presente: false, foto: "fotos/willian.jpg" },
    { id: 36, nome: "Zaqueu", posicao: "linha", nivel: 3, presente: false, foto: "fotos/zaqueu.jpg" }
];

let timesSorteadosGlobal = [];
let timeSelecionadoParaGol = '';

// Vantagem de Quadra
let isPrimeiraPartida = true;
let idReiDaQuadra = null;

let timeSubIndex = null;
let jogadorSaindo = null;

const TEMPO_TOTAL = 420; 
let tempoRestante = TEMPO_TOTAL;
let cronometroRodando = false;
let intervaloCronometro;

let placar = { A: 0, B: 0 };
let historicoGolsPartida = { A: [], B: [] };

function getAvatarUrl(nome) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=334155&color=fff&bold=true`;
}

function init() {
    verificarLimpezaMeiaNoite();
    document.getElementById('total-jogadores').innerText = jogadoresData.length;
    renderLista();
    atualizarContador();
    atualizarDisplayCronometro();
    renderArtilharia();
}

function verificarLimpezaMeiaNoite() {
    const dataSalva = localStorage.getItem('dataPelada');
    const dataHoje = new Date().toDateString(); 
    
    if (dataSalva !== dataHoje) {
        localStorage.removeItem('artilhariaPelada');
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
    if (aba === 'partida' && timesSorteadosGlobal.length > 0) renderPartidaSelects();
}

function renderLista() {
    // Ordena a lista em ordem alfabética de A a Z
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
        jogador.presente = !jogador.presente;
        renderLista();
        atualizarContador();
    }
}

function selecionarTodos() {
    const todosPresentes = jogadoresData.every(j => j.presente);
    jogadoresData.forEach(j => j.presente = !todosPresentes);
    renderLista();
    atualizarContador();
}

function atualizarContador() {
    const presentes = jogadoresData.filter(j => j.presente).length;
    document.getElementById('contador-presentes').innerText = presentes;
}

// --- ADIÇÃO AUTOMÁTICA DE PLAYERS COM NOME ---
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
    const nivelFinal = ehLinha ? 3 : 0; 
    
    const novoId = Math.max(...jogadoresData.map(j => j.id)) + 1;

    jogadoresData.push({
        id: novoId,
        nome: nomeFinal,
        posicao: posicaoFinal, 
        nivel: nivelFinal, 
        presente: true, 
        foto: "" 
    });

    document.getElementById('total-jogadores').innerText = jogadoresData.length;
    renderLista(); 
    atualizarContador();
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
    
    audioSorteio.play().catch(e => console.log("Áudio de sorteio bloqueado pelo navegador."));

    let tempoDeEspera = (audioSorteio.duration && !isNaN(audioSorteio.duration)) 
        ? audioSorteio.duration * 1000 
        : 5000;

    setTimeout(() => {
        document.getElementById('loading-sorteio').classList.add('hidden');
        document.getElementById('resultado-section').classList.remove('hidden');
        document.getElementById('btn-sortear').classList.remove('hidden');
        document.getElementById('lista-jogadores-section').classList.remove('hidden');
        
        sortearEquilibrado(presentes);
    }, tempoDeEspera);
}

function sortearEquilibrado(presentes) {
    isPrimeiraPartida = true;
    idReiDaQuadra = null;
    
    let goleiros = shuffle(presentes.filter(j => j.posicao === 'goleiro'));
    
    let linhas = presentes.filter(j => j.posicao === 'linha');
    linhas = shuffle(linhas);
    linhas.sort((a, b) => b.nivel - a.nivel);
    
    let numTimesTotal = Math.floor(presentes.length / 5);
    let times = [];

    for (let i = 0; i < numTimesTotal; i++) {
        times.push({ nome: `Time ${i + 1}`, jogadores: [], somaNivel: 0 });
    }

    for (let i = 0; i < numTimesTotal; i++) {
        if (goleiros.length > 0) {
            let g = goleiros.pop();
            times[i].jogadores.push(g);
        }
    }

    if (goleiros.length > 0) {
        linhas = linhas.concat(goleiros);
    }

    for (let jogador of linhas) {
        let timesDisponiveis = times.filter(t => t.jogadores.length < 5);
        if (timesDisponiveis.length === 0) break; 
        
        timesDisponiveis = shuffle(timesDisponiveis);
        timesDisponiveis.sort((a, b) => a.somaNivel - b.somaNivel);
        
        let timeEscolhido = timesDisponiveis[0];
        timeEscolhido.jogadores.push(jogador);
        timeEscolhido.somaNivel += (jogador.nivel || 0); 
    }

    let idsAlocados = new Set(times.flatMap(t => t.jogadores.map(j => j.id)));
    let restoGeral = presentes.filter(p => !idsAlocados.has(p.id));

    if (restoGeral.length > 0) {
        restoGeral = shuffle(restoGeral);
        times.push({ nome: `Próximo Time`, jogadores: restoGeral, isResto: true });
    }

    timesSorteadosGlobal = times;
    
    document.getElementById('select-time-a').value = '';
    document.getElementById('select-time-b').value = '';
    
    renderTimes(times);
    renderPartidaSelects();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderTimes(times) {
    const container = document.getElementById('times-container');
    container.innerHTML = '';

    times.forEach(time => {
        const timeDiv = document.createElement('div');
        const isProximo = time.isResto;
        timeDiv.className = `bg-slate-800 rounded-xl overflow-hidden border ${isProximo ? 'border-amber-500/50' : 'border-slate-700'}`;
        
        const header = document.createElement('div');
        header.className = `px-4 py-2 font-bold flex justify-between items-center ${isProximo ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-700/50 text-emerald-400'}`;
        header.innerHTML = `
            <span>${time.nome}</span>
            <span class="text-xs px-2 py-1 bg-slate-900 rounded-lg text-slate-400">${time.jogadores.length} jogadores</span>
        `;
        timeDiv.appendChild(header);

        const ul = document.createElement('ul');
        ul.className = 'divide-y divide-slate-700/50';
        
        time.jogadores.forEach(j => {
            const li = document.createElement('li');
            li.className = 'px-4 py-3 flex items-center gap-3';
            
            const iconePosicao = j.posicao === 'goleiro' 
                ? '<i class="fa-solid fa-hands-holding text-amber-500 w-4 text-center"></i>' 
                : '<i class="fa-solid fa-shoe-prints text-slate-500 w-4 text-center"></i>';

            li.innerHTML = `
                ${iconePosicao}
                <img src="${j.foto}" onerror="this.onerror=null; this.src=getAvatarUrl('${j.nome}')" class="w-8 h-8 object-cover rounded-full border border-slate-600 bg-slate-700">
                <span class="font-semibold text-slate-200">${j.nome}</span>
            `;
            ul.appendChild(li);
        });

        timeDiv.appendChild(ul);
        container.appendChild(timeDiv);
    });
}

function abrirModalSubstituicao(time) {
    const selectId = time === 'A' ? 'select-time-a' : 'select-time-b';
    timeSubIndex = document.getElementById(selectId).value;
    
    if (timeSubIndex === "") {
        alert("Selecione o time primeiro para fazer alterações.");
        return;
    }

    jogadorSaindo = null;
    renderPassoSaindo();
    document.getElementById('modal-sub').classList.remove('hidden');
    document.getElementById('modal-sub').classList.add('flex');
}

function fecharModalSub() {
    document.getElementById('modal-sub').classList.add('hidden');
    document.getElementById('modal-sub').classList.remove('flex');
}

function renderPassoSaindo() {
    const timeData = timesSorteadosGlobal[timeSubIndex];
    const titulo = document.getElementById('titulo-modal-sub');
    titulo.innerText = "Quem vai SAIR?";
    titulo.className = "font-bold text-lg text-red-400";

    const lista = document.getElementById('modal-sub-lista');
    lista.innerHTML = '';

    timeData.jogadores.forEach(j => {
        const btn = document.createElement('button');
        btn.className = "w-full text-left p-3 mb-2 bg-slate-700 hover:bg-red-500 hover:text-white rounded-lg font-bold text-white transition-colors flex items-center gap-3";
        btn.innerHTML = `
            <img src="${j.foto}" onerror="this.onerror=null; this.src=getAvatarUrl('${j.nome}')" class="w-8 h-8 object-cover rounded-full bg-slate-600">
            ${j.nome}
        `;
        btn.onclick = () => {
            jogadorSaindo = j;
            renderPassoEntrando();
        };
        lista.appendChild(btn);
    });
}

function renderPassoEntrando() {
    const titulo = document.getElementById('titulo-modal-sub');
    titulo.innerText = `Quem entra na vaga de ${jogadorSaindo.nome}?`;
    titulo.className = "font-bold text-lg text-emerald-400";

    const lista = document.getElementById('modal-sub-lista');
    lista.innerHTML = '';

    const idTimeA = document.getElementById('select-time-a').value;
    const idTimeB = document.getElementById('select-time-b').value;

    let idsEmQuadra = [];
    if (idTimeA !== "") idsEmQuadra.push(...timesSorteadosGlobal[idTimeA].jogadores.map(j => j.id));
    if (idTimeB !== "") idsEmQuadra.push(...timesSorteadosGlobal[idTimeB].jogadores.map(j => j.id));

    const jogadoresFora = jogadoresData.filter(j => j.presente && !idsEmQuadra.includes(j.id));

    if (jogadoresFora.length === 0) {
        lista.innerHTML = '<p class="text-center text-slate-400 p-4">Não há jogadores de fora disponíveis para substituição.</p>';
        return;
    }

    jogadoresFora.forEach(j => {
        const btn = document.createElement('button');
        btn.className = "w-full text-left p-3 mb-2 bg-slate-700 hover:bg-emerald-500 hover:text-slate-900 rounded-lg font-bold text-white transition-colors flex items-center gap-3";
        btn.innerHTML = `
            <img src="${j.foto}" onerror="this.onerror=null; this.src=getAvatarUrl('${j.nome}')" class="w-8 h-8 object-cover rounded-full bg-slate-600">
            ${j.nome}
        `;
        btn.onclick = () => efetivarSubstituicao(j);
        lista.appendChild(btn);
    });
}

function efetivarSubstituicao(jogadorEntrando) {
    let timeDoEntrando = null;
    let indexNoTimeDoEntrando = -1;

    timesSorteadosGlobal.forEach(t => {
        const idx = t.jogadores.findIndex(j => j.id === jogadorEntrando.id);
        if (idx !== -1) {
            timeDoEntrando = t;
            indexNoTimeDoEntrando = idx;
        }
    });

    const timeData = timesSorteadosGlobal[timeSubIndex];
    const indexSaindo = timeData.jogadores.findIndex(j => j.id === jogadorSaindo.id);

    timeData.jogadores[indexSaindo] = jogadorEntrando;

    if (timeDoEntrando !== null) {
        timeDoEntrando.jogadores[indexNoTimeDoEntrando] = jogadorSaindo;
    }

    fecharModalSub();
    renderTimes(timesSorteadosGlobal);

    alert(`Substituição concluída: ${jogadorEntrando.nome} entrou na vaga de ${jogadorSaindo.nome}!`);
}

function renderPartidaSelects() {
    const selectA = document.getElementById('select-time-a');
    const selectB = document.getElementById('select-time-b');
    
    const valorAtualA = selectA.value;
    const valorAtualB = selectB.value;
    
    selectA.innerHTML = '<option value="">Selecione...</option>';
    selectB.innerHTML = '<option value="">Selecione...</option>';

    timesSorteadosGlobal.forEach((t, index) => {
        if(!t.isResto) {
            selectA.innerHTML += `<option value="${index}">${t.nome}</option>`;
            selectB.innerHTML += `<option value="${index}">${t.nome}</option>`;
        }
    });

    if (valorAtualA !== "") selectA.value = valorAtualA;
    if (valorAtualB !== "") selectB.value = valorAtualB;
}

function atualizarDisplayCronometro() {
    const min = Math.floor(tempoRestante / 60).toString().padStart(2, '0');
    const sec = (tempoRestante % 60).toString().padStart(2, '0');
    document.getElementById('cronometro-display').innerText = `${min}:${sec}`;
}

function toggleCronometro() {
    const btn = document.getElementById('btn-cronometro');
    const selectA = document.getElementById('select-time-a');
    const selectB = document.getElementById('select-time-b');
    
    if (cronometroRodando) {
        clearInterval(intervaloCronometro);
        cronometroRodando = false;
        btn.innerHTML = '<i class="fa-solid fa-play mr-2"></i> Retomar';
        btn.className = 'bg-amber-500 text-slate-900 px-8 py-3 rounded-xl font-bold text-lg active:scale-95 transition-all';
        selectA.disabled = false;
        selectB.disabled = false;
    } else {
        if (selectA.value === "" || selectB.value === "") {
            alert("Por favor, selecione os dois times antes de iniciar a partida!");
            return;
        }
        if (selectA.value === selectB.value) {
            alert("Os times selecionados devem ser diferentes!");
            return;
        }

        if(tempoRestante === TEMPO_TOTAL) {
            document.getElementById('audio-apito').play().catch(()=>{});
        }
        
        cronometroRodando = true;
        btn.innerHTML = '<i class="fa-solid fa-pause mr-2"></i> Pausar';
        btn.className = 'bg-red-500 text-white px-8 py-3 rounded-xl font-bold text-lg active:scale-95 transition-all';
        selectA.disabled = true;
        selectB.disabled = true;
        
        intervaloCronometro = setInterval(() => {
            tempoRestante--;
            atualizarDisplayCronometro();
            
            if (tempoRestante <= 0) {
                finalizarPartida("Fim de Jogo! O tempo estourou (7 minutos).", true);
            }
        }, 1000);
    }
}

function finalizarPartida(mensagem, tocarApito = false) {
    clearInterval(intervaloCronometro);
    cronometroRodando = false;
    
    if (tocarApito) {
        document.getElementById('audio-apito').play().catch(()=>{}); 
    }
    
    const btn = document.getElementById('btn-cronometro');
    btn.innerHTML = '<i class="fa-solid fa-play mr-2"></i> Iniciar';
    btn.className = 'bg-emerald-500 text-slate-900 px-8 py-3 rounded-xl font-bold text-lg active:scale-95 transition-all';
    
    document.getElementById('select-time-a').disabled = false;
    document.getElementById('select-time-b').disabled = false;

    setTimeout(() => {
        alert(mensagem);
    }, 300);
}

function resetarCronometro() {
    clearInterval(intervaloCronometro);
    cronometroRodando = false;
    tempoRestante = TEMPO_TOTAL;
    atualizarDisplayCronometro();
    const btn = document.getElementById('btn-cronometro');
    btn.innerHTML = '<i class="fa-solid fa-play mr-2"></i> Iniciar';
    btn.className = 'bg-emerald-500 text-slate-900 px-8 py-3 rounded-xl font-bold text-lg active:scale-95 transition-all';
    
    document.getElementById('select-time-a').disabled = false;
    document.getElementById('select-time-b').disabled = false;
}

function abrirModalGol(time) {
    if (tempoRestante <= 0) {
        alert("O tempo já esgotou! Encerre a partida para iniciar uma nova.");
        return;
    }
    if (placar['A'] >= 2 || placar['B'] >= 2) {
        alert("A partida já atingiu o limite de gols (2)! Caso o gol tenha sido marcado errado, use a opção de remover.");
        return;
    }

    const selectId = time === 'A' ? 'select-time-a' : 'select-time-b';
    const timeIndex = document.getElementById(selectId).value;
    
    if (timeIndex === "") {
        alert("Selecione qual time está jogando primeiro!");
        return;
    }

    timeSelecionadoParaGol = time;
    const timeData = timesSorteadosGlobal[timeIndex];
    
    const listaModal = document.getElementById('modal-jogadores-lista');
    listaModal.innerHTML = '';

    const tituloModal = document.getElementById('titulo-modal-gol');
    tituloModal.innerText = "Quem fez o gol?";
    tituloModal.className = "font-bold text-lg text-emerald-400";

    timeData.jogadores.forEach(j => {
        const btn = document.createElement('button');
        btn.className = "w-full text-left p-3 mb-2 bg-slate-700 hover:bg-emerald-500 hover:text-slate-900 rounded-lg font-bold text-white transition-colors flex items-center gap-3";
        btn.innerHTML = `
            <img src="${j.foto}" onerror="this.onerror=null; this.src=getAvatarUrl('${j.nome}')" class="w-8 h-8 object-cover rounded-full bg-slate-600">
            ${j.nome}
        `;
        btn.onclick = () => registrarGol(j.id, j.nome, time);
        listaModal.appendChild(btn);
    });

    document.getElementById('modal-gol').classList.remove('hidden');
    document.getElementById('modal-gol').classList.add('flex');
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

    if (placar[time] >= 2) {
        const selectId = time === 'A' ? 'select-time-a' : 'select-time-b';
        const timeIndex = document.getElementById(selectId).value;
        const timeData = timesSorteadosGlobal[timeIndex];
        finalizarPartida(`Fim de Jogo! O ${timeData.nome} atingiu 2 gols e venceu a partida.`, false);
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
    } else {
        alert("Não existem gols computados nesta partida para serem removidos.");
    }
}

function abrirModalFimPartida() {
    const selectA = document.getElementById('select-time-a').value;
    const selectB = document.getElementById('select-time-b').value;

    if (selectA === "" || selectB === "") {
        resetarPlacarSemModal();
        return;
    }

    const nomeTimeA = timesSorteadosGlobal[selectA].nome;
    const nomeTimeB = timesSorteadosGlobal[selectB].nome;
    
    document.getElementById('texto-fim-placar').innerText = `${nomeTimeA} (${placar['A']}) x (${placar['B']}) ${nomeTimeB}`;
    
    const opcoesDiv = document.getElementById('opcoes-fim-jogo');
    opcoesDiv.innerHTML = '';

    let botoesHtml = '';

    if (placar['A'] > placar['B']) {
        botoesHtml += `
            <button onclick="processarFimPartida('A')" class="w-full bg-emerald-500 text-slate-900 py-3 rounded-lg font-bold text-lg active:scale-95 transition-all">
                Manter ${nomeTimeA} na Quadra
            </button>`;
    } else if (placar['B'] > placar['A']) {
        botoesHtml += `
            <button onclick="processarFimPartida('B')" class="w-full bg-emerald-500 text-slate-900 py-3 rounded-lg font-bold text-lg active:scale-95 transition-all">
                Manter ${nomeTimeB} na Quadra
            </button>`;
    } else {
        const totalPresentes = jogadoresData.filter(j => j.presente).length;
        const jogandoQuadra = timesSorteadosGlobal[selectA].jogadores.length + timesSorteadosGlobal[selectB].jogadores.length;
        const esperando = totalPresentes - jogandoQuadra;

        if (esperando >= 8) {
            botoesHtml += `
                <div class="p-3 bg-red-500/20 border border-red-500/50 rounded-lg mb-4 text-center">
                    <p class="text-red-400 font-bold text-sm mb-1">Regra da Fila Cheia (${esperando} aguardando)</p>
                    <p class="text-xs text-slate-300">Como há 8 ou mais pessoas fora (equivalente a 2 times completos descontando os goleiros), em caso de empate os dois times saem.</p>
                </div>
                <button onclick="processarFimPartida('NENHUM')" class="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-bold text-lg transition-all">
                    Remover AMBOS os times
                </button>
            `;
        } else {
            if (isPrimeiraPartida) {
                botoesHtml += `
                    <div class="p-3 bg-amber-500/20 border border-amber-500/50 rounded-lg mb-4 text-center">
                        <p class="text-amber-400 font-bold text-sm mb-1">Primeira Partida</p>
                        <p class="text-xs text-slate-300">Sem vantagem de quadra e com fila pequena (${esperando} fora). Decisão nos pênaltis.</p>
                    </div>
                    <button onclick="processarFimPartida('A')" class="w-full bg-amber-500 text-slate-900 py-3 rounded-lg font-bold text-lg active:scale-95 transition-all mb-3">
                        ${nomeTimeA} venceu os Pênaltis
                    </button>
                    <button onclick="processarFimPartida('B')" class="w-full bg-amber-500 text-slate-900 py-3 rounded-lg font-bold text-lg active:scale-95 transition-all">
                        ${nomeTimeB} venceu os Pênaltis
                    </button>
                `;
            } else {
                if (selectA === window.idReiDaQuadra) {
                    botoesHtml += `<button onclick="processarFimPartida('A')" class="w-full bg-emerald-500 text-slate-900 py-3 rounded-lg font-bold text-lg active:scale-95 transition-all flex flex-col items-center justify-center">
                                <span>Manter ${nomeTimeA}</span>
                                <span class="text-xs font-medium text-slate-800 opacity-80">(Vantagem de Quadra)</span>
                            </button>`;
                } else if (selectB === window.idReiDaQuadra) {
                    botoesHtml += `<button onclick="processarFimPartida('B')" class="w-full bg-emerald-500 text-slate-900 py-3 rounded-lg font-bold text-lg active:scale-95 transition-all flex flex-col items-center justify-center">
                                <span>Manter ${nomeTimeB}</span>
                                <span class="text-xs font-medium text-slate-800 opacity-80">(Vantagem de Quadra)</span>
                            </button>`;
                } else {
                    botoesHtml += `<button onclick="processarFimPartida('A')" class="w-full bg-amber-500 text-slate-900 py-3 rounded-lg font-bold text-lg active:scale-95 transition-all mb-3">Manter ${nomeTimeA} (Pênaltis)</button>`;
                    botoesHtml += `<button onclick="processarFimPartida('B')" class="w-full bg-amber-500 text-slate-900 py-3 rounded-lg font-bold text-lg active:scale-95 transition-all">Manter ${nomeTimeB} (Pênaltis)</button>`;
                }
            }
        }
    }

    opcoesDiv.innerHTML = botoesHtml;

    document.getElementById('modal-fim-partida').classList.remove('hidden');
    document.getElementById('modal-fim-partida').classList.add('flex');
}

function fecharModalFimPartida() {
    document.getElementById('modal-fim-partida').classList.add('hidden');
    document.getElementById('modal-fim-partida').classList.remove('flex');
}

function processarFimPartida(vencedor) {
    const selectA = document.getElementById('select-time-a');
    const selectB = document.getElementById('select-time-b');

    if (vencedor === 'A') {
        window.idReiDaQuadra = selectA.value;
        selectB.value = '';
        isPrimeiraPartida = false;
    } else if (vencedor === 'B') {
        window.idReiDaQuadra = selectB.value;
        selectA.value = '';
        isPrimeiraPartida = false; 
    } else if (vencedor === 'NENHUM') {
        window.idReiDaQuadra = null;
        selectA.value = '';
        selectB.value = '';
        isPrimeiraPartida = true;
    }

    resetarPlacarSemModal();
    fecharModalFimPartida();
}

function resetarPlacarSemModal() {
    placar = { A: 0, B: 0 };
    historicoGolsPartida = { A: [], B: [] }; 
    document.getElementById('placar-a').innerText = '0';
    document.getElementById('placar-b').innerText = '0';
    resetarCronometro();
}

function abrirModalDesempate(idA, idB) {
    tempIdA = idA;
    tempIdB = idB;
    document.getElementById('btn-vencedor-a').innerText = timesSorteadosGlobal[idA].nome;
    document.getElementById('btn-vencedor-b').innerText = timesSorteadosGlobal[idB].nome;
    
    document.getElementById('modal-desempate').classList.remove('hidden');
    document.getElementById('modal-desempate').classList.add('flex');
}

function resolverDesempate(vencedor) {
    document.getElementById('modal-desempate').classList.add('hidden');
    document.getElementById('modal-desempate').classList.remove('flex');
    processarFimPartida(vencedor);
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

// LOGICA PARA REMOVER A TELA DE ABERTURA CUSTOMIZADA
window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if (splash) {
            // Primeiro fazemos a tela ficar transparente
            splash.style.opacity = '0';
            
            // Depois de 500ms (tempo da transição CSS), removemos ela da memória para não atrapalhar os cliques do app
            setTimeout(() => {
                splash.remove();
                document.body.classList.remove('overflow-hidden'); // Devolve a rolagem da tela
            }, 500); 
        }
    }, 2500); // Exibe a tela de abertura por exatos 2.5 segundos
});

init();