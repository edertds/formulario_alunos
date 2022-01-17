var botaoAbrir = document.getElementById("openCadastro");
var botaoFechar = document.getElementById("closeCadastro");
var cadastro = document.getElementById("formulario");
var botaoSalvar = document.getElementById("formulario");
var inputNome = document.getElementById("nome");
var inputData = document.getElementById("data");
var inputFone = document.getElementById("fone");
var inputNota = document.getElementById("nota");
var tabelaCadastro = document.getElementById("tabela");
var listaCadastro = [];
//Remove aluno cadastrado
function removerCadastro(event){
	var posicao = event.target.getAttribute("data-lista");
	listaCadastro.splice(posicao, 1);
	atualizarTabelaCadastro();
}
//Atualiza o cadastro
function atualizarTabelaCadastro(){
	if(listaCadastro.length === 0){
		tabelaCadastro.innerHTML = "<th colspan='5'>Nenhum aluno cadastrado</th>";
		return;
	}	
	tabelaCadastro.innerHTML = "";
	for(var i = 0; i < listaCadastro.length; i++){
		var evento = listaCadastro[i];
		var linha = document.createElement("tr","hr");
		var celulaNome = document.createElement("td");
		var celulaData = document.createElement("td");
		var celulaFone = document.createElement("td");
		var celulaNota = document.createElement("td");
		var celulaRemover = document.createElement("td");
		var botaoExcluir = document.createElement("button");
		celulaNome.innerText = evento.nomes;
		celulaData.innerText = evento.datas;
		celulaFone.innerText = evento.fones;
		celulaNota.innerText = evento.notas;		
		botaoExcluir.innerText = "Excluir";
		botaoExcluir.classList.add("botaoClose");
		botaoExcluir.setAttribute("data-lista", i);	
		botaoExcluir.addEventListener("click", removerCadastro);	
		linha.appendChild(celulaNome);
		linha.appendChild(celulaData);
		linha.appendChild(celulaFone);
		linha.appendChild(celulaNota);
		linha.appendChild(botaoExcluir);
		tabelaCadastro.appendChild(linha);				
	}			
}
//Testa a entrada de nomes no cadastro
function cadastroNome(nome){
	if(nome.trim().length === 0){
		let obj = inputNome.style.borderColor="#f00";	
		alert ("Preencha o campo somente com letras!");
	}else {
		obj = inputNome.style.borderColor="#fff";
	}
	var aux = nome.match(/\d/);
	if(aux != null){
		//return true;
		obj = inputNome.style.borderColor="#f00";				
		alert("Preencha o campo somente com letras!")		
	}else if(nome.trim().length != 0){
		obj = inputNome.style.borderColor="#fff";
	}		
}
//Testa a entrada de notas no cadastro
function cadastroNota(nota){
	if(nota < 0 || nota > 10){
		let obj = inputNota.style.borderColor="#f00";
		alert("NOTA INVÁLIDA! Somente notas entre 0 (Zero) e 10 (dez)");
	}else{
		obj = inputNota.style.borderColor="#fff";
	}
	var auxNota = nota.match(/\D/);
	if(auxNota != null){
		obj = inputNota.style.borderColor="#f00";
		alert("Preencha o campo somente com números!");
	}else if(nota >= 0 && nota <= 10){
		obj = inputNota.style.borderColor="#fff";
	}	
}
//Abre o formulário ocultado
function abrirCadastro(){	
	cadastro.classList.remove("ocultar");	
}
//Fecha o formulário
function fecharCadastro(){	
	cadastro.classList.add("ocultar");	
}
//Salva os dados cadastrados
function salvarCadastro(event){
	event.preventDefault();
	var nome = inputNome.value;
	var data = inputData.value;
	var fone = inputFone.value;
	var nota = inputNota.value;	
	listaCadastro.push({
		nomes: nome,
		datas: data,
		fones: fone,
		notas: nota,
	});	
	atualizarTabelaCadastro();
	fecharCadastro();			
	cadastroNome(nome);
	cadastroNota(nota);		
}
botaoAbrir.addEventListener("click", abrirCadastro);
botaoFechar.addEventListener("click", fecharCadastro);
botaoSalvar.addEventListener("submit", salvarCadastro);
window.addEventListener("load", atualizarTabelaCadastro);
