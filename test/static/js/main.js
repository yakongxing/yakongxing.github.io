let gamelist, objects = []
let client = algoliasearch("VICM0QATAN", "36fff9ff4adff96002e8219dbdecff1e");
let index = client.initIndex('your_index_name');

function fetchgame() {
  axios.get('https://steamspy.com/api.php?request=all')
    .then(res => gamelist = res.data)
    .then(() => {
      for (let i of Object.values(gamelist)) {
        objects.push(i)
      }
    })
    .then(() => {
      console.info('upload start!')
      while (objects.length > 0) {
        setTimeout(upload(objects.splice(0, 100), 5000))
      }

      console.info('upload ok!')
    })
}

function upload(data) {
  return function () {
    index.addObjects(data, (err, res) => console.log(res))
  }
}


document.addEventListener('DOMContentLoaded', fetchgame)