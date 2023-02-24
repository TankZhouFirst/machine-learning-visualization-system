/* 所有预置非线性激活层  Activation_layers_metaData */


/******************************************************* 层数据 *******************************************************/
var Activation_layers_metaData = [
    {
        // 第一个元素包含该 metaData 的基本信息
        "metaDataName"      : "Activation_layers_metaData",   // metaData 的名字
        "metaDataType"      : "Layers_metaData",              // metaData 的类型
        "dom_div_name"      : "Activation_layers",            // 该字段用于生成列表中的 header 和 list 名
        "dom_header_text"   : "Activation Layers"             // header 上显示的描述名
    },
    {
        /*
            ** 层功能 **：
                ELU(x) = max(0,x) + min(0,α ∗ (exp(x) − 1) )

            ** 层说明 **：
            
            ** 层构造参数 **：
                alpha    ： 公式中的 α，为正数，默认为 1.0
                inplace  ： can optionally do the operation in-place. Default: False

            ** 层输入 **：
                尺寸          ： [N, *]

            ** 层输出 **：
                尺寸          ： [N, *]（与输入尺寸一致）

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.ELU()
                input = torch.randn(2)
                output = m(input)

        */
        "ELU":{
            "metaName":"Activation_layers_metaData",      // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"ELU",                                 // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "ELU Exponential Linear Units",   // 搜索时对应的关键字
            "api":"torch.nn.ELU",                         // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化

            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "alpha"   : {"type" : "Real_(0,inf)",   "value" : "1.0"},
                "inplace" : {"type" : "Boolean",        "value" : "False"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "ELU_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "ELU_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                f(x) = if abs(x) > lambd, f = x; else f = 0

            ** 层说明 **：
            
            ** 层构造参数 **：
                lambd    ： 转折边界 lambd，为正数，默认为 0.5

            ** 层输入 **：
                尺寸          ： [N, *]

            ** 层输出 **：
                尺寸          ： [N, *]（与输入尺寸一致）

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.Hardshrink()
                input = torch.randn(2)
                output = m(input)

        */
        "Hardshrink":{
            "metaName":"Activation_layers_metaData",      // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"Hardshrink",                          // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "Hardshrink",                     // 搜索时对应的关键字
            "api":"torch.nn.Hardshrink",                  // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化

            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "lambd" : {"type" : "Real_(0,inf)", "value" : "0.5"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "Hardshrink_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "Hardshrink_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                 if x > max_val : f = max_val;
                 if x < min_val : f = min_val
                 else : f = x

            ** 层说明 **：
            
            ** 层构造参数 **：
                min_val    ： 下边界，为实数，默认为 -1
                max_val    ： 上边界，为实数，默认为 1，一定要比 min_val 大
                inplace    :  can optionally do the operation in-place. Default: False
                min_value  :  已弃用，请勿更改（可以删除该选项）
                max_value  :  已弃用，请勿更改（可以删除该选项）

            ** 层输入 **：
                尺寸          ： [N, *]

            ** 层输出 **：
                尺寸          ： [N, *]（与输入尺寸一致）

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.Hardtanh(-2, 2)
                input = torch.randn(2)
                output = m(input)

        */
        "Hardtanh":{
            "metaName":"Activation_layers_metaData",      // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"Hardtanh",                            // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "Hardtanh",                       // 搜索时对应的关键字
            "api":"torch.nn.Hardtanh",                    // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化

            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "min_val" : { "type" : "Real_value",      "value" : "-1"},
                "max_val" : { "type" : "Real_value",      "value" : "1"},
                "inplace" : { "type" : "Boolean",         "value" : "False"},
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "Hardtanh_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "Hardtanh_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                 LeakyReLU(x) = max(0,x) + negative_slope ∗ min(0,x)

            ** 层说明 **：
            
            ** 层构造参数 **：
                negative_slope  : x < 0 时的系数，正数，默认为 0.01
                inplace         : can optionally do the operation in-place. Default: False

            ** 层输入 **：
                尺寸          ： [N, *]

            ** 层输出 **：
                尺寸          ： [N, *]（与输入尺寸一致）

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.LeakyReLU(0.1)
                input = torch.randn(2)
                output = m(input)

        */
        "LeakyReLU":{
            "metaName":"Activation_layers_metaData",      // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"LeakyReLU",                           // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "LeakyReLU",                      // 搜索时对应的关键字
            "api":"torch.nn.LeakyReLU",                   // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化

            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "negative_slope" : { "type" : "Real_(0,inf)",   "value" : "0.01"},
                "inplace"        : { "type" : "Boolean",        "value" : "False"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "LeakyReLU_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "LeakyReLU_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                 f(x) = log(1 / (1 + exp(−x)))

            ** 层说明 **：
            
            ** 层构造参数 **：

            ** 层输入 **：
                尺寸          ： [N, *]

            ** 层输出 **：
                尺寸          ： [N, *]（与输入尺寸一致）

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.LogSigmoid()
                input = torch.randn(2)
                output = m(input)

        */
        "LogSigmoid":{
            "metaName":"Activation_layers_metaData",      // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"LogSigmoid",                          // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "LogSigmoid",                     // 搜索时对应的关键字
            "api":"torch.nn.LogSigmoid",                  // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化

            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "LogSigmoid_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "LogSigmoid_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                f(x) = x if x >= 0 else ax

            ** 层说明 **：
                上面公式中的 a 是一个可学习的参数，初始值由 init 指定， 默认为 0.25
                num_parameters 指定 a 的个数，正整数，默认为 1，表示所有通道用相同的参数。
                也可以指定输入通道数，表示每个通道单独使用一个可学习的参数

                经过实际代码验证， num_parameters 必须与实际输入的通道数一致，否则报错。
                此外，init 只用指定一个即可，否则会报错。它指的是，每个通道的初始值相同，然后分别进行训练。
            
            ** 层构造参数 **：
                num_parameters – number of a to learn. Default: 1
                init – the initial value of a. Default: 0.25

            ** 层输入 **：
                尺寸          ： [N, C, *]

            ** 层输出 **：
                尺寸          ： [N, C, *]（与输入尺寸一致）

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.PReLU()
                input = torch.randn(2)
                output = m(input)

        */
        "PReLU":{
            "metaName":"Activation_layers_metaData",      // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"PReLU",                               // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "PReLU",                          // 搜索时对应的关键字
            "api":"torch.nn.PReLU",                       // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化

            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "num_parameters" : {"type" : "Positive_Integer",    "value" : "1"},
                "init"           : {"type" : "Real_(0,inf)",        "value" : "0.25"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "PReLU_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "PReLU_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                f(x) = max(0,x)

            ** 层说明 **：
            
            ** 层构造参数 **：
                inplace         :  can optionally do the operation in-place. Default: False

            ** 层输入 **：
                尺寸          ： [N, *]

            ** 层输出 **：
                尺寸          ： [N, *]（与输入尺寸一致）

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.ReLU()
                input = torch.randn(2)
                output = m(input)

        */
        "ReLU":{
            "metaName":"Activation_layers_metaData",      // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"ReLU",                                // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "ReLU",                           // 搜索时对应的关键字
            "api":"torch.nn.ReLU",                        // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化

            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "inplace" : { "type" : "Boolean",   "value" : "False"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "ReLU_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "ReLU_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                ReLU6(x)=min( max(0,x), 6)

            ** 层说明 **：
            
            ** 层构造参数 **：
                inplace         :  can optionally do the operation in-place. Default: False

            ** 层输入 **：
                尺寸          ： [N, *]

            ** 层输出 **：
                尺寸          ： [N, *]（与输入尺寸一致）

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.ReLU6()
                input = torch.randn(2)
                output = m(input)

        */
        "ReLU6":{
            "metaName":"Activation_layers_metaData",      // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"ReLU6",                               // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "ReLU6",                          // 搜索时对应的关键字
            "api":"torch.nn.ReLU6",                       // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化

            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "inplace" : { "type" : "Boolean",   "value" : "False"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "ReLU6_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "ReLU6_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                f(x) = x if x >= 0 else ax

            ** 层说明 **：
                其中，a 为随机生成的数，其范围由 lower 和 upper 指定
            
            ** 层构造参数 **：
                lower         :  下边界，正数，默认为 0.125
                upper         :  上边界，正数，默认为 0.3333333333333333
                inplace       :  can optionally do the operation in-place. Default: False

            ** 层输入 **：
                尺寸          ： [N, *]

            ** 层输出 **：
                尺寸          ： [N, *]（与输入尺寸一致）

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.RReLU(0.1, 0.3)
                input = torch.randn(2)
                output = m(input)

        */
        "RReLU":{
            "metaName":"Activation_layers_metaData",      // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"RReLU",                               // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "RReLU",                          // 搜索时对应的关键字
            "api":"torch.nn.RReLU",                       // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化

            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "lower"   : { "type" : "Real_(0,inf)",   "value" : "0.125"},
                "upper"   : { "type" : "Real_(0,inf)",   "value" : "0.3333333333333333"},
                "inplace" : { "type" : "Boolean",        "value" : "False"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "RReLU_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "RReLU_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                f(x) = scale * (max(0,x) + min(0, α * (exp(x) - 1)))

            ** 层说明 **：
                其中，α = 1.6732632423543772848170429916717， scale = 1.0507009873554804934193349852946
            
            ** 层构造参数 **：
                inplace       :  can optionally do the operation in-place. Default: False

            ** 层输入 **：
                尺寸          ： [N, *]

            ** 层输出 **：
                尺寸          ： [N, *]（与输入尺寸一致）

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.SELU()
                input = torch.randn(2)
                output = m(input)

        */
        "SELU":{
            "metaName":"Activation_layers_metaData",      // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"SELU",                                // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "SELU",                           // 搜索时对应的关键字
            "api":"torch.nn.SELU",                        // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化

            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "inplace" : { "type" : "Boolean",        "value" : "False"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "SELU_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "SELU_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                f(x) = 1 / (1 + exp(-x))

            ** 层说明 **：
            
            ** 层构造参数 **：

            ** 层输入 **：
                尺寸          ： [N, *]

            ** 层输出 **：
                尺寸          ： [N, *]（与输入尺寸一致）

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.Sigmoid()
                input = torch.randn(2)
                output = m(input)

        */
        "Sigmoid":{
            "metaName":"Activation_layers_metaData",      // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"Sigmoid",                             // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "Sigmoid",                        // 搜索时对应的关键字
            "api":"torch.nn.Sigmoid",                     // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化

            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "Sigmoid_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "Sigmoid_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                f(x)  = 1/β * log(1 + exp(β * x))

            ** 层说明 **：
                是 ReLU 的平滑近似，并且输出始终为正
            
            ** 层构造参数 **：
                beta       :  公式中的 β，正实数，默认为 1
                threshold  :  values above this revert to a linear function. Default: 20（不知道干嘛的）

            ** 层输入 **：
                尺寸          ： [N, *]

            ** 层输出 **：
                尺寸          ： [N, *]（与输入尺寸一致）

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.Softplus()
                input = torch.randn(2)
                output = m(input)

        */
        "Softplus":{
            "metaName":"Activation_layers_metaData",      // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"Softplus",                            // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "Softplus",                       // 搜索时对应的关键字
            "api":"torch.nn.Softplus",                    // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化

            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "beta"      : {"type" : "Real_(0,inf)",   "value" : "1"},
                "threshold" : {"type" : "Real_(0,inf)",   "value" : "20"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "Softplus_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "Softplus_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                            x - λ    if  x > λ
                    f(x) =  x + λ    if  x < -λ
                            0        otherwise

            ** 层说明 **：
            
            ** 层构造参数 **：
                lambd       :  公式中的 λ，正实数，默认为 0.5

            ** 层输入 **：
                尺寸          ： [N, *]

            ** 层输出 **：
                尺寸          ： [N, *]（与输入尺寸一致）

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.Softshrink()
                input = torch.randn(2)
                output = m(input)

        */
        "Softshrink":{
            "metaName":"Activation_layers_metaData",      // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"Softshrink",                          // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "Softshrink",                     // 搜索时对应的关键字
            "api":"torch.nn.Softshrink",                  // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化

            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "lambd" : {"type" : "Real_(0,inf)",   "value" : "0.5"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "Softshrink_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "Softshrink_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                f(x) = x / (1 + abs(x))

            ** 层说明 **：
            
            ** 层构造参数 **：

            ** 层输入 **：
                尺寸          ： [N, *]

            ** 层输出 **：
                尺寸          ： [N, *]（与输入尺寸一致）

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.Softsign()
                input = torch.randn(2)
                output = m(input)

        */
        "Softsign":{
            "metaName":"Activation_layers_metaData",      // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"Softsign",                            // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "Softsign",                       // 搜索时对应的关键字
            "api":"torch.nn.Softsign",                    // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化

            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "Softsign_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "Softsign_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                f(x) = (exp(x) - exp(-x)) / (exp(x) + exp(-x))

            ** 层说明 **：
            
            ** 层构造参数 **：

            ** 层输入 **：
                尺寸          ： [N, *]

            ** 层输出 **：
                尺寸          ： [N, *]（与输入尺寸一致）

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.Tanh()
                input = torch.randn(2)
                output = m(input)

        */
        "Tanh":{
            "metaName":"Activation_layers_metaData",      // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"Tanh",                                // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "Tanh",                           // 搜索时对应的关键字
            "api":"torch.nn.Tanh",                        // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化

            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "Tanh_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "Tanh_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                f(x) = x - Tanh(x)

            ** 层说明 **：
            
            ** 层构造参数 **：

            ** 层输入 **：
                尺寸          ： [N, *]

            ** 层输出 **：
                尺寸          ： [N, *]（与输入尺寸一致）

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.Tanhshrink()
                input = torch.randn(2)
                output = m(input)

        */
        "Tanhshrink":{
            "metaName":"Activation_layers_metaData",      // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"Tanhshrink",                          // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "Tanhshrink",                     // 搜索时对应的关键字
            "api":"torch.nn.Tanhshrink",                  // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化

            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "Tanhshrink_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "Tanhshrink_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                f(x) = x if x > threshold else value

            ** 层说明 **：
            
            ** 层构造参数 **：
                threshold    :  公式中的 threshold，实数
                value        :  公式中的 value
                inplace      :  can optionally do the operation in-place. Default: False

            ** 层输入 **：
                尺寸          ： [N, *]

            ** 层输出 **：
                尺寸          ： [N, *]（与输入尺寸一致）

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.Threshold(0.1, 20)
                input = torch.randn(2)
                output = m(input)

        */
        "Threshold":{
            "metaName":"Activation_layers_metaData",      // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"Threshold",                           // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "Threshold",                      // 搜索时对应的关键字
            "api":"torch.nn.Threshold",                   // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化

            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "threshold"  : {"type" : "Real_value",      "value" : ""},
                "value"      : {"type" : "Real_value",      "value" : ""},
                "inplace"    : {"type" : "Boolean",         "value" : "False"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "Threshold_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "Threshold_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                将输入 Tensor 的指定维度进行归一化，其和为 1，计算公式如下所示：
                    f(x_i) = exp(-x_i) / sum(exp(-x))

            ** 层说明 **：
            
            ** 层构造参数 **：
                dim    :  指定归一化的维度，正整数

            ** 层输入 **：
                尺寸          ： any shape

            ** 层输出 **：
                尺寸          ： same as input

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.Softmin()
                input = torch.randn(2, 3)
                output = m(input)

        */
        "Softmin":{
            "metaName":"Activation_layers_metaData",      // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"Softmin",                             // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "Softmin",                        // 搜索时对应的关键字
            "api":"torch.nn.Softmin",                     // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化

            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "dim"  :  { "type" : "NNI_or_None",  "value" : "None" }
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "Softmin_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "Softmin_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                将输入 Tensor 的指定维度进行归一化，其和为 1，计算公式如下所示：
                    f(x_i) = exp(x_i) / sum(exp(x))

            ** 层说明 **：
            
            ** 层构造参数 **：
                dim    :  指定归一化的维度，正整数

            ** 层输入 **：
                尺寸          ： any shape

            ** 层输出 **：
                尺寸          ： same as input

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.Softmax()
                input = torch.randn(2, 3)
                output = m(input)

        */
        "Softmax":{
            "metaName":"Activation_layers_metaData",      // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"Softmax",                             // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "Softmax",                        // 搜索时对应的关键字
            "api":"torch.nn.Softmax",                     // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化

            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "dim"  :  { "type" : "NNI_or_None",  "value" : "None" }
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "Softmax_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "Softmax_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                对于 (Channels, Height, Width) 每个位置上的的元素执行 softmax（在 channel 维度上进行）

            ** 层说明 **：
            
            ** 层构造参数 **：

            ** 层输入 **：
                尺寸          ： [N, C, H, W]

            ** 层输出 **：
                尺寸          ： [N, C, H, W]

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.Softmax2d()
                input = torch.randn(2, 3, 12, 13)
                output = m(input)

        */
        "Softmax2d":{
            "metaName":"Activation_layers_metaData",      // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"Softmax2d",                           // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "Softmax2d",                      // 搜索时对应的关键字
            "api":"torch.nn.Softmax2d",                   // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化

            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "Softmax2d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "Softmax2d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                在指定维度上进行 LogSoftmax

            ** 层说明 **：
            
            ** 层构造参数 **：
                dim    :  指定归一化的维度，正整数，默认为 None

            ** 层输入 **：
                尺寸          ： any shape

            ** 层输出 **：
                尺寸          ： same as input

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.LogSoftmax()
                input = torch.randn(2, 3)
                output = m(input)

        */
        "LogSoftmax":{
            "metaName":"Activation_layers_metaData",      // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"LogSoftmax",                          // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "LogSoftmax",                     // 搜索时对应的关键字
            "api":"torch.nn.LogSoftmax",                  // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化

            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "dim" : { "type" : "NNI_or_None",  "value" : "None"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "LogSoftmax_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "LogSoftmax_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    // {
    //     /*
    //         ** 层功能 **：
    //             AdaptiveLogSoftmaxWithLoss 是 softmax 的一种高效的近似。它是巨量输出的训练模型的一种近似策略。当目标 label 分布高度不均匀时，该层极其有效。
    //             例如在自然语言模型中，词频分布遵循 Zipf 法则（https://en.wikipedia.org/wiki/Zipf%27s_law）。

    //             自适应 softmax 将会根据 label 中样本的频率将其分为若干簇。这些簇可能分别包含多个不同目标 label 。相应的，对于词频较少的 label 将会被赋予较低维度的词嵌入，这将加速运算。
    //             对于每个 minibatch，只有至少包含一个目标 label 的簇才会参与运算。

    //             还有一点，访问最多的簇（例如第一个簇，其包含最高词频的 label）也应该较快的运算，也就是说，将会包含更少的 labels。

    //             详细内容参考：https://arxiv.org/abs/1609.04309


                
    //             输入的 label 应该根据频率进行降序排序的
    //             返回值(tuple)：
    //                 output : a Tensor of size N containing computed target log probabilities for each example
    //                 loss   : Scalar representing the computed negative log likelihood loss

    //         ** 层说明 **：
            
    //         ** 层构造参数 **：
    //             in_features  ： 输入通道数，正整数
    //             n_classes    ： 输出通道数，正整数
    //             cutoffs      ： 升序整型序列。它用于控制 label 的分组。正整数的 list。例如：
    //                                 cutoffs = [10, 100, 1000]  表示： 0 ~ 10           head  簇
    //                                                                  11 ～ 100        first 簇
    //                                                                  101 ～ 1000      second 簇
    //                                                                  1001 ～ ...      third 簇
    //             div_value    ： 用于计算每一簇的尺寸，正的浮点数，默认为 4.0。计算公式如下：
    //                                 (向下取整) in_features / div_valueidx，其中，div_valueidx 为 簇号，从 1 开始
    //             head_bias    ： if set to True, adds a bias term to the ‘head’ of the adaptive softmax. See paper for details. Set to False in the official implementation.

    //         ** 层输入 **：
    //             尺寸          ： 
    //             备注          ： 输入到层的 labels 应该按照频率进行降序排序后再输入。

    //         ** 层输出 **：
    //             尺寸          ： 
    //                             output ： 尺寸为 N，分别包含每个样本对应的 log 概率
    //                             loss   ： 计算得到的类似于 loss 的标量（负的 log 值）
    //             备注          ： 
    //                             返回一个 NamedTuple ，其中包含 output 和 loss 两个子域

    //         ** 模型学习参数 **：
            
    //         ** 示例 **：

    //     */
    //     "AdaptiveLogSoftmaxWithLoss":{
    //         "metaName":"Activation_layers_metaData",      // 所属的 metaData 的名称
    //         "type":"Layer",                               // obj 的类型
    //         "name":"AdaptiveLogSoftmaxWithLoss",                          // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
    //         "icon":"resources/test.svg",                  // 该层对应的 icon 地址
    //         "keyWord" : "AdaptiveLogSoftmaxWithLoss",                     // 搜索时对应的关键字
    //         "api":"torch.nn.AdaptiveLogSoftmaxWithLoss",                  // 对应的 pytorch api

    //         "style":"",                                   // 该 id 对应的 css
    //         "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化

            // "outShape": [],                               // 每一层的输出尺寸，为一个数组
            // "prev"    : [],                               // 前驱层
            // "next"    : [],                               // 后继层

    //         "params":{                                    // 参数（必须与 api 一致）
    //             "in_features":{"type":"Positive_Integer", "value":""},    // 输入 tensor 的特征数
    //             "n_classes":{"type":"Positive_Integer", "value":""},      // 输出 tensor 的特征数
    //             // 如：[10,100,1000] 表示分为 4 簇，其中，1~10 的目标被分到 head 簇； 11~100 的 label 被分到第一簇；101~1000 的第二簇； 1001 以后的第三簇
    //             "cutoffs":{"type":"???", "value":""},                     // 增序排列的整数序列，用于控制簇数以及如何对 label 进行分簇
    //             "div_value":{"type":"Real_(0,inf)", "value":"4.0"},       // is used to compute the size of each additional cluster, 
    //                                                                       // which is given as in_features / div_valueidx，where idx is the cluster index 
    //                                                                       // (with clusters for less frequent words having larger indices, and indices starting from 1).
    //                                                                       // 不知道干嘛的
    //             "head_bias":{"type":"Boolean", "value":"False"}           // if set to True, adds a bias term to the ‘head’ of the adaptive softmax. 
    //                                                                       // See paper for details. Set to False in the official implementation.
    //         },

    //         "funcs":{                                    // 一些函数接口
    //             "Check_Layer_inShape"      : "AdaptiveLogSoftmaxWithLoss_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
    //             "Update_Layer_outSape"     : "AdaptiveLogSoftmaxWithLoss_Update_Layer_outSape"      // 计算并更新输出尺寸
    //         }
    //     },
    // },
];



/******************************************************* 对应的函数实现 *******************************************************/
/*
    只单纯的负责检测 ELU 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id          ： 当前层的 id
    inShape_array_str ： 输入尺寸的数组的字符串（JSON）
*/
function ELU_Check_Layer_inShape(layer_id, inShape_array_str){
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
function ELU_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, *] 
        预期的输出尺寸为 ： [N, *]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  ELU_Check_Layer_inShape(layer_id, inShape_array_str);
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
    只单纯的负责检测 Hardshrink 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id          ： 当前层的 id
    inShape_array_str ： 输入尺寸的数组的字符串（JSON）
*/
function Hardshrink_Check_Layer_inShape(layer_id, inShape_array_str){
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
function Hardshrink_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, *] 
        预期的输出尺寸为 ： [N, *]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  Hardshrink_Check_Layer_inShape(layer_id, inShape_array_str);
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
    只单纯的负责检测 Hardtanh 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id          ： 当前层的 id
    inShape_array_str ： 输入尺寸的数组的字符串（JSON）
*/
function Hardtanh_Check_Layer_inShape(layer_id, inShape_array_str){
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
function Hardtanh_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, *] 
        预期的输出尺寸为 ： [N, *]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  Hardtanh_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let min_val = parseFloat(layer_info_json["params"]["min_val"]["value"]);
    let max_val = parseFloat(layer_info_json["params"]["max_val"]["value"]);

    // 4. 检查输入参数与输入尺寸之间是否冲突
    if(min_val >= max_val){  // 如果输入的值有冲突，则报错
        return "Error : " + layer_id + " -- min_val(" + min_val + ") must less than max_val(" + max_val + ").\n";
    }

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
    只单纯的负责检测 LeakyReLU 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id          ： 当前层的 id
    inShape_array_str ： 输入尺寸的数组的字符串（JSON）
*/
function LeakyReLU_Check_Layer_inShape(layer_id, inShape_array_str){
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
function LeakyReLU_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, *] 
        预期的输出尺寸为 ： [N, *]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  LeakyReLU_Check_Layer_inShape(layer_id, inShape_array_str);
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
    只单纯的负责检测 LogSigmoid 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id          ： 当前层的 id
    inShape_array_str ： 输入尺寸的数组的字符串（JSON）
*/
function LogSigmoid_Check_Layer_inShape(layer_id, inShape_array_str){
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
function LogSigmoid_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, *] 
        预期的输出尺寸为 ： [N, *]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  LogSigmoid_Check_Layer_inShape(layer_id, inShape_array_str);
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
    只单纯的负责检测 PReLU 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id          ： 当前层的 id
    inShape_array_str ： 输入尺寸的数组的字符串（JSON）
*/
function PReLU_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, *]
    */
    // 1. 解析成数组
    let inShape_array = JSON.parse(inShape_array_str);

    // 2. 检查输入数目
    if(inShape_array.length != 1){
        return "Error : " + layer_id + " : requires only one input, but gets " + inShape_array.length +  "!\n";
    }

    // 3. 检查输入尺寸的维度
    if(inShape_array[0].length < 3){
        return "Error : " + layer_id + " -- shape of input requires at least 3 dimensions([N,C,*]), but gets " + inShape_array[0].length + ".\n";
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
function PReLU_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, *] 
        预期的输出尺寸为 ： [N, C, *]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  PReLU_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];
    let Cin = inShape[1];

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let num_parameters = parseInt(layer_info_json["params"]["num_parameters"]["value"]);

    // 4. 检查输入参数与输入尺寸之间是否冲突
    if(num_parameters != 1 && num_parameters != Cin){
        return "Error : " + layer_id + " -- channel number of input(" + Cin + ") and num_parameters(" + num_parameters + ") does not equal.\n";
    }

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
    只单纯的负责检测 ReLU 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id          ： 当前层的 id
    inShape_array_str ： 输入尺寸的数组的字符串（JSON）
*/
function ReLU_Check_Layer_inShape(layer_id, inShape_array_str){
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
function ReLU_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, *] 
        预期的输出尺寸为 ： [N, *]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  ReLU_Check_Layer_inShape(layer_id, inShape_array_str);
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
    只单纯的负责检测 ReLU6 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id          ： 当前层的 id
    inShape_array_str ： 输入尺寸的数组的字符串（JSON）
*/
function ReLU6_Check_Layer_inShape(layer_id, inShape_array_str){
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
function ReLU6_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, *] 
        预期的输出尺寸为 ： [N, *]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  ReLU6_Check_Layer_inShape(layer_id, inShape_array_str);
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
    只单纯的负责检测 RReLU 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id          ： 当前层的 id
    inShape_array_str ： 输入尺寸的数组的字符串（JSON）
*/
function RReLU_Check_Layer_inShape(layer_id, inShape_array_str){
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
function RReLU_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, *] 
        预期的输出尺寸为 ： [N, *]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  RReLU_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let lower = parseFloat(layer_info_json["params"]["lower"]["value"]);
    let upper = parseFloat(layer_info_json["params"]["upper"]["value"]);

    // 4. 检查输入参数与输入尺寸之间是否冲突
    if(lower >= upper){  // 如果输入的值有冲突，则报错
        return "Error : " + layer_id + " -- lower(" + lower + ") must less than upper(" + upper + ").\n";
    }

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
    只单纯的负责检测 SELU 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id          ： 当前层的 id
    inShape_array_str ： 输入尺寸的数组的字符串（JSON）
*/
function SELU_Check_Layer_inShape(layer_id, inShape_array_str){
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
function SELU_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, *] 
        预期的输出尺寸为 ： [N, *]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  SELU_Check_Layer_inShape(layer_id, inShape_array_str);
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
    只单纯的负责检测 Sigmoid 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id          ： 当前层的 id
    inShape_array_str ： 输入尺寸的数组的字符串（JSON）
*/
function Sigmoid_Check_Layer_inShape(layer_id, inShape_array_str){
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
function Sigmoid_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, *] 
        预期的输出尺寸为 ： [N, *]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  Sigmoid_Check_Layer_inShape(layer_id, inShape_array_str);
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
    只单纯的负责检测 Softplus 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id          ： 当前层的 id
    inShape_array_str ： 输入尺寸的数组的字符串（JSON）
*/
function Softplus_Check_Layer_inShape(layer_id, inShape_array_str){
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
function Softplus_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, *] 
        预期的输出尺寸为 ： [N, *]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  Softplus_Check_Layer_inShape(layer_id, inShape_array_str);
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
    只单纯的负责检测 Softshrink 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id          ： 当前层的 id
    inShape_array_str ： 输入尺寸的数组的字符串（JSON）
*/
function Softshrink_Check_Layer_inShape(layer_id, inShape_array_str){
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
function Softshrink_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, *] 
        预期的输出尺寸为 ： [N, *]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  Softshrink_Check_Layer_inShape(layer_id, inShape_array_str);
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
    只单纯的负责检测 Softsign 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id          ： 当前层的 id
    inShape_array_str ： 输入尺寸的数组的字符串（JSON）
*/
function Softsign_Check_Layer_inShape(layer_id, inShape_array_str){
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
function Softsign_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, *] 
        预期的输出尺寸为 ： [N, *]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  Softsign_Check_Layer_inShape(layer_id, inShape_array_str);
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
    只单纯的负责检测 Tanh 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id          ： 当前层的 id
    inShape_array_str ： 输入尺寸的数组的字符串（JSON）
*/
function Tanh_Check_Layer_inShape(layer_id, inShape_array_str){
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
function Tanh_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, *] 
        预期的输出尺寸为 ： [N, *]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  Tanh_Check_Layer_inShape(layer_id, inShape_array_str);
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
    只单纯的负责检测 Tanhshrink 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id          ： 当前层的 id
    inShape_array_str ： 输入尺寸的数组的字符串（JSON）
*/
function Tanhshrink_Check_Layer_inShape(layer_id, inShape_array_str){
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
function Tanhshrink_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, *] 
        预期的输出尺寸为 ： [N, *]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  Tanhshrink_Check_Layer_inShape(layer_id, inShape_array_str);
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
    只单纯的负责检测 Threshold 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id          ： 当前层的 id
    inShape_array_str ： 输入尺寸的数组的字符串（JSON）
*/
function Threshold_Check_Layer_inShape(layer_id, inShape_array_str){
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
function Threshold_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, *] 
        预期的输出尺寸为 ： [N, *]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  Threshold_Check_Layer_inShape(layer_id, inShape_array_str);
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
    只单纯的负责检测 Softmin 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id          ： 当前层的 id
    inShape_array_str ： 输入尺寸的数组的字符串（JSON）
*/
function Softmin_Check_Layer_inShape(layer_id, inShape_array_str){
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
function Softmin_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, *] 
        预期的输出尺寸为 ： [N, *]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  Softmin_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let dim = layer_info_json["params"]["dim"]["value"];

    // 4. 检查输入参数与输入尺寸之间是否冲突
    if(dim != "None" && parseInt(dim) >= inShape.length){   // 检测指定的维度
        return "Error : " + layer_id + " -- the dim(" + dim + ") you want to apply to softmin should less then the dimensions(" + inShape.length + ") of input.\n";
    }

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
    只单纯的负责检测 Softmax 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id          ： 当前层的 id
    inShape_array_str ： 输入尺寸的数组的字符串（JSON）
*/
function Softmax_Check_Layer_inShape(layer_id, inShape_array_str){
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
function Softmax_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, *] 
        预期的输出尺寸为 ： [N, *]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  Softmax_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let dim = layer_info_json["params"]["dim"]["value"];

    // 4. 检查输入参数与输入尺寸之间是否冲突
    if(dim != "None" && parseInt(dim) >= inShape.length){   // 检测指定的维度
        return "Error : " + layer_id + " -- the dim(" + dim + ") you want to apply to Softmax should less then the dimensions(" + inShape.length + ") of input.\n";
    }

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
    只单纯的负责检测 Softmax2d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id          ： 当前层的 id
    inShape_array_str ： 输入尺寸的数组的字符串（JSON）
*/
function Softmax2d_Check_Layer_inShape(layer_id, inShape_array_str){
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
function Softmax2d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, H, W]
        预期的输出尺寸为 ： [N, C, H, W]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  Softmax2d_Check_Layer_inShape(layer_id, inShape_array_str);
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
    只单纯的负责检测 LogSoftmax 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id          ： 当前层的 id
    inShape_array_str ： 输入尺寸的数组的字符串（JSON）
*/
function LogSoftmax_Check_Layer_inShape(layer_id, inShape_array_str){
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
function LogSoftmax_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, *] 
        预期的输出尺寸为 ： [N, *]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  LogSoftmax_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let dim = layer_info_json["params"]["dim"]["value"];

    // 4. 检查输入参数与输入尺寸之间是否冲突
    if(dim != "None" && parseInt(dim) >= inShape.length){   // 检测指定的维度
        return "Error : " + layer_id + " -- the dim(" + dim + ") you want to apply LogSoftmax should less then the dimensions(" + inShape.length + ") of input.\n";
    }

    // 5. 计算并更新输出尺寸    
    let outShape = inShape;

    // 6. 检查计算结果是否符合逻辑
    
    // 7. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 8. 成功，返回空字符串
    return "";
}