(function($){
    $.fn.dragPlugin = function(option){
        function drag(obj){
            var isLimit = obj.isLimit || false,
                parentNode = obj.currentNode.offsetParent,
                currentNode = obj.currentNode,
                startDrag = obj.startDrag,
                onDrag = obj.onDrag,
                endDrag = obj.endDrag,
                limitX = obj.limitX || false,
                limitY = obj.limitY || false,
                retObj ={},
                x = 0,
                y = 0;
            $(currentNode).bind('mousedown',function(e){
                //绑定事件
                var e = e || window.event,
                    _x= e.pageX || e.x,
                    _y = e.pageY || e.y,
                    bdWidth=[],
                    dx = 0,dy =0;
                bdWidth =[
                    parseInt($(parentNode).css('borderTopWidth')),
                    parseInt($(parentNode).css('borderRightWidth')),
                    parseInt($(parentNode).css('borderBottomWidth')),
                    parseInt($(parentNode).css('borderLeftWidth'))
                ];
                //移动对象的原点坐标（相对于document.body）
                var origin = [
                        parentNode.offsetLeft,
                        parentNode.offsetTop,
                        parentNode.offsetWidth-bdWidth[1]-bdWidth[3],
                        parentNode.offsetHeight-bdWidth[0]-bdWidth[2]
                    ],//定义新的原点坐标x,y,w,h
                    mousePos = [_x-origin[0],_y-origin[1]],                      //鼠标点击相对原点坐标
                    curPos = [
                        currentNode.offsetLeft,
                        currentNode.offsetTop,
                        currentNode.offsetWidth,
                        currentNode.offsetHeight
                    ],     //移动对象相对于原点坐标x,y,w,h
                    limitSection = [
                        'notLimit',
                        'notLimit',
                        'notLimit',
                        'notLimit'
                    ];            //对象可以移动的区域minX,maxX,minY,maxY
                if(startDrag && typeof startDrag == 'function'){
                    retObj = startDrag(currentNode,curPos);
                    if(retObj){
                        limitX = (retObj.limitX == undefined)?limitX:retObj.limitX;
                        limitY = (retObj.limitY == undefined)?limitY:retObj.limitY;
                        isLimit = (retObj.isLimit == undefined)?isLimit:retObj.isLimit;
                    }
                }
                dx = mousePos[0] - curPos[0];
                dy = mousePos[1] - curPos[1];
                if(limitX){                 //根据给定的区域来定义初始化limitSection
                    if(limitX[0] != undefined){
                        limitSection[0] = limitX[0];
                    }
                    if(limitX[1] != undefined){
                        limitSection[1] = limitX[1];
                    }
                }
                if(limitY){
                    if(limitY[0] != undefined){
                        limitSection[2] = limitY[0];
                    }
                    if(limitY[1] != undefined){
                        limitSection[3] = limitY[1];
                    }
                }
                if(isLimit){ //判断是否要限制在父级元素中
                    for(var i=0; i<limitSection.length; i++){
                        if(limitSection[i] == 'notLimit'){
                            switch (i){
                                case 0:
                                    limitSection[i] = 0;
                                    break;
                                case 1:
                                    limitSection[i] = origin[2] - curPos[2];
                                    break;
                                case 2:
                                    limitSection[i] = 0;
                                    break;
                                case 3:
                                    limitSection[i] =  origin[3] - curPos[3];
                                    break;
                            }
                        } else {
                            switch (i){
                                case 0:
                                    limitSection[i] = Math.max(limitSection[i],limitX[0]);
                                    break;
                                case 1:
                                    limitSection[i] = Math.min(limitSection[i],limitX[1]);
                                    break;
                                case 2:
                                    limitSection[i] = Math.max(limitSection[i],limitY[0]);
                                    break;
                                case 3:
                                    limitSection[i] = Math.min(limitSection[i],limitY[1]);
                                    break;
                            }
                        }
                    }
                }
                var moumove = function(e){
                    var e = e || window.event,
                        _x= (e.pageX || e.x) -origin[0],
                        _y =(e.pageY || e.y) - origin[1];
                    x = _x - dx;
                    y = _y - dy;
                    for(var i=0;i<limitSection.length;i++){
                        if(limitSection[i] != 'notLimit'){
                            switch (i){
                                case 0:
                                    x = Math.max(x,limitSection[i]);
                                    break;
                                case 1:
                                    x = Math.min(x,limitSection[i]);
                                    break;
                                case 2:
                                    y = Math.max(y, limitSection[i]);
                                    break;
                                case 3:
                                    y = Math.min(y, limitSection[i]);
                                    break;
                            }
                        }
                    }
                    $(currentNode).css({
                        'left':x,
                        'top':y
                    });
                    if(onDrag && typeof onDrag == 'function'){
                        onDrag(currentNode,[x,y]);
                    }
                    return false;
                };
                $(document).bind('mousemove',moumove);
                var mouup = function(){
                    if(endDrag && typeof endDrag == 'function'){
                        endDrag(currentNode,[x,y]);
                    }
                    $(document).unbind('mousemove',moumove);
                    $(document).unbind('mouseup',mouup);
                };
                $(document).bind('mouseup',mouup);
                return false;
            });
        }
        option = $.extend({}, $.fn.dragPlugin.defaults,option);
        return this.each(function(){
            option.currentNode = this;
            drag(option);
        });
    }
    $.fn.dragPlugin.defaults = {
        isLimit: false
    };
})(jQuery);