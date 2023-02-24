/* 所有预置 dropout 层  Dropout_layers_metaData */



/******************************************************* 层数据 *******************************************************/
var Dropout_layers_metaData = [
    {
        // 第一个元素包含该 metaData 的基本信息
        "metaDataName"      : "Dropout_layers_metaData",   // metaData 的名字
        "metaDataType"      : "Layers_metaData",           // metaData 的类型
        "dom_div_name"      : "Dropout_layers",            // 该字段用于生成列表中的 header 和 list 名
        "dom_header_text"   : "Dropout Layers"             // header 上显示的描述名
    },
    {
        /*
            ** 层功能 **：
                在训练阶段，按照指定概率（伯努力分布），将输入 tensor 的某些元素随即便为 0。在每一次前向传播的过程中，都需要进行不同的随机。
                这种方式可以进行有效的正则化，避免神经元之间的 co-adaption。

                此外，由于随机屏蔽掉了部分神经元的输入，因此需要在输出部分除以一个 (1 - p) 来还原总的输出。这就意味着，在验证阶段，可以直接使用该模型。

            ** 层说明 **：

            ** 层构造参数 **：
                p            :  屏蔽的概率，(0,1) 之间的小数
                inplace      :  If set to True, will do this operation in-place. Default: False

            ** 层输入 **：
                尺寸          ： Input can be of any shape

            ** 层输出 **：
                尺寸          ： Output is of the same shape as input

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.Dropout(p=0.2)
                input = torch.randn(20, 16)
                output = m(input)

        */
        "Dropout":{
            "metaName":"Dropout_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"Dropout",                             // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "Dropout",                        // 搜索时对应的关键字
            "api":"torch.nn.Dropout",                     // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "p"       : {"type" : "Real_(0,1)",   "value" : "0.5"},
                "inplace" : {"type" : "Boolean",      "value" : "False"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "Dropout_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "Dropout_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                随机屏蔽输入的整个 channels 。也就是说，每次 dropout，将会用 0 替换掉若干通道（整个通道的所有元素）。通常从 nn.conv2d 获取输入。

                如果各通道之间强度相关（通常出现在神经网络的前几层），那么 dropout 可能不会正则化，而是导致识别率的降低。此时就需要使用 nn.dropout2d 来提升通道之间的独立性。

            ** 层说明 **：

            ** 层构造参数 **：
                p            :  屏蔽的概率，(0,1) 之间的小数
                inplace      :  If set to True, will do this operation in-place. Default: False

            ** 层输入 **：
                尺寸          ： (N,C,H,W)

            ** 层输出 **：
                尺寸          ： Output is of the same shape as input

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.Dropout2d(p=0.2)
                input = torch.randn(20, 16, 32, 32)
                output = m(input)

        */
        "Dropout2d":{
            "metaName":"Dropout_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"Dropout2d",                           // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "Dropout2d",                      // 搜索时对应的关键字
            "api":"torch.nn.Dropout2d",                   // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "p"       : {"type" : "Real_(0,1)",   "value" : "0.5"},
                "inplace" : {"type" : "Boolean",      "value" : "False"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "Dropout2d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "Dropout2d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                随机屏蔽输入的整个 channels 。也就是说，每次 dropout，将会用 0 替换掉若干通道（整个通道的所有元素）。通常从 nn.conv3d 获取输入。

                如果各通道之间强度相关（通常出现在神经网络的前几层），那么 dropout 可能不会正则化，而是导致识别率的降低。此时就需要使用 nn.dropout3d 来提升通道之间的独立性。

            ** 层说明 **：

            ** 层构造参数 **：
                p            :  屏蔽的概率，(0,1) 之间的小数
                inplace      :  If set to True, will do this operation in-place. Default: False

            ** 层输入 **：
                尺寸          ： (N,C,D,H,W)

            ** 层输出 **：
                尺寸          ： Output is of the same shape as input

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.Dropout3d(p=0.2)
                input = torch.randn(20, 16, 4, 32, 32)
                output = m(input)

        */
        "Dropout3d":{
            "metaName":"Dropout_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"Dropout3d",                           // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "Dropout3d",                      // 搜索时对应的关键字
            "api":"torch.nn.Dropout3d",                   // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "p"       : {"type" : "Real_(0,1)",   "value" : "0.5"},
                "inplace" : {"type" : "Boolean",      "value" : "False"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "Dropout3d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "Dropout3d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                对输入进行 alpha dropout。

                Alpha dropout 将会保持自归一化的特性（和为 1）。也就是说，对于均值为 0，标准差为 1 的输入而言，其对应的输出均值仍为 0，方差为 1 。
                Alpha Dropout goes hand-in-hand with SELU activation function, which ensures that the outputs have zero mean and unit standard deviation.

                在训练过程中，它将根据概率 p 随机从伯努力分布中对部分输入进行替换，病对这些元素进行缩放和偏移，使得输出的均值和方差保持不变。

            ** 层说明 **：

            ** 层构造参数 **：
                p            :  屏蔽的概率，(0,1) 之间的小数，默认为 0.5
                inplace      :  If set to True, will do this operation in-place. Default: False

            ** 层输入 **：
                尺寸          ： Any

            ** 层输出 **：
                尺寸          ： Output is of the same shape as input

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.AlphaDropout(p=0.2)
                input = torch.randn(20, 16)
                output = m(input)

        */
        "AlphaDropout":{
            "metaName":"Dropout_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"AlphaDropout",                        // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "AlphaDropout",                   // 搜索时对应的关键字
            "api":"torch.nn.AlphaDropout",                // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "p"       : {"type" : "Real_(0,1)",   "value" : "0.5"},
                "inplace" : {"type" : "Boolean",      "value" : "False"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "AlphaDropout_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "AlphaDropout_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
];



/******************************************************* 对应的函数实现 *******************************************************/
/*
    只单纯的负责检测 Dropout 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function Dropout_Check_Layer_inShape(layer_id, inShape_array_str){
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
        return "Error : " + layer_id + " -- shape of input requires at least 2 dimensions([N,*]), but gets " + inShape_array[0].length + ".\n";
    }

    // 4. 一切正常
    return "";
}



/*
    根据输入的尺寸，计算相应的输出尺寸
    如果合法，则更新对应层的输入输出尺寸字段，并返回 ""
    如果不合法，则返回对应的错误信息
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id          ： 当前层的 id
    inShape_array_str ： 输入尺寸的数组的字符串（JSON）
*/
function Dropout_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, *] 
        预期的输出尺寸为 ： [N, *]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  Dropout_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);

    // 4. 检查输入参数与输入尺寸之间是否冲突

    // 5. 计算并更新输出尺寸    
    let outShape = inShape;

    // 6. 检查计算结果是否符合逻辑
    
    // 7. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 8. 成功，返回空字符串
    return "";
}



/*
    只单纯的负责检测 Dropout2d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id          ： 当前层的 id
    inShape_array_str ： 输入尺寸的数组的字符串（JSON）
*/
function Dropout2d_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, H, W]
    */
    // 1. 解析成数组
    let inShape_array = JSON.parse(inShape_array_str);

    // 2. 检查输入数目
    if(inShape_array.length != 1){
        return "Error : " + layer_id + " : requires only one input, but gets " + inShape_array.length +  "!\n";
    }

    // 3. 检查输入尺寸的维度
    if(inShape_array[0].length != 4){
        return "Error : " + layer_id + " -- shape of input requires 4 dimensions([N, C, H, W]), but gets " + inShape_array[0].length + ".\n";
    }

    // 4. 一切正常
    return "";
}



/*
    根据输入的尺寸，计算相应的输出尺寸
    如果合法，则更新对应层的输入输出尺寸字段，并返回 ""
    如果不合法，则返回对应的错误信息
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id          ： 当前层的 id
    inShape_array_str ： 输入尺寸的数组的字符串（JSON）
*/
function Dropout2d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, H, W]
        预期的输出尺寸为 ： [N, C, H, W]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  Dropout2d_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);

    // 4. 检查输入参数与输入尺寸之间是否冲突

    // 5. 计算并更新输出尺寸    
    let outShape = inShape;

    // 6. 检查计算结果是否符合逻辑
    
    // 7. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 8. 成功，返回空字符串
    return "";
}



/*
    只单纯的负责检测 Dropout3d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id          ： 当前层的 id
    inShape_array_str ： 输入尺寸的数组的字符串（JSON）
*/
function Dropout3d_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N,C,D,H,W]
    */
    // 1. 解析成数组
    let inShape_array = JSON.parse(inShape_array_str);

    // 2. 检查输入数目
    if(inShape_array.length != 1){
        return "Error : " + layer_id + " : requires only one input, but gets " + inShape_array.length +  "!\n";
    }

    // 3. 检查输入尺寸的维度
    if(inShape_array[0].length != 5){
        return "Error : " + layer_id + " -- shape of input requires 5 dimensions([N, C, D, H, W]), but gets " + inShape_array[0].length + ".\n";
    }

    // 4. 一切正常
    return "";
}



/*
    根据输入的尺寸，计算相应的输出尺寸
    如果合法，则更新对应层的输入输出尺寸字段，并返回 ""
    如果不合法，则返回对应的错误信息
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id          ： 当前层的 id
    inShape_array_str ： 输入尺寸的数组的字符串（JSON）
*/
function Dropout3d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N,C,D,H,W]
        预期的输出尺寸为 ： [N,C,D,H,W]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  Dropout3d_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);

    // 4. 检查输入参数与输入尺寸之间是否冲突

    // 5. 计算并更新输出尺寸    
    let outShape = inShape;

    // 6. 检查计算结果是否符合逻辑
    
    // 7. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 8. 成功，返回空字符串
    return "";
}



/*
    只单纯的负责检测 AlphaDropout 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function AlphaDropout_Check_Layer_inShape(layer_id, inShape_array_str){
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
        return "Error : " + layer_id + " -- shape of input requires at least 2 dimensions, but gets " + inShape_array[0].length + ".\n";
    }

    // 4. 一切正常
    return "";
}



/*
    根据输入的尺寸，计算相应的输出尺寸
    如果合法，则更新对应层的输入输出尺寸字段，并返回 ""
    如果不合法，则返回对应的错误信息
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id          ： 当前层的 id
    inShape_array_str ： 输入尺寸的数组的字符串（JSON）
*/
function AlphaDropout_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, *] 
        预期的输出尺寸为 ： [N, *]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  AlphaDropout_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);

    // 4. 检查输入参数与输入尺寸之间是否冲突

    // 5. 计算并更新输出尺寸    
    let outShape = inShape;

    // 6. 检查计算结果是否符合逻辑
    
    // 7. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 8. 成功，返回空字符串
    return "";
}