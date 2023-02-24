/* 所有预置线性层  Common_Blocks_metaData */



/******************************************************* 层数据 *******************************************************/
// 该名字不可变
var initial_Common_Blocks_metaData = [
    {
        // 第一个元素包含该 metaData 的基本信息
        "metaDataName"      : "Common_Blocks_metaData",   // metaData 的名字
        "metaDataType"      : "Blocks_metaData",          // metaData 的类型
        "dom_div_name"      : "Common_Blocks",            // 该字段用于生成列表中的 header 和 list 名
        "dom_header_text"   : "Common Blocks"             // header 上显示的描述名
    },
    {
        "Inception":{
            "metaName" : "Common_Blocks_metaData",        // 所属的 metaData 的名称
            "type"     : "Block",                         // obj 的类型
            "name"     : "Inception",                     // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon"     : "resources/test.svg",            // 该层对应的 icon 地址
            "keyWord"  : "GoogleNet Inception",           // 搜索时对应的关键字
            "api"      : "",                              // 对应的 pytorch api

            "style"    : "",                              // 该 id 对应的 css
            "Layer_ID" : "",                              // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化

            "InShape"  : [],                              // 层的输入
            "outShape" : [],                              // 层输出尺寸
            "prev"     : [],                              // 前驱层
            "next"     : [],                              // 后继层

            "ClassDefineStr" : "",                        // block 对应的 class 的定义 
            
            "params":{},

            "funcs":{                                     // 一些函数接口
                "Check_Layer_inShape"      : "Blocks_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "Blocks_Update_Layer_outSape"      // 计算并更新输出尺寸
            },

            // block 部分所包含的数据
            "BlockDetails" : {
                "DimsNumber"       : 4,       // 表示该 block 输入的维数，必须为正整数
                // 该 block 包含的所有 layers，包括属性和参数
                "BlockLayers"      : '[{"metaName":"Convolution_layers_metaData","type":"Layer","name":"Conv2d","keyWord":"Conv2d Convolutional 2d","icon":"resources/test.svg","api":"torch.nn.Conv2d","style":"position: absolute; left: 732.578px; top: 739.422px; background-color: rgb(238, 232, 170); width: 300px; right: auto; height: 70px; bottom: auto;","Layer_ID":"Conv2d_layer_1","outShape":[50,128,32,32],"prev":["ReLU_layer_8"],"next":["ConcatenateLayer_layer_13"],"params":{"in_channels":{"type":"Positive_Integer","value":"128"},"out_channels":{"type":"Positive_Integer","value":"128"},"kernel_size":{"type":"PI_Or_(x,x)","value":"1"},"stride":{"type":"PI_Or_(x,x)","value":"1"},"padding":{"type":"NNI_Or_(x,x)","value":"0"},"dilation":{"type":"PI_Or_(x,x)","value":"1"},"groups":{"type":"Positive_Integer","value":"1"},"bias":{"type":"Boolean","value":"True"}},"funcs":{"Check_Layer_inShape":"Conv2d_Check_Layer_inShape","Update_Layer_outSape":"Conv2d_Update_Layer_outSape"}},{"metaName":"Convolution_layers_metaData","type":"Layer","name":"Conv2d","keyWord":"Conv2d Convolutional 2d","icon":"resources/test.svg","api":"torch.nn.Conv2d","style":"position: absolute; left: 1194.09px; top: 571.436px; background-color: rgb(238, 232, 170); width: 300px; right: auto; height: 70px; bottom: auto;","Layer_ID":"Conv2d_layer_2","outShape":[50,128,32,32],"prev":["Conv2d_layer_3"],"next":["ConcatenateLayer_layer_13"],"params":{"in_channels":{"type":"Positive_Integer","value":"256"},"out_channels":{"type":"Positive_Integer","value":"128"},"kernel_size":{"type":"PI_Or_(x,x)","value":"3"},"stride":{"type":"PI_Or_(x,x)","value":"1"},"padding":{"type":"NNI_Or_(x,x)","value":"1"},"dilation":{"type":"PI_Or_(x,x)","value":"1"},"groups":{"type":"Positive_Integer","value":"1"},"bias":{"type":"Boolean","value":"True"}},"funcs":{"Check_Layer_inShape":"Conv2d_Check_Layer_inShape","Update_Layer_outSape":"Conv2d_Update_Layer_outSape"}},{"metaName":"Convolution_layers_metaData","type":"Layer","name":"Conv2d","keyWord":"Conv2d Convolutional 2d","icon":"resources/test.svg","api":"torch.nn.Conv2d","style":"position: absolute; left: 1192.83px; top: 736.541px; background-color: rgb(238, 232, 170); width: 300px; right: auto; height: 70px; bottom: auto;","Layer_ID":"Conv2d_layer_3","outShape":[50,256,32,32],"prev":["ReLU_layer_8"],"next":["Conv2d_layer_2"],"params":{"in_channels":{"type":"Positive_Integer","value":"128"},"out_channels":{"type":"Positive_Integer","value":"256"},"kernel_size":{"type":"PI_Or_(x,x)","value":"1"},"stride":{"type":"PI_Or_(x,x)","value":"1"},"padding":{"type":"NNI_Or_(x,x)","value":"0"},"dilation":{"type":"PI_Or_(x,x)","value":"1"},"groups":{"type":"Positive_Integer","value":"1"},"bias":{"type":"Boolean","value":"True"}},"funcs":{"Check_Layer_inShape":"Conv2d_Check_Layer_inShape","Update_Layer_outSape":"Conv2d_Update_Layer_outSape"}},{"metaName":"Convolution_layers_metaData","type":"Layer","name":"Conv2d","keyWord":"Conv2d Convolutional 2d","icon":"resources/test.svg","api":"torch.nn.Conv2d","style":"position: absolute; left: 1625.37px; top: 564.998px; background-color: rgb(238, 232, 170); width: 300px; right: auto; height: 70px; bottom: auto;","Layer_ID":"Conv2d_layer_4","outShape":[50,256,32,32],"prev":["Conv2d_layer_5"],"next":["ConcatenateLayer_layer_13"],"params":{"in_channels":{"type":"Positive_Integer","value":"512"},"out_channels":{"type":"Positive_Integer","value":"256"},"kernel_size":{"type":"PI_Or_(x,x)","value":"3"},"stride":{"type":"PI_Or_(x,x)","value":"1"},"padding":{"type":"NNI_Or_(x,x)","value":"1"},"dilation":{"type":"PI_Or_(x,x)","value":"1"},"groups":{"type":"Positive_Integer","value":"1"},"bias":{"type":"Boolean","value":"True"}},"funcs":{"Check_Layer_inShape":"Conv2d_Check_Layer_inShape","Update_Layer_outSape":"Conv2d_Update_Layer_outSape"}},{"metaName":"Convolution_layers_metaData","type":"Layer","name":"Conv2d","keyWord":"Conv2d Convolutional 2d","icon":"resources/test.svg","api":"torch.nn.Conv2d","style":"position: absolute; left: 1627.27px; top: 744.709px; background-color: rgb(238, 232, 170); width: 300px; right: auto; height: 70px; bottom: auto;","Layer_ID":"Conv2d_layer_5","outShape":[50,512,32,32],"prev":["ReLU_layer_8"],"next":["Conv2d_layer_4"],"params":{"in_channels":{"type":"Positive_Integer","value":"128"},"out_channels":{"type":"Positive_Integer","value":"512"},"kernel_size":{"type":"PI_Or_(x,x)","value":"1"},"stride":{"type":"PI_Or_(x,x)","value":"1"},"padding":{"type":"NNI_Or_(x,x)","value":"0"},"dilation":{"type":"PI_Or_(x,x)","value":"1"},"groups":{"type":"Positive_Integer","value":"1"},"bias":{"type":"Boolean","value":"True"}},"funcs":{"Check_Layer_inShape":"Conv2d_Check_Layer_inShape","Update_Layer_outSape":"Conv2d_Update_Layer_outSape"}},{"metaName":"Pooling_layers_metaData","type":"Layer","name":"MaxPool2d","keyWord":"MaxPool2d max pooling 2d","icon":"resources/test.svg","api":"torch.nn.MaxPool2d","style":"position: absolute; left: 2044.96px; top: 738.761px; background-color: rgb(238, 232, 170); width: 300px; right: auto; height: 70px; bottom: auto;","Layer_ID":"MaxPool2d_layer_6","outShape":[50,128,10,10],"prev":["ReLU_layer_8"],"next":["Conv2d_layer_7"],"params":{"kernel_size":{"type":"PI_Or_(x,x)","value":"3"},"stride":{"type":"PI_Or_(x,x)_or_None","value":"None"},"padding":{"type":"NNI_Or_(x,x)","value":"0"},"dilation":{"type":"PI_Or_(x,x)","value":"1"},"return_indices":{"type":"Boolean","value":"False"},"ceil_mode":{"type":"Boolean","value":"False"}},"funcs":{"Check_Layer_inShape":"MaxPool2d_Check_Layer_inShape","Update_Layer_outSape":"MaxPool2d_Update_Layer_outSape"}},{"metaName":"Convolution_layers_metaData","type":"Layer","name":"Conv2d","keyWord":"Conv2d Convolutional 2d","icon":"resources/test.svg","api":"torch.nn.Conv2d","style":"position: absolute; left: 2044.36px; top: 566.552px; background-color: rgb(238, 232, 170); width: 300px; right: auto; height: 70px; bottom: auto;","Layer_ID":"Conv2d_layer_7","outShape":[50,1024,32,32],"prev":["MaxPool2d_layer_6"],"next":["ConcatenateLayer_layer_13"],"params":{"in_channels":{"type":"Positive_Integer","value":"128"},"out_channels":{"type":"Positive_Integer","value":"1024"},"kernel_size":{"type":"PI_Or_(x,x)","value":"1"},"stride":{"type":"PI_Or_(x,x)","value":"1"},"padding":{"type":"NNI_Or_(x,x)","value":"11"},"dilation":{"type":"PI_Or_(x,x)","value":"1"},"groups":{"type":"Positive_Integer","value":"1"},"bias":{"type":"Boolean","value":"True"}},"funcs":{"Check_Layer_inShape":"Conv2d_Check_Layer_inShape","Update_Layer_outSape":"Conv2d_Update_Layer_outSape"}},{"metaName":"Activation_layers_metaData","type":"Layer","name":"ReLU","keyWord":"ReLU","icon":"resources/test.svg","api":"torch.nn.ReLU","style":"position: absolute; left: 1425.93px; top: 982.395px; background-color: rgb(238, 232, 170); width: 300px; right: auto; height: 70px; bottom: auto;","Layer_ID":"ReLU_layer_8","outShape":[50,128,32,32],"prev":["InputLayer_layer_11"],"next":["Conv2d_layer_3","Conv2d_layer_5","Conv2d_layer_1","MaxPool2d_layer_6"],"params":{"inplace":{"type":"Boolean","value":"False"}},"funcs":{"Check_Layer_inShape":"ReLU_Check_Layer_inShape","Update_Layer_outSape":"ReLU_Update_Layer_outSape"}},{"metaName":"Other_layers_metaData","type":"Layer","name":"InputLayer","keyWord":"InputLayer","icon":"resources/test.svg","api":"","style":"position: absolute; left: 1424.6px; top: 1180.85px; background-color: rgb(238, 232, 170); width: 300px; right: auto; height: 70px; bottom: auto;","Layer_ID":"InputLayer_layer_11","outShape":[50,128,32,32],"prev":[],"next":["ReLU_layer_8"],"params":{"input_size":{"type":"PI_List_[N,*]","value":"[50,128,32,32]"}},"funcs":{"Check_Layer_inShape":"InputLayer_Check_Layer_inShape","Update_Layer_outSape":"InputLayer_Update_Layer_outSape"}},{"metaName":"Other_layers_metaData","type":"Layer","name":"OutputLayer","keyWord":"OutputLayer","icon":"resources/test.svg","api":"","style":"position: absolute; left: 1413.96px; top: 79.8424px; background-color: rgb(238, 232, 170); width: 300px; right: auto; height: 70px; bottom: auto;","Layer_ID":"OutputLayer_layer_12","outShape":[50,1536,32,32],"prev":["ConcatenateLayer_layer_13"],"next":[],"params":{"Output_size":{"type":"PI_List_[N_or_-1,*]","value":"[50,1536,32,32]"}},"funcs":{"Check_Layer_inShape":"OutputLayer_Check_Layer_inShape","Update_Layer_outSape":"OutputLayer_Update_Layer_outSape"}},{"metaName":"Other_layers_metaData","type":"Layer","name":"ConcatenateLayer","keyWord":"ConcatenateLayer","icon":"resources/test.svg","api":"torch.cat","style":"position: absolute; left: 1413.05px; top: 241.788px; background-color: rgb(238, 232, 170); width: 300px; right: auto; height: 70px; bottom: auto;","Layer_ID":"ConcatenateLayer_layer_13","outShape":[50,1536,32,32],"prev":["Conv2d_layer_1","Conv2d_layer_2","Conv2d_layer_4","Conv2d_layer_7"],"next":["OutputLayer_layer_12"],"params":{"dim":{"type":"Non_Negative_Integer","value":"1"}},"funcs":{"Check_Layer_inShape":"ConcatenateLayer_Check_Layer_inShape","Update_Layer_outSape":"ConcatenateLayer_Update_Layer_outSape"}}]',
                // 该 block 所包含的所有 connections
                "BlockConnections" : '[{"sourceId":"ReLU_layer_8","targetId":"Conv2d_layer_3"},{"sourceId":"ReLU_layer_8","targetId":"Conv2d_layer_5"},{"sourceId":"ReLU_layer_8","targetId":"Conv2d_layer_1"},{"sourceId":"ReLU_layer_8","targetId":"MaxPool2d_layer_6"},{"sourceId":"Conv2d_layer_3","targetId":"Conv2d_layer_2"},{"sourceId":"Conv2d_layer_5","targetId":"Conv2d_layer_4"},{"sourceId":"MaxPool2d_layer_6","targetId":"Conv2d_layer_7"},{"sourceId":"InputLayer_layer_11","targetId":"ReLU_layer_8"},{"sourceId":"Conv2d_layer_1","targetId":"ConcatenateLayer_layer_13"},{"sourceId":"Conv2d_layer_2","targetId":"ConcatenateLayer_layer_13"},{"sourceId":"Conv2d_layer_4","targetId":"ConcatenateLayer_layer_13"},{"sourceId":"Conv2d_layer_7","targetId":"ConcatenateLayer_layer_13"},{"sourceId":"ConcatenateLayer_layer_13","targetId":"OutputLayer_layer_12"}]',
            }
        },
    }
];



/******************************************************* 对应的函数实现 *******************************************************/
/*
    检查
*/
function Blocks_Check_Layer_inShape(block_id, inShape_array_str){
    // 获取输入数组
    let inShape_array = JSON.parse(inShape_array_str);

    // Blocks 只允许一个输入
    if(inShape_array.length != 1){
        return "Error : " + block_id + " : requires only one input, but gets " + inShape_array.length +  "!\n";
    }

    // 获取 Block block_id 的输入维度
    let block_info_json = JSON.parse($("#" + block_id + " .layer_json_data")[0].innerHTML);
    let dimNumber = parseInt(block_info_json["BlockDetails"]["DimsNumber"]);

    if(inShape_array[0].length != dimNumber){
        return "Error : " + block_id + " -- shape of input requires " + dimNumber + " dimensions, but gets " + inShape_array[0].length + ".\n";
    }

    return "";
}



/*
    检查 block 是否正常
    由于 block 可能会嵌套，所以用重新绘制 block 然后检测的办法
*/
function Blocks_Update_Layer_outSape(block_id, inShape_array_str){
    /************************ 1. 首先检查输入是否正常 ************************/
    let inputInfo =  Blocks_Check_Layer_inShape(block_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    /************************ 2. 输入未发生变化，可以直接用上次的有效值 ************************/
    let  InShape = JSON.parse(inShape_array_str)[0];

    // 如果 block 的 InShape 字段不为 []，且与输入尺寸相同，则一切正常，不作任何检测，直接返回 ""
    if(JSON.stringify(InShape) == JSON.stringify(JSON.parse($("#" + block_id + " .layer_json_data")[0].innerHTML)["InShape"])){
        return  "";
    }else{  // 若不相同，则直接返回非空字符串
        let blockInfo = JSON.parse($("#" + block_id + " .layer_json_data")[0].innerHTML);

        blockInfo["outShape"] = [];
        blockInfo["InShape"]  = [];

        blockInfo["api"]             = "";
        blockInfo["ClassDefineStr"]  = "";

        $("#" + block_id + " .layer_json_data")[0].innerHTML = JSON.stringify(blockInfo);

        return "Error : " + block_id + " : something is wrong inside the block, dobule click it to check!\n";
    }
}