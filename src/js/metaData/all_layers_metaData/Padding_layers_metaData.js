/* 所有预置线性层  Padding_layers_metaData */



/******************************************************* 层数据 *******************************************************/
var Padding_layers_metaData = [
    {
        // 第一个元素包含该 metaData 的基本信息
        "metaDataName"      : "Padding_layers_metaData",   // metaData 的名字
        "metaDataType"      : "Layers_metaData",           // metaData 的类型
        "dom_div_name"      : "Padding_layers",            // 该字段用于生成列表中的 header 和 list 名
        "dom_header_text"   : "Padding Layers"             // header 上显示的描述名
    },
    {
        /*
            ** 层功能 **：
                通过输入特征图的边界镜像进行 padding。如： 1 2 3 4 5 6 进行 (2,3) 镜像 padding 后得到：3,2,1,2,3,4,5,6,5,4,3 

            ** 层说明 **：

            
            ** 层构造参数 **：
                padding    ： 指定 padding 的尺寸。由于可能某一边会选择 0 padding，因此应该为非负整数。int 或者 2-D tuple

            ** 层输入 **：
                尺寸          ： [N, C, Lin]

            ** 层输出 **：
                尺寸          ： [N, C, Lout]
                计算          ： Lout = Lin + paddingLeft + paddingRight

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.ReflectionPad1d(2)
                input = torch.arange(8).reshape(1, 2, 4)
                m(input)

        */
        "ReflectionPad1d":{
            "metaName":"Padding_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"ReflectionPad1d",                     // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "ReflectionPad1d reflection padding 1d",    // 搜索时对应的关键字
            "api":"torch.nn.ReflectionPad1d",             // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "padding" : {"type" : "NNI_Or_(x,x)",   "value" : ""}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "ReflectionPad1d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "ReflectionPad1d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                通过输入特征图的边界镜像进行 padding。如： 1 2 3 4 5 6 进行 (2,3) 镜像 padding 后得到：3,2,1,2,3,4,5,6,5,4,3 

            ** 层说明 **：

            
            ** 层构造参数 **：
                padding    ： 指定 padding 的尺寸。由于可能某一边会选择 0 padding，因此应该为非负整数。int 或者 4-D tuple  （left  /right / top / bottom）

            ** 层输入 **：
                尺寸          ： [N, C, Hin, Win]

            ** 层输出 **：
                尺寸          ： [N, C, Hout, Wout]
                计算          ： 
                                Hout = Hin + paddingTop + paddingBottom
                                Wout = Win + paddingLeft + paddingRight

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.ReflectionPad2d(2)
                input = torch.arange(9).reshape(1, 1, 3, 3)
                m(input)

        */
        "ReflectionPad2d":{
            "metaName":"Padding_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"ReflectionPad2d",                     // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "ReflectionPad2d reflection padding 2d",    // 搜索时对应的关键字
            "api":"torch.nn.ReflectionPad2d",             // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "padding" : {"type" : "NNI_Or_(x,x,x,x)",   "value" : ""}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "ReflectionPad2d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "ReflectionPad2d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                通过复制边界进行 padding。如： 1 2 3 4 5 6 进行 (2,3) 复制 padding 后得到：1,1,1,2,3,4,5,6,1,1,1

            ** 层说明 **：

            
            ** 层构造参数 **：
                padding ： 指定 padding 的尺寸。由于可能某一边会选择 0 padding，因此应该为非负整数。int 或者 2-D tuple  （left  /right）

            ** 层输入 **：
                尺寸          ： [N, C, Lin]

            ** 层输出 **：
                尺寸          ： [N, C, Lout]
                计算          ： Lout = Lin + paddingLeft + paddingRight

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.ReplicationPad1d(2)
                input = torch.arange(8).reshape(1, 2, 4)
                m(input)

        */
        "ReplicationPad1d":{
            "metaName":"Padding_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"ReplicationPad1d",                    // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "ReplicationPad1d Replication padding 1d",    // 搜索时对应的关键字
            "api":"torch.nn.ReplicationPad1d",            // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "padding" : {"type" : "NNI_Or_(x,x)",   "value" : ""}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "ReplicationPad1d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "ReplicationPad1d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                通过复制边界进行 padding。如： 1 2 3 4 5 6 进行 (2,3) 复制 padding 后得到：1,1,1,2,3,4,5,6,1,1,1

            ** 层说明 **：

            
            ** 层构造参数 **：
                padding ： 指定 padding 的尺寸。由于可能某一边会选择 0 padding，因此应该为非负整数。int 或者 4-D tuple  （left  /right / top / bottom）

            ** 层输入 **：
                尺寸          ： [N, C, Hin, Win]

            ** 层输出 **：
                尺寸          ： [N, C, Hout, Wout]
                计算          ： 
                                Hout = Hin + paddingTop + paddingBottom
                                Wout = Win + paddingLeft + paddingRight

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.ReplicationPad2d(2)
                input = torch.arange(9).reshape(1, 1, 3, 3)
                m(input)

        */
        "ReplicationPad2d":{
            "metaName":"Padding_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"ReplicationPad2d",                    // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "ReplicationPad2d Replication padding 2d",    // 搜索时对应的关键字
            "api":"torch.nn.ReplicationPad2d",            // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "padding" : {"type" : "NNI_Or_(x,x,x,x)",   "value" : ""}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "ReplicationPad2d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "ReplicationPad2d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                通过复制边界进行 padding。如： 1 2 3 4 5 6 进行 (2,3) 复制 padding 后得到：1,1,1,2,3,4,5,6,1,1,1

            ** 层说明 **：

            
            ** 层构造参数 **：
                padding ： 指定 padding 的尺寸。由于可能某一边会选择 0 padding，因此应该为非负整数。int 或者 6-D tuple  （left  /right / top / bottom / front / bottom）

            ** 层输入 **：
                尺寸          ： [N, C, Din, Hin, Win]

            ** 层输出 **：
                尺寸          ： [N, C, Dout, Hout, Wout]
                计算          ： 
                                Dout = Hin + paddingFront + paddingBack
                                Hout = Hin + paddingTop + paddingBottom
                                Wout = Win + paddingLeft + paddingRight

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.ReplicationPad3d(2)
                input = torch.randn(16, 3, 8, 320, 480)
                m(input)

        */
        "ReplicationPad3d":{
            "metaName":"Padding_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"ReplicationPad3d",                    // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "ReplicationPad3d Replication padding 3d",    // 搜索时对应的关键字
            "api":"torch.nn.ReplicationPad3d",            // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "padding" : {"type" : "NNI_Or_(x,x,x,x,x,x)",   "value" : ""}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "ReplicationPad3d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "ReplicationPad3d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                对输入 tensor 进行 0 padding。

            ** 层说明 **：

            
            ** 层构造参数 **：
                padding ： 指定 padding 的尺寸。由于可能某一边会选择 0 padding，因此应该为非负整数。int 或者 4-D tuple  （left  /right / top / bottom）

            ** 层输入 **：
                尺寸          ： [N, C, Hin, Win]

            ** 层输出 **：
                尺寸          ： [N, C, Hout, Wout]
                计算          ： 
                                Hout = Hin + paddingTop + paddingBottom
                                Wout = Win + paddingLeft + paddingRight

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.ZeroPad2d(2)
                input = torch.randn(1, 1, 3, 3)
                m(input)

        */
        "ZeroPad2d":{
            "metaName":"Padding_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"ZeroPad2d",                           // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "ZeroPad2d Zero padding 2d",      // 搜索时对应的关键字
            "api":"torch.nn.ZeroPad2d",                   // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "padding" : {"type" : "NNI_Or_(x,x,x,x)",   "value" : ""}
            },

            "funcs":{                                     // 一些函数接口
                "Check_Layer_inShape"      : "ZeroPad2d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "ZeroPad2d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                对输入 tensor 进行常数 padding

            ** 层说明 **：

            
            ** 层构造参数 **：
                padding ： 指定 padding 的尺寸。由于可能某一边会选择 0 padding，因此应该为非负整数。int 或者 2-D tuple  （left / right）
                value   ： 用于 padding 的常数，为实数

            ** 层输入 **：
                尺寸          ： [N, C, Win]

            ** 层输出 **：
                尺寸          ： [N, C, Wout]
                计算          ： 
                                Wout = Win + paddingLeft + paddingRight

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.ConstantPad1d(2, 3.5)
                input = torch.randn(1, 2, 4)
                m(input)

        */
        "ConstantPad1d":{
            "metaName":"Padding_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"ConstantPad1d",                       // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "ConstantPad1d Constant padding 1d",      // 搜索时对应的关键字
            "api":"torch.nn.ConstantPad1d",               // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "padding" : {"type" : "NNI_Or_(x,x)",   "value" : ""},
                "value"   : {"type" : "Real_value",     "value" : ""}
            },

            "funcs":{                                     // 一些函数接口
                "Check_Layer_inShape"      : "ConstantPad1d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "ConstantPad1d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                对输入 tensor 进行常数 padding

            ** 层说明 **：

            
            ** 层构造参数 **：
                padding ： 指定 padding 的尺寸。由于可能某一边会选择 0 padding，因此应该为非负整数。int 或者 4-D tuple  （left / right / top / bottom）
                value   ： 用于 padding 的常数，为实数

            ** 层输入 **：
                尺寸          ： [N, C, Hin, Win]

            ** 层输出 **：
                尺寸          ： [N, C, Hout, Wout]
                计算          ： 
                                Hout = Hin + paddingTop + paddingBottom
                                Wout = Win + paddingLeft + paddingRight

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.ConstantPad2d(2, 3.5)
                input = torch.randn(1, 2, 2)
                m(input)

        */
        "ConstantPad2d":{
            "metaName":"Padding_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"ConstantPad2d",                       // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "ConstantPad2d Constant padding 2d",      // 搜索时对应的关键字
            "api":"torch.nn.ConstantPad2d",               // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "padding" : {"type" : "NNI_Or_(x,x,x,x)",   "value" : ""},
                "value"   : {"type" : "Real_value",     "value" : ""}
            },

            "funcs":{                                     // 一些函数接口
                "Check_Layer_inShape"      : "ConstantPad2d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "ConstantPad2d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                对输入 tensor 进行常数 padding

            ** 层说明 **：

            
            ** 层构造参数 **：
                padding ： 指定 padding 的尺寸。由于可能某一边会选择 0 padding，因此应该为非负整数。int 或者 6-D tuple  （left / right / top / bottom / front / back）
                value   ： 用于 padding 的常数，为实数

            ** 层输入 **：
                尺寸          ： [N, C, Din, Hin, Win]

            ** 层输出 **：
                尺寸          ： [N, C, Dout, Hout, Wout]
                计算          ： 
                                Dout = Din + paddingFront + paddingBack
                                Hout = Hin + paddingTop + paddingBottom
                                Wout = Win + paddingLeft + paddingRight

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.ConstantPad2d(2, 3.5)
                input = torch.randn(1, 2, 2)
                m(input)

        */
        "ConstantPad3d":{
            "metaName":"Padding_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"ConstantPad3d",                       // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "ConstantPad3d Constant padding 3d",      // 搜索时对应的关键字
            "api":"torch.nn.ConstantPad3d",               // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "padding" : {"type" : "NNI_Or_(x,x,x,x,x,x)",   "value" : ""},
                "value"   : {"type" : "Real_value",     "value" : ""}
            },

            "funcs":{                                     // 一些函数接口
                "Check_Layer_inShape"      : "ConstantPad3d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "ConstantPad3d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
];



/******************************************************* 对应的函数实现 *******************************************************/
/*
    只单纯的负责检测 ReflectionPad1d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function ReflectionPad1d_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, Cin, Lin]
    */
    // 1. 解析成数组
    let inShape_array = JSON.parse(inShape_array_str);

    // 2. 检查输入数目
    if(inShape_array.length != 1){
        return "Error : " + layer_id + " : requires only one input, but gets " + inShape_array.length +  "!\n";
    }

    // 3. 检查输入尺寸的维度
    if(inShape_array[0].length != 3){
        return "Error : " + layer_id + " -- shape of input requires 3 dimensions([N, Cin, Lin]), but gets " + inShape_array[0].length + ".\n";
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
function ReflectionPad1d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, Cin, Lin] 
        预期的输出尺寸为 ： [N, Cout, Lout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  ReflectionPad1d_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];
    let Batch_Size = inShape[0];
    let Cin        = inShape[1];
    let Lin        = inShape[2];

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let padding = layer_info_json["params"]["padding"]["value"];

    let p1 = 0;
    let p2 = 0;

    if(padding[0] == "("){
        let p_str = padding.substring(1, padding.length-1);
        p1 = parseInt(p_str.split(",")[0]);
        p2 = parseInt(p_str.split(",")[1]);
    }else{
        p1 = parseInt(padding);
        p2 = p1;
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突

    // 5. 计算并更新输出尺寸
    //      Lout = Lin + paddingLeft + paddingRight
    let Cout = Cin;
    let Lout = Lin + p1 + p2;
    let outShape = [Batch_Size, Cout, Lout];

    // 6. 检查计算结果是否符合逻辑
    if(Lout < 1){
        return "Error : " + layer_id + " -- shape of output(" + outShape + ") is invalid.\n";
    }
    
    // 7. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 8. 成功，返回空字符串
    return "";
}



/*
    只单纯的负责检测 MaxPool2d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function ReflectionPad2d_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, Hin, Win]
    */
    // 1. 解析成数组
    let inShape_array = JSON.parse(inShape_array_str);

    // 2. 检查输入数目
    if(inShape_array.length != 1){
        return "Error : " + layer_id + " : requires only one input, but gets " + inShape_array.length +  "!\n";
    }

    // 3. 检查输入尺寸的维度
    if(inShape_array[0].length != 4){
        return "Error : " + layer_id + " -- shape of input requires 4 dimensions([N, C, Hin, Win]), but gets " + inShape_array[0].length + ".\n";
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
function ReflectionPad2d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, Hin, Win]
        预期的输出尺寸为 ： [N, C, Hout, Wout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  ReflectionPad2d_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];
    let Batch_Size = inShape[0];
    let Cin        = inShape[1];
    let Hin        = inShape[2];
    let Win        = inShape[3];

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let padding = layer_info_json["params"]["padding"]["value"];

    let p1 = 0;
    let p2 = 0;
    let p3 = 0;

    if(padding[0] == "("){
        let p_str = padding.substring(1, padding.length-1);
        p1 = parseInt(p_str.split(",")[0]);
        p2 = parseInt(p_str.split(",")[1]);
        p3 = parseInt(p_str.split(",")[2]);
        p4 = parseInt(p_str.split(",")[3]);
    }else{
        p1 = parseInt(padding);
        p2 = p1;
        p3 = p1;
        p4 = p1;
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突

    // 5. 计算并更新输出尺寸
    //      Hout = Hin + paddingTop + paddingBottom
    //      Wout = Win + paddingLeft + paddingRight
    let Cout = Cin;
    let Hout = Hin + p1 + p2;
    let Wout = Win + p3 + p4;

    let outShape = [Batch_Size, Cout, Hout, Wout];

    // 6. 检查计算结果是否符合逻辑
    if(Hout < 1){
        return "Error : " + layer_id + " -- shape of output(" + outShape + ") is invalid.\n";
    }
    if(Wout < 1){
        return "Error : " + layer_id + " -- shape of output(" + outShape + ") is invalid.\n";
    }
    
    // 7. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 8. 成功，返回空字符串
    return "";
}



/*
    只单纯的负责检测 ReplicationPad1d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function ReplicationPad1d_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, Cin, Lin]
    */
    // 1. 解析成数组
    let inShape_array = JSON.parse(inShape_array_str);

    // 2. 检查输入数目
    if(inShape_array.length != 1){
        return "Error : " + layer_id + " : requires only one input, but gets " + inShape_array.length +  "!\n";
    }

    // 3. 检查输入尺寸的维度
    if(inShape_array[0].length != 3){
        return "Error : " + layer_id + " -- shape of input requires 3 dimensions([N, Cin, Lin]), but gets " + inShape_array[0].length + ".\n";
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
function ReplicationPad1d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, Cin, Lin] 
        预期的输出尺寸为 ： [N, Cout, Lout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  ReplicationPad1d_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];
    let Batch_Size = inShape[0];
    let Cin        = inShape[1];
    let Lin        = inShape[2];

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let padding = layer_info_json["params"]["padding"]["value"];

    let p1 = 0;
    let p2 = 0;

    if(padding[0] == "("){
        let p_str = padding.substring(1, padding.length-1);
        p1 = parseInt(p_str.split(",")[0]);
        p2 = parseInt(p_str.split(",")[1]);
    }else{
        p1 = parseInt(padding);
        p2 = p1;
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突

    // 5. 计算并更新输出尺寸
    //      Lout = Lin + paddingLeft + paddingRight
    let Cout = Cin;
    let Lout = Lin + p1 + p2;
    let outShape = [Batch_Size, Cout, Lout];

    // 6. 检查计算结果是否符合逻辑
    if(Lout < 1){
        return "Error : " + layer_id + " -- shape of output(" + outShape + ") is invalid.\n";
    }
    
    // 7. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 8. 成功，返回空字符串
    return "";
}



/*
    只单纯的负责检测 ReplicationPad2d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function ReplicationPad2d_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, Hin, Win]
    */
    // 1. 解析成数组
    let inShape_array = JSON.parse(inShape_array_str);

    // 2. 检查输入数目
    if(inShape_array.length != 1){
        return "Error : " + layer_id + " : requires only one input, but gets " + inShape_array.length +  "!\n";
    }

    // 3. 检查输入尺寸的维度
    if(inShape_array[0].length != 4){
        return "Error : " + layer_id + " -- shape of input requires 4 dimensions([N, C, Hin, Win]), but gets " + inShape_array[0].length + ".\n";
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
function ReplicationPad2d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, Hin, Win]
        预期的输出尺寸为 ： [N, C, Hout, Wout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  ReplicationPad2d_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];
    let Batch_Size = inShape[0];
    let Cin        = inShape[1];
    let Hin        = inShape[2];
    let Win        = inShape[3];

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let padding = layer_info_json["params"]["padding"]["value"];

    let p1 = 0;
    let p2 = 0;
    let p3 = 0;
    let p4 = 0;

    if(padding[0] == "("){
        let p_str = padding.substring(1, padding.length-1);
        p1 = parseInt(p_str.split(",")[0]);
        p2 = parseInt(p_str.split(",")[1]);
        p3 = parseInt(p_str.split(",")[2]);
        p4 = parseInt(p_str.split(",")[3]);
    }else{
        p1 = parseInt(padding);
        p2 = p1;
        p3 = p1;
        p4 = p1;
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突

    // 5. 计算并更新输出尺寸
    //      Hout = Hin + paddingTop + paddingBottom
    //      Wout = Win + paddingLeft + paddingRight
    let Cout = Cin;
    let Hout = Hin + p1 + p2;
    let Wout = Win + p3 + p4;

    let outShape = [Batch_Size, Cout, Hout, Wout];

    // 6. 检查计算结果是否符合逻辑
    if(Hout < 1){
        return "Error : " + layer_id + " -- shape of output(" + outShape + ") is invalid.\n";
    }
    if(Wout < 1){
        return "Error : " + layer_id + " -- shape of output(" + outShape + ") is invalid.\n";
    }
    
    // 7. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 8. 成功，返回空字符串
    return "";
}



/*
    只单纯的负责检测 ReplicationPad3d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function ReplicationPad3d_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, Din, Hin, Win]
    */
    // 1. 解析成数组
    let inShape_array = JSON.parse(inShape_array_str);

    // 2. 检查输入数目
    if(inShape_array.length != 1){
        return "Error : " + layer_id + " : requires only one input, but gets " + inShape_array.length +  "!\n";
    }

    // 3. 检查输入尺寸的维度
    if(inShape_array[0].length != 5){
        return "Error : " + layer_id + " -- shape of input requires 4 dimensions([N, C, Din, Hin, Win]), but gets " + inShape_array[0].length + ".\n";
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
function ReplicationPad3d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, Din, Hin, Win]
        预期的输出尺寸为 ： [N, C, Dout, Hout, Wout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  ReplicationPad3d_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];
    let Batch_Size = inShape[0];
    let Cin        = inShape[1];
    let Din        = inShape[2];
    let Hin        = inShape[3];
    let Win        = inShape[4];

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let padding = layer_info_json["params"]["padding"]["value"];

    let p1 = 0;
    let p2 = 0;
    let p3 = 0;
    let p4 = 0;
    let p5 = 0;
    let p6 = 0;

    if(padding[0] == "("){
        let p_str = padding.substring(1, padding.length-1);
        p1 = parseInt(p_str.split(",")[0]);
        p2 = parseInt(p_str.split(",")[1]);
        p3 = parseInt(p_str.split(",")[2]);
        p4 = parseInt(p_str.split(",")[3]);
        p5 = parseInt(p_str.split(",")[4]);
        p6 = parseInt(p_str.split(",")[5]);
    }else{
        p1 = parseInt(padding);
        p2 = p1;
        p3 = p1;
        p4 = p1;
        p5 = p1;
        p6 = p1;
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突

    // 5. 计算并更新输出尺寸
    //      Hout = Hin + paddingTop + paddingBottom
    //      Wout = Win + paddingLeft + paddingRight
    let Cout = Cin;
    let Dout = Din + p1 + p2;
    let Hout = Hin + p3 + p4;
    let Wout = Win + p5 + p6;

    let outShape = [Batch_Size, Cout, Dout, Hout, Wout];

    // 6. 检查计算结果是否符合逻辑
    if(Dout < 1){
        return "Error : " + layer_id + " -- shape of output(" + outShape + ") is invalid.\n";
    }
    if(Hout < 1){
        return "Error : " + layer_id + " -- shape of output(" + outShape + ") is invalid.\n";
    }
    if(Wout < 1){
        return "Error : " + layer_id + " -- shape of output(" + outShape + ") is invalid.\n";
    }
    
    // 7. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 8. 成功，返回空字符串
    return "";
}



/*
    只单纯的负责检测 ZeroPad2d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function ZeroPad2d_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, Hin, Win]
    */
    // 1. 解析成数组
    let inShape_array = JSON.parse(inShape_array_str);

    // 2. 检查输入数目
    if(inShape_array.length != 1){
        return "Error : " + layer_id + " : requires only one input, but gets " + inShape_array.length +  "!\n";
    }

    // 3. 检查输入尺寸的维度
    if(inShape_array[0].length != 4){
        return "Error : " + layer_id + " -- shape of input requires 4 dimensions([N, C, Hin, Win]), but gets " + inShape_array[0].length + ".\n";
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
function ZeroPad2d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, Hin, Win]
        预期的输出尺寸为 ： [N, C, Hout, Wout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  ZeroPad2d_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];
    let Batch_Size = inShape[0];
    let Cin        = inShape[1];
    let Hin        = inShape[2];
    let Win        = inShape[3];

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let padding = layer_info_json["params"]["padding"]["value"];

    let p1 = 0;
    let p2 = 0;
    let p3 = 0;

    if(padding[0] == "("){
        let p_str = padding.substring(1, padding.length-1);
        p1 = parseInt(p_str.split(",")[0]);
        p2 = parseInt(p_str.split(",")[1]);
        p3 = parseInt(p_str.split(",")[2]);
        p4 = parseInt(p_str.split(",")[3]);
    }else{
        p1 = parseInt(padding);
        p2 = p1;
        p3 = p1;
        p4 = p1;
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突

    // 5. 计算并更新输出尺寸
    //      Hout = Hin + paddingTop + paddingBottom
    //      Wout = Win + paddingLeft + paddingRight
    let Cout = Cin;
    let Hout = Hin + p1 + p2;
    let Wout = Win + p3 + p4;

    let outShape = [Batch_Size, Cout, Hout, Wout];

    // 6. 检查计算结果是否符合逻辑
    if(Hout < 1){
        return "Error : " + layer_id + " -- shape of output(" + outShape + ") is invalid.\n";
    }
    if(Wout < 1){
        return "Error : " + layer_id + " -- shape of output(" + outShape + ") is invalid.\n";
    }
    
    // 7. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 8. 成功，返回空字符串
    return "";
}



/*
    只单纯的负责检测 ConstantPad1d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function ConstantPad1d_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, Cin, Lin]
    */
    // 1. 解析成数组
    let inShape_array = JSON.parse(inShape_array_str);

    // 2. 检查输入数目
    if(inShape_array.length != 1){
        return "Error : " + layer_id + " : requires only one input, but gets " + inShape_array.length +  "!\n";
    }

    // 3. 检查输入尺寸的维度
    if(inShape_array[0].length != 3){
        return "Error : " + layer_id + " -- shape of input requires 3 dimensions([N, Cin, Lin]), but gets " + inShape_array[0].length + ".\n";
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
function ConstantPad1d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, Cin, Lin] 
        预期的输出尺寸为 ： [N, Cout, Lout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  ConstantPad1d_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];
    let Batch_Size = inShape[0];
    let Cin        = inShape[1];
    let Lin        = inShape[2];

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let padding = layer_info_json["params"]["padding"]["value"];

    let p1 = 0;
    let p2 = 0;

    if(padding[0] == "("){
        let p_str = padding.substring(1, padding.length-1);
        p1 = parseInt(p_str.split(",")[0]);
        p2 = parseInt(p_str.split(",")[1]);
    }else{
        p1 = parseInt(padding);
        p2 = p1;
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突

    // 5. 计算并更新输出尺寸
    //      Lout = Lin + paddingLeft + paddingRight
    let Cout = Cin;
    let Lout = Lin + p1 + p2;
    let outShape = [Batch_Size, Cout, Lout];

    // 6. 检查计算结果是否符合逻辑
    if(Lout < 1){
        return "Error : " + layer_id + " -- shape of output(" + outShape + ") is invalid.\n";
    }
    
    // 7. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 8. 成功，返回空字符串
    return "";
}



/*
    只单纯的负责检测 ConstantPad2d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function ConstantPad2d_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, Hin, Win]
    */
    // 1. 解析成数组
    let inShape_array = JSON.parse(inShape_array_str);

    // 2. 检查输入数目
    if(inShape_array.length != 1){
        return "Error : " + layer_id + " : requires only one input, but gets " + inShape_array.length +  "!\n";
    }

    // 3. 检查输入尺寸的维度
    if(inShape_array[0].length != 4){
        return "Error : " + layer_id + " -- shape of input requires 4 dimensions([N, C, Hin, Win]), but gets " + inShape_array[0].length + ".\n";
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
function ConstantPad2d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, Hin, Win]
        预期的输出尺寸为 ： [N, C, Hout, Wout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  ConstantPad2d_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];
    let Batch_Size = inShape[0];
    let Cin        = inShape[1];
    let Hin        = inShape[2];
    let Win        = inShape[3];

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let padding = layer_info_json["params"]["padding"]["value"];

    let p1 = 0;
    let p2 = 0;
    let p3 = 0;
    let p4 = 0;

    if(padding[0] == "("){
        let p_str = padding.substring(1, padding.length-1);
        p1 = parseInt(p_str.split(",")[0]);
        p2 = parseInt(p_str.split(",")[1]);
        p3 = parseInt(p_str.split(",")[2]);
        p4 = parseInt(p_str.split(",")[3]);
    }else{
        p1 = parseInt(padding);
        p2 = p1;
        p3 = p1;
        p4 = p1;
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突

    // 5. 计算并更新输出尺寸
    //      Hout = Hin + paddingTop + paddingBottom
    //      Wout = Win + paddingLeft + paddingRight
    let Cout = Cin;
    let Hout = Hin + p1 + p2;
    let Wout = Win + p3 + p4;

    let outShape = [Batch_Size, Cout, Hout, Wout];

    // 6. 检查计算结果是否符合逻辑
    if(Hout < 1){
        return "Error : " + layer_id + " -- shape of output(" + outShape + ") is invalid.\n";
    }
    if(Wout < 1){
        return "Error : " + layer_id + " -- shape of output(" + outShape + ") is invalid.\n";
    }
    
    // 7. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 8. 成功，返回空字符串
    return "";
}



/*
    只单纯的负责检测 ConstantPad3d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function ConstantPad3d_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, Din, Hin, Win]
    */
    // 1. 解析成数组
    let inShape_array = JSON.parse(inShape_array_str);

    // 2. 检查输入数目
    if(inShape_array.length != 1){
        return "Error : " + layer_id + " : requires only one input, but gets " + inShape_array.length +  "!\n";
    }

    // 3. 检查输入尺寸的维度
    if(inShape_array[0].length != 5){
        return "Error : " + layer_id + " -- shape of input requires 5 dimensions([N, C, Din, Hin, Win]), but gets " + inShape_array[0].length + ".\n";
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
function ConstantPad3d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, Din, Hin, Win]
        预期的输出尺寸为 ： [N, C, Dout, Hout, Wout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  ConstantPad3d_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];
    let Batch_Size = inShape[0];
    let Cin        = inShape[1];
    let Din        = inShape[2];
    let Hin        = inShape[3];
    let Win        = inShape[4];

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let padding = layer_info_json["params"]["padding"]["value"];

    let p1 = 0;
    let p2 = 0;
    let p3 = 0;
    let p4 = 0;
    let p5 = 0;
    let p6 = 0;

    if(padding[0] == "("){
        let p_str = padding.substring(1, padding.length-1);
        p1 = parseInt(p_str.split(",")[0]);
        p2 = parseInt(p_str.split(",")[1]);
        p3 = parseInt(p_str.split(",")[2]);
        p4 = parseInt(p_str.split(",")[3]);
        p5 = parseInt(p_str.split(",")[4]);
        p6 = parseInt(p_str.split(",")[5]);
    }else{
        p1 = parseInt(padding);
        p2 = p1;
        p3 = p1;
        p4 = p1;
        p5 = p1;
        p6 = p1;
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突

    // 5. 计算并更新输出尺寸
    //      Hout = Hin + paddingTop + paddingBottom
    //      Wout = Win + paddingLeft + paddingRight
    let Cout = Cin;
    let Dout = Din + p1 + p2;
    let Hout = Hin + p3 + p4;
    let Wout = Win + p5 + p6;

    let outShape = [Batch_Size, Cout, Dout, Hout, Wout];

    // 6. 检查计算结果是否符合逻辑
    if(Dout < 1){
        return "Error : " + layer_id + " -- shape of output(" + outShape + ") is invalid.\n";
    }
    if(Hout < 1){
        return "Error : " + layer_id + " -- shape of output(" + outShape + ") is invalid.\n";
    }
    if(Wout < 1){
        return "Error : " + layer_id + " -- shape of output(" + outShape + ") is invalid.\n";
    }
    
    // 7. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 8. 成功，返回空字符串
    return "";
}