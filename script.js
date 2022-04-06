const cep = document.querySelector('#cep'),
btn = document.querySelector('#send'),
result = document.querySelector('.resultado'),
resultExt = document.querySelector('.resultado-ext'),
form = document.forms[0]

form.addEventListener('submit', handleForm)
btn.addEventListener('click', handleForm)

function handleForm(e) {
    e.preventDefault()
    buscaCep(cep.value)
}

function buscaCep(cep) {
    console.log(cep)
    result.innerHTML = ''
    resultExt.innerHTML = ''
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(r => r.json())
    .then(body => {
        const keys = Object.keys(body)
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
}