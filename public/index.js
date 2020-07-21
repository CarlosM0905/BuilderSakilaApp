
console.log('Hola mundo')

let links = document.getElementsByTagName('a');

function getIdButton($event)
{
    let idLink = $event.srcElement.dataset.id;
    window.location.href = '/results/' + idLink.toString();

}

for(link of links){
    link.addEventListener('click', getIdButton);
}
//console.log(links);

