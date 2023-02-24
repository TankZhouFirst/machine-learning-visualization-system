/* 所有预置线性层  Other_layers_metaData */



/******************************************************* 层数据 *******************************************************/
var Other_layers_metaData = [
    {
        // 第一个元素包含该 metaData 的基本信息
        "metaDataName"      : "Other_layers_metaData",   // metaData 的名字
        "metaDataType"      : "Layers_metaData",         // metaData 的类型
        "dom_div_name"      : "Other_layers",            // 该字段用于生成列表中的 header 和 list 名
        "dom_header_text"   : "Other Layers"             // header 上显示的描述名
    },
    {
        /*
            ** 层功能 **：
                定义输入层，表示模型的起始部分，定义输入样本的尺寸，无其他实际作用，且并非真实存在。

            ** 层说明 **：
            

            ** 层构造参数 **：
                input_size   : 用于指定输入数据尺寸，为 list，为：[N,*]

            ** 层输入 **：


            ** 层输出 **：


            ** 模型学习参数 **：

            
            ** 示例 **：


        */
       "InputLayer":{
            "metaName":"Other_layers_metaData",           // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"InputLayer",                          // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "InputLayer",                     // 搜索时对应的关键字
            "api":"",                                     // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "input_size"  : { "type" : "PI_List_[N,*]",     "value" : ""     },
            },

            "funcs":{                                     // 一些函数接口
                "Check_Layer_inShape"      : "InputLayer_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "InputLayer_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                定义输出层，表示模型的结束部分，无其他实际作用，并非真实存在。

            ** 层说明 **：
            

            ** 层构造参数 **：
                Output_size   ： 用于指定输出尺寸，并无其他作用

            ** 层输入 **：
                [N, *]


            ** 层输出 **：


            ** 模型学习参数 **：

            
            ** 示例 **：

        */
       "OutputLayer":{
            "metaName":"Other_layers_metaData",           // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"OutputLayer",                         // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "OutputLayer",                    // 搜索时对应的关键字
            "api":"",                                     // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "Output_size"  : { "type" : "PI_List_[N_or_-1,*]",     "value" : ""     },
            },

            "funcs":{                                     // 一些函数接口
                "Check_Layer_inShape"      : "OutputLayer_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "OutputLayer_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                定义一维展开层。将 [N, *] 展开成 [N, *]

            ** 层说明 **：
            

            ** 层构造参数 **：
                Output_size   ： 输出尺寸，将对该输入进行一维展开，展开成指定尺寸

            ** 层输入 **：


            ** 层输出 **：


            ** 模型学习参数 **：

            
            ** 示例 **：

        */
       "FlattenLayer":{
            "metaName":"Other_layers_metaData",           // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"FlattenLayer",                        // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "FlattenLayer view",              // 搜索时对应的关键字
            "api":"view",                                     // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "Output_size"  : { "type" : "PI_List_[N_or_-1,*]",     "value" : ""     },
            },

            "funcs":{                                     // 一些函数接口
                "Check_Layer_inShape"      : "FlattenLayer_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "FlattenLayer_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                将多个输入层进行对应元素简单相加，输入尺寸必须一致。

            ** 层说明 **：
            

            ** 层构造参数 **：


            ** 层输入 **：
                [N, *]  多输入，所有输入的尺寸必须一致

            ** 层输出 **：


            ** 模型学习参数 **：

            
            ** 示例 **：

        */
       "SumLayer":{
            "metaName":"Other_layers_metaData",           // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"SumLayer",                            // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "SumLayer",                       // 搜索时对应的关键字
            "api":"",                                     // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
            },

            "funcs":{                                     // 一些函数接口
                "Check_Layer_inShape"      : "SumLayer_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "SumLayer_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                对多个输入进行拼接

            ** 层说明 **：
            

            ** 层构造参数 **：
                "dim"   : 指定在哪一个维度上进行拼接

            ** 层输入 **：


            ** 层输出 **：


            ** 模型学习参数 **：

            
            ** 示例 **：
                x = torch.randn(2, 3)
                torch.cat((x, x, x), 0)
                torch.cat((x, x, x), 1)
        */
       "ConcatenateLayer":{
            "metaName":"Other_layers_metaData",           // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"ConcatenateLayer",                    // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "ConcatenateLayer",               // 搜索时对应的关键字
            "api":"torch.cat",                            // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "dim"   : { "type" : "Non_Negative_Integer", "value" : "" }
            },

            "funcs":{                                     // 一些函数接口
                "Check_Layer_inShape"      : "ConcatenateLayer_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "ConcatenateLayer_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
];



/******************************************************* 对应的函数实现 *******************************************************/
/*
    只单纯的负责检测 InputLayer 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function InputLayer_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： 输入层无输入
    */
    // 1. 解析成数组
    let inShape_array = JSON.parse(inShape_array_str);

    // 2. 检查输入数目
    if(inShape_array.length > 0){
        return "Error : " + layer_id + " : input layer should not get input!\n";
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
function InputLayer_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： 无，由用户参数指定
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  InputLayer_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let input_size = layer_info_json["params"]["input_size"]["value"].trim();

    // 4. 检查输入参数与输入尺寸之间是否冲突

    // 5. 计算并更新输出尺寸
    if(input_size == ""){  // 如果为空，则 JSON.parse 不可解析，所以直接指定
        outShape = [];
    }else{
        outShape = JSON.parse(input_size);
    }

    // 6. 检查计算结果是否符合逻辑
    if(outShape.length < 2){
        return "Error : " + layer_id + " -- input Size([" + outShape + "]) is invalid.\n";
    }

    // 7. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 8. 成功，返回空字符串
    return "";
}



/*
    只单纯的负责检测 OutputLayer 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function OutputLayer_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： 任意尺寸
    */
    // 1. 解析成数组
    let inShape_array = JSON.parse(inShape_array_str);

    // 2. 检查输入数目
    if(inShape_array.length != 1){
        return "Error : " + layer_id + " : requires only one input, but gets " + inShape_array.length +  "!\n";
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
function OutputLayer_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： 无，由用户参数指定
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  OutputLayer_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let Output_size = "[]";
    if(layer_info_json["params"]["Output_size"]["value"].trim() != ""){
        Output_size = JSON.parse(layer_info_json["params"]["Output_size"]["value"].trim());
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突
    if(inShape.length != Output_size.length){
        return "Error : " + layer_id + " -- inshape from last layer([" + inShape + "]) and your specification(" + Output_size + ") does not equal.\n"; 
    }

    for(let index = 0; index < inShape.length; index++){
        if(inShape[index] != Output_size[index]){
            return "Error : " + layer_id + " -- inshape from last layer([" + inShape + "]) and your specification(" + Output_size + ") does not equal.\n"; 
        }
    }

    // 5. 计算并更新输出尺寸

    // 6. 检查计算结果是否符合逻辑
    // 7. 保存到该层的相应位置
    let outShape = JSON.parse(JSON.stringify(Output_size));
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);
    
    // 8. 成功，返回空字符串
    return "";
}



/*
    只单纯的负责检测 FlattenLayer 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function FlattenLayer_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, *]
    */
    // 1. 解析成数组
    let inShape_array = JSON.parse(inShape_array_str);

    // 2. 检查输入数目
    if(inShape_array.length != 1){
        return "Error : " + layer_id + " : requires only one input, but gets " + inShape_array.length +  "!\n";
    }

    // 3. 检查输入尺寸的维度
    if(inShape_array[0].length < 2){
        return "Error : " + layer_id + " -- shape of input requires more then one dimensions([N, *]), but gets " + inShape_array[0].length + ".\n";
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
function FlattenLayer_Update_Layer_outSape(layer_id, inShape_array_str){
    // 1. 首先检查输入是否正常
    let inputInfo =  FlattenLayer_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);

    let Output_size = JSON.parse(layer_info_json["params"]["Output_size"]["value"].trim());

    // 4. 检查输入参数与输入尺寸之间是否冲突

    // 5. 计算并更新输出尺寸
    let in_total = 1;
    let out_total = 1;

    for(let index = 1; index < inShape.length; index++){
        in_total *= inShape[index];
    }
    for(let index = 1; index < Output_size.length; index++){
        out_total *= Output_size[index];
    }

    if(in_total != out_total){
        return "Error : total number of input(" + inShape + ") elements and output(" + 
                Output_size + ") elements does not equal!\n";
    }

    let outShape = JSON.parse(JSON.stringify(Output_size));
    outShape.splice(0,1);
    outShape.splice(0,0,inShape[0])

    // 6. 检查计算结果是否符合逻辑
    
    // 7. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 8. 成功，返回空字符串
    return "";
}



/*
    只单纯的负责检测 SumLayer 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function SumLayer_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, ∗, in1_features] 和 [N, ∗, in1_features] （只有最后一维不同）
    */
    // 1. 解析成数组
    let inShape_array = JSON.parse(inShape_array_str);

    // 2. 检查输入数目
    if(inShape_array.length < 2){
        return "Error : " + layer_id + " : requires at least two inputs, but gets " + inShape_array.length +  "!\n";
    }

    // 3. 检查输入尺寸的维度
    for(let index = 0; index < inShape_array.length - 1; index++){  // 所有输入的尺寸必须一致
        if(JSON.stringify(inShape_array[index]) != JSON.stringify(inShape_array[index+1])){
            return "Error : " + layer_id + " -- all input shapes should be the same.\n";
        }
    }

    if((inShape_array[0].length < 2)){
        return "Error : " + layer_id + " -- shape of input requires at least 2 dimensions([N, ∗, in_features]), but get " + inShape_array[0].length + ".\n";
    }

    // 4. 检查两者的尺寸

    // 5.  检查元素是否相等

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
function SumLayer_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： 
        预期的输出尺寸为 ： 
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  SumLayer_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);

    // 4. 检查输入参数与输入尺寸之间是否冲突

    // 5. 计算并更新输出尺寸
    let outShape = inShape_array[0];

    // 6. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 7. 成功，返回空字符串
    return "";
}



/*
    只单纯的负责检测 ConcatenateLayer 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function ConcatenateLayer_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： 
    */
    // 1. 解析成数组
    let inShape_array = JSON.parse(inShape_array_str);

    // 2. 检查输入数目
    if(inShape_array.length < 2){
        return "Error : " + layer_id + " : requires at least two inputs, but gets " + inShape_array.length +  "!\n";
    }

    // 3. 检查输入尺寸的维度
    for(let index = 0; index < inShape_array.length - 1; index++){   // 所有输入的维数必须一样
        if(inShape_array[index].length != inShape_array[index+1].length){
            return "Error : " + layer_id + " -- dimensions of every input should be the same.\n";
        }
    }

    if(inShape_array[0].length < 2){
        return "Error : " + layer_id + " -- shape of input requires at least 2 dimensions([N,*]), but gets " + inShape_array[0].length + ".\n";
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
function ConcatenateLayer_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： 
        预期的输出尺寸为 ： 
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  ConcatenateLayer_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let dim = parseInt(layer_info_json["params"]["dim"]["value"]);

    // 4. 检查输入参数与输入尺寸之间是否冲突
    if(dim >= inShape_array[0].length){
        return "Error : " + layer_id + " -- The dim(" + dim + ") specified by the parameter should be less than the dimensions of input(" + inShape_array[0].length + ").\n";
    }

    for(let index = 0; index < inShape_array.length - 1; index++){  // 遍历所有的输入
        for(let ele_index = 0; ele_index < inShape_array[0].length; ele_index++){  // 遍历每个元素
            if(ele_index != dim){
                if(inShape_array[index][ele_index] != inShape_array[index+1][ele_index]){
                    return "Error : " + layer_id + " -- Except for elements with an index of " + dim + ", the remaining corresponding elements in all inputs should be equal.\n";
                }
            }
        }
    }

    // 5. 计算并更新输出尺寸
    let outShape = inShape_array[0];
    let sum = 0;
    for(let index = 0; index < inShape_array.length; index++){
        sum += inShape_array[index][dim];
    }
    outShape[dim] = sum;

    // 6. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 7. 成功，返回空字符串
    return "";
}