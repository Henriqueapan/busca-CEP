const cep = document.querySelector('#cep'),
btn = document.querySelector('#send'),
result = document.querySelector('.resultado'),
resultExt = document.querySelector('.resultado-ext'),
form = document.forms[0]

form.addEventListener('submit', handleForm)
btn.addEventListener('click', handleForm)
cep.addEventListener('keydown', handleInput)

function handleForm(e) {
    e.preventDefault()
    buscaCep(cep.value)
}

function handleInput(e) {
    if ((this.value.length >= 8) && !(e.ctrlKey) && e.key.length <= 1){
        e.preventDefault()
    }
}

function buscaCep(cep) {
    result.innerHTML = ''
    resultExt.innerHTML = ''
    resultExt.classList.add('resultado-ext')
    resultExt.classList.remove('error')
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(r => r.json(), () => {
        const erro = new Error()
        cep ? erro.message = 'CEP inválido.' : erro.message = 'Campo vazio.'

        throw erro
    })
    .then(body => {
        const keys = Object.keys(body)
        if (keys.includes('erro')){
            throw new Error('CEP inválido.')
        }
        keys.forEach(i => {
            if (body[i]) result.innerHTML += `<div><span>${i.toUpperCase()}:</span><span> ${body[i]}</span></div>`
        })
        resultExt.innerText = `${body.localidade}/${body.uf}`
        
        body.bairro ?
        resultExt.innerText = `${body.bairro} - ` + resultExt.innerText :
        0

        body.logradouro ?
        resultExt.innerText = `${body.logradouro}, ` + resultExt.innerText :
        0
    })
    .catch((rejection) => {
        resultExt.classList.remove('resultado-ext')
        resultExt.classList.add('error')
        resultExt.innerText = rejection.message
    })
}