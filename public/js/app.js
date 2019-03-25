
const search = document.querySelector('input')
const climaFormulario = document.querySelector('form')

climaFormulario.addEventListener('submit', (event) =>{
    event.preventDefault();
        const searchElement = search.value;

        fetch(`http://localhost:3000/weather?address=${searchElement}`).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    return document.getElementById("erro").innerHTML = data.error
                }
                document.getElementById("local").innerHTML = data.local
                document.getElementById("previsao").innerHTML = data.previsão
            })
        })
})

