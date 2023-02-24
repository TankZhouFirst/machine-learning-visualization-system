/*
    ** pytorch 代码的自动生成
*/

// 对创建的有向无环图进行排序
// 因为构建层的时候，如果不知道层的前后顺序，则无法构建代码
// 排序过程中，最后需要生成一个 json 对象，各元素按照层的顺序进行排列，并且包含该层的输入
function DAG_sort(){
    // 先获取有向无环图，即前面可视化图形对应的连接关系
    let conn_json = JSON.parse(save_connections());

    // 遍历所有连接，并统计各层输入，构成 json
    let layer_node = {};

    // 遍历所有连接，构建 DAG 节点信息
    for(let conn in conn_json){
        // 获取连接
        let connection = conn_json[conn];
        let source = connection["sourceId"];   // 源
        let target = connection["targetId"];   // 目标

        // 去掉输入输出层
        if((source.substring(0,10) == "InputLayer") || (target.substring(0,11) == "OutputLayer")){
            continue;
        }

        /* 遍历获取所有节点对应的出度和入度，为后面 DAG 排序做好准备 */
        // 开始迭代所有层，并建立各层出入度 json 列表
        // 查找 node_json 中是否存在对应的源节点
        if(layer_node.hasOwnProperty(source)){
            // 如果存在，则直接在其源节点 + 1
            layer_node[source]["out_num"] = (parseInt(layer_node[source]["out_num"]) + 1).toString();
            layer_node[source]["layer_out"].push(target);
        }
        else{
            // 如果不存在，则创建 json 对象
            layer_node[source] = {"in_num":"0", "out_num":"1", "layer_in" : [], "layer_out" : [target]};
        }

        // 查找 node_json 中是否存在对应的目标节点
        if(layer_node.hasOwnProperty(target)){
            // 如果存在，则直接在其目标节点 + 1
            layer_node[target]["in_num"] = (parseInt(layer_node[target]["in_num"]) + 1).toString();
            layer_node[target]["layer_in"].push(source);
        }
        else{
            // 如果不存在，则创建 json 对象
            layer_node[target] = {"in_num":"1", "out_num":"0", "layer_in" : [source], "layer_out" : []};
        }
    }

    // 注意，js 中对象和 python 类似，是用标签指向值。
    // 当多标签指向同一值时，某一标签对值进行更改，另一标签读取的值也会变化
    // 所以需要进行深度拷贝，利用 json 字符串最为简单
    copy_node = JSON.parse(JSON.stringify(layer_node));

    /*
        开始根据出入度进行排序，算法步骤如下所示：
            1. 找到所有入度为 0 的顶点
            2. 这些顶点入栈
            3. 出栈，输出，并删除该顶点的出边，回到第 1 步
    */
    let layer_stack = [];      // 栈
    let ordered_layer = [];    // 排列顺序

    // 只要 DAG 不为空，则继续迭代
    while(!(Object.keys(copy_node).length === 0)){
        // 将入度为 0 的节点入栈
        for(node in copy_node){
            if(copy_node[node]["in_num"] == "0"){
                layer_stack.push(node);   // 保存入度为 0 的所有节点
            }
        }

        // 开始弹出入度为 0 的节点，并切断其连接
        while(layer_stack.length != 0){
            let tmp = layer_stack.pop();     // 弹出一个节点
            // 先弹出节点，并保存到最终队列中
            ordered_layer.push(tmp);

            // 这里需要再次深拷贝，因为会对 node 作出修改
            // 若不进行深拷贝，则可能导致每一次更改影响后面的结果
            copy_node_tpm = JSON.parse(JSON.stringify(copy_node));
     
            // 断开当前节点的连接
            for(target_id in copy_node[tmp]["layer_out"]){
                // 开始更改对应的输出节点的入度
                copy_node_tpm[copy_node[tmp]["layer_out"][target_id]]["in_num"] = (parseInt(copy_node[copy_node[tmp]["layer_out"][target_id]]["in_num"]) - 1).toString();
            }
     
            // 删除已处理的节点（这里再次深度拷贝）
            copy_node_tpm = JSON.parse(JSON.stringify(copy_node_tpm));
            delete copy_node_tpm[tmp];
     
            // 更新节点
            copy_node = JSON.parse(JSON.stringify(copy_node_tpm));
        }
    }

    // 返回排好序的层，返回两个值
    return [JSON.stringify(ordered_layer), JSON.stringify(layer_node)];
}



// 逐层生成相应的字符串，创建新的 json 对象
function create_layers_code_str(){
    // 获取当画布中所有层
    let  layers_json_array = JSON.parse(save_objs_in_canvas());
    // 获取排序好的层列表
    let ordered_layers = JSON.parse(DAG_sort()[0]);

    // 创建保存
    let layer_code_str_json = {};

    // 逐层创建
    for(let index = 0, len = ordered_layers.length; index < len; index++){  // 根据已排序的层，逐层创建相关字段
        let layer_id = ordered_layers[index];   // 获取层 id
        let block_layer_type = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML).type;
        let block_layer_name = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML).name;

        /* 创建  nn.Conv2d(3, 24, 5) */
        let layer_define_str = "";   // nn.Conv2d(3, 24, 5)
        let layer_name_str = "";     // conv2_drop, 即 ： 每一层的名字
        let layer_out_str = "";      // 层的输出

        // 从当前层中查找当前准备创建代码的层
        for(let layer_index in layers_json_array){
            
            if(layers_json_array[layer_index]["Layer_ID"] == layer_id){  // 找到对应层，开始创建相关字符串
                if(layers_json_array[layer_index]["metaName"] == "Other_layers_metaData"){
                    layer_define_str = "";
                    layer_name_str = "";
                    layer_out_str = "out_" + index;
                }else{
                    // 创建层 str
                    layer_define_str += layers_json_array[layer_index]["api"] + "(";

                    // 遍历参数
                    for(let parm in layers_json_array[layer_index]["params"]){
                        layer_define_str += parm + "=" + layers_json_array[layer_index]["params"][parm]["value"] + ", ";
                    }

                    // 去掉最后多余的逗号和空格
                    if(JSON.stringify(layers_json_array[layer_index]["params"]) != "{}"){   // 防止没有参数时，减少不必要的字符串
                        layer_define_str = layer_define_str.substring(0, (layer_define_str.length -2));
                    }
                    layer_define_str += ")";

                    // 创建层的名字
                    if(block_layer_type == "Layer"){
                        let api_split_tmp = layers_json_array[layer_index]["api"].split(".");
                        layer_name = api_split_tmp[api_split_tmp.length - 1];
                        layer_name_str += layer_name + "_" + index;
                    }else{
                        layer_name_str += block_layer_name + "_" + index;
                    }

                    // 创建层的输出
                    //      某些多输出层，主要是 pool 相关层 
                    if((layer_id.substring(0,7) == "MaxPool") || (layer_id.substring(0,15) == "AdaptiveMaxPool") || (layer_id.substring(0,19) == "FractionalMaxPool2d")){
                        if(layers_json_array[layer_index]["params"]["return_indices"]["value"] == "True"){  // 返回
                            layer_out_str = "out_" + index;
                            layer_out_str += ",";
                            layer_out_str += "indices_" + index;
                        }else{
                            layer_out_str = "out_" + index;
                        }
                    }else{   // 其他层
                        layer_out_str = "out_" + index;
                    }
                }

                // 创建该层的所有信息
                layer_code_str_json[layer_id] = {
                    "pt_layer_name" : layer_name_str, 
                    "pt_layer_create" : layer_define_str, 
                    "pt_layer_out" : layer_out_str
                };

                break;
            }
        }
    }

    return JSON.stringify(layer_code_str_json);
}



// 首先根据上面的各层的属性以及连接关系，创建一个新的 json，格式如下所示：
//      layer_name: "conv1"
//      layer_define_string:"nn.Conv2d(3, 24, 5)"
//      layer_input : "x1, x2..."
//      layer_output : "x3"
// pytorch 代码自动生成
function pyTorch_codeGen(className){
    let pytorch_code_str = "";     // 最终的代码
    let output_layerID = "";       // 保存最后输出层的 id

    // 生成前部代码
    pytorch_code_str += "Class " + className + "(torch.nn.Module):\n" + 
                        "    def __init__(self):\n" +
                        "        super(" + className + ", self).__init__()\n";

    let layers_code_str_json = JSON.parse(create_layers_code_str());   // 每一层所包含的代码段
    let layers_DAG_Node_json = JSON.parse(DAG_sort()[1]);              // 包含输入输出数，输入输出层的 id
    let ordered_layers_List  = JSON.parse(DAG_sort()[0]);              // 所有层按照先后顺序有序排列

    // 首先创建 init 部分
    for(let layerIndex = 0, LayerListLen = ordered_layers_List.length; layerIndex < LayerListLen; layerIndex++){
        let layerId = ordered_layers_List[layerIndex];   // id

        // 只创建非 others 部分
        // others  部分，不需要创建层，只需要在 forward 中调用即可
        if(JSON.parse($("#" + layerId + " .layer_json_data")[0].innerHTML)["metaName"] != "Other_layers_metaData"){
            pytorch_code_str += "        self." + layers_code_str_json[layerId]["pt_layer_name"] + " = " + 
                    layers_code_str_json[layerId]["pt_layer_create"] + "\n";
        }
    }

    // 根据连接关系创建 forward 部分
    pytorch_code_str += "    def forward(self, x):\n";

    // 创建后续部分（遍历所有层）
    for(let layerIndex = 0, LayerListLen = ordered_layers_List.length; layerIndex < LayerListLen; layerIndex++){
        // 获取 id
        let layerId = ordered_layers_List[layerIndex];

        // 创建该层对应的调用部分的 str
        // unpool(output, indices, output_size=input.size())
        if(layerId.substring(0,9) == "MaxUnpool"){   // MaxUnpool 层
            let layerOutStr   = layers_code_str_json[layerId]["pt_layer_out"];  // 输出字符串
            let layerInArray  = layers_DAG_Node_json[layerId]["layer_in"];      // 输入数组
            let layerName     = layers_code_str_json[layerId]["pt_layer_name"];

            let tmpStr = "";
            // 输入 torch 部分
            let inTensorStr = layers_code_str_json[layerInArray[0]]["pt_layer_out"];

            // 如果输入层为 MaxPool 等，则取第一个元素
            if((layerInArray[0].substring(0,7) == "MaxPool") || (layerInArray[0].substring(0,15) == "AdaptiveMaxPool") || (layerInArray[0].substring(0,17) == "FractionalMaxPool")){
                inTensorStr = inTensorStr.split(",")[0];
            }

            // 获取 indices_from 字段
            let indices_from = JSON.parse($("#" + layerId + " .layer_json_data")[0].innerHTML)["extra_input"]["indices_from"];
            let indices_from_output = layers_code_str_json[indices_from]["pt_layer_out"];
            let indicesStr = indices_from_output.split(",")[1];

            // 获取 output_size 字段
            let outputSize = JSON.parse($("#" + layerId + " .layer_json_data")[0].innerHTML)["extra_input"]["output_size"]["value"];

            tmpStr += inTensorStr + ", " + indicesStr + "," + outputSize;

            pytorch_code_str += "        " + layerOutStr + " = " + "self." + layerName + "(" + tmpStr + ")\n";
        }
        else if(layerId.substring(0,12) == "FlattenLayer"){  // 如果为 FlattenLayer，对应于 x.view()
            let layerOutStr   = layers_code_str_json[layerId]["pt_layer_out"];  // 输出字符串
            let layerInArray  = layers_DAG_Node_json[layerId]["layer_in"];      // 输入数组
            
            // 获取期望的输出尺寸 Output_size
            let layer_info_json = JSON.parse($("#" + layerId + " .layer_json_data")[0].innerHTML);
            let Output_size = layer_info_json["params"]["Output_size"]["value"].trim();

            if(Output_size == ""){
                Output_size = [];
            }else{
                Output_size = JSON.parse(Output_size);
            }

            // 层输入的中间字段
            let tmpStr = "";

            // 创建输出尺寸
            for(let outIndex = 0, outLen = Output_size.length; outIndex < outLen; outIndex++){
                tmpStr += Output_size[outIndex] + ",";
            }

            if(Output_size.length != 0){
                tmpStr = tmpStr.substring(0, tmpStr.length - 1);
            }

            // 上一层的输出名
            let lyoutStr = "";
            // 检测上一层是否为 maxpool 相关，因为可能包含 indices_ 部分
            if((layerInArray[0].substring(0,7) == "MaxPool") || (layerInArray[0].substring(0,15) == "AdaptiveMaxPool") || (layerInArray[0].substring(0,19) == "FractionalMaxPool2d")){
                lyoutStr = layers_code_str_json[layerInArray[0]]["pt_layer_out"].split(",")[0];
            }else{
                lyoutStr = layers_code_str_json[layerInArray[0]]["pt_layer_out"];
            }

            pytorch_code_str += "        " + layerOutStr + " = " + lyoutStr + ".view(" + tmpStr + ")\n";
        }
        else if(layerId.substring(0,8) == "SumLayer"){   // 如果为 SumLayer，对应于 +
            let layerOutStr   = layers_code_str_json[layerId]["pt_layer_out"];  // 输出字符串
            let layerInArray  = layers_DAG_Node_json[layerId]["layer_in"];      // 输入数组

            let tmpStr = "";
            for(let layerIndex = 0, layerNum = layerInArray.length; layerIndex < layerNum; layerIndex++){
                let lyoutStr = "";
                // 检测上一层是否为 maxpool 相关，因为可能包含 indices_ 部分
                if((layerInArray[layerIndex].substring(0,7) == "MaxPool") || (layerInArray[layerIndex].substring(0,15) == "AdaptiveMaxPool") || (layerInArray[layerIndex].substring(0,19) == "FractionalMaxPool2d")){
                    lyoutStr = layers_code_str_json[layerInArray[layerIndex]]["pt_layer_out"].split(",")[0];
                }else{
                    lyoutStr = layers_code_str_json[layerInArray[layerIndex]]["pt_layer_out"];
                }

                tmpStr += lyoutStr + " + ";
            }
            tmpStr = tmpStr.substring(0, tmpStr.length - 3);

            pytorch_code_str += "        " + layerOutStr + " = " + tmpStr + "\n"
        }
        else if(layerId.substring(0,16) == "ConcatenateLayer"){  // 如果为 ConcatenateLayer，对应于 torch.cat
            let layerOutStr   = layers_code_str_json[layerId]["pt_layer_out"];  // 输出字符串
            let layerInArray  = layers_DAG_Node_json[layerId]["layer_in"];      // 输入数组

            // 获取 dim
            let layer_info_json = JSON.parse($("#" + layerId + " .layer_json_data")[0].innerHTML);
            let dim = parseInt(layer_info_json["params"]["dim"]["value"].trim());

            let tmpStr = "";
            for(let layerIndex = 0, layerNum = layerInArray.length; layerIndex < layerNum; layerIndex++){
                let lyoutStr = "";
                // 检测上一层是否为 maxpool 相关，因为可能包含 indices_ 部分
                if((layerInArray[layerIndex].substring(0,7) == "MaxPool") || (layerInArray[layerIndex].substring(0,15) == "AdaptiveMaxPool") || (layerInArray[layerIndex].substring(0,19) == "FractionalMaxPool2d")){
                    lyoutStr = layers_code_str_json[layerInArray[layerIndex]]["pt_layer_out"].split(",")[0];
                }else{
                    lyoutStr = layers_code_str_json[layerInArray[layerIndex]]["pt_layer_out"];
                }

                tmpStr += lyoutStr + ",";
            }
            tmpStr = tmpStr.substring(0, tmpStr.length-1);

            pytorch_code_str += "        " + layerOutStr + " = torch.cat((" + tmpStr + "), dim=" + dim + ")\n";            
        }
        else{ // 一般层
            let layerOutStr   = layers_code_str_json[layerId]["pt_layer_out"];  // 输出字符串
            let layerInArray  = layers_DAG_Node_json[layerId]["layer_in"];      // 输入数组
            let layerName     = layers_code_str_json[layerId]["pt_layer_name"];

            let param_str = "";   // 参数部分字符串
            if(layerInArray.length == 0){  // 只有第一层没有输入
                param_str += "x";
            }
            else{
                for(let layerIndex = 0, layerNum = layerInArray.length; layerIndex < layerNum; layerIndex++){
                    let lyoutStr = "";

                    lyoutStr = layers_code_str_json[layerInArray[layerIndex]]["pt_layer_out"];
                    
                    // 如果输入层为 MaxPool 等，则取第一个元素
                    if((layerInArray[layerIndex].substring(0,7) == "MaxPool") || (layerInArray[layerIndex].substring(0,15) == "AdaptiveMaxPool") || (layerInArray[layerIndex].substring(0,17) == "FractionalMaxPool")){
                    
                        lyoutStr = lyoutStr.split(",")[0];
                    }                    
    
                    param_str += lyoutStr + ",";
                }
                param_str = param_str.substring(0, param_str.length - 1);  // 去掉最后的逗号                
            }

            pytorch_code_str += "        " + layerOutStr + " = " + "self." + layerName + "(" + param_str + ")\n";
        }

        // 获取输出层 id （目的是为了保留最后一层的 id）
        output_layerID = layerId;
    }

    // 创建返回值
    pytorch_code_str += "        return " + layers_code_str_json[output_layerID]["pt_layer_out"];

    return pytorch_code_str;
}