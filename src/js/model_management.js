/*
    ** 主要用于模型管理：包括保存与创建等
*/



/*
    保存当前画布中的所有 layers 和 blocks （div 以及 对应的参数 ， style），返回对应的数组
    保存所有层，包含 div，以及对应的参数和 style
    最后所有层保存到一个数组中
*/
function save_objs_in_canvas(){
    // 创建保存层的数组，其中每个层为数组的一个元素
    let objs_json_array = [];
    let layers_list = document.getElementsByClassName('layer_in_canvas');
    let blocks_list = document.getElementsByClassName('block_in_canvas');

    // 保存所有 layers
    for(let layerIndex = 0, layerslistLen = layers_list.length; layerIndex < layerslistLen; layerIndex++){
        // 更新其 style 属性，只有保存模型的时候需要记录这些信息，所以前面不用更新
        let layer_str = layers_list[layerIndex].getElementsByClassName("layer_json_data")[0].innerHTML;

        // 获取对应的 json
        let layer_json = JSON.parse(layer_str);

        // 更新 style
        layer_json["style"] = $("#" + layer_json["Layer_ID"]).attr("style");

        // 添加到数组
        objs_json_array.push(layer_json);
    }

    // 保存所有 blocks
    for(let blockIndex = 0, blockslistLen = blocks_list.length; blockIndex < blockslistLen; blockIndex++){
        // 更新其 style 属性，只有保存模型的时候需要记录这些信息，所以前面不用更新
        let block_str = blocks_list[blockIndex].getElementsByClassName("layer_json_data")[0].innerHTML;

        // 获取对应的 json
        let block_json = JSON.parse(block_str);

        // 更新 style
        block_json["style"] = $("#" + block_json["Layer_ID"]).attr("style");

        // 添加到数组
        objs_json_array.push(block_json);
    }

    // 返回最后的数组对应的字符串
    return JSON.stringify(objs_json_array);
}



/*
    返回所有连接
    要注意的是，json 中数据存储可能用散列表，所以键值不能重复，因此，可以用数字作为键值
*/
function save_connections(){
    // 保存连接的数组
    let conncetions_json_array = [];

    // 获取所有连接
    let all_conns = jsPlumb_Instance.getConnections();

    // 遍历每个连接
    for(connIndex in all_conns){  // 迭代获取的是索引
        let tmp = {}
        tmp["sourceId"] = all_conns[connIndex].sourceId;  // 源节点
        tmp["targetId"] = all_conns[connIndex].targetId;  // 目标节点

        // 存入数组
        conncetions_json_array.push(tmp);
    }

    // 返回最后的数组对应的字符串
    return JSON.stringify(conncetions_json_array);
}



/*
    加载模型：通过 json 数组重建模型
    saved_layers_str 即为保存好的所有层构成的 JSON 数组对应的字符串
*/
let oldId2newId = {};  // 用于存储旧的 id 和新的 id 的对照

function load_objs_in_canvas(saved_objs_str){
    // 每次加载之前，首先清空之前的 oldId2newId
    oldId2newId = {};

    // 获取 json 数组
    let saved_objs_array = JSON.parse(saved_objs_str);

    // 依次取出每个 obj
    for(let index = 0, len = saved_objs_array.length; index < len; index++){
        // 先深度拷贝当前层
        let curObj = JSON.parse(JSON.stringify(saved_objs_array[index]));

        // 根据当前的 Cur_Layer_Index 来更新所保存的层的编号
        let ObjIdTmp = "";
        if(saved_objs_array[index]["type"] == "Layer"){
            ObjIdTmp = saved_objs_array[index]["name"] + "_layer_" + Cur_Layer_Index++;
        }else if(saved_objs_array[index]["type"] == "Block"){
            ObjIdTmp = saved_objs_array[index]["name"] + "_block_" + Cur_Layer_Index++;
        }

        // 更新编号
        saved_objs_array[index]["Layer_ID"] = ObjIdTmp;
        // 创建对照表
        oldId2newId[curObj["Layer_ID"]] = ObjIdTmp; 

        if(saved_objs_array[index]["type"] == "Layer"){
            // 重建 div
            $("#workspace_canvas").append(
                '<div class="layer_in_canvas" id="' + ObjIdTmp + '" style="' + saved_objs_array[index]["style"] + '">' + 
                    '<div class="outShape"></div>' + 
                    '<div class="layer_id_info">' + ObjIdTmp + '</div>' + 
                    '<div class="layer_svg"> <img src="' + saved_objs_array[index]["icon"] + '" width="45px" height="45px"/> </div>' + 
                    '<div class="layer_name">' + saved_objs_array[index]["name"] + '</div>' +                 
                    '<div class="layer_json_data" style="display:none"></div>' + 
                "</div>"
            );
        }else if(saved_objs_array[index]["type"] == "Block"){
            // 重建 div
            $("#workspace_canvas").append(
                '<div class="block_in_canvas" id="' + ObjIdTmp + '" style="' + saved_objs_array[index]["style"] + '">' + 
                    '<div class="outShape"></div>' + 
                    '<div class="layer_id_info">' + ObjIdTmp + '</div>' + 
                    '<div class="layer_svg"> <img src="' + saved_objs_array[index]["icon"] + '" width="45px" height="45px"/> </div>' + 
                    '<div class="layer_name">' + saved_objs_array[index]["name"] + '</div>' +                 
                    '<div class="layer_json_data" style="display:none"></div>' + 
                "</div>"
            );
        }

        // 将信息保存于对应 div 内部，便于下一次管理
        $("#" + ObjIdTmp + " .layer_json_data")[0].innerHTML = JSON.stringify(saved_objs_array[index]);

        // 连接的端点
        jsPlumb_Instance.addEndpoint(ObjIdTmp, sourceOption);
        jsPlumb_Instance.addEndpoint(ObjIdTmp, targetOption);

        // 设置拖拽等属性
        $("#" + ObjIdTmp).draggable({
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

    // 1. 清空 prev 和 next
    // 2. 更新 MaxUnpool 层对应的 indices_from 字段
    let layerslist = document.getElementsByClassName('layer_in_canvas');
    for(let layerIndex = 0, layerslistLen = layerslist.length; layerIndex < layerslistLen; layerIndex++){  // 遍历所有层
        // 更新其 style 属性，只有保存模型的时候需要记录这些信息，所以前面不用更新
        let layer_str = $(".layer_in_canvas")[layerIndex].getElementsByClassName("layer_json_data")[0].innerHTML;
        // 获取对应的 json
        let layer_json = JSON.parse(layer_str);

        let layerId = layer_json["Layer_ID"];

        // 如果为 MaxUnpool 相关层，则重定向 indices_from 字段
        if(layerId.substring(0,9) == "MaxUnpool"){
            if(layer_json["extra_input"]["indices_from"] != ""){
                layer_json["extra_input"]["indices_from"] = oldId2newId[layer_json["extra_input"]["indices_from"]];
            }
        }

        // 清空 prev 和 next
        // 必须步骤，因为后续连接重建的时候，触发连接事件，而在该事件中，将会更新 prev 和 next 字段（push）
        layer_json["prev"] = [];
        layer_json["next"] = [];

        // 更新 style
        $(".layer_in_canvas")[layerIndex].getElementsByClassName("layer_json_data")[0].innerHTML = JSON.stringify(layer_json);
    }

    // 1. 清空 prev 和 next
    // 2. 更新 MaxUnpool 层对应的 indices_from 字段
    let blockslist = document.getElementsByClassName('block_in_canvas');
    for(let blockIndex = 0, blockslistLen = blockslist.length; blockIndex < blockslistLen; blockIndex++){  // 遍历所有层
        // 更新其 style 属性，只有保存模型的时候需要记录这些信息，所以前面不用更新
        let block_str = $(".block_in_canvas")[blockIndex].getElementsByClassName("layer_json_data")[0].innerHTML;
        // 获取对应的 json
        let block_json = JSON.parse(block_str);

        // 清空 prev 和 next
        // 必须步骤，因为后续连接重建的时候，触发连接事件，而在该事件中，将会更新 prev 和 next 字段（push）
        block_json["prev"] = [];
        block_json["next"] = [];

        // 更新 style
        $(".block_in_canvas")[blockIndex].getElementsByClassName("layer_json_data")[0].innerHTML = JSON.stringify(block_json);
    }
}



/*
    重建连接
*/
function restore_connections(saved_conncetions_str){
    // 解析出所保存的连接
    let saved_connections_array = JSON.parse(saved_conncetions_str);

    for(let index = 0, len = saved_connections_array.length; index < len; index++){
        jsPlumb_Instance.connect({
            source : oldId2newId[saved_connections_array[index]["sourceId"]],
            target : oldId2newId[saved_connections_array[index]["targetId"]],
            anchors:["TopCenter", "BottomCenter" ],
        });
    }
}