/* 所有预置线性层  Pooling_layers_metaData */



/******************************************************* 层数据 *******************************************************/
var Pooling_layers_metaData = [
    {
        // 第一个元素包含该 metaData 的基本信息
        "metaDataName"      : "Pooling_layers_metaData",   // metaData 的名字
        "metaDataType"      : "Layers_metaData",           // metaData 的类型
        "dom_div_name"      : "Pooling_layers",            // 该字段用于生成列表中的 header 和 list 名
        "dom_header_text"   : "Pooling Layers"             // header 上显示的描述名
    },
    {
        /*
            ** 层功能 **：
                对 1-D 输入 tensor 进行最大池化

            ** 层说明 **：

            
            ** 层构造参数 **：
                kernel_size    ： 池化窗口尺寸，对于 1-D tensor，为正整数
                stride         ： 池化窗口移动步长，对于 1-D tensor，为正整数。默认为 None 时，表示等于 kernel_size
                padding        ： padding 尺寸，对于 1-D tensor，为非负整数，默认为 0 
                dilation       ： 卷积核元素之间的间隔，对于 1-D tensor，为正整数，默认为 1
                return_indices ： 若为 True，则同时返回最大值对应的索引（用于 Unpooling）。默认为 False
                ceil_mode      ： true：向上取整；默认 false，向下取整

            ** 层输入 **：
                尺寸          ： [N, Cin, Lin]

            ** 层输出 **：
                尺寸          ： [N, Cout, Lout]
                计算          ： 
                                Lout = （向下取整）(（Lin + 2 * padding - dilation * (kernel_size - 1) - 1）/stride + 1)
                额外输出       ：
                                indices   : 最大值索引（仅当 return_indices=True 时，提供该输出），用于 unpooling 阶段

            ** 模型学习参数 **：
                weight       : 可学习参数，表示权值参数，尺寸为： [out_channels, in_channels, kernel_size]
                bias         : 可学习参数，表示偏置项，尺寸为：[out_channels]
            
            ** 示例 **：
                m = nn.MaxPool1d(3, stride=2)
                input = torch.randn(20, 16, 50)
                output = m(input)
        */
        "MaxPool1d":{
            "metaName":"Pooling_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"MaxPool1d",                           // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "MaxPool1d max pooling 1d",       // 搜索时对应的关键字
            "api":"torch.nn.MaxPool1d",                   // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "kernel_size"    : {"type" : "Positive_Integer",     "value" : ""},
                "stride"         : {"type" : "PI_or_None",           "value" : "None"},
                "padding"        : {"type" : "Non_Negative_Integer", "value" : "0"},
                "dilation"       : {"type" : "Positive_Integer",     "value" : "1"},
                "return_indices" : {"type" : "Boolean",              "value" : "False"},
                "ceil_mode"      : {"type" : "Boolean",              "value" : "False"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "MaxPool1d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "MaxPool1d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                对 2-D 输入 tensor 进行最大池化

            ** 层说明 **：

            
            ** 层构造参数 **：
                kernel_size    ： 池化窗口尺寸，对于 2-D tensor，为正整数或者 tuple
                stride         ： 池化窗口移动步长，对于 2-D tensor，为正整数或者 tuple。默认为 None 时，表示等于 kernel_size
                padding        ： padding 尺寸，对于 2-D tensor，为非负整数或者 tuple，默认为 0 
                dilation       ： 卷积核元素之间的间隔，对于 2-D tensor，为正整数或者 tuple，默认为 1
                return_indices ： 若为 True，则同时返回最大值对应的索引（用于 Unpooling）。默认为 False
                ceil_mode      ： true：向上取整；默认 false，向下取整

            ** 层输入 **：
                尺寸          ： [N, C, Hin, Win]

            ** 层输出 **：
                尺寸          ： [N, C, Hout, Wout]
                计算          ： 
                                Hout = （向下取整）((Hin + 2 * padding[0] - dilation[0] * (kernel_size[0] - 1) - 1)/stride[0] + 1)
                                Wout = （向下取整）((Win + 2 * padding[1] - dilation[1] * (kernel_size[1] - 1) - 1)/stride[1] + 1)
                额外输出       ：
                                indices   : 最大值索引（仅当 return_indices=True 时，提供该输出），用于 unpooling 阶段

            ** 模型学习参数 **：
                weight       : 可学习参数，表示权值参数，尺寸为： [out_channels, in_channels, kernel_size]
                bias         : 可学习参数，表示偏置项，尺寸为：[out_channels]
            
            ** 示例 **：
                m = nn.MaxPool2d((3, 2), stride=(2, 1))
                input = torch.randn(20, 16, 50, 32)
                output = m(input)
        */
        "MaxPool2d":{
            "metaName":"Pooling_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"MaxPool2d",                           // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "MaxPool2d max pooling 2d",       // 搜索时对应的关键字
            "api":"torch.nn.MaxPool2d",                      // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "kernel_size"    : {"type" : "PI_Or_(x,x)",            "value" : ""},
                "stride"         : {"type" : "PI_Or_(x,x)_or_None",    "value" : "None"},
                "padding"        : {"type" : "NNI_Or_(x,x)",           "value" : "0"},
                "dilation"       : {"type" : "PI_Or_(x,x)",            "value" : "1"},
                "return_indices" : {"type" : "Boolean",                "value" : "False"},
                "ceil_mode"      : {"type" : "Boolean",                "value" : "False"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "MaxPool2d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "MaxPool2d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                对 3-D 输入 tensor 进行最大池化

            ** 层说明 **：

            
            ** 层构造参数 **：
                kernel_size    ： 池化窗口尺寸，对于 3-D tensor，为正整数或者 tuple
                stride         ： 池化窗口移动步长，对于 3-D tensor，为正整数或者 tuple。默认为 None 时，表示等于 kernel_size
                padding        ： padding 尺寸，对于 3-D tensor，为非负整数或者 tuple，默认为 0 
                dilation       ： 卷积核元素之间的间隔，对于 3-D tensor，为正整数或者 tuple，默认为 1
                return_indices ： 若为 True，则同时返回最大值对应的索引（用于 Unpooling）。默认为 False
                ceil_mode      ： true：向上取整；默认 false，向下取整

            ** 层输入 **：
                尺寸          ： [N, C, Din, Hin, Win]

            ** 层输出 **：
                尺寸          ： [N, C, Dout, Hout, Wout]
                计算          ： 
                                Dout = （向下取整）((Din + 2 * padding[0] - dilation[0] * (kernel_size[0] - 1) - 1)/stride[0] + 1)
                                Hout = （向下取整）((Hin + 2 * padding[1] - dilation[1] * (kernel_size[1] - 1) - 1)/stride[1] + 1)
                                Wout = （向下取整）((Win + 2 * padding[2] - dilation[2] * (kernel_size[2] - 1) - 1)/stride[2] + 1)
                额外输出       ：
                                indices   : 最大值索引（仅当 return_indices=True 时，提供该输出），用于 unpooling 阶段

            ** 模型学习参数 **：
                weight       : 可学习参数，表示权值参数，尺寸为： [out_channels, in_channels, kernel_size]
                bias         : 可学习参数，表示偏置项，尺寸为：[out_channels]
            
            ** 示例 **：
                m = nn.MaxPool3d((3, 2, 2), stride=(2, 1, 2))
                input = torch.randn(20, 16, 50,44, 31)
                output = m(input)
        */
        "MaxPool3d":{
            "metaName":"Pooling_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"MaxPool3d",                           // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "MaxPool3d max pooling 3d",       // 搜索时对应的关键字
            "api":"torch.nn.MaxPool3d",                   // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "kernel_size"    : {"type" : "PI_Or_(x,x,x)",            "value" : ""},
                "stride"         : {"type" : "PI_Or_(x,x,x)_or_None",    "value" : "None"},
                "padding"        : {"type" : "NNI_Or_(x,x,x)",           "value" : "0"},
                "dilation"       : {"type" : "PI_Or_(x,x,x)",            "value" : "1"},
                "return_indices" : {"type" : "Boolean",                  "value" : "False"},
                "ceil_mode"      : {"type" : "Boolean",                  "value" : "False"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "MaxPool3d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "MaxPool3d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                根据 Max_Pooling 部分获取的输出以及最大值的索引，上采样得到原始特征图，其中非最大值的点填充为 0

            ** 层说明 **：

            
            ** 层构造参数 **：
                kernel_size    ： 池化窗口尺寸，对于 1-D tensor，为正整数
                stride         ： 池化窗口移动步长，对于 1-D tensor，为正整数。默认为 None 时，表示等于 kernel_size
                padding        ： padding 尺寸，对于 1-D tensor，为非负整数，默认为 0 

            ** 层输入 **：
                尺寸          ： [N, C, Hin]
                额外输入       : 
                                indices: 最大值所在索引（通过 Max_Pooling 获取）
                                output_size(可选) : torch.Size， 用于确定输出特征的尺寸（因为 max pooling 的同一输出可能对应多种输入）

            ** 层输出 **：
                尺寸          ： [N, C, Hout]
                计算          ： 
                                Hout = (Hin - 1) * stride[0] - 2 * padding[0] + kernel_size[0]
                                或者通过 output_size 指定(tensot.size())

            ** 模型学习参数 **：
            
            ** 示例 **：
                pool = nn.MaxPool1d(2, stride=2, return_indices=True)
                unpool = nn.MaxUnpool1d(2, stride=2)
                input = torch.tensor([[[1., 2, 3, 4, 5, 6, 7, 8]]])
                output, indices = pool(input)
                unpool(output, indices)     // tensor([[[ 0.,  2.,  0.,  4.,  0.,  6.,  0., 8.]]])

                input = torch.tensor([[[1., 2, 3, 4, 5, 6, 7, 8, 9]]])
                output, indices = pool(input)
                unpool(output, indices, output_size=input.size())    // tensor([[[ 0.,  2.,  0.,  4.,  0.,  6.,  0., 8.,  0.]]])
                unpool(output, indices)   // tensor([[[ 0.,  2.,  0.,  4.,  0.,  6.,  0., 8.]]])

        */
        "MaxUnpool1d":{
            "metaName":"Pooling_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"MaxUnpool1d",                         // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "MaxUnpool1d max unpooling 1d",   // 搜索时对应的关键字
            "api":"torch.nn.MaxUnpool1d",                 // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "kernel_size"    : {"type" : "Positive_Integer",            "value" : ""},
                "stride"         : {"type" : "PI_or_None",                  "value" : "None"},
                "padding"        : {"type" : "Non_Negative_Integer",        "value" : "0"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "MaxUnpool1d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "MaxUnpool1d_Update_Layer_outSape"      // 计算并更新输出尺寸
            },

            "extra_input" : {
                "indices_from": "",                                        // 选用哪一个 maxpool 的 indices
                "output_size" : {"type" : "[N, C, Hout]",   "value" : ""}  // 期望输出尺寸(包含 N)
            }
        },
    },
    {
        /*
            ** 层功能 **：
                根据 Max_Pooling 部分获取的输出以及最大值的索引，上采样得到原始特征图，其中非最大值的点填充为 0

            ** 层说明 **：

            
            ** 层构造参数 **：
                kernel_size    ： 池化窗口尺寸，对于 2-D tensor，为正整数或者 tuple
                stride         ： 池化窗口移动步长，对于 2-D tensor，为正整数或者 tuple。默认为 None 时，表示等于 kernel_size
                padding        ： padding 尺寸，对于 2-D tensor，为非负整数或者 tuple，默认为 0

            ** 层输入 **：
                尺寸          ： [N, C, Hin, Win]
                额外输入       : 
                                indices: 最大值所在索引（通过 Max_Pooling 获取）
                                output_size(可选) : torch.Size， 用于确定输出特征的尺寸（因为 max pooling 的同一输出可能对应多种输入）

            ** 层输出 **：
                尺寸          ： [N, C, Hout, Wout]
                计算          ： 
                                Hout = (Hin - 1) * stride[0] - 2 * padding[0] + kernel_size[0]
                                Wout = (Win - 1) * stride[1] - 2 * padding[1] + kernel_size[1]
                                或者通过 output_size 指定(tensot.size())

            ** 模型学习参数 **：
            
            ** 示例 **：
                pool = nn.MaxPool2d(2, stride=2, return_indices=True)
                unpool = nn.MaxUnpool2d(2, stride=2)
                input = torch.tensor([......])
                output, indices = pool(input)
                unpool(output, indices)                                              // [1,1,4,4]
                unpool(output, indices, output_size=torch.Size([1, 1, 5, 5]))        // [1,1,5,5]

        */
        "MaxUnpool2d":{
            "metaName":"Pooling_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"MaxUnpool2d",                         // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "MaxUnpool2d max unpooling 2d",   // 搜索时对应的关键字
            "api":"torch.nn.MaxUnpool2d",                 // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "kernel_size"    : {"type" : "PI_Or_(x,x)",             "value" : ""},
                "stride"         : {"type" : "PI_Or_(x,x)_or_None",     "value" : "None"},
                "padding"        : {"type" : "NNI_Or_(x,x)",            "value" : "0"},
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "MaxUnpool2d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "MaxUnpool2d_Update_Layer_outSape"      // 计算并更新输出尺寸
            },

            "extra_input" : {
                "indices_from": "",                                              // 选用哪一个 maxpool 的 indices
                "output_size" : {"type" : "[N, C, Hout, Wout]",   "value" : ""}  // 期望输出尺寸(包含 N)
            }
        },
    },
    {
        /*
            ** 层功能 **：
                根据 Max_Pooling 部分获取的输出以及最大值的索引，上采样得到原始特征图，其中非最大值的点填充为 0

            ** 层说明 **：

            
            ** 层构造参数 **：
                kernel_size    ： 池化窗口尺寸，对于 3-D tensor，为正整数或者 tuple
                stride         ： 池化窗口移动步长，对于 3-D tensor，为正整数或者 tuple。默认为 None 时，表示等于 kernel_size
                padding        ： padding 尺寸，对于 3-D tensor，为非负整数或者 tuple，默认为 0

            ** 层输入 **：
                尺寸          ： [N, C, Din, Hin, Win]
                额外输入       : 
                                indices: 最大值所在索引（通过 Max_Pooling 获取）
                                output_size(可选) : torch.Size， 用于确定输出特征的尺寸（因为 max pooling 的同一输出可能对应多种输入）

            ** 层输出 **：
                尺寸          ： [N, C, Dout, Hout, Wout]
                计算          ： 
                                Dout = (Din - 1) * stride[0] - 2 * padding[0] + kernel_size[0]
                                Hout = (Hin - 1) * stride[1] - 2 * padding[1] + kernel_size[1]
                                Wout = (Win - 1) * stride[2] - 2 * padding[2] + kernel_size[2]
                                或者通过 output_size 指定(tensot.size())

            ** 模型学习参数 **：
            
            ** 示例 **：
                pool = nn.MaxPool3d(3, stride=2, return_indices=True)
                unpool = nn.MaxUnpool3d(3, stride=2)
                output, indices = pool(torch.randn(20, 16, 51, 33, 15))
                unpooled_output = unpool(output, indices)
                unpooled_output.size()                // torch.Size([20, 16, 51, 33, 15])

        */
        "MaxUnpool3d":{
            "metaName":"Pooling_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"MaxUnpool3d",                         // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "MaxUnpool3d max unpooling 3d",   // 搜索时对应的关键字
            "api":"torch.nn.MaxUnpool3d",                 // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "kernel_size"    : {"type" : "PI_Or_(x,x,x)",             "value" : ""},
                "stride"         : {"type" : "PI_Or_(x,x,x)_or_None",     "value" : "None"},
                "padding"        : {"type" : "NNI_Or_(x,x,x)",            "value" : "0"},
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "MaxUnpool3d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "MaxUnpool3d_Update_Layer_outSape"      // 计算并更新输出尺寸
            },

            "extra_input" : {
                "indices_from": "",                                                    // 选用哪一个 maxpool 的 indices
                "output_size" : {"type" : "[N, C, Dout, Hout, Wout]",   "value" : ""}  // 期望输出尺寸(包含 N)
            }
        },
    },
    {
        /*
            ** 层功能 **：
                进行 1-D 均值池化

            ** 层说明 **：

            
            ** 层构造参数 **：
                kernel_size        ： 池化窗口尺寸， 1-D 的为正整数
                stride             ： 池化步长，1-D 的为正整数（为 None 时，默认等于 stride）
                padding            ： padding 尺寸，1-D 为非负整数
                count_include_pad  ： 当为 True 时，padding 的值将会参与计算，默认为 True
                ceil_mode      ： true：向上取整；默认 false，向下取整

            ** 层输入 **：
                尺寸          ： [N, C, Lin]

            ** 层输出 **：
                尺寸          ： [N, C, Lout]
                计算          ： 
                                Lout = （向下取整）((Lin + 2 * padding - kernel_size) / stride + 1)

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.AvgPool1d(3, stride=2)
                m(torch.tensor([[[1.,2,3,4,5,6,7]]]))     // tensor([[[ 2.,  4.,  6.]]])

        */
        "AvgPool1d":{
            "metaName":"Pooling_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"AvgPool1d",                           // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "AvgPool1d Average pooling 1d",   // 搜索时对应的关键字
            "api":"torch.nn.AvgPool1d",                   // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "kernel_size"        : {"type" : "Positive_Integer",          "value" : ""},
                "stride"             : {"type" : "PI_or_None",                "value" : "None"},
                "padding"            : {"type" : "Non_Negative_Integer",      "value" : "0"},
                "ceil_mode"          : {"type" : "Boolean",                   "value" : "False"},
                "count_include_pad"  : {"type" : "Boolean",                   "value" : "True"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "AvgPool1d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "AvgPool1d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                进行 2-D 均值池化

            ** 层说明 **：

            
            ** 层构造参数 **：
                kernel_size        ： 池化窗口尺寸， 2-D 的为正整数或 tuple
                stride             ： 池化步长，2-D 的为正整数或 tuple
                padding            ： padding 尺寸，2-D 的为非负整数或者 tuple
                count_include_pad  ： 当为 True 时，padding 的值将会参与计算，默认为 True
                ceil_mode          ： true：向上取整；默认 false，向下取整

            ** 层输入 **：
                尺寸          ： [N, C, Hin, Win]

            ** 层输出 **：
                尺寸          ： [N, C, Hout, Wout]
                计算          ： 
                                Hout = （向下取整）((Hin + 2 * padding[0] - kernel_size[0]) / stride[0] + 1)
                                Wout = （向下取整）((Win + 2 * padding[1] - kernel_size[1]) / stride[1] + 1)

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.AvgPool2d(3, stride=2)
                m = nn.AvgPool2d((3, 2), stride=(2, 1))
                input = torch.randn(20, 16, 50, 32)
                output = m(input)

        */
        "AvgPool2d":{
            "metaName":"Pooling_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"AvgPool2d",                           // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "AvgPool2d Average pooling 2d",   // 搜索时对应的关键字
            "api":"torch.nn.AvgPool2d",                   // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "kernel_size"        : {"type" : "PI_Or_(x,x)",           "value" : ""},
                "stride"             : {"type" : "PI_Or_(x,x)_or_None",   "value" : "None"},
                "padding"            : {"type" : "NNI_Or_(x,x)",          "value" : "0"},
                "ceil_mode"          : {"type" : "Boolean",               "value" : "False"},
                "count_include_pad"  : {"type" : "Boolean",               "value" : "True"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "AvgPool2d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "AvgPool2d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                进行 3-D 均值池化

            ** 层说明 **：

            
            ** 层构造参数 **：
                kernel_size        ： 池化窗口尺寸， 3-D 的为正整数或 tuple
                stride             ： 池化步长，3-D 的为正整数或 tuple
                padding            ： padding 尺寸，3-D 的为非负整数或者 tuple
                count_include_pad  ： 当为 True 时，padding 的值将会参与计算，默认为 True
                ceil_mode          ： true：向上取整；默认 false，向下取整

            ** 层输入 **：
                尺寸          ： [N, C, Din, Hin, Win]

            ** 层输出 **：
                尺寸          ： [N, C, Dout, Hout, Wout]
                计算          ： 
                                Dout = （向下取整）((Din + 2 * padding[0] - kernel_size[0]) / stride[0] + 1)
                                Hout = （向下取整）((Hin + 2 * padding[1] - kernel_size[1]) / stride[1] + 1)
                                Wout = （向下取整）((Win + 2 * padding[2] - kernel_size[2]) / stride[2] + 1)

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.AvgPool3d((3, 2, 2), stride=(2, 1, 2))
                input = torch.randn(20, 16, 50,44, 31)
                output = m(input)

        */
        "AvgPool3d":{
            "metaName":"Pooling_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"AvgPool3d",                           // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "AvgPool3d Average pooling 3d",   // 搜索时对应的关键字
            "api":"torch.nn.AvgPool3d",                   // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "kernel_size"        : {"type" : "PI_Or_(x,x,x)",           "value" : ""},
                "stride"             : {"type" : "PI_Or_(x,x,x)_or_None",   "value" : "None"},
                "padding"            : {"type" : "NNI_Or_(x,x,x)",          "value" : "0"},
                "ceil_mode"          : {"type" : "Boolean",                 "value" : "False"},
                "count_include_pad"  : {"type" : "Boolean",                 "value" : "True"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "AvgPool3d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "AvgPool3d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                作用于 2-D 特征，根据目标输出尺寸，将会随机选择 step，并使用 kernel size 指定的滑窗进行最大池化。

            ** 层说明 **：

            
            ** 层构造参数 **：
                kernel_size        ： 最大池化滑窗尺寸，为正整数或者 2-D tuple
                output_size        ： 输出特征图尺寸，为正整数或者 2-D tuple
                output_ratio       ： 指定输出特征图相当于与输入特征图的比率，为 (0,1) 的小数或 2-D tuple
                return_indices     ： 若为 True，则同时返回最大值对应的索引（用于 Unpooling）。默认为 False
                _random_samples    ： 不知道干嘛的，但是对输入输出尺寸无影响。默认为：False

            ** 层输入 **：
                尺寸          : [N, C, Hin, Win]
                备注          : output_size 和 output_ratio 只能有且仅有一个为 None

            ** 层输出 **：
                尺寸          : [N, C, Hout, Wout]
                计算          : 
                                Hout = output_size[0]          Wout = output_size[1]
                                Hout = Hin * output_ratio[0]   Wout = Win * output_ratio[1]

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.FractionalMaxPool2d(3, output_size=(13, 12))
                m = nn.FractionalMaxPool2d(3, output_ratio=(0.5, 0.5))
                input = torch.randn(20, 16, 50, 32)
                output = m(input)

        */
        "FractionalMaxPool2d":{
            "metaName":"Pooling_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"FractionalMaxPool2d",                 // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "FractionalMaxPool2d Fractional max pooling 2d",   // 搜索时对应的关键字
            "api":"torch.nn.FractionalMaxPool2d",         // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "kernel_size"     : {"type" : "PI_Or_(x,x)",                  "value" : ""},
                "output_size"     : {"type" : "PI_Or_(x,x)_or_None",          "value" : "None"},
                "output_ratio"    : {"type" : "Real_(0,1)_or_(x,x)_or_None",  "value" : "None"},
                "return_indices"  : {"type" : "Boolean",                      "value" : "False"},
                "_random_samples" : {"type" : "Boolean",                      "value" : "False"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "FractionalMaxPool2d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "FractionalMaxPool2d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                对 1-D 数据进行 power-average 池化

            ** 层说明 **：


            ** 计算公式 ** : 
                f(X) = power(sum(x^p), 1/p)  其中，x 属于 X， X 为池化窗
                                if p = inf   等效于 MaxPooling
                                if p = 1     等效于 Sum Pooling
                                p != 0
            
            ** 层构造参数 **：
                norm_type     ： 即指数项 p， 1-D 为大于 0 的实数
                kernel_size   ： 池化尺寸，1-D 为正整数
                stride        ： 池化步长，1-D 为正整数，默认为 None，表示与 kernel_size 等同
                ceil_mode     ： true：向上取整；默认 false，向下取整

            ** 层输入 **：
                尺寸          : [N, C, Lin]

            ** 层输出 **：
                尺寸          : [N, C, Lout]
                计算          : 
                                Lout = （向下取整）((Lin  - kernel_size)/stride + 1)

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.LPPool1d(2, 3, stride=2)
                input = torch.randn(20, 16, 50)
                output = m(input)

        */
        "LPPool1d":{
            "metaName":"Pooling_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"LPPool1d",                            // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "LPPool1d power-average pooling pooling 1d",   // 搜索时对应的关键字
            "api":"torch.nn.LPPool1d",                    // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "norm_type"    : {"type" : "Real_(0,inf)",     "value" : ""},
                "kernel_size"  : {"type" : "Positive_Integer", "value" : ""},
                "stride"       : {"type" : "PI_or_None",       "value" : "None"},
                "ceil_mode"    : {"type" : "Boolean",          "value" : "False"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "LPPool1d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "LPPool1d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                对 2-D 数据进行 power-average 池化

            ** 层说明 **：


            ** 计算公式 ** : 
                f(X) = power(sum(x^p), 1/p)  其中，x 属于 X， X 为池化窗
                                if p = inf   等效于 MaxPooling
                                if p = 1     等效于 Sum Pooling
                                p != 0
            
            ** 层构造参数 **：
                norm_type     ： 即指数项 p， 2-D 为大于 0 的实数
                kernel_size   ： 池化尺寸，2-D 为正整数或 2-D tuple
                stride        ： 池化步长，2-D 为正整数或 2-D tuple，默认为 None，表示与 kernel_size 等同
                ceil_mode     ： true：向上取整；默认 false，向下取整

            ** 层输入 **：
                尺寸          : [N, C, Hin, Win]
                备注          : output_size 和 output_ratio 只能有且仅有一个为 None

            ** 层输出 **：
                尺寸          : [N, C, Hout, Wout]
                计算          : 
                                Hout = （向下取整）((Hin - kernel_size[0])/stride[0] + 1)
                                Wout = （向下取整）((Win - kernel_size[1])/stride[1] + 1)

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.LPPool2d(2, 3, stride=2)
                m = nn.LPPool2d(1.2, (3, 2), stride=(2, 1))
                input = torch.randn(20, 16, 50, 32)
                output = m(input)

        */
        "LPPool2d":{
            "metaName":"Pooling_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"LPPool2d",                          // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "LPPool2d power-average pooling 2d",   // 搜索时对应的关键字
            "api":"torch.nn.LPPool2d",                  // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "norm_type"    : {"type" : "Real_(0,inf)",         "value" : ""},
                "kernel_size"  : {"type" : "PI_Or_(x,x)",          "value" : ""},
                "stride"       : {"type" : "PI_Or_(x,x)_or_None",  "value" : "None"},
                "ceil_mode"    : {"type" : "Boolean",              "value" : "False"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "LPPool2d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "LPPool2d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                根据输出尺寸自适应进行 1-D 数据的最大池化。输出通道数与输入通道数一样。
            
            ** 层构造参数 **：
                output_size     ： 目标输出尺寸 H，正整数
                return_indices  ： 若为 True，则同时返回最大值对应的索引（用于 Unpooling）。默认为 False

            ** 层输入 **：
                尺寸          : [N, C, Lin]

            ** 层输出 **：
                尺寸          : [N, C, Lout]

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.AdaptiveMaxPool1d(5)
                input = torch.randn(1, 64, 8)
                output = m(input)

        */
        "AdaptiveMaxPool1d":{
            "metaName":"Pooling_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"AdaptiveMaxPool1d",                   // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "AdaptiveMaxPool1d Adaptive max pooling 1d",   // 搜索时对应的关键字
            "api":"torch.nn.AdaptiveMaxPool1d",           // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "output_size"    : {"type" : "Positive_Integer",  "value" : ""},
                "return_indices" : {"type" : "Boolean",           "value" : "False"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "AdaptiveMaxPool1d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "AdaptiveMaxPool1d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                根据输出尺寸自适应进行 2-D 数据的最大池化。输出通道数与输入通道数一样。
            
            ** 层构造参数 **：
                output_size     ： 目标输出尺寸 [H,W]
                            1. 整数：表示 方形
                            2. 2-D tuple
                            3. 2-D tuple，但是 H 和 W 之一可以为 None，此时表示与输入尺寸一致
                return_indices  ： 若为 True，则同时返回最大值对应的索引（用于 Unpooling）。默认为 False

            ** 层输入 **：
                尺寸          : [N, C, Hin, Win]

            ** 层输出 **：
                尺寸          : [N, C, Hout, Wout]

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.AdaptiveMaxPool2d((5,7))
                input = torch.randn(1, 64, 8, 9)
                output = m(input)

                m = nn.AdaptiveMaxPool2d(7)
                input = torch.randn(1, 64, 10, 9)
                output = m(input)

                m = nn.AdaptiveMaxPool2d((None, 7))
                input = torch.randn(1, 64, 10, 9)
                output = m(input)

        */
        "AdaptiveMaxPool2d":{
            "metaName":"Pooling_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"AdaptiveMaxPool2d",                   // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "AdaptiveMaxPool2d Adaptive max pooling 2d",   // 搜索时对应的关键字
            "api":"torch.nn.AdaptiveMaxPool2d",           // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "output_size"    : {"type" : "PI_or_(x,*)_or_(*,x)",  "value" : ""},
                "return_indices" : {"type" : "Boolean",               "value" : "False"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "AdaptiveMaxPool2d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "AdaptiveMaxPool2d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                根据输出尺寸自适应进行 3-D 数据的最大池化。输出通道数与输入通道数一样。
            
            ** 层构造参数 **：
                output_size     ： 目标输出尺寸 [D,H,W]
                            1. 整数：表示立方
                            2. 3-D tuple
                            3. 3-D tuple，但是 D 或 H 或 W 或可以为 None（不能同时为 None），此时表示与输入尺寸一致
                return_indices  ： 若为 True，则同时返回最大值对应的索引（用于 Unpooling）。默认为 False

            ** 层输入 **：
                尺寸          : [N, C, Din, Hin, Win]

            ** 层输出 **：
                尺寸          : [N, C, Dout, Hout, Wout]

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.AdaptiveMaxPool3d((5,7,9))
                input = torch.randn(1, 64, 8, 9, 10)
                output = m(input)

        */
        "AdaptiveMaxPool3d":{
            "metaName":"Pooling_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"AdaptiveMaxPool3d",                   // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "AdaptiveMaxPool3d Adaptive max pooling 3d",   // 搜索时对应的关键字
            "api":"torch.nn.AdaptiveMaxPool3d",           // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "output_size"    : {"type" : "PI_or_(x,*,*)_or_(*,x,*)_or_(*,*,x)",  "value" : ""},
                "return_indices" : {"type" : "Boolean",                              "value" : "False"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "AdaptiveMaxPool3d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "AdaptiveMaxPool3d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                根据输出尺寸对 1-D 输入进行自适应进行均值池化。输出通道数与输入通道数一样
            
            ** 层构造参数 **：
                output_size     ： output_size     ： 目标输出尺寸 L，正整数

            ** 层输入 **：
                尺寸          : [N, C, Lin]

            ** 层输出 **：
                尺寸          : [N, C, Lout]

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.AdaptiveAvgPool1d(5)
                input = torch.randn(1, 64, 8)
                output = m(input)

        */
        "AdaptiveAvgPool1d":{
            "metaName":"Pooling_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"AdaptiveAvgPool1d",                   // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "AdaptiveAvgPool1d Adaptive average pooling 1d",   // 搜索时对应的关键字
            "api":"torch.nn.AdaptiveAvgPool1d",           // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "output_size"    : {"type" : "Positive_Integer",      "value" : ""},
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "AdaptiveAvgPool1d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "AdaptiveAvgPool1d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                根据输出尺寸对 2-D 输入进行自适应进行均值池化。输出通道数与输入通道数一样
            
            ** 层构造参数 **：
                output_size     ： 目标输出尺寸 [H,W]
                            1. 整数：表示方形
                            2. 2-D tuple
                            3. 2-D tuple，但是 H 或 W 或可以为 None（不能同时为 None），此时表示与输入尺寸一致

            ** 层输入 **：
                尺寸          : [N, C, Hin, Win]

            ** 层输出 **：
                尺寸          : [N, C, Hout, Wout]

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.AdaptiveAvgPool2d((5,7))
                input = torch.randn(1, 64, 8, 9)
                output = m(input)

        */
        "AdaptiveAvgPool2d":{
            "metaName":"Pooling_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"AdaptiveAvgPool2d",                   // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "AdaptiveAvgPool2d Adaptive average pooling 2d",   // 搜索时对应的关键字
            "api":"torch.nn.AdaptiveAvgPool2d",           // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "output_size"    : {"type" : "PI_or_(x,*)_or_(*,x)",    "value" : ""},
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "AdaptiveAvgPool2d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "AdaptiveAvgPool2d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                根据输出尺寸对 3-D 输入进行自适应进行均值池化。输出通道数与输入通道数一样
            
            ** 层构造参数 **：
                output_size ： 目标输出尺寸 [D, H, W]
                            1. 整数：表示方形
                            2. 3-D tuple
                            3. 3-D tuple，但是 D 或 H 或 W 或可以为 None（不能同时为 None），此时表示与输入尺寸一致

            ** 层输入 **：
                尺寸          : [N, C, Din, Hin, Win]

            ** 层输出 **：
                尺寸          : [N, C, Dout, Hout, Wout]

            ** 模型学习参数 **：
            
            ** 示例 **：
                m = nn.AdaptiveAvgPool3d((5,7,9))
                input = torch.randn(1, 64, 8, 9, 10)
                output = m(input)

        */
        "AdaptiveAvgPool3d":{
            "metaName":"Pooling_layers_metaData",         // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"AdaptiveAvgPool3d",                   // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "AdaptiveAvgPool3d Adaptive average pooling 3d",   // 搜索时对应的关键字
            "api":"torch.nn.AdaptiveAvgPool3d",           // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "output_size"    : {"type" : "PI_or_(x,*,*)_or_(*,x,*)_or_(*,*,x)",     "value" : ""},
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "AdaptiveAvgPool3d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "AdaptiveAvgPool3d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
];



/******************************************************* 对应的函数实现 *******************************************************/
/*
    只单纯的负责检测 MaxPool1d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function MaxPool1d_Check_Layer_inShape(layer_id, inShape_array_str){
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
function MaxPool1d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, Cin, Lin] 
        预期的输出尺寸为 ： [N, Cout, Lout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  MaxPool1d_Check_Layer_inShape(layer_id, inShape_array_str);
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
    let kernel_size = parseInt(layer_info_json["params"]["kernel_size"]["value"]);
    let padding = parseInt(layer_info_json["params"]["padding"]["value"]);
    let dilation = parseInt(layer_info_json["params"]["dilation"]["value"]);
    let ceil_mode = layer_info_json["params"]["ceil_mode"]["value"].trim();

    let stride = layer_info_json["params"]["stride"]["value"];
    if(stride.trim() == "None"){  // 如果为 None，则进行处理
        stride = kernel_size;
    }
    else{
        stride = parseInt(stride);
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突

    // 5. 计算并更新输出尺寸
    //      Lout = （向下取整）(（Lin + 2 * padding - dilation * (kernel_size - 1) - 1）/stride + 1)
    let Cout = Cin;

    let Lout = (Lin  + 2 * padding - dilation * (kernel_size - 1) - 1) / stride + 1;

    if(ceil_mode == "True"){  // 向上取整
        Lout = Math.ceil(Lout);
    }else{  // 向下取整
        Lout = Math.floor(Lout);
    }
    
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
function MaxPool2d_Check_Layer_inShape(layer_id, inShape_array_str){
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
function MaxPool2d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, Hin, Win]
        预期的输出尺寸为 ： [N, C, Hout, Wout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  MaxPool2d_Check_Layer_inShape(layer_id, inShape_array_str);
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
    let kernel_size = layer_info_json["params"]["kernel_size"]["value"].trim();    // (x,x)
    let stride = layer_info_json["params"]["stride"]["value"].trim();              // (x,x)
    let padding = layer_info_json["params"]["padding"]["value"].trim();            // (x,x)
    let dilation = layer_info_json["params"]["dilation"]["value"].trim();          // (x,x)
    let ceil_mode = layer_info_json["params"]["ceil_mode"]["value"].trim();

    let k1 = 0;
    let k2 = 0;   //  kernel size
    let s1 = 0;
    let s2 = 0;   //  stride
    let p1 = 0;
    let p2 = 0;   //  padding
    let d1 = 0;
    let d2 = 0;   //  dilation


    if(kernel_size[0] == "("){   // kernel size 为 tuple
        let k_str = kernel_size.substring(1, kernel_size.length-1);
        k1 = parseInt(k_str.split(",")[0]);
        k2 = parseInt(k_str.split(",")[1]);
    }
    else{ // 单个正整数
        k1 = parseInt(kernel_size);
        k2 = k1;
    }

    if(stride[0] == "("){   // stride 为 tuple
        let s_str = stride.substring(1, stride.length-1);
        s1 = parseInt(s_str.split(",")[0]);
        s2 = parseInt(s_str.split(",")[1]);
    }
    else if(stride == "None"){
        s1 = k1;
        s2 = k2;
    }
    else{ // 单个正整数
        s1 = parseInt(stride);
        s2 = s1;
    }

    if(padding[0] == "("){   // padding 为 tuple
        let p_str = padding.substring(1, padding.length-1);
        p1 = parseInt(p_str.split(",")[0]);
        p2 = parseInt(p_str.split(",")[1]);
    }
    else{ // 单个正整数
        p1 = parseInt(padding);
        p2 = p1;
    }

    if(dilation[0] == "("){   // dilation 为 tuple
        let d_str = dilation.substring(1, dilation.length-1);
        d1 = parseInt(d_str.split(",")[0]);
        d2 = parseInt(d_str.split(",")[1]);
    }
    else{ // 单个正整数
        d1 = parseInt(dilation);
        d2 = d1;
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突

    // 5. 计算并更新输出尺寸
    //      Hout = （向下取整）((Hin + 2 * padding[0] - dilation[0] * (kernel_size[0] - 1) - 1)/stride[0] + 1)
    //      Wout = （向下取整）((Win + 2 * padding[1] - dilation[1] * (kernel_size[1] - 1) - 1)/stride[1] + 1)
    let Cout = Cin;
    let Hout = (Hin  + 2 * p1 - d1 * (k1 - 1) - 1) / s1 + 1;
    let Wout = (Win  + 2 * p2 - d2 * (k2 - 1) - 1) / s2 + 1;

    if(ceil_mode == "True"){  // 向上取整
        Hout = Math.ceil(Hout);
        Wout = Math.ceil(Wout);

    }else{  // 向下取整
        Hout = Math.floor(Hout);
        Wout = Math.floor(Wout);
    }

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
    只单纯的负责检测 MaxPool3d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function MaxPool3d_Check_Layer_inShape(layer_id, inShape_array_str){
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
function MaxPool3d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, Din, Hin, Win]
        预期的输出尺寸为 ： [N, C, Dout, Hout, Wout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  MaxPool3d_Check_Layer_inShape(layer_id, inShape_array_str);
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
    let kernel_size = layer_info_json["params"]["kernel_size"]["value"].trim();    // (x,x)
    let stride = layer_info_json["params"]["stride"]["value"].trim();              // (x,x)
    let padding = layer_info_json["params"]["padding"]["value"].trim();            // (x,x)
    let dilation = layer_info_json["params"]["dilation"]["value"].trim();          // (x,x)
    let ceil_mode = layer_info_json["params"]["ceil_mode"]["value"].trim();

    let k1 = 0;
    let k2 = 0;
    let k3 = 0;   //  kernel size
    let s1 = 0;
    let s2 = 0;
    let s3 = 0;   //  stride
    let p1 = 0;
    let p2 = 0;
    let p3 = 0;   //  padding
    let d1 = 0;
    let d2 = 0;
    let d3 = 0;   //  dilation


    if(kernel_size[0] == "("){   // kernel size 为 tuple
        let k_str = kernel_size.substring(1, kernel_size.length-1);
        k1 = parseInt(k_str.split(",")[0]);
        k2 = parseInt(k_str.split(",")[1]);
        k3 = parseInt(k_str.split(",")[2]);
    }
    else{ // 单个正整数
        k1 = parseInt(kernel_size);
        k2 = k1;
        k3 = k1;
    }

    if(stride[0] == "("){   // stride 为 tuple
        let s_str = stride.substring(1, stride.length-1);
        s1 = parseInt(s_str.split(",")[0]);
        s2 = parseInt(s_str.split(",")[1]);
        s3 = parseInt(s_str.split(",")[2]);
    }
    else if(stride == "None"){
        s1 = k1;
        s2 = k2;
        s3 = k3;
    }
    else{ // 单个正整数
        s1 = parseInt(stride);
        s2 = s1;
        s3 = s1;
    }

    if(padding[0] == "("){   // padding 为 tuple
        let p_str = padding.substring(1, padding.length-1);
        p1 = parseInt(p_str.split(",")[0]);
        p2 = parseInt(p_str.split(",")[1]);
        p3 = parseInt(p_str.split(",")[2]);
    }
    else{ // 单个正整数
        p1 = parseInt(padding);
        p2 = p1;
        p3 = p1;
    }

    if(dilation[0] == "("){   // dilation 为 tuple
        let d_str = dilation.substring(1, dilation.length-1);
        d1 = parseInt(d_str.split(",")[0]);
        d2 = parseInt(d_str.split(",")[1]);
        d3 = parseInt(d_str.split(",")[2]);
    }
    else{ // 单个正整数
        d1 = parseInt(dilation);
        d2 = d1;
        d3 = d1;
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突

    // 5. 计算并更新输出尺寸
    //      Wout = （向下取整）((Win + 2 * padding[2] - dilation[2] * (kernel_size[2] - 1) - 1)/stride[2] + 1)
    let Cout = Cin;
    let Dout = (Din  + 2 * p1 - d1 * (k1 - 1) - 1) / s1 + 1;
    let Hout = (Hin  + 2 * p2 - d2 * (k2 - 1) - 1) / s2 + 1;
    let Wout = (Win  + 2 * p3 - d3 * (k3 - 1) - 1) / s3 + 1;

    if(ceil_mode == "True"){  // 向上取整
        Dout = Math.ceil(Dout);
        Hout = Math.ceil(Hout);
        Wout = Math.ceil(Wout);
    }else{  // 向下取整
        Dout = Math.floor(Dout);
        Hout = Math.floor(Hout);
        Wout = Math.floor(Wout);
    }

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
    只单纯的负责检测 MaxUnpool1d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function MaxUnpool1d_Check_Layer_inShape(layer_id, inShape_array_str){
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
function MaxUnpool1d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, Cin, Lin] 
        预期的输出尺寸为 ： [N, Cout, Lout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  MaxUnpool1d_Check_Layer_inShape(layer_id, inShape_array_str);
    if(inputInfo != ""){
        return inputInfo;
    }

    // 2. 获取输入尺寸相关信息
    let inShape_array = JSON.parse(inShape_array_str);
    let inShape = inShape_array[0];
    let Batch_Size  = inShape[0];
    let Cin         = inShape[1];
    let Lin         = inShape[2];

    // 3. 获取输入参数中，与尺寸计算相关的参数
    let layer_info_json = JSON.parse($("#" + layer_id + " .layer_json_data")[0].innerHTML);
    let kernel_size = parseInt(layer_info_json["params"]["kernel_size"]["value"]);
    let padding = parseInt(layer_info_json["params"]["padding"]["value"]);

    let indices_from_Id = layer_info_json["extra_input"]["indices_from"];                   // indices 的来源
    let output_size = JSON.parse(layer_info_json["extra_input"]["output_size"]["value"].trim());   // 指定的输出尺寸

    let stride = layer_info_json["params"]["stride"]["value"];
    if(stride.trim() == "None"){  // 如果为 None，则进行处理
        stride = kernel_size;
    }
    else{
        stride = parseInt(stride);
    }

    // 判断 indices_from 字段是否有效
    let LayerList = document.getElementsByClassName('layer_in_canvas');   // 获取所有层
    let Is_Valid = false;
    for(let layerIndex = 0, listLen = LayerList.length; layerIndex < listLen; layerIndex++){
        // 当前遍历层的 id
        if(indices_from_Id == LayerList[layerIndex].id){
            if(JSON.parse($("#" + indices_from_Id + " .layer_json_data")[0].innerHTML)["params"]["return_indices"]["value"] == "True"){
                Is_Valid = true;
            }
        }
    }

    if(Is_Valid == false){
        return "Error ： layer_id -- please select another maxpool layer to get indices.\n";
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突
    //      indices_from 对应的输出尺寸与当前输入尺寸必须一致，否则报错
    let indices_from_json = JSON.parse($("#" + indices_from_Id + " .layer_json_data")[0].innerHTML);
    let maxpooledShape  = indices_from_json["outShape"];      // 来自 maxpool 的输出尺寸
    if(maxpooledShape.length == 0){  // 如果那一层还未计算输出尺寸，则直接返回
        return "Error ： layer_id -- please complete the layer which indices from(" + indices_from_Id + ").\n";
    }
    if((maxpooledShape[0] != Batch_Size) || (maxpooledShape[1] != Cin) || (maxpooledShape[2] != Lin)){
        return "Error : " + layer_id + " -- the outputsize of the layer which indices from does not match the input of this layer.";
    }

    // 5. 计算并更新输出尺寸
    //      Lout = (Hin - 1) * stride[0] - 2 * padding[0] + kernel_size[0]
    let Cout = Cin;
    let Lout = (Lin - 1)  * stride - 2 * padding + kernel_size;

    //      检查指定的尺寸是否符合要求
    if(output_size[0] != Batch_Size){  // batch size 不对
        return "Error : " + layer_id + " -- batch size from last layer(" + Batch_Size + ") and your specification(" + output_size[0] + ") do not equal.\n";
    }
    if(output_size[1] != Cin){  // in channels 不对
        return "Error : " + layer_id + " -- in channels numbers from last layer(" + Cin + ") and your specification(" + output_size[1] + ") do not equal.\n";
    }
    if((output_size[2] < Lout) || (output_size[2] > Lout + kernel_size - 1)){  // batch size 不对
        return "Error : " + layer_id + " -- the Lin size you specified should be between " + Lout + "(included) and " + Lout + kernel_size - 1 + "(included), but you want to specify it to " + output_size[2] + ".\n";
    }

    let outShape = [Batch_Size, Cout, output_size[2]];

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
    只单纯的负责检测 MaxUnpool2d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function MaxUnpool2d_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, Hin, Win]
    */
    // 1. 解析成数组
    let inShape_array = JSON.parse(inShape_array_str);

    // 2. 检查输入数目
    if(inShape_array.length != 1){
        return "Error : " + layer_id + " : requires only one input, but gets " + inShape_array.length +  "!\n";
    }

    // // 3. 检查输入尺寸的维度
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
function MaxUnpool2d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, Hin, Win] 
        预期的输出尺寸为 ： [N, C, Hout, Wout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  MaxUnpool2d_Check_Layer_inShape(layer_id, inShape_array_str);
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
    let kernel_size = layer_info_json["params"]["kernel_size"]["value"].trim();    // (x,x)
    let stride = layer_info_json["params"]["stride"]["value"].trim();              // (x,x)
    let padding = layer_info_json["params"]["padding"]["value"].trim();            // (x,x)

    let k1 = 0;
    let k2 = 0;   //  kernel size
    let s1 = 0;
    let s2 = 0;   //  stride
    let p1 = 0;
    let p2 = 0;   //  padding

    if(kernel_size[0] == "("){   // kernel size 为 tuple
        let k_str = kernel_size.substring(1, kernel_size.length-1);
        k1 = parseInt(k_str.split(",")[0]);
        k2 = parseInt(k_str.split(",")[1]);
    }
    else{ // 单个正整数
        k1 = parseInt(kernel_size);
        k2 = k1;
    }

    if(stride[0] == "("){   // stride 为 tuple
        let s_str = stride.substring(1, stride.length-1);
        s1 = parseInt(s_str.split(",")[0]);
        s2 = parseInt(s_str.split(",")[1]);
    }
    else if(stride == "None"){
        s1 = k1;
        s2 = k2;
    }
    else{ // 单个正整数
        s1 = parseInt(stride);
        s2 = s1;
    }

    if(padding[0] == "("){   // padding 为 tuple
        let p_str = padding.substring(1, padding.length-1);
        p1 = parseInt(p_str.split(",")[0]);
        p2 = parseInt(p_str.split(",")[1]);
    }
    else{ // 单个正整数
        p1 = parseInt(padding);
        p2 = p1;
    }
        
    // 4. 检查输入参数与输入尺寸之间是否冲突
    let indices_from_Id = layer_info_json["extra_input"]["indices_from"];                   // indices 的来源
    let output_size = JSON.parse(layer_info_json["extra_input"]["output_size"]["value"].trim());   // 指定的输出尺寸

    // 判断 indices_from 字段是否有效
    let LayerList = document.getElementsByClassName('layer_in_canvas');   // 获取所有层
    let Is_Valid = false;
    for(let layerIndex = 0, listLen = LayerList.length; layerIndex < listLen; layerIndex++){
        // 当前遍历层的 id
        if(indices_from_Id == LayerList[layerIndex].id){
            if(JSON.parse($("#" + indices_from_Id + " .layer_json_data")[0].innerHTML)["params"]["return_indices"]["value"] == "True"){
                Is_Valid = true;
            }
        }
    }

    if(Is_Valid == false){
        return "Error ： layer_id -- please select another maxpool layer to get indices.\n";
    }
    
    // 4. 检查输入参数与输入尺寸之间是否冲突
    //      indices_from 对应的输出尺寸与当前输入尺寸必须一致，否则报错
    let indices_from_json = JSON.parse($("#" + indices_from_Id + " .layer_json_data")[0].innerHTML);
    let maxpooledShape  = indices_from_json["outShape"];      // 来自 maxpool 的输出尺寸
    if(maxpooledShape.length == 0){  // 如果那一层还未计算输出尺寸，则直接返回
        return "Error ： layer_id -- please complete the layer which indices from(" + indices_from_Id + ").\n";
    }
    if((maxpooledShape[0] != Batch_Size) || (maxpooledShape[1] != Cin) || (maxpooledShape[2] != Hin) || (maxpooledShape[3] != Win)){
        return "Error : " + layer_id + " -- the outputsize of the layer which indices from does not match the input of this layer.";
    }    



    // 5. 计算并更新输出尺寸
    //      Lout = (Hin - 1) * stride[0] - 2 * padding[0] + kernel_size[0]
    let Cout = Cin;
    let Hout = (Hin - 1)  * s1 - 2 * p1 + k1;
    let Wout = (Win - 1)  * s2 - 2 * p2 + k2;

    //      检查指定的尺寸是否符合要求
    if(output_size[0] != Batch_Size){  // batch size 不对
        return "Error : " + layer_id + " -- batch size from last layer(" + Batch_Size + ") and your specification(" + output_size[0] + ") do not equal.\n";
    }
    if(output_size[1] != Cin){  // in channels 不对
        return "Error : " + layer_id + " -- in channels numbers from last layer(" + Cin + ") and your specification(" + output_size[1] + ") do not equal.\n";
    }
    if((output_size[2] < Hout) || (output_size[2] > Hout + k1 - 1)){  // batch size 不对
        return "Error : " + layer_id + " -- the Hout size you specified should be between " + Hout + "(included) and " + Hout + k1 - 1 + "(included), but you want to specify it to " + output_size[2] + ".\n";
    }
    if((output_size[3] < Wout) || (output_size[2] > Wout + k2 - 1)){  // batch size 不对
        return "Error : " + layer_id + " -- the Wout size you specified should be between " + Wout + "(included) and " + Wout + k2 - 1 + "(included), but you want to specify it to " + output_size[3] + ".\n";
    }

    let outShape = [Batch_Size, Cout, output_size[2], output_size[3]];


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
    只单纯的负责检测 MaxUnpool3d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function MaxUnpool3d_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, Din, Hin, Win]
    */
    // 1. 解析成数组
    let inShape_array = JSON.parse(inShape_array_str);

    // 2. 检查输入数目
    if(inShape_array.length != 1){
        return "Error : " + layer_id + " : requires only one input(optional one single-element array to specify output size), but gets " + inShape_array.length +  "!\n";
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
function MaxUnpool3d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, Din, Hin, Win]
        预期的输出尺寸为 ： [N, C, Dout, Hout, Wout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  MaxUnpool3d_Check_Layer_inShape(layer_id, inShape_array_str);
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
    let kernel_size = layer_info_json["params"]["kernel_size"]["value"].trim();    // (x,x)
    let stride = layer_info_json["params"]["stride"]["value"].trim();              // (x,x)
    let padding = layer_info_json["params"]["padding"]["value"].trim();            // (x,x)

    let k1 = 0;
    let k2 = 0;
    let k3 = 0;   //  kernel size
    let s1 = 0;
    let s2 = 0;
    let s3 = 0;   //  stride
    let p1 = 0;
    let p2 = 0;
    let p3 = 0;   //  padding

    if(kernel_size[0] == "("){   // kernel size 为 tuple
        let k_str = kernel_size.substring(1, kernel_size.length-1);
        k1 = parseInt(k_str.split(",")[0]);
        k2 = parseInt(k_str.split(",")[1]);
        k3 = parseInt(k_str.split(",")[2]);
    }
    else{ // 单个正整数
        k1 = parseInt(kernel_size);
        k2 = k1;
        k3 = k1;
    }

    if(stride[0] == "("){   // stride 为 tuple
        let s_str = stride.substring(1, stride.length-1);
        s1 = parseInt(s_str.split(",")[0]);
        s2 = parseInt(s_str.split(",")[1]);
        s3 = parseInt(s_str.split(",")[2]);
    }
    else if(stride == "None"){
        s1 = k1;
        s2 = k2;
        s3 = k3;
    }
    else{ // 单个正整数
        s1 = parseInt(stride);
        s2 = s1;
        s3 = s1;
    }

    if(padding[0] == "("){   // padding 为 tuple
        let p_str = padding.substring(1, padding.length-1);
        p1 = parseInt(p_str.split(",")[0]);
        p2 = parseInt(p_str.split(",")[1]);
        p3 = parseInt(p_str.split(",")[2]);
    }
    else{ // 单个正整数
        p1 = parseInt(padding);
        p2 = p1;
        p3 = p1;
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突
    let indices_from_Id = layer_info_json["extra_input"]["indices_from"];                   // indices 的来源
    let output_size = JSON.parse(layer_info_json["extra_input"]["output_size"]["value"].trim());   // 指定的输出尺寸

    // 判断 indices_from 字段是否有效
    let LayerList = document.getElementsByClassName('layer_in_canvas');   // 获取所有层
    let Is_Valid = false;
    for(let layerIndex = 0, listLen = LayerList.length; layerIndex < listLen; layerIndex++){
        // 当前遍历层的 id
        if(indices_from_Id == LayerList[layerIndex].id){
            if(JSON.parse($("#" + indices_from_Id + " .layer_json_data")[0].innerHTML)["params"]["return_indices"]["value"] == "True"){
                Is_Valid = true;
            }
        }
    }

    if(Is_Valid == false){
        return "Error ： layer_id -- please select another maxpool layer to get indices.\n";
    }


    //      indices_from 对应的输出尺寸与当前输入尺寸必须一致，否则报错
    let indices_from_json = JSON.parse($("#" + indices_from_Id + " .layer_json_data")[0].innerHTML);
    let maxpooledShape  = indices_from_json["outShape"];      // 来自 maxpool 的输出尺寸
    if(maxpooledShape.length == 0){  // 如果那一层还未计算输出尺寸，则直接返回
        return "Error ： layer_id -- please complete the layer which indices from(" + indices_from_Id + ").\n";
    }
    if((maxpooledShape[0] != Batch_Size) || (maxpooledShape[1] != Cin) || (maxpooledShape[2] != Din) || (maxpooledShape[3] != Hin) || (maxpooledShape[4] != Win)){
        return "Error : " + layer_id + " -- the outputsize of the layer which indices from does not match the input of this layer.";
    }
    
    


    // 5. 计算并更新输出尺寸
    //      Lout = (Hin - 1) * stride[0] - 2 * padding[0] + kernel_size[0]
    let Cout = Cin;
    let Dout = (Din - 1)  * s1 - 2 * p1 + k1;
    let Hout = (Hin - 1)  * s2 - 2 * p2 + k2;
    let Wout = (Win - 1)  * s3 - 2 * p3 + k3;

    //      检查指定的尺寸是否符合要求
    if(output_size[0] != Batch_Size){  // batch size 不对
        return "Error : " + layer_id + " -- batch size from last layer(" + Batch_Size + ") and your specification(" + output_size[0] + ") do not equal.\n";
    }
    if(output_size[1] != Cin){  // in channels 不对
        return "Error : " + layer_id + " -- in channels numbers from last layer(" + Cin + ") and your specification(" + output_size[1] + ") do not equal.\n";
    }
    if((output_size[2] < Lout) || (output_size[2] > Lout + kernel_size - 1)){  // batch size 不对
        return "Error : " + layer_id + " -- the Lin size you specified should be between " + Lout + "(included) and " + Lout + kernel_size - 1 + "(included), but you want to specify it to " + output_size[2] + ".\n";
    }

    let outShape = [Batch_Size, Cout, output_size[2], output_size[3], output_size[4]];


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
    只单纯的负责检测 AvgPool1d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function AvgPool1d_Check_Layer_inShape(layer_id, inShape_array_str){
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
        return "Error : " + layer_id + " -- shape of input requires 3 dimensions([N,C,L]), but gets " + inShape_array[0].length + ".\n";
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
function AvgPool1d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, Cin, Lin] 
        预期的输出尺寸为 ： [N, Cout, Lout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  AvgPool1d_Check_Layer_inShape(layer_id, inShape_array_str);
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
    let kernel_size     = parseInt(layer_info_json["params"]["kernel_size"]["value"]);
    let padding         = parseInt(layer_info_json["params"]["padding"]["value"]);
    let ceil_mode       = layer_info_json["params"]["ceil_mode"]["value"].trim();

    let stride = layer_info_json["params"]["stride"]["value"];
    if(stride.trim() == "None"){  // 如果为 None，则进行处理
        stride = kernel_size;
    }
    else{
        stride = parseInt(stride);
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突

    // 5. 计算并更新输出尺寸
    //      Lout = （向下取整）((Lin + 2 * padding - kernel_size) / stride + 1)
    let Cout = Cin;
    let Lout = (Lin  + 2 * padding - kernel_size) / stride + 1;   // 向下取整

    if(ceil_mode == "True"){   // 向上取整
        Lout = Math.ceil(Lout);
    }else{
        Lout = Math.floor(Lout);
    }
    
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
function AvgPool2d_Check_Layer_inShape(layer_id, inShape_array_str){
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
function AvgPool2d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, Hin, Win]
        预期的输出尺寸为 ： [N, C, Hout, Wout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  AvgPool2d_Check_Layer_inShape(layer_id, inShape_array_str);
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
    let kernel_size     = layer_info_json["params"]["kernel_size"]["value"].trim();      // (x,x)
    let stride          = layer_info_json["params"]["stride"]["value"].trim();           // (x,x)
    let padding         = layer_info_json["params"]["padding"]["value"].trim();          // (x,x)
    let ceil_mode       = layer_info_json["params"]["ceil_mode"]["value"].trim();

    let k1 = 0;
    let k2 = 0;   //  kernel size
    let s1 = 0;
    let s2 = 0;   //  stride
    let p1 = 0;
    let p2 = 0;   //  padding

    if(kernel_size[0] == "("){   // kernel size 为 tuple
        let k_str = kernel_size.substring(1, kernel_size.length-1);
        k1 = parseInt(k_str.split(",")[0]);
        k2 = parseInt(k_str.split(",")[1]);
    }
    else{ // 单个正整数
        k1 = parseInt(kernel_size);
        k2 = k1;
    }

    if(stride[0] == "("){   // stride 为 tuple
        let s_str = stride.substring(1, stride.length-1);
        s1 = parseInt(s_str.split(",")[0]);
        s2 = parseInt(s_str.split(",")[1]);
    }
    else if(stride == "None"){
        s1 = k1;
        s2 = k2;
    }
    else{ // 单个正整数
        s1 = parseInt(stride);
        s2 = s1;
    }

    if(padding[0] == "("){   // padding 为 tuple
        let p_str = padding.substring(1, padding.length-1);
        p1 = parseInt(p_str.split(",")[0]);
        p2 = parseInt(p_str.split(",")[1]);
    }
    else{ // 单个正整数
        p1 = parseInt(padding);
        p2 = p1;
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突

    // 5. 计算并更新输出尺寸
    //      Hout = （向下取整）((Hin + 2 * padding[0] - kernel_size[0]) / stride[0] + 1)
    //      Wout = （向下取整）((Win + 2 * padding[1] - kernel_size[1]) / stride[1] + 1)
    let Cout = Cin;
    let Hout = (Hin  + 2 * p1 - k1) / s1 + 1;
    let Wout = (Win  + 2 * p2 - k2) / s2 + 1;

    if(ceil_mode == "True"){  // 向上取整
        Hout = Math.ceil(Hout);
        Wout = Math.ceil(Wout);
    }else{  // 向下取整
        Hout = Math.floor(Hout);
        Wout = Math.floor(Wout);
    }

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
    只单纯的负责检测 AvgPool3d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function AvgPool3d_Check_Layer_inShape(layer_id, inShape_array_str){
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
function AvgPool3d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, Din, Hin, Win]
        预期的输出尺寸为 ： [N, C, Dout, Hout, Wout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  AvgPool3d_Check_Layer_inShape(layer_id, inShape_array_str);
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
    let kernel_size     = layer_info_json["params"]["kernel_size"]["value"].trim();    // (x,x)
    let stride          = layer_info_json["params"]["stride"]["value"].trim();         // (x,x)
    let padding         = layer_info_json["params"]["padding"]["value"].trim();        // (x,x)
    let ceil_mode       = layer_info_json["params"]["ceil_mode"]["value"].trim();

    let k1 = 0;
    let k2 = 0;
    let k3 = 0;   //  kernel size
    let s1 = 0;
    let s2 = 0;
    let s3 = 0;   //  stride
    let p1 = 0;
    let p2 = 0;
    let p3 = 0;   //  padding

    if(kernel_size[0] == "("){   // kernel size 为 tuple
        let k_str = kernel_size.substring(1, kernel_size.length-1);
        k1 = parseInt(k_str.split(",")[0]);
        k2 = parseInt(k_str.split(",")[1]);
        k3 = parseInt(k_str.split(",")[2]);
    }
    else{ // 单个正整数
        k1 = parseInt(kernel_size);
        k2 = k1;
        k3 = k1;
    }

    if(stride[0] == "("){   // stride 为 tuple
        let s_str = stride.substring(1, stride.length-1);
        s1 = parseInt(s_str.split(",")[0]);
        s2 = parseInt(s_str.split(",")[1]);
        s3 = parseInt(s_str.split(",")[2]);
    }
    else if(stride == "None"){
        s1 = k1;
        s2 = k2;
        s3 = k3;
    }
    else{ // 单个正整数
        s1 = parseInt(stride);
        s2 = s1;
        s3 = s1;
    }

    if(padding[0] == "("){   // padding 为 tuple
        let p_str = padding.substring(1, padding.length-1);
        p1 = parseInt(p_str.split(",")[0]);
        p2 = parseInt(p_str.split(",")[1]);
        p3 = parseInt(p_str.split(",")[2]);
    }
    else{ // 单个正整数
        p1 = parseInt(padding);
        p2 = p1;
        p3 = p1;
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突

    // 5. 计算并更新输出尺寸
    //      Lout = （向下取整）((Lin + 2 * padding - kernel_size) / stride + 1)
    let Cout = Cin;
    let Dout = (Din  + 2 * p1 - k1) / s1 + 1;
    let Hout = (Hin  + 2 * p2 - k2) / s2 + 1;
    let Wout = (Win  + 2 * p3 - k3) / s3 + 1;

    if(ceil_mode == "True"){  // 向上取整
        Dout = Math.ceil(Dout);
        Hout = Math.ceil(Hout);
        Wout = Math.ceil(Wout);
    }else{  // 向下取整
        Dout = Math.floor(Dout);
        Hout = Math.floor(Hout);
        Wout = Math.floor(Wout);
    }

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
    只单纯的负责检测 FractionalMaxPool2d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function FractionalMaxPool2d_Check_Layer_inShape(layer_id, inShape_array_str){
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
function FractionalMaxPool2d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, Hin, Win]
        预期的输出尺寸为 ： [N, C, Hout, Wout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  FractionalMaxPool2d_Check_Layer_inShape(layer_id, inShape_array_str);
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
    let kernel_size = layer_info_json["params"]["kernel_size"]["value"].trim();
    let output_size = layer_info_json["params"]["output_size"]["value"].trim();
    let output_ratio = layer_info_json["params"]["output_ratio"]["value"].trim();

    // 该层要求 output_ratio 和 output_size 只能指定一个，也就是说，必须有一个为 None
    if(((output_size == "None") && (output_ratio == "None")) || ((output_size != "None") && (output_ratio != "None"))){
        return "Error : " + layer_id + ' -- there must be (only) one None in "output_size" and "output_ratio".\n';
    }

    let k1  = 0;
    let k2  = 0;   //  kernel size
    let os1 = 0;
    let os2 = 0;   //  output_size
    let or1 = 0;
    let or2 = 0;   //  output_ratio

    if(kernel_size[0] == "("){   // kernel size 为 tuple
        let k_str = kernel_size.substring(1, kernel_size.length-1);
        k1 = parseInt(k_str.split(",")[0]);
        k2 = parseInt(k_str.split(",")[1]);
    }
    else{ // 单个正整数
        k1 = parseInt(kernel_size);
        k2 = k1;
    }

    if(output_size[0] == "("){   // output_size 为 tuple
        let os_str = output_size.substring(1, output_size.length-1);
        os1 = parseInt(os_str.split(",")[0]);
        os2 = parseInt(os_str.split(",")[1]);
    }
    else if(output_size != "None"){ // 单个正整数
        os1 = parseInt(output_size);
        os2 = os1;
    }

    if(output_ratio[0] == "("){   // output_ratio 为 tuple
        let or_str = output_ratio.substring(1, output_ratio.length-1);
        or1 = parseFloat(or_str.split(",")[0]);
        or2 = parseFloat(or_str.split(",")[1]);
    }
    else if(output_ratio != "None"){ // 单个正整数
        or1 = parseFloat(output_ratio);
        or2 = or1;
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突

    // 5. 计算并更新输出尺寸
    let Cout = Cin;
    let Hout = 0;
    let Wout = 0;

    if(output_ratio == "None"){  // 由 output_size 指定
        Hout = os1;
        Wout = os2;
    }else{
        Hout = Math.floor(Hin * or1);
        Wout = Math.floor(Win * or2);
    }

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
    只单纯的负责检测 MaxPool1d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function LPPool1d_Check_Layer_inShape(layer_id, inShape_array_str){
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
function LPPool1d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, Cin, Lin] 
        预期的输出尺寸为 ： [N, Cout, Lout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  LPPool1d_Check_Layer_inShape(layer_id, inShape_array_str);
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
    let kernel_size = parseInt(layer_info_json["params"]["kernel_size"]["value"]);
    let ceil_mode = layer_info_json["params"]["ceil_mode"]["value"].trim();

    let stride = layer_info_json["params"]["stride"]["value"];
    if(stride.trim() == "None"){  // 如果为 None，则进行处理
        stride = kernel_size;
    }
    else{
        stride = parseInt(stride);
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突

    // 5. 计算并更新输出尺寸
    //      Lout = （向下取整）((Lin - kernel_size)/stride + 1)
    let Cout = Cin;

    let Lout = (Lin - kernel_size) / stride + 1;

    if(ceil_mode == "True"){  // 向上取整
        Lout = Math.ceil(Lout);
    }else{  // 向下取整
        Lout = Math.floor(Lout);
    }
    
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
    只单纯的负责检测 LPPool2d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function LPPool2d_Check_Layer_inShape(layer_id, inShape_array_str){
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
function LPPool2d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, Hin, Win]
        预期的输出尺寸为 ： [N, C, Hout, Wout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  LPPool2d_Check_Layer_inShape(layer_id, inShape_array_str);
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
    let kernel_size = layer_info_json["params"]["kernel_size"]["value"].trim();    // (x,x)
    let stride = layer_info_json["params"]["stride"]["value"].trim();              // (x,x)
    let ceil_mode = layer_info_json["params"]["ceil_mode"]["value"].trim();

    let k1 = 0;
    let k2 = 0;   //  kernel size
    let s1 = 0;
    let s2 = 0;   //  stride


    if(kernel_size[0] == "("){   // kernel size 为 tuple
        let k_str = kernel_size.substring(1, kernel_size.length-1);
        k1 = parseInt(k_str.split(",")[0]);
        k2 = parseInt(k_str.split(",")[1]);
    }
    else{ // 单个正整数
        k1 = parseInt(kernel_size);
        k2 = k1;
    }

    if(stride[0] == "("){   // stride 为 tuple
        let s_str = stride.substring(1, stride.length-1);
        s1 = parseInt(s_str.split(",")[0]);
        s2 = parseInt(s_str.split(",")[1]);
    }
    else if(stride == "None"){
        s1 = k1;
        s2 = k2;
    }
    else{ // 单个正整数
        s1 = parseInt(stride);
        s2 = s1;
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突

    // 5. 计算并更新输出尺寸
    //      Hout = （向下取整）((Hin - kernel_size[0] )/stride[0] + 1)
    //      Wout = （向下取整）((Win - kernel_size[1] )/stride[1] + 1)
    let Cout = Cin;
    let Hout = (Hin - k1) / s1 + 1;
    let Wout = (Win - k2) / s2 + 1;

    if(ceil_mode == "True"){  // 向上取整
        Hout = Math.ceil(Hout);
        Wout = Math.ceil(Wout);

    }else{  // 向下取整
        Hout = Math.floor(Hout);
        Wout = Math.floor(Wout);
    }

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
    只单纯的负责检测 AdaptiveMaxPool1d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function AdaptiveMaxPool1d_Check_Layer_inShape(layer_id, inShape_array_str){
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
function AdaptiveMaxPool1d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, Cin, Lin] 
        预期的输出尺寸为 ： [N, Cout, Lout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  AdaptiveMaxPool1d_Check_Layer_inShape(layer_id, inShape_array_str);
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
    let output_size = parseInt(layer_info_json["params"]["output_size"]["value"]);

    // 4. 检查输入参数与输入尺寸之间是否冲突
    if(output_size > Lin){
        return "Error : " + layer_id + " -- output size([" + output_size + "]) specified should" +  
                    " not more than input size([" + Lin + "]).\n"; 
    }
    
    // 5. 计算并更新输出尺寸
    //      Lout = （向下取整）(（Lin + 2 * padding - dilation * (kernel_size - 1) - 1）/stride + 1)
    let Cout = Cin;
    let Lout = output_size;
    
    let outShape = [Batch_Size, Cout, Lout];

    // 6. 检查计算结果是否符合逻辑
    if(Lout >= Lin){
        return "Error : " + layer_id + " -- shape of Lout(" + Lout + ") should less than Lin(" + Lin + ").\n";
    }
    
    // 7. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 8. 成功，返回空字符串
    return "";
}



/*
    只单纯的负责检测 AdaptiveMaxPool2d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function AdaptiveMaxPool2d_Check_Layer_inShape(layer_id, inShape_array_str){
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
function AdaptiveMaxPool2d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, Hin, Win]
        预期的输出尺寸为 ： [N, C, Hout, Wout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  AdaptiveMaxPool2d_Check_Layer_inShape(layer_id, inShape_array_str);
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
    let output_size = layer_info_json["params"]["output_size"]["value"].trim();    // (x,x)

    let o1 = 0;
    let o2 = 0;   //  output_size size

    if(output_size[0] == "("){   // kernel size 为 tuple
        let o_str = output_size.substring(1, output_size.length-1);
        o1 = o_str.split(",")[0].trim();
        o2 = o_str.split(",")[1].trim();

        if(o1 == "None"){
            o1 = Hin;
        }else{
            o1 = parseInt(o1);
        }

        if(o2 == "None"){
            o2 = Win;
        }else{
            o2 = parseInt(o2);
        }
    }
    else{ // 单个正整数
        o1 = parseInt(output_size);
        o2 = o1;
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突
    if((o1 > Hin) || (o2 > Win)){
        return "Error : " + layer_id + " -- output size([" + o1 + "," + o2 + "]) specified should" +  
                    " not more than input size([" + Hin + "," + Win + "]).\n"; 
    }

    // 5. 计算并更新输出尺寸
    let Cout = Cin;
    let Hout = o1;
    let Wout = o2;
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
    只单纯的负责检测 AdaptiveMaxPool3d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function AdaptiveMaxPool3d_Check_Layer_inShape(layer_id, inShape_array_str){
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
function AdaptiveMaxPool3d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, Din, Hin, Win]
        预期的输出尺寸为 ： [N, C, Dout, Hout, Wout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  AdaptiveMaxPool3d_Check_Layer_inShape(layer_id, inShape_array_str);
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
    let output_size = layer_info_json["params"]["output_size"]["value"].trim();    // (x,x)

    let o1 = 0;
    let o2 = 0;
    let o3 = 0;   //  kernel size


    if(output_size[0] == "("){   // kernel size 为 tuple
        let o_str = output_size.substring(1, output_size.length-1);
        o1 = o_str.split(",")[0];
        o2 = o_str.split(",")[1];
        o3 = o_str.split(",")[2];

        if(o1 == "None"){
            o1 = Din;
        }else{
            o1 = parseInt(o1);
        } 
        if(o2 == "None"){
            o2 = Hin;
        }else{
            o2 = parseInt(o2);
        }        
        if(o3 == "None"){
            o3 = Win;
        }else{
            o3 = parseInt(o3);
        } 
    }
    else{ // 单个正整数
        o1 = parseInt(output_size);
        o2 = o1;
        o3 = o1;
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突
    if((o1 > Din) || (o2 > Hin) || (o3 > Win)){
        return "Error : " + layer_id + " -- output size([" + o1 + "," + o2 + "," + o3 + "]) specified should" +  
                    " not more than input size([" + Din + "," + Hin + "," + Win + "]).\n"; 
    }

    // 5. 计算并更新输出尺寸
    let Cout = Cin;
    let Dout = o1;
    let Hout = o2;
    let Wout = o3;

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
    只单纯的负责检测 AdaptiveMaxPool1d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function AdaptiveAvgPool1d_Check_Layer_inShape(layer_id, inShape_array_str){
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
function AdaptiveAvgPool1d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, Cin, Lin] 
        预期的输出尺寸为 ： [N, Cout, Lout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  AdaptiveAvgPool1d_Check_Layer_inShape(layer_id, inShape_array_str);
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
    let output_size = parseInt(layer_info_json["params"]["output_size"]["value"]);

    // 4. 检查输入参数与输入尺寸之间是否冲突
    if(output_size > Lin){
        return "Error : " + layer_id + " -- output size([" + output_size + "]) specified should" +  
                    " not more than input size([" + Lin + "]).\n"; 
    }

    // 5. 计算并更新输出尺寸
    let Cout = Cin;
    let Lout = output_size;
    
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
    只单纯的负责检测 AdaptiveMaxPool2d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function AdaptiveAvgPool2d_Check_Layer_inShape(layer_id, inShape_array_str){
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
function AdaptiveAvgPool2d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, Hin, Win]
        预期的输出尺寸为 ： [N, C, Hout, Wout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  AdaptiveAvgPool2d_Check_Layer_inShape(layer_id, inShape_array_str);
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
    let output_size = layer_info_json["params"]["output_size"]["value"].trim();    // (x,x)

    let o1 = 0;
    let o2 = 0;   //  output_size size

    if(output_size[0] == "("){   // kernel size 为 tuple
        let o_str = output_size.substring(1, output_size.length-1);
        o1 = parseInt(o_str.split(",")[0].trim());
        o2 = parseInt(o_str.split(",")[1].trim());

        if(o1 == "None"){
            o1 = Hin;
        }else{
            o1 = parseInt(o1);
        }

        if(o2 == "None"){
            o2 = Win;
        }else{
            o2 = parseInt(o2);
        }
    }
    else{ // 单个正整数
        o1 = parseInt(output_size);
        o2 = o1;
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突
    if((o1 > Hin) || (o2 > Win)){
        return "Error : " + layer_id + " -- output size([" + o1 + "," + o2 + "]) specified should" +  
                    " not more than input size([" + Hin + "," + Win + "]).\n"; 
    }

    // 5. 计算并更新输出尺寸
    let Cout = Cin;
    let Hout = o1;
    let Wout = o2;
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
    只单纯的负责检测 AdaptiveMaxPool3d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function AdaptiveAvgPool3d_Check_Layer_inShape(layer_id, inShape_array_str){
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
function AdaptiveAvgPool3d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, C, Din, Hin, Win]
        预期的输出尺寸为 ： [N, C, Dout, Hout, Wout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  AdaptiveAvgPool3d_Check_Layer_inShape(layer_id, inShape_array_str);
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
    let output_size = layer_info_json["params"]["output_size"]["value"].trim();    // (x,x)

    let o1 = 0;
    let o2 = 0;
    let o3 = 0;   //  kernel size


    if(output_size[0] == "("){   // kernel size 为 tuple
        let o_str = output_size.substring(1, output_size.length-1);
        o1 = o_str.split(",")[0];
        o2 = o_str.split(",")[1];
        o3 = o_str.split(",")[2];

        if(o1 == "None"){
            o1 = Din;
        }else{
            o1 = parseInt(o1);
        } 
        if(o2 == "None"){
            o2 = Hin;
        }else{
            o2 = parseInt(o2);
        }        
        if(o3 == "None"){
            o3 = Win;
        }else{
            o3 = parseInt(o3);
        } 
    }
    else{ // 单个正整数
        o1 = parseInt(output_size);
        o2 = o1;
        o3 = o1;
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突（在这里，输出尺寸必须必输入尺寸小）
    if((o1 > Din) || (o2 > Hin) || (o3 > Win)){
        return "Error : " + layer_id + " -- output size([" + o1 + "," + o2 + "," + o3 + "]) specified should" +  
                    " not more than input size([" + Din + "," + Hin + "," + Win + "]).\n"; 
    }

    // 5. 计算并更新输出尺寸
    let Cout = Cin;
    let Dout = o1;
    let Hout = o2;
    let Wout = o3;

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