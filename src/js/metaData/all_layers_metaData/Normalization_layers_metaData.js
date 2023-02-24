/* 所有预置线性层  Normalization_layers_metaData */



/******************************************************* 层数据 *******************************************************/
var Normalization_layers_metaData = [
    {
        // 第一个元素包含该 metaData 的基本信息
        "metaDataName"      : "Normalization_layers_metaData",   // metaData 的名字
        "metaDataType"      : "Layers_metaData",                 // metaData 的类型
        "dom_div_name"      : "Normalization_layers",            // 该字段用于生成列表中的 header 和 list 名
        "dom_header_text"   : "Normalization Layers"             // header 上显示的描述名
    },
    {
        /*
            ** 层功能 **：
                对 2-D 或 3-D 输入进行批标准化，计算公式如下所示：
                    y = ((x-E[x]) / sqrt(Var[x] + ϵ)) * γ + β

            ** 解析 ** ：
                在 C 维度上进行。也就是说，每次执行该公式，参与运算的元素为：同一通道上的所有样本上的所有元素。
                例如输入为 [N, C, L] = [24, 12, 36]，每次参与运算的数目为： 24 * 36； 共运算： 12 次
                对于大批量的样本较为有效，小批量样本效果不好。

            ** 层说明 **：
                公示的参数说明：
                        E[x]    ： 均值。
                        Var[x]  ： 标准差。
                        γ       ： 可学习参数向量，尺寸为 C 。
                        β       ： 可学习参数向量，尺寸为 C 。

                原理和运算过程说明：
                    1. 动量系数
                        默认情况下，在训练过程中，该层将会记录运行时信息，包括均值和标准差，用于后面评估阶段的批标准化。其动量系数为：0.1
                        如果参数 track_running_stats 设置为 False 时，将不会记录运行时状态。在评估阶段将会使用 batch 的统计信息。

                    2. 均值和标准差更新过程：
                        均值和方差在运行时不断更新，其更新过程如下所示：

                            x_new = (1 - momentum) * x_pre + momentum * x_now

                        其中，x_pre 为之前的值； x_now 为当前样本得出的值； x_new 为此刻使用的值。

            ** 层构造参数 **：
                num_features        ： 输入通道数 (N,C,L) 中的 C 或 (N,L) 中的 L，正整数
                eps                 ： 用于防止分母为 0，非负实数，默认为 1e-05
                momentum            ： 用于更新 mean 和 var，默认为 0.1，(0,1) 之间的小数。若为 None，则表示 0.5 
                affine              ： a boolean value that when set to True, this module has learnable affine parameters. Default: True
                track_running_stats ： a boolean value that when set to True, this module tracks the running mean and variance, 
                                       and when set to False, this module does not track such statistics and always uses batch statistics 
                                       in both training and eval modes. Default: True

            ** 层输入 **：
                尺寸          ： (N,C) or (N,C,L)

            ** 层输出 **：
                尺寸          ： same shape as input


            ** 模型学习参数 **：
                γ 和 β
            
            ** 示例 **：
                m = nn.BatchNorm1d(100)
                m = nn.BatchNorm1d(100, affine=False)
                input = torch.randn(20, 100)
                output = m(input)

        */
        "BatchNorm1d":{
            "metaName":"Normalization_layers_metaData",   // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"BatchNorm1d",                         // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "BatchNorm1d batch normalization 1d BN",    // 搜索时对应的关键字
            "api":"torch.nn.BatchNorm1d",                 // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "num_features"        : {"type" : "Positive_Integer",   "value" : ""},
                "eps"                 : {"type" : "Real_(0,1)",         "value" : "1e-05"},
                "momentum"            : {"type" : "Real_(0,1)",         "value" : "0.1"},
                "affine"              : {"type" : "Boolean",            "value" : "True"},
                "track_running_stats" : {"type" : "Boolean",            "value" : "True"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "BatchNorm1d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "BatchNorm1d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                对 4-D 输入进行批标准化，计算公式如下所示：
                    y = ((x-E[x]) / sqrt(Var[x] + ϵ)) * γ + β

            ** 解析 ** ：
                在 C 维度上进行。也就是说，每次执行该公式，参与运算的元素为：同一通道上的所有样本上的所有元素。
                例如输入为 [N, C, H, W] = [24, 12, 32, 32]，每次参与运算的数目为： 24 * 32 * 32； 共运算： 12 次
                对于大批量的样本较为有效，小批量样本效果不好。

            ** 层说明 **：
                公示的参数说明：
                        E[x]    ： 均值。
                        Var[x]  ： 标准差。
                        γ       ： 可学习参数向量，尺寸为 C 。
                        β       ： 可学习参数向量，尺寸为 C 。

                原理和运算过程说明：
                    1. 动量系数
                        默认情况下，在训练过程中，该层将会记录运行时信息，包括均值和标准差，用于后面评估阶段的批标准化。其动量系数为：0.1
                        如果参数 track_running_stats 设置为 False 时，将不会记录运行时状态。在评估阶段将会使用 batch 的统计信息。

                    2. 均值和标准差更新过程：
                        均值和方差在运行时不断更新，其更新过程如下所示：

                            x_new = (1 - momentum) * x_pre + momentum * x_now

                        其中，x_pre 为之前的值； x_now 为当前样本得出的值； x_new 为此刻使用的值。

            ** 层构造参数 **：
                num_features        ： 输入通道数 (N,C,H,W) 中的 C，正整数
                eps                 ： 用于防止分母为 0，非负实数，默认为 1e-05
                momentum            ： 用于更新 mean 和 var，默认为 0.1，(0,1) 之间的小数。若为 None，则表示 0.5 
                affine              ： a boolean value that when set to True, this module has learnable affine parameters. Default: True
                track_running_stats ： a boolean value that when set to True, this module tracks the running mean and variance, 
                                       and when set to False, this module does not track such statistics and always uses batch statistics 
                                       in both training and eval modes. Default: True

            ** 层输入 **：
                尺寸          ： (N,C,H,W)

            ** 层输出 **：
                尺寸          ： same shape as input


            ** 模型学习参数 **：
                γ 和 β
            
            ** 示例 **：
                m = nn.BatchNorm2d(100)
                m = nn.BatchNorm2d(100, affine=False)
                input = torch.randn(20, 100, 35, 45)
                output = m(input)

        */
        "BatchNorm2d":{
            "metaName":"Normalization_layers_metaData",   // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"BatchNorm2d",                         // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "BatchNorm2d batch normalization 2d BN",    // 搜索时对应的关键字
            "api":"torch.nn.BatchNorm2d",                 // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "num_features"        : {"type" : "Positive_Integer",   "value" : ""},
                "eps"                 : {"type" : "Real_(0,1)",         "value" : "1e-05"},
                "momentum"            : {"type" : "Real_(0,1)",         "value" : "0.1"},
                "affine"              : {"type" : "Boolean",            "value" : "True"},
                "track_running_stats" : {"type" : "Boolean",            "value" : "True"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "BatchNorm2d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "BatchNorm2d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                对 5-D 输入进行批标准化，计算公式如下所示：
                    y = ((x-E[x]) / sqrt(Var[x] + ϵ)) * γ + β

            ** 解析 ** ：
                在 C 维度上进行。也就是说，每次执行该公式，参与运算的元素为：同一通道上的所有样本上的所有元素。
                例如输入为 [N, C, D, H, W] = [24, 12, 6, 32, 32]，每次参与运算的数目为： 24 * 32 * 32 * 6； 共运算： 12 次
                对于大批量的样本较为有效，小批量样本效果不好。

            ** 层说明 **：
                公示的参数说明：
                        E[x]    ： 均值。
                        Var[x]  ： 标准差。
                        γ       ： 可学习参数向量，尺寸为 C 。
                        β       ： 可学习参数向量，尺寸为 C 。

                原理和运算过程说明：
                    1. 动量系数
                        默认情况下，在训练过程中，该层将会记录运行时信息，包括均值和标准差，用于后面评估阶段的批标准化。其动量系数为：0.1
                        如果参数 track_running_stats 设置为 False 时，将不会记录运行时状态。在评估阶段将会使用 batch 的统计信息。

                    2. 均值和标准差更新过程：
                        均值和方差在运行时不断更新，其更新过程如下所示：

                            x_new = (1 - momentum) * x_pre + momentum * x_now

                        其中，x_pre 为之前的值； x_now 为当前样本得出的值； x_new 为此刻使用的值。

            ** 层构造参数 **：
                num_features        ： 输入通道数 (N,C,D,H,W) 中的 C，正整数
                eps                 ： 用于防止分母为 0，非负实数，默认为 1e-05
                momentum            ： 用于更新 mean 和 var，默认为 0.1，(0,1) 之间的小数。若为 None，则表示 0.5 
                affine              ： a boolean value that when set to True, this module has learnable affine parameters. Default: True
                track_running_stats ： a boolean value that when set to True, this module tracks the running mean and variance, 
                                       and when set to False, this module does not track such statistics and always uses batch statistics 
                                       in both training and eval modes. Default: True

            ** 层输入 **：
                尺寸          ： (N,C,D,H,W)

            ** 层输出 **：
                尺寸          ： same shape as input


            ** 模型学习参数 **：
                γ 和 β
            
            ** 示例 **：
                m = nn.BatchNorm3d(100)
                m = nn.BatchNorm3d(100, affine=False)
                input = torch.randn(20, 100, 35, 45, 10)
                output = m(input)

        */
        "BatchNorm3d":{
            "metaName":"Normalization_layers_metaData",   // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"BatchNorm3d",                         // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "BatchNorm3d batch normalization 3d BN",    // 搜索时对应的关键字
            "api":"torch.nn.BatchNorm3d",                 // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "num_features"        : {"type" : "Positive_Integer",   "value" : ""},
                "eps"                 : {"type" : "Real_(0,1)",         "value" : "1e-05"},
                "momentum"            : {"type" : "Real_(0,1)",         "value" : "0.1"},
                "affine"              : {"type" : "Boolean",            "value" : "True"},
                "track_running_stats" : {"type" : "Boolean",            "value" : "True"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "BatchNorm3d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "BatchNorm3d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                对输入进行批标准化，计算公式如下所示：
                    y = ((x-E[x]) / sqrt(Var[x] + ϵ)) * γ + β

            ** 解析 ** ：
                在单一样本上，对若干通道内的所有元素进行归一化。主要是因为 natch normalization 对于小批量效果很差。所以用该层将 channel 进行分组，在每个样本每个组内进行归一化，
                计算 (C//G)*H*W 的值，这样与 batch size 无关。

                该层在训练阶段和验证阶段，均直接使用输入的统计特性。

            ** 层说明 **：
                公示的参数说明：
                        E[x]    ： 均值。
                        Var[x]  ： 标准差。
                        γ       ： 可学习参数向量，尺寸为 num_channels 。
                        β       ： 可学习参数向量，尺寸为 num_channels 。

                原理和运算过程说明：
                    由于与 batch size 无关，所以无需动量系数。

            ** 层构造参数 **：
                num_groups    ： 用于指定分组数，正整数
                num_channels  ： 输入通道数，正整数
                eps           ： 防止分母为 0，非负数（建议 0~1）
                affine        ： a boolean value that when set to True, this module has learnable per-channel affine parameters. Default: True

            ** 层输入 **：
                尺寸          ： (N, num_channels, ∗)

            ** 层输出 **：
                尺寸          ： same shape as input


            ** 模型学习参数 **：
                γ 和 β
            
            ** 示例 **：
                input = torch.randn(20, 6, 10, 10)
                m = nn.GroupNorm(3, 6)
                m = nn.GroupNorm(6, 6)
                m = nn.GroupNorm(1, 6)
                output = m(input)

        */
        "GroupNorm":{
            "metaName":"Normalization_layers_metaData",   // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"GroupNorm",                           // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "GroupNorm Group normalization gn",  // 搜索时对应的关键字
            "api":"torch.nn.GroupNorm",                   // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "num_groups"   : {"type" : "Positive_Integer",   "value" : ""},
                "num_channels" : {"type" : "Positive_Integer",   "value" : ""},
                "eps"          : {"type" : "Real_(0,1)",         "value" : "1e-05"},
                "affine"       : {"type" : "Boolean",            "value" : "True"},
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "GroupNorm_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "GroupNorm_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                对输入进行批标准化，计算公式如下所示：
                    y = ((x-E[x]) / sqrt(Var[x] + ϵ)) * γ + β

            ** 解析 ** ：
                对于 batch normalizetion 中，注重对每个 batch 进行归一化，保证数据分布一致，因为判别模型中的结果依赖于整体数据的分布。
                而在图像风格化中，生成结果主要依赖于某个图像实例，所以对整个 batch 的归一化并不适用与图像的风格化中。
                因此使用对 HW 进行归一化，可以加速模型收敛，并保持各个图像实例之间的独立。

                也就是说，每次运算只包含每个样本的每个通道的所有元素，对于图像而言，就是单张图像单个色道内的所有元素。

                默认情况下，在训练阶段和验证阶段，该层均使用输入的统计特性。

            ** 层说明 **：
                公示的参数说明：
                        E[x]    ： 均值。
                        Var[x]  ： 标准差。
                        γ       ： 可学习参数向量，尺寸为 C 。
                        β       ： 可学习参数向量，尺寸为 C 。

            ** 层构造参数 **：
                num_features        ： (N,C,L) 中的 C 或  (N,L) 中的 L，正整数
                eps                 ： 用于防止分母为 0，小数，默认为 1e-5
                momentum            ： mean 和 var 的更新动量， (0,1) 之间的小数，默认为 0.1
                affine              ： a boolean value that when set to True, this module has learnable affine parameters. Default: False
                track_running_stats ： 当设置为 True 时，训练阶段将会保存运行时状态（mean 和 var）用于验证阶段。默认为 False

            ** 层输入 **：
                尺寸          ： (N,C) or (N,C,L)

            ** 层输出 **：
                尺寸          ： same shape as input


            ** 模型学习参数 **：
                γ 和 β
            
            ** 示例 **：
                m = nn.InstanceNorm1d(100)
                m = nn.InstanceNorm1d(100, affine=True)
                input = torch.randn(20, 100, 40)
                output = m(input)

        */
        "InstanceNorm1d":{
            "metaName":"Normalization_layers_metaData",   // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"InstanceNorm1d",                      // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "InstanceNorm1d Instance normalization 1d IN",  // 搜索时对应的关键字
            "api":"torch.nn.InstanceNorm1d",              // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "num_features"        :{"type" : "Positive_Integer",    "value" : ""},
                "eps"                 :{"type" : "Real_(0,1)",          "value" : "1e-05"},
                "momentum"            :{"type" : "Real_(0,1)",          "value" : "0.1"},
                "affine"              :{"type" : "Boolean",             "value" : "False"},
                "track_running_stats" :{"type" : "Boolean",             "value" : "False"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "InstanceNorm1d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "InstanceNorm1d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                对输入进行批标准化，计算公式如下所示：
                    y = ((x-E[x]) / sqrt(Var[x] + ϵ)) * γ + β

            ** 解析 ** ：
                对于 batch normalizetion 中，注重对每个 batch 进行归一化，保证数据分布一致，因为判别模型中的结果依赖于整体数据的分布。
                而在图像风格化中，生成结果主要依赖于某个图像实例，所以对整个 batch 的归一化并不适用与图像的风格化中。
                因此使用对 HW 进行归一化，可以加速模型收敛，并保持各个图像实例之间的独立。

                也就是说，每次运算只包含每个样本的每个通道的所有元素，对于图像而言，就是单张图像单个色道内的所有元素。

                默认情况下，在训练阶段和验证阶段，该层均使用输入的统计特性。

            ** 层说明 **：
                公示的参数说明：
                        E[x]    ： 均值。
                        Var[x]  ： 标准差。
                        γ       ： 可学习参数向量，尺寸为 C 。
                        β       ： 可学习参数向量，尺寸为 C 。

            ** 层构造参数 **：
                num_features        ： (N,C,H,W) 中的 C，正整数
                eps                 ： 用于防止分母为 0，小数，默认为 1e-5
                momentum            ： mean 和 var 的更新动量， (0,1) 之间的小数，默认为 0.1
                affine              ： a boolean value that when set to True, this module has learnable affine parameters. Default: False
                track_running_stats ： 当设置为 True 时，训练阶段将会保存运行时状态（mean 和 var）用于验证阶段。默认为 False

            ** 层输入 **：
                尺寸          ： (N,C,H,W)

            ** 层输出 **：
                尺寸          ： same shape as input


            ** 模型学习参数 **：
                γ 和 β
            
            ** 示例 **：
                m = nn.InstanceNorm2d(100)
                m = nn.InstanceNorm2d(100, affine=True)
                input = torch.randn(20, 100, 35, 45)
                output = m(input)

        */
        "InstanceNorm2d":{
            "metaName":"Normalization_layers_metaData",   // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"InstanceNorm2d",                      // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "InstanceNorm2d Instance normalization 2d IN",  // 搜索时对应的关键字
            "api":"torch.nn.InstanceNorm2d",              // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "num_features"        :{"type" : "Positive_Integer",    "value" : ""},
                "eps"                 :{"type" : "Real_(0,1)",          "value" : "1e-05"},
                "momentum"            :{"type" : "Real_(0,1)",          "value" : "0.1"},
                "affine"              :{"type" : "Boolean",             "value" : "False"},
                "track_running_stats" :{"type" : "Boolean",             "value" : "False"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "InstanceNorm2d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "InstanceNorm2d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                对输入进行批标准化，计算公式如下所示：
                    y = ((x-E[x]) / sqrt(Var[x] + ϵ)) * γ + β

            ** 解析 ** ：
                对于 batch normalizetion 中，注重对每个 batch 进行归一化，保证数据分布一致，因为判别模型中的结果依赖于整体数据的分布。
                而在图像风格化中，生成结果主要依赖于某个图像实例，所以对整个 batch 的归一化并不适用与图像的风格化中。
                因此使用对 HW 进行归一化，可以加速模型收敛，并保持各个图像实例之间的独立。

                也就是说，每次运算只包含每个样本的每个通道的所有元素，对于图像而言，就是单张图像单个色道内的所有元素。

                默认情况下，在训练阶段和验证阶段，该层均使用输入的统计特性。

            ** 层说明 **：
                公示的参数说明：
                        E[x]    ： 均值。
                        Var[x]  ： 标准差。
                        γ       ： 可学习参数向量，尺寸为 C 。
                        β       ： 可学习参数向量，尺寸为 C 。

            ** 层构造参数 **：
                num_features        ： (N,C,D,H,W) 中的 C，正整数
                eps                 ： 用于防止分母为 0，小数，默认为 1e-5
                momentum            ： mean 和 var 的更新动量， (0,1) 之间的小数，默认为 0.1
                affine              ： a boolean value that when set to True, this module has learnable affine parameters. Default: False
                track_running_stats ： 当设置为 True 时，训练阶段将会保存运行时状态（mean 和 var）用于验证阶段。默认为 False

            ** 层输入 **：
                尺寸          ： (N,C,D,H,W)

            ** 层输出 **：
                尺寸          ： same shape as input


            ** 模型学习参数 **：
                γ 和 β
            
            ** 示例 **：
                m = nn.InstanceNorm3d(100)
                m = nn.InstanceNorm3d(100, affine=True)
                input = torch.randn(20, 100, 35, 45, 10)
                output = m(input)

        */
        "InstanceNorm3d":{
            "metaName":"Normalization_layers_metaData",   // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"InstanceNorm3d",                      // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "InstanceNorm3d Instance normalization 3d IN",  // 搜索时对应的关键字
            "api":"torch.nn.InstanceNorm3d",              // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "num_features"        :{"type" : "Positive_Integer",    "value" : ""},
                "eps"                 :{"type" : "Real_(0,1)",          "value" : "1e-05"},
                "momentum"            :{"type" : "Real_(0,1)",          "value" : "0.1"},
                "affine"              :{"type" : "Boolean",             "value" : "False"},
                "track_running_stats" :{"type" : "Boolean",             "value" : "False"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "InstanceNorm3d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "InstanceNorm3d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                对输入进行批标准化，计算公式如下所示：
                    y = ((x-E[x]) / sqrt(Var[x] + ϵ)) * γ + β

            ** 解析 ** ：
                对同一样本内的所有元素进行归一化。
                LN中同层神经元输入拥有相同的均值和方差，不同的输入样本有不同的均值和方差。
                BN中则针对不同神经元输入计算均值和方差，同一个batch中的输入拥有相同的均值和方差。
                LN 不依赖于 batch 的大小和输入 sequence  的深度，因此可以用于 batchsize 为 1 和 RNN 中对边长的输入 sequence 的 normalize 操作。

                默认情况下，在训练阶段和验证阶段，该层均使用输入的统计特性。

            ** 层说明 **：
                公示的参数说明：
                        E[x]    ： 均值。
                        Var[x]  ： 标准差。
                        γ       ： 可学习参数。如果 elementwise_affine 为 True，则尺寸为：normalized_shape
                        β       ： 可学习参数。如果 elementwise_affine 为 True，则尺寸为：normalized_shape

                原理和运算过程说明：
                    由于与 batch size 无关，所以无需动量系数。

            ** 层构造参数 **：
                normalized_shape     ： 指定期望的输入尺寸，为正整数或者 list 或者 torch.Size
                eps                  ： 用于防止分母为 0，小数，默认为 1e-5
                elementwise_affine   ： a boolean value that when set to True, this module has learnable per-element affine parameters. Default: True

            ** 层输入 **：
                尺寸          ： (N, ∗ )

            ** 层输出 **：
                尺寸          ： same shape as input


            ** 模型学习参数 **：
                γ 和 β
            
            ** 示例 **：
                input = torch.randn(20, 5, 10, 10)
                m = nn.LayerNorm(input.size()[1:])
                m = nn.LayerNorm(input.size()[1:], elementwise_affine=False)
                m = nn.LayerNorm([10, 10])
                m = nn.LayerNorm(10)
                output = m(input)

        */
        "LayerNorm":{
            "metaName":"Normalization_layers_metaData",   // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"LayerNorm",                           // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "LayerNorm Layer normalization LN",  // 搜索时对应的关键字
            "api":"torch.nn.LayerNorm",                   // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "normalized_shape"   : {"type" : "PI_List_[N,*]", "value" : ""},       // 每个输入样本的尺寸
                "eps"                : {"type" : "Real_(0,1)",  "value" : "1e-05"},
                "elementwise_affine" : {"type" : "Boolean",     "value" : "True"},
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "LayerNorm_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "LayerNorm_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                局部响应归一化。计算公式详见：https://pytorch.org/docs/stable/nn.html#localresponsenorm

            ** 解析 ** ：
                利用侧抑制实现局部抑制，可以提高泛化能力。

            ** 层说明 **：
                公示的参数说明：
                    Bc   表示通道 c 处的输出值
                    Ac   表示通道 c 处的输入值
                    n    表示同一位置上相邻通道数
                    N    为通道总数

            ** 层构造参数 **：
                size     ： 用于归一化的相邻的通道数，即公式中的 n，正整数
                alpha    ： 公式中的 α，正实数，默认为 0.0001
                beta     ： 公式中的 β，正实数，默认为 0.75
                k        ： 公式中的 k，防止分母为 0 ，正实数，默认为 1

            ** 层输入 **：
                尺寸          ： (N,C,...)

            ** 层输出 **：
                尺寸          ： same shape as input


            ** 模型学习参数 **：
                γ 和 β
            
            ** 示例 **：
                lrn = nn.LocalResponseNorm(2)
                signal_2d = torch.randn(32, 5, 24, 24)
                signal_4d = torch.randn(16, 5, 7, 7, 7, 7)
                output_2d = lrn(signal_2d)
                output_4d = lrn(signal_4d)

        */
        "LocalResponseNorm":{
            "metaName":"Normalization_layers_metaData",   // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"LocalResponseNorm",                   // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "LocalResponseNorm Local Response Normalization LRN",  // 搜索时对应的关键字
            "api":"torch.nn.LocalResponseNorm",                   // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "size"   : {"type" : "Positive_Integer",  "value" : ""},
                "alpha"  : {"type" : "Real_(0,inf)",      "value" : "0.0001"},
                "beta"   : {"type" : "Real_(0,inf)",      "value" : "0.75"},
                "k"      : {"type" : "Real_(0,inf)",      "value" : "1"},
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "LocalResponseNorm_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "LocalResponseNorm_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
];



/******************************************************* 对应的函数实现 *******************************************************/
/*
    只单纯的负责检测 BatchNorm1d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function BatchNorm1d_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N,C] 或 [N,C,L]
    */
    // 1. 解析成数组
    let inShape_array = JSON.parse(inShape_array_str);

    // 2. 检查输入数目
    if(inShape_array.length != 1){
        return "Error : " + layer_id + " : requires only one input, but gets " + inShape_array.length +  "!\n";
    }

    // 3. 检查输入尺寸的维度
    if((inShape_array[0].length != 3) && (inShape_array[0].length != 2)){
        return "Error : " + layer_id + " -- shape of input requires 2 or 3 dimensions([N,L] or [N,C,L]), but gets " + inShape_array[0].length + ".\n";
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
function BatchNorm1d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N,C] 或 [N,C,L]
        预期的输出尺寸为 ： same shape as input
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  BatchNorm1d_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];
    let Cin        = inShape[1];

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let num_features = parseInt(layer_info_json["params"]["num_features"]["value"]);

    // 4. 检查输入参数与输入尺寸之间是否冲突
    if(num_features != Cin){
        return "Error : " + layer_id + "-- Channels number of last layer(" + Cin + ") and parameter(" + num_features + ") does not equal.\n";
    }

    // 5. 计算并更新输出尺寸

    // 6. 检查计算结果是否符合逻辑
    let outShape = inShape;
    
    // 7. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 8. 成功，返回空字符串
    return "";
}



/*
    只单纯的负责检测 BatchNorm2d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function BatchNorm2d_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N,C,H,W]
    */
    // 1. 解析成数组
    let inShape_array = JSON.parse(inShape_array_str);

    // 2. 检查输入数目
    if(inShape_array.length != 1){
        return "Error : " + layer_id + " : requires only one input, but gets " + inShape_array.length +  "!\n";
    }

    // 3. 检查输入尺寸的维度
    if(inShape_array[0].length != 4){
        return "Error : " + layer_id + " -- shape of input requires 4 dimensions([N,C,H,W]), but gets " + inShape_array[0].length + ".\n";
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
function BatchNorm2d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N,C,H,W]
        预期的输出尺寸为 ： same shape as input
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  BatchNorm2d_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];
    let Cin        = inShape[1];

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let num_features = parseInt(layer_info_json["params"]["num_features"]["value"]);

    // 4. 检查输入参数与输入尺寸之间是否冲突
    if(num_features != Cin){
        return "Error : " + layer_id + "-- Channels number of last layer(" + Cin + ") and parameter(" + num_features + ") does not equal.\n";
    }

    // 5. 计算并更新输出尺寸

    // 6. 检查计算结果是否符合逻辑
    let outShape = inShape;
    
    // 7. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 8. 成功，返回空字符串
    return "";
}



/*
    只单纯的负责检测 BatchNorm3d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function BatchNorm3d_Check_Layer_inShape(layer_id, inShape_array_str){
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
        return "Error : " + layer_id + " -- shape of input requires 5 dimensions([N,C,D,H,W]), but gets " + inShape_array[0].length + ".\n";
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
function BatchNorm3d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N,C,D,H,W]
        预期的输出尺寸为 ： same shape as input
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  BatchNorm3d_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];
    let Cin        = inShape[1];

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let num_features = parseInt(layer_info_json["params"]["num_features"]["value"]);

    // 4. 检查输入参数与输入尺寸之间是否冲突
    if(num_features != Cin){
        return "Error : " + layer_id + " -- Channels number of last layer(" + Cin + ") and parameter(" + num_features + ") does not equal.\n";
    }

    // 5. 计算并更新输出尺寸

    // 6. 检查计算结果是否符合逻辑
    let outShape = inShape;
    
    // 7. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 8. 成功，返回空字符串
    return "";
}



/*
    只单纯的负责检测 GroupNorm 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function GroupNorm_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, num_channels, ∗]
    */
    // 1. 解析成数组
    let inShape_array = JSON.parse(inShape_array_str);

    // 2. 检查输入数目
    if(inShape_array.length != 1){
        return "Error : " + layer_id + " : requires only one input, but gets " + inShape_array.length +  "!\n";
    }

    // 3. 检查输入尺寸的维度
    if(inShape_array[0].length < 3){
        return "Error : " + layer_id + " -- shape of input requires atleast 3 dimensions([N,C,*]), but gets " + inShape_array[0].length + ".\n";
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
function GroupNorm_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N,C] 或 [N,C,L]
        预期的输出尺寸为 ： same shape as input
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  GroupNorm_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];
    let Cin        = inShape[1];

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let num_groups = parseInt(layer_info_json["params"]["num_groups"]["value"]);
    let num_channels = parseInt(layer_info_json["params"]["num_channels"]["value"]);

    // 4. 检查输入参数与输入尺寸之间是否冲突
    if(num_channels != Cin){
        return "Error : " + layer_id + " -- Channels number of last layer(" + Cin + ") and parameter(" + num_channels + ") does not equal.\n";
    }
    if((num_channels % num_groups) != 0){
        return "Error : " + layer_id + " -- Channels number of input(" + num_channels + ") should be divisible by num_groups(" + num_groups +").\n";
    }

    // 5. 计算并更新输出尺寸

    // 6. 检查计算结果是否符合逻辑
    let outShape = inShape;
    
    // 7. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 8. 成功，返回空字符串
    return "";
}



/*
    只单纯的负责检测 InstanceNorm1d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function InstanceNorm1d_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N,C,L]
    */
    // 1. 解析成数组
    let inShape_array = JSON.parse(inShape_array_str);

    // 2. 检查输入数目
    if(inShape_array.length != 1){
        return "Error : " + layer_id + " : requires only one input, but gets " + inShape_array.length +  "!\n";
    }

    // 3. 检查输入尺寸的维度
    if((inShape_array[0].length != 3) && (inShape_array[0].length != 2)){
        return "Error : " + layer_id + " -- shape of input requires 2 or 3 dimensions([N,C] or [N,C,L]), but gets " + inShape_array[0].length + ".\n";
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
function InstanceNorm1d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N,C,L]
        预期的输出尺寸为 ： same shape as input
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  InstanceNorm1d_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];
    let Cin        = inShape[1];

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let num_features = parseInt(layer_info_json["params"]["num_features"]["value"]);

    // 4. 检查输入参数与输入尺寸之间是否冲突
    if(num_features != Cin){
        return "Error : " + layer_id + " -- Channels number of last layer(" + Cin + ") and parameter(" + num_features + ") does not equal.\n";
    }

    // 5. 计算并更新输出尺寸

    // 6. 检查计算结果是否符合逻辑
    let outShape = inShape;
    
    // 7. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 8. 成功，返回空字符串
    return "";
}



/*
    只单纯的负责检测 InstanceNorm2d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function InstanceNorm2d_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N,C,H,W]
    */
    // 1. 解析成数组
    let inShape_array = JSON.parse(inShape_array_str);

    // 2. 检查输入数目
    if(inShape_array.length != 1){
        return "Error : " + layer_id + " : requires only one input, but gets " + inShape_array.length +  "!\n";
    }

    // 3. 检查输入尺寸的维度
    if(inShape_array[0].length != 4){
        return "Error : " + layer_id + " -- shape of input requires 4 dimensions([N,C,H,W]), but gets " + inShape_array[0].length + ".\n";
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
function InstanceNorm2d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N,C,H,W]
        预期的输出尺寸为 ： same shape as input
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  InstanceNorm2d_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];
    let Cin        = inShape[1];

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let num_features = parseInt(layer_info_json["params"]["num_features"]["value"]);

    // 4. 检查输入参数与输入尺寸之间是否冲突
    if(num_features != Cin){
        return "Error : " + layer_id + " -- Channels number of last layer(" + Cin + ") and parameter(" + num_features + ") does not equal.\n";
    }

    // 5. 计算并更新输出尺寸

    // 6. 检查计算结果是否符合逻辑
    let outShape = inShape;
    
    // 7. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 8. 成功，返回空字符串
    return "";
}



/*
    只单纯的负责检测 InstanceNorm3d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function InstanceNorm3d_Check_Layer_inShape(layer_id, inShape_array_str){
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
        return "Error : " + layer_id + " -- shape of input requires 5 dimensions([N,C,D,H,W]), but gets " + inShape_array[0].length + ".\n";
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
function InstanceNorm3d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N,C,D,H,W]
        预期的输出尺寸为 ： same shape as input
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  InstanceNorm3d_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];
    let Cin        = inShape[1];

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let num_features = parseInt(layer_info_json["params"]["num_features"]["value"]);

    // 4. 检查输入参数与输入尺寸之间是否冲突
    if(num_features != Cin){
        return "Error : " + layer_id + " -- Channels number of last layer(" + Cin + ") and parameter(" + num_features + ") does not equal.\n";
    }

    // 5. 计算并更新输出尺寸

    // 6. 检查计算结果是否符合逻辑
    let outShape = inShape;
    
    // 7. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 8. 成功，返回空字符串
    return "";
}



/*
    只单纯的负责检测 LayerNorm 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function LayerNorm_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, ∗ ]
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

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function LayerNorm_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, ∗ ]
        预期的输出尺寸为 ： same shape as input
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  LayerNorm_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let normalized_shape = JSON.parse(layer_info_json["params"]["normalized_shape"]["value"].trim());

    // 4. 检查输入参数与输入尺寸之间是否冲突
    if(normalized_shape.length != (inShape.length - 1)){
        return "Error : " + layer_id + " -- dimensions of inShape(" + inShape + ") should one more then parameter normalized_shape(" + normalized_shape + ").\n";
    }

    for(let index = 0; index < normalized_shape.length; index++){
        if(normalized_shape[index] != inShape[index+1]){
            return "Error : " + layer_id + " -- single sample of input(" + inShape + ") and normalized_shape(" + normalized_shape + ") does not equal.\n";
        }
    }

    // 5. 计算并更新输出尺寸

    // 6. 检查计算结果是否符合逻辑
    let outShape = inShape;
    
    // 7. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 8. 成功，返回空字符串
    return "";
}



/*
    只单纯的负责检测 LocalResponseNorm 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function LocalResponseNorm_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N,C,...]
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

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function LocalResponseNorm_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N,C,...]
        预期的输出尺寸为 ： same shape as input
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  LocalResponseNorm_Check_Layer_inShape(layer_id, inShape_array_str);
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

    // 6. 检查计算结果是否符合逻辑
    let outShape = inShape;
    
    // 7. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 8. 成功，返回空字符串
    return "";
}