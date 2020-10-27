const file = '../data/data_topline.csv';

// Parse the data and create a graph with the data.
function parseData(createGraph) {
	Papa.parse(file, {
		download: true,
		complete: function(results) {
      console.log(results.data);
			createGraph(results.data);
		}
	});
}

function createGraph(data) {
  var chart = c3.generate({
    data: {
        columns: [
            ['data1', 30, 200, 100, 400, 150, 250, 50, 100, 250]
        ]
    },
    axis: {
        x: {
            type: 'category',
            categories: ['cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6', 'cat7', 'cat8', 'cat9']
        }
    }
  });
}

parseData(createGraph);