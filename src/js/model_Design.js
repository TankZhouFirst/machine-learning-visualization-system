/*
    ** 绘图区模型构建相关动作
    ** 主要用到 jsPlumb 等相关库的 API
*/



/*
    由于绘图过程中，会不断从列表中拖拽添加新的层，如何区分呢？
    思路是根据一个全局 counter 进行动态计数，最后各层的 id 即为：layer_name + Cur_Layer_Index
*/
var Cur_Layer_Index = 0;



/*
    首先创建一个 jsPlumb 对象，用于绘图
    jsPlumb 只有等到 DOM 初始化完成之后才能使用
    在创建 jsPlumb 对象的同时，设置其默认属性，全局有效
*/
var jsPlumb_Instance = jsPlumb.getInstance({
    /***********  其他属性  ***********/
    // Anchor : "BottomCenter",
    Anchors : [ null, null ],
    ConnectionsDetachable   : true,

    /***********  连线属性  ***********/
    // 设置链接线的形状，可以自行查找所有属性，Straight 表示直线
    //连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
    Connector : ["Flowchart", {stub: 30, gap: 0, coenerRadius: 0, alwaysRespectStubs: true, midpoint: 0.5, stroke: "#698B69", strokeWidth: 4 }],
    

    // 设定 jsplumb 容器，即绘图区
    Container: "workspace_canvas",     // 设置绘图区所处容器，这里将绘图区放在 workspace_canvas div 内
    DoNotThrowErrors  : false,         // 不知道干嘛的

    // 拖拽属性
    DragOptions: { cursor: "pointer", zIndex: 2000 },   // 可通过 jsPlumb.draggable 配置
    DropOptions : { },

    // 端点属性
    Endpoint : ["Dot",{ cssClass: "endpointcssClass"}],
    Endpoints : [ null, null ],
    EndpointOverlays : [ ],
    EndpointStyle : { fill : "#458B74", radius: 6},
    EndpointStyles : [ null, null ],
    EndpointHoverStyle : { fill : "#458B74", radius: 9},
    EndpointHoverStyles : [ null, null ],

    // 连线属性
    HoverPaintStyle : { strokeWidth : 6},
    LabelStyle : { color : "black" },
    LogEnabled : false,

    // 设置 connection 连线的属性
    ConnectionOverlays:[
        // 设置前向箭头属性
        [
            "Arrow", {
                location: 1,     // 箭头放在线的终点
                visible:true,    // 可见
                width:15,        // 箭头的宽度
                length:15,       // 箭头的长度
                direction:1,     // 箭头的指向，1 表示指向终点
                id:"arrow_forwards",  // 箭头的 id
            }
        ],

        /*
        // 这一段似乎不需要。如果需要双向箭头，这个是需要的。
        // 设置反向箭头属性
        [
            "Arrow", {
        	    location: 0,     // 箭头放在线的起点
        	    visible:true,    // 可见
        	    width:15,        // 箭头的宽度
        	    length:15,       // 箭头的长度
        	    direction:-1,     // 箭头的指向，-1 表示指向起点
        	    id:"arrow_backwards",  // 箭头的 id
        	}
        ],*/

        // 设置 label 的属性（连线上标识）
        [ "Label", {
            location: 0.5,        // 连线中间位置
            id: "label",          // 连线 id
            cssClass: "aLabel"    // ？？？
        }]       
    ],

    MaxConnections : -1,          // 端点最大连接数， -1 表示不限制
    PaintStyle : { strokeWidth : 4, stroke : "#458B74" },     // 一般模式下，连线属性
    ReattachConnections : false,
    RenderMode : "svg",
    Scope : "plant_canvas",
});


/*
    连线目标端点的属性
*/
var targetOption = {
    // 将 isSource 和 isTarget 设置成 true，那么就可以用户在拖动时，自动创建链接
    isSource:false,    // 不可作为源
    isTarget:true,     // 可作为终点
    
    anchor:"BottomCenter",  // 只能从底部的中点作为终点
}


/*
    连线目标端点的属性
*/
var sourceOption = {
    isSource:true,    // 可作为源
    isTarget:false,   // 不可作为终点
    
    anchor:"TopCenter",   // 只能从顶部的中点作为源点
}



/*
    绘图区缩放功能，未研究透彻，不要擅自更改
*/
_.defer(function(){
    $panzoom_region = $("#top_container").find('#workspace_canvas')
        // .panzoom 表示插件初始化
        .panzoom({
            // 绑定到前面的对应 id 的 button，通过 button 实现缩放
            $zoomIn: $('#zoom-in'),
            $zoomOut: $('#zoom-out'),

            // min and max zoom scales
            minScale: 0.05,      // 5%
            maxScale: 2.0,       // 200%
            // The increment at which to zoom
            increment: 0.1,      // 10%
            // Default cursor style for the element
            cursor: "",
            ignoreChildrensEvents:true,
        })
        // Fired when the user starts a move or pinch zoom gesture on mobile
        // 点击左键，开始拖动画布时，执行该事件
        .on("panzoomstart",function(e,pz,ev){
            $panzoom_region.css("cursor","move");    // 拖动画布时的手型
        })
        // This event is fired when the user finishes a move or finishes a pinch zoom gesture on mobile. 
        // All properties from the original click or touch event that ended the Panzoom transaction are passed through, 
        // including the event target
        // 释放左键，拖动画布结束时，执行该操作
        .on("panzoomend",function(e,pz){
            $panzoom_region.css("cursor","");
        });
    
    $panzoom_region.parent()
        // 滚动鼠标滚轮时，执行该操作
        .on('mousewheel.focal', function( e ) {
            // 如果按下 ctrl 按键
            if(e.ctrlKey || e.originalEvent.ctrlKey)
            {
                e.preventDefault();
                var delta = e.delta || e.originalEvent.wheelDelta;
                var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;

                // zoom( [scale[, opts]] )
                //      scale {Number|Boolean}: The exact scale to which to zoom or a boolean indicating to transition a zoom out
                $panzoom_region.panzoom('zoom', zoomOut, {
                    animate: true,
                    exponential: false,
                });
            }
            else{
                e.preventDefault();
                var deltaY = e.deltaY || e.originalEvent.wheelDeltaY || (-e.originalEvent.deltaY);
                var deltaX = e.deltaX || e.originalEvent.wheelDeltaX || (-e.originalEvent.deltaX);
                // Moves the element deltaX/2 pixels right and deltaY/2 pixels down from its current position`
                $panzoom_region.panzoom("pan",deltaX/2,deltaY/2,{
                    animate: true,
                    relative: true,
                });
            }
        })
        // 按住左键，开始拖动目标时，触发的动作
        .on("mousedown touchstart",function(ev){
            // ***   $elem.panzoom("getMatrix");
            // Retrieve an array of values for the specified transform or for the current transform on the Panzoom element
            // var matrix = $("#top_container").find("#workspace_canvas .div").panzoom("getMatrix");
            var matrix = $("#top_container").find("#workspace_canvas").panzoom("getMatrix");
            var offsetX = matrix[4];
            var offsetY = matrix[5];
            var dragstart = {x:ev.pageX,y:ev.pageY,dx:offsetX,dy:offsetY};
            $(ev.target).css("cursor","move");
            $(this).data('dragstart', dragstart);
        })
        // 单纯的移动鼠标时，触发的事件
        .on("mousemove touchmove", function(ev){
            var dragstart = $(this).data('dragstart');

            if(dragstart)
            {
                
                // 拖动目标时，触发的动作
                var deltaX = dragstart.x-ev.pageX;
                var deltaY = dragstart.y-ev.pageY;
                // $elem.panzoom("getMatrix");
                // Retrieve an array of values for the specified transform or for the current transform on the Panzoom element
                var matrix = $("#top_container").find("#workspace_canvas").panzoom("getMatrix");

                matrix[4] = parseInt(dragstart.dx)-deltaX;
                matrix[5] = parseInt(dragstart.dy)-deltaY;
                // Sets the transform matrix of the Panzoom element. It accepts the matrix as an array
                // Flip the element upside down，如下所示
                // ******     elem.panzoom("setMatrix", [ 1, 0, 0, -1, 0, 0 ]);
                $("#top_container").find("#workspace_canvas").panzoom("setMatrix",matrix);
                jsPlumb_Instance.setZoom(matrix[0]);
            }
        })
        // 按住左键，开始拖动目标结束时，触发的动作
        .on("mouseup touchend touchcancel", function(ev){
            $(this).data('dragstart',null);
            $(ev.target).css("cursor","");
        });
});



/*
    从侧边栏拖拽 obj 后，放置到画板区，需要创建对应的模型
    obj_dom ：被拖拽的模型
    canvas_region：模型将要创建的区，即这里的画布
    ** 需要针对 layers ， blocks， Models 分别处理 **
*/
function Create_Obj_in_canvas(obj_dom, canvas_region){
    let ObjName = $(obj_dom.draggable).attr("id");
    let ObjType = $("#" + ObjName + " .layerClass")[0].innerHTML;

    if(ObjType == "Layer"){
        create_Layer(obj_dom, canvas_region);
    }else if(ObjType == "Block"){
        create_Block(obj_dom, canvas_region);
    }else{
        create_Model(obj_dom, canvas_region)
    }
}



/*
    创建 layers
*/
function  create_Layer(obj_dom, canvas_region){
    // 1. 获取被拖拽的 obj 的名称
    let LayerName = $(obj_dom.draggable).attr("id");
    
    // 2. 动态更新权值参数以及 recent layers（只对 layers 进行）
    Update_Recent_Layers_List(LayerName);

    // 3. 创建 layer 的 dom（由于代码中 return 语句的使用，所以必须放在最后）
    let cur_layer_id = "";    // 首先创建该层的 id
    let layer_info = {};      // 读取各个元素的对应必要信息，保存到元素对应的 div 内，便与修改和维护
    let layer_info_str = "";  // 用于保存 obj 的相关信息

    // 获取该层对应的 metaData 名和类别
    let metaData_str = $("#" + LayerName + " .layerMetaClass")[0].innerHTML;   // 该层所在的 metaData 名
    let layer_index = $("#" + LayerName + " .layerIndex")[0].innerHTML;        // 该层在 metaData 中对应的索引
    let layer_Type = $("#" + LayerName + " .layerClass")[0].innerHTML;         // 该层的类型

    // 创建 id
    cur_layer_id = LayerName + "_layer_" + Cur_Layer_Index++;

    /*************************** 创建 dom ***************************/
    // 读取该层对应的各种信息
    layer_info["metaName"] = metaData_str;                                           // 所属的 metaData 的名称
    layer_info["type"]     = layer_Type;                                             // 层的类别
    layer_info["name"]     = LayerName;                                              // 层的名称
    layer_info["keyWord"]  = window[metaData_str][layer_index][LayerName].keyWord;   // 层的 id
    layer_info["icon"]     = window[metaData_str][layer_index][LayerName].icon;      // icon
    layer_info["api"]      = window[metaData_str][layer_index][LayerName].api;       // 对应的 api
        
    layer_info["style"]    = "";                                                     // 层的 css
    layer_info["Layer_ID"] = cur_layer_id;                                           // 层的 id
    layer_info["outShape"] = [];                                                     // 该层的输出尺寸
        
    layer_info["prev"]     = [];                                                     // 输出到该层的层列表
    layer_info["next"]     = [];                                                     // 该层输出到的列表    
        
    layer_info["params"]   = window[metaData_str][layer_index][LayerName].params;    // 该层的函数所有参数
    layer_info["funcs"]    = window[metaData_str][layer_index][LayerName].funcs;     // 该层的所有函数列表
        
    // 如果是 maxunpool 层，则需要额外的输入字段
    if(LayerName.substring(0,9) == "MaxUnpool"){
        layer_info["extra_input"] = window[metaData_str][layer_index][LayerName].extra_input;
    }

    // 创建对应的 div
    $(canvas_region).append(
        '<div class="layer_in_canvas" id="' + cur_layer_id + '">' + 
            '<div class="outShape"></div>' + 
            '<div class="layer_id_info">' + cur_layer_id + '</div>' +
            '<div class="layer_svg"> <img src="' + layer_info["icon"] + '" width="45px" height="45px"/> </div>' + 
            '<div class="layer_name">' + LayerName + '</div>' +                 
            '<div class="layer_json_data" style="display:none"></div>' +  // 这个一定要放在最后面
        "</div>"
    );

    // 动态修改当前 id 层的 css
    // parseInt(layer_model.offset.left)  表示模型拖拽后放置点的 left
    $("#" + cur_layer_id).css("position","absolute").css("left",parseInt(obj_dom.offset.left)).css("top",parseInt(obj_dom.offset.top));
    
    // 修改 style
    layer_info["style"] = $("#" + cur_layer_id).attr("style");
    
    // 将 json 转换为 str
    layer_info_str = JSON.stringify(layer_info);
    
    // 将层的所有信息保存到对应的 div 中，便与后续操作
    $("#" + cur_layer_id + " .layer_json_data")[0].innerHTML = layer_info_str;

    /*************************** 创建 js 连接点 ***************************/
    // 添加连接点,这样拖拽过程会自动切换连接最近的端点
    // jsPlumb.addEndpoint(a,b,c)，b,c(可选)
    //      a : 要添加端点的 div 的 id
    //      b : 设置端点放置的位置，("TopCenter","RightMiddle","BottomCenter","LeftMiddle")
    //      c : 端点和连接线的样式,    
    // 还可以同时添加多个 endpoints，c(可选)
    // sPlumb.addEndpoints(a,b,c)
    //      a : a:要添加端点的 div 的 id
    //      b : 含端点的构造函数参数的对象列表
    //      c : 端点和连接线的样式,
    // instance.addEndpoint(id, { anchors: "RightMiddle" }, hollowCircle);    // 右中
    // instance.addEndpoint(id, { anchors: "LeftMiddle" }, hollowCircle);     // 左中
    jsPlumb_Instance.addEndpoint(cur_layer_id, sourceOption);      // 上中
    jsPlumb_Instance.addEndpoint(cur_layer_id, targetOption);      // 下中
    
    Is_Module_Valid();

    /*************************** 设置可拖拽属性 ***************************/
    // 注册实体可draggable
    $("#" + cur_layer_id).draggable({
        // containment: "parent",    // 默认情况下，节点可以移动到所有位置，通过设置 containment 为其父节点，该方块将只能在父容器内移动
        // grid:[10,10], // 设置每次移动的距离
    
        start: function(e,ui){   // 开始状态
            var pz = $("#top_container").find("#workspace_canvas");
            // $elem.panzoom("getMatrix");
            // Retrieve an array of values for the specified transform or for the current transform on the Panzoom element
            currentScale = pz.panzoom("getMatrix")[0];    // 当前缩放度
            $(this).css("cursor","move");
            // Quickly disable Panzoom on the element
            pz.panzoom("disable");    // 移动元素时，禁止缩放功能
        },
        drag:function(e,ui){   // 拖拽移动时
            // 如果不带这一句，节点不会跟着元素一起移动。加上之后节点才会跟随标签移动。至此，最基础的 JsPlumb 连线就完成了
            jsPlumb_Instance.repaintEverything();
    
            ui.position.left = ui.position.left /currentScale;
            ui.position.top = ui.position.top / currentScale;
            if($(this).hasClass("jsplumb-connected"))
            {
                jsPlumb_Instance.repaint($(this).attr('id'), ui.position);
            }
        },
        stop: function(e,ui){   // 停止时
            jsPlumb_Instance.repaintEverything();
    
            if($(this).hasClass("jsplumb-connected"))
            {
                    jsPlumb_Instance.repaint($(this).attr('id'),ui.position);
            }
    
            // 结束后，恢复鼠标形状
            $(this).css("cursor","");
            // Re-enable Panzoom on the element (re-binds all events).
            $("#top_container").find("#workspace_canvas").panzoom("enable");   // 移动元素结束后，重新启用缩放功能
        }
    });
}



/*
    创建 blocks
*/
function  create_Block(obj_dom, canvas_region){
    // 1. 获取被拖拽的 obj 的名称
    let BlockName = $(obj_dom.draggable).attr("id");

    // 3. 创建 block 的 dom（由于代码中 return 语句的使用，所以必须放在最后）
    let cur_block_id = "";    // 首先创建该层的 id
    let block_info = {};      // 读取各个元素的对应必要信息，保存到元素对应的 div 内，便与修改和维护
    let block_info_str = "";  // 用于保存 obj 的相关信息

    // 获取该层对应的 metaData 名和类别
    let metaData_str = $("#" + BlockName + " .layerMetaClass")[0].innerHTML;   // 该层所在的 metaData 名
    let block_index = $("#" + BlockName + " .layerIndex")[0].innerHTML;        // 该层在 metaData 中对应的索引
    let block_Type = $("#" + BlockName + " .layerClass")[0].innerHTML;         // 该层的类型

    // 创建 id
    cur_block_id = BlockName + "_block_" + Cur_Layer_Index++;

    let Common_Blocks_metaData = JSON.parse(window.localStorage.getItem('Common_Blocks'));

    /*************************** 创建 dom ***************************/
    // 读取该层对应的各种信息
    block_info["metaName"] = metaData_str;                                             // 所属的 metaData 的名称
    block_info["type"]     = block_Type;                                               // 层的类别
    block_info["name"]     = BlockName;                                                // 层的名称
    block_info["keyWord"]  = Common_Blocks_metaData[block_index][BlockName].keyWord;   // 层的 id
    block_info["icon"]     = Common_Blocks_metaData[block_index][BlockName].icon;      // icon
    block_info["api"]      = "";                                                       // 对应的 api
        
    block_info["style"]    = "";                                                       // 层的 css
    block_info["Layer_ID"] = cur_block_id;                                             // 层的 id
    block_info["InShape"]  = [];                                                       // 该层的输入尺寸
    block_info["outShape"] = [];                                                       // 该层的输出尺寸
        
    block_info["prev"]     = [];                                                       // 输出到该层的层列表
    block_info["next"]     = [];                                                       // 该层输出到的列表   
        
    block_info["funcs"]    = Common_Blocks_metaData[block_index][BlockName].funcs;     // 该层的所有函数列表
    block_info["params"]   = Common_Blocks_metaData[block_index][BlockName].params;    // 该层的函数所有参数

    block_info["ClassDefineStr"] = "";                                                 // 该 block 对应的 code

    block_info["BlockDetails"] = Common_Blocks_metaData[block_index][BlockName].BlockDetails;

    // 创建对应的 div
    $(canvas_region).append(
        '<div class="block_in_canvas" id="' + cur_block_id + '">' + 
            '<div class="outShape"></div>' + 
            '<div class="layer_id_info">' + cur_block_id + '</div>' +
            '<div class="layer_svg"> <img src="' + block_info["icon"] + '" width="45px" height="45px"/> </div>' + 
            '<div class="layer_name">' + BlockName + '</div>' +                 
            '<div class="layer_json_data" style="display:none"></div>' +  // 这个一定要放在最后面
        "</div>"
    );

    // 动态修改当前 id 层的 css
    // parseInt(layer_model.offset.left)  表示模型拖拽后放置点的 left
    $("#" + cur_block_id).css("position","absolute").css("left",parseInt(obj_dom.offset.left)).css("top",parseInt(obj_dom.offset.top));
    
    // 修改 style
    block_info["style"] = $("#" + cur_block_id).attr("style");
    
    // 将 json 转换为 str
    block_info_str = JSON.stringify(block_info);
    
    // 将层的所有信息保存到对应的 div 中，便与后续操作
    $("#" + cur_block_id + " .layer_json_data")[0].innerHTML = block_info_str;

    /*************************** 创建 js 连接点 ***************************/
    // 添加连接点,这样拖拽过程会自动切换连接最近的端点
    // jsPlumb.addEndpoint(a,b,c)，b,c(可选)
    //      a : 要添加端点的 div 的 id
    //      b : 设置端点放置的位置，("TopCenter","RightMiddle","BottomCenter","LeftMiddle")
    //      c : 端点和连接线的样式,    
    // 还可以同时添加多个 endpoints，c(可选)
    // sPlumb.addEndpoints(a,b,c)
    //      a : a:要添加端点的 div 的 id
    //      b : 含端点的构造函数参数的对象列表
    //      c : 端点和连接线的样式,
    // instance.addEndpoint(id, { anchors: "RightMiddle" }, hollowCircle);    // 右中
    // instance.addEndpoint(id, { anchors: "LeftMiddle" }, hollowCircle);     // 左中
    jsPlumb_Instance.addEndpoint(cur_block_id, sourceOption);      // 上中
    jsPlumb_Instance.addEndpoint(cur_block_id, targetOption);      // 下中
    
    Is_Module_Valid();

    /*************************** 设置可拖拽属性 ***************************/
    // 注册实体可draggable
    $("#" + cur_block_id).draggable({
        // containment: "parent",    // 默认情况下，节点可以移动到所有位置，通过设置 containment 为其父节点，该方块将只能在父容器内移动
        // grid:[10,10], // 设置每次移动的距离
    
        start: function(e,ui){   // 开始状态
            var pz = $("#top_container").find("#workspace_canvas");
            // $elem.panzoom("getMatrix");
            // Retrieve an array of values for the specified transform or for the current transform on the Panzoom element
            currentScale = pz.panzoom("getMatrix")[0];    // 当前缩放度
            $(this).css("cursor","move");
            // Quickly disable Panzoom on the element
            pz.panzoom("disable");    // 移动元素时，禁止缩放功能
        },
        drag:function(e,ui){   // 拖拽移动时
            // 如果不带这一句，节点不会跟着元素一起移动。加上之后节点才会跟随标签移动。至此，最基础的 JsPlumb 连线就完成了
            jsPlumb_Instance.repaintEverything();
    
            ui.position.left = ui.position.left /currentScale;
            ui.position.top = ui.position.top / currentScale;
            if($(this).hasClass("jsplumb-connected"))
            {
                jsPlumb_Instance.repaint($(this).attr('id'), ui.position);
            }
        },
        stop: function(e,ui){   // 停止时
            jsPlumb_Instance.repaintEverything();
    
            if($(this).hasClass("jsplumb-connected"))
            {
                    jsPlumb_Instance.repaint($(this).attr('id'),ui.position);
            }
    
            // 结束后，恢复鼠标形状
            $(this).css("cursor","");
            // Re-enable Panzoom on the element (re-binds all events).
            $("#top_container").find("#workspace_canvas").panzoom("enable");   // 移动元素结束后，重新启用缩放功能
        }
    });

}



/*
    创建 models
*/
function  create_Model(obj_dom, canvas_region){
    if(confirm("Current canvas will be cleaned before importing model, click ok to import model or cancel to quit")){   // 清空当前绘图区
        // 初始化各种变量
        Prev_Canvas_Stack = [];
        Prev_Stack_Len = 0;
        Cur_Canvas_Name = ""
        Init_Layer_Index = 0;
        Cur_Block_Id = "";
        Class_Code_Counter = 0;
        Block_Api = "";

        Cur_Layer_Index = 0;
        cur_id_param_box = "";
        cur_canvas_mode_counter = 0;
           
        clearCanvas();
    }else{    // 直接退出
        return;
    }

    let Common_Models_metaData = JSON.parse(window.localStorage.getItem('Common_Models'));
    let index = parseInt(obj_dom.draggable[0].getElementsByClassName("layerIndex")[0].innerHTML);

    for(let item in Common_Models_metaData[index]){
        document.getElementById('canvas_title').value = Common_Models_metaData[index][item].name;

        let SavedLayers = Common_Models_metaData[index][item]["ModelDetails"]["ModelLayers"];
        let SavedConns  = Common_Models_metaData[index][item]["ModelDetails"]["ModelConnections"];

        load_objs_in_canvas(SavedLayers);
        restore_connections(SavedConns);
    }

    document.getElementById('model_edit_group').style.display = 'block';
    document.getElementById('block_edit_group').style.display = 'none';
    document.getElementById('edit_block_in_model_group').style.display = 'none';
    document.getElementById('canvas_mode_change').style.display = 'block';
    document.getElementById('clean_canvas').style.display = 'block';
    document.getElementById('Canvas_mode').style.display = 'block';

    // input 设置名称以及只读
    document.getElementById('canvas_title').disabled = false;
}



/*
    当鼠标移动到 workspace_canvas 中的 layer_in_canvas 时，会自动添加 x 按钮
*/
$("#workspace_canvas").on("mouseenter", ".layer_in_canvas", function(){
    $(this).append('<span><img class="delete_icon" src="resources/cross.png"  style="position: absolute;" width="25px" height="25px" /> </span>');
    $("img").css("right", 10).css("top", 10);
    $("#" + $(this)[0].id + " .layer_id_info").css("color", "rgba(0,0,0,1)");
});



/*
    当鼠标移动到 workspace_canvas 中的 block_in_canvas 时，会自动添加 x 按钮
*/
$("#workspace_canvas").on("mouseenter", ".block_in_canvas", function(){
    $(this).append('<span><img class="delete_icon" src="resources/cross.png"  style="position: absolute;" width="25px" height="25px" /> </span>');
    $("img").css("right", 10).css("top", 10);
    $("#" + $(this)[0].id + " .layer_id_info").css("color", "rgba(0,0,0,1)");
});



/*
    鼠标移走图片（删除符号）会消失
    为什么用 on() 事件委托。因为 <img /> 是后添加进来的元素，前面页面已经完成了初始化，所以你用$("img")根本找不到这个元素
*/
$("#workspace_canvas").on("mouseleave", ".layer_in_canvas", function () {
    // 这里删除 layer_in_canvas 类（必须加上，否则删除全局）下的 span 元素
    $(".layer_in_canvas span").remove();
    $("#" + $(this)[0].id + " .layer_id_info").css("color", "rgba(0,0,0,0)");
});



/*
    鼠标移走图片（删除符号）会消失
    为什么用 on() 事件委托。因为 <img /> 是后添加进来的元素，前面页面已经完成了初始化，所以你用$("img")根本找不到这个元素
*/
$("#workspace_canvas").on("mouseleave", ".block_in_canvas", function () {
    // 这里删除 layer_in_canvas 类（必须加上，否则删除全局）下的 span 元素
    $(".block_in_canvas span").remove();
    $("#" + $(this)[0].id + " .layer_id_info").css("color", "rgba(0,0,0,0)");
});



/*
    连接之前
    决定连线是否连接。返回 true，连接； 返回 false ，不连接
    可以用于检查两点之间连接是否已存在，若存在，则提示，并不允许连接
*/
jsPlumb_Instance.bind('beforeDrop', function (info) {
    /***************  1. 检查连接是否已存在  ***************/
    // 经过调试发现， info 实际上包含了连线的信息，比如源和目标节点的 id
    // 所以可以利用这个，在连接之前进行检查，排除避免一些错误的连接
    // 如果是 jsPlumb_Instance.getConnections()，则表示获取所有连接
    // 源到目标的连接
    let conns1 = jsPlumb_Instance.getConnections({
        source:info.sourceId,
        target:info.targetId
    });
    
    // 反向连接
    let conns2 = jsPlumb_Instance.getConnections({
        source:info.targetId,
        target:info.sourceId
    });

    // 如果已经存在连接，则：
    // 目前不支持环连接
    if(conns1.length > 0 || conns2.length > 0 ){
        // 不创建
        alert("Connection is already exist!");
        return false;
    }

    // 避免连接到同一元素
    if(info.sourceId == info.targetId){
        // 不创建
        alert("Source and target can't be the same!");
        return false;
    }

    return true;
});



/*
    监听新的连接
    每次建立新连接时，触发的操作
*/
jsPlumb_Instance.bind("connection", function (connInfo, originalEvent){   
    // 更新 source 的 next
    let sourceId_info_str = $("#" + connInfo.sourceId + " .layer_json_data")[0].innerHTML;
    let sourceId_info_json = JSON.parse(sourceId_info_str);
    // 由于前面连接之前的事件中，已经避免了重复连接的出现，所以这里不用担心或有重复的元素
    sourceId_info_json["next"].push(connInfo.targetId);
    sourceId_info_str = JSON.stringify(sourceId_info_json);
    $("#" + connInfo.sourceId + " .layer_json_data")[0].innerHTML = sourceId_info_str;

    // 更新 target 的 prev
    let targetId_info_str = $("#" + connInfo.targetId + " .layer_json_data")[0].innerHTML;
    let targetId_info_json = JSON.parse(targetId_info_str);
    // 由于前面连接之前的事件中，已经避免了重复连接的出现，所以这里不用担心或有重复的元素
    targetId_info_json["prev"].push(connInfo.sourceId);
    targetId_info_str = JSON.stringify(targetId_info_json);
    $("#" + connInfo.targetId + " .layer_json_data")[0].innerHTML = targetId_info_str;

    // 检查模型是否合法，若不合法，作出相应标志
    Is_Module_Valid();
});



/*
    删除连线时的操作
    将 dblclick 事件绑定到 jsPlumb 实例
    事件触发时，删除连接
    删除连接时，触发的事件
*/
jsPlumb_Instance.bind("dblclick", function(conn, originalEvent) {
    if(confirm("delete connection ?")){
        // 删除 source 的 next
        let sourceId_info_str = $("#" + conn.sourceId + " .layer_json_data")[0].innerHTML;
        let sourceId_info_json = JSON.parse(sourceId_info_str);

        // 删除 next 中对应的 id
        let nextList = JSON.parse(JSON.stringify(sourceId_info_json["next"]));

        for(let nextIndex = 0, nextLen = sourceId_info_json["next"].length; nextIndex < nextLen; nextIndex++){

            if(sourceId_info_json["next"][nextIndex] == conn.targetId){
                nextList.splice(nextIndex,1);
                break;
            }
        }

        sourceId_info_json["next"] = JSON.parse(JSON.stringify(nextList));
        sourceId_info_str = JSON.stringify(sourceId_info_json);
        $("#" + conn.sourceId + " .layer_json_data")[0].innerHTML = sourceId_info_str;

        
        // 删除 target 的 prev
        let targetId_info_str = $("#" + conn.targetId + " .layer_json_data")[0].innerHTML;
        let targetId_info_json = JSON.parse(targetId_info_str);

        // 删除 prev 中对应的 id
        let prevList = JSON.parse(JSON.stringify(targetId_info_json["prev"]));

        for(let prevIndex = 0, prevLen = targetId_info_json["prev"].length; prevIndex < prevLen; prevIndex++){
            if(targetId_info_json["prev"][prevIndex] == conn.sourceId){
                prevList.splice(prevIndex,1);
                break;
            }
        }

        targetId_info_json["prev"] = JSON.parse(JSON.stringify(prevList));
        targetId_info_str = JSON.stringify(targetId_info_json);
        $("#" + conn.targetId + " .layer_json_data")[0].innerHTML = targetId_info_str;

        // 删除连线
        jsPlumb_Instance.deleteConnection(conn);
        Is_Module_Valid();   // 删除连接线之后，需要重新检查
    }
});



/*
    监听连接断开
    每次拖拽断开连接后，触发的操作
*/
jsPlumb_Instance.bind("connectionDetached", function (conn, originalEvent){   
    // 删除 source 的 next
    let sourceId_info_str = $("#" + conn.sourceId + " .layer_json_data")[0].innerHTML;
    let sourceId_info_json = JSON.parse(sourceId_info_str);

    // 删除 next 中对应的 id
    let nextList = JSON.parse(JSON.stringify(sourceId_info_json["next"]));

    for(let nextIndex = 0, nextLen = sourceId_info_json["next"].length; nextIndex < nextLen; nextIndex++){

        if(sourceId_info_json["next"][nextIndex] == conn.targetId){
            nextList.splice(nextIndex,1);
            break;
        }
    }

    sourceId_info_json["next"] = JSON.parse(JSON.stringify(nextList));
    sourceId_info_str = JSON.stringify(sourceId_info_json);
    $("#" + conn.sourceId + " .layer_json_data")[0].innerHTML = sourceId_info_str;
        
    // 删除 target 的 prev
    let targetId_info_str = $("#" + conn.targetId + " .layer_json_data")[0].innerHTML;
    let targetId_info_json = JSON.parse(targetId_info_str);

    // 删除 prev 中对应的 id
    let prevList = JSON.parse(JSON.stringify(targetId_info_json["prev"]));

    for(let prevIndex = 0, prevLen = targetId_info_json["prev"].length; prevIndex < prevLen; prevIndex++){
        if(targetId_info_json["prev"][prevIndex] == conn.sourceId){
            prevList.splice(prevIndex,1);
            break;
        }
    }

    targetId_info_json["prev"] = JSON.parse(JSON.stringify(prevList));
    targetId_info_str = JSON.stringify(targetId_info_json);
    $("#" + conn.targetId + " .layer_json_data")[0].innerHTML = targetId_info_str;

    Is_Module_Valid();   // 删除连接线之后，需要重新检查
});



/*
    删除 Layer。必须先删除元素的所有节点，再删除元素
*/
$("#workspace_canvas").on("click", ".layer_in_canvas span", function () {
    if (confirm("delete layer ?")) {
        // 获取当前层的属性
        let cur_layer_id = $(this).parent().attr("id");
        let cur_layer_str = $("#" + cur_layer_id + " .layer_json_data")[0].innerHTML;
        let cur_layer_json = JSON.parse(cur_layer_str);

        // 删除该 layer 的所有 prev 的 next
        let prev_array = cur_layer_json["prev"];   // 获取所有 prev 列表

        for(let index = 0, len = prev_array.length; index < len; index++){   // 迭代 prev 列表
            let prev_layer_id = prev_array[index];    // prev layer id
            let prev_json = JSON.parse($("#" + prev_layer_id + " .layer_json_data")[0].innerHTML);   // prev layer json
            let prevNextList = JSON.parse(JSON.stringify(prev_json["next"]));

            // 删除 cur_layer_id
            for(let nextIndex = 0, nextLen = prev_json["next"].length; nextIndex < nextLen; nextIndex++){
                if(prev_json["next"][nextIndex] == cur_layer_id){
                    prevNextList.splice(nextIndex, 1);
                }
            }

            prev_json["next"] = prevNextList;
            $("#" + prev_layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(prev_json);   // 更新 prev layer
        }

        // 删除该 layer 的所有 next 的 prev
        let next_array = cur_layer_json["next"];   // 获取所有 prev 列表

        for(let index = 0, len = next_array.length; index < len; index++){   // 迭代 prev 列表
            let next_layer_id = next_array[index];    // prev layer id
            let next_json = JSON.parse($("#" + next_layer_id + " .layer_json_data")[0].innerHTML);   // prev layer json
            let nextPrevList = JSON.parse(JSON.stringify(next_json["prev"]));

            // 删除 cur_layer_id
            for(let prevIndex = 0, prevLen = next_json["prev"].length; prevIndex < prevLen; prevIndex++){
                if(next_json["prev"][prevIndex] == cur_layer_id){
                    nextPrevList.splice(prevIndex, 1);
                }
            }

            next_json["prev"] = nextPrevList;
            $("#" + next_layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(next_json);   // 更新 prev layer
        }

        // this 即当前点击的 .layer_in_canvas span
        jsPlumb_Instance.remove(cur_layer_id);
        Is_Module_Valid();   // 删除层之后，需要重新检查
    }
});



/*
    删除 Layer。必须先删除元素的所有节点，再删除元素
*/
$("#workspace_canvas").on("click", ".block_in_canvas span", function () {
    if (confirm("delete layer ?")) {
        // 获取当前层的属性
        let cur_layer_id = $(this).parent().attr("id");
        let cur_layer_str = $("#" + cur_layer_id + " .layer_json_data")[0].innerHTML;
        let cur_layer_json = JSON.parse(cur_layer_str);

        // 删除该 layer 的所有 prev 的 next
        let prev_array = cur_layer_json["prev"];   // 获取所有 prev 列表

        for(let index = 0, len = prev_array.length; index < len; index++){   // 迭代 prev 列表
            let prev_layer_id = prev_array[index];    // prev layer id
            let prev_json = JSON.parse($("#" + prev_layer_id + " .layer_json_data")[0].innerHTML);   // prev layer json
            let prevNextList = JSON.parse(JSON.stringify(prev_json["next"]));

            // 删除 cur_layer_id
            for(let nextIndex = 0, nextLen = prev_json["next"].length; nextIndex < nextLen; nextIndex++){
                if(prev_json["next"][nextIndex] == cur_layer_id){
                    prevNextList.splice(nextIndex, 1);
                }
            }

            prev_json["next"] = prevNextList;
            $("#" + prev_layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(prev_json);   // 更新 prev layer
        }

        // 删除该 layer 的所有 next 的 prev
        let next_array = cur_layer_json["next"];   // 获取所有 prev 列表

        for(let index = 0, len = next_array.length; index < len; index++){   // 迭代 prev 列表
            let next_layer_id = next_array[index];    // prev layer id
            let next_json = JSON.parse($("#" + next_layer_id + " .layer_json_data")[0].innerHTML);   // prev layer json
            let nextPrevList = JSON.parse(JSON.stringify(next_json["prev"]));

            // 删除 cur_layer_id
            for(let prevIndex = 0, prevLen = next_json["prev"].length; prevIndex < prevLen; prevIndex++){
                if(next_json["prev"][prevIndex] == cur_layer_id){
                    nextPrevList.splice(prevIndex, 1);
                }
            }

            next_json["prev"] = nextPrevList;
            $("#" + next_layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(next_json);   // 更新 prev layer
        }

        // this 即当前点击的 .layer_in_canvas span
        jsPlumb_Instance.remove(cur_layer_id);
        Is_Module_Valid();   // 删除层之后，需要重新检查
    }
});




/********************************  侧边栏 list 中 model 和 block 的管理  **********************************/

/*
    会自动添加 x 按钮
*/
$("#left_layer_menu_region_div").on("mouseenter", ".block_or_model", function(){
    $(this).append('<i><img class="delete_icon" src="resources/cross.png"  style="position: absolute;" width="25px" height="25px" /> </i>');
    $("img").css("right", 10).css("top", 10);
});



/*
    鼠标移走图片（删除符号）会消失
    为什么用 on() 事件委托。因为 <img /> 是后添加进来的元素，前面页面已经完成了初始化，所以你用$("img")根本找不到这个元素
*/
$("#left_layer_menu_region_div").on("mouseleave", ".block_or_model", function () {
    // 这里删除 layer_in_canvas 类（必须加上，否则删除全局）下的 span 元素
    $(".block_or_model i").remove();
});



/*
    删除 Layer。必须先删除元素的所有节点，再删除元素
*/
$("#left_layer_menu_region_div").on("click", ".block_or_model i", function () {
    if (confirm("Delete block/model in list?")) {
        let index = $(this).parent()[0].getElementsByClassName("layerIndex")[0].innerHTML;

        // 从 localStorage 中删除
        let listId  = $(this).parent().parent().attr("id");
        let MetaData = "";

        if(listId.split("_")[1] == "Models"){
            MetaData = JSON.parse(window.localStorage.getItem('Common_Models'));
            MetaData.splice(index,1);
            localStorage.setItem("Common_Models", JSON.stringify(MetaData));
        }else if(listId.split("_")[1] == "Blocks"){
            MetaData = JSON.parse(window.localStorage.getItem('Common_Blocks'));
            MetaData.splice(index,1);
            localStorage.setItem("Common_Blocks", JSON.stringify(MetaData));
        }

        // 从列表中删除
        $("#" + $(this).parent().attr("id")).remove();
    }
});