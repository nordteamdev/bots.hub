export default class HaResponseTimeCommand {
  name = 'haresp';
  right = 'haresp';

  handler(ctx) {
    const hentadminPlugin = ctx.getPlugin('common/hentadmin');
    const arr = [...hentadminPlugin.messages];

    const jsonData = {
      type: 'bar',
      data: {
        labels: ['<10мс', '10-25', '25-50', '50-100', '100-1000', '>1000'],
        datasets: [{
          data: [
            arr.filter(v => v < 10).length,
            arr.filter(v => v >= 10 && v < 25).length,
            arr.filter(v => v >= 25 && v < 50).length,
            arr.filter(v => v >= 50 && v < 100).length,
            arr.filter(v => v >= 100 && v < 1000).length,
            arr.filter(v => v >= 1000).length
          ]
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
    };

    ctx.builder()
      .text(`⏱️ Время ответа: ${Math.floor(hentadminPlugin.avgResponseTime)} мс.`)
      .photo(`https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(jsonData))}`)
      .answer();
  }
}
