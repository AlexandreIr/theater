const form=document.querySelector('form')
const divStage=document.getElementById('divStage')
//quantidade total de assentos 
const SEATS=240
//assentos reservados
const booked=[]

window.addEventListener('load',()=>{
    //ao carregar a página verifica se há algo no localStorage
    const taken=localStorage.getItem('seatsTaken')
    ?localStorage.getItem('seatsTaken').split(';'):[]
    //itera de 1 até 240 e gera os assentos de acordo com as informações recebidas 
    for(let i=1;i<=SEATS;i++){
        const figure=document.createElement('figure')
        const imgStatus=document.createElement('img')
        //verifica as cadeiras se foram ocupadas ou não
        imgStatus.src=taken.includes(i.toString())
        ?'img/ocupada.jpg'
        :'img/disponivel.jpg'
        imgStatus.className='seat'
        
        const figureCap=document.createElement('figcaption')
        //cria o figcaption
        const zeros=i<10?'00':i<100?'0':''
        const num=document.createTextNode('['+zeros+i+']')
    
        figureCap.appendChild(num)
        figure.append(imgStatus, figureCap)
        //cria o corredor
        if(i%24==12) figure.style.marginRight='60px'

        divStage.appendChild(figure)
        //cria as filas 
        if(i%24==0) divStage.appendChild(document.createElement('br'))
    }
})
//Listener do submit
form.addEventListener('submit',(e)=>{
    e.preventDefault()

    const seat=Number(form.inSeat.value)
    //verifica se o assento requisitado existe
    if(seat>SEATS){
        alert('Informe um número de poltrona válido')
        form.inSeat.focus()
        return
    }
    //verifica o localStorage
    const taken=localStorage.getItem('seatsTaken')
    ?localStorage.getItem('seatsTaken').split(';'):[]

    //se o assento estiver ocupado informa ao usuário
    if(taken.includes(seat.toString())){
        alert('Poltrona '+seat+' ocupada, por favor selecione outra')
        form.inSeat.value=''
        form.inSeat.focus()
        return
    }
    //procura o assento escolhido, caso esteja livre e muda a img dele para reservada
    const imgSeat=divStage.querySelectorAll('img')[seat-1]
    imgSeat.src='img/reservada.jpg'
    //adiciona o assento ao array booked
    booked.push(seat)

    form.inSeat.value=''
    form.inSeat.focus()
})
//listener do botão de confirmação
form.btnConfirm.addEventListener('click',()=>{
    if(booked.length==0){
        alert('Não há poltronas reservadas')
        form.inSeat.focus()
        return
    }
    //verifica o localStorage
    const taken=localStorage.getItem('seatsTaken')
    ?localStorage.getItem('seatsTaken').split(';')
    :[]
    //confirma a seleção de todos os assentos reservados
    //iterando sobre o array booked do final pro começo
    for(let i=booked.length-1; i>=0;i--){
        taken.push(booked[i])

        const imgSeat=divStage.querySelectorAll('img')[booked[i]-1]

        imgSeat.src='img/ocupada.jpg'

        booked.pop()
    }
    //guarda as informações de taken no localStorage
    localStorage.setItem('seatsTaken', taken.join(';'))
})
