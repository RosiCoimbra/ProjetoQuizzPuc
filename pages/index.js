const history = JSON.parse(localStorage.getItem('quizResults'))

if (history) {
  history.sort((a, b) => b.hits - a.hits)

  history.forEach((item, index) => {
    const tr = document.createElement('tr')
    let element = ''
    element += `<td>${index + 1}</td>`
    element += `<td>${item.player}</td>`
    element += `<td>${item.hits}</td>`
    element += `<td>${item.errors}</td>`
    element += `<td>${item.hits * 10}</td>`

    tr.innerHTML = element
    document.querySelector('#table-body').appendChild(tr)
  })
}