/**
 * Created by lzk on 10/15/16.
 */
var winWidth = $(window).width(),
    winHeight = $(window).height();
var stack = [],
    sum_stack = [];
$(document).ready(function () {
    resize();
});
var operand =[{id:'button',name:'push',type:'event'},{id:"remp",name:"Temperature",type:'status',expr:'*>20'},
    {id:'remp',name:"RelativeHumidity",type:'status',expr:''},{id:'sound',name:'sound',type:'event'},{id:'net1',name:'',params:''}];
console.log(operand[1]['expr']);
var action = [{id:'lcd',name:'clear',params:''},{id:'lcd',name:'print',params:''},
    {id:'net2',name:'',type:'status',expr:''},{id:'led-r',name:'turnOn'}];
var productBox = function (data_class, data_id) {
    var mask = document.createElement("div");
    mask.classList.add('mask');
    var floatBox = document.createElement('div');
    floatBox.style.left = (winWidth-500)/2 + 'px';
    floatBox.style.top = (winHeight-400)/2 + 'px';
    floatBox.classList.add("float-box");
    document.body.appendChild(mask);
    document.body.appendChild(floatBox);
    var icon = document.createElement("div");
    icon.id = data_id;
    icon.classList.add(data_class);
    icon.style.position = 'relative';
    icon.style.left = "20px";
    icon.style.top = "20px";
    floatBox.appendChild(icon);
    var name = document.createElement("h1");
    name.classList.add('h1-style');
    name.innerText = chooseName(data_id);
    floatBox.appendChild(name);
    var ok_button = document.createElement('div');
    ok_button.classList.add('ok-button');
    ok_button.innerText = 'OK';

    floatBox.appendChild(ok_button);
    var input = document.createElement('input');
    input.type = 'text';
    input.classList.add('input');
    floatBox.appendChild(input);
    var input_attr = document.createElement("div");
    input_attr.classList.add('input-attr');
    input_attr.innerText = chooseAttr(data_id);
    floatBox.appendChild(input_attr);
    ok_button.onclick = function () {
        floatBox.style.display = 'none';
        mask.style.display = 'none';
        document.getElementById(data_id).title = $(input).val();
    };

};
function chooseName(id) {
    switch(id){
        case 'button':
            return '按钮';
            break;
        case 'hongwaishou':
            return '红外发射器';
            break;
        case 'music':
            return '声音传感器';
            break;
        case 'shidu':
            return '湿度传感器';
            break;
        case 'wendu':
            return '温度传感器';
            break;
        case 'net1':
            return '获取网络资源';
            break;
        case 'net2':
            return '发送到服务器';
            break;
    }
}
function chooseAttr(id) {
    switch(id){
        case 'button':
            return 'button:';
            break;
        case 'hongwaishou':
            return 'Hz:';
            break;
        case 'music':
            return 'shengyin:';
            break;
        case 'shidu':
            return '湿度范围:';
            break;
        case 'wendu':
            return '温度范围:';
            break;
        case 'net1':
            return 'URL:';
            break;
        case 'net2':
            return 'URL';
            break;
    }
}
function resize(){
    $("#button").css('left',(winWidth-1300)/2 + 'px');
    $("#hongwaishou").css('left',(winWidth-1300)/2 + 200 +'px');
    $("#music").css('left',(winWidth-1300)/2+ 400 +'px');
    $("#shidu").css('left',(winWidth-1300)/2+ 600 +'px');
    $("#wendu").css('left',(winWidth-1300)/2+ 800 +'px');
    $("#net1").css('left',(winWidth-1300)/2+ 1000 +'px');
    $("#hongwaifa").css('left',(winWidth-1040)/2 +'px');
    $("#bee").css('left',(winWidth-1040)/2 +200+'px');
    $("#program").css('left',(winWidth-1040)/2 +400+'px');
    $("#kaiguan").css('left',(winWidth-1040)/2 +600+'px');
    $("#net2").css('left',(winWidth-1040)/2 +800+'px');
}
$(".condition").click(function () {
    productBox($(this)[0].className,$(this)[0].id);
        if($(this)[0] == stack[0]){
            $(this)[0].classList.remove("active");
            stack = [];
        }
        else {
            $(this)[0].classList.add("active");
            stack.push($(this)[0]);
            console.log($(this));
            sum_stack.push($(this)[0].id);
        }
        if(stack.length == 2){
            drawLine($(stack[0]),$(stack[1]));
            $(".sociation").fadeIn(700);
            for(var i=0;i<stack.length;i++){
                stack[i].classList.remove("active");
            }
            stack = [];
        }
});
$("#net2").click(function () {
    productBox($(this)[0].className,$(this)[0].id);

});
function drawLine(firstBot, secondBot) {
    var center = {};
    center.left = (parseInt(firstBot.css("left"))+ parseInt(secondBot.css("left")))/2;
    center.top = (parseInt(firstBot.css("top"))+ parseInt(secondBot.css("top")))/2;
    console.log(center.left,center.top);
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    ctx.clearRect(0,0,1600,1200);
    ctx.beginPath();
    ctx.moveTo(parseInt(firstBot.css("left"))+75,parseInt(firstBot.css("top"))+75);
    ctx.quadraticCurveTo(center.left+75,center.top+500,parseInt(secondBot.css("left"))+75,parseInt(secondBot.css("top"))+75);
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.closePath();
    var soci_left = center.left+30+'px';
    var soci_top = center.top +243+'px';
    $(".sociation").click(function () {
        if($(this)[0].id == 'and'){
            $("#and").animate({
                left:soci_left,
                top: soci_top
            },0.7);
            $("#or").fadeOut();
            sum_stack.push("&");
        }
        else{
            $("#or").animate({
                left: soci_left,
                top: soci_top
            },0.7);
            $("#and").fadeOut();
            sum_stack.push("||");
        }
        $(".action").click(function () {
            var fourBot = {};
            sum_stack.push($(this)[0].id);
            fourBot.left = parseInt($(this).css("left"));
            fourBot.top = parseInt($(this).css("top"));
            ctx.beginPath();
            ctx.moveTo(parseInt(soci_left)+45,parseInt(soci_top)+45);
            ctx.lineTo(fourBot.left+60, fourBot.top+60);
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 10;
            ctx.stroke();
            ctx.closePath();
            post_data();
        })
    });

}
function drawDirectLine(firstBot, secondBot){
    var c = document.getElementById('myCanvas');
    var ctx = c.getContext('2d');
    ctx.clearRect(0,0,1600,1200);
    ctx.beginPath();
    ctx.moveTo(parseInt(firstBot.css('left')+75),parseInt(firstBot.css('top'))+75);
    ctx.lineTo(parseInt(secondBot.css('left'))+60,parseInt(secondBot.css('top'))+60);
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.closePath();
}
function post_data() {
    console.log(sum_stack[0],sum_stack[1],sum_stack[2],sum_stack[3]);
    //var data = {type:"cond2",operand1:JSON.stringify(return_operand(sum_stack[0])),operand2:JSON.stringify(return_operand(sum_stack[1])),op:sum_stack[2],actions:JSON.stringify(return_action(sum_stack[3]))};
    var data = {type:"cond2",operand1:return_operand(sum_stack[0]),operand2:return_operand(sum_stack[1]),op:sum_stack[2],actions:return_action(sum_stack[3])};

    console.log(data);

    $.ajax({
        type:"POST",
        url:"http://121.201.69.165:8000/set_config",
        data:data,
        dataType:"application/json",
        success:function (data) {
            console.log(data);
        }
    })
}
function return_operand(id){
    switch (id){
        case 'wendu':
            operand[1]['expr'] = document.getElementById('wendu').title;
            return operand[1];
            break;
        case 'shidu':
            operand[2]['expr'] = document.getElementById('shidu').title;
            return operand[2];
            break;
        case 'button':
            return operand[0];
            break;
        case 'music':
            return operand[3];
            break;
        case 'net1':
            operand[4]['expr'] = document.getElementById('net1').title;
            return operand[4];
            break;
    }
}
function return_action(id) {
    switch (id){
        case 'program':
            return action[1];
            break;
        case 'net2':
            action[2]['expr'] = document.getElementById('net2').title;
            return action[2];
            break;
        case 'kaiguan':
            return action[3];
            break;
    }
}



