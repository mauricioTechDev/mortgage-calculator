const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')
const markAsAGoodDeal = document.querySelectorAll('.markAsAGoodDeal');
const markAsABadDeal = document.querySelectorAll('.markAsABadDeal');

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteRapper)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

Array.from(markAsAGoodDeal).forEach((element)=>{
    element.addEventListener('click', markCalculationAsAGoodDeal)
})

Array.from(markAsABadDeal).forEach((element)=>{
    element.addEventListener('click', markCalculationAsABadDeal)
})

async function markCalculationAsAGoodDeal(){
      const idOfHome = this.parentNode.childNodes[1].attributes[0].nodeValue
      try{
          const response = await fetch('markAsAGoodDeal', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                'id': idOfHome,
              })
            });
            console.log(response);
          location.reload()
      }catch(err){
          console.log(err)
      }
}

async function markCalculationAsABadDeal(){
      const idOfHome = this.parentNode.childNodes[1].attributes[0].nodeValue
      try{
          const response = await fetch('markAsABadDeal', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                'id': idOfHome,
              })
            });
            console.log(response);
          location.reload()
      }catch(err){
          console.log(err)
      }
}

async function deleteRapper(){
    const sName = this.parentNode.childNodes[1].innerText
    const idOfHome = this.parentNode.childNodes[1].attributes[0].nodeValue
    try{
        const response = await fetch('deleteMortgageCalculation', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'id': idOfHome,
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function addLike(){
    const sName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[3].innerText
    const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'stageNameS': sName,
              'birthNameS': bName,
              'likesS': tLikes
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}
