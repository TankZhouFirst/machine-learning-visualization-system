// 该变量用于存储当前参数弹窗对应的层 id
// 在每次双击时进行更换
var cur_id_param_box = "";



/*
    填充参数弹窗（每次填充之前，先清空）
    layer_id : 该参数表所对应的 layer 的
*/
function fill_param_form(layer_id){
    // 每次填充之前，先清空
    clear_param_form();

    // 通过 layer_id 获取原始参数
    let layer_str = $("#" + layer_id + " .layer_json_data")[0].innerHTML;
    let layer_json = JSON.parse(layer_str);
    let parmsList = layer_json["params"];

    // 利用获取的参数列表填写表单
    let form_list = "";
    for(let par in parmsList)
    {
        // "stride":"1"
        // parmsList[parm]   param 的值，如 1
        // parm 键， 如 stride
        form_list += par + ' : <input type="text" id="' + par + '" value="' + parmsList[par]["value"] + '"' +  
                                    ' placeholder="' +  parmsList[par]["type"]  + '" /> <br><br>'; 
    }

    // 生成表单
    $('#parameters_form').append(form_list);

    // 如果是 maxunpoold 层，则需要额外的输入字段
    if(layer_id.substring(0,9) == "MaxUnpool"){
        // 只有这几层才包含该字段
        let history_indices_from = layer_json["extra_input"]["indices_from"];
        let output_size = layer_json["extra_input"]["output_size"];
        // 用于保存 extra_input_form 字段的 html
        let extra_input_form = "";

        // 1. 获取所有的 MaxPool 相关层，用于创建 option 列表
        let MaxPoolIdList = [];    // 用于存储对应层的列表
        let LayerList = document.getElementsByClassName('layer_in_canvas');   // 获取所有层

        // 遍历所有层，搜索 MaxPool1d 相关
        switch(layer_id.substring(0,11)){
            case "MaxUnpool1d" : {
                for(let layerIndex = 0, listLen = LayerList.length; layerIndex < listLen; layerIndex++){
                    // 当前遍历层的 id
                    let tmpId = LayerList[layerIndex].id;
        
                    // 如果为 MaxPool1d 相关层，则添加到待选选项
                    if((tmpId.substring(0,9) == "MaxPool1d") || (tmpId.substring(0,17) == "AdaptiveMaxPool1d")){
                        if(JSON.parse($("#" + tmpId + " .layer_json_data")[0].innerHTML)["params"]["return_indices"]["value"].trim() == "True"){
                            MaxPoolIdList.push(tmpId);
                        }
                    }
                }
                break;
            }
            case "MaxUnpool2d" : {
                for(let layerIndex = 0, listLen = LayerList.length; layerIndex < listLen; layerIndex++){
                    // 当前遍历层的 id
                    let tmpId = LayerList[layerIndex].id;
        
                    // 如果为 MaxPool1d 相关层，则添加到待选选项
                    if((tmpId.substring(0,9) == "MaxPool2d") || (tmpId.substring(0,17) == "AdaptiveMaxPool2d") || (tmpId.substring(0,19) == "FractionalMaxPool2d")){
                        if(JSON.parse($("#" + tmpId + " .layer_json_data")[0].innerHTML)["params"]["return_indices"]["value"].trim() == "True"){
                            MaxPoolIdList.push(tmpId);
                        }
                    }
                }
                break;
            }
            case "MaxUnpool3d" : {
                for(let layerIndex = 0, listLen = LayerList.length; layerIndex < listLen; layerIndex++){
                    // 当前遍历层的 id
                    let tmpId = LayerList[layerIndex].id;
        
                    // 如果为 MaxPool1d 相关层，则添加到待选选项
                    if((tmpId.substring(0,9) == "MaxPool3d") || (tmpId.substring(0,17) == "AdaptiveMaxPool3d")){
                        if(JSON.parse($("#" + tmpId + " .layer_json_data")[0].innerHTML)["params"]["return_indices"]["value"].trim() == "True"){
                            MaxPoolIdList.push(tmpId);
                        }
                    }
                }
                break;
            }
        }

        // 2. 创建 select 相关表单
        let selectStr = "<span>Indices_from : </span>\n" + '<select id="MaxPoolIdSelector">\n';
        if(MaxPoolIdList.indexOf(history_indices_from) == -1){  // 如果记录的 id 不存在与当前层中，比方说删除了该层
            selectStr += '<option value="" selected>Please select an option:</option>\n';
        }

        // option 部分
        for(let optionIndex = 0, optionLen = MaxPoolIdList.length; optionIndex < optionLen; optionIndex++){
            if(history_indices_from == MaxPoolIdList[optionIndex]){
                selectStr += '<option value="' + MaxPoolIdList[optionIndex] + '" selected>' + MaxPoolIdList[optionIndex] + "</option>\n";
            }else{
                selectStr += '<option value="' + MaxPoolIdList[optionIndex] + '">' + MaxPoolIdList[optionIndex] + "</option>\n";
            }
        }

        selectStr += "</select>\n<br><br>";

        // 3. 创建 input 部分
        let inputStr = "<span>Output_Size : </span>\n";
        inputStr += '<input type="text" id="output_size" value="' + output_size["value"] + '" placeholder="' + output_size["type"] + '"/>\n';

        // 4. 添加到 dom
        extra_input_form += selectStr + inputStr;
        $('#extra_input_form').append(extra_input_form);
    }
}



/*
    只负责更新参数，不负责检查参数类型
    layer_id : 该参数表所对应的 layer 的
*/
function update_params(layer_id){
    // 通过 layer_id 的原始参数
    let layer_str = $("#" + layer_id + " .layer_json_data")[0].innerHTML;
    let layer_json = JSON.parse(layer_str);

    // 获取参数表单填入的参数
    let param_array = document.getElementById("parameters_form").getElementsByTagName("input");

    // 由于前面生成参数弹窗时，是按照顺序进行排列的，所以这里直接按照顺序读取数组即可
    let index = 0;
    for(let parm in layer_json["params"]){
        layer_json["params"][parm]["value"] = param_array[index].value.trim();   // 去除填入部分两边的空白
        index++;
    }

    // 如果是 MaxUnpool 相关层，还需要保存额外的数据
    if(layer_id.substring(0,9) == "MaxUnpool"){
        // 保存 indices_from 字段
        let selectedIndex = document.getElementById("MaxPoolIdSelector").selectedIndex;
        let selectedLayerId = document.getElementById("MaxPoolIdSelector").options[selectedIndex].value;
        layer_json["extra_input"]["indices_from"] = selectedLayerId;

        // 保存 Output_Size 字段
        let outputSizeStr = document.getElementById("output_size").value;
        layer_json["extra_input"]["output_size"]["value"] = outputSizeStr;
    }

    // 保存更改后的参数
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_json);
}



/* 
    检查是否为空白字符
    若是，则返回 true；否则返回 false
*/
function Is_Black_Str(value_str){
    let reg = /^\s*$/;

    // 为空白字符
    if(reg.test(value_str)){
        return true;
    }
    return false;
}



/*
    检测列表中参数是否有未填写的选项（在连线的时候进行检测，不满足不给连线）
    填写完毕：true
    未填写完毕：false
*/
function Is_params_all_set(layer_id){
    // 通过 layer_id 获取原始参数
    let layer_str = $("#" + layer_id + " .layer_json_data")[0].innerHTML;
    let layer_json = JSON.parse(layer_str);
    let parmsList = layer_json["params"];

    // 遍历参数，查找是否存在空选项（同时应该检查空白字符）
    for(let par in parmsList){
        if(parmsList[par]["value"].trim() == ""){
            return false;
        }
    }

    // 如果是 MaxUnpool 相关层，还需要保存额外的数据
    if(layer_id.substring(0,9) == "MaxUnpool"){
        let extra_input_Json = layer_json["extra_input"];

        // 检查 indices_from 字段
        if(extra_input_Json["indices_from"].trim() == ""){
            return false;
        }
    
        // 检查 Output_Size 字段
        if(extra_input_Json["output_size"]["value"].trim() == ""){
            return false;
        }
    }

    return true;
}



/*
    双击层实例，弹出参数窗口
*/
$("#workspace_canvas").on("dblclick", ".layer_in_canvas", function () {
    // 获取当前层的 id
    cur_id_param_box = $(this).attr("id");

    fill_param_form(cur_id_param_box);
    showPopBox();
});



/*
    检测表单内填写的参数是否符合要求
    若正常，则返回 ""
    若不正常，则返回错误提示信息
*/
function Is_filled_params_valid(){
    // 获取填入的参数
    let param_array = document.getElementById("parameters_form").getElementsByTagName("input");

    // 遍历所有参数
    for(let parm_index = 0, len = param_array.length; parm_index < len; parm_index++){
        let par_type  = param_array[parm_index].placeholder;
        let par_value = param_array[parm_index].value;

        // 如果不为空白字符串，则进行校验（这里不管空白字符）
        if(!Is_Black_Str(par_value)){
            let typeCheckStr = Check_parms_Type(par_value, par_type);

            if(typeCheckStr != ""){  // 匹配失败
                return "The type of " + param_array[parm_index].id + " does not match!\n" + 
                        "Details : " + typeCheckStr;
            }

            if(typeCheckStr == "Error"){
                return "Unsupported type!";
            }
        }
    }

    // 如果是 MaxUnpool 相关层，还需要检查 output_size 字段
    if(cur_id_param_box.substring(0,9) == "MaxUnpool"){
        let outType  = document.getElementById("output_size").placeholder;
        let outValue = document.getElementById("output_size").value;

        // 如果不为空白字符串，则进行校验（这里不管空白字符）
        if(!Is_Black_Str(outValue)){
            let typeCheckStr = Check_parms_Type(outValue, outType);

            if(typeCheckStr != ""){  // 匹配失败
                return "The type of output_size does not match!\n" + 
                        "Details : " + typeCheckStr;
            }

            if(typeCheckStr == "Error"){
                return "Unsupported type!";
            }
        }
    }

    return "";
}



/*
    判定输入尺寸尺寸是否合法
    如果合法，则更新输出尺寸字段，并返回 “”
    如果不合法，则返回相应的信息字符串
*/
function Update_Layer_outSape(layer_id, inShape_array_str){
    // 获取 layer_id 对应的所有属性
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    // 获取对应的函数名
    let func_name = layer_info_json["funcs"]["Update_Layer_outSape"];

    // 调用该函数
    return window[func_name](layer_id, inShape_array_str);
}



/*
    改变连线的状态："wrong" 表示红色； "right" 表示正常默认
*/
function changeConnectionStyle(mode_str,sourceId,targetId){
    // wrong
    jsPlumb_Instance.registerConnectionType("example",{
        paintStyle:{stroke:"#FF0000",strokeWidth:6},
    });

    // right
    jsPlumb_Instance.registerConnectionType("default",{
        paintStyle:{stroke:"#458B74",strokeWidth:4},
    });

    let conn = jsPlumb_Instance.getConnections({source:sourceId,target:targetId});

    if(mode_str == "wrong"){
        conn[0].setType("example");
    }else if(mode_str == "right"){
        conn[0].setType("default");
    }
}



/*
    改变层的状态："wrong" 表示橙色，"right" 表示正常
*/
function changeLayerStyle(mode_str,layerId){
    if(mode_str == "wrong"){
        document.getElementById(layerId).style["background-color"] = "#B0E2FF";
    }else if(mode_str == "right"){
        document.getElementById(layerId).style["background-color"] = "#EEE8AA";
    }
}



/*
    该函数用于打印出错信息
*/
function DisplayErrorInfo(ErrorInfoStr){
    $("#workspace_debug textarea")[0].innerHTML = ErrorInfoStr;
}



/*
    清空指定层的 outShape
*/
function clear_OutShape(layerId){
    let layer_info_json = JSON.parse($("#" + layerId + " .layer_json_data")[0].innerHTML);
    layer_info_json["outShape"] = JSON.parse("[]");
    $("#" + layerId + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);    
}



/*
    查看出错信息
*/
$("#ErrorInfo").click(function(){
    let topDivH   = $("#top_container").height();    // 总框的高度
    let debugDivH = $("#workspace_debug").height();  // debug 区的高度

    if(debugDivH != 0){  // 已打开，再次点击就进行关闭
        $("#workspace_debug").height(0);
        $("#workspace_canvas").height(topDivH);
    }else{
        $("#workspace_debug").height(topDivH * 0.2);
        $("#workspace_canvas").height(topDivH * 0.8);
    }
});



/*
    窗口变化时，保持 error 窗口的相对比例不变
*/
$(window).resize(function(){
    let topDivH   = $("#top_container").height();    // 总框的高度
    let debugDivH = $("#workspace_debug").height();  // debug 区的高度

    if(debugDivH == 0){  // 已打开，再次点击就进行关闭
        $("#workspace_debug").height(0);
        $("#workspace_canvas").height(topDivH);
    }else{
        $("#workspace_debug").height(topDivH * 0.2);
        $("#workspace_canvas").height(topDivH * 0.8);
    }
});



/*
    检查当前绘制的模型是否符合要求
    1. 输入层有且仅有一个，且必须有输出，不能有输入
    2. 输出层有且仅有一个，且必须有输入，不能有输出
    3. 参数是否填写完毕：若未填写完毕，则该 layer 实例将会变换形式（比如呈现红色等）
    4. 检查每一层的输入是否合法，若不合法，则该连线将会变换形式（比如变成红色）
    5. 除了输入层，所有的层都必须有输入连接；除了输出层，所有的层都必须有输出连接
    6. 检查连接：所有包含不正常层的连接均变为不正常

    返回值：
        如果完全正常，则返回 true；否则返回 false
*/
function Is_Module_Valid(){
    // 列出所有的层，通过索引访问（list.length）
    let list = document.getElementsByClassName('layer_in_canvas');
    // 列出所有 block
    let blocks =  document.getElementsByClassName('block_in_canvas');

    let Error_Info = "";    // 出错信息汇总

    // 1. 创建所有层的 id 列表
    let all_Layers_Id_List = [];
    // layers
    for(let layerIndex = 0, list_len = list.length; layerIndex < list_len; layerIndex++){
        all_Layers_Id_List.push(list[layerIndex].id);  // 添加到列表

        // 清空所有输出，重新计算
        clear_OutShape(list[layerIndex].id);
    }
    // blocks
    for(let blockIndex = 0, block_len = blocks.length; blockIndex < block_len; blockIndex++){
        all_Layers_Id_List.push(blocks[blockIndex].id);  // 添加到列表

        // block 的 OutShape  只能手动检测
        // clear_OutShape(blocks[blockIndex].id);
    }

    // 2. 重置所有层的标记，后续将只对此刻有问题的层进行标记
    for(let layerindex in all_Layers_Id_List){
        changeLayerStyle("right",all_Layers_Id_List[layerindex]);
    }

    // 3. 重置所有连接的标记
    let all_Conns_array = jsPlumb_Instance.getConnections();
    for(let connIndex = 0, connLen = all_Conns_array.length; connIndex < connLen; connIndex++){
        let conn = all_Conns_array[connIndex];
        changeConnectionStyle("right", conn.sourceId, conn.targetId);
    }

    // 4. 检查是否存在且仅有一个输入层
    let input_Layer_Counter = 0;   // 输入层数量计数
    let input_Layer_Id = "";       // 输入层 id（只记录最后一个）

    for(let layerindex in all_Layers_Id_List){  // 遍历所有层
        // 搜索查找输入层
        if(all_Layers_Id_List[layerindex].substring(0,10) == "InputLayer"){  // 如果为输入层
            // 获取 id
            input_Layer_Id = all_Layers_Id_List[layerindex];

            // 输入层数量计数
            input_Layer_Counter++;

            if(input_Layer_Counter > 1){   // 如果输入层数目大于 1，则对剩余的输入层进行标记
                // 首先全部进行标记，后续再修改
                changeLayerStyle("wrong",input_Layer_Id);
            }

            // 检查是否有输入
            if(JSON.parse($("#" + input_Layer_Id + " .layer_json_data")[0].innerHTML).prev.length != 0){
                Error_Info += input_Layer_Id + " : Input layer should have no source layer!\n";
                changeLayerStyle("wrong",input_Layer_Id);
            }

            // 检查是否有输出
            if(JSON.parse($("#" + input_Layer_Id + " .layer_json_data")[0].innerHTML).next.length != 1){
                Error_Info += input_Layer_Id + " : Input layer should have only one target layer(s)!\n";
                changeLayerStyle("wrong",input_Layer_Id);
            }
        }
    }
    
    // 如果没有，则报错
    if(input_Layer_Counter != 1){
        Error_Info += "There should be only one input layer, but gets " + input_Layer_Counter + "!\n";
    }

    // 5. 必须存在一个输出层，且输出层不应该指向其他层
    let output_Layer_Counter = 0;   // 输出层数量计数
    let output_Layer_Id = "";       // 输出层 id（只记录最后一个）
    for(let layerindex in all_Layers_Id_List){  // 统计当前层有多少输入层
        // 搜索查找输入层
        if(all_Layers_Id_List[layerindex].substring(0,11) == "OutputLayer"){
            // 获取 id
            output_Layer_Id = all_Layers_Id_List[layerindex];
            // 输入层数量计数
            output_Layer_Counter++;

            if(output_Layer_Counter > 1){   // 如果输出层的数目大于 1，则对剩余的输出层进行标记
                changeLayerStyle("wrong",output_Layer_Id);
            }

            // 检查是否有输入
            if(JSON.parse($("#" + output_Layer_Id + " .layer_json_data")[0].innerHTML).prev.length == 0){
                Error_Info += output_Layer_Id + " : Output layer should have source layer!\n";
                changeLayerStyle("wrong",output_Layer_Id);
            }

            // 检查是否有输出
            if(JSON.parse($("#" + output_Layer_Id + " .layer_json_data")[0].innerHTML).next.length != 0){
                Error_Info += output_Layer_Id + " : Output layer should have no target layer!\n";
                changeLayerStyle("wrong",output_Layer_Id);
            }
        }
    }
    // 如果没有，则报错
    if(output_Layer_Counter != 1){
        Error_Info += "There should be only one output layer, but gets " + output_Layer_Counter + "!\n";
    }

    // 6. 参数是否填写完毕：若未填写完毕，则该 layer 实例将会变换形式（比如呈现红色等）
    for(let layerindex in all_Layers_Id_List){
        if(Is_params_all_set(all_Layers_Id_List[layerindex]) == false){
            // 首先将该层进行标记
            changeLayerStyle("wrong",all_Layers_Id_List[layerindex]);   // 进行标记
            Error_Info += "parameters of " + all_Layers_Id_List[layerindex] + " are not all set.\n";
        }
    }

    // 7. 检查所有层输入是否合法，若不合法，则该层实例将会变换形式
    //      这里有一个问题，就是 all_Layers_Id_List 是按照 list = document.getElementsByClassName('layer_in_canvas') 的网页顺序
    //      而非连线顺序进行排列的，所以可能会出现未及时更新 outShape 而导致输入尺寸为 0 的情况
    //      解决办法就是在上面第一次迭代中，将所有的层中，判定输入尺寸为 0 的层重新轮询
    //      由于前面其它输入正常的层输出已经计算完毕，所以每次轮询剩余层，必有一个层会被计算完毕（除非该层的输入真的不正常）
    //      具体实现思路：
    //          一值循环搜索所有剩余不正常的层，在每次循环中，只要剩余层数量发生变化，就继续轮询
    let leftList = JSON.parse(JSON.stringify(all_Layers_Id_List));     // 这里必须深度拷贝，用于保存剩余未处理的层列表
    let endFlag  = false;       // 当层列表的尺寸不再变化时，设为 true
    let tmpList  = JSON.parse(JSON.stringify(all_Layers_Id_List));     // 用于每一轮轮询的层列表

    while(!endFlag){
        for(let leftLayerIndex = 0, leftLayerLen = leftList.length; leftLayerIndex < leftLayerLen; leftLayerIndex++){
            // 首先获取该层输入
            let layerId       = leftList[leftLayerIndex];
            let layerType     = JSON.parse($("#" + layerId + " .layer_json_data")[0].innerHTML).type;
            let prevList      = JSON.parse($("#" + layerId + " .layer_json_data")[0].innerHTML).prev;
            let inShape_array = [];   // 用于存储所有输入

            // 获取所有输入
            for(let prevIndedx = 0, prevLen = prevList.length; prevIndedx < prevLen; prevIndedx++){
                let prevOutShape = JSON.parse($("#" + prevList[prevIndedx] + " .layer_json_data")[0].innerHTML).outShape;
                inShape_array.push(prevOutShape);
            }

            // 检查输入是否合法
            let Layer_In_Info = Update_Layer_outSape(layerId, JSON.stringify(inShape_array));
            if(Layer_In_Info == ""){
                // 如果合法，则更新输出尺寸显示
                if(JSON.stringify(JSON.parse($("#" + layerId + " .layer_json_data")[0].innerHTML).outShape) != "[]"){
                    $("#" + layerId + " .outShape")[0].innerHTML = JSON.stringify(JSON.parse($("#" + layerId + " .layer_json_data")[0].innerHTML).outShape);
                }

                // 移除 layerId 层，表示已经正确
                tmpList.splice(tmpList.indexOf(layerId),1);
            }
        }

        // 检查是否缩减了
        if(leftList.length == tmpList.length){  // 如果未缩减，表明迭代结束
            endFlag = true;
        }else{  // 否则继续迭代
            leftList = JSON.parse(JSON.stringify(tmpList));
            tmpList = JSON.parse(JSON.stringify(leftList));
        }
    }

    // 对剩余不正常的层进行标记
    for(let index_left = 0, len_left = leftList.length; index_left < len_left; index_left++){
        // 首先获取该层输入
        let layerId       = leftList[index_left];
        let prevList      = JSON.parse($("#" + layerId + " .layer_json_data")[0].innerHTML).prev;
        let inShape_array = [];   // 用于存储所有输入

        // 获取所有输入
        for(let prevIndedx = 0, prevLen = prevList.length; prevIndedx < prevLen; prevIndedx++){
            let prevOutShape = JSON.parse($("#" + prevList[prevIndedx] + " .layer_json_data")[0].innerHTML).outShape;
            inShape_array.push(prevOutShape);
        }

        // 检查输入是否合法
        let Layer_In_Info = Update_Layer_outSape(layerId, JSON.stringify(inShape_array));
        if(Layer_In_Info != ""){  // 不合法
            changeLayerStyle("wrong",layerId);   // 进行标记
            Error_Info += Layer_In_Info;
            // 清除尺寸显示
            $("#" + layerId + " .outShape")[0].innerHTML = "";
        }else{   // 如果合法，则更新输出尺寸显示
            if(JSON.stringify(JSON.parse($("#" + layerId + " .layer_json_data")[0].innerHTML).outShape) != "[]"){
                $("#" + layerId + " .outShape")[0].innerHTML = JSON.stringify(JSON.parse($("#" + layerId + " .layer_json_data")[0].innerHTML).outShape);
            }
        }
    }

    // 8. 除了输入层，所有的层都必须有输入连接；除了输出层，所有的层都必须有输出连接
    for(let layerindex in all_Layers_Id_List){
        let layerId = all_Layers_Id_List[layerindex];  // 获取 id
        let prevLen = JSON.parse($("#" + layerId + " .layer_json_data")[0].innerHTML).prev;
        let nextLen = JSON.parse($("#" + layerId + " .layer_json_data")[0].innerHTML).next;
        // 如果不是输入输出层，则判定是否有输入输出
        if((layerId.substring(0,10) != "InputLayer") && (layerId.substring(0,11) != "OutputLayer")){
            if(prevLen == 0){
                changeLayerStyle("wrong", layerId);   // 进行标记
                Error_Info += "Layer " + layerId + " should have at least one input.\n";
            }
            if(nextLen == 0){
                changeLayerStyle("wrong", layerId);   // 进行标记
                Error_Info += "Layer " + layerId + " should have at least one output.\n";
            }
        }
    }

    // 9. 检查连接：所有包含不正常层的连接均变为不正常
    let all_Conns = jsPlumb_Instance.getConnections();

    for(let connIndex = 0, connLen = all_Conns.length; connIndex < connLen; connIndex++){
        // 这里有一点要注意，上面代码设置的为 16 进制，但是读取的为 rgb 的值，所以需要直接转换为对应的 rgb 值进行比对
        if((document.getElementById(all_Conns[connIndex].sourceId).style["background-color"] == "rgb(176, 226, 255)") || 
            (document.getElementById(all_Conns[connIndex].targetId).style["background-color"] == "rgb(176, 226, 255)")){  // 如果连接包含不正常的层，则变换式样
                changeConnectionStyle("wrong", all_Conns[connIndex].sourceId, all_Conns[connIndex].targetId);
        }
    }

    // 这一步检查完毕后，打印相关信息
    DisplayErrorInfo(Error_Info);

    if(Error_Info == ""){
        return true;
    }else{
        return false;
    }
}