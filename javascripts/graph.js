const file = '../data/data_topline.csv';

// Parse the data and create a graph with the data.
function parseData(createGraph) {
	Papa.parse(file, {
		download: true,
    header: true,
		complete: function(results) {
      // console.log(results.data);
			createGraph(results.data);
    }
	});
}

function createGraph(data) {
  let salesPerMonth = [];

  data.reduce((accumulator, value) => {
    if (!accumulator[value.date]) {
      accumulator[value.date] = { date: value.date, sales: 0, revenue: 0 };
      salesPerMonth.push(accumulator[value.date]);
    }
    accumulator[value.date].sales += parseInt(value.sales);
    accumulator[value.date].revenue += parseInt(value.revenue);
    return accumulator;
  }, {});

  // console.log(salesPerMonth);

  let chart = c3.generate({
    bindto: '#chart',
    data: {
      json: salesPerMonth,
      axes: {
        sales: 'y',
        revenue: 'y2'
      },
      keys: {
        x: 'date',
        value: ['sales', 'revenue']
      }  
    },
    axis: {
      x: {
          type: 'category',
          tick: {
            multiline: false,
            culling: {
              max: 10
            }
          },
      },
      y: {
        show: true
      },
      y2: {
        show: true
      }
    },
    size: {
      height: ( window.innerWidth < 800 ? 500 : 300 )
    },
    zoom: {
        enabled: true
    }
  });
}

parseData(createGraph);