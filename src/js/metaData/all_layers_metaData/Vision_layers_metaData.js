// var Vision_layers_metaData = [
//     {
//         // 第一个元素包含该 metaData 的基本信息
//         "metaDataName"      : "Vision_layers_metaData",        // metaData 的名字
//         "metaDataType"      : "Layers_metaData",               // metaData 的类型
//         "dom_div_name"      : "Vision_layers",                 // 该字段用于生成列表中的 header 和 list 名
//         "dom_header_text"   : "Vision Layers"                  // header 上显示的描述名
//     },
//     {
//         /*
//             ** 层功能 **：
//                 将尺寸为 (*, r*r*C,H.W) 的 Tensor 变为尺寸为 (*, C, rH, rW)。

//                 这对于使用步长为 1/r 的子像素卷积而言，很有效。详情查看：https://arxiv.org/abs/1609.05158



//             ** 层说明 **：

            
//             ** 层构造参数 **：
//                 upscale_factor  ： 正整数，即上面的 r

//             ** 层输入 **：
//                 尺寸          ： (N, C ∗ upscale_factor^2, H, W)

//             ** 层输出 **：
//                 尺寸          ： (N, C, H ∗ upscale_factor, W ∗ upscale_factor)

//             ** 模型学习参数 **：
            
//             ** 示例 **：
//                 ps = nn.PixelShuffle(3)
//                 input = torch.tensor(1, 9, 4, 4)
//                 output = ps(input)
//                 print(output.size())   # torch.Size([1, 1, 12, 12])

//         */
//         "PixelShuffle":{
//             "metaName":"Vision_layers_metaData",          // 所属的 metaData 的名称
//             "type":"Layer",                               // obj 的类型
//             "name":"PixelShuffle",                        // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
//             "icon":"resources/test.svg",                  // 该层对应的 icon 地址
//             "keyWord" : "PixelShuffle",                   // 搜索时对应的关键字
//             "api":"torch.nn.PixelShuffle",                // 对应的 pytorch api

//             "style":"",                                   // 该 id 对应的 css
//             "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
//             "outShape": [],                               // 每一层的输出尺寸，为一个数组
//             "prev"    : [],                               // 前驱层
//             "next"    : [],                               // 后继层

//             "params":{                                    // 参数（必须与 api 一致）
//                 "upscale_factor" : {"type" : "Positive_Integer", "value" : ""}
//             },

//             "funcs":{                                    // 一些函数接口
//                 "Check_Layer_inShape"      : "PixelShuffle_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
//                 "Update_Layer_outSape"     : "PixelShuffle_Update_Layer_outSape"      // 计算并更新输出尺寸
//             }
//         },
//     },
//     {
//         /*
//             ** 层功能 **：
//                 对给定的数据进行上采样，这些数据为多通道，可以是：1-D， 2-D， 3-D 等

//                 输入数据的尺寸为 ： minibatch x channels x [optional depth] x [optional height] x width

//                 用于上采样的算法，对于不同的输入 tensor 是不同的，分别为：
//                         3D  nearest neighbor
//                         4D  linear, bilinear
//                         5D  trilinear

//                 可一给定 scale_factor 或者目标输出尺寸，来计算输出尺寸（只能二选一）。

//             ** 层说明 **：

            
//             ** 层构造参数 **：
//                 size          ： 正整数的 tuple， [optional D_out], [optional H_out], W_out
//                 scale_factor  ： (int / tuple of python:ints, optional) – the multiplier for the image height / width / depth
//                 mode          ： (string, optional) – the upsampling algorithm: one of nearest, linear, bilinear and trilinear. Default: nearest
//                 align_corners ： (bool, optional) – if True, the corner pixels of the input and output tensors are aligned, 
//                                         and thus preserving the values at those pixels. This only has effect when mode is linear, 
//                                         bilinear, or trilinear. Default: False

//             ** 层输入 **：
//                 尺寸          ：  (N,C,Win), (N,C,Hin,Win) or (N,C,Din,Hin,Win)

//             ** 层输出 **：
//                 尺寸          ：  (N,C,Wout), (N,C,Hout,Wout) or (N,C,Dout,Hout,Wout)
//                                     Dout=⌊Din × scale_factor⌋ or size[−3]
//                                     Hout=⌊Hin × scale_factor⌋ or size[−2]
//                                     Wout=⌊Win × scale_factor⌋ or size[−1]

//             ** 模型学习参数 **：
            
//             ** 示例 **：
//                 input = torch.arange(1, 5)
//                 m = nn.Upsample(scale_factor=2, mode='nearest')
//                 m(input)

//         */
//         "Upsample":{
//             "metaName":"Vision_layers_metaData",          // 所属的 metaData 的名称
//             "type":"Layer",                               // obj 的类型
//             "name":"Upsample",                            // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
//             "icon":"resources/test.svg",                  // 该层对应的 icon 地址
//             "keyWord" : "Upsample",                       // 搜索时对应的关键字
//             "api":"torch.nn.Upsample",                    // 对应的 pytorch api

//             "style":"",                                   // 该 id 对应的 css
//             "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
//             "outShape": [],                               // 每一层的输出尺寸，为一个数组
//             "prev"    : [],                               // 前驱层
//             "next"    : [],                               // 后继层

//             "params":{                                    // 参数（必须与 api 一致）
//                 "size"          : {"type" : "PI_and_1D_2D_3D_Tuple",             "value" : "None"},
//                 "scale_factor"  : {"type" : "Positive_Integer",                  "value" : "None"},
//                 "mode"          : {"type" : "nearest_linear_bilinear_trilinear", "value" : "'nearest'"},
//                 "align_corners" : {"type" : "Boolean",                           "value" : "None"},
//             },

//             "funcs":{                                    // 一些函数接口
//                 "Check_Layer_inShape"      : "Upsample_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
//                 "Update_Layer_outSape"     : "Upsample_Update_Layer_outSape"      // 计算并更新输出尺寸
//             }
//         },
//     },
//     {
//         /*
//             ** 层功能 **：
//                 Applies a 2D nearest neighbor upsampling to an input signal composed of several input channels.

//                 To specify the scale, it takes either the size or the scale_factor as it’s constructor argument.

//                 When size is given, it is the output size of the image (h, w).

//             ** 层说明 **：

            
//             ** 层构造参数 **：
//                 size          ： 正整数的 tuple，  (H_out, W_out)
//                 scale_factor  ： 正整数， the multiplier for the image height or width

//             ** 层输入 **：
//                 尺寸          ：  (N,C,Hin,Win)

//             ** 层输出 **：
//                 尺寸          ：  (N,C,Hout,Wout) 
//                                     Hout = ⌊Hin × scale_factor⌋
//                                     Wout = ⌊Win × scale_factor⌋

//             ** 模型学习参数 **：
            
//             ** 示例 **：
//                 input = torch.arange(1, 5).view(1, 1, 2, 2)  # tensor([[[[ 1.,  2.], [ 3.,  4.]]]])
//                 m = nn.UpsamplingNearest2d(scale_factor=2)
//                 m(input)    # tensor([[[[ 1.,  1.,  2.,  2.], [ 1.,  1.,  2.,  2.], [ 3.,  3.,  4.,  4.], [ 3.,  3.,  4.,  4.]]]])

//         */
//         "UpsamplingNearest2d":{
//             "metaName":"Vision_layers_metaData",          // 所属的 metaData 的名称
//             "type":"Layer",                               // obj 的类型
//             "name":"UpsamplingNearest2d",                 // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
//             "icon":"resources/test.svg",                  // 该层对应的 icon 地址
//             "keyWord" : "UpsamplingNearest2d",            // 搜索时对应的关键字
//             "api":"torch.nn.UpsamplingNearest2d",         // 对应的 pytorch api

//             "style":"",                                   // 该 id 对应的 css
//             "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
//             "outShape": [],                               // 每一层的输出尺寸，为一个数组
//             "prev"    : [],                               // 前驱层
//             "next"    : [],                               // 后继层

//             "params":{                                    // 参数（必须与 api 一致）
//                 "size"          : {"type" : "(PI,PI)",             "value" : "None"},
//                 "scale_factor"  : {"type" : "Positive_Integer",    "value" : "None"},
//             },

//             "funcs":{                                    // 一些函数接口
//                 "Check_Layer_inShape"      : "UpsamplingNearest2d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
//                 "Update_Layer_outSape"     : "UpsamplingNearest2d_Update_Layer_outSape"      // 计算并更新输出尺寸
//             }
//         },
//     },
//     {
//         /*
//             ** 层功能 **：
//                 Applies a 2D bilinear upsampling to an input signal composed of several input channels.

//                 To specify the scale, it takes either the size or the scale_factor as it’s constructor argument.

//                 When size is given, it is the output size of the image (h, w).

//             ** 层说明 **：

            
//             ** 层构造参数 **：
//                 size          ： 正整数的 tuple，  (H_out, W_out)
//                 scale_factor  ： 正整数， the multiplier for the image height or width

//             ** 层输入 **：
//                 尺寸          ：  (N,C,Hin,Win)

//             ** 层输出 **：
//                 尺寸          ：  (N,C,Hout,Wout) 
//                                     Hout = ⌊Hin × scale_factor⌋
//                                     Wout = ⌊Win × scale_factor⌋

//             ** 模型学习参数 **：
            
//             ** 示例 **：
//                 input = torch.arange(1, 5).view(1, 1, 2, 2)
//                 m = nn.UpsamplingBilinear2d(scale_factor=2)
//                 m(input)

//         */
//         "UpsamplingBilinear2d":{
//             "metaName":"Vision_layers_metaData",          // 所属的 metaData 的名称
//             "type":"Layer",                               // obj 的类型
//             "name":"UpsamplingBilinear2d",                // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
//             "icon":"resources/test.svg",                  // 该层对应的 icon 地址
//             "keyWord" : "UpsamplingBilinear2d",           // 搜索时对应的关键字
//             "api":"torch.nn.UpsamplingBilinear2d",        // 对应的 pytorch api

//             "style":"",                                   // 该 id 对应的 css
//             "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
//             "outShape": [],                               // 每一层的输出尺寸，为一个数组
//             "prev"    : [],                               // 前驱层
//             "next"    : [],                               // 后继层

//             "params":{                                    // 参数（必须与 api 一致）
//                 "size"          : {"type" : "(PI,PI)",             "value" : "None"},
//                 "scale_factor"  : {"type" : "Positive_Integer",    "value" : "None"},
//             },

//             "funcs":{                                    // 一些函数接口
//                 "Check_Layer_inShape"      : "UpsamplingBilinear2d_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
//                 "Update_Layer_outSape"     : "UpsamplingBilinear2d_Update_Layer_outSape"      // 计算并更新输出尺寸
//             }
//         },
//     },
// ];