/*

*/

var Distance_functions_metaData = [
    {
        // 第一个元素包含该 metaData 的基本信息
        "metaDataName"      : "Distance_functions_metaData",   // metaData 的名字
        "metaDataType"      : "Layers_metaData",               // metaData 的类型
        "dom_div_name"      : "Distance_functions",            // 该字段用于生成列表中的 header 和 list 名
        "dom_header_text"   : "Distance Functions"             // header 上显示的描述名
    },
    {
        /*
            ** 层功能 **：
                在指定维度上，计算 x1 和 x2 之间的余弦距离（相似度）。计算公式如下所示：
                    similarity = x1 * x2 / (max(||x1||_2 * max(||x2||_2, ϵ))

            ** 层说明 **：

            
            ** 层构造参数 **：
                dim  ： 正整数，可选，用于指定在哪个维度上计算余弦距离，默认为 1
                eps  ： float 参数，可选，用于避免分母为 0 的很小的值，默认为 1e-8

            ** 层输入 **：
                尺寸          ： 
                                Input1 ： (∗1,D,∗2) where D is at position dim
                                Input2 ： (∗1,D,∗2) same shape as the Input1

            ** 层输出 **：
                尺寸          ： Output :  (∗1,∗2)

            ** 模型学习参数 **：
            
            ** 示例 **：
                input1 = torch.randn(100, 128)
                input2 = torch.randn(100, 128)
                cos = nn.CosineSimilarity(dim=1, eps=1e-6)
                output = cos(input1, input2)

        */
        "CosineSimilarity":{
            "metaName":"Distance_functions_metaData",     // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"CosineSimilarity",                    // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "CosineSimilarity",               // 搜索时对应的关键字
            "api":"torch.nn.CosineSimilarity",            // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "dim" : {"type" : "Non_Negative_Integer", "value" : "1"},
                "eps" : {"type" : "Real_(0,1)",           "value" : "1e-08"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "CosineSimilarity_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "CosineSimilarity_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                计算 batch 范围内的向量距离，计算方式如下：
                    ||x||_p := (sum_(i=1)^n(|x_i|^p))^(1/p)

            ** 层说明 **：

            
            ** 层构造参数 **：
                p       ： 正实数，默认为 2
                eps     ： float 参数，可选，用于避免分母为 0 的很小的值，默认为 1e-6
                keepdim ： 布尔值，决定是否保持 batch 维度，默认为 False

            ** 层输入 **：
                尺寸          ： 
                                Input1 ： (N,D)  where D = vector dimension
                                Input1 ： (N,D), same shape as the Input1

            ** 层输出 **：
                尺寸          ：  (N). If keepdim is False, then (N,1).

            ** 模型学习参数 **：
            
            ** 示例 **：
                pdist  = nn.PairwiseDistance(p=2)
                input1 = torch.randn(100, 128)
                input2 = torch.randn(100, 128)
                output = pdist(input1, input2)

        */
        "PairwiseDistance":{
            "metaName":"Distance_functions_metaData",     // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"PairwiseDistance",                    // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "PairwiseDistance",               // 搜索时对应的关键字
            "api":"torch.nn.PairwiseDistance",            // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "p"       : {"type" : "Real_(0,inf)",  "value" : "2"},
                "eps"     : {"type" : "Real_(0,1)",    "value" : "1e-06"},
                "keepdim" : {"type" : "Boolean",       "value" : "False"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "PairwiseDistance_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "PairwiseDistance_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    }
];



/******************************************************* 对应的函数实现 *******************************************************/
/*
    只单纯的负责检测 CosineSimilarity 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id          ： 当前层的 id
    inShape_array_str ： 输入尺寸的数组的字符串（JSON）
*/
function CosineSimilarity_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： 
            Input1 ： (∗1,D,∗2) where D is at position dim
            Input2 ： (∗1,D,∗2) same shape as the Input1
    */
    // 1. 解析成数组
    let inShape_array = JSON.parse(inShape_array_str);

    // 2. 检查输入数目
    if(inShape_array.length != 2){
        return "Error : " + layer_id + " : requires two inputs, but gets " + inShape_array.length +  "!\n";
    }

    // 3. 检查输入尺寸的维度
    if(inShape_array[0].length < 2){
        return "Error : " + layer_id + " -- shape of input1 requires at least 2 dimensions([N,*]), but gets " + inShape_array[0].length + ".\n";
    }
    if(inShape_array[1].length < 2){
        return "Error : " + layer_id + " -- shape of input2 requires at least 2 dimensions([N,*]), but gets " + inShape_array[1].length + ".\n";
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
function CosineSimilarity_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： 
            Input1 ： (∗1,D,∗2) where D is at position dim
            Input2 ： (∗1,D,∗2) same shape as the Input1
        预期的输出尺寸为 ： 
            Output :  (∗1,∗2)
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  CosineSimilarity_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape1 = inShape_array[0];
    let inShape2 = inShape_array[1];
    if(inShape1.length != inShape2.length){  // 两个输入的维数应该一样
        return "Error : " + layer_id + "-- the shapes(" + inShape1 + "), (" + inShape2 + ") of two inputs should be the same!";
    }
    for(let dimIndex = 0; dimIndex < inShape1.length; dimIndex++){  // 两个输入的尺寸应该一致
        if(inShape1[dimIndex] != inShape2[dimIndex]){
            return "Error : " + layer_id  + "-- the shapes(" + inShape1 + "), (" + inShape2 + ") of two inputs should be the same!\n";
        }
    }

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let dim = layer_info_json["params"]["dim"]["value"];

    // 4. 检查输入参数与输入尺寸之间是否冲突
    if(parseInt(dim) >= inShape1.length){   // 检测指定的维度
        return "Error : " + layer_id + " -- the dim(" + dim + ") you want to apply to CosineSimilarity should be less then the dimensions(" + inShape1.length + ") of input.\n";
    }

    // 5. 计算并更新输出尺寸
    let outShape = JSON.parse(JSON.stringify(inShape1));
    outShape.splice(dim,1);

    // 6. 检查计算结果是否符合逻辑
    
    // 7. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 8. 成功，返回空字符串
    return "";
}



/*
    只单纯的负责检测 PairwiseDistance 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id          ： 当前层的 id
    inShape_array_str ： 输入尺寸的数组的字符串（JSON）
*/
function PairwiseDistance_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： 
            (N,D)
    */
    // 1. 解析成数组
    let inShape_array = JSON.parse(inShape_array_str);

    // 2. 检查输入数目
    if(inShape_array.length != 2){
        return "Error : " + layer_id + " : requires two inputs, but gets " + inShape_array.length +  "!\n";
    }

    // 3. 检查输入尺寸的维度
    if((inShape_array[0].length != 2)){
        return "Error : " + layer_id + " -- shape of input1 requires at 2 dimensions([N,D]), but gets " + inShape_array[0].length + ".\n";
    }
    if((inShape_array[1].length != 2)){
        return "Error : " + layer_id + " -- shape of input2 requires at 2 dimensions([N,D]), but gets " + inShape_array[1].length + ".\n";
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
function PairwiseDistance_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： (N,D)
        预期的输出尺寸为 ： (N). If keepdim is False, then (N,1).
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  PairwiseDistance_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape1 = inShape_array[0];
    let inShape2 = inShape_array[1];

    if((inShape1[0] != inShape2[0]) || (inShape1[1] != inShape2[1])){
        return "Error : " + layer_id + "-- the shapes([" + inShape1 + "], [" + inShape2 + "]) of two inputs should be the same!";
    }

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let keepdim = layer_info_json["params"]["keepdim"]["value"].trim();

    // 4. 检查输入参数与输入尺寸之间是否冲突

    // 5. 计算并更新输出尺寸
    let outShape = [inShape1[0]];
    if(keepdim == "False"){
        outShape.push(1);
    }

    // 6. 检查计算结果是否符合逻辑
    
    // 7. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 8. 成功，返回空字符串
    return "";
}