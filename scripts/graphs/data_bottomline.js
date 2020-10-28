const dataBottomline = '../data/data_bottomline.csv';

let perMonth = [];
let perState = [];
let perSection = [];

// parse the data and create a graph with the data.
function parseDataBottom(createGraph2) {
	Papa.parse(dataBottomline, {
		download: true,
    header: true,
		complete: function(results) {
      // console.log(results.data);
			createGraph2(results.data);
    }
	});
}

// data for each chart
function dataPer2(data) {
  data.reduce((accumulator, value) => {
    if (!accumulator[value.date]) {
      accumulator[value.date] = { date: value.date, employee_satisf: 0, cust_satisf: 0 };
      perMonth.push(accumulator[value.date]);
    }
    accumulator[value.date].employee_satisf += parseFloat(value.employee_satisf);
    accumulator[value.date].cust_satisf += parseFloat(value.cust_satisf);
    return accumulator;
  }, {});

  data.reduce((accumulator, value) => {
    if (!accumulator[value.estado]) {
      accumulator[value.estado] = { estado: value.estado, employee_satisf: 0, cust_satisf: 0 };
      perState.push(accumulator[value.estado]);
    }
    accumulator[value.estado].employee_satisf += parseFloat(value.employee_satisf);
    accumulator[value.estado].cust_satisf += parseFloat(value.cust_satisf);
    return accumulator;
  }, {});

  data.reduce((accumulator, value) => {
    if (!accumulator[value.area]) {
      accumulator[value.area] = { area: value.area, employee_satisf: 0, cust_satisf: 0 };
      perSection.push(accumulator[value.area]);
    }
    accumulator[value.area].employee_satisf += parseFloat(value.employee_satisf);
    accumulator[value.area].cust_satisf += parseFloat(value.cust_satisf);
    return accumulator;
  }, {});
}

function createGraph2(data) {
  dataPer2(data);

  // customer and employee per month
  let chart4 = c3.generate({
    bindto: '#chart-4',
    data: {
      json: perMonth,
      axes: {
        employee_satisf: 'y',
        cust_satisf: 'y2'
      },
      keys: {
        x: 'date',
        value: ['employee_satisf', 'cust_satisf']
      }  
    },
    grid: {
      x: {
        show: true
      },
      y: {
        show: true
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
          text: 'Employee satisfaction',
          position: 'outer-middle'
        }
      },
      y2: {
        show: true,
        label: {
          text: 'Customer satisfaction',
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

  // customer and employee per state
  let chart5 = c3.generate({
    bindto: '#chart-5',
    data: {
      json: perState,
      axes: {
        employee_satisf: 'y',
        cust_satisf: 'y2'
      },
      keys: {
        x: 'estado',
        value: ['employee_satisf', 'cust_satisf']
      }
    },
    axis: {
      x: {
          type: 'category',
          tick: {
            multiline: false,
            rotate: 75
          },
      },
      y: {
        show: true,
        label: {
          text: 'Employee satisfaction',
          position: 'outer-middle'
        }
      },
      y2: {
        show: true,
        label: {
          text: 'Customer satisfaction',
          position: 'outer-middle'
        },
      }
    },
    size: {
      height: ( window.innerWidth < 800 ? 500 : 450 )
    },
    zoom: {
        enabled: true
    },
    onrendered: function() {
      d3.select( '.c3-axis-y-label' ).style( 'fill', '#1575b6' );
      d3.select( '.c3-axis-y2-label' ).style( 'fill', '#ff7f00' );
    }
  });

  // customer and employee per section
  let chart6 = c3.generate({
    bindto: '#chart-6',
    data: {
      json: perSection,
      axes: {
        employee_satisf: 'y',
        cust_satisf: 'y2'
      },
      keys: {
        x: 'area',
        value: ['employee_satisf', 'cust_satisf']
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
          text: 'Employee satisfaction',
          position: 'outer-middle'
        }
      },
      y2: {
        show: true,
        label: {
          text: 'Customer satisfaction',
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
    chart6.transform('bar', 'employee_satisf');
  }, 1000);

  setTimeout(function () {
    chart6.transform('bar', 'cust_satisf');
  }, 2000);

  setTimeout(function () {
    chart6.transform('line');
  }, 3000);

  setTimeout(function () {
    chart6.transform('bar');
  }, 4000);
}

parseDataBottom(createGraph2);