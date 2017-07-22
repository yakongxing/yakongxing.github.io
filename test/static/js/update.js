let gamelist,
  objects = [];
let client = algoliasearch('VICM0QATAN', '36fff9ff4adff96002e8219dbdecff1e');
let index = client.initIndex('steamgame');

function fetchgame() {
  axios
    .get('https://steamspy.com/api.php?request=all')
    .then(res => (gamelist = res.data))
    .then(() => {
      for (let i of Object.entries(gamelist)) {
        objects.push({
          objectID: i[0],
          tags: [Object.keys(i[1].tags)]
        });
      }
    })
    .then(() => {
      console.info('upload start!', objects.length);
      /* while (objects.length > 0) {
        setTimeout(upload(objects.splice(0, 100), 5000));
      } */
      upload({
        tags: ['Actions', 'MMO'],
        objectID: '570'
      })

      console.info('upload ok!');
    });
}

function upload(data) {
  return function() {
    index.partialUpdateObject(data, (err, res) => {
      index.waitTask(res.taskID, err => {
        if (!err) {
          console.log(`object${res.objectID} indexed`);
        }
      });
    });
  };
}

document.addEventListener('DOMContentLoaded', fetchgame);
