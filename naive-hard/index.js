 $.ready(function (error) {
     $('#led-r').turnOn();
     $('#sound').on('sound',  function() {
         $('#led-g').turnOn();
     });
     
     $('#lcd').setCursor(0, 0);
     $('#lcd').turnOn();
     out = setInterval(function () {
         console.log('timed!');
//         $('#lcd').clear();
//         $('#lcd').print($('#temp').getTemperature()+"");
     }, 100);
 });
