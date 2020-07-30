const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

// messageOne.textContent = 'asdfghjk'



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value
    
    messageOne.textContent = 'Loading ...'
    messageTwo.textContent = ''

    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            return messageOne.textContent = data.error
        }else{
            // console.log('the data is : ' + data.location)
            // console.log('the data is : ' + data.forecast)

            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast

        }
        
    })
})
})