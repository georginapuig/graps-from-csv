const dataTopline = '../data/data_topline.csv';

let salesPerMonth = [];
let salesPerState = [];
let salesPerSection = [];

// parse the data and create a graph with the data.
function parseData(createGraph) {
	Papa.parse(dataTopline, {
		download: true,
    header: true,
		complete: function(results) {
      // console.log(results.data);
			createGraph(results.data);
    }
	});
}

// data for each chart
function dataPer(data) {
  data.reduce((accumulator, value) => {
    if (!accumulator[value.date]) {
      accumulator[value.date] = { date: value.date, sales: 0, revenue: 0 };
      salesPerMonth.push(accumulator[value.date]);
    }
    accumulator[value.date].sales += parseInt(value.sales);
    accumulator[value.date].revenue += parseInt(value.revenue);
    return accumulator;
  }, {});

  data.reduce((accumulator, value) => {
    if (!accumulator[value.estado]) {
      accumulator[value.estado] = { estado: value.estado, sales: 0, revenue: 0 };
      salesPerState.push(accumulator[value.estado]);
    }
    accumulator[value.estado].sales += parseInt(value.sales);
    accumulator[value.estado].revenue += parseInt(value.revenue);
    return accumulator;
  }, {});

  data.reduce((accumulator, value) => {
    if (!accumulator[value.canal]) {
      accumulator[value.canal] = { canal: value.canal, sales: 0, revenue: 0 };
      salesPerSection.push(accumulator[value.canal]);
    }
    accumulator[value.canal].sales += parseInt(value.sales);
    accumulator[value.canal].revenue += parseInt(value.revenue);
    return accumulator;
  }, {});
}

function createGraph(data) {
  dataPer(data);

  // sales and revenues per month
  let chart1 = c3.generate({
    bindto: '#chart-1',
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
        show: true,
        label: {
          text: 'Sales',
          position: 'outer-middle'
        }
      },
      y2: {
        show: true,
        label: {
          text: 'Revenues',
          position: 'outer-middle'
        },
      }
    },
    size: {
      height: ( window.innerWidth < 800 ? 500 : 300 )
    },
    zoom: {
        enabled: true
    },
    onrendered: function() {
      d3.select( '.c3-axis-y-label' ).style( 'fill', '#1575b6' );
      d3.select( '.c3-axis-y2-label' ).style( 'fill', '#ff7f00' );
    }
  });

  // sales and revenues per state
  let chart2 = c3.generate({
    bindto: '#chart-2',
    data: {
      json: salesPerState,
      axes: {
        sales: 'y',
        revenue: 'y2'
      },
      keys: {
        x: 'estado',
        value: ['sales', 'revenue']
      }
    },
    axis: {
      x: {
          type: 'category',
          tick: {
            multiline: false,
            rotate: 75,
            
          },
      },
      y: {
        show: true,
        label: {
          text: 'Sales',
          position: 'outer-middle'
        }
      },
      y2: {
        show: true,
        label: {
          text: 'Revenues',
          position: 'outer-middle'
        },
      }
    },
    size: {
      height: ( window.innerWidth < 800 ? 500 : 450 )
    },
    zoom: {
        enabled: true
    }
  });

  // sales and revenues per section
  let chart3 = c3.generate({
    bindto: '#chart-3',
    data: {
      json: salesPerSection,
      axes: {
        sales: 'y',
        revenue: 'y2'
      },
      keys: {
        x: 'canal',
        value: ['sales', 'revenue']
      },
      type: 'bar'
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
        show: true,
        label: {
          text: 'Sales',
          position: 'outer-middle'
        }
      },
      y2: {
        show: true,
        label: {
          text: 'Revenues',
          position: 'outer-middle'
        },
      }
    },
    zoom: {
        enabled: true
    },
    onrendered: function() {
      d3.select( '.c3-axis-y-label' ).style( 'fill', '#1575b6' );
      d3.select( '.c3-axis-y2-label' ).style( 'fill', '#ff7f00' );
    }
  });

  // transform chart 3
  setTimeout(function () {
    chart3.transform('bar', 'sales');
  }, 1000);

  setTimeout(function () {
    chart3.transform('bar', 'revenue');
  }, 2000);

  setTimeout(function () {
    chart3.transform('line');
  }, 3000);

  setTimeout(function () {
    chart3.transform('bar');
  }, 4000);
}

parseData(createGraph);