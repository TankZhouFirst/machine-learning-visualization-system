/* 所有预置线性层  Linear_layers_metaData */



/******************************************************* 层数据 *******************************************************/
var Linear_layers_metaData = [
    {
        // 第一个元素包含该 metaData 的基本信息
        "metaDataName"      : "Linear_layers_metaData",   // metaData 的名字
        "metaDataType"      : "Layers_metaData",          // metaData 的类型
        "dom_div_name"      : "Linear_layers",            // 该字段用于生成列表中的 header 和 list 名
        "dom_header_text"   : "Linear Layers"             // header 上显示的描述名
    },
    {
        /*
            ** 层功能 **：
                线性转换 ： y =  x * A^T + b

            ** 层说明 **：

            ** 层构造参数 **：
                in_features  :  输入特征数，正整数
                out_features ： 输出特征数，正整数
                bias         ： If set to False, the layer will not learn an additive bias. Default: True

            ** 层输入 **：
                尺寸          ： [N, ∗, in_features]    ∗  means any number of additional dimensions

            ** 层输出 **：
                尺寸          ： [N,∗,out_features]     除了输出特征数之外，其余与输入尺寸一致

            ** 模型学习参数 **：
                weight – the learnable weights of the module of shape (out_features x in_features)
                bias – the learnable bias of the module of shape (out_features)
            
            ** 示例 **：
                m = nn.Linear(20, 30)
                input = torch.randn(128, 20)
                output = m(input)
                print(output.size())

        */
        "Linear":{
            "metaName":"Linear_layers_metaData",          // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"Linear",                              // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "Linear FC full connection",      // 搜索时对应的关键字
            "api":"torch.nn.Linear",                      // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "in_features"  : {"type" : "Positive_Integer",  "value" : ""},
                "out_features" : {"type" : "Positive_Integer",  "value" : ""},
                "bias"         : {"type" : "Boolean",           "value" : "True"},
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "Linear_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "Linear_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                线性转换 ： y = x_1 * A^T * x_2 + b

            ** 层说明 **：

            ** 层构造参数 **：
                in1_features :  输入特征数，正整数
                in2_features :  输入特征数，正整数
                out_features ： 输出特征数，正整数
                bias         ： If set to False, the layer will not learn an additive bias. Default: True

            ** 层输入 **：
                尺寸          ：  (N,∗,in1_features), (N,∗,in2_features)     
                                    ∗  means any number of additional dimensions
                                    除了特征数不同之外，其余维度应该一致

            ** 层输出 **：
                尺寸          ： (N,∗,out_features)     除了输出特征数之外，其余与输入尺寸一致

            ** 模型学习参数 **：
                weight – the learnable weights of the module of shape (out_features x in1_features x in2_features)
                bias – the learnable bias of the module of shape (out_features)
            
            ** 示例 **：
                m = nn.Bilinear(20, 30, 40)
                input1 = torch.randn(128, 20)
                input2 = torch.randn(128, 30)
                output = m(input1, input2)
                print(output.size())

        */
        "Bilinear":{
            "metaName":"Linear_layers_metaData",          // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"Bilinear",                            // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "Bilinear   FC full",             // 搜索时对应的关键字
            "api":"torch.nn.Bilinear",                    // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "in1_features" : {"type" : "Positive_Integer",  "value" : ""},
                "in2_features" : {"type" : "Positive_Integer",  "value" : ""},
                "out_features" : {"type" : "Positive_Integer",  "value" : ""},
                "bias"         : {"type" : "Boolean",           "value" : "True"},
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "Bilinear_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "Bilinear_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
];



/******************************************************* 对应的函数实现 *******************************************************/
/*
    只单纯的负责检测 Linear 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function Linear_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, ∗, in_features] 
    */
    // 1. 解析成数组
    let inShape_array = JSON.parse(inShape_array_str);

    // 2. 检查输入数目
    if(inShape_array.length != 1){
        return "Error : " + layer_id + " : requires only one input, but gets " + inShape_array.length +  "!\n";
    }

    // 3. 检查输入尺寸的维度
    if(inShape_array[0].length < 2){
        return "Error : " + layer_id + " -- shape of input requires at least 2 dimensions([N,*,in_features]), but gets " + inShape_array[0].length + ".\n";
    }

    // 4. 一切正常
    return "";
}



/*
    根据输入的尺寸，计算相应的输出尺寸
    如果合法，则更新对应层的输入输出尺寸字段，并返回 ""
    如果不合法，则返回对应的错误信息
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function Linear_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, ∗, in_features] 
        预期的输出尺寸为 ： [N, ∗, out_features]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  Linear_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];
    let in_features = inShape[inShape.length - 1];     // 获取 in_features

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json    = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let param_in_features  = parseInt(layer_info_json["params"]["in_features"]["value"]);     // 输入通道数
    let param_out_features = parseInt(layer_info_json["params"]["out_features"]["value"]);    // 输出通道数

    // 4. 检查输入参数与输入尺寸之间是否冲突
    if(in_features != param_in_features){
        return 'Error : ' + layer_id + '-- "in_features" parameter(' + param_in_features + ') does not equal input size(' + in_features + ').\n';
    }

    // 5. 计算并更新输出尺寸
    let out_features = param_out_features;
    let outShape = JSON.parse(JSON.stringify(inShape));
    outShape[outShape.length-1] = out_features;

    // 6. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 7. 成功，返回空字符串
    return "";
}



/*
    只单纯的负责检测 Bilinear 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function Bilinear_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, ∗, in1_features] 和 [N, ∗, in1_features] （只有最后一维不同）
    */
    // 1. 解析成数组
    let inShape_array = JSON.parse(inShape_array_str);

    // 2. 检查输入数目
    if(inShape_array.length != 2){
        return "Error : " + layer_id + " : requires two inputs, but gets " + inShape_array.length +  "!\n";
    }

    // 3. 检查输入尺寸的维度
    if((inShape_array[0].length < 2)){
        return "Error : " + layer_id + " -- shape of input1 requires more than 2 dimensions, but get " + inShape_array[0].length + ".\n";
    }
    if((inShape_array[1].length < 2)){
        return "Error : " + layer_id + " -- shape of input2 requires more than 2 dimensions, but get " + inShape_array[1].length + ".\n";
    }

    // 4. 检查两者的尺寸
    if(inShape_array[0].length != inShape_array[1].length){
        return "Error : " + layer_id + " -- dimensions of two inputs should be equal, but get " + inShape_array[0].length + " and " + inShape_array[1].length +  ".\n";
    }

    // 5.  检查元素是否相等
    for(let index = 0; index < inShape_array[0].length - 1; index++){
        if(inShape_array[0][index] != inShape_array[1][index]){
            return 'Error : ' + layer_id + '-- size of every dimension except the last one sholud be equal.\n';
        }
    }

    // 5. 一切正常
    return "";
}



/*
    根据输入的尺寸，计算相应的输出尺寸
    如果合法，则更新对应层的输入输出尺寸字段，并返回 ""
    如果不合法，则返回对应的错误信息
    规定 ： 所有的输出尺寸必须为 [*,*] 形式；所有参数必须已经填写完毕

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function Bilinear_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, ∗, in1_features] 和 [N, ∗, in1_features] （只有最后一维不同）
        预期的输出尺寸为 ： [N, ∗, out_features]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  Bilinear_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape1 = inShape_array[0];
    let inShape2 = inShape_array[1];
    let in1_features   = inShape1[inShape1.length - 1];     // 获取 in_features
    let in2_features   = inShape2[inShape2.length - 1];     // 获取 in_features

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json     = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let param_in1_features  = parseInt(layer_info_json["params"]["in1_features"]["value"]);     // 输入1通道数
    let param_in2_features  = parseInt(layer_info_json["params"]["in2_features"]["value"]);     // 输入2通道数
    let param_out_features  = parseInt(layer_info_json["params"]["out_features"]["value"]);    // 输出通道数

    // 4. 检查输入参数与输入尺寸之间是否冲突
    if(in1_features != param_in1_features){
        return 'Error : ' + layer_id + '-- "in1_features" parameter(' + param_in1_features + ') does not equal input size(' + in1_features + ').\n';
    }
    if(in2_features != param_in2_features){
        return 'Error : ' + layer_id + '-- "in2_features" parameter(' + param_in2_features + ') does not equal input size(' + in2_features + ').\n';
    }

    // 5. 计算并更新输出尺寸
    let out_features = param_out_features;
    let outShape = JSON.parse(JSON.stringify(inShape1));
    outShape[outShape.length-1] = out_features;

    // 6. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 7. 成功，返回空字符串
    return "";
}