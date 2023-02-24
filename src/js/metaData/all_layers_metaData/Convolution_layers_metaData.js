/* 所有预置卷积层  Convolution_layers_metaData */



/******************************************************* 层数据 *******************************************************/
var Convolution_layers_metaData = [
    {
        // 第一个元素包含该 metaData 的基本信息
        "metaDataName"      : "Convolution_layers_metaData",   // metaData 的名字
        "metaDataType"      : "Layers_metaData",               // metaData 的类型
        "dom_div_name"      : "Convolutional_layers",          // 该字段用于生成列表中的 header 和 list 名
        "dom_header_text"   : "Convolutional Layers"           // header 上显示的描述名
    },
    {
        /*
            ** 层功能 **：
                对 N 个样本进行一维卷积运算，每个样本包含 C 个通道数，单通道特征尺寸为 L（1-D 即长度）

            ** 层说明 **：

            
            ** 层构造参数 **：
                in_channels  ： 输入特征图的通道数，正整数
                out_channels ： 输出特征图的通道数，正整数
                kernel_size  ： 卷积核尺寸，对于 1-D 输入，为正整数
                stride       ： 控制步长，对于 1-D 输入，为正整数，默认为 1
                padding      ： padding 尺寸，两边 padding 一致。对于 1-D 输入，为非负整数，默认为 0
                dilation     ： 卷积核每个元素之间的距离，对于 1-D 输入，为正整数， 默认为 1 。（详见：https://github.com/vdumoulin/conv_arithmetic/blob/master/README.md）
                groups       ： 控制输入与输出之间的连接分组，in_channels 和 out_channels 必须可以整除 groups，默认为 1， 表示不分组
                bias         ： 表示是否添加可学习参数 bias 到输出。默认为 True，即：添加

            ** 层输入 **：
                尺寸          ： [N, Cin, Lin]

            ** 层输出 **：
                尺寸          ： [N, Cout, Lout]
                计算          ： 
                                Lout = （向下取整）(（Lin + 2 * padding - dilation * (kernel_size - 1) - 1）/stride + 1)

            ** 模型学习参数 **：
                weight       : 可学习参数，表示权值参数，尺寸为： [out_channels, in_channels, kernel_size]
                bias         : 可学习参数，表示偏置项，尺寸为：[out_channels]
            
            ** 示例 **：
                m = nn.Conv1d(16, 33, 3, stride=2)
                input = torch.randn(20, 16, 50)
                output = m(input)
        */
        "Conv1d":{
            "metaName":"Convolution_layers_metaData",     // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"Conv1d",                              // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "Conv1d Convolutional 1d",        // 搜索时对应的关键字
            "api":"torch.nn.Conv1d",                      // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化

            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "in_channels"  :{ "type" : "Positive_Integer",     "value" : ""     },
                "out_channels" :{ "type" : "Positive_Integer",     "value" : ""     },
                "kernel_size"  :{ "type" : "Positive_Integer",     "value" : ""     },
                "stride"       :{ "type" : "Positive_Integer",     "value" : "1"    },
                "padding"      :{ "type" : "Non_Negative_Integer", "value" : "0"    },
                "dilation"     :{ "type" : "Positive_Integer",     "value" : "1"    },
                "groups"       :{ "type" : "Positive_Integer",     "value" : "1"    },
                "bias"         :{ "type" : "Boolean",              "value" : "True" }
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "Conv1d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "Conv1d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                对 N 个样本进行二维卷积运算，每个样本包含 C 个通道数，单通道特征尺寸为 [H, W]

            ** 层说明 **：

            
            ** 层构造参数 **：
                in_channels  ： 输入特征图的通道数，正整数
                out_channels ： 输出特征图的通道数，正整数
                kernel_size  ： 卷积核尺寸，为 2-D。所以可以输入正整数，表示方形；或者通过 2 元 tuple 指定尺寸（H,W）
                stride       ： 控制步长，为 2-D。所以可以输入正整数，表示方形；或者通过 2 元 tuple 指定尺寸（H,W）。默认为 1
                padding      ： padding 尺寸，两边 padding 一致。为 2-D。所以可以输入非负整数，表示方形；或者通过 2 元 tuple 指定尺寸（H,W）。默认为 0
                dilation     ： 卷积核每个元素之间的距离，为 2-D。所以可以输入正整数，表示方形；或者通过 2 元 tuple 指定尺寸（H,W）。默认为 1 。（详见：https://github.com/vdumoulin/conv_arithmetic/blob/master/README.md）
                groups       ： 控制输入与输出之间的连接分组，in_channels 和 out_channels 必须可以整除 groups，默认为 1， 表示不分组
                bias         ： 表示是否添加可学习参数 bias 到输出。默认为 True，即：添加

            ** 层输入 **：
                尺寸          ： [N, Cin, Hin, Win]

            ** 层输出 **：
                尺寸          ： [N, Cout, Hout, Wout]
                计算          ： 
                                Hout = （向下取整）(（Hin + 2 * padding[0] - dilation[0] * (kernel_size[0] - 1) - 1）/stride[0] + 1)
                                Wout = （向下取整）(（Win + 2 * padding[1] - dilation[1] * (kernel_size[1] - 1) - 1）/stride[1] + 1)

            ** 模型学习参数 **：
                weight       : 可学习参数，表示权值参数，尺寸为： [out_channels, in_channels, kernel_size[0], kernel_size[1]]
                bias         : 可学习参数，表示偏置项，尺寸为：[out_channels]
            
            ** 示例 **：
                m = nn.Conv2d(16, 33, (3, 5), stride=(2, 1), padding=(4, 2), dilation=(3, 1))
                input = torch.randn(20, 16, 50, 100)
                output = m(input)
        */
        "Conv2d":{
            "metaName":"Convolution_layers_metaData",     // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"Conv2d",                              // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "Conv2d Convolutional 2d",        // 搜索时对应的关键字
            "api":"torch.nn.Conv2d",                      // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "in_channels"  :{ "type" : "Positive_Integer",     "value" : ""     },
                "out_channels" :{ "type" : "Positive_Integer",     "value" : ""     },
                "kernel_size"  :{ "type" : "PI_Or_(x,x)",          "value" : ""     },
                "stride"       :{ "type" : "PI_Or_(x,x)",          "value" : "1"    },
                "padding"      :{ "type" : "NNI_Or_(x,x)",         "value" : "0"    },
                "dilation"     :{ "type" : "PI_Or_(x,x)",          "value" : "1"    },
                "groups"       :{ "type" : "Positive_Integer",     "value" : "1"    },
                "bias"         :{ "type" : "Boolean",              "value" : "True" }
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "Conv2d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "Conv2d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                对 N 个样本进行三维卷积运算，每个样本包含 C 个通道数，单通道特征尺寸为 [D, H, W]
                对于 3-D 而言，每个样本的每个通道都为 3-D 的

            ** 层说明 **：

            
            ** 层构造参数 **：
                in_channels  ： 输入特征图的通道数，正整数
                out_channels ： 输出特征图的通道数，正整数
                kernel_size  ： 卷积核尺寸，为 3-D。所以可以输入正整数，表示立方；或者通过 3 元 tuple 指定尺寸（D,H,W）
                stride       ： 控制步长，为 3-D。所以可以输入正整数，表示立方；或者通过 3 元 tuple 指定尺寸（D,H,W）。默认为 1
                padding      ： padding 尺寸，两边 padding 一致。为 3-D。所以可以输入非负整数，表示立方；或者通过 3 元 tuple 指定尺寸（D,H,W）。默认为 0
                dilation     ： 卷积核每个元素之间的距离，为 3-D。所以可以输入正整数，表示立方；或者通过 3 元 tuple 指定尺寸（D,H,W）。默认为 1 。
                groups       ： 控制输入与输出之间的连接分组，in_channels 和 out_channels 必须可以整除 groups，默认为 1， 表示不分组
                bias         ： 表示是否添加可学习参数 bias 到输出。默认为 True，即：添加

            ** 层输入 **：
                尺寸          ： [N, Cin, Din, Hin, Win]

            ** 层输出 **：
                尺寸          ： [N, Cout, Dout, Hout, Wout]
                计算          ： 
                                Dout = （向下取整）(（Din + 2 * padding[0] - dilation[0] * (kernel_size[0] - 1) - 1）/stride[0] + 1)
                                Hout = （向下取整）(（Hin + 2 * padding[1] - dilation[1] * (kernel_size[1] - 1) - 1）/stride[1] + 1)
                                Wout = （向下取整）(（Win + 2 * padding[2] - dilation[2] * (kernel_size[2] - 1) - 1）/stride[2] + 1)

            ** 模型学习参数 **：
                weight       : 可学习参数，表示权值参数，尺寸为： [out_channels, in_channels, kernel_size[0], kernel_size[1], kernel_size[2]]
                bias         : 可学习参数，表示偏置项，尺寸为：[out_channels]
            
            ** 示例 **：
                m = nn.Conv3d(16, 33, (3, 5, 2), stride=(2, 1, 1), padding=(4, 2, 0))
                input = torch.randn(20, 16, 10, 50, 100)
                output = m(input)
        */
        "Conv3d":{
            "metaName":"Convolution_layers_metaData",     // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"Conv3d",                              // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "Conv3d Convolutional 3d",        // 搜索时对应的关键字
            "api":"torch.nn.Conv3d",                      // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "in_channels"  :{ "type" : "Positive_Integer",     "value" : ""     },
                "out_channels" :{ "type" : "Positive_Integer",     "value" : ""     },
                "kernel_size"  :{ "type" : "PI_Or_(x,x,x)",        "value" : ""     },
                "stride"       :{ "type" : "PI_Or_(x,x,x)",        "value" : "1"    },
                "padding"      :{ "type" : "NNI_Or_(x,x,x)",       "value" : "0"    },
                "dilation"     :{ "type" : "PI_Or_(x,x,x)",        "value" : "1"    },
                "groups"       :{ "type" : "Positive_Integer",     "value" : "1"    },
                "bias"         :{ "type" : "Boolean",              "value" : "True" }
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "Conv3d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "Conv3d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                对 N 个样本进行一维反卷积运算，每个样本包含 C 个通道数，单通道特征尺寸为 L（1-D 即长度）

            ** 层说明 **：

            
            ** 层构造参数 **：
                in_channels    ： 输入特征图的通道数，正整数
                out_channels   ： 输出特征图的通道数，正整数
                kernel_size    ： 卷积核尺寸，对于 1-D 输入，为正整数
                stride         ： 控制步长，对于 1-D 输入，为正整数，默认为 1
                padding        ： 这里注意，与正卷积不同，这里最终添加的 padding 尺寸为：kernel_size - 1 - padding（对应于正卷积的 padding）。对于 1-D 输入，为非负整数，默认为 0
                output_padding ： 表示添加到输出的 padding 尺寸。对于 1-D 输入，为非负整数，默认为 0。（仅用于查找输出尺寸，并非真的添加）
                dilation       ： 卷积核每个元素之间的距离，对于 1-D 输入，为正整数， 默认为 1 。（详见：https://github.com/vdumoulin/conv_arithmetic/blob/master/README.md）
                groups         ： 控制输入与输出之间的连接分组，in_channels 和 out_channels 必须可以整除 groups，默认为 1， 表示不分组
                bias           ： 表示是否添加可学习参数 bias 到输出。默认为 True，即：添加

            ** 层输入 **：
                尺寸          ： [N, Cin, Lin]
                备注          ： 
                                1. padding 并非实际添加到输入的 padding，实际添加到输入的 padding 的尺寸为：kernel_size - 1 - padding
                                   这么做是因为：可以同 padding 参数即可还原原卷积
                                2. output_padding 的作用如下：
                                   当 stride > 1 的时候，Conv1d 对于多中输入尺寸，可能会获取相同的输出尺寸（舍弃剩余部分）。
                                   所以此时用 output_padding 来隐式添加 padding 到输出特征图，从而确定反卷积的输出尺寸。
                                   注意：output_padding 并非真的添加到反卷积的输出，只是用于确定输出尺寸

            ** 层输出 **：
                尺寸          ： [N, Cout, Lout]
                计算          ： 
                                Lout = (Lin - 1) * stride - 2 * padding + kernel_size + output_padding

            ** 模型学习参数 **：
                weight       : 可学习参数，表示权值参数，尺寸为： [in_channels, out_channels, kernel_size]
                bias         : 可学习参数，表示偏置项，尺寸为：[out_channels]
            
            ** 示例 **：

        */
        "ConvTranspose1d":{
            "metaName":"Convolution_layers_metaData",     // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"ConvTranspose1d",                     // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "ConvTranspose1d Deconvolution Transposed Convolution 1d",        // 搜索时对应的关键字
            "api":"torch.nn.ConvTranspose1d",             // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "in_channels"    :{"type" : "Positive_Integer",      "value" : ""},
                "out_channels"   :{"type" : "Positive_Integer",      "value" : ""},
                "kernel_size"    :{"type" : "Positive_Integer",      "value" : ""},
                "stride"         :{"type" : "Positive_Integer",      "value" : "1"},
                "padding"        :{"type" : "Non_Negative_Integer",  "value" : "0"},
                "output_padding" :{"type" : "Non_Negative_Integer",  "value" : "0"},
                "dilation"       :{"type" : "Positive_Integer",      "value" : "1"},
                "groups"         :{"type" : "Positive_Integer",      "value" : "1"},
                "bias"           :{"type" : "Boolean",               "value" : "True"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "ConvTranspose1d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "ConvTranspose1d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                对 N 个样本进行二维反卷积运算，每个样本包含 C 个通道数，单通道特征尺寸 [H,W]

            ** 层说明 **：

            
            ** 层构造参数 **：
                in_channels    ： 输入特征图的通道数，正整数
                out_channels   ： 输出特征图的通道数，正整数
                kernel_size    ： 卷积核尺寸，对于 2-D 输入，为正整数或 2-D tuple
                stride         ： 控制步长，对于 2-D 输入，为正整数或 2-D tuple，默认为 1
                padding        ： 对于 2-D 输入，为非负整数或 2-D tuple，默认为 0
                output_padding ： 表示添加到输出的 padding 尺寸。对于 2-D 输入，为非负整数或 2-D tuple，默认为 0。（仅用于查找输出尺寸，并非真的添加）
                dilation       ： 卷积核每个元素之间的距离，对于 2-D 输入，为正整数或 2-D tuple， 默认为 1 。（详见：https://github.com/vdumoulin/conv_arithmetic/blob/master/README.md）
                groups         ： 控制输入与输出之间的连接分组，in_channels 和 out_channels 必须可以整除 groups，默认为 1， 表示不分组
                bias           ： 表示是否添加可学习参数 bias 到输出。默认为 True，即：添加

            ** 层输入 **：
                尺寸          ： [N, Cin, Hin, Win]
                备注          ： 
                                1. padding 并非实际添加到输入的 padding，实际添加到输入的 padding 的尺寸为：kernel_size - 1 - padding
                                   这么做是因为：可以同 padding 参数即可还原原卷积
                                2. output_padding 的作用如下：
                                   当 stride > 1 的时候，Conv1d 对于多中输入尺寸，可能会获取相同的输出尺寸（舍弃剩余部分）。
                                   所以此时用 output_padding 来隐式添加 padding 到输出特征图，从而确定反卷积的输出尺寸。
                                   注意：output_padding 并非真的添加到反卷积的输出，只是用于确定输出尺寸

            ** 层输出 **：
                尺寸          ： [N, Cout, Hout, Wout]
                计算          ： 
                                Hout = (Hin - 1) * stride[0] - 2 * padding[0] + kernel_size[0] + output_padding[0]
                                Wout = (Win - 1) * stride[1] - 2 * padding[1] + kernel_size[1] + output_padding[1]

            ** 模型学习参数 **：
                weight       : 可学习参数，表示权值参数，尺寸为： [in_channels, out_channels, kernel_size[0], kernel_size[1]]
                bias         : 可学习参数，表示偏置项，尺寸为：[out_channels]
            
            ** 示例 **：
                input = torch.randn(1, 16, 12, 12)
                downsample = nn.Conv2d(16, 16, 3, stride=2, padding=1)
                upsample = nn.ConvTranspose2d(16, 16, 3, stride=2, padding=1)
                h = downsample(input)
                h.size()          // torch.Size([1, 16, 6, 6])
                output = upsample(h, output_size=input.size())
                output.size()     // torch.Size([1, 16, 12, 12])

        */
        "ConvTranspose2d":{
            "metaName":"Convolution_layers_metaData",     // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"ConvTranspose2d",                     // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "ConvTranspose2d Deconvolution Transposed Convolution 2d",        // 搜索时对应的关键字
            "api":"torch.nn.ConvTranspose2d",             // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "in_channels"    :{"type" : "Positive_Integer",      "value" : ""},
                "out_channels"   :{"type" : "Positive_Integer",      "value" : ""},
                "kernel_size"    :{"type" : "PI_Or_(x,x)",           "value" : ""},
                "stride"         :{"type" : "PI_Or_(x,x)",           "value" : "1"},
                "padding"        :{"type" : "NNI_Or_(x,x)",          "value" : "0"},
                "output_padding" :{"type" : "NNI_Or_(x,x)",          "value" : "0"},
                "dilation"       :{"type" : "PI_Or_(x,x)",           "value" : "1"},
                "groups"         :{"type" : "Positive_Integer",      "value" : "1"},
                "bias"           :{"type" : "Boolean",               "value" : "True"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "ConvTranspose2d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "ConvTranspose2d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                对 N 个样本进行三维反卷积运算，每个样本包含 C 个通道数，单通道特征尺寸 [D,H,W]

            ** 层说明 **：

            
            ** 层构造参数 **：
                in_channels    ： 输入特征图的通道数，正整数
                out_channels   ： 输出特征图的通道数，正整数
                kernel_size    ： 卷积核尺寸，对于 3-D 输入，为正整数或 3-D tuple
                stride         ： 控制步长，对于 3-D 输入，为正整数或 3-D tuple，默认为 1
                padding        ： 对于 3-D 输入，为非负整数或 3-D tuple，默认为 0
                output_padding ： 对于 3-D 输入，为非负整数或 3-D tuple，默认为 0
                dilation       ： 卷积核每个元素之间的距离，对于 3-D 输入，为正整数或 3-D tuple， 默认为 1 。（详见：https://github.com/vdumoulin/conv_arithmetic/blob/master/README.md）
                groups         ： 控制输入与输出之间的连接分组，in_channels 和 out_channels 必须可以整除 groups，默认为 1， 表示不分组
                bias           ： 表示是否添加可学习参数 bias 到输出。默认为 True，即：添加

            ** 层输入 **：
                尺寸          ： [N, Cin, Din, Hin, Win]
                备注          ： 
                                1. padding 并非实际添加到输入的 padding，实际添加到输入的 padding 的尺寸为：kernel_size - 1 - padding
                                   这么做是因为：可以同 padding 参数即可还原原卷积
                                2. output_padding 的作用如下：
                                   当 stride > 1 的时候，Conv1d 对于多中输入尺寸，可能会获取相同的输出尺寸（舍弃剩余部分）。
                                   所以此时用 output_padding 来隐式添加 padding 到输出特征图，从而确定反卷积的输出尺寸。
                                   注意：output_padding 并非真的添加到反卷积的输出，只是用于确定输出尺寸

            ** 层输出 **：
                尺寸          ： [N, Cout, Dout, Hout, Wout]
                计算          ： 
                                Dout = (Din - 1) * stride[0] - 2 * padding[0] + kernel_size[0] + output_padding[0]
                                Hout = (Hin - 1) * stride[1] - 2 * padding[1] + kernel_size[1] + output_padding[1]
                                Wout = (Win - 1) * stride[2] - 2 * padding[2] + kernel_size[2] + output_padding[2]

            ** 模型学习参数 **：
                weight       : 可学习参数，表示权值参数，尺寸为： [in_channels, out_channels, kernel_size[0], kernel_size[1], kernel_size[2]]
                bias         : 可学习参数，表示偏置项，尺寸为：[out_channels]
            
            ** 示例 **：
                m = nn.ConvTranspose3d(16, 33, 3, stride=2)
                m = nn.Conv3d(16, 33, (3, 5, 2), stride=(2, 1, 1), padding=(0, 4, 2))
                input = torch.randn(20, 16, 10, 50, 100)
                output = m(input)

        */
        "ConvTranspose3d":{
            "metaName":"Convolution_layers_metaData",     // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"ConvTranspose3d",                     // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "ConvTranspose3d Deconvolution Transposed Convolution 3d",        // 搜索时对应的关键字
            "api":"torch.nn.ConvTranspose3d",             // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "in_channels"    :{"type" : "Positive_Integer",      "value" : ""},
                "out_channels"   :{"type" : "Positive_Integer",      "value" : ""},
                "kernel_size"    :{"type" : "PI_Or_(x,x,x)",         "value" : ""},
                "stride"         :{"type" : "PI_Or_(x,x,x)",         "value" : "1"},
                "padding"        :{"type" : "NNI_Or_(x,x,x)",        "value" : "0"},
                "output_padding" :{"type" : "NNI_Or_(x,x,x)",        "value" : "0"},
                "dilation"       :{"type" : "PI_Or_(x,x,x)",         "value" : "1"},
                "groups"         :{"type" : "Positive_Integer",      "value" : "1"},
                "bias"           :{"type" : "Boolean",               "value" : "True"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "ConvTranspose3d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "ConvTranspose3d_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                将滑窗内的元素展开成向量（Extracts sliding local blocks from a batched input tensor）

            ** 层说明 **：
                也就是说，类似于卷积过程，只不过将卷积运算变为滑窗展开，并作为通道所在维度的向量，构成新的 tensor
                例如：输入为：[400, 12, 32, 32] ，400 为 batch size， 12 为输入通道数， 32 * 32 为输入尺寸
                通过卷积核为 5 * 5 的，无 padding 的 unfold 处理后，变为：[400, 300, 28 * 28]。其中，300 = 12 * 5 * 5， 28 = (32 + 0 * 2 - 5) / 1 + 1
                也就是说，最后每个样本展开成为：300 个通道，每个通道内包含 28*28 个元素的向量
                当前仅支持 4-D 数据，即图像
            
            ** 层构造参数 **：
                kernel_size    ： 滑窗尺寸，与输入单个元素维度数目一致，因此为：正整数或者 tuple（每个元素均为正整数）
                stride         ： 滑动步长，与输入单个元素维度数目一致，因此为：正整数或者 tuple（每个元素均为正整数），默认为 1
                padding        ： padding 尺寸，与输入单个元素维度数目一致，因此为：非负整数或者 tuple（每个元素均为非负整数），默认为 0 
                dilation       ： 卷积核每个元素之间的距离，与输入单个元素维度数目一致，因此为：正整数或者 tuple（每个元素均为正整数）， 默认为 1

            ** 层输入 **：
                尺寸          ： [N, Cin, *]  其中， * 表示任意维度
                备注          ： 
                                目前仅支持 4-D，也就是说，只支持图像相关操作，输入应该为： [N, Cin, Hin, Win]

            ** 层输出 **：
                尺寸          ： [N, Cout, L]
                计算          ： 
                                Cout = Cin * ∏(kernel_size) (累积)
                                L = (向下取整) ∏((input_spatial_size[d] + 2 * padding[d] - dilation[d] * (kernel_size[d] - 1) - 1) / stride[d] + 1)

            ** 模型学习参数 **：
            
            ** 示例 **：
                unfold = nn.Unfold(kernel_size=(2, 3))
                input = torch.randn(2, 5, 3, 4)
                output = unfold(input)
                output.size()           // torch.Size([2, 30, 4])

        */
        "Unfold":{
            "metaName":"Convolution_layers_metaData",     // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"Unfold",                              // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "Unfold",                         // 搜索时对应的关键字
            "api":"torch.nn.Unfold",                      // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "kernel_size" : {"type" : "PI_Or_(x,x)",     "value" : ""},     // 目前仅支持 4-D 输入
                "dilation"    : {"type" : "PI_Or_(x,x)",     "value" : "1"},    // 目前仅支持 4-D 输入
                "padding"     : {"type" : "NNI_Or_(x,x)",    "value" : "0"},    // 目前仅支持 4-D 输入
                "stride"      : {"type" : "PI_Or_(x,x)",     "value" : "1"}     // 目前仅支持 4-D 输入
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "Unfold_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "Unfold_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
    {
        /*
            ** 层功能 **：
                Unfold 的逆过程

            ** 层说明 **：
            
            ** 层构造参数 **：
                output_size    ： 指定输出尺寸
                kernel_size    ： 滑窗尺寸，与输入单个元素维度数目一致，因此为：正整数或者 tuple（每个元素均为正整数）
                stride         ： 滑动步长，与输入单个元素维度数目一致，因此为：正整数或者 tuple（每个元素均为正整数），默认为 1
                padding        ： padding 尺寸，与输入单个元素维度数目一致，因此为：非负整数或者 tuple（每个元素均为非负整数），默认为 0 
                dilation       ： 卷积核每个元素之间的距离，与输入单个元素维度数目一致，因此为：正整数或者 tuple（每个元素均为正整数）， 默认为 1

            ** 层输入 **：
                尺寸          ： (N, C × ∏(kernel_size), L)
                备注          ： 

            ** 层输出 **：
                尺寸          ： (N, C, output_size[0], output_size[1], …)
                计算          ： 

            ** 模型学习参数 **：
            
            ** 示例 **：
                fold = nn.Fold(output_size=(4, 5), kernel_size=(2, 2))
                input = torch.randn(1, 3 * 2 * 2, 1)
                output = fold(input)
                output.size()

        */
        "Fold":{
            "metaName":"Convolution_layers_metaData",     // 所属的 metaData 的名称
            "type":"Layer",                               // obj 的类型
            "name":"Fold",                                // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
            "icon":"resources/test.svg",                  // 该层对应的 icon 地址
            "keyWord" : "Fold",                           // 搜索时对应的关键字
            "api":"torch.nn.Fold",                        // 对应的 pytorch api

            "style":"",                                   // 该 id 对应的 css
            "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            "outShape": [],                               // 每一层的输出尺寸，为一个数组
            "prev"    : [],                               // 前驱层
            "next"    : [],                               // 后继层

            "params":{                                    // 参数（必须与 api 一致）
                "output_size" : {"type" : "PI_Or_(x,x)",     "value":""},
                "kernel_size" : {"type" : "PI_Or_(x,x)",     "value" : ""},
                "dilation"    : {"type" : "PI_Or_(x,x)",     "value" : "1"},
                "padding"     : {"type" : "NNI_Or_(x,x)",    "value" : "0"},
                "stride"      : {"type" : "PI_Or_(x,x)",     "value" : "1"}
            },

            "funcs":{                                    // 一些函数接口
                "Check_Layer_inShape"      : "Fold_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
                "Update_Layer_outSape"     : "Fold_Update_Layer_outSape"      // 计算并更新输出尺寸
            }
        },
    },
];



/******************************************************* 对应的函数实现 *******************************************************/
/*
    只单纯的负责检测 Conv1d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function Conv1d_Check_Layer_inShape(layer_id, inShape_array_str){
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
function Conv1d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, Cin, Lin] 
        预期的输出尺寸为 ： [N, Cout, Lout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  Conv1d_Check_Layer_inShape(layer_id, inShape_array_str);
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
    let in_channels = parseInt(layer_info_json["params"]["in_channels"]["value"]);
    let out_channels = parseInt(layer_info_json["params"]["out_channels"]["value"]);

    let kernel_size = parseInt(layer_info_json["params"]["kernel_size"]["value"]);
    let stride = parseInt(layer_info_json["params"]["stride"]["value"]);
    let padding = parseInt(layer_info_json["params"]["padding"]["value"]);
    let dilation = parseInt(layer_info_json["params"]["dilation"]["value"]);

    // 4. 检查输入参数与输入尺寸之间是否冲突
    if(in_channels != Cin){
        return "Error : " + layer_id + "-- Channels number of last layer(" + Cin + ") and parameter(" + in_channels + ") does not equal.\n";
    }

    // 5. 计算并更新输出尺寸
    //      Lout = （向下取整）(（Lin + 2 * padding - dilation * (kernel_size - 1) - 1）/stride + 1)
    let Cout = out_channels;
    let Lout = Math.floor((Lin  + 2 * padding - dilation * (kernel_size - 1) - 1) / stride + 1);
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
    只单纯的负责检测 Conv2d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function Conv2d_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, Cin, Hin, Win]
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
function Conv2d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, Cin, Hin, Win]
        预期的输出尺寸为 ： [N, Cout, Hout, Wout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  Conv2d_Check_Layer_inShape(layer_id, inShape_array_str);
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
    let in_channels = parseInt(layer_info_json["params"]["in_channels"]["value"]);
    let out_channels = parseInt(layer_info_json["params"]["out_channels"]["value"]);

    let kernel_size = layer_info_json["params"]["kernel_size"]["value"].trim();   // trim() 很必要，不可少
    let stride = layer_info_json["params"]["stride"]["value"].trim();
    let padding = layer_info_json["params"]["padding"]["value"].trim();
    let dilation = layer_info_json["params"]["dilation"]["value"].trim();

    let k1 = 0;
    let k2 = 0;   // kernel_size
    let s1 = 0;
    let s2 = 0;   // stride
    let p1 = 0;
    let p2 = 0;   // padding
    let d1 = 0;
    let d2 = 0;   // dilation

    if(kernel_size[0] == "("){  // tuple
        let k_str = kernel_size.substring(1,kernel_size.length-1);
        k1 = parseInt(k_str.split(",")[0]);
        k2 = parseInt(k_str.split(",")[1]);
    }else{
        k1 = parseInt(kernel_size);
        k2 = k1;
    }
    if(stride[0] == "("){  // tuple
        let s_str = stride.substring(1,stride.length-1);
        s1 = parseInt(s_str.split(",")[0]);
        s2 = parseInt(s_str.split(",")[1]);
    }else{
        s1 = parseInt(stride);
        s2 = s1;
    }
    if(padding[0] == "("){  // tuple
        let p_str = padding.substring(1,padding.length-1);
        p1 = parseInt(p_str.split(",")[0]);
        p2 = parseInt(p_str.split(",")[1]);
    }else{
        p1 = parseInt(padding);
        p2 = p1;
    }
    if(dilation[0] == "("){  // tuple
        let d_str = dilation.substring(1,dilation.length-1);
        d1 = parseInt(d_str.split(",")[0]);
        d2 = parseInt(d_str.split(",")[1]);
    }else{
        d1 = parseInt(dilation);
        d2 = d1;
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突
    if(in_channels != Cin){
        return "Error : " + layer_id + "-- Channels number of last layer(" + Cin + ") and parameter(" + in_channels + ") does not equal.\n";
    }

    // 5. 计算并更新输出尺寸
    //      Lout = （向下取整）(（Lin + 2 * padding - dilation * (kernel_size - 1) - 1）/stride + 1)
    let Cout = out_channels;
    let Hout = Math.floor(( Hin + 2 * p1 - d1  * ( k1 - 1 ) - 1 ) / s1 + 1);
    let Wout = Math.floor(( Win + 2 * p2 - d2  * ( k2 - 1 ) - 1 ) / s2 + 1);
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
    只单纯的负责检测 Conv3d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function Conv3d_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, Cin, Din, Hin, Win]
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
function Conv3d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, Cin, Din, Hin, Win]
        预期的输出尺寸为 ： [N, Cout, Dout, Hout, Wout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  Conv3d_Check_Layer_inShape(layer_id, inShape_array_str);
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
    let in_channels = parseInt(layer_info_json["params"]["in_channels"]["value"]);
    let out_channels = parseInt(layer_info_json["params"]["out_channels"]["value"]);

    let kernel_size = layer_info_json["params"]["kernel_size"]["value"].trim();
    let stride = layer_info_json["params"]["stride"]["value"].trim();
    let padding = layer_info_json["params"]["padding"]["value"].trim();
    let dilation = layer_info_json["params"]["dilation"]["value"].trim();

    let k1 = 0;
    let k2 = 0;
    let k3 = 0;   // kernel_size
    let s1 = 0;
    let s2 = 0;
    let s3 = 0;   // stride
    let p1 = 0;
    let p2 = 0;
    let p3 = 0;   // padding
    let d1 = 0;
    let d2 = 0;
    let d3 = 0;   // dilation

    if(kernel_size[0] == "("){  // tuple
        let k_str = kernel_size.substring(1,kernel_size.length-1);
        k1 = parseInt(k_str.split(",")[0]);
        k2 = parseInt(k_str.split(",")[1]);
        k3 = parseInt(k_str.split(",")[2]);
    }else{
        k1 = parseInt(kernel_size);
        k2 = k1;
        k3 = k1;
    }
    if(stride[0] == "("){  // tuple
        let s_str = stride.substring(1,stride.length-1);
        s1 = parseInt(s_str.split(",")[0]);
        s2 = parseInt(s_str.split(",")[1]);
        s3 = parseInt(s_str.split(",")[2]);
    }else{
        s1 = parseInt(stride);
        s2 = s1;
        s3 = s1;
    }
    if(padding[0] == "("){  // tuple
        let p_str = padding.substring(1,padding.length-1);
        p1 = parseInt(p_str.split(",")[0]);
        p2 = parseInt(p_str.split(",")[1]);
        p3 = parseInt(p_str.split(",")[2]);
    }else{
        p1 = parseInt(padding);
        p2 = p1;
        p3 = p1;
    }
    if(dilation[0] == "("){  // tuple
        let d_str = dilation.substring(1,dilation.length-1);
        d1 = parseInt(d_str.split(",")[0]);
        d2 = parseInt(d_str.split(",")[1]);
        d3 = parseInt(d_str.split(",")[2]);
    }else{
        d1 = parseInt(dilation);
        d2 = d1;
        d3 = d1;
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突
    if(in_channels != Cin){
        return "Error : " + layer_id + "-- Channels number of last layer(" + Cin + ") and parameter(" + in_channels + ") does not equal.\n";
    }

    // 5. 计算并更新输出尺寸
    //      Lout = （向下取整）(（Lin + 2 * padding - dilation * (kernel_size - 1) - 1）/stride + 1)
    let Cout = out_channels;
    let Dout = Math.floor(( Din + 2 * p1 - d1  * ( k1 - 1 ) - 1 ) / s1 + 1);
    let Hout = Math.floor(( Hin + 2 * p2 - d2  * ( k2 - 1 ) - 1 ) / s2 + 1);
    let Wout = Math.floor(( Win + 2 * p3 - d3  * ( k3 - 1 ) - 1 ) / s3 + 1);
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
    只单纯的负责检测 ConvTranspose1d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function ConvTranspose1d_Check_Layer_inShape(layer_id, inShape_array_str){
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
function ConvTranspose1d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, Cin, Lin] 
        预期的输出尺寸为 ： [N, Cout, Lout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  ConvTranspose1d_Check_Layer_inShape(layer_id, inShape_array_str);
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
    let in_channels     = parseInt(layer_info_json["params"]["in_channels"]["value"]);
    let out_channels    = parseInt(layer_info_json["params"]["out_channels"]["value"]);

    let kernel_size     = parseInt(layer_info_json["params"]["kernel_size"]["value"]);
    let stride          = parseInt(layer_info_json["params"]["stride"]["value"]);
    let padding         = parseInt(layer_info_json["params"]["padding"]["value"]);
    let output_padding  = parseInt(layer_info_json["params"]["output_padding"]["value"]);

    // 4. 检查输入参数与输入尺寸之间是否冲突
    if(in_channels != Cin){
        return "Error : " + layer_id + "-- Channels number of last layer(" + Cin + ") and parameter(" + in_channels + ") does not equal.\n";
    }

    // 5. 计算并更新输出尺寸
    //      Lout = (Lin - 1) * stride - 2 * padding + kernel_size + output_padding
    let Cout = out_channels;
    let Lout = (Lin-1)*stride -2*padding + kernel_size + output_padding;
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
    只单纯的负责检测 ConvTranspose2d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function ConvTranspose2d_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, Cin, Hin, Win]
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
function ConvTranspose2d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, Cin, Hin, Win]
        预期的输出尺寸为 ： [N, Cout, Hout, Wout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  ConvTranspose2d_Check_Layer_inShape(layer_id, inShape_array_str);
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
    let in_channels = parseInt(layer_info_json["params"]["in_channels"]["value"]);
    let out_channels = parseInt(layer_info_json["params"]["out_channels"]["value"]);

    let kernel_size    = layer_info_json["params"]["kernel_size"]["value"].trim();
    let stride         = layer_info_json["params"]["stride"]["value"].trim();
    let padding        = layer_info_json["params"]["padding"]["value"].trim();
    let output_padding = layer_info_json["params"]["output_padding"]["value"].trim();

    let k1 = 0;
    let k2 = 0;   // kernel_size
    let s1 = 0;
    let s2 = 0;   // stride
    let p1 = 0;
    let p2 = 0;   // padding
    let op1 = 0;
    let op2 = 0;  // output_padding

    if(kernel_size[0] == "("){  // tuple
        let k_str = kernel_size.substring(1,kernel_size.length-1);
        k1 = parseInt(k_str.split(",")[0]);
        k2 = parseInt(k_str.split(",")[1]);
    }else{
        k1 = parseInt(kernel_size);
        k2 = k1;
    }
    if(stride[0] == "("){  // tuple
        let s_str = stride.substring(1,stride.length-1);
        s1 = parseInt(s_str.split(",")[0]);
        s2 = parseInt(s_str.split(",")[1]);
    }else{
        s1 = parseInt(stride);
        s2 = s1;
    }
    if(padding[0] == "("){  // tuple
        let p_str = padding.substring(1,padding.length-1);
        p1 = parseInt(p_str.split(",")[0]);
        p2 = parseInt(p_str.split(",")[1]);
    }else{
        p1 = parseInt(padding);
        p2 = p1;
    }
    if(output_padding[0] == "("){  // tuple
        let op_str = output_padding.substring(1,output_padding.length-1);
        op1 = parseInt(op_str.split(",")[0]);
        op2 = parseInt(op_str.split(",")[1]);
    }else{
        op1 = parseInt(output_padding);
        op2 = op1;
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突
    if(in_channels != Cin){
        return "Error : " + layer_id + "-- Channels number of last layer(" + Cin + ") and parameter(" + in_channels + ") does not equal.\n";
    }

    // 5. 计算并更新输出尺寸
    //      Hout = (Hin - 1) * stride[0] - 2 * padding[0] + kernel_size[0] + output_padding[0]
    //      Wout = (Win - 1) * stride[1] - 2 * padding[1] + kernel_size[1] + output_padding[1]
    let Cout = out_channels;
    let Hout = ( Hin - 1 ) * s1 - 2 * p1 + k1 + op1;
    let Wout = ( Win - 1 ) * s2 - 2 * p2 + k2 + op2;
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
    只单纯的负责检测 ConvTranspose3d 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function ConvTranspose3d_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, Cin, Hin, Win]
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
function ConvTranspose3d_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, Cin, Din, Hin, Win]
        预期的输出尺寸为 ： [N, Cout, Dout, Hout, Wout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  ConvTranspose3d_Check_Layer_inShape(layer_id, inShape_array_str);
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
    let in_channels = parseInt(layer_info_json["params"]["in_channels"]["value"]);
    let out_channels = parseInt(layer_info_json["params"]["out_channels"]["value"]);

    let kernel_size    = layer_info_json["params"]["kernel_size"]["value"].trim();
    let stride         = layer_info_json["params"]["stride"]["value"].trim();
    let padding        = layer_info_json["params"]["padding"]["value"].trim();
    let output_padding = layer_info_json["params"]["output_padding"]["value"].trim();

    let k1 = 0;
    let k2 = 0;
    let k3 = 0;   // kernel_size
    let s1 = 0;
    let s2 = 0;
    let s3 = 0;   // stride
    let p1 = 0;
    let p2 = 0;
    let p3 = 0;   // padding
    let op1 = 0;
    let op2 = 0;
    let op3 = 0;  // output_padding

    if(kernel_size[0] == "("){  // tuple
        let k_str = kernel_size.substring(1,kernel_size.length-1);
        k1 = parseInt(k_str.split(",")[0]);
        k2 = parseInt(k_str.split(",")[1]);
        k3 = parseInt(k_str.split(",")[2]);
    }else{
        k1 = parseInt(kernel_size);
        k2 = k1;
        k3 = k1;
    }
    if(stride[0] == "("){  // tuple
        let s_str = stride.substring(1,stride.length-1);
        s1 = parseInt(s_str.split(",")[0]);
        s2 = parseInt(s_str.split(",")[1]);
        s3 = parseInt(s_str.split(",")[2]);
    }else{
        s1 = parseInt(stride);
        s2 = s1;
        s3 = s1;
    }
    if(padding[0] == "("){  // tuple
        let p_str = padding.substring(1,padding.length-1);
        p1 = parseInt(p_str.split(",")[0]);
        p2 = parseInt(p_str.split(",")[1]);
        p3 = parseInt(p_str.split(",")[2]);
    }else{
        p1 = parseInt(padding);
        p2 = p1;
        p3 = p1;
    }
    if(output_padding[0] == "("){  // tuple
        let op_str = output_padding.substring(1,output_padding.length-1);
        op1 = parseInt(op_str.split(",")[0]);
        op2 = parseInt(op_str.split(",")[1]);
        op3 = parseInt(op_str.split(",")[2]);
    }else{
        op1 = parseInt(output_padding);
        op2 = op1;
        op3 = op1;
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突
    if(in_channels != Cin){
        return "Error : " + layer_id + "-- Channels number of last layer(" + Cin + ") and parameter(" + in_channels + ") does not equal.\n";
    }

    // 5. 计算并更新输出尺寸
    //      Hout = (Hin - 1) * stride - 2 * padding + kernel_size + output_padding
    let Cout = out_channels;
    let Dout = ( Din - 1 ) * s1 - 2 * p1 + k1 + op1;
    let Hout = ( Hin - 1 ) * s2 - 2 * p2 + k2 + op2;
    let Wout = ( Win - 1 ) * s3 - 2 * p3 + k3 + op3;
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
    只单纯的负责检测 Unfold 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function Unfold_Check_Layer_inShape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, Cin, Hin, Win]
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
function Unfold_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, Cin, Hin, Win]
        预期的输出尺寸为 ： [N, Cout, L]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  Unfold_Check_Layer_inShape(layer_id, inShape_array_str);
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
    let stride = layer_info_json["params"]["stride"]["value"].trim();
    let padding = layer_info_json["params"]["padding"]["value"].trim();
    let dilation = layer_info_json["params"]["dilation"]["value"].trim();

    let k1 = 0;
    let k2 = 0;   // kernel_size
    let s1 = 0;
    let s2 = 0;   // stride
    let p1 = 0;
    let p2 = 0;   // padding
    let d1 = 0;
    let d2 = 0;   // dilation

    if(kernel_size[0] == "("){  // tuple
        let k_str = kernel_size.substring(1,kernel_size.length-1);
        k1 = parseInt(k_str.split(",")[0]);
        k2 = parseInt(k_str.split(",")[1]);
    }else{
        k1 = parseInt(kernel_size);
        k2 = k1;
    }
    if(stride[0] == "("){  // tuple
        let s_str = stride.substring(1,stride.length-1);
        s1 = parseInt(s_str.split(",")[0]);
        s2 = parseInt(s_str.split(",")[1]);
    }else{
        s1 = parseInt(stride);
        s2 = s1;
    }
    if(padding[0] == "("){  // tuple
        let p_str = padding.substring(1,padding.length-1);
        p1 = parseInt(p_str.split(",")[0]);
        p2 = parseInt(p_str.split(",")[1]);
    }else{
        p1 = parseInt(padding);
        p2 = p1;
    }
    if(dilation[0] == "("){  // tuple
        let d_str = dilation.substring(1,dilation.length-1);
        d1 = parseInt(d_str.split(",")[0]);
        d2 = parseInt(d_str.split(",")[1]);
    }else{
        d1 = parseInt(dilation);
        d2 = d1;
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突

    // 5. 计算并更新输出尺寸
    //      Cout = Cin * ∏(kernel_size) (累积)
    //      L = (向下取整) ∏((input_spatial_size[d] + 2 * padding[d] - dilation[d] * (kernel_size[d] - 1) - 1) / stride[d] + 1)
    let Cout = Cin * k1 * k2;
    let L1 = Math.floor(( Hin + 2 * p1  - d1 * ( k1 - 1 ) - 1 ) / s1 + 1);
    let L2 = Math.floor(( Win + 2 * p2  - d2 * ( k2 - 1 ) - 1 ) / s2 + 1);
    let L = L1 * L2;
    let outShape = [Batch_Size, Cout, L];

    // 6. 检查计算结果是否符合逻辑
    if(L1 < 1){
        return "Error : " + layer_id + " -- shape of H(" + L1 + ") is invalid.\n";
    }
    if(L2 < 1){
        return "Error : " + layer_id + " -- shape of W(" + L2 + ") is invalid.\n";
    }
    
    // 7. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 8. 成功，返回空字符串
    return "";
}



/*
    只单纯的负责检测 Fold 类的层输入尺寸是否符合要求
    如果符合，返回 ""
    如果不符合，返回提示信息字符串
    规定 ： 所有的输出尺寸必须为 [*,*] 形式

    layer_id      ： 当前层的 id
    inShape_array ： 输入尺寸的数组的字符串（JSON）
*/
function Fold_Check_Layer_inShape(layer_id, inShape_array_str){
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
function Fold_Update_Layer_outSape(layer_id, inShape_array_str){
    /* 
        预期的输入尺寸为 ： [N, Cin, L]
        预期的输出尺寸为 ： [N, Cout, Hout, Wout]
    */
    // 1. 首先检查输入是否正常
    let inputInfo =  Fold_Check_Layer_inShape(layer_id, inShape_array_str);
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
    let output_size = layer_info_json["params"]["output_size"]["value"].trim();
    let kernel_size = layer_info_json["params"]["kernel_size"]["value"].trim();
    let stride = layer_info_json["params"]["stride"]["value"].trim();
    let padding = layer_info_json["params"]["padding"]["value"].trim();
    let dilation = layer_info_json["params"]["dilation"]["value"].trim();

    let os1 = 0;
    let os2 = 0;  // output_size
    let k1 = 0;
    let k2 = 0;   // kernel_size
    let s1 = 0;
    let s2 = 0;   // stride
    let p1 = 0;
    let p2 = 0;   // padding
    let d1 = 0;
    let d2 = 0;   // dilation

    if(output_size[0] == "("){  // tuple
        let os_str = output_size.substring(1,output_size.length-1);
        os1 = parseInt(os_str.split(",")[0]);
        os2 = parseInt(os_str.split(",")[1]);
    }else{
        os1 = parseInt(output_size);
        os2 = os1;
    }
    if(kernel_size[0] == "("){  // tuple
        let k_str = kernel_size.substring(1,kernel_size.length-1);
        k1 = parseInt(k_str.split(",")[0]);
        k2 = parseInt(k_str.split(",")[1]);
    }else{
        k1 = parseInt(kernel_size);
        k2 = k1;
    }
    if(stride[0] == "("){  // tuple
        let s_str = stride.substring(1,stride.length-1);
        s1 = parseInt(s_str.split(",")[0]);
        s2 = parseInt(s_str.split(",")[1]);
    }else{
        s1 = parseInt(stride);
        s2 = s1;
    }
    if(padding[0] == "("){  // tuple
        let p_str = padding.substring(1,padding.length-1);
        p1 = parseInt(p_str.split(",")[0]);
        p2 = parseInt(p_str.split(",")[1]);
    }else{
        p1 = parseInt(padding);
        p2 = p1;
    }
    if(dilation[0] == "("){  // tuple
        let d_str = dilation.substring(1,dilation.length-1);
        d1 = parseInt(d_str.split(",")[0]);
        d2 = parseInt(d_str.split(",")[1]);
    }else{
        d1 = parseInt(dilation);
        d2 = d1;
    }

    // 4. 检查输入参数与输入尺寸之间是否冲突
    let L1 = Math.floor(( os1 + 2 * p1  - d1 * ( k1 - 1 ) - 1 ) / s1 + 1);
    let L2 = Math.floor(( os2 + 2 * p2  - d2 * ( k2 - 1 ) - 1 ) / s2 + 1);
    if((L1 * L2) != Lin){
        return "Error :" + layer_id + "input shape does not match the parameters specified(different total elements).\n";
    }

    // 5. 计算并更新输出尺寸
    //      Cout = Cin * ∏(kernel_size) (累积)
    //      L = (向下取整) ∏((input_spatial_size[d] + 2 * padding[d] - dilation[d] * (kernel_size[d] - 1) - 1) / stride[d] + 1)
    let Cout = Math.floor(Cin / (k1 * k2));
    let outShape = [Batch_Size, Cout, os1, os2];

    // 6. 检查计算结果是否符合逻辑
    if(Cout < 1){
        return "Error : " + layer_id + " -- shape of output(" + outShape + ",  Hout or Wout) is invalid.\n";
    }
    
    // 7. 保存到该层的相应位置
    layer_info_json["outShape"] = outShape;
    $("#" + layer_id + " .layer_json_data")[0].innerHTML = JSON.stringify(layer_info_json);

    // 8. 成功，返回空字符串
    return "";
}